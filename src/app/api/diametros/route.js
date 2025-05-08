import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/diametros:
 *   get:
 *     summary: Obtener diámetros
 *     tags: [Diametros]
 *     responses:
 *       200:
 *         description: Diámetros obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    const diametros = await prisma.diametros.findMany();
    return NextResponse.json({ diametros }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
