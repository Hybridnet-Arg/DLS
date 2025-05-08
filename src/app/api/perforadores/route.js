import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

/**
 * @swagger
 * /api/perforadores:
 *   get:
 *     summary: Obtener lista de perforadores
 *     description: Retorna una lista de perforadores filtrados por los parámetros de búsqueda.
 *     tags:
 *       - Perforadores
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del perforador
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del perforador (búsqueda parcial)
 *       - in: query
 *         name: nombre_clave
 *         schema:
 *           type: string
 *         description: Nombre clave del perforador (búsqueda parcial)
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Estado del perforador (búsqueda parcial)
 *       - in: query
 *         name: deshabilitado
 *         schema:
 *           type: boolean
 *         description: Filtrar por deshabilitado (true o false)
 *       - in: query
 *         name: ubicacion
 *         schema:
 *           type: integer
 *         description: ID de ubicación asociada
 *       - in: query
 *         name: not_null_tubulares_movimientos
 *         schema:
 *           type: boolean
 *         description: Filtrar perforadores que tengan tubulares_movimientos
 *     responses:
 *       200:
 *         description: Lista de perforadores obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const nombre = searchParams.get('nombre');
    const nombre_clave = searchParams.get('nombre_clave');
    const id = searchParams.get('id');
    const estado = searchParams.get('estado');
    const deshabilitado = searchParams.get('deshabilitado');
    const ubicacion_id = searchParams.get('ubicacion');
    const notNullTubularesMovimientos = searchParams.get(
      'not_null_tubulares_movimientos'
    );

    const whereQuery = { deshabilitado: false };

    if (id) whereQuery.id = Number(id);
    if (nombre) whereQuery.nombre = { contains: nombre };
    if (estado) whereQuery.estado = { contains: estado };
    if (deshabilitado !== null)
      whereQuery.deshabilitado = deshabilitado === 'true';
    if (ubicacion_id) whereQuery.ubicacion_id = Number(ubicacion_id);
    if (nombre_clave) whereQuery.nombre_clave = { contains: nombre_clave };
    if (notNullTubularesMovimientos) {
      whereQuery.tubulares_movimientos = {
        some: {},
      };
    }

    const perforadores = await prisma.perforadores.findMany({
      where: whereQuery,
      include: {
        ubicacion: true,
      },
    });

    return NextResponse.json({ perforadores }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
