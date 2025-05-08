import { Marquee } from '@/components/marquee/Marquee';
import BackButton from '@/components/ui/buttons/BackButton';
import SelectorPerforadores from '@/components/selectorPerforadores';
import { CONFIG } from '@/constants';

export const metadata = {
  title: {
    default: 'Sistema de trazabilidad para tubulares',
  },
};

export default function TubularesLayout({ children }) {
  return (
    <div className="mt-2 mx-5 pb-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-medium">
          Sistema de trazabilidad para tubulares
        </h1>
        <div
          className={`${CONFIG.APP_ENV === 'training' ? 'bg-[linear-gradient(90deg,#9AA1C5_0%,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.7)_90%,#9AA1C5_100%)]' : 'bg-[linear-gradient(90deg,#F5D92F_0%,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.7)_90%,#F5D92F_100%)]'}  w-72 flex justify-center items-center`}
        >
          <Marquee
            size="lg"
            text={
              CONFIG.APP_ENV === 'testing'
                ? 'AMBIENTE DE PRUEBA'
                : CONFIG.APP_ENV === 'training' && 'AMBIENTE DE CAPACITACION'
            }
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <BackButton href="/" />
          <SelectorPerforadores showAll onlyDrillers showAccess={false} />
        </div>
      </div>
      {children}
    </div>
  );
}
