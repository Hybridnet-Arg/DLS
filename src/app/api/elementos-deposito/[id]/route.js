import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const elementoDeposito = await prisma.elementos_deposito.findUnique({
      where: { id: Number(id) },
      include: {
        elemento_componente: {
          include: {
            componente_perforador: {
              include: {
                componente: true,
                perforador: true,
              },
            },
            elemento: {
              include: {
                tipo_elemento: true,
              },
            },
          },
        },
        deposito: true,
        modelo: {
          include: {
            marca: true,
          },
        },
        tipo_rosca: true,
      },
    });

    return NextResponse.json(serializedData(elementoDeposito), { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const {
      marca_id,
      modelo_id,
      diametro_id,
      tipo_rosca_id,
      elemento_componente_id,
      numero_perforador,
      ...body
    } = await req.json();

    if (marca_id) {
      body.marca = { connect: { id: Number(marca_id) } };
    }
    if (modelo_id) {
      body.modelo = { connect: { id: Number(modelo_id) } };
    }
    if (diametro_id) {
      body.diametro = { connect: { id: Number(diametro_id) } };
    }
    if (tipo_rosca_id) {
      body.tipo_rosca = { connect: { id: Number(tipo_rosca_id) } };
    }
    if (elemento_componente_id) {
      body.elemento_componente = {
        connect: { id: Number(elemento_componente_id) },
      };
    }

    const elementoDeposito = await prisma.elementos_deposito.update({
      where: { id: Number(id) },
      data: { ...body, actualizado_el: new Date() },
    });

    return NextResponse.json(
      {
        elementoDeposito: serializedData(elementoDeposito),
        message: 'elemento deposito actualizado con exito',
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const uid = req.headers.get('uid');

    const elementoDeposito = await prisma.elementos_deposito.findUnique({
      where: { id: Number(id) },
      include: {
        elemento_componente: {
          include: {
            componente_perforador: true,
          },
        },
      },
    });

    if (!elementoDeposito) {
      throw new ApiError(404, 'Elemento deposito no encontrado');
    }

    await prisma.elementos_deposito.update({
      where: { id: Number(id) },
      data: {
        baja: true,
        log_elementos: {
          create: {
            baja: true,
            motivo_baja: 'ALMACEN',
            usuario_id: parseInt(uid),
            perforador_id:
              elementoDeposito?.elemento_componente?.componente_perforador
                ?.perforador_id,
            fecha_baja: new Date(),
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Se ha data de baja el elemento de deposito' },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
