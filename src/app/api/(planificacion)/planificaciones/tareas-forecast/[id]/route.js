import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function DELETE(req, { params }) {
  const { searchParams } = new URL(req.url);
  try {
    const { id } = await params;
    const planificacion_area_id = searchParams.get('planificacion_area_id');
    const planificacion_actividad_ids = searchParams.getAll(
      'planificacion_actividad_ids[]'
    );

    if (
      !planificacion_actividad_ids &&
      planificacion_actividad_ids?.length === 0
    ) {
      throw new ApiError(400, 'Falta id/s de actividades');
    }

    const data = await prisma.$transaction(
      async (prismaTx) => {
        const planificacion = await prismaTx.planificaciones.updateMany({
          where: {
            tarea_forecast_id: Number(id),
            planificacion_actividad_id: {
              in: planificacion_actividad_ids.map((id) => Number(id)),
            },
          },
          data: { eliminado: true },
        });

        const nota = await prismaTx.planificacion_notas.findUnique({
          where: {
            tarea_forecast_id_planificacion_area_id: {
              planificacion_area_id: Number(planificacion_area_id),
              tarea_forecast_id: Number(id),
            },
          },
        });

        if (nota?.id) {
          await prismaTx.planificacion_notas.delete({
            where: { id: nota?.id },
          });
        }

        return planificacion;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
