import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/pozos:
 *   get:
 *     summary: Obtiene todos los pozos
 *     tags: [Pozos]
 *     parameters:
 *       - in: query
 *         name: activo
 *         description: Filtra por si el pozo está activo o no
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: locacion_id
 *         description: Filtra por el id de la locación
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: perforador_id
 *         description: Filtra por el id del perforador
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: numero_perforador
 *         description: Filtra por el número del perforador
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: estado_pozo_id
 *         description: Filtra por el id del estado del pozo
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: has_plan_pozo
 *         description: Filtra por si el pozo tiene un plan pozo
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Pozos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};

    const activo = searchParams.get('activo');
    const locacionId = searchParams.get('locacion_id');
    const perforadorId = searchParams.get('perforador_id');
    const numeroPerforador = searchParams.get('numero_perforador');
    const estadoPozoId = searchParams.get('estado_pozo_id');
    const hasPlanPozo = searchParams.get('has_plan_pozo');

    if (activo) whereQuery.activo = JSON.parse(activo);
    if (hasPlanPozo) whereQuery.plan_pozo_id = { not: null };
    if (estadoPozoId) whereQuery.estado_pozo_id = Number(estadoPozoId);
    if (perforadorId) {
      whereQuery.perforador_locacion = {
        perforador_id: Number(perforadorId),
      };
    }
    if (numeroPerforador) {
      whereQuery.perforador_locacion = {
        activo: true,
        perforador: { numero: Number(numeroPerforador) },
      };
    }
    if (locacionId) {
      whereQuery.perforador_locacion = {
        locacion_id: Number(locacionId),
      };
    }

    whereQuery.plan_pozo = {
      activo: true,
    };

    const pozos = await prisma.pozos.findMany({
      where: whereQuery,
      include: {
        avances_pozo: {
          orderBy: { creado_el: 'desc' },
          take: 1,
        },
        etapas_pozo: {
          include: {
            tipo_etapa_pozo: true,
          },
        },
        estados_pozo: true,
        perforador_locacion: true,
        plan_pozo: {
          where: {
            activo: true,
          },
        },
      },
      orderBy: [{ en_progreso: 'desc' }, { creado_el: 'asc' }],
    });

    return NextResponse.json({ pozos }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener los pozos',
    });
  }
}

/**
 * @swagger
 * /api/pozos:
 *   post:
 *     summary: Crea un pozo
 *     tags: [Pozos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pozo'
 *     responses:
 *       200:
 *         description: Pozo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pozo'
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const pozo = await prisma.pozos.create({ data: body });
    return NextResponse.json(
      { pozo, message: 'Pozo creado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al crear el pozo',
    });
  }
}
