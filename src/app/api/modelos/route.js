import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * tags:
 *   name: Modelos
 * /api/modelos:
 *   get:
 *     summary: Obtener modelos
 *     tags: [Modelos]
 *     responses:
 *       200:
 *         description: Modelos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};
    const marcaId = searchParams.get('marca_id');

    if (marcaId) {
      whereQuery.marca_id = parseInt(marcaId);
    }

    const modelos = await prisma.modelos.findMany({
      where: whereQuery,
    });
    return NextResponse.json({ modelos }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
