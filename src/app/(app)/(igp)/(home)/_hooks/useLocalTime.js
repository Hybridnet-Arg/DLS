import { format } from 'date-fns';
import { useState, useEffect } from 'react';

export function useLocalTime() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const fechaActual = new Date();
      setLocalTime(format(fechaActual, "dd/MM/yyyy', 'HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return localTime;
}
