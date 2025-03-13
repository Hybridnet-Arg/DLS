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
    const requestHeaders = new Headers({
      ...req.headers,
      ...corsOptions,
    });
    requestHeaders.set('uid', session?.id);

    if (
      path &&
      path.startsWith('/cronograma/') &&
      CONFIG.APP_ENV === CONFIG.WORK_ENVS.PROD
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (path && path.startsWith('/api/')) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
    '/',
    '/avances-de-pozo/:path*',
    '/schb/:path*',
    '/cronograma/:path*',
    '/api/estados-pozo/:path*',
    '/api/avances-pozo/:path*',
    '/api/cortes-cable/:path*',
    '/api/diametros/:path*',
    '/api/elementos-componente/:path*',
    '/api/elementos-deposito/:path*',
    '/api/estados-diagrama/:path*',
    '/api/locaciones/:path*',
    '/api/marcas/:path*',
    '/api/modelos/:path*',
    '/api/perforador-locaciones/:path*',
    '/api/perforadores/:path*',
    '/api/planes-pozo/:path*',
    '/api/pozos/:path*',
    '/api/tipos-rosca/:path*',
    '/api/locaciones/:path*',
    '/api/cronogramas/:path*',
    '/api/tareas-forecast/:path*',
  ],
};
