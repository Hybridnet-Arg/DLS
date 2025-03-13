import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const fechaInicio = searchParams.get('fecha_inicio');
    const fechaFin = searchParams.get('fecha_fin');
    const groupbyFecha = searchParams.get('group_by_fecha');
    const cronogramaId =
      searchParams.get('cronograma_id') &&
      Number(searchParams.get('cronograma_id'));

    if (groupbyFecha) {
      if (!fechaInicio || !fechaFin) {
        throw new ApiError(400, 'Faltan las fechas de inicio y fin');
      }

      const planificacionAgrupadaPorFecha = await prisma.$queryRaw`
      SELECT 
        tf.fecha,
        pa.id as actividad_id,
        COUNT(pa.id) as actividad_count
      FROM planificacion_areas AS pa
      INNER JOIN planificacion_actividades AS act ON pa.id = act.planificacion_area_id
      INNER JOIN planificaciones AS p ON act.id = p.planificacion_actividad_id
      INNER JOIN tareas_forecast AS tf ON p.tarea_forecast_id = tf.id
      INNER JOIN locaciones_perforador_cronograma AS lpc ON lpc.id = tf.locacion_perforador_cronograma_id 
      INNER JOIN perforadores_cronograma AS pc ON lpc.perforador_cronograma_id = pc.id
      WHERE tf.fecha BETWEEN ${new Date(fechaInicio)} AND ${new Date(fechaFin)}
      AND pc.cronograma_id = ${cronogramaId}
      AND p.eliminado = ${false}
      GROUP BY tf.fecha, pa.id
      ORDER BY tf.fecha ASC
     `;
      return NextResponse.json(planificacionAgrupadaPorFecha, { status: 200 });
    }

    const planificacion = await prisma.planificacion_areas.findMany({
      where: {
        planificacion_actividades: {
          some: {
            planificaciones: {
              some: {
                tarea_forecast: {
                  locacion_perforador_cronograma: {
                    perforador_cronograma: {
                      cronograma_id: cronogramaId,
                    },
                  },
                  fecha: {
                    gte: new Date(fechaInicio),
                    lte: new Date(fechaFin),
                  },
                },
                eliminado: false,
              },
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            planificacion_actividades: true,
          },
        },
        planificacion_actividades: {
          include: {
            _count: {
              select: {
                planificaciones: true,
              },
            },
            planificaciones: {
              where: {
                tarea_forecast: {
                  fecha: {
                    gte: new Date(fechaInicio),
                    lte: new Date(fechaFin),
                  },
                },
                eliminado: false,
              },
              include: {
                tarea_forecast: {
                  include: {
                    planificacion_notas: {
                      include: {
                        planificacion_area: true,
                      },
                    },
                    locacion_perforador_cronograma: {
                      include: {
                        perforador_cronograma: {
                          include: {
                            perforador: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const restoAreas = await prisma.planificacion_areas.findMany({
      where: {
        id: {
          notIn: planificacion.map((area) => area.id),
        },
      },
      include: {
        planificacion_actividades: true,
      },
    });
    const planificaciones = [...planificacion, ...restoAreas]?.sort(
      (a, b) => a.id - b.id
    );

    return NextResponse.json(planificaciones, {
      status: 200,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  try {
    const {
      planificacion_actividad_ids,
      tarea_forecast_id,
      nota,
      planificacion_area_id,
    } = await req.json();

    if (!planificacion_actividad_ids || !tarea_forecast_id) {
      throw new ApiError(400, 'Falta el id de la planificacion actividad');
    }

    const data = planificacion_actividad_ids.map(
      (planificacion_actividad_id) => ({
        planificacion_actividad_id,
        tarea_forecast_id,
      })
    );
    const planificaciones = await prisma.planificaciones.createMany({
      data,
    });

    if (nota) {
      await prisma.planificacion_notas.create({
        data: { nota, tarea_forecast_id, planificacion_area_id },
      });
    }

    return NextResponse.json(planificaciones, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PATCH(req) {
  try {
    const {
      planificacion_actividad_ids,
      tarea_forecast_id,
      nota,
      planificacion_area_id,
    } = await req.json();

    if (!planificacion_actividad_ids || !tarea_forecast_id) {
      throw new ApiError(400, 'Falta el id de la planificacion actividad');
    }

    const data = await prisma.$transaction(
      async (prismaTx) => {
        const planificacionOriginal = await prismaTx.planificaciones.findMany({
          where: {
            tarea_forecast_id: Number(tarea_forecast_id),
            planificacion_actividad: {
              planificacion_area_id: Number(planificacion_area_id),
            },
            eliminado: false,
          },
        });

        const planificacionPendiente = planificacion_actividad_ids.filter(
          (id) =>
            !planificacionOriginal
              .map((item) => item?.planificacion_actividad_id)
              .includes(id)
        );
        const planificacionNula = planificacionOriginal.filter(
          (item) =>
            !planificacion_actividad_ids.includes(
              item?.planificacion_actividad_id
            )
        );

        if (planificacionPendiente.length > 0) {
          const data = planificacionPendiente.map(
            (planificacion_actividad_id) => ({
              planificacion_actividad_id,
              tarea_forecast_id,
            })
          );
          await prismaTx.planificaciones.createMany({
            data,
          });
        }
        if (planificacionNula.length > 0) {
          await prismaTx.planificaciones.updateMany({
            where: {
              planificacion_actividad_id: {
                in: planificacionNula.map(
                  (item) => item?.planificacion_actividad_id
                ),
              },
              tarea_forecast_id: Number(tarea_forecast_id),
            },
            data: { eliminado: true },
          });
        }

        await prismaTx.planificacion_notas.upsert({
          where: {
            tarea_forecast_id_planificacion_area_id: {
              planificacion_area_id: Number(planificacion_area_id),
              tarea_forecast_id: Number(tarea_forecast_id),
            },
          },
          update: { nota },
          create: {
            nota,
            tarea_forecast_id: Number(tarea_forecast_id),
            planificacion_area_id: Number(planificacion_area_id),
          },
        });

        const planificaciones = await prismaTx.planificaciones.findMany({
          where: {
            tarea_forecast_id: Number(tarea_forecast_id),
            planificacion_actividad: {
              planificacion_area_id: Number(planificacion_area_id),
            },
            eliminado: false,
          },
        });
        return planificaciones;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
