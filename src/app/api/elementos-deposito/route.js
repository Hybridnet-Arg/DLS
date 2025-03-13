import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { serializedData } from '@/lib/prisma/utils';
import {
  getDepositElements,
  groupDepositElementsCiclosCable,
} from '@/lib/prisma/repositories/elementosDeposito.repository';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const whereQuery = {};

    const baja = searchParams.get('baja');
    const serie = searchParams.get('serie');
    const enUso = searchParams.get('en_uso');
    const marcaId = searchParams.get('marca_id');
    const elementoId = searchParams.get('elemento_id');
    const diametroId = searchParams.get('diametro_id');
    const componenteId = searchParams.get('componente_id');
    const numeroPerforador = searchParams.get('numero_perforador');
    const almacenCiclosCable = searchParams.get('almacen_ciclos_cable');
    const elementoComponenteId = searchParams.get('elemento_componente_id');

    if (serie) whereQuery.serie = serie;
    if (baja) whereQuery.baja = JSON.parse(baja);
    if (enUso) whereQuery.en_uso = JSON.parse(enUso);
    if (marcaId) whereQuery.marca_id = parseInt(marcaId);
    if (diametroId) whereQuery.diametro_id = parseInt(diametroId);
    if (elementoComponenteId) {
      whereQuery.elemento_componente_id = parseInt(elementoComponenteId);
    }
    if (elementoId) {
      whereQuery.elemento_componente = {
        elemento_id: parseInt(elementoId),
      };
    }
    if (numeroPerforador) {
      whereQuery.elemento_componente = {
        ...whereQuery?.elemento_componente,
        componente_perforador: {
          perforador: {
            numero: parseInt(numeroPerforador),
          },
        },
      };
    }
    if (componenteId) {
      whereQuery.elemento_componente = {
        ...whereQuery.elemento_componente,
        componente_perforador: {
          ...whereQuery?.elemento_componente?.componente_perforador,
          componente_id: parseInt(componenteId),
        },
      };
    }

    const includeQuery = {
      modelo: {
        include: {
          marca: true,
        },
      },
      cortes_cable: true,
      marca: true,
      diametro: true,
      tipo_rosca: true,
      deposito: true,
      elemento_componente: {
        include: {
          elemento: {
            include: {
              tipo_elemento: true,
            },
          },
          componente_perforador: {
            include: {
              componente: true,
            },
          },
        },
      },
    };

    const elementosDeposito = almacenCiclosCable
      ? await groupDepositElementsCiclosCable({ where: whereQuery })
      : await getDepositElements({
          include: includeQuery,
          where: whereQuery,
        });

    return NextResponse.json(elementosDeposito, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los elementos de deposito' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { numero_perforador, ...data } = await req.json();
    if (!numero_perforador) throw new Error('Falta el numero de perforador');

    const perforador = await prisma.perforadores.findFirst({
      where: {
        numero: Number(numero_perforador),
      },
      include: {
        deposito: true,
      },
    });

    const elementoDeposito = await prisma.elementos_deposito.create({
      data: {
        ...data,
        deposito_id: perforador?.deposito?.id,
      },
    });

    return NextResponse.json(
      {
        elementoDeposito: serializedData(elementoDeposito),
        message: 'elemento deposito creado con exito',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear el elemento deposito' },
      { status: 500 }
    );
  }
}
