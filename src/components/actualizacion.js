import React, { useContext, useEffect, useState } from 'react';
import BaseContext from '@/context/base/baseContext';
import { format } from 'date-fns';

const Actualizacion = (props) => {
  const baseContext = useContext(BaseContext);
  const { estado } = baseContext;
  const [difHoras, setDifHoras] = useState(0);

  useEffect(() => {
    if (estado) {
      try {
        const fechaActual = new Date();
        const diferencia =
          fechaActual.getTime() - estado.fechaActDate.getTime();
        setDifHoras((diferencia / 1000 - 10800) / 3600);
      } catch (e) {
        console.log('error horas');
      }
    }
  }, [estado]);

  return (
    <div className={difHoras > 12 ? 'text-red-500 ml-1' : 'text-gray-500 ml-1'}>
      Última Actualización: <span>{estado ? estado.fechaAct : <></>}</span>
    </div>
  );
};
export default Actualizacion;
