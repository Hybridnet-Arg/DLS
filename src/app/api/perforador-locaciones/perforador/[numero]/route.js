import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  try {
    const includeQuery = {};
    const { numero } = await params;

    const includePozoEnProgreso = searchParams.get('include_pozo_en_progreso');
    const includePlanesPozo = searchParams.get('include_planes_pozo');

    if (includePozoEnProgreso) {
      includeQuery.pozos = {
        where: {
          en_progreso: true,
        },
        take: 1,
        include: {
          plan_pozo: true,
        },
      };
    }
    if (includePlanesPozo) {
      includeQuery.planes_pozo = {
        where: { activo: true },
        orderBy: { creado_el: 'desc' },
      };
    }

    const perforadorLocacion = await prisma.perforador_locaciones.findFirst({
      where: { perforador: { numero: Number(numero) } },
      include: includeQuery,
    });

    return NextResponse.json(perforadorLocacion, { status: 200 });
  } catch (error) {
    return (
      apiErrorHandler(error),
      {
        fallbackMessage: 'Error al obtener la locación del perforador',
      }
    );
  }
}
