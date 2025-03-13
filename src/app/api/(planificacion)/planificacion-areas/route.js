import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const areas = await prisma.planificacion_areas.findMany({
      where: {
        deshabilitado: false,
      },
      include: {
        planificacion_actividades: true,
      },
    });

    return NextResponse.json(areas, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
