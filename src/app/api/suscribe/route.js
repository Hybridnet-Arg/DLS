import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const suscribePath = 'public/uploads/suscribe/index.txt';
    const filePath = path.join(process.cwd(), suscribePath);

    let fileContent = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf8')
      : '';

    fileContent += `${email}\n`;
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json(
      { message: '¡Gracias por suscribirte!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al suscribirse' },
      { status: 500 }
    );
  }
}
