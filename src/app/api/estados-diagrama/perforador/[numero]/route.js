import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(_request, { params }) {
  try {
    const { numero } = await params;
    const whereQuery = {
      perforador: { numero: Number(numero) },
      plan_pozo: { activo: true },
    };

    const estadoDiagrama = await prisma.estados_diagrama.findFirst({
      where: whereQuery,
      include: {
        detalles_estado_diagrama: {
          include: {
            etapa_pozo: {
              include: {
                tipo_etapa_pozo: true,
              },
            },
            pozo: {
              include: {
                avances_pozo: {
                  take: 1,
                  orderBy: { creado_el: 'desc' },
                },
              },
            },
          },
        },
        plan_pozo: {
          include: {
            perforador_locacion: {
              include: {
                locacion: true,
              },
            },
            pozos: true,
          },
        },
        perforador: true,
      },
      orderBy: { creado_el: 'desc' },
    });

    return NextResponse.json(estadoDiagrama, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
