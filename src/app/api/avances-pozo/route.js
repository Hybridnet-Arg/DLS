import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/avances-pozo:
 *   get:
 *     summary: Obtener avances de pozo
 *     tags: [Avances de Pozo]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de avances de pozo a obtener
 *       - in: query
 *         name: sort_field
 *         schema:
 *           type: string
 *         description: Campo por el que se ordenarán los avances de pozo
 *       - in: query
 *         name: sort_type
 *         schema:
 *           type: string
 *         description: Tipo de ordenamiento para los avances de pozo
 *     responses:
 *       200:
 *         description: Avances de pozo obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avancesDePozo:
 *                   type: array
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const limit = searchParams.get('limit');
    const sortField = searchParams.get('sort_field');
    const sortType = searchParams.get('sort_type');

    const query = {};

    if (sortField && sortType) {
      query.orderBy = { [sortField]: sortType };
    }
    if (limit) query.take = parseInt(limit);

    const avancesDePozo = await prisma.avances_pozo.findMany(query);

    return NextResponse.json({ avancesDePozo }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener el avance de pozo',
    });
  }
}
