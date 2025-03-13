import clsx from 'clsx';
import Link from 'next/link';
import PiezaImage from '../../../_components/PiezaImage';
import StockPieza from './StockPieza';

export default function PiezaItem({ id, tipo, min, un, disabled }) {
  return (
    <Link
      href={`/sistema-de-horas-de-bomba/almacen-agrupado/${id}`}
      className={clsx('shadow-dark-sm rounded-lg p-3', {
        'opacity-60 cursor-not-allowed': disabled,
        'cursor-pointer hover:bg-dark hover:text-warning transition duration-500':
          !disabled,
      })}
    >
      <h3 className="uppercase text-center mb-3 font-medium">{tipo}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center justify-center">
          <PiezaImage
            width={100}
            height={100}
            pieza={{ tipo }}
            iconProps={{ size: 60 }}
          />
        </div>
        <StockPieza min={min} un={un} />
      </div>
    </Link>
  );
}
