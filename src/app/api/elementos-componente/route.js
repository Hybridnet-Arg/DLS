import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};

    const componenteId = searchParams.get('componente_id');
    const perforadorId = searchParams.get('perforador_id');
    const numeroPerforador = searchParams.get('numero_perforador');

    if (perforadorId) {
      whereQuery.componente_perforador = {
        perforador: { id: parseInt(perforadorId) },
      };
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

    const elementos_componente = await prisma.elementos_componente.findMany({
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
