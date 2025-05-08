import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * tags:
 *   name: Tipos Rosca
 * /api/tipos-rosca:
 *   get:
 *     summary: Obtener tipos de rosca
 *     tags: [Tipos Rosca]
 *     responses:
 *       200:
 *         description: Tipos de rosca obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    const tipos_rosca = await prisma.tipos_rosca.findMany();
    return NextResponse.json({ tipos_rosca }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener los tipos rosca',
    });
  }
}
