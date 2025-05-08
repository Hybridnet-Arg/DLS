import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/avances-pozo/perforador/{numero}:
 *   get:
 *     summary: Obtener avances de pozo por perforador
 *     tags: [Avances de Pozo]
 *     parameters:
 *       - in: path
 *         name: numero
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de perforador
 *       - in: query
 *         name: nombre_perforador
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del perforador
 *     responses:
 *       200:
 *         description: Avances de pozo obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

export async function GET(_request, { params }) {
  const { searchParams } = new URL(_request.url);
  try {
    const { numero } = await params;
    const nombrePerforador = searchParams.get('nombre_perforador');

    const query = {
      where: {
        pozo: {
          perforador_locacion: {
            perforador: {
              numero: Number(numero),
            },
          },
        },
      },
      include: {
        pozo: true,
      },
      orderBy: { creado_el: 'desc' },
    };

    if (nombrePerforador) {
      query.where.pozo.perforador_locacion.perforador = {
        ...query.where.pozo.perforador_locacion.perforador,
        nombre: String(nombrePerforador),
      };
    }

    const avanceDePozo = await prisma.avances_pozo.findFirst(query);

    return NextResponse.json(avanceDePozo, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al obtener el avance de pozo por perforador',
    });
  }
}
