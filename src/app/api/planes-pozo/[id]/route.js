import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { pozos, ...body } = await req.json();

    const planPozo = await prisma.$transaction(
      async (prismaTx) => {
        const updatePozosQuery = pozos.map(({ etapas_pozo, ...pozo }) => {
          const etapasPozoQuery = etapas_pozo.map((etapa) => ({
            where: { id: parseInt(etapa?.id) },
            data: {
              profundidad_desde: etapa?.profundidad_desde,
              profundidad_hasta: etapa?.profundidad_hasta,
              duracion: etapa?.duracion,
              encamisado: etapa?.encamisado,
              casing: etapa?.casing,
            },
          }));

          return {
            where: { id: parseInt(pozo?.id) },
            data: {
              nombre: pozo?.nombre,
              nombre_clave: pozo?.nombre,
              fecha_inicio: pozo?.fecha_inicio,
              fecha_fin: pozo?.fecha_fin,
              etapas_pozo: {
                update: etapasPozoQuery,
              },
            },
          };
        });

        const data = {
          ...body,
          actualizado_el: new Date(),
          pozos: {
            update: updatePozosQuery,
          },
        };

        const planPozo = await prismaTx.planes_pozo.update({
          where: { id: parseInt(id) },
          data,
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
          },
        });

        return planPozo;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      { planPozo, message: 'Plan pozo creado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear el plan pozo' },
      { status: 500 }
    );
  }
}
