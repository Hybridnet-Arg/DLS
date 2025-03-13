'use client';
import { Form, Formik } from 'formik';
import { AlignCenter } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import Title from '@/components/ui/labels/Title';
import { obtenerDiametros } from '@/services/diametros.service';
import { getAllMarcas } from '@/services/marcas.service';
import InputField from '@/components/ui/inputs/Input';
import Table from '@/components/table/Table';
import usePerforadoresStore from '@/store/perforadores.store';
import { obtenerLogElementosPorFiltros } from '@/services/logElementos.service';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { COMPONENTES } from '@/constants/componentes.constant';
import { TIPO_MOTIVO_BAJA } from '@/constants/logElementos.contant';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';
import { DEFAULT_PAGE } from '@/constants';

const columns = [
  {
    key: 'id',
    title: 'ID Pieza'.toLocaleUpperCase(),
  },
  {
    key: 'marca',
    title: 'Marca'.toLocaleUpperCase(),
    render: (row) => row?.elemento_deposito?.marca?.nombre,
  },
  {
    key: 'diametro',
    title: 'Diametro'.toLocaleUpperCase(),
    render: (row) => row?.elemento_deposito?.diametro?.pulgadas,
  },
  {
    key: 'serie',
    title: 'Numero de serie'.toLocaleUpperCase(),
    render: (row) => row?.elemento_deposito?.serie,
  },
  {
    key: 'mts',
    title: 'mts'.toLocaleUpperCase(),
    render: (row) => row?.elemento_deposito?.diametro?.largo_corte,
  },
  {
    key: 'motivo_baja',
    title: 'Motivo'.toLocaleUpperCase(),
  },
  {
    key: 'fecha_recambio',
    title: 'Fecha de cambio'.toLocaleUpperCase(),
    render: (row) => formatToDDMMYYYY(row?.fecha_recambio),
  },
  {
    key: 'user',
    title: 'responsable'.toLocaleUpperCase(),
    render: (row) => row?.usuario?.alias,
  },
];

export default function HistoricoCambioElementosCiclosCablePage() {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [marcas, setMarcas] = useState([]);
  const [diametros, setDiametros] = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogElementos = async ({
    marca_id,
    diametro_id,
    fecha_recambio_desde,
    fecha_recambio_hasta,
  }) => {
    setIsLoading(true);
    try {
      const filters = {
        elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
        componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
        numero_perforador: perforadorSeleccionado?.idPerforador,
        motivo_baja: TIPO_MOTIVO_BAJA.RECAMBIO,
        page: page,
      };

      if (marca_id) filters.marca_id = parseInt(marca_id);
      if (diametro_id) filters.diametro_id = parseInt(diametro_id);
      if (fecha_recambio_desde) {
        filters.fecha_recambio_desde = new Date(fecha_recambio_desde);
      }
      if (fecha_recambio_hasta) {
        filters.fecha_recambio_hasta = new Date(fecha_recambio_hasta);
      }

      const response = await obtenerLogElementosPorFiltros(filters);
      setRecords(response?.data);
      setTotalPages(response?.totalPages);
      setTotalRecords(response?.totalRecords);
    } catch (error) {
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogElementos({});
    return () => {
      setRecords([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado?.idPerforador, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diametrosRes, marcasRes] = await Promise.all([
          obtenerDiametros(),
          getAllMarcas(),
        ]);

        setDiametros(diametrosRes?.diametros ?? []);
        setMarcas(marcasRes?.marcas ?? []);
      } catch (error) {
        setMarcas([]);
        setDiametros([]);
      }
    };

    fetchData();
    return () => {
      setMarcas([]);
      setDiametros([]);
    };
  }, []);

  const handleOnFinish = async ({
    marca_id,
    diametro_id,
    fecha_recambio_desde,
    fecha_recambio_hasta,
  }) => {
    setPage(DEFAULT_PAGE);
    await fetchLogElementos({
      marca_id,
      diametro_id,
      fecha_recambio_desde,
      fecha_recambio_hasta,
    });
  };

  return (
    <Formik
      initialValues={{}}
      // validate={handleValidation}
      onSubmit={(data) => handleOnFinish(data)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, errors, values, handleChange, handleBlur }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] space-y-5"
        >
          <Title>Histórico cambio de elementos</Title>
          <div className="bg-backgroundGray p-8">
            <div className="flex justify-between gap-8 mb-10">
              <div className="flex-1">
                <h2 className="text-sm font-medium uppercase mb-2">
                  Búsqueda por filtros
                </h2>
                <div className="flex flex-1 align-middle gap-10 rounded-lg">
                  <InputField
                    id={'marca_id'}
                    type="select"
                    label="Marca"
                    inputStyles="p-2 text-xs"
                    labelStyles="text-xs font-medium"
                    options={[
                      { label: 'Seleccione una marca', value: '' },
                      ...marcas?.map((m) => ({
                        label: m?.nombre,
                        value: m?.id,
                      })),
                    ]}
                    errorStyles="text-xs text-red-300"
                    value={values?.marca_id}
                    error={errors?.marca_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputField
                    id={'diametro_id'}
                    type="select"
                    label="Diametro"
                    labelStyles="text-xs font-medium"
                    inputStyles="p-2 text-xs"
                    options={[
                      { label: 'Seleccione un diametro', value: '' },
                      ...diametros?.map((d) => ({
                        label: d?.pulgadas,
                        value: d?.id,
                      })),
                    ]}
                    errorStyles="text-xs text-red-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.diametro_id}
                    error={errors?.diametro_id}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-medium uppercase mb-2">
                  Fecha de cambio
                </h2>
                <div className="flex-1 flex gap-10">
                  <InputField
                    id={'fecha_recambio_desde'}
                    name={'fecha_recambio_desde'}
                    type="date"
                    label="Fecha desde"
                    labelStyles="text-xs font-medium"
                    inputStyles="text-[12px] py-[0.45rem]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.fecha_recambio_desde}
                    error={errors?.fecha_recambio_desde}
                  />
                  <InputField
                    id={'fecha_recambio_hasta'}
                    name={'fecha_recambio_hasta'}
                    type="date"
                    label="Fecha hasta"
                    labelStyles="text-xs font-medium"
                    inputStyles="text-[12px] py-[0.45rem]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.fecha_recambio_hasta}
                    error={errors?.fecha_recambio_hasta}
                  />
                </div>
              </div>
            </div>
            <Table
              className="p-0"
              columns={columns}
              data={records}
              pagination={{
                currentPage: page,
                totalPages,
                totalRecords,
                onPageChange: (page) => setPage(page),
              }}
              loading={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button iconRight={<AlignCenter size={15} />}>Buscar</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
