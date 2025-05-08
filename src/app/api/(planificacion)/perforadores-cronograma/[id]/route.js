import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  try {
    const { id } = await params;
    const lastLocacionPerforadorCronograma = searchParams.get(
      'last_locacion_perforador_cronograma'
    );

    const includeClause = {
      cronograma: {
        include: {
          perforadores_cronograma: true,
          estado_cronograma: true,
          ubicacion: true,
        },
      },
      locaciones_perforador_cronograma: {
        include: {
          locacion: true,
        },
      },
      perforador: true,
    };

    if (lastLocacionPerforadorCronograma) {
      includeClause.locaciones_perforador_cronograma = {
        take: 1,
        orderBy: { creado_el: 'desc' },
        include: {
          locacion: true,
        },
      };
    }

    const perforadorCronograma =
      await prisma.perforadores_cronograma.findUnique({
        where: { id: Number(id) },
        include: includeClause,
      });

    return NextResponse.json(perforadorCronograma, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
