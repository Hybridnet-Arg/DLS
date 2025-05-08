import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { serializedData } from '@/lib/prisma/utils';
import { PLANTA_COLORES } from '@/constants/index';
import { COMPONENTES } from '@/constants/componentes.constant';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const perforador = searchParams.get('perforador');

    const includeQuery = {
      elemento: {
        include: {
          tipo_elemento: true,
        },
      },
      elementos_deposito: {
        where: {
          en_uso: true,
          baja: false,
        },
      },
    };

    const elementoComponente = await prisma.elementos_componente.findMany({
      where: {
        componente_perforador: {
          perforador: {
            numero: parseInt(perforador),
            nombre_clave: parseInt(perforador).toString(),
          },
          componente_id: COMPONENTES.TOP_DRIVE,
        },
      },
      include: includeQuery,
    });
    if (elementoComponente.length > 0) {
      let coloresEstado = [];
      elementoComponente.map((e) => {
        coloresEstado.push(getSemaforo(e.elementos_deposito[0], e.elemento));
      });
      const elementoCritico = coloresEstado.find((e) => e === 2);
      const elementoAlerta = coloresEstado.find((e) => e === 1);

      let color = PLANTA_COLORES.GREEN;
      if (elementoCritico) {
        color = PLANTA_COLORES.RED;
      } else if (elementoAlerta) {
        color = PLANTA_COLORES.YELLOW;
      }

      return NextResponse.json(
        {
          elemento: 'topdrive',
          semaforo: {
            color,
          },
          //elementoComponente: serializedData(elementoComponente),
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          elemento: 'topdrive',
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

function getSemaforo(elementoDeposito, elemento) {
  return obtenerColorPorRango(
    elementoDeposito?.horas_en_uso ? elementoDeposito?.horas_en_uso : 0,
    elemento.tipo_elemento.horas_hasta
  );
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
