import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET() {
  try {
    const tipos_rosca = await prisma.tipos_rosca.findMany();
    return NextResponse.json({ tipos_rosca }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener los tipos rosca' },
      { status: 500 }
    );
  }
}
