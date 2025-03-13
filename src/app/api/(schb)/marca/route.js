import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const marcas = await prisma.marca.findMany();
    return NextResponse.json(marcas, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
