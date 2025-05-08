import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/cortes-cable:
 *   post:
 *     tags: [Cortes de Cable]
 *     summary: Crear un corte de cable
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elemento_deposito_id:
 *                 type: number
 *                 required: true
 *               metros_corte:
 *                 type: number
 *                 required: true
 *     responses:
 *       200:
 *         description: Corte de cable creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function POST(req) {
  try {
    const { elemento_deposito_id, ...data } = await req.json();

    const elementoDeposito = await prisma.elementos_deposito.findUnique({
      where: { id: Number(elemento_deposito_id) },
      select: {
        id: true,
        cortes_cable: true,
        diametro: true,
      },
    });

    if (!elementoDeposito)
      throw new ApiError(404, 'Elemento deposito no encontrado');

    const totalCortesCable = await prisma.cortes_cable.aggregate({
      _sum: {
        metros_corte: true,
      },
      where: {
        elemento_deposito_id: Number(elemento_deposito_id),
      },
    });

    const totalCable =
      elementoDeposito?.diametro?.metros_cable -
      elementoDeposito?.diametro?.metros_despliegue;

    const remanente = totalCable - totalCortesCable._sum.metros_corte;

    if (remanente === 0) {
      throw new ApiError(400, 'Se ha cortado todo el cable');
    }

    if (data?.metros_corte > remanente) {
      throw new ApiError(
        400,
        `No hay suficiente cable para cortar, tiene disponible: ${remanente} mts`
      );
    }

    const pozo = await prisma.cortes_cable.create({
      data: { ...data, elemento_deposito_id },
    });
    return NextResponse.json(
      { pozo, message: 'Se ha cortado el cable con exito' },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
