import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  try {
    const { numero: numeroPerforador } = await params;
    const nombrePerforador = searchParams.get('nombre_perforador');

    if (!numeroPerforador) {
      throw new ApiError(400, 'Falta el id del perforador');
    }
    if (!nombrePerforador) {
      throw new ApiError(400, 'Falta el nombre del perforador');
    }

    const planesPozo = await prisma.planes_pozo.findFirst({
      where: {
        activo: true,
        perforador: {
          numero: Number(numeroPerforador),
          nombre: {
            contains: nombrePerforador,
          },
        },
      },
      include: {
        perforador_locacion: {
          include: {
            locacion: true,
          },
        },
      },
    });

    return NextResponse.json(planesPozo, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener plan de pozo',
    });
  }
}
