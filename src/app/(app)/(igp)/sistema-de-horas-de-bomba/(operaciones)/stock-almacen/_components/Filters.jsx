'use client';
import { Loader } from 'lucide-react';
import { Fragment, useState, useEffect } from 'react';
import { obtenerMarcas } from '@/services/schb/marca.service';
import { obtenerModelos } from '@/services/schb/modelo.service';
import {
  obtenerPiezas,
  obtenerTiposPieza,
} from '@/services/schb/pieza.service';
import { obtenerDiametros } from '@/services/schb/diametro.service';
import CargarPiezaModal from '../../../_components/CargarPiezaModal';
import usePerforadoresStore from '@/store/perforadores.store';

function CustomFilter({
  title,
  data = [],
  columnLabel = '',
  columnValue = '',
  tableName = '',
  onSelect = () => {},
}) {
  const [, setFilter] = useState([]);

  function onFilter(checked, newfilter) {
    let filterRaw = [];
    setFilter((prev) => {
      if (checked) {
        filterRaw = [...prev, newfilter];
      } else {
        filterRaw = prev.filter((item) => item !== newfilter);
      }
      onSelect(tableName, filterRaw);
      return filterRaw;
    });
  }

  return (
    <Fragment>
      <h2 className="font-medium text-base">{title}</h2>
      <div>
        {data.length === 0 ? (
          <p className="text-sm">- Sin datos.</p>
        ) : (
          data.map((item) => (
            <div key={item?.id} className="flex gap-2">
              <input
                onChange={(event) => {
                  onFilter(event.target.checked, event.target.value);
                }}
                value={item?.[`${columnValue}`]}
                type="checkbox"
              />
              <label className="text-sm">{item?.[`${columnLabel}`]}</label>
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
}

export default function Filters({
  onFilter = () => {},
  showModal,
  setShowModal = () => {},
  showEditModal,
  setShowEditModal = () => {},
  onFinishCreatePiece = () => {},
  pieza,
}) {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [diametros, setDiametros] = useState([]);
  const [piezas, setPiezas] = useState([]);
  const [tiposPieza, setTiposPieza] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          obtenerMarcas(),
          obtenerModelos(),
          obtenerDiametros(),
          obtenerPiezas({ perforador: perforadorSeleccionado?.idPerforador }),
          obtenerTiposPieza(),
        ];
        const [marcas, modelos, diametros, piezas, tiposPieza] =
          await Promise.all(promises);

        setMarcas(marcas);
        setModelos(modelos);
        setDiametros(diametros);
        setPiezas(piezas);
        setTiposPieza(tiposPieza);
      } catch (error) {
        setMarcas([]);
        setModelos([]);
        setDiametros([]);
        setPiezas([]);
        setTiposPieza([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      setMarcas([]);
      setModelos([]);
      setDiametros([]);
      setPiezas([]);
      setTiposPieza([]);
    };
  }, [perforadorSeleccionado?.idPerforador]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="col-span-1 mt-5 overflow-y-scroll max-h-[350px] space-y-2 flex justify-center items-center">
          <Loader size={25} className="animate-spin text-dark" />
        </div>
      ) : (
        <div className="col-span-1 mt-5 overflow-y-scroll max-h-[350px] space-y-2">
          <CustomFilter
            data={piezas}
            title={'Tipo de pieza'}
            tableName={'piezas'}
            columnLabel={'tipo'}
            columnValue="idPieza"
            onSelect={onFilter}
          />
          <CustomFilter
            data={marcas}
            title={'Marca'}
            tableName={'marcas'}
            columnLabel={'marca'}
            columnValue="idMarca"
            onSelect={onFilter}
          />
          <CustomFilter
            data={modelos}
            title={'Modelo'}
            tableName={'modelos'}
            columnLabel={'modelo'}
            columnValue="idModelo"
            onSelect={onFilter}
          />
          <CustomFilter
            data={diametros}
            title={'Diametro'}
            tableName={'diametros'}
            columnLabel={'diametro'}
            columnValue="idDiametro"
            onSelect={onFilter}
          />
        </div>
      )}
      <CargarPiezaModal
        marcas={marcas}
        modelos={modelos}
        diametros={diametros}
        piezas={piezas}
        tiposPieza={tiposPieza}
        setShowModal={setShowModal}
        showModal={showModal}
        onFinish={onFinishCreatePiece}
      />
      <CargarPiezaModal
        pieza={pieza}
        marcas={marcas}
        modelos={modelos}
        diametros={diametros}
        piezas={piezas}
        tiposPieza={tiposPieza}
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        onFinish={onFinishCreatePiece}
      />
    </Fragment>
  );
}
