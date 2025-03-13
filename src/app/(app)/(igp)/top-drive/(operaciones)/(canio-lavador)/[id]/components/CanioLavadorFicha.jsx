import clsx from 'clsx';
import CanioLavadorImage from '../../../components/CanioLavadorImage';
import { isSaverSub } from '../../../helpers/elementType.helper';

function ItemDesc({ title, value }) {
  return (
    <div className="mb-2">
      <h2 className="text-xs mb-1">{title}</h2>
      <div
        className={clsx(
          'text-xs bg-white px-3 py-[0.2rem] rounded text-center',
          {
            'py-[0.7rem]': !value,
          }
        )}
      >
        <p>{value}</p>
      </div>
    </div>
  );
}
export default function CanioLavadorFicha({ elementos_deposito, elemento }) {
  return (
    <div className="mt-5">
      <h1 className="text-base mb-1">Ficha técnica y estado</h1>
      <div className="bg-backgroundGray p-3 rounded-md flex flex-wrap gap-14">
        <div className="flex-1 flex-grow">
          <ItemDesc title={'Tipo'} value={elemento?.tipo_elemento?.nombre} />
          <ItemDesc
            title={'Marca'}
            value={
              elementos_deposito?.[0]?.modelo?.marca?.nombre
                ? elementos_deposito?.[0]?.modelo?.marca?.nombre
                : isSaverSub(elemento?.id)
                  ? 'Sin marca'
                  : ''
            }
          />
          <ItemDesc
            title={'Modelo'}
            value={
              elementos_deposito?.[0]?.modelo?.nombre
                ? elementos_deposito?.[0]?.modelo?.nombre
                : isSaverSub(elemento?.id)
                  ? 'Sin modelo'
                  : ''
            }
          />
          {isSaverSub(elemento?.id) && (
            <ItemDesc
              title={'Rosca'}
              value={elementos_deposito?.[0]?.tipo_rosca?.nombre}
            />
          )}
          <ItemDesc title={'N° Serie'} value={elementos_deposito?.[0]?.serie} />
          <ItemDesc
            title={'Condicion'}
            value={elementos_deposito?.[0]?.condicion}
          />
        </div>
        <CanioLavadorImage
          elementos_deposito={elementos_deposito?.[0] ?? {}}
          elemento={elemento}
        />
        <div className="flex-1 flex-grow m-auto">
          <ItemDesc
            title={'Horas de uso'}
            value={elementos_deposito?.[0]?.horas_en_uso}
          />
        </div>
      </div>
    </div>
  );
}
