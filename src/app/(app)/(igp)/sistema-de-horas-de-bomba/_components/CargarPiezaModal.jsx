'use client';
import { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import InputField from '@/components/ui/inputs/Input';
import Modal from '@/components/ui/modal/Modal';
import ModalDialog from '@/components/ui/modal/ModalDialog';

import {
  actualizarPerforadorPiezaPorId,
  crearPerforadorPiezas,
  obtenerNroSerie,
} from '@/services/schb/perforadorPieza.service';
import usePerforadoresStore from '@/store/perforadores.store';

const DEFAULT_VALUES = {
  idPieza: '',
  idMarca: '',
  idModelo: '',
  idDiametro: '',
  serie: '',
  cantidad: 1,
};

export default function CargarPiezaModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  marcas = [],
  modelos = [],
  diametros = [],
  piezas = [],
  pieza,
  tiposPieza = [],
}) {
  const formikRef = useRef();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [initialValues, setInitialValues] = useState(pieza ?? DEFAULT_VALUES);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [marcasTipoPieza, setMarcasTipoPieza] = useState([]);
  const [opcionesDiametro, setOpcionesDiametro] = useState([]);

  useEffect(() => {
    if (pieza) {
      obtenerMarcas(pieza.idPieza);
      setInitialValues({
        idPieza: pieza.idPieza,
        idMarca: pieza.idMarca,
        idModelo: pieza.idModelo,
        idDiametro: pieza.idDiametro,
        serie: pieza.serie,
        cantidad: 1,
      });
    }

    return () => {
      setInitialValues(DEFAULT_VALUES);
    };
  }, [pieza]);

  async function handleSubmit(values) {
    try {
      setIsLoadingSubmit(true);
      if (!pieza) {
        let payload = [];
        for (let i = 0; i < parseInt(values?.cantidad); i++) {
          payload.push({
            perforador: perforadorSeleccionado?.idPerforador,
            idMarca: parseInt(values?.idMarca),
            idModelo: parseInt(values?.idModelo),
            idDiametro: parseInt(values?.idDiametro),
            idPieza: parseInt(values?.idPieza),
            serie: values?.idPieza === '1' ? values?.serie.toString() : '',
            hs: 0,
            hsInst: 0,
            enUso: 0,
            baja: 0,
            motivo: null,
            bomba: 0,
            cuerpo: 0,
            modulo: null,
          });
        }
        await crearPerforadorPiezas(payload);
      } else {
        const payload = {
          ...values,
          perforador: perforadorSeleccionado?.idPerforador,
          idMarca: parseInt(values?.idMarca),
          idModelo: parseInt(values?.idModelo),
          idDiametro: parseInt(values?.idDiametro),
          idPieza: parseInt(values?.idPieza),
          hs: 0,
          hsInst: 0,
          enUso: 0,
        };
        await actualizarPerforadorPiezaPorId(pieza?.idPerforadorPieza, payload);
      }
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  async function handleValidation(values) {
    const errors = {};
    if (values?.idPieza === '') {
      errors.idPieza = 'Debe seleccionar una pieza';
    }

    // Si es camisa lleva numero de serie
    if (values?.idPieza === '1' && !values.serie) {
      errors.serie = 'Debe ingresar el nro. de serie';
    }
    // Si no es camisa debe indicar cantidad
    if (values?.idPieza !== '1' && !(values.cantidad > 0)) {
      errors.cantidad = 'Debe ingresar la cantidad';
    }

    if (values?.idMarca === '') {
      errors.idMarca = 'Debe seleccionar una marca';
    }

    return errors;
  }

  async function handleSelectChange(selectedValue) {
    if (selectedValue === '1') {
      const filtro = {
        perf: perforadorSeleccionado?.idPerforador,
        idPieza: selectedValue,
      };
      try {
        const data = await obtenerNroSerie(filtro);
        formikRef.current?.setFieldValue('serie', data[0].nro);
      } catch (error) {
        console.error('Error obteniendo la serie:', error);
      }
    }
  }

  function obtenerMarcas(idPieza) {
    let marcas = [];
    const pieza = piezas.find(
      (item) => parseInt(item.idPieza) === parseInt(idPieza)
    );
    if (pieza) {
      const tipoPieza = tiposPieza.find(
        (item) => item.idTipoPieza === pieza.idTipoPieza
      );
      if (tipoPieza) {
        marcas = tipoPieza.marcasTipoPieza.map((item) => item?.marca);
      }
    }
    setMarcasTipoPieza(marcas);
  }

  function obtenerOpcionesDiametro(idPieza) {
    let opciones =
      parseInt(idPieza) !== 15
        ? [
            { value: '', label: 'Sin diámetro' },
            ...diametros?.map((diametro) => ({
              value: diametro?.idDiametro,
              label: diametro?.diametro,
            })),
          ]
        : [{ value: '', label: 'Sin diámetro' }];
    setOpcionesDiametro(opciones);
  }
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      header={
        <h1 className="mx-4 mt-4 text-lg font-semibold ">
          {!pieza ? 'Cargar' : 'Modificar'} pieza
        </h1>
      }
      okLabel={`${!pieza ? 'Cargar' : 'Modificar'} pieza`}
      onOk={() => formikRef.current?.submitForm()}
      cancel
      isLoadingOk={isLoadingSubmit}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validate={handleValidation}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id={'idPieza'}
              name={'idPieza'}
              type="select"
              options={[
                { value: '', label: 'Selecciona una pieza ' },
                ...piezas?.map((piezas) => ({
                  value: piezas?.idPieza,
                  label: piezas?.tipo,
                })),
              ]}
              error={errors?.idPieza}
              value={values?.idPieza}
              label={'Tipo de pieza'}
              labelStyles="font-light text-sm"
              inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              onChange={(e) => {
                handleChange(e);
                handleSelectChange(e.target.value);
                obtenerMarcas(e.target.value);
                obtenerOpcionesDiametro(e.target.value);
                formikRef.current?.setFieldValue('idMarca', '');
                formikRef.current?.setFieldValue('idModelo', '');
              }}
            />
            <InputField
              id={'idMarca'}
              name={'idMarca'}
              type="select"
              options={[
                { value: '', label: 'Seleccione una marca' },
                ...marcasTipoPieza?.map((marca) => ({
                  value: marca?.idMarca,
                  label: marca?.marca,
                })),
              ]}
              error={errors?.idMarca}
              value={values?.idMarca}
              label={'Marca'}
              labelStyles="font-light text-sm"
              inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              onChange={(e) => {
                handleChange(e);
                formikRef.current?.setFieldValue('idModelo', '');
              }}
            />
            <InputField
              id={'idModelo'}
              name={'idModelo'}
              type="select"
              options={[
                { value: '', label: 'Sin modelo' },
                ...modelos
                  ?.filter(
                    (modelo) =>
                      parseInt(modelo?.idMarca) === parseInt(values?.idMarca)
                  )
                  ?.map((modelo) => ({
                    value: modelo?.idModelo,
                    label: modelo?.modelo,
                  })),
              ]}
              error={errors?.idModelo}
              value={values?.idModelo}
              label={'Modelo'}
              labelStyles="font-light text-sm"
              inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
            />
            <InputField
              id={'idDiametro'}
              name={'idDiametro'}
              type="select"
              options={opcionesDiametro}
              error={errors?.idDiametro}
              value={values?.idDiametro}
              label={'Diametro'}
              labelStyles="font-light text-sm"
              inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
            />
            {values?.idPieza == '1' && (
              <InputField
                id={'serie'}
                name={'serie'}
                error={errors?.serie}
                value={values?.serie}
                label={'Numero de serie'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
                readOnly
              />
            )}
            {!pieza && values?.idPieza && values?.idPieza != '1' && (
              <InputField
                id={'cantidad'}
                name={'cantidad'}
                error={errors?.cantidad}
                value={values?.cantidad}
                label={'Cantidad'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              />
            )}
          </Form>
        )}
      </Formik>
      <ModalDialog
        title={`Pieza ${!pieza ? 'cargada' : 'actualizada'} con exito`}
        isOpen={showSuccessModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={async () => {
          setShowModal(false);
          setShowSuccessModal(false);
          await onFinish();
        }}
        onCancel={async () => {
          setShowModal(false);
          setShowSuccessModal(false);
          await onFinish();
        }}
        status={'success'}
      />
      <ModalDialog
        title={`Error al ${!pieza ? 'cargar' : 'actualizar'} la pieza`}
        isOpen={showErrorModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowErrorModal(false)}
        onCancel={() => setShowErrorModal(false)}
        status={'error'}
      />
    </Modal>
  );
}
