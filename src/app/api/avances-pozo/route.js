import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const limit = searchParams.get('limit');
    const sortField = searchParams.get('sort_field');
    const sortType = searchParams.get('sort_type');

    const query = {};

    if (sortField && sortType) {
      query.orderBy = { [sortField]: sortType };
    }
    if (limit) query.take = parseInt(limit);

    const avancesDePozo = await prisma.avances_pozo.findMany(query);

    return NextResponse.json({ avancesDePozo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener el avance de pozo' },
      { status: 500 }
    );
  }
}
