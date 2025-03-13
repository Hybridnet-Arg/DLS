import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { Prisma } from '@prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = { activo: true };
    const includePozoQuery = {};

    const nombre = searchParams.get('nombre');
    const numeroPerforador = searchParams.get('numero_perforador');
    const etapasPozo = searchParams.get('include_etapas_pozo');
    const estadosPozo = searchParams.get('include_estados_pozo');
    const perforador_locacion = searchParams.get('include_perforador_locacion');

    if (estadosPozo) {
      includePozoQuery.estados_pozo = true;
    }
    if (etapasPozo) {
      includePozoQuery.etapas_pozo = {
        include: {
          tipo_etapa_pozo: true,
        },
      };
    }
    if (perforador_locacion) {
      includePozoQuery.perforador_locacion = {
        include: {
          perforador: true,
          locacion: true,
        },
      };
    }

    if (nombre) whereQuery.nombre = { contains: nombre };
    if (numeroPerforador) {
      whereQuery.pozos = {
        some: {
          activo: true,
          perforador_locacion: {
            activo: true,
            perforador: {
              numero: Number(numeroPerforador),
            },
          },
        },
      };
    }

    const planesPozo = await prisma.planes_pozo.findMany({
      where: whereQuery,
      include: {
        pozos: {
          orderBy: { en_progreso: 'desc' },
          include: {
            ...includePozoQuery,
            avances_pozo: {
              take: 1,
              include: {
                detalles_avance_pozo: true,
              },
              orderBy: { creado_el: 'desc' },
            },
          },
        },
      },
    });

    return NextResponse.json({ planesPozo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { pozos, ...body } = await req.json();

    const planPozo = await prisma.$transaction(
      async (prismaTx) => {
        const query = Prisma.sql`
          SELECT l.*
          FROM locaciones l
          INNER JOIN perforador_locaciones pl
          ON l.id = pl.locacion_id
          WHERE l.id = ${parseInt(body?.locacion_id)};
        `;

        const resultQuery = await prismaTx.$queryRaw(query);

        // check if location is present in perforador_locaciones
        if (resultQuery && resultQuery.length > 0) {
          throw new Error('La locación seleccionada no está disponible.');
        }

        const createPerforadorLocacion = {
          locacion_id: parseInt(body?.locacion_id),
          perforador_id: body?.perforador_id,
          activo: true,
        };
        const perforadorLocacion = await prismaTx.perforador_locaciones.create({
          data: createPerforadorLocacion,
        });

        if (!perforadorLocacion) {
          throw new Error('Error al asignar locación al perforador.');
        }

        const createPozosQuery = pozos.map((pozo) => ({
          activo: true,
          etapas_pozo: { create: pozo?.etapas_pozo },
          perforador_locacion_id: perforadorLocacion.id,
        }));

        const createPlanPozoQuery = {
          fecha_inicio: body?.fecha_inicio,
          fecha_fin: body?.fecha_fin,
          perforador_id: body?.perforador_id,
          perforador_locacion_id: perforadorLocacion.id,
          activo: true,
          pozos: {
            create: createPozosQuery,
          },
          estado_diagrama: {
            create: { perforador_id: body?.perforador_id },
          },
        };

        const planPozo = await prismaTx.planes_pozo.create({
          data: createPlanPozoQuery,
          include: {
            perforador_locacion: {
              include: { locacion: true, perforador: true },
            },
            pozos: {
              include: {
                etapas_pozo: {
                  include: {
                    tipo_etapa_pozo: true,
                  },
                },
              },
            },
            estado_diagrama: true,
          },
        });

        const detallesEstadoDiagramaPayload = planPozo?.pozos
          ?.map((pozo) => pozo?.etapas_pozo)
          ?.flat()
          ?.map((etapa) => ({
            etapa_pozo_id: etapa?.id,
            estado_diagrama_id: planPozo?.estado_diagrama?.id,
            pozo_id: etapa?.pozo_id,
          }));

        await prismaTx.detalles_estado_diagrama.createMany({
          data: detallesEstadoDiagramaPayload,
        });

        return planPozo;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      { planPozo, message: 'Plan pozo creado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Error al crear el plan pozo.' },
      { status: 500 }
    );
  }
}
