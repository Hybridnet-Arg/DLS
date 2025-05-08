import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';
import { DESTINOS_TUBULARES, ESTADOS_MOVIMIENTOS_TUBULARES } from '@/constants';
import { getTubularInventoryByDestination } from '@/lib/prisma/repositories/tubularesMovimientos.repository';

/**
 * @swagger
 * /api/planes-pozo/finalizar:
 *   put:
 *     summary: Finaliza un plan de pozo.
 *     description: Marca como inactivo un plan de pozo y su relación con perforador_locación. Si hay tubulares activos asociados, actualiza su remanente, los desactiva, y registra un nuevo movimiento tubular con estado "DOCUMENTACION_PENDIENTE".
 *     tags:
 *       - Plan Pozo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_pozo_id:
 *                 type: integer
 *                 example: 1
 *     parameters:
 *       - in: header
 *         name: uid
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que realiza la acción
 *     responses:
 *       200:
 *         description: El plan de pozo se ha finalizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 planPozo:
 *                   type: object
 *                   description: Plan de pozo actualizado.
 *                 message:
 *                   type: string
 *                   example: El plan de pozo se ha finalizado correctamente.
 *       400:
 *         description: Plan de pozo no encontrado o error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
export async function PUT(req) {
  try {
    const { plan_pozo_id } = await req.json();

    const uid = req.headers.get('uid');

    const planPozo = await prisma.$transaction(
      async (prismaTx) => {
        const planesPozo = await prisma.planes_pozo.findFirst({
          where: { id: parseInt(plan_pozo_id) },
          include: {
            tubulares: {
              where: {
                activo: true,
              },
              take: 1,
            },
          },
        });
        if (!planesPozo) throw new ApiError(400, 'Plan de pozo no encontrado');

        const data = {
          actualizado_el: new Date(),
          activo: false,
        };

        await prismaTx.perforador_locaciones.update({
          where: {
            id: planesPozo.perforador_locacion_id,
            perforador_id: planesPozo.perforador_id,
          },
          data,
        });

        if (planesPozo.tubulares.length > 0) {
          const tubularId = planesPozo.tubulares?.[0]?.id;

          const inventario = await getTubularInventoryByDestination({
            perforador_id: planesPozo.perforador_id,
            tubulares_destino_ids: [
              DESTINOS_TUBULARES.LOCACION,
              DESTINOS_TUBULARES.BASE,
              DESTINOS_TUBULARES.TALLER,
            ],
          });

          const remanenteTotal =
            inventario.reduce(
              (acc, movimiento) => acc + (movimiento?.total ?? 0),
              0
            ) ?? 0;

          await prismaTx.tubulares.update({
            where: { id: tubularId },
            data: {
              ...data,
              remanente: remanenteTotal,
            },
          });

          await prismaTx.tubulares.create({
            data: {
              perforador: {
                connect: {
                  id: planesPozo.perforador_id,
                },
              },
              cantidad_inicial: remanenteTotal,
              activo: true,
              tubulares_movimientos: {
                create: {
                  tubulares_destino: {
                    connect: {
                      id: DESTINOS_TUBULARES.LOCACION,
                    },
                  },
                  estado: ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_PENDIENTE,
                  cantidad: remanenteTotal,
                  fecha: new Date(),
                  perforador: {
                    connect: {
                      id: planesPozo.perforador_id,
                    },
                  },
                  usuario: {
                    connect: {
                      id: Number(uid),
                    },
                  },
                },
              },
            },
          });
        }

        const planPozo = await prismaTx.planes_pozo.update({
          where: { id: parseInt(plan_pozo_id) },
          data,
        });

        return planPozo;
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(
      { planPozo, message: 'El plan de pozo se ha finalizado correctamente.' },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error, {
      fallbackMessage: 'Error al finalizar plan pozo',
    });
  }
}
