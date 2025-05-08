'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { ChevronLeft, Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import {
  obtenerPiezaPorId,
  obtenerTiposPieza,
} from '@/services/schb/pieza.service';
import Title from '@/components/ui/labels/Title';
import PiezaImage from '../../../_components/PiezaImage';
import StockPieza from '../_components/StockPieza';
import CleanIcon from '@/components/icons/CleanIcon';
import Button from '@/components/ui/buttons/Button';
import CargarPiezaModal from '../../../_components/CargarPiezaModal';
import { obtenerModelos } from '@/services/schb/modelo.service';
import { obtenerDiametros } from '@/services/schb/diametro.service';

function ItemList({
  records,
  label,
  notFound = 'Sin datos',
  selectedRow,
  setSelectedRow = () => {},
  title = '',
  allowClear = true,
  loading = false,
}) {
  return (
    <div className="flex flex-col flex-1 p-4 shadow-dark-sm rounded-md">
      <h3 className="font-semibold text-center shadow-md p-1 mb-2">{title}</h3>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader
            size={30}
            color="#25303B"
            className="animate-spin text-white mx-4"
          />
        </div>
      ) : !records?.length ? (
        <p>{notFound}</p>
      ) : (
        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-2">
            {records.map((item) => (
              <p
                key={item[label]}
                className={clsx(
                  'flex gap-4 cursor-pointer hover:bg-gray-200 transition duration-300',
                  {
                    'bg-gray-300': item?.[label] === selectedRow?.[label],
                  }
                )}
                onClick={() => setSelectedRow(item)}
              >
                <span className="font-bold text-sm">{item.total}</span>
                <span className="text-sm">{item[label]}</span>
              </p>
            ))}
          </div>
          {allowClear && (
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-100 rounded-full p-2 shadow-dark-sm"
                onClick={() => setSelectedRow(null)}
              >
                <CleanIcon height={20} width={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AlmacenAgrupadoId() {
  const { idPieza } = useParams();
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [pieza, setPieza] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tiposPieza, setTiposPieza] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [diametros, setDiametros] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const queryParams = {
        perforador: perforadorSeleccionado?.idPerforador,
      };

      if (marcaSeleccionada) {
        queryParams.idMarca = marcaSeleccionada?.idMarca;
      }
      if (modeloSeleccionado) {
        queryParams.idModelo = modeloSeleccionado?.idModelo;
      }
      const promises = [
        obtenerModelos(),
        obtenerDiametros(),
        obtenerPiezaPorId(idPieza, queryParams),
        obtenerTiposPieza(),
      ];
      const [modelos, diametros, pieza, tiposPieza] =
        await Promise.all(promises);
      setModelos(modelos);
      setDiametros(diametros);
      setPieza(pieza);
      setTiposPieza(tiposPieza);
    } catch (error) {
      setModelos([]);
      setDiametros([]);
      setPieza({});
      setTiposPieza([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setModelos([]);
      setDiametros([]);
      setPieza({});
      setTiposPieza([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    perforadorSeleccionado?.idPerforador,
    idPieza,
    marcaSeleccionada,
    modeloSeleccionado,
  ]);

  return (
    <div className="mx-3 my-2">
      <Title>Almacén agrupado</Title>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col flex-1 p-4 justify-center items-center space-y-6">
          <Link
            className="flex "
            href="/sistema-de-horas-de-bomba/almacen-agrupado"
          >
            <ChevronLeft size={20} />
            Almacén agrupado
          </Link>
          <h3 className="text-center uppercase text-lg font-semibold">
            {pieza?.tipo}
          </h3>
          <PiezaImage
            pieza={pieza}
            width={100}
            height={100}
            iconProps={{ size: 90 }}
          />
          <StockPieza
            className="w-3/4"
            min={pieza?.piezaPerforador?.[0]?.stock}
            un={pieza?._count?.perforadorPieza}
          />
        </div>
        <ItemList
          selectedRow={marcaSeleccionada}
          setSelectedRow={setMarcaSeleccionada}
          records={pieza?.marcas}
          label={'marca'}
          title="Marcas"
          loading={isLoading}
        />
        <ItemList
          selectedRow={modeloSeleccionado}
          setSelectedRow={setModeloSeleccionado}
          records={pieza?.modelos}
          label={'modelo'}
          title="Modelos"
          loading={isLoading}
        />
        <ItemList
          records={pieza?.diametros}
          label={'diametro'}
          title="Diametros"
          allowClear={false}
          loading={isLoading}
        />
      </div>
      <CargarPiezaModal
        marcas={pieza?.marcas}
        modelos={modelos}
        diametros={diametros}
        piezas={[pieza]}
        tiposPieza={tiposPieza}
        setShowModal={setShowModal}
        showModal={showModal}
        onFinish={fetchData}
      />
      <div className="flex justify-end mt-5" onClick={() => setShowModal(true)}>
        <Button>Cargar</Button>
      </div>
    </div>
  );
}
