import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function POST(req) {
  try {
    const { locacion_id, perforador_cronograma_id, cantidad_pozos, ...body } =
      await req.json();

    if (!locacion_id) {
      throw new ApiError(400, 'Falta el id de la locacion');
    }
    if (!perforador_cronograma_id) {
      throw new ApiError(400, 'Falta el id del perforador cronograma');
    }

    const data = {
      locacion: {
        connect: { id: parseInt(locacion_id) },
      },
      perforador_cronograma: {
        connect: { id: parseInt(perforador_cronograma_id) },
      },
      ...body,
    };

    if (cantidad_pozos) {
      data.cantidad_pozos = parseInt(cantidad_pozos);
    }

    const newRecord = await prisma.locaciones_perforador_cronograma.create({
      data,
    });

    return NextResponse.json(newRecord, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
