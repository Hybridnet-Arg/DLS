import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);

  try {
    const { id } = await params;

    const includeElementosDeposito = searchParams.get(
      'include_elementos_deposito'
    );
    const includeElementosDepositoDisponibles = searchParams.get(
      'include_elementos_deposito_disponibles'
    );

    const elementoDepositoInclude = {
      deposito: true,
      tipo_rosca: true,
      modelo: {
        include: {
          marca: true,
        },
      },
    };

    const includeQuery = {
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
        include: elementoDepositoInclude,
      },
    };

    if (includeElementosDeposito) {
      includeQuery.elementos_deposito = {
        where: {
          baja: false,
          en_uso: false,
        },
        include: elementoDepositoInclude,
      };
    }

    const elementoComponente = await prisma.elementos_componente.findFirst({
      where: {
        id: Number(id),
      },
      include: includeQuery,
    });

    if (includeElementosDepositoDisponibles) {
      const elementosDisponibles = await prisma.elementos_deposito.findMany({
        where: {
          elemento_componente_id: elementoComponente.id,
          en_uso: false,
          baja: false,
        },
        include: elementoDepositoInclude,
      });

      return NextResponse.json(
        serializedData({
          ...elementoComponente,
          elementos_disponibles: elementosDisponibles,
        }),
        { status: 200 }
      );
    }

    return NextResponse.json(serializedData(elementoComponente), {
      status: 200,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
