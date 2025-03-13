'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { usePlanPozoStore } from '@/store/planPozo.store';

export default function CanioLavadorPozo({
  id,
  elementoDepositoId,
  hasElementos,
  elemento,
}) {
  const { pozoActivo: pozo } = usePlanPozoStore();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xs text-end font-medium mb-1">Operando en pozo:</h1>
        <div className="bg-dark text-yellow-400 text-center p-[0.35rem] rounded text-sm tracking-[0.2rem] opacity-70">
          {pozo?.nombre ?? 'N/A'}
        </div>
      </div>
      {hasElementos ? (
        <Link
          href={`/top-drive/${id}/recambio/${elementoDepositoId ?? 'cargar-pieza'}`}
        >
          <Button className="w-full">
            {elementoDepositoId ? 'cambiar pieza' : 'cargar pieza'}
          </Button>
        </Link>
      ) : (
        <Button className="w-full" onClick={() => setShowModal(true)}>
          cargar pieza
        </Button>
      )}
      <ModalDialog
        isOpen={showModal}
        onOk={() =>
          router.push(`/top-drive/almacen/${id}?elemento_id=${elemento?.id}`)
        }
        onCancel={() => setShowModal(false)}
      >
        <h1 className="text-base font-medium text-center">
          Aún no hay piezas asignadas <br /> para este elemento del perforador
        </h1>
        <p className="text-base font-medium text-center mt-1">
          ¿Desea cargar una nueva pieza?
        </p>
      </ModalDialog>
    </div>
  );
}
