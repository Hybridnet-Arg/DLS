import { Barlow } from 'next/font/google';
import AuthState from '@/context/auth/authState';
import BaseState from '@/context/base/baseState';
import { Toaster } from '@/components/ui/shadcn/sonner';
import '@/styles/globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: {
    default: 'DMS',
    template: 'DMS - %s',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={barlow.className}>
        <AuthState>
          <BaseState>{children}</BaseState>
        </AuthState>
        <Toaster />
      </body>
    </html>
  );
}
