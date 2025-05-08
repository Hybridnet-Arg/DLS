import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};
    const { numero: numeroPerforador } = await params;

    const elementoId = searchParams.get('elemento_id');
    const componenteId = searchParams.get('componente_id');
    const nombrePerforador = searchParams.get('nombre_perforador');

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
        perforador: {
          numero: parseInt(numeroPerforador),
          nombre: nombrePerforador,
        },
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
    return apiErrorHandler(error);
  }
}
