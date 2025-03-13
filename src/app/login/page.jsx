import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { COOKIES } from '@/constants';
import Support from './_components/Support';
import FormLogin from './_components/FormLogin';

export default async function Login({ searchParams }) {
  const session = await getServerSession();
  const loginError = searchParams.error;
  const cookie = cookies();
  const loginAttemptsRaw = cookie.get(COOKIES.LOGIN_ATTEMPTS)?.value;
  const loginAttempts = loginAttemptsRaw ? JSON.parse(loginAttemptsRaw) : null;

  if (session) return redirect('/');
  return loginError ? <Support loginAttempts={loginAttempts} /> : <FormLogin />;
}
