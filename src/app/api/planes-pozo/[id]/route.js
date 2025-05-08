import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/planes-pozo/{id}:
 *   put:
 *     summary: Actualiza un plan de pozo existente junto con sus pozos y etapas.
 *     description: Este endpoint actualiza los datos de un plan de pozo, incluyendo los pozos relacionados y sus etapas. Todos los cambios se realizan dentro de una transacción.
 *     tags:
 *       - Plan Pozo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan de pozo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Plan Pozo Norte
 *               descripcion:
 *                 type: string
 *                 example: Descripción del plan actualizado
 *               pozos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     nombre:
 *                       type: string
 *                       example: Pozo A1
 *                     fecha_inicio:
 *                       type: string
 *                       format: date
 *                       example: 2025-05-01
 *                     fecha_fin:
 *                       type: string
 *                       format: date
 *                       example: 2025-06-01
 *                     etapas_pozo:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           profundidad_desde:
 *                             type: number
 *                             example: 1200
 *                           profundidad_hasta:
 *                             type: number
 *                             example: 1500
 *                           duracion:
 *                             type: integer
 *                             example: 5
 *                           encamisado:
 *                             type: boolean
 *                             example: true
 *                           casing:
 *                             type: string
 *                             example: Casing tipo X
 *     responses:
 *       200:
 *         description: Plan pozo creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 planPozo:
 *                   type: object
 *                   description: Plan de pozo actualizado con pozos y etapas.
 *                 message:
 *                   type: string
 *                   example: Plan pozo creado con exito
 *       400:
 *         description: Error de validación o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { pozos, ...body } = await req.json();

    const planPozo = await prisma.$transaction(
      async (prismaTx) => {
        const updatePozosQuery = pozos.map(({ etapas_pozo, ...pozo }) => {
          const etapasPozoQuery = etapas_pozo.map((etapa) => ({
            where: { id: parseInt(etapa?.id) },
            data: {
              profundidad_desde: etapa?.profundidad_desde,
              profundidad_hasta: etapa?.profundidad_hasta,
              duracion: etapa?.duracion,
              encamisado: etapa?.encamisado,
              casing: etapa?.casing,
            },
          }));

          return {
            where: { id: parseInt(pozo?.id) },
            data: {
              nombre: pozo?.nombre,
              nombre_clave: pozo?.nombre,
              fecha_inicio: pozo?.fecha_inicio,
              fecha_fin: pozo?.fecha_fin,
              etapas_pozo: {
                update: etapasPozoQuery,
              },
            },
          };
        });

        const data = {
          ...body,
          actualizado_el: new Date(),
          pozos: {
            update: updatePozosQuery,
          },
        };

        const planPozo = await prismaTx.planes_pozo.update({
          where: { id: parseInt(id) },
          data,
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
          },
        });

        return planPozo;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      { planPozo, message: 'Plan pozo creado con exito' },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al actualizar el plan pozo',
    });
  }
}
