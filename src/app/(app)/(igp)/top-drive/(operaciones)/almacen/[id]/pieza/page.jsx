'use client';

import { use, useEffect, useState } from 'react';
import { getElementosComponenteById } from '@/services/elementosComponente.service';
import CargarElementoDeposito from './components/CargarElementoDeposito';

export default function TopDriveAlmacenPieza({ params }) {
  const { id } = use(params);
  const [elementoComponente, setElementoComponente] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getElementosComponenteById(id);
        setElementoComponente(data);
      } catch (error) {
        setElementoComponente({});
      }
    };

    fetchData();
  }, [id]);

  return (
    <CargarElementoDeposito
      elementoComponenteId={id}
      elementoComponente={elementoComponente}
    />
  );
}
