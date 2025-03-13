import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const ubicacionId = searchParams.get('ubicacion_id');
    const estadoCronogramaId = searchParams.get('estado_cronograma_id');
    const includePerforadoresForecast = searchParams.get(
      'include_perforadores_forecast'
    );
    const fechaInicioTareaForecast = searchParams.get(
      'fecha_inicio_tarea_forecast'
    );
    const fechaFinTareaForecast = searchParams.get('fecha_fin_tarea_forecast');

    const whereClause = { eliminado: false };
    const includeClause = {
      estado_cronograma: true,
      ubicacion: true,
      usuario: true,
      perforadores_cronograma: {
        include: {
          locaciones_perforador_cronograma: {
            where: { deshabilitado: false },
            include: {
              locacion: true,
            },
          },
          perforador: true,
        },
      },
    };

    if (ubicacionId) {
      whereClause.ubicacion_id = parseInt(ubicacionId);
    }
    if (estadoCronogramaId) {
      whereClause.estado_cronograma_id = parseInt(estadoCronogramaId);
    }

    if (includePerforadoresForecast) {
      includeClause.perforadores_forecast = {
        where: {
          eliminado: false,
        },
        include: {
          perforador: {
            include: {
              perforadores_cronograma: {
                where: {
                  cronograma: {
                    eliminado: false,
                    ubicacion_id: parseInt(ubicacionId),
                  },
                },
                include: {
                  locaciones_perforador_cronograma: {
                    where: {
                      OR: [
                        {
                          fecha_inicio: {
                            gte: new Date(fechaInicioTareaForecast),
                            lt: new Date(fechaFinTareaForecast),
                          },
                        },
                        {
                          fecha_fin: {
                            gte: new Date(fechaInicioTareaForecast),
                            lt: new Date(fechaFinTareaForecast),
                          },
                        },
                        {
                          AND: [
                            {
                              fecha_inicio: {
                                lte: new Date(fechaInicioTareaForecast),
                              },
                            },
                            {
                              fecha_fin: {
                                gte: new Date(fechaFinTareaForecast),
                              },
                            },
                          ],
                        },
                      ],
                    },
                    include: {
                      locacion: true,
                    },
                  },
                },
              },
            },
          },
          tareas_forecast: {
            where: {
              eliminado: false,
              fecha: {
                gte: new Date(fechaInicioTareaForecast),
                lte: new Date(fechaFinTareaForecast),
              },
            },
            include: {
              tipo_tarea_forecast: true,
              locacion_perforador_cronograma: true,
              perforador_forecast: true,
            },
            orderBy: {
              fecha: 'asc',
            },
          },
        },
      };
    }

    const cronogramas = await prisma.cronogramas.findMany({
      where: whereClause,
      include: includeClause,
    });

    const cronogramasConDTM = cronogramas.map((item) => {
      item.perforadores_cronograma = item.perforadores_cronograma.map((m) => {
        m.locaciones_perforador_cronograma = fillDateGaps(
          m.locaciones_perforador_cronograma
        );
        return m;
      });
      return item;
    });

    return NextResponse.json(cronogramasConDTM, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  try {
    const { ubicacion_id, ...data } = await req.json();
    const uid = req.headers.get('uid');

    const estado_cronograma = await prisma.estados_cronograma.findFirst({
      where: { nombre: 'Pendiente' },
      select: { id: true },
    });

    const cronograma = await prisma.cronogramas.create({
      data: {
        ...data,
        usuario: {
          connect: {
            id: parseInt(uid),
          },
        },
        ubicacion: {
          connect: {
            id: parseInt(ubicacion_id),
          },
        },
        estado_cronograma: {
          connect: {
            id: parseInt(estado_cronograma?.id),
          },
        },
      },
    });
    return NextResponse.json(cronograma, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

function fillDateGaps(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push({ ...arr[i], tipo: 'LOCACION' });

    if (i < arr.length - 1) {
      let currentEnd = new Date(arr[i].fecha_fin);
      let nextStart = new Date(arr[i + 1].fecha_inicio);

      let gapStart = new Date(currentEnd);
      gapStart.setDate(gapStart.getDate() + 1);

      let gapEnd = new Date(nextStart);
      gapEnd.setDate(gapEnd.getDate() - 1);

      if (gapStart <= gapEnd) {
        result.push({
          fecha_inicio: gapStart.toISOString(),
          fecha_fin: gapEnd.toISOString(),
          locacion: null,
          id: 0,
          tipo: 'DTM',
        });
      }
    }
  }

  return result;
}
