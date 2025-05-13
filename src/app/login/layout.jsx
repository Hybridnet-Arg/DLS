import BgLogin from '~/static/images/login/bg-login.jpg';
import BgDevLogin from '~/static/images/login/bg-login-dev.jpg';
import { CONFIG } from '@/constants';
import { Marquee } from '@/components/marquee/Marquee';

export const metadata = {
  title: {
    default: 'Login',
  },
};

export default function LoginLayout({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${CONFIG.APP_ENV === 'production' ? BgLogin.src : BgDevLogin.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="min-h-screen grid grid-cols-3">
        <div className="bg-dark min-h-screen bg-opacity-60 flex flex-col items-center justify-center">
          <div className="px-10">{children}</div>
          <div className="bg-black/50 w-full min-h-14 flex justify-center items-center mt-10 p-4">
            {CONFIG.APP_ENV === 'production' && (
              <div className="my-2">
                <div className="text-white">Sitio de Capacitación</div>
                <a
                  href="https://dmsdemo.company.com/"
                  className="text-[#F5D92F]"
                  target="_blank"
                >
                  https://dmsdemo.company.com
                </a>
              </div>
            )}
            {(CONFIG.APP_ENV === 'testing' ||
              CONFIG.APP_ENV === 'training') && (
              <Marquee
                text={
                  CONFIG.APP_ENV === 'testing'
                    ? 'AMBIENTE DE PRUEBA'
                    : CONFIG.APP_ENV === 'training' &&
                      'AMBIENTE DE CAPACITACION'
                }
              />
            )}
          </div>
          {CONFIG.APP_ENV === 'training' && (
            <div className="my-2 flex flex-col items-center">
              <div className="text-white">
                Presione aquí para ir al ambiente de producción
              </div>
              <a
                href="https://dms.dls-archer.com/"
                className="text-[#F5D92F] text-center"
              >
                https://dms.dls-archer.com/
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
