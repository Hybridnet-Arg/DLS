import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { CONFIG } from './constants';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(req) {
  const path = req?.nextUrl?.pathname;
  const session = await getToken({ req, secret: CONFIG.NEXTAUTH.SECRET });
  if (session) {
    const contentType = req.headers.get('content-type');
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('uid', session?.id);

    if (!contentType?.includes('multipart/form-data')) {
      Object.entries(corsOptions).forEach(([key, value]) => {
        requestHeaders.set(key, value);
      });
    }

    /* if (
      path &&
      path.startsWith('/cronograma/') &&
      CONFIG.APP_ENV === CONFIG.WORK_ENVS.PROD
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    } */

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (path && path.startsWith('/uploads/private')) {
    return new Response('No autorizado', { status: 401 });
  }

  if (path && path.startsWith('/api/')) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
    '/',
    '/uploads/private/:path*',
    '/avances-de-pozo/:path*',
    '/schb/:path*',
    '/cronograma/:path*',
    '/sistema-de-trazabilidad-para-tubulares/:path*',
    '/api/avances-pozo/:path*',
    '/api/cortes-cable/:path*',
    '/api/desgastes-cable/:path*',
    '/api/diametros/:path*',
    '/api/elementos-componente/:path*',
    '/api/elementos-deposito/:path*',
    '/api/estados-diagrama/:path*',
    '/api/estados-pozo/:path*',
    '/api/locaciones/:path*',
    '/api/marcas/:path*',
    '/api/modelos/:path*',
    '/api/perforador-locaciones/:path*',
    '/api/perforadores/:path*',
    '/api/planes-pozo/:path*',
    '/api/planta/:path*',
    '/api/pozos/:path*',
    '/api/tipos-rosca/:path*',
    '/api/ubicaciones/:path*',
    '/api/cronogramas/:path*',
    '/api/locaciones-perforador-cronograma/:path*',
    '/api/perforadores-cronograma/:path*',
    '/api/perforadores-forecast/:path*',
    '/api/planificacion-areas/:path*',
    '/api/planificaciones/:path*',
    '/api/tareas-forecast/:path*',
    '/api/tubulares/:path*',
    '/api/tubulares-adquisiciones/:path*',
    '/api/tubulares-destinos/:path*',
    '/api/tubulares-documentos/:path*',
    '/api/tubulares-movimientos/:path*',
    '/api/tubulares-proveedores/:path*',
    '/api/tubulares-rangos/:path*',
    '/api/tubulares-talleres/:path*',
    '/api/tubulares-tipos-barra/:path*',
    '/api/tubulares-tipos-conexion/:path*',
    '/api/tanques/:path*',
  ],
};
