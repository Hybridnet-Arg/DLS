import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import {
  DESTINOS_TUBULARES,
  ESTADOS_MOVIMIENTOS_TUBULARES,
  UPLOAD_DIRECTORIES,
} from '@/constants';
import { uploadFile } from '@/utils/uploadFile.util';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';
import { getTubularInventoryByDestination } from '@/lib/prisma/repositories/tubularesMovimientos.repository';
import { findPerforador } from '@/lib/prisma/repositories/perforadores.repository';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const whereClause = {};
    const groupByDestinos = searchParams.get('group_by_tubulares_destino_id');
    const perforadorNombre = searchParams.get('perforador_nombre');
    const perforadorNumero = searchParams.get('perforador_numero');
    const tubularesDestinoIds = searchParams.getAll('tubulares_destino_ids[]');

    if (perforadorNumero && perforadorNombre) {
      const perforador = await findPerforador({
        numero: Number(perforadorNumero),
        nombre: perforadorNombre,
      });
      whereClause.perforador_id = perforador?.id;
    }

    if (groupByDestinos) {
      if (tubularesDestinoIds.length > 0) {
        whereClause.tubulares_destino_ids = tubularesDestinoIds.map((id) =>
          Number(id)
        );
      }

      const data = await getTubularInventoryByDestination(whereClause);
      return NextResponse.json(data, { status: 200 });
    }

    const tubulares_movimientos = await prisma.tubulares_movimientos.findMany({
      where: whereClause,
    });
    return NextResponse.json(tubulares_movimientos, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

async function obtenerMovimientoTubular({ filters = {}, prismaTx = prisma }) {
  const whereClause = {};
  if (filters?.tubular_id) {
    whereClause.tubular_id = filters?.tubular_id;
  }
  if (filters?.tubulares_destino_id) {
    whereClause.tubulares_destino_id = filters?.tubulares_destino_id;
  }
  if (filters?.tubulares_rango_id) {
    whereClause.tubulares_rango_id = filters?.tubulares_rango_id;
  }
  if (filters?.tubulares_tipo_barra_id) {
    whereClause.tubulares_tipo_barra_id = filters?.tubulares_tipo_barra_id;
  }
  if (filters?.tubulares_tipo_conexion_id) {
    whereClause.tubulares_tipo_conexion_id =
      filters?.tubulares_tipo_conexion_id;
  }
  if (filters?.tubulares_taller_id) {
    whereClause.tubulares_taller_id = filters?.tubulares_taller_id;
  }

  const existMovimiento = await prismaTx.tubulares_movimientos.findFirst({
    where: whereClause,
    include: {
      tubulares_destino: true,
    },
  });
  return existMovimiento;
}

export async function POST(req) {
  try {
    const uid = req.headers.get('uid');
    const formData = await req.formData();

    const file = formData.get('archivo');
    const estado = formData.get('estado');
    const partida_inicial = formData.get('partida_inicial');
    const otro_perforador_id = formData.get('otro_perforador_id');
    const tubulares_estado_barra_id =
      formData.get('tubulares_estado_barra_id') &&
      parseInt(formData.get('tubulares_estado_barra_id'));
    const cantidad =
      formData.get('cantidad') && parseInt(formData.get('cantidad'));
    const tubulares_destino_id =
      formData.get('tubulares_destino_id') &&
      parseInt(formData.get('tubulares_destino_id'));
    const tubular_id =
      formData.get('tubular_id') && parseInt(formData.get('tubular_id'));
    const tubulares_taller_id =
      formData.get('tubulares_taller_id') &&
      parseInt(formData.get('tubulares_taller_id'));
    const tubulares_movimiento_origen_id =
      formData.get('tubulares_movimiento_origen_id') &&
      parseInt(formData.get('tubulares_movimiento_origen_id'));

    const tubulares_rango_id =
      formData.get('tubulares_rango_id') &&
      parseInt(formData.get('tubulares_rango_id'));
    const tubulares_tipo_barra_id =
      formData.get('tubulares_tipo_barra_id') &&
      parseInt(formData.get('tubulares_tipo_barra_id'));
    const tubulares_tipo_conexion_id =
      formData.get('tubulares_tipo_conexion_id') &&
      parseInt(formData.get('tubulares_tipo_conexion_id'));
    const tipo_documento = formData.get('tipo_documento');
    const fechaExpiracionDoc = formData.get('fecha_expiracion_documento');

    const data = await prisma.$transaction(
      async (prismaTx) => {
        const tubular = await prismaTx.tubulares.findUnique({
          where: { id: tubular_id },
          select: {
            id: true,
            perforador_locacion: {
              select: {
                id: true,
                perforador_id: true,
              },
            },
          },
        });

        if (!tubular) {
          throw new ApiError(400, 'Tubular no encontrado');
        }

        const payload = {
          cantidad,
          tubular_id: tubular.id,
          perforador_locacion_id: tubular.perforador_locacion.id,
          perforador_id: tubular.perforador_locacion.perforador_id,
          usuario_id: parseInt(uid),
          tubulares_destino_id,
          estado: '',
          fecha: new Date(),
        };

        if (estado) payload.estado = estado;
        if (tubulares_rango_id) {
          payload.tubulares_rango_id = tubulares_rango_id;
        }
        if (tubulares_estado_barra_id) {
          payload.tubulares_estado_barra_id = tubulares_estado_barra_id;
        }
        if (tubulares_tipo_barra_id) {
          payload.tubulares_tipo_barra_id = tubulares_tipo_barra_id;
        }
        if (tubulares_tipo_conexion_id) {
          payload.tubulares_tipo_conexion_id = tubulares_tipo_conexion_id;
        }
        if (tubulares_taller_id) {
          payload.tubulares_taller_id = tubulares_taller_id;
        }

        const existeMovimiento = await obtenerMovimientoTubular({
          filters: payload,
          prismaTx,
        });

        if (!existeMovimiento && partida_inicial) {
          await prismaTx.tubulares.update({
            where: { id: tubular.id },
            data: { cantidad_inicial: cantidad },
          });
        }

        if (
          existeMovimiento?.estado ===
          ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_PENDIENTE
        ) {
          throw new ApiError(
            400,
            `${existeMovimiento?.tubulares_destino?.nombre} tiene un movimiento con documentación pendiente`
          );
        }

        const tubularesMovimiento = existeMovimiento
          ? prismaTx.tubulares_movimientos.update({
              where: { id: existeMovimiento.id },
              data: {
                estado: payload.estado,
                fecha: payload.fecha,
                cantidad: payload.cantidad + existeMovimiento.cantidad,
                tubulares_estado_barra_id: payload.tubulares_estado_barra_id,
              },
            })
          : await prismaTx.tubulares_movimientos.create({ data: payload });

        if (
          otro_perforador_id &&
          tubulares_destino_id === DESTINOS_TUBULARES.OTRO_PERFORADOR
        ) {
          const tubularPrestamo = await prismaTx.tubulares.findFirst({
            where: {
              perforador_locacion: {
                perforador_id: Number(otro_perforador_id),
                activo: true,
              },
            },
            select: {
              id: true,
              tubulares_movimientos: {
                orderBy: { creado_el: 'asc' },
              },
            },
          });

          if (!tubularPrestamo) {
            throw new ApiError(400, 'El Tubular a prestar no fue encontrado');
          }

          await prismaTx.tubulares_movimientos_prestamos.create({
            data: {
              cantidad: payload.cantidad,
              tubular: {
                connect: { id: tubularPrestamo.id },
              },
              movimiento_origen: {
                connect: { id: tubularesMovimiento.id },
              },
              movimiento_destino: {
                connect: {
                  id: tubularPrestamo?.tubulares_movimientos?.[0]?.id,
                },
              },
            },
          });
        }

        if (file) {
          const urlFile = await uploadFile(
            file,
            UPLOAD_DIRECTORIES.PRIVATE.TUBULARES
          );
          if (!urlFile) throw new ApiError(400, 'Falta el archivo');

          const tubularesDocData = {
            tubulares_movimiento_id: tubularesMovimiento?.id,
            ruta: urlFile,
            tipo: tipo_documento,
            fecha: new Date(),
          };
          if (fechaExpiracionDoc) {
            tubularesDocData.fecha_expiracion = new Date(fechaExpiracionDoc);
          }
          tubularesMovimiento.tubulares_documento =
            await prismaTx.tubulares_documentos.create({
              data: tubularesDocData,
            });
        }

        if (!existeMovimiento && tubulares_movimiento_origen_id) {
          tubularesMovimiento.tubulares_movimientos_conexion =
            await prismaTx.tubulares_movimientos_conexiones.create({
              data: {
                tubulares_movimiento_origen_id,
                tubulares_movimiento_destino_id: tubularesMovimiento.id,
              },
            });
        }

        return tubularesMovimiento;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
