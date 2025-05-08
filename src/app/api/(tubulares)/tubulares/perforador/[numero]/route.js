import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);

  try {
    const { numero } = await params;
    const nombre = searchParams.get('nombre');

    const tubular = await prisma.tubulares.findFirst({
      where: {
        activo: true,
        perforador: {
          numero: Number(numero),
          nombre,
        },
      },
      include: {
        tubulares_movimientos_prestamos: true,
        tubulares_movimientos: {
          include: {
            tubulares_rango: true,
            tubulares_taller: true,
            tubulares_destino: true,
            tubulares_tipo_barra: true,
            tubulares_documentos: true,
            tubulares_estado_barra: true,
            tubulares_tipo_conexion: true,
            tubulares_movimientos_conexiones_origen: {
              include: {
                movimiento_destino: true,
              },
            },
            tubulares_movimientos_conexiones_destino: true,
            tubulares_movimientos_prestamos_origen: {
              include: {
                movimiento_destino: {
                  include: {
                    perforador: true,
                  },
                },
              },
            },
            tubulares_movimientos_prestamos_destino: true,
          },
        },
        perforador_locacion: {
          include: {
            locacion: true,
            perforador: true,
          },
        },
      },
    });

    return NextResponse.json(tubular, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
