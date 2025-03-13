import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function PUT(req, { params }) {
  try {
    const { id, recambio_id } = params;
    const uid = req.headers.get('uid');

    const recambio = await prisma.$transaction(
      async (prismaTx) => {
        const piezaRecambio = await prismaTx.elementos_deposito.update({
          where: { id: parseInt(id) },
          data: {
            en_uso: false,
            baja: true,
          },
          include: {
            elemento_componente: {
              include: {
                componente_perforador: true,
              },
            },
          },
        });
        const piezaCambio = await prismaTx.elementos_deposito.update({
          where: { id: parseInt(recambio_id) },
          data: {
            en_uso: true,
            baja: false,
            fecha_instalacion: new Date(),
          },
        });

        const logs = await prismaTx.log_elementos.create({
          data: {
            elemento_deposito_id: parseInt(piezaRecambio.id),
            baja: true,
            motivo_baja: 'RECAMBIO',
            usuario_id: parseInt(uid),
            perforador_id:
              piezaRecambio?.elemento_componente?.componente_perforador
                ?.perforador_id,
            fecha_recambio: new Date(),
            fecha_baja: new Date(),
          },
        });
        return { piezaCambio, piezaRecambio, logs };
      },
      {
        maxWait: 5000,
        timeout: 22000,
      }
    );

    return NextResponse.json(serializedData(recambio), {
      status: 200,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
