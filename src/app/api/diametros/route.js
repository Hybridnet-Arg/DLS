import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET() {
  try {
    const diametros = await prisma.diametros.findMany();
    return NextResponse.json({ diametros }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los pozos' },
      { status: 500 }
    );
  }
}
