import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  try {
    const { numero } = await params;
    const nombrePerforador = searchParams.get('nombre_perforador');
    const componenteId = searchParams.get('componente_id');

    const elementoDeposito = await prisma.elementos_deposito.findFirst({
      where: {
        en_uso: true,
        baja: false,
        elemento_componente: {
          componente_perforador: {
            componente_id: Number(componenteId),
            perforador: {
              numero: Number(numero),
              nombre: nombrePerforador,
            },
          },
        },
      },
      orderBy: {
        actualizado_el: 'desc',
      },
    });

    return NextResponse.json(serializedData(elementoDeposito), { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
