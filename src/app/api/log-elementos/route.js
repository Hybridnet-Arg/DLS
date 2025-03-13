import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';
import { paginationFormatter } from '@/utils/formatters/pagination.formatter';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const page = parseInt(searchParams.get('page') ?? DEFAULT_PAGE);
    const limit = parseInt(searchParams.get('limit') ?? DEFAULT_PAGE_SIZE);

    const whereQuery = {};

    const baja = searchParams.get('baja');
    const serie = searchParams.get('serie');
    const enUso = searchParams.get('en_uso');
    const marcaId = searchParams.get('marca_id');
    const elementoId = searchParams.get('elemento_id');
    const motivoBaja = searchParams.get('motivo_baja');
    const diametroId = searchParams.get('diametro_id');
    const componenteId = searchParams.get('componente_id');
    const numeroPerforador = searchParams.get('numero_perforador');
    const elementoComponenteId = searchParams.get('elemento_componente_id');
    const fechaRecambioDesde = searchParams.get('fecha_recambio_desde');
    const fechaRecambioHasta = searchParams.get('fecha_recambio_hasta');
    const fechaBajaDesde = searchParams.get('fecha_baja_desde');
    const fechaBajaHasta = searchParams.get('fecha_baja_hasta');

    if (fechaRecambioDesde || fechaRecambioHasta) {
      whereQuery.fecha_recambio = {};
      if (fechaRecambioDesde)
        whereQuery.fecha_recambio.gte = new Date(fechaRecambioDesde);
      if (fechaRecambioHasta) {
        const fechaHasta = `${fechaRecambioHasta.split('T')[0]}T23:59:59.999-03:00`;
        whereQuery.fecha_recambio.lte = new Date(fechaHasta);
      }
    }

    if (fechaBajaDesde || fechaBajaHasta) {
      whereQuery.fecha_baja = {};
      if (fechaBajaDesde) whereQuery.fecha_baja.gte = new Date(fechaBajaDesde);
      if (fechaBajaHasta) whereQuery.fecha_baja.lte = new Date(fechaBajaHasta);
    }

    if (motivoBaja) whereQuery.motivo_baja = motivoBaja;
    if (serie)
      whereQuery.elemento_deposito = { ...whereQuery.elemento_deposito, serie };
    if (baja)
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        baja: JSON.parse(baja),
      };
    if (enUso)
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        en_uso: JSON.parse(enUso),
      };
    if (marcaId)
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        marca_id: parseInt(marcaId),
      };
    if (diametroId)
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        diametro_id: parseInt(diametroId),
      };
    if (elementoComponenteId) {
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        elemento_componente_id: parseInt(elementoComponenteId),
      };
    }
    if (elementoId) {
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        elemento_componente: { elemento_id: parseInt(elementoId) },
      };
    }
    if (componenteId) {
      whereQuery.elemento_deposito = {
        ...whereQuery.elemento_deposito,
        elemento_componente: {
          ...whereQuery?.elemento_deposito?.elemento_componente,
          componente_perforador: {
            componente_id: parseInt(componenteId),
          },
        },
      };
    }
    if (numeroPerforador) {
      whereQuery.perforador = { numero: parseInt(numeroPerforador) };
    }

    const includeQuery = {
      modelo: {
        include: {
          marca: true,
        },
      },
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

    const totalRecords = await prisma.log_elementos.count({
      where: whereQuery,
    });
    const elementosDeposito = await prisma.log_elementos.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereQuery,
      include: {
        elemento_deposito: {
          include: includeQuery,
        },
        usuario: true,
      },
    });

    const elementosDepositoPaginated = paginationFormatter({
      data: elementosDeposito,
      page,
      pageSize: limit,
      totalRecords,
    });

    return NextResponse.json(elementosDepositoPaginated, {
      status: 200,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
