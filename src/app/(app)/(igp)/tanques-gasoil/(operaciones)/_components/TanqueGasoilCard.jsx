'use client';

import TanqueGasoilIcon from './icon/TanqueGasoilIcon';

export default function TanqueGasoil({ tanque }) {
  return (
    <div key={tanque?.id}>
      <div className="flex justify-between items-center">
        <h2
          className={`font-semibold text-lg ${
            tanque?.activo ? 'none' : 'text-gray-400'
          }`}
        >
          {tanque?.nombre}
        </h2>
        <span
          className={`text-sm ${tanque?.activo ? 'none' : 'text-gray-400'}`}
        >
          {`(${tanque?.ymmCm} cm) - `}
          {tanque?.fecha}
        </span>
      </div>
      <div
        className={`border rounded-lg shadow-dark-sm p-4 ${
          tanque?.activo === false ? 'bg-[#c6c4c4]' : ''
        }`}
      >
        <TanqueGasoilIcon
          id={tanque?.id}
          max={tanque?.maximo}
          min={tanque?.minimo}
          value={tanque?.capacidad}
          alert={tanque?.nivel_alerta}
          critical={tanque?.nivel_critico}
          active={tanque?.activo}
        />
      </div>
    </div>
  );
}
