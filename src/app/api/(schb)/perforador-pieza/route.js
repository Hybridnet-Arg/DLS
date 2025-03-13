import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { paginationFormatter } from '@/utils/formatters/pagination.formatter';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const page = parseInt(searchParams.get('page') ?? DEFAULT_PAGE);
    const limit = parseInt(searchParams.get('limit') ?? DEFAULT_PAGE_SIZE);

    const enUso = searchParams.get('en_uso');
    const baja = searchParams.get('baja');
    const perforador = searchParams.get('perforador');

    const marcas = searchParams.getAll('marcas[]');
    const modelos = searchParams.getAll('modelos[]');
    const piezas = searchParams.getAll('piezas[]');
    const diametros = searchParams.getAll('diametros[]');

    const whereClause = {};
    if (enUso) whereClause.enUso = parseInt(enUso);
    if (baja) whereClause.baja = parseInt(baja);
    if (perforador) whereClause.perforador = perforador;
    if (piezas.length > 0)
      whereClause.idPieza = { in: piezas?.map((pieza) => Number(pieza)) };
    if (marcas.length > 0) {
      whereClause.marca = {
        idMarca: { in: marcas.map((marca) => Number(marca)) },
      };
    }
    if (modelos.length > 0) {
      whereClause.modelo = {
        idModelo: { in: modelos.map((modelo) => Number(modelo)) },
      };
    }
    if (diametros.length > 0) {
      whereClause.diametro = {
        idDiametro: { in: diametros.map((diametro) => Number(diametro)) },
      };
    }

    const totalRecords = await prisma.perforadorPieza.count({
      where: whereClause,
    });
    const perforadorPiezaRaw = await prisma.perforadorPieza.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereClause,
      include: {
        pieza: {
          include: {
            piezaPerforador: {
              where: {
                perforador,
              },
              orderBy: { idPiezaPerforador: 'desc' },
            },
          },
        },
        diametro: true,
        marca: true,
        modelo: true,
      },
    });

    const perforadorPieza = paginationFormatter({
      data: perforadorPiezaRaw,
      page,
      pageSize: limit,
      totalRecords,
    });

    return NextResponse.json(perforadorPieza, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const createMany = await prisma.perforadorPieza.createMany({
      data: data,
    });
    return NextResponse.json(createMany, { status: 201 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
