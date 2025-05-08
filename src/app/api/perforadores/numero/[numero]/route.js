import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/perforadores/numero/{numero}:
 *   get:
 *     tags:
 *       - Perforadores
 *     summary: Obtener perforador por número
 *     description: Obtener perforador por número
 *     parameters:
 *       - in: path
 *         name: numero
 *         required: true
 *         description: Número del perforador
 *         schema:
 *           type: integer
 *       - in: query
 *         name: include_plan_pozo
 *         required: false
 *         description: Incluir planes de pozo
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: include_locaciones
 *         required: false
 *         description: Incluir locaciones
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Perforador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET(req, { params }) {
  try {
    const { numero } = await params;
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
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener el perforador',
    });
  }
}
