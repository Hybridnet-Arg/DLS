import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function PUT(_req, { params }) {
  try {
    const { id } = await params;
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
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al actualizar el elemento componente',
    });
  }
}
