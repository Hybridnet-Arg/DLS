import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const {
      perforador_locacion_id,
      plan_pozo_id,
      perforador_id,
      tubulares_movimiento_id,
    } = await req.json();

    const data = {};

    if (plan_pozo_id) data.plan_pozo_id = Number(plan_pozo_id);
    if (perforador_id) data.perforador_id = Number(perforador_id);
    if (perforador_locacion_id) {
      data.perforador_locacion_id = Number(perforador_locacion_id);
    }

    if (tubulares_movimiento_id && perforador_locacion_id) {
      data.tubulares_movimientos = {
        update: {
          where: {
            id: Number(tubulares_movimiento_id),
          },
          data: {
            perforador_locacion_id: Number(perforador_locacion_id),
          },
        },
      };
    }

    const tubular = await prisma.tubulares.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(tubular, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
