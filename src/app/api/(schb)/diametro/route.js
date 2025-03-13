import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const diametros = await prisma.diametro.findMany();
    return NextResponse.json(diametros, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
