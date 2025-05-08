import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const limit = searchParams.get('limit');
    const sortField = searchParams.get('sort_field');
    const sortType = searchParams.get('sort_type');
    const perforador = searchParams.get('perforador');

    const query = {};

    if (sortField && sortType) {
      query.orderBy = { [sortField]: sortType };
    }
    if (limit) query.take = parseInt(limit);
    if (perforador) {
      query.where = { perforador: Number(perforador), lts: { gt: 0 } };
    }

    const wellData = await prisma.wellData.findMany(query);

    return NextResponse.json(wellData, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
