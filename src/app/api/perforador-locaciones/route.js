import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/perforador-locaciones:
 *   get:
 *     tags: [Perforador Locaciones]
 *     summary: Obtener perforador-locaciones
 *     parameters:
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *         description: Obtener perforador-locaciones activos
 *       - in: query
 *         name: locacion_id
 *         schema:
 *           type: integer
 *         description: Obtener perforador-locaciones por locacion_id
 *       - in: query
 *         name: perforador_id
 *         schema:
 *           type: integer
 *         description: Obtener perforador-locaciones por perforador_id
 *       - in: query
 *         name: perforador_numero
 *         schema:
 *           type: integer
 *         description: Obtener perforador-locaciones por perforador_numero
 *       - in: query
 *         name: perforador_nombre
 *         schema:
 *           type: string
 *         description: Obtener perforador-locaciones por perforador_nombre
 *     responses:
 *       200:
 *         description: Perforador-locaciones obtenidos correctamente
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
    const perforadorNumero = searchParams.get('perforador_numero');
    const perforadorNombre = searchParams.get('perforador_nombre');

    if (activo) whereQuery.activo = JSON.parse(activo);
    if (perforadorId) whereQuery.perforador_id = Number(perforadorId);
    if (locacionId) whereQuery.locacion_id = Number(locacionId);
    if (perforadorNumero && perforadorNombre) {
      whereQuery.perforador = {
        numero: Number(perforadorNumero),
        nombre: perforadorNombre,
      };
      whereQuery.locacion = {
        deshabilitado: false,
        eliminado: false,
      };
    }

    const perforadorLocaciones = await prisma.perforador_locaciones.findMany({
      where: whereQuery,
      include: {
        perforador: true,
        locacion: true,
        planes_pozo: {
          orderBy: { creado_el: 'desc' },
        },
      },
    });

    return NextResponse.json({ perforadorLocaciones }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener perforadores locaciones',
    });
  }
}
