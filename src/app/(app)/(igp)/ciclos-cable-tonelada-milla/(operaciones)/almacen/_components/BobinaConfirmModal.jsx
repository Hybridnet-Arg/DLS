import ModalDialog from '@/components/ui/modal/ModalDialog';
import BobinaImage from './BobinaImage';

export default function BobinaConfirmModal({
  label = '',
  elementoDeposito,
  ...modalProps
}) {
  return (
    <ModalDialog {...modalProps}>
      <h2 className="text-center font-semibold text-sm">Bobina auxiliar</h2>
      <div className="flex  gap-2 border rounded-xl p-4 my-6 shadow-md">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light">
            {elementoDeposito?.marca?.nombre}
          </p>
          <p className="text-sm font-semibold">
            Diametro cable {elementoDeposito?.diametro?.pulgadas}
          </p>
          <p className="text-sm font-light">{elementoDeposito?.serie}</p>
        </div>
        <BobinaImage />
      </div>
      <p className="text-center font-medium">{label}</p>
    </ModalDialog>
  );
}
