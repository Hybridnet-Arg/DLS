import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * tags:
 *  name: Marcas
 * /api/marcas:
 *   get:
 *     summary: Obtener marcas
 *     tags: [Marcas]
 *     responses:
 *       200:
 *         description: Marcas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    const marcas = await prisma.marcas.findMany();
    return NextResponse.json({ marcas }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
