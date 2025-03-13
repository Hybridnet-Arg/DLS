import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const records = await prisma.tipos_tarea_forecast.findMany({
      where: { eliminado: false },
    });
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
