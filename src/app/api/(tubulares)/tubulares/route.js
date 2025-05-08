import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function POST(req) {
  try {
    const { perforador_locacion_id, plan_pozo_id, perforador_id } =
      await req.json();

    const data = {};

    if (plan_pozo_id) data.plan_pozo_id = Number(plan_pozo_id);
    if (perforador_id) data.perforador_id = Number(perforador_id);
    if (perforador_locacion_id) {
      data.perforador_locacion_id = Number(perforador_locacion_id);
    }

    const tubular = await prisma.tubulares.create({ data });
    return NextResponse.json(tubular, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
