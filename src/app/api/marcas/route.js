import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET() {
  try {
    const marcas = await prisma.marcas.findMany();
    return NextResponse.json({ marcas }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
