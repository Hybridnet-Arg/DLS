import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const whereQuery = {};
    const marcaId = searchParams.get('marca_id');

    if (marcaId) {
      whereQuery.marca_id = parseInt(marcaId);
    }

    const modelos = await prisma.modelos.findMany({
      where: whereQuery,
    });
    return NextResponse.json({ modelos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
