import { CircleX, SquarePen } from 'lucide-react';

export default function CanioLavadorTablaPiezas({
  data = [],
  handleRowClick = () => {},
  isEditable = false,
  handleEdit = () => {},
  handleDelete = () => {},
  typeOfPiece = '',
  isSaverSub = false,
}) {
  return (
    <div className="my-5 p-3 bg-backgroundGray rounded-lg shadow-md">
      <h2 className="uppercase text-xs bg-white p-1 rounded-t-md mb-1 text-center font-semibold">
        Stock de piezas
      </h2>
      <table className="w-full text-xs table-fixed border border-backgroundGray bg-white rounded-lg">
        <thead>
          <tr className="bg-white font-semibold uppercase">
            <th className="border border-b-4 border-backgroundGray p-2 w-1/5 text-start">
              Tipo
            </th>
            <th className="border-x-4 border-b-4 border-backgroundGray p-2 w-1/5 text-start">
              Marca
            </th>
            <th className="border-x-4 border-b-4 border-backgroundGray p-2 w-1/5 text-start">
              Modelo
            </th>
            {isSaverSub && (
              <th className="border-x-4 border-b-4 border-backgroundGray p-2 w-1/5 text-start">
                Rosca
              </th>
            )}
            <th className="border-x-4 border-b-4 border-backgroundGray p-2 w-1/5 text-start">
              N° Serie
            </th>
            <th className="border border-b-4 border-backgroundGray p-2 w-1/5 text-start">
              Condición
            </th>
            {isEditable && (
              <th className="border border-s-4 border-b-4 border-backgroundGray p-2 w-1/5 text-start">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item) => (
              <tr
                key={item?.id}
                onClick={() => handleRowClick(item)}
                className={
                  'cursor-pointer hover:bg-backgroundGray transition-colors'
                }
              >
                <td className="border border-b-4 border-backgroundGray px-2 py-1 text-center">
                  {item?.elemento_componente?.elemento?.tipo_elemento?.nombre ??
                    typeOfPiece}
                </td>
                <td className="border-x-4 border-b-4 border-backgroundGray px-2 py-1">
                  {item?.modelo?.marca?.nombre
                    ? item?.modelo?.marca?.nombre
                    : isSaverSub
                      ? 'Sin marca'
                      : ''}
                </td>
                <td className="border-x-4 border-b-4 border-backgroundGray px-2 py-1">
                  {item?.modelo?.nombre
                    ? item?.modelo?.nombre
                    : isSaverSub
                      ? 'Sin modelo'
                      : ''}
                </td>
                {isSaverSub && (
                  <td className="border-x-4 border-b-4 border-backgroundGray px-2 py-1">
                    {item?.tipo_rosca?.nombre}
                  </td>
                )}
                <td className="border-x-4 border-b-4 border-backgroundGray px-2 py-1">
                  {item?.serie}
                </td>
                <td className="border border-b-4 border-backgroundGray px-2 py-1">
                  {item?.condicion}
                </td>
                {isEditable && (
                  <td className="border border-s-4 border-b-4 border-backgroundGray px-2 py-1 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="text-[#0d6efd80] hover:text-[#0d6efd] mr-2"
                    >
                      <SquarePen size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="text-red-300 hover:text-red-500 ml-2"
                    >
                      <CircleX />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isEditable ? '6' : '5'}
                className="border border-backgroundGray py-[9.7rem] text-center text-gray-500"
              >
                No hay piezas disponibles...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
