'use client';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAllMarcas } from '@/services/marcas.service';
import { getAllModelos } from '@/services/modelos.service';
import { obtenerTiposRosca } from '@/services/tipos-rosca.service';
import {
  actualizarElementoDeposito,
  crearElementoDeposito,
} from '@/services/elementosDeposito.service';
import usePerforadoresStore from '@/store/perforadores.store';
import {
  getElementName,
  isSaverSub,
} from '../../../../helpers/elementType.helper';

import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import CanioLavadorImage from '../../../../components/CanioLavadorImage';

export default function CargarElementoDeposito({
  elementoDepositoId,
  elementoComponente,
  elementoComponenteId,
  initialValues = {},
}) {
  const router = useRouter();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tiposRosca, setTiposRosca] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(initialValues?.marca_id);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  useEffect(() => {
    const fetchTiposRosca = async () => {
      try {
        const data = await obtenerTiposRosca();
        setTiposRosca(data?.tipos_rosca);
      } catch (error) {
        setTiposRosca([]);
      }
    };
    fetchTiposRosca();
    return () => {
      setTiposRosca([]);
    };
  }, []);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        if (isSaverSub(elementoComponente?.elemento_id)) {
          return;
        }
        const data = await getAllMarcas();
        setMarcas(data?.marcas);
      } catch (error) {
        setMarcas([]);
      }
    };
    fetchMarcas();
    return () => {
      setMarcas([]);
    };
  }, []);

  useEffect(() => {
    const fetchModelos = async () => {
      if (!selectedMarca) return;
      try {
        const data = await getAllModelos({ marca_id: parseInt(selectedMarca) });
        setModelos(data?.modelos);
      } catch (error) {
        setModelos([]);
      }
    };
    fetchModelos();
    return () => {
      setModelos([]);
    };
  }, [selectedMarca]);

  const handleOnSubmit = async ({
    marca_id,
    fecha_ingreso,
    hora_ingreso,
    ...values
  }) => {
    setIsLoadingOnFinish(true);
    try {
      const payload = {
        ...values,
        modelo_id: parseInt(values?.modelo_id),
        elemento_componente_id: parseInt(elementoComponenteId),
        fecha_ingreso: new Date(`${fecha_ingreso}T${hora_ingreso}:00Z`),
        numero_perforador: perforadorSeleccionado?.idPerforador,
        tipo_rosca_id: parseInt(values?.tipo_rosca_id),
      };

      if (!elementoDepositoId) {
        await crearElementoDeposito({
          ...payload,
          horas_en_uso: 0,
          horas_de_uso: 0,
          horas_iniciales: 0,
          horas_actuales: 0,
        });
      } else await actualizarElementoDeposito(elementoDepositoId, payload);

      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoadingOnFinish(false);
      setShowConfirmModal(false);
    }
  };

  const handleRedirect = () => {
    router.back();
    router.refresh();
  };

  const handleValidate = (values) => {
    const errors = {};

    if (!values.serie) {
      errors.serie = 'Debe ingresar el nro. de inventario';
    }
    if (!values.condicion) {
      errors.condicion = 'Debe seleccionar la condicion';
    }

    if (!isSaverSub(elementoComponente?.elemento_id)) {
      if (!values.marca_id) {
        errors.marca_id = 'Debe seleccionar la marca';
      }
      if (!values.modelo_id) {
        errors.modelo_id = 'Debe seleccionar el modelo';
      }
    }

    if (!values.fecha_ingreso) {
      errors.fecha_ingreso = 'Fecha requerida';
    }
    if (!values.hora_ingreso) {
      errors.hora_ingreso = 'Hora requerida';
    }

    return errors;
  };

  return (
    <Formik
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
      validate={handleValidate}
      validateOnBlur={false}
    >
      {({
        values,
        handleChange,
        handleBlur,
        validateForm,
        submitForm,
        errors,
        isValid,
      }) => (
        <Form className="flex justify-between flex-col w-full h-full">
          <Title>
            {!elementoDepositoId ? 'Carga' : 'Editar pieza'} de{' '}
            {getElementName(elementoComponente?.elemento?.nombre)}
          </Title>
          <div className="flex py-5 gap-5">
            <div className="flex-1 rounded flex justify-end">
              <CanioLavadorImage
                height={150}
                width={150}
                elementos_deposito={{ horas_en_uso: 0 }}
                elemento={elementoComponente?.elemento}
              />
            </div>
            <div className="flex-1 flex-col flex justify-center">
              <InputField
                id="marca_id"
                name="marca_id"
                type="select"
                label="Marca"
                disabled={false}
                inputStyles="bg-dark text-white rounded-lg w-full text-sm"
                options={[
                  {
                    label: isSaverSub(elementoComponente?.elemento_id)
                      ? 'Sin marca'
                      : 'Seleccionar marca',
                    value: '',
                  },
                  ...marcas?.map((marca) => ({
                    label: marca?.nombre,
                    value: marca?.id,
                  })),
                ]}
                onChange={(event) => {
                  setSelectedMarca(event?.target?.value);
                  handleChange(event);
                }}
                onBlur={handleBlur}
                value={values.marca_id}
                error={errors?.marca_id}
              />
              <InputField
                id="modelo_id"
                name="modelo_id"
                type="select"
                label="Modelo"
                disabled={
                  modelos?.length === 0 &&
                  !isSaverSub(elementoComponente?.elemento_id)
                }
                inputStyles="bg-dark text-white rounded-lg w-full text-sm"
                options={[
                  {
                    label: isSaverSub(elementoComponente?.elemento_id)
                      ? 'Sin modelo'
                      : 'Seleccionar modelo',
                    value: '',
                  },
                  ...modelos?.map((modelo) => ({
                    label: modelo?.nombre,
                    value: modelo?.id,
                  })),
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.modelo_id}
                error={errors?.modelo_id}
              />
              {isSaverSub(elementoComponente?.elemento_id) && (
                <InputField
                  id="tipo_rosca_id"
                  name="tipo_rosca_id"
                  type="select"
                  label="Tipo de rosca"
                  disabled={false}
                  inputStyles="bg-dark text-white rounded-lg w-full text-sm"
                  options={[
                    {
                      label: 'Seleccionar tipo de rosca',
                      value: '',
                    },
                    ...tiposRosca?.map((marca) => ({
                      label: marca?.nombre,
                      value: marca?.id,
                    })),
                  ]}
                  onChange={(event) => {
                    setSelectedMarca(event?.target?.value);
                    handleChange(event);
                  }}
                  onBlur={handleBlur}
                  value={values.tipo_rosca_id}
                  error={errors?.tipo_rosca_id}
                />
              )}
              <InputField
                id="serie"
                name="serie"
                label="Numero de serie"
                disabled={false}
                inputStyles="bg-dark text-white rounded-lg w-full px-3"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={handleBlur}
                value={values.serie}
                error={errors?.serie}
              />
              <InputField
                id="condicion"
                name="condicion"
                type="select"
                label="Condicion"
                disabled={false}
                inputStyles="bg-dark text-white rounded-lg w-full text-sm"
                options={[
                  { label: 'Seleccionar condición', value: '' },
                  { label: 'NUEVO', value: 'NUEVO' },
                  { label: 'REPARADO', value: 'REPARADO' },
                ]}
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={handleBlur}
                value={values.condicion}
                error={errors?.condicion}
              />
            </div>
            <div className="flex-1 flex-col flex justify-center">
              <InputField
                id={'fecha_ingreso'}
                name={'fecha_ingreso'}
                type="date"
                className="w-28"
                label="Fecha ingreso"
                inputStyles="bg-dark text-white rounded-lg w-full px-3 custom-date-icon min-w-[150px]"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.fecha_ingreso}
                error={errors?.fecha_ingreso}
              />
              <InputField
                id={'hora_ingreso'}
                name={'hora_ingreso'}
                type="time"
                className="w-28"
                label="Hora ingreso"
                labelStyles="text-sm font-medium mt-2"
                inputStyles="bg-dark text-white rounded-lg w-full px-3 custom-date-icon min-w-[150px]"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.hora_ingreso}
                error={errors?.hora_ingreso}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Link href={`/top-drive/almacen/${elementoComponenteId}`}>
              <Button icon={<ChevronLeft size={20} />}>volver</Button>
            </Link>
            <Button
              onClick={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length > 0) return;
                setShowConfirmModal(true);
              }}
              type="button"
              disabled={!isValid}
            >
              {!elementoDepositoId ? 'cargar' : 'editar'} pieza
            </Button>
          </div>
          <ModalDialog
            title={`Estas seguro de ${!elementoDepositoId ? 'cargar' : 'editar'} la pieza`}
            isOpen={showConfirmModal}
            loading={isLoadingOnFinish}
            onOk={() => submitForm()}
            onCancel={() => setShowConfirmModal(false)}
          />
          <ModalDialog
            title={
              !elementoDepositoId
                ? 'Pieza cargada con exito!'
                : 'Pieza editada con exito!'
            }
            isOpen={showModalSuccess}
            onOkLabel="Ok"
            onCancelLabel="Cerrar"
            onOk={() => handleRedirect()}
            onCancel={() => setShowModalSuccess(false)}
            status={'success'}
          />
          <ModalDialog
            title={'Ha ha ocurrido un error!. Intente nuevamente.'}
            isOpen={showModalError}
            onOkLabel="Ok"
            onCancelLabel="Cerrar"
            onOk={() => handleRedirect()}
            onCancel={() => setShowModalError(false)}
            status={'error'}
          />
        </Form>
      )}
    </Formik>
  );
}
