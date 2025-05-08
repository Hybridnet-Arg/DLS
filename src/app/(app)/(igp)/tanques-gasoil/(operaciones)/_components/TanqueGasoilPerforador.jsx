'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import TanqueGasoilIcon from './icon/TanqueGasoilIcon';
import ActivarTanqueModal from './modals/ActivarTanqueModal';
import CambiarTanqueModal from './modals/CambiarTanqueModal';

export default function TanqueGasoilPerforador({ tanque, onActualizarTanque }) {
  const [tanqueActivo, setTanqueActivo] = useState(tanque?.activo);
  const [showActivarTanqueModal, setShowActivarTanqueModal] = useState(false);
  const [showCambiarTanqueModal, setShowCambiarTanqueModal] = useState(false);

  if (!tanque?.id) return <p>Tanque no encontrado</p>;
  return (
    <div className="flex flex-col justify-center items-center min-h-[440px]">
      <div className="flex items-center justify-between gap-[20rem] mb-4">
        <h2
          className={`font-semibold text-xl ${
            tanque?.activo ? 'none' : 'text-gray-400'
          }`}
        >
          {tanque?.nombre}
        </h2>

        <span
          className={`text-lg ${tanque?.activo ? 'none' : 'text-gray-400'}`}
        >
          {`(${tanque?.ymmCm} cm) - `}
          {tanque?.fecha}
        </span>
      </div>
      <div className="w-[50%] shadow-dark-sm rounded-lg relative">
        <TanqueGasoilIcon
          id={tanque?.id}
          max={tanque?.maximo}
          min={tanque?.minimo}
          value={tanque?.capacidad}
          alert={tanque?.nivel_alerta}
          critical={tanque?.nivel_critico}
          active={tanque?.activo}
        />
        <button
          onClick={() => setShowCambiarTanqueModal(true)}
          className="absolute top-[30%] left-[40%] transform -translate-x-1/2 
             bg-gradient-to-br from-[#CDCDCD] to-[#AFAFAF] 
             p-2 rounded-full transition-all shadow-md border border-gray-600 
             hover:opacity-80"
        >
          <RefreshCcw size={35} />
        </button>
        <div className="flex items-center justify-center bg-gray-300 m-2 rounded p-2 gap-4">
          <span
            className={clsx('text-lg text-gray-700 uppercase font-medium', {
              'opacity-50': !tanqueActivo,
            })}
          >
            Desactivar
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={tanqueActivo}
              onChange={() => {
                setShowActivarTanqueModal(true);
                setTanqueActivo(!tanqueActivo);
              }}
            />
            <div className="w-11 h-6 bg-white rounded-full peer peer-checked:bg-white transition-colors duration-300 relative">
              <div
                className={clsx(
                  'w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-transform duration-300',
                  {
                    'translate-x-0 bg-danger': !tanqueActivo,
                    'translate-x-5 bg-success': tanqueActivo,
                  }
                )}
              />
            </div>
          </label>

          <span
            className={clsx('text-lg text-gray-700 uppercase font-medium', {
              'opacity-50': tanqueActivo,
            })}
          >
            Activar
          </span>
        </div>
      </div>
      <ActivarTanqueModal
        activo={tanqueActivo}
        isOpen={showActivarTanqueModal}
        onCancel={() => {
          setShowActivarTanqueModal(false);
          setTanqueActivo(!tanqueActivo);
        }}
        onRefresh={() => {
          //setTanqueActivo(!tanqueActivo);
          onActualizarTanque();
          setShowActivarTanqueModal(false);
        }}
        tanque={tanque}
      />
      <CambiarTanqueModal
        isOpen={showCambiarTanqueModal}
        onCancel={() => setShowCambiarTanqueModal(false)}
        onRefresh={() => {
          onActualizarTanque();
          setShowCambiarTanqueModal(false);
        }}
        tanque={tanque}
      />
    </div>
  );
}
