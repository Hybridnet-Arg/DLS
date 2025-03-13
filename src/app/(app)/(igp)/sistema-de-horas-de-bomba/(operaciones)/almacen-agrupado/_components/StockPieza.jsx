import clsx from 'clsx';

export default function StockPieza({ min, un, className }) {
  return (
    <div
      className={clsx('rounded-lg text-white text-center', {
        [className]: className,
      })}
    >
      <p className="bg-[#838894] rounded-t-lg">
        <span className="font-medium text-sm">{min ?? 0}</span>{' '}
        <span className="uppercase text-[10px]">min</span>
      </p>
      <p
        className={clsx('rounded-b-lg py-4', {
          'bg-danger': un < min,
          'bg-success': un > min,
          'bg-warning': un === min,
          'bg-gray-300': !un || !min,
        })}
      >
        <span
          className={clsx('font-medium text-sm', {
            'text-dark': un === min || !un || !min,
          })}
        >
          {un ?? 0}
        </span>{' '}
        <span
          className={clsx('uppercase text-[10px]', {
            'text-dark': un === min || !un || !min,
          })}
        >
          un
        </span>
      </p>
    </div>
  );
}
