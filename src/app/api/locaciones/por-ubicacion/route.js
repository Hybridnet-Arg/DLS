import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const locacionesPorUbicacion = await prisma.ubicaciones.findMany({
      include: {
        locaciones: {
          where: {
            deshabilitado: false,
            eliminado: false,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    return NextResponse.json(
      { locacionesPorUbicacion },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          Pragma: 'no-cache',
        },
      }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
