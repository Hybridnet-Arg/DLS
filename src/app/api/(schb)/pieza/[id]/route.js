import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';

export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  try {
    const idMarca = searchParams.get('idMarca');
    const idModelo = searchParams.get('idModelo');
    const perforador = searchParams.get('perforador');

    if (!perforador) {
      throw new ApiError(400, 'El número del perforador es requerido');
    }

    const whereClause = {
      perforadorPieza: {
        some: {
          idPieza: Number(id),
          perforador: perforador,
          baja: 0,
          enUso: 0,
        },
      },
    };

    if (idMarca) {
      whereClause.perforadorPieza.some.idMarca = parseInt(idMarca);
    }
    if (idModelo) {
      whereClause.perforadorPieza.some.idModelo = parseInt(idModelo);
    }

    const countClause = {
      select: {
        perforadorPieza: {
          where: whereClause.perforadorPieza.some,
        },
      },
    };

    const pieza = await prisma.pieza.findUnique({
      where: { idPieza: Number(id) },
      select: {
        _count: countClause,
        idPieza: true,
        nroPieza: true,
        tipo: true,
        codigo: true,
        hsMax: true,
        hsMin: true,
        idTipoPieza: true,
        piezaPerforador: {
          where: {
            perforador,
            idPieza: Number(id),
          },
        },
      },
    });

    if (!pieza) throw new ApiError(404, 'Pieza no encontrada');
    const hasPiezas = pieza._count.perforadorPieza > 0;

    const marcasQuery = !hasPiezas
      ? {}
      : {
          where: whereClause,
          select: {
            idMarca: true,
            marca: true,
            _count: countClause,
          },
        };
    const marcas = await prisma.marca.findMany(marcasQuery);

    const modelosQuery = !hasPiezas
      ? {}
      : {
          where: whereClause,
          select: {
            idModelo: true,
            idMarca: true,
            modelo: true,
            _count: countClause,
          },
        };
    const modelos = await prisma.modelo.findMany(modelosQuery);
    if (idModelo) {
      whereClause.idModelo = parseInt(idModelo);
    }
    delete whereClause.idModelo;
    const diametrosQuery = !hasPiezas
      ? {}
      : {
          where: whereClause,
          select: {
            idDiametro: true,
            diametro: true,
            _count: countClause,
          },
        };
    const diametros = await prisma.diametro.findMany(diametrosQuery);

    const formattedPieza = {
      ...pieza,
      marcas: marcas.map((marca) => ({
        ...marca,
        total: marca?._count?.perforadorPieza ?? 0,
      })),
      modelos: modelos.map((modelo) => ({
        ...modelo,
        total: modelo?._count?.perforadorPieza ?? 0,
      })),
      diametros: diametros.map((diametro) => ({
        ...diametro,
        total: diametro?._count?.perforadorPieza ?? 0,
      })),
    };

    return NextResponse.json(formattedPieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
