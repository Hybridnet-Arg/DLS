import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { getDesgasteCable } from '@/lib/prisma/repositories/desgasteCable.repository';

/**
 * @swagger
 * /api/desgastes-cable/perforador/{numero}:
 *   get:
 *     tags: [Desgaste de Cable]
 *     summary: Obtener el desgaste de cable de un perforador
 *     parameters:
 *       - in: path
 *         name: numero
 *         required: true
 *         description: Número del perforador
 *         schema:
 *           type: integer
 *       - in: query
 *         name: last_desgaste_cable
 *         required: false
 *         description: Obtener el último desgaste de cable
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: nombre_perforador
 *         required: false
 *         description: Nombre del perforador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Desgaste de cable obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  try {
    const { numero } = await params;
    const numeroPerforador = Number(numero);

    const lastDesgasteCable = searchParams.get('last_desgaste_cable');
    const nombre_perforador = searchParams.get('nombre_perforador');

    if (lastDesgasteCable) {
      const desgasteCable = await prisma.desgastes_cable.findFirst({
        where: {
          perforador: {
            numero: numeroPerforador,
            nombre: nombre_perforador,
          },
          elemento_deposito: {
            en_uso: true,
            baja: false,
            elemento_componente: {
              elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
              componente_perforador: {
                componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
              },
            },
          },
        },
      });

      return NextResponse.json(desgasteCable, { status: 200 });
    }

    const elementoDeposito = await prisma.elementos_deposito.findFirst({
      where: {
        elemento_componente: {
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_perforador: {
            perforador: { numero: numeroPerforador, nombre: nombre_perforador },
            componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          },
        },
        en_uso: true,
        baja: false,
      },
      select: {
        id: true,
        elemento_componente: {
          include: {
            componente_perforador: true,
          },
        },
        desgastes_cable: {
          orderBy: { creado_el: 'desc' },
          take: 1,
        },
      },
    });

    if (!elementoDeposito) {
      return NextResponse.json({ desgaste_cable: 0 }, { status: 200 });
    }

    const totalDesgaste = await getDesgasteCable({
      numero_perforador: numeroPerforador,
      componente_perforador_id:
        elementoDeposito?.elemento_componente.componente_perforador_id,
      elemento_componente_id: elementoDeposito?.elemento_componente.id,
      elemento_deposito_id: elementoDeposito?.id,
    });

    return NextResponse.json(
      {
        ...elementoDeposito,
        total_desgaste_cable: totalDesgaste,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
