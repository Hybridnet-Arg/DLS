import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const pieza = await prisma.perforadorPieza.findUnique({
      where: { idPerforadorPieza: Number(id) },
    });
    return NextResponse.json(pieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const {
      hsInst,
      enUso,
      motivo,
      bomba,
      cuerpo,
      modulo,
      idPieza,
      idMarca,
      idModelo,
      idDiametro,
      serie,
    } = await req.json();

    const perforadorPieza = await prisma.perforadorPieza.update({
      where: { idPerforadorPieza: Number(id) },
      data: {
        hsInst,
        enUso,
        motivo,
        bomba,
        cuerpo,
        modulo,
        idPieza,
        idMarca,
        idModelo,
        idDiametro,
        serie,
      },
    });
    return NextResponse.json(perforadorPieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const perforadorPieza = await prisma.perforadorPieza.update({
      where: { idPerforadorPieza: Number(id) },
      data: { baja: 1 },
    });
    return NextResponse.json(perforadorPieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
