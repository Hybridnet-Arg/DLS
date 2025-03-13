'use client';
import React, { useState, useEffect } from 'react';

function FechaActual() {
  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const fechaActual = new Date();
      const fechaHoraFormateada = fechaActual.toLocaleString();
      setFechaHora(fechaHoraFormateada);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="text-slate-600 font-semibold p-1 mr-4">{fechaHora}</div>
  );
}

export default FechaActual;
