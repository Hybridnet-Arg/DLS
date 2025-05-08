import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { getDepositElements } from '@/lib/prisma/repositories/elementosDeposito.repository';
import { getDesgasteCable } from '@/lib/prisma/repositories/desgasteCable.repository';

import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { PLANTA_COLORES } from '@/constants/index';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const perforador = searchParams.get('perforador');

    const whereQuery = {
      baja: false,
      en_uso: true,
      elemento_componente: {
        elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
        componente_perforador: {
          componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          perforador: {
            numero: parseInt(perforador),
          },
        },
      },
    };

    const includeQuery = {
      diametro: true,
      elemento_componente: true,
    };

    const elementosDeposito = await getDepositElements({
      include: includeQuery,
      where: whereQuery,
    });

    if (elementosDeposito.length > 0) {
      const totalDesgaste = await getDesgasteCable({
        numero_perforador: parseInt(perforador),
        componente_perforador_id:
          elementosDeposito[0]?.elemento_componente.componente_perforador_id,
        elemento_componente_id: elementosDeposito[0]?.elemento_componente.id,
        elemento_deposito_id: elementosDeposito[0]?.id,
      });

      const cableEstado = getSemaforo(
        totalDesgaste,
        elementosDeposito[0]?.diametro?.corte
      );

      let color = PLANTA_COLORES.GREEN;
      if (cableEstado === 2) {
        color = PLANTA_COLORES.RED;
      } else if (cableEstado === 1) {
        color = PLANTA_COLORES.YELLOW;
      }

      return NextResponse.json(
        {
          elemento: 'cable',
          totalDesgaste,
          semaforo: {
            color,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          elemento: 'cable',
          semaforo: {
            color: PLANTA_COLORES.NONE,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return apiErrorHandler(error);
  }
}

function getSemaforo(totalDesgaste, corte) {
  return obtenerColorPorRango(totalDesgaste, parseInt(corte));
}

function obtenerColorPorRango(valor, limite) {
  const rangos = obtenerRangos(limite);
  //verificar si la pieza esta en valores normales 0, en alerta 1 o critico 2
  if (valor >= rangos[0][0] && valor <= rangos[0][1]) {
    return 0;
  } else if (valor >= rangos[1][0] && valor <= rangos[1][1]) {
    return 1;
  } else {
    return 2;
  }
}

function obtenerRangos(valor) {
  const intervalo = Math.floor(valor / 3);
  let rangos = [];

  for (let i = 0; i < 3; i++) {
    let inicio = i === 0 ? 0 : i * intervalo + 1;
    let fin = (i + 1) * intervalo;
    rangos.push([inicio, fin]);
  }

  return rangos;
}
