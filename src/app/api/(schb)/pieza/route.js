import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const perforador = searchParams.get('perforador');

    if (!perforador) {
      throw new ApiError(400, 'EL numero del perforador es requerido');
    }

    const whereClause = {
      enUso: 0,
      baja: 0,
      perforador,
      motivo: { equals: null },
    };

    const selectClause = {
      _count: {
        select: {
          perforadorPieza: {
            where: whereClause,
          },
        },
      },
      idPieza: true,
      nroPieza: true,
      tipo: true,
      codigo: true,
      hsMax: true,
      hsMin: true,
      idTipoPieza: true,
      piezaPerforador: {
        where: {
          perforador,
        },
      },
    };

    const tiposPieza = await prisma.pieza.findMany({
      where: {
        perforadorPieza: {
          some: whereClause,
        },
      },
      select: selectClause,
      orderBy: {
        tipo: 'asc',
      },
    });

    const sinPiezas = await prisma.pieza.findMany({
      where: {
        perforadorPieza: {
          some: {
            perforador,
          },
        },
        tipo: {
          not: {
            in: tiposPieza?.map((pieza) => pieza?.tipo),
          },
        },
      },
      select: selectClause,
      distinct: ['tipo'],
      orderBy: {
        tipo: 'asc',
      },
    });

    return NextResponse.json([...tiposPieza, ...sinPiezas], { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
