import clsx from 'clsx';
import { DATE_FORMATS, LOCALE_TIME } from '@/constants';

function FechaItem({ title, date }) {
  return (
    <div>
      <h2 className="text-xs text-gray-500">{title}</h2>
      <div className="border rounded-lg p-2">
        <p className="mb-0 text-sm text-center">
          {date
            ? new Date(date).toLocaleDateString(
                LOCALE_TIME,
                DATE_FORMATS.DD_MM_YYYY
              )
            : 'DD/MM/AAAA'}
        </p>
        <p className="mb-0 text-sm text-center">
          {date
            ? new Date(date).toLocaleTimeString(LOCALE_TIME, DATE_FORMATS.HH_MM)
            : '00:00'}{' '}
          hs
        </p>
      </div>
    </div>
  );
}

export default function CanioLavadorFecha({
  elementoDepositoId,
  hours = 0,
  maxHours = 0,
  instalationDate = null,
  withdrawalDate = null,
}) {
  function calcularPorcentaje(valorActual, valorTotal) {
    if (valorTotal === 0) return 0;
    const porcentaje = (valorActual / valorTotal) * 100;
    return porcentaje >= 100 ? 100 : porcentaje;
  }

  return (
    <div className="relative w-full mt-5">
      <div className="flex justify-between mb-10">
        <FechaItem
          title={'Fecha y hora de colocacion'}
          date={instalationDate}
        />
        <FechaItem title={'Fecha y hora de retiro'} date={withdrawalDate} />
      </div>
      <div className="flex flex-row gap-[2.5px]">
        <div
          className={clsx('flex-1 p-[0.75rem] rounded-s-full bg-[#52B358]', {
            'bg-backgroundGray': !elementoDepositoId,
          })}
        ></div>
        <div
          className={clsx('flex-1 p-[0.75rem] bg-[#F4DD48]', {
            'bg-backgroundGray': !elementoDepositoId,
          })}
        ></div>
        <div
          className={clsx('flex-1 p-[0.75rem] rounded-e-full bg-[#D03F49]', {
            'bg-backgroundGray': !elementoDepositoId,
          })}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs mt-1">0.00 hs</p>
        <p className="text-xs mt-1">{maxHours} hs</p>
      </div>
      <div
        className="absolute bottom-12 left-0 flex flex-col items-center"
        style={{
          left: `${calcularPorcentaje(hours, maxHours)}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <span className="text-xs mb-1 font-semibold">{hours} hs</span>
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}
