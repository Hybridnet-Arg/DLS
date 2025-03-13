import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};
    const numeroPerforador = params?.numero;

    const elementoId = searchParams.get('elemento_id');
    const componenteId = searchParams.get('componente_id');

    if (elementoId) {
      whereQuery.elemento_id = parseInt(elementoId);
    }
    if (componenteId) {
      whereQuery.componente_perforador = {
        ...whereQuery.componente_perforador,
        componente: { id: parseInt(componenteId) },
      };
    }
    if (numeroPerforador) {
      whereQuery.componente_perforador = {
        ...whereQuery.componente_perforador,
        perforador: { numero: parseInt(numeroPerforador) },
      };
    }

    const elementos_componente = await prisma.elementos_componente.findFirst({
      where: whereQuery,
      include: {
        componente_perforador: {
          include: {
            componente: true,
          },
        },
        elemento: {
          include: {
            tipo_elemento: true,
          },
        },
        elementos_deposito: {
          where: {
            en_uso: true,
            baja: false,
          },
          take: 1,
        },
      },
    });

    return NextResponse.json(serializedData(elementos_componente), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
