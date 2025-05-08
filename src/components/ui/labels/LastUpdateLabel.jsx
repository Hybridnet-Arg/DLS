import { DATE_FORMATS } from '@/constants';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';

export default function LastUpdateLabel({ fecha = null, children }) {
  return (
    <p className="m-0 font-medium text-xs text-ellipsis overflow-hidden whitespace-nowrap px-4">
      {children ? (
        children
      ) : (
        <>
          Última actualización:{' '}
          {formatToDDMMYYYY(fecha, {
            formatter: DATE_FORMATS.DD_MM_YYYY_HH_MM_SS,
          })}
        </>
      )}
    </p>
  );
}
