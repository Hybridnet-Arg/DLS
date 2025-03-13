import { Pencil, X } from 'lucide-react';

export const LocacionesList = ({ title, locaciones, onEdit, onDelete }) => {
  return (
    <div className="w-1/2 mb-6 h-full flex flex-col">
      <div className="font-bold mb-2 uppercase">{title}</div>
      <div className="bg-white rounded-md h-[300px] overflow-y-auto">
        {locaciones?.map((locacion) => (
          <div
            className="text-[#838994] border-b-2 border-backgroundGray ps-5 text-semibold py-1 group flex justify-between items-center hover:text-black hover:cursor-pointer"
            key={'locaciones' + locacion?.id}
          >
            <span>{locacion?.nombre}</span>
            <div className="flex gap-2">
              <span
                className="invisible group-hover:visible text-xl font-bold cursor-pointer me-2 text-[#838994] hover:text-black"
                onClick={() => onEdit(locacion)}
              >
                <Pencil size={20} />
              </span>
              <span
                className="invisible group-hover:visible text-xl border-2 rounded-full font-bold cursor-pointer me-2 text-[#838994] hover:text-black"
                onClick={() => onDelete(locacion)}
              >
                <X size={20} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
