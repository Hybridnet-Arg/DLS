'use client';
import { getElementosComponenteById } from '@/services/elementosComponente.service';
import CargarElementoDeposito from './components/CargarElementoDeposito';

export default async function TopDriveAlmacenPieza({ params }) {
  const { id } = params;
  let elementoComponente = {};

  try {
    elementoComponente = await getElementosComponenteById(id);
  } catch (error) {
    elementoComponente = {};
  }

  return (
    <CargarElementoDeposito
      elementoComponenteId={id}
      elementoComponente={elementoComponente}
    />
  );
}
