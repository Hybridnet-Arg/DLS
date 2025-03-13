import clsx from 'clsx';
import { Check, Plus } from 'lucide-react';

export default function PerforadorCronograma({
  nombre,
  className,
  completed,
  handleOnPlus = () => {},
}) {
  return (
    <div
      className={clsx(
        'text-warning flex justify-center items-center flex-1 relative rounded-lg shadow-dark-sm h-full w-[6.3rem]',
        {
          [className]: className,
          'bg-gray-500 opacity-80 cursor-not-allowed': !completed,
          'bg-dark': completed,
        }
      )}
    >
      <h1 className="text-center font-base">{nombre}</h1>
      <button className="absolute right-[-0.7rem]">
        {completed ? (
          <Check
            size={25}
            color="white"
            className="bg-success rounded-full p-1"
          />
        ) : (
          <Plus
            onClick={handleOnPlus}
            size={25}
            color="white"
            className="bg-dark rounded-full p-1 hover:bg-gray-600"
          />
        )}
      </button>
    </div>
  );
}
