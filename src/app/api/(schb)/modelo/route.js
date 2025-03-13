import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import apiErrorHandler from '@/utils/handlers/apiError.handler';

export async function GET() {
  try {
    const modelos = await prisma.modelo.findMany({
      include: { marca: true },
    });
    return NextResponse.json(modelos, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
