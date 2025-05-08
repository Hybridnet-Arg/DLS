import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const data = await prisma.tubulares_tipos_conexion.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
