'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { differenceInSeconds } from 'date-fns';
import { useState, useEffect, Fragment } from 'react';
import { Globe, LockKeyhole, Mail, Phone, X } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import MicrosoftTeamsIcon from '@/components/icons/MicrosoftTeamsIcon';

function ContactLink({ icon, children, href, ...linkProps }) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <a href={href} className="text-sm" {...linkProps}>
        {children}
      </a>
    </div>
  );
}

export default function Support({ loginAttempts }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const removeErrorParam = () => {
    router.replace('/login', undefined, { shallow: true });
  };

  const obtenerTiempoLimite = () => {
    if (!loginAttempts?.blockedUntil) return '';

    const currentDate = new Date();
    const limitAttempDate = new Date(loginAttempts?.blockedUntil);

    const diferenciaSegundos = differenceInSeconds(
      limitAttempDate,
      currentDate
    );

    const minutos = Math.floor(diferenciaSegundos / 60);
    const segundos = diferenciaSegundos % 60;

    if (minutos <= 0 && segundos <= 0) return 'Intentelo de nuevo';

    let message = '';
    if (minutos === 0) message = `${segundos} segundos`;
    message = `${minutos} minutos y ${segundos} segundos`;

    return (
      <Fragment>
        Aguardar {message} <br />
        para volver a intentar
      </Fragment>
    );
  };

  return (
    <div
      className={clsx(
        'bg-dark text-white px-8 py-10 rounded-xl border-2 border-[#F5D92E]',
        {
          'border-2 border-[#F5D92E]': loginAttempts?.blockedUntil,
          'border-2 border-white': !loginAttempts?.blockedUntil,
        }
      )}
    >
      {loginAttempts?.blockedUntil ? (
        <Fragment>
          <div className="flex justify-center">
            <LockKeyhole size={35} color="#CD1E2C" />
          </div>
          <h2 className="text-center pb-8 pt-5 font-semibold">
            Demasiados intentos fallidos. <br />
            {isMounted ? obtenerTiempoLimite() : '...'}.
          </h2>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex justify-center">
            <X
              size={35}
              color="#CD1E2C"
              className="rounded-full border-4 border-[#CD1E2C]"
            />
          </div>
          <h2 className="text-center pb-8 pt-5 font-semibold">
            Usuario o contraseña incorrectos.
            <br />
            Por favor, verifica tus datos
            <br /> e inténtalo de nuevo
          </h2>
        </Fragment>
      )}
      <div className="flex justify-center">
        <Button
          className="shadow-[0_2px_5px_rgba(255,255,255,0.2)]"
          onClick={() => removeErrorParam()}
        >
          Probar otra vez
        </Button>
      </div>
      {loginAttempts?.blockedUntil && (
        <Fragment>
          <h2 className="py-8 text-center">Ó</h2>
          <h2 className="pb-4 text-center font-semibold">
            Elija una opcion para solicitar asistencia
          </h2>
          <div className="flex flex-col space-y-4 mx-12 border-t-[0.2rem] pt-4 border-[#F5D92E]">
            <ContactLink
              href="https://cua.dls-archer.com/"
              target="_blank"
              rel="noopener noreferrer"
              icon={<Globe color="#F5D92E" size={15} />}
            >
              https://cua.dls-archer.com
            </ContactLink>
            <ContactLink
              href="mailto:soporte.it@dls-archer.com"
              icon={<Mail color="#F5D92E" size={15} />}
            >
              soporte.it@dls-archer.com
            </ContactLink>
            <ContactLink
              href="tel:+541133650000"
              icon={<Phone color="#F5D92E" size={15} />}
            >
              011 3365 0000
            </ContactLink>
            <ContactLink
              href="https://wa.me/541133650000"
              icon={<WhatsAppIcon color="#F5D92E" />}
              target="_blank"
              rel="noopener noreferrer"
            >
              011 3365 0000
            </ContactLink>
            <ContactLink
              href="msteams://soporte.it"
              icon={
                <MicrosoftTeamsIcon width={16} height={16} color="#F5D92E" />
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Soporte.it
            </ContactLink>
          </div>
        </Fragment>
      )}
    </div>
  );
}
