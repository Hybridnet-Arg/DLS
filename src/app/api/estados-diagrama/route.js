import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const estadosDiagrama = await prisma.estados_diagrama.findMany({
      include: {
        plan_pozo: true,
        perforador: true,
        detalles_estado_diagrama: true,
      },
    });
    return NextResponse.json({ estadosDiagrama }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener los diagramas de estados',
    });
  }
}
