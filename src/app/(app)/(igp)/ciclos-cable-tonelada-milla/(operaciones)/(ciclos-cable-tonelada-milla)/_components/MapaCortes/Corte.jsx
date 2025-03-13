import { clsx } from 'clsx';
import { calcularPorcentaje } from '@/utils/formatters/percentage.formatter';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';

const DEFAULT_PROGRESS = '0%';

export default function Corte({
  item,
  cortesCable,
  cableDesgastado,
  bobina,
  totalRemanente,
}) {
  const corteCable = cortesCable?.[item?.id];
  const cableWidth = calcularPorcentaje(
    corteCable?.metros_corte,
    bobina?.diametro?.largo_corte,
    '%',
    true
  );
  const corteWidth = corteCable?.id ? cableWidth : totalRemanente;

  const formatLastCutDate = () => {
    const lastIndex = cortesCable?.length - 1;
    const lastCutDate = cortesCable?.[lastIndex]?.fecha_corte;
    return formatToDDMMYYYY(lastCutDate);
  };

  return (
    <div
      key={item?.id}
      style={{
        width: !bobina?.id ? '100%' : corteWidth,
      }}
      className={clsx('relative bg-gray-300 h-[9px] mt-[29px] py-[9px]', {
        'bg-gray-500': corteCable,
      })}
    >
      {item?.id === cortesCable?.length && (
        <div
          className="absolute bottom-5 left-0 flex flex-col items-center"
          style={{
            left:
              item?.id === cortesCable?.length - 1
                ? calcularPorcentaje(
                    cableDesgastado?.tm,
                    bobina?.diametro?.corte
                  )
                : DEFAULT_PROGRESS,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="text-xs text-center mb-1 font-semibold">
            {cortesCable?.[cortesCable?.length - 1] ? (
              <span>
                Fecha
                <br />
                ultimo corte
                <br />
                {formatLastCutDate()}
              </span>
            ) : (
              'DD/MM/AAAA'
            )}
          </span>
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
        </div>
      )}
    </div>
  );
}
