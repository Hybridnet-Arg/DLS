'use client';

import { DATE_FORMATS, LOCALE_TIME } from '@/constants';

function Card({ title, date }) {
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <h4 className="uppercase text-xs font-semibold text-center">{title}</h4>
      <p
        className={`text-[13px] text-center font-extralight py-[1px] ${!date ? 'opacity-50' : ''}`}
      >
        {date
          ? new Date(date).toLocaleDateString(
              LOCALE_TIME,
              DATE_FORMATS.DD_MM_YYYY
            )
          : 'DD/MM/AAAA'}
      </p>
      <p
        className={`text-xs text-center font-medium ${!date ? 'opacity-50' : ''}`}
      >
        {date
          ? new Date(date).toLocaleTimeString(LOCALE_TIME, DATE_FORMATS.HH_MM)
          : '00:00'}{' '}
        hs
      </p>
    </div>
  );
}

export default function WellAdvancementDates({ initDate, finalDate }) {
  return (
    <div className="bg-[#838994] rounded-md px-2 py-3 grid grid-cols-4 gap-2 mt-2">
      <div className="m-auto text-white">
        <h4 className="uppercase font-light text-xs">
          Fecha y hora de locacion
        </h4>
      </div>
      <Card title="Inicio" date={initDate} />
      <Card title="Actual" date={new Date()} />
      <Card title="Final" date={finalDate} />
    </div>
  );
}
