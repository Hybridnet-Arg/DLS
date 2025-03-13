import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function POST(req) {
  try {
    const { cronograma_id, nombre_perforador, numero } = await req.json();
    if (!cronograma_id) {
      throw new ApiError(400, 'Falta el id del cronograma');
    }

    const data = {
      cronograma: {
        connect: { id: parseInt(cronograma_id) },
      },
    };

    if (nombre_perforador && numero) {
      const perforador = await prisma.perforadores.findFirst({
        where: {
          nombre: nombre_perforador,
          numero: Number(numero),
          perforadores_cronograma: { none: {} },
        },
      });

      if (!perforador) {
        throw new ApiError(
          400,
          `No se encontró un perforador con el nombre ${nombre_perforador} y el número ${numero}`
        );
      }

      data.perforador = {
        connect: { id: perforador?.id },
      };
    }

    const newRecord = await prisma.perforadores_cronograma.create({ data });

    return NextResponse.json(newRecord, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
