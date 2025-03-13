import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(_req, { params }) {
  try {
    const { id } = params;

    const pozo = await prisma.pozos.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json({ pozo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener el pozo' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const currentDate = new Date();

    const pozo = await prisma.pozos.update({
      where: { id: Number(id) },
      data: { ...body, actualizado_el: currentDate },
    });

    return NextResponse.json(
      { pozo, message: 'Pozo actualizado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar el pozo' },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;

    await prisma.pozos.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Pozo eliminado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar el pozo' },
      { status: 500 }
    );
  }
}
