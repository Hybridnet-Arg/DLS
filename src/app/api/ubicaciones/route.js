import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/ubicaciones:
 *   get:
 *     summary: Obtener ubicaciones
 *     tags: [Ubicaciones]
 *     responses:
 *       200:
 *         description: Ubicaciones obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get('nombre');

    const whereQuery = {};
    if (nombre) whereQuery.nombre = { contains: nombre };

    const ubicaciones = await prisma.ubicaciones.findMany({
      where: whereQuery,
      orderBy: {
        nombre: 'asc',
      },
    });

    return NextResponse.json({ ubicaciones }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener las ubicaciones',
    });
  }
}
