import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

async function obtenerPlanificacionDisponiblesPorTareaForecastId(
  tareaForecastId
) {
  const areas = await prisma.planificacion_areas.findMany({
    where: {
      deshabilitado: false,
      OR: [
        {
          planificacion_actividades: {
            some: {
              planificaciones: {
                some: {
                  eliminado: false,
                  tarea_forecast_id: tareaForecastId,
                },
              },
            },
          },
        },
        {
          planificacion_actividades: {
            none: {
              planificaciones: {
                some: {
                  eliminado: false,
                  tarea_forecast_id: tareaForecastId,
                },
              },
            },
          },
        },
      ],
    },
    include: {
      planificacion_actividades: {
        where: {
          planificaciones: {
            some: {
              eliminado: false,
              tarea_forecast_id: tareaForecastId,
            },
          },
        },
      },
    },
  });

  return areas;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const uid = req.headers.get('uid');

    let perforador_id =
      searchParams.get('perforador_id') &&
      Number(searchParams.get('perforador_id'));
    const fechaFin = searchParams.get('fecha_fin');
    const fechaInicioRaw = searchParams.get('fecha_inicio');
    const cronograma_id = searchParams.get('cronograma_id');
    const includeAreas = searchParams.get('include_areas');

    if (!perforador_id) {
      const user = await prisma.usuarios.findFirst({
        where: { id: parseInt(uid) },
        select: {
          perforador_seleccionado: true,
        },
      });
      perforador_id = user.perforador_seleccionado;
    }

    const fechaInicio = new Date(fechaInicioRaw);
    fechaInicio.setHours(0, 0, 0, 0);

    const tareasForecast = await prisma.tareas_forecast.findMany({
      where: {
        eliminado: false,
        perforador_forecast: {
          perforador_id,
          cronograma_id: parseInt(cronograma_id),
        },
        locacion_perforador_cronograma: {
          perforador_cronograma: {
            perforador_id,
            cronograma_id: parseInt(cronograma_id),
          },
        },
        fecha: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
      },
      include: {
        planificaciones: {
          where: {
            eliminado: false,
          },
        },
        tipo_tarea_forecast: true,
        perforador_forecast: true,
        locacion_perforador_cronograma: true,
        planificacion_notas: {
          include: {
            planificacion_area: true,
          },
        },
      },
      orderBy: {
        fecha: 'asc',
      },
    });

    if (includeAreas) {
      const dataRaw = tareasForecast.map(async (item) => {
        const areas = await obtenerPlanificacionDisponiblesPorTareaForecastId(
          item?.id
        );
        return {
          ...item,
          areas,
        };
      });
      const data = await Promise.all(dataRaw);
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(tareasForecast, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

async function obtenerLocacionPerforadorCronogramaPorFecha({
  filters = {},
  select = { id: true },
}) {
  const data = await prisma.locaciones_perforador_cronograma.findFirst({
    where: {
      perforador_cronograma: {
        perforador_id: filters.perforador_id,
        cronograma_id: filters.cronograma_id,
      },
      fecha_inicio: {
        lte: new Date(filters?.fecha),
      },
      fecha_fin: {
        gte: new Date(filters?.fecha),
      },
    },
    select,
  });

  return data;
}

async function crearCronogramaBackup(cronograma) {
  const locacionesPerforadorCronograma =
    await prisma.locaciones_perforador_cronograma.findMany({
      where: {
        perforador_cronograma: { cronograma_id: cronograma?.id },
        deshabilitado: false,
      },
    });

  const data = {
    nombre: cronograma?.nombre,
    fecha_inicio: cronograma?.fecha_inicio,
    fecha_fin: cronograma?.fecha_fin,
    cronograma: { connect: { id: cronograma?.id } },
    usuarios: { connect: { id: cronograma?.usuario_id } },
    ubicaciones: { connect: { id: cronograma?.ubicacion_id } },
    estados_cronograma: { connect: { id: cronograma?.estado_cronograma_id } },
    perforadores_cronograma: JSON.stringify(
      cronograma?.perforadores_cronograma ?? []
    ),
    locaciones_perforador_cronograma: JSON.stringify(
      locacionesPerforadorCronograma ?? []
    ),
  };
  await prisma.cronogramas_backup.create({ data });
}

export async function POST(req) {
  try {
    const {
      tareas_forecast,
      tipo_tarea_forecast_id,
      perforador_forecast_id,
      ...body
    } = await req.json();

    const perforadorForecastId =
      perforador_forecast_id ?? tareas_forecast?.[0]?.perforador_forecast_id;
    const forecast = await prisma.perforadores_forecast.findUnique({
      where: { id: parseInt(perforadorForecastId) },
      select: {
        cronograma: {
          include: {
            perforadores_cronograma: true,
            perforadores_forecast: {
              include: {
                tareas_forecast: true,
              },
            },
          },
        },
      },
    });

    const todasTareasForecast = forecast?.cronograma?.perforadores_forecast
      ?.flat()
      .map((perforador) => perforador?.tareas_forecast ?? [])
      .flat();

    const noExisteTareaForecast = todasTareasForecast?.length === 0;
    if (noExisteTareaForecast) {
      await crearCronogramaBackup(forecast?.cronograma);
    }

    if (tareas_forecast && tareas_forecast?.length > 0) {
      const tareasPromise = tareas_forecast.map(async (item) => {
        const perforadorForecast =
          await prisma.perforadores_forecast.findUnique({
            where: { id: parseInt(item?.perforador_forecast_id) },
            select: {
              id: true,
              perforador_id: true,
              cronograma_id: true,
            },
          });
        const locacionPerforadorCronograma =
          await obtenerLocacionPerforadorCronogramaPorFecha({
            filters: {
              perforador_id: perforadorForecast?.perforador_id,
              cronograma_id: perforadorForecast?.cronograma_id,
              fecha: item?.fecha,
            },
          });

        if (!locacionPerforadorCronograma?.id) {
          throw new ApiError(
            400,
            `Locación no encontrada en fecha ${formatToDDMMYYYY(item?.fecha)}, Por favor, cargue la locación en el cronograma`
          );
        }

        return {
          ...item,
          locacion_perforador_cronograma_id: parseInt(
            locacionPerforadorCronograma.id
          ),
          perforador_forecast_id: parseInt(perforadorForecast.id),
        };
      });
      const tareasForecast = await Promise.all(tareasPromise);

      const records = await prisma.tareas_forecast.createMany({
        data: tareasForecast,
      });
      return NextResponse.json(records, { status: 200 });
    }

    if (!perforador_forecast_id) {
      throw new ApiError(400, 'Falta el id del perforador forecast');
    }

    const data = { ...body };

    if (tipo_tarea_forecast_id) {
      const tipoTarea = await prisma.tipos_tarea_forecast.findUnique({
        where: { id: parseInt(tipo_tarea_forecast_id) },
        select: {
          id: true,
        },
      });

      data.tipo_tarea_forecast = {
        connect: { id: tipoTarea?.id },
      };
    }

    const perforadorForecast = await prisma.perforadores_forecast.findUnique({
      where: { id: parseInt(perforador_forecast_id) },
      select: {
        id: true,
        perforador_id: true,
        cronograma_id: true,
      },
    });

    const locacionPerforadorCronograma =
      await obtenerLocacionPerforadorCronogramaPorFecha({
        filters: {
          perforador_id: perforadorForecast?.perforador_id,
          cronograma_id: perforadorForecast?.cronograma_id,
          fecha: data?.fecha,
        },
      });

    if (!locacionPerforadorCronograma?.id) {
      throw new ApiError(
        400,
        `Locación no encontrada en fecha ${formatToDDMMYYYY(data?.fecha)}, Por favor, cargue la locación en el cronograma`
      );
    }

    data.perforador_forecast = {
      connect: { id: parseInt(perforadorForecast.id) },
    };
    data.locacion_perforador_cronograma = {
      connect: { id: parseInt(locacionPerforadorCronograma.id) },
    };

    const newRecord = await prisma.tareas_forecast.create({ data });

    return NextResponse.json(newRecord, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
