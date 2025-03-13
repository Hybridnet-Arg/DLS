import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  try {
    const tipos_pieza = await prisma.tiposPieza.findMany({
      include: {
        marcasTipoPieza: {
          include: {
            marca: true,
          },
        },
      },
    });
    return NextResponse.json(tipos_pieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
