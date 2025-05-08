import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data = {
      ...body,
      actualizado_el: new Date(),
    };

    const updatedRecord = await prisma.locaciones_perforador_cronograma.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
