import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { PLANTA_COLORES } from '@/constants/index';
import { getTanqueEstadoCable } from '@/lib/prisma/repositories/tanques.repository';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let dataSemaforoBomba1 = {
    bomba: 1,
    semaforo: {
      color: PLANTA_COLORES.NONE,
    },
  };
  let dataSemaforoBomba2 = {
    bomba: 2,
    semaforo: {
      color: PLANTA_COLORES.NONE,
    },
  };
  let dataSemaforoBomba3 = {
    bomba: 3,
    semaforo: {
      color: PLANTA_COLORES.NONE,
    },
  };
  let estadoTanque = {
    tanque: null,
    semaforo: {
      color: PLANTA_COLORES.NONE,
    },
  };
  try {
    const baja = parseInt(searchParams.get('baja'));
    const uso = parseInt(searchParams.get('uso'));
    const perforador = searchParams.get('perforador');

    const piezasPerforador = await prisma.perforadorPieza.findMany({
      where: {
        perforador: perforador,
        baja: baja,
        enUso: uso,
      },

      include: {
        pieza: true,
        diametro: true,
        marca: true,
      },
    });

    if (piezasPerforador.length > 0) {
      const piezasBomba1 = piezasPerforador.filter((pieza) => pieza.bomba == 1);
      const piezasBomba2 = piezasPerforador.filter((pieza) => pieza.bomba == 2);
      const piezasBomba3 = piezasPerforador.filter((pieza) => pieza.bomba == 3);

      dataSemaforoBomba1 = colorearBomba(piezasBomba1, 1);
      dataSemaforoBomba2 = colorearBomba(piezasBomba2, 2);
      dataSemaforoBomba3 = colorearBomba(piezasBomba3, 3);
    }

    const tanque = await getTanqueEstadoCable({ perforador });
    if (tanque.length > 0 && tanque[0].lts > 0) {
      estadoTanque.tanque = tanque[0];
      let color = PLANTA_COLORES.RED;
      if (tanque[0].perforador == '161') {
        if (tanque[0].lts > 5000) color = PLANTA_COLORES.GREEN;
        else if (tanque[0].lts > 2000) color = PLANTA_COLORES.YELLOW;
      } else {
        if (tanque[0].lts > 20000) color = PLANTA_COLORES.GREEN;
        else if (tanque[0].lts > 10000) color = PLANTA_COLORES.YELLOW;
      }
      estadoTanque.semaforo.color = color;
    }

    return NextResponse.json(
      [
        dataSemaforoBomba1,
        dataSemaforoBomba2,
        dataSemaforoBomba3,
        estadoTanque,
      ],
      { status: 200 }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}

function colorearBomba(piezasBomba, bomba) {
  let piezaAlerta = 0;
  let piezaCritica = 0;
  let piezaB;
  let response = {};

  let colorSemaforo = {
    color: PLANTA_COLORES.GREEN,
  };

  for (let i = 0; i < piezasBomba.length; i++) {
    piezaB = piezasBomba[i];
    if (piezaB.hs > piezaB.pieza.hsMin && piezaB.hs <= piezaB.pieza.hsMax) {
      piezaAlerta = piezaAlerta + 1;
    }
    if (piezaB.hs > piezaB.pieza.hsMax) {
      piezaCritica = piezaCritica + 1;
    }
  }
  //bomba tiene piezas criticas o en alerta
  if (piezaCritica > 0) {
    colorSemaforo = {
      color: PLANTA_COLORES.RED,
    };
  } else if (piezaAlerta > 0) {
    colorSemaforo = {
      color: PLANTA_COLORES.YELLOW,
    };
  }

  response = {
    bomba: bomba,
    semaforo: colorSemaforo,
  };

  return response;
}
