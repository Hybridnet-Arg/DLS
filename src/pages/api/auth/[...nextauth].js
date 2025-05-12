import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/client';
import { CONFIG, COOKIES } from '@/constants';
import { authenticateWithAD } from '@/services/ldap/auth.service';
import { parseCookies, setCookie } from 'nookies';

const DEMO_USER = {
  username: 'demodms',
  permisos: [
    'CN=SCHB-DLS4170-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4169-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4167-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4163-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=DMS-Administracion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4165-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4168-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=SCHB-DLS4166-Operacion,OU=Sistema de Control de Horas de Bomba de lodo,OU=Gestion Centralizada,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=NQN-GRP,OU=Groups,OU=Neuquen,OU=Argentina,OU=Locations,DC=lam,DC=domain',
    'CN=NQN-INET,OU=Groups,OU=Neuquen,OU=Argentina,OU=Locations,DC=lam,DC=domain',
  ],
};

const REFRESH_HOUR = 0.5;
const EXPIRATION_HOUR = 12;
const EXPIRATION_HOUR_BASE = 3600;

const DEFAULT_ATTEMPT_COOKIE = {
  attempts: 0,
  blockedUntil: null,
};

const handlerNextAuth = (req, res) =>
  NextAuth(req, res, {
    pages: {
      signIn: '/index',
      signOut: '/',
      error: '/login',
      verifyRequest: '/login',
      newUser: '/login',
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          const cookies = parseCookies({ req });
          let attemptData = cookies?.[COOKIES.LOGIN_ATTEMPTS]
            ? JSON.parse(cookies?.[COOKIES.LOGIN_ATTEMPTS])
            : DEFAULT_ATTEMPT_COOKIE;

          const currentTime = new Date();
          const { attempts, blockedUntil } = attemptData;

          if (blockedUntil && new Date(blockedUntil) > currentTime) {
            throw new Error(
              'Tu cuenta está bloqueada temporalmente. Intenta de nuevo más tarde.'
            );
          }

          if (attempts >= CONFIG.NEXTAUTH.LOGIN_ATTEMPTS) {
            const blockTime = new Date(
              currentTime.getTime() + CONFIG.NEXTAUTH.BLOCK_TIME_MINUTES * 60000
            );
            attemptData = { attempts, blockedUntil: blockTime };

            setCookie(
              { res },
              COOKIES.LOGIN_ATTEMPTS,
              JSON.stringify(attemptData),
              {
                maxAge: CONFIG.NEXTAUTH.BLOCK_TIME_MINUTES * 60,
                path: '/',
              }
            );

            throw new Error(
              'Has superado el número máximo de intentos. Intenta de nuevo más tarde.'
            );
          }

          try {
            let user;

            if (CONFIG.DEMO) {
              if (
                credentials?.username !== DEMO_USER.username ||
                credentials?.password !== DEMO_USER.username
              ) {
                throw new Error('Invalid credentials');
              }

              user = DEMO_USER;
            } else {
              user = await authenticateWithAD(credentials);
            }

            setCookie(
              { res },
              COOKIES.LOGIN_ATTEMPTS,
              JSON.stringify(DEFAULT_ATTEMPT_COOKIE),
              { maxAge: 60 * 60 * 24, path: '/' }
            );

            return user;
          } catch (error) {
            attemptData = {
              attempts: attempts + 1,
              blockedUntil: null,
            };

            setCookie(
              { res },
              COOKIES.LOGIN_ATTEMPTS,
              JSON.stringify(attemptData),
              {
                maxAge: 60 * 60 * 24,
                path: '/',
              }
            );

            throw error;
          }
        },
      }),
    ],
    secret: CONFIG.NEXTAUTH.SECRET,
    baseUrl: CONFIG.NEXTAUTH.URL,
    callbacks: {
      async jwt({ token, user }) {
        const isSignIn = !!user;

        if (isSignIn) {
          token.username = user.username;
          token.password = user.password;
          token.permisos = user.permisos;
        }

        if (token?.username) {
          const usuario = await prisma.usuarios.upsert({
            where: {
              alias: token?.username,
            },
            update: {
              ultimo_ingreso: new Date(),
            },
            create: {
              alias: token?.username,
              ultimo_ingreso: new Date(),
            },
          });

          token = { ...token, ...usuario };
        }

        return token;
      },
      async session({ session, token }) {
        const sessionData = { ...session, user: { ...token } };
        return sessionData;
      },
    },
    session: {
      strategy: 'jwt',
      maxAge: EXPIRATION_HOUR * EXPIRATION_HOUR_BASE,
      updateAge: REFRESH_HOUR * EXPIRATION_HOUR_BASE,
    },
  });

export default handlerNextAuth;
