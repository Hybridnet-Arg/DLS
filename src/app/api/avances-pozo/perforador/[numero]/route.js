import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(_request, { params }) {
  try {
    const { numero } = params;
    const avanceDePozo = await prisma.avances_pozo.findFirst({
      where: {
        pozo: {
          perforador_locacion: {
            perforador: {
              numero: Number(numero),
            },
          },
        },
      },
      orderBy: { creado_el: 'desc' },
    });

    return NextResponse.json(avanceDePozo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener el avance de pozo' },
      { status: 500 }
    );
  }
}
