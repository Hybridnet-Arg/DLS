import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req, { params }) {
  try {
    const { numero } = params;
    const { searchParams } = new URL(req.url);

    const include = {};
    const lastAvancePozo = searchParams.get('include_plan_pozo');
    const includeLocaciones = searchParams.get('include_locaciones');

    if (lastAvancePozo) {
      include.planes_pozo = {
        where: {
          activo: true,
        },
        include: {
          pozos: {
            include: {
              etapas_pozo: {
                include: {
                  tipo_etapa_pozo: true,
                },
              },
            },
          },
          perforador_locacion: {
            include: {
              locacion: true,
            },
          },
        },
      };
    }

    if (includeLocaciones) {
      include.perforador_locaciones = {
        where: {
          activo: true,
        },
        include: {
          locacion: true,
        },
      };
    }

    const perforador = await prisma.perforadores.findFirst({
      where: { numero: Number(numero) },
      include,
    });

    return NextResponse.json(perforador, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener el perforador' },
      { status: 500 }
    );
  }
}
