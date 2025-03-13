import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function PUT(req, { params }) {
  try {
    //const { id } = params;
    const { plan_pozo_id } = await req.json();

    const planPozo = await prisma.$transaction(
      async (prismaTx) => {
        const planesPozo = await prisma.planes_pozo.findFirst({
          where: { id: parseInt(plan_pozo_id) },
        });
        console.log('planesPozo: ', planesPozo);
        if (!planesPozo) {
          return;
        }

        //actualizar perforador locacion a inactivo para perforador id dado
        await prismaTx.perforador_locaciones.update({
          where: {
            id: planesPozo.perforador_locacion_id,
            perforador_id: planesPozo.perforador_id,
          },
          data: {
            actualizado_el: new Date(),
            activo: false,
          },
        });

        //actualiza plan de pozo a inactivo
        const data = {
          actualizado_el: new Date(),
          activo: false,
        };
        const planPozo = await prismaTx.planes_pozo.update({
          where: { id: parseInt(plan_pozo_id) },
          data,
        });

        return planPozo;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      { planPozo, message: 'El plan de pozo se ha finalizado correctamente.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al finalizar plan pozo' },
      { status: 500 }
    );
  }
}
