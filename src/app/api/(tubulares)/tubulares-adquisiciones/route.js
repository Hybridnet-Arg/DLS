import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { uploadFile } from '@/utils/uploadFile.util';
import apiErrorHandler, { ApiError } from '@/utils/handlers/apiError.handler';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  UPLOAD_DIRECTORIES,
} from '@/constants';
import { paginationFormatter } from '@/utils/formatters/pagination.formatter';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const page = parseInt(searchParams.get('page') ?? DEFAULT_PAGE);
    const limit = parseInt(searchParams.get('limit') ?? DEFAULT_PAGE_SIZE);

    const data = await prisma.tubulares_adquisiciones.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        tubulares_proveedor: true,
        tubulares_rango: true,
        tubulares_tipo_barra: true,
        tubulares_tipo_conexion: true,
        perforador: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    const totalRecords = await prisma.tubulares_adquisiciones.count();

    const tubulares_adquisiciones = paginationFormatter({
      data,
      page,
      pageSize: limit,
      totalRecords,
    });
    return NextResponse.json(tubulares_adquisiciones, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get('enlace_documento');
    const numero_remito = formData.get('numero_remito') ?? '';
    const numero_reporte = formData.get('numero_reporte') ?? '';
    const fecha = formData.get('fecha') && new Date(formData.get('fecha'));
    const cantidad =
      formData.get('cantidad') && parseInt(formData.get('cantidad'));
    const tubulares_proveedor_id =
      formData.get('tubulares_proveedor_id') &&
      parseInt(formData.get('tubulares_proveedor_id'));
    const tubulares_rango_id =
      formData.get('tubulares_rango_id') &&
      parseInt(formData.get('tubulares_rango_id'));
    const tubulares_tipo_barra_id =
      formData.get('tubulares_tipo_barra_id') &&
      parseInt(formData.get('tubulares_tipo_barra_id'));
    const tubulares_tipo_conexion_id =
      formData.get('tubulares_tipo_conexion_id') &&
      parseInt(formData.get('tubulares_tipo_conexion_id'));

    const numeroPerforador = formData.get('perforador_numero');
    const nombrePerforador = formData.get('perforador_nombre');
    const perforador = await prisma.perforadores.findFirst({
      where: {
        numero: Number(numeroPerforador),
        nombre: nombrePerforador,
      },
    });

    const urlFile = await uploadFile(
      file,
      UPLOAD_DIRECTORIES.PRIVATE.TUBULARES
    );
    if (!urlFile) throw new ApiError(400, 'Falta el archivo');

    const data = {
      enlace_documento: urlFile,
      cantidad,
      tubulares_proveedor_id,
      tubulares_rango_id,
      tubulares_tipo_barra_id,
      tubulares_tipo_conexion_id,
      perforador_id: perforador?.id,
      fecha,
    };

    if (numero_remito) {
      data.numero_remito = numero_remito;
    }
    if (numero_reporte) {
      data.numero_reporte = numero_reporte;
    }

    const tubulares_adquisiciones = await prisma.tubulares_adquisiciones.create(
      { data }
    );

    return NextResponse.json(tubulares_adquisiciones, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
