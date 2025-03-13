import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import { NextResponse } from 'next/server';

export async function PUT(_req, { params }) {
  try {
    const { id } = params;
    const elementoDeposito = await prisma.elementos_deposito.update({
      where: { id: parseInt(id) },
      data: {
        en_uso: true,
        baja: false,
        fecha_instalacion: new Date(),
      },
    });

    return NextResponse.json(serializedData(elementoDeposito), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al actualizar el elemento componente' },
      { status: 500 }
    );
  }
}
