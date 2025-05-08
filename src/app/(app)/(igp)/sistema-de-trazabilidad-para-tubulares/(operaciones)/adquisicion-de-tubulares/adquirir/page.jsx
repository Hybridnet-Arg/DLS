'use client';
import { Form, Formik } from 'formik';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import {
  crearTubularesAdquisiciones,
  obtenerTubularesProveedores,
  obtenerTubularesRangos,
  obtenerTubularesTiposBarra,
  obtenerTubularesTiposConexion,
} from '@/services/tubularesAdquisiciones.service';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import TubularIcon from '../_components/icons/TubularIcon';

const CANTIDAD_MINIMA = 1;

export default function AdquirirPage() {
  const router = useRouter();
  const formikRef = useRef(null);

  const [rangos, setRangos] = useState([]);
  const [tiposBarra, setTiposBarra] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [tiposConexion, settiposConexion] = useState([]);

  const [file, setFile] = useState(null);
  const [rango, setRango] = useState({});
  const [tipoBarra, setTipoBarra] = useState({});
  const [tipoConexion, setTipoConexion] = useState({});
  const { perforadores } = usePerforadoresStore();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [rangosRaw, tiposBarraRaw, tiposConexionRaw, proveedoresRaw] =
          await Promise.all([
            obtenerTubularesRangos(),
            obtenerTubularesTiposBarra(),
            obtenerTubularesTiposConexion(),
            obtenerTubularesProveedores(),
          ]);

        setRangos(rangosRaw);
        setTiposBarra(tiposBarraRaw);
        settiposConexion(tiposConexionRaw);
        setProveedores(proveedoresRaw);
      } catch (error) {
        alert('Error al cargar los datos');
      }
    }
    fetchData();
  }, []);

  const handleConfirm = () => {
    formikRef.current?.submitForm();
    setShowConfirmModal(false);
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values.perforador_id) {
      errors.perforador_id = 'El perforador es requerido';
    }
    if (!values.cantidad) {
      errors.cantidad = 'La cantidad es requerida';
    }
    if (values.cantidad < CANTIDAD_MINIMA) {
      errors.cantidad = `La cantidad debe ser mayor a ${CANTIDAD_MINIMA}`;
    }
    if (!values.tubulares_proveedor_id) {
      errors.tubulares_proveedor_id = 'El proveedor es requerido';
    }
    if (!values.fecha) {
      errors.fecha = 'La fecha es requerida';
    }
    if (!tipoBarra?.id) {
      errors.tubulares_tipo_barra_id = 'Elige un tipo de barra';
    }
    if (!tipoConexion?.id) {
      errors.tubulares_tipo_conexion_id = 'Elige un tipo de conexión';
    }
    if (!rango?.id) {
      errors.tubulares_rango_id = 'Elige un rango';
    }
    if (!file) {
      errors.enlace_documento = 'El documento es requerido';
    }
    if (file && !values?.numero_remito && !values?.numero_reporte) {
      errors.enlace_documento = 'Se requiere un numero de remito o reporte';
    }

    return errors;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleOnFinish = async (data) => {
    try {
      const { perforador_id, ...payload } = data;
      const perforador = perforadores.find(
        (perforador) => perforador?.idPerforador === perforador_id
      );

      await crearTubularesAdquisiciones({
        ...payload,
        perforador_nombre: perforador?.nombre,
        perforador_numero: perforador_id,
        enlace_documento: file,
        tubulares_rango_id: rango?.id,
        tubulares_tipo_barra_id: tipoBarra?.id,
        tubulares_tipo_conexion_id: tipoConexion?.id,
      });
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleShowConfirmModal = async () => {
    const errors = await formikRef?.current?.validateForm();
    if (Object.keys(errors).length === 0) setShowConfirmModal(true);
  };

  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] gap-5">
      <Title>Adquisición de tubulares</Title>
      <Formik
        innerRef={formikRef}
        initialValues={{}}
        validate={handleValidation}
        onSubmit={handleOnFinish}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="perforador_id"
              name="perforador_id"
              label="PERFORADOR"
              type="select"
              options={
                perforadores?.length > 0
                  ? [
                      { value: '', label: 'Selecciona un perforador' },
                      ...perforadores?.map((perforador) => ({
                        value: perforador?.idPerforador,
                        label: perforador?.nombre,
                      })),
                    ]
                  : []
              }
              onChange={handleChange}
              errorStyles="mt-2"
              inputStyles="text-dark text-sm"
              onBlur={handleBlur}
              value={values?.perforador_id}
              error={errors?.perforador_id}
            />
            <div className="flex gap-4">
              <InputField
                id="cantidad"
                name="cantidad"
                type="number"
                label="CANTIDAD"
                onChange={handleChange}
                min={CANTIDAD_MINIMA}
                errorStyles="mt-2"
                onBlur={handleBlur}
                value={values?.cantidad}
                error={errors?.cantidad}
              />
              <InputField
                id="tubulares_proveedor_id"
                name="tubulares_proveedor_id"
                label="PROVEEDOR"
                type="select"
                options={[
                  { value: '', label: 'Selecciona un proveedor' },
                  ...proveedores?.map((proveedor) => ({
                    value: proveedor?.id,
                    label: proveedor?.nombre,
                  })),
                ]}
                onChange={handleChange}
                errorStyles="mt-2"
                onBlur={handleBlur}
                value={values?.tubulares_proveedor_id}
                error={errors?.tubulares_proveedor_id}
              />
              <InputField
                id="numero_reporte"
                name="numero_reporte"
                label="N° REPORTE"
                disabled={values?.numero_remito}
                onChange={handleChange}
                errorStyles="mt-2"
                onBlur={handleBlur}
                value={values?.numero_reporte}
                error={errors?.numero_reporte}
              />
              <InputField
                id="numero_remito"
                name="numero_remito"
                label="N° DE REMITO/FACTURA"
                disabled={values?.numero_reporte}
                onChange={handleChange}
                errorStyles="mt-2"
                onBlur={handleBlur}
                value={values?.numero_remito}
                error={errors?.numero_remito}
              />
              <InputField
                id="enlace_documento"
                name="enlace_documento"
                type="file"
                label="SUBIR DOCUMENTO"
                onChange={handleFileChange}
                errorStyles="mt-2"
                onBlur={handleBlur}
                error={errors?.enlace_documento}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-[3]">
                <h2 className="uppercase mb-[4px] font-medium text-sm">
                  Caracteristicas
                </h2>
                <div className="flex border rounded border-backgroundGray shadow-md p-2">
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">TIPO DE BARRA</h2>
                    {tiposBarra?.map((item) => (
                      <div key={item?.id} className="text-sm">
                        <input
                          type="radio"
                          id="tubulares_tipo_barra_id"
                          checked={tipoBarra?.id === item?.id}
                          className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                          onChange={(event) => {
                            handleChange(event);
                            setTipoBarra(item);
                          }}
                        />
                        {item?.nombre}
                      </div>
                    ))}
                    <p className="text-red-500 text-sm">
                      {errors?.tubulares_tipo_barra_id}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">TIPO DE CONEXION</h2>
                    {tiposConexion?.map((item) => (
                      <div key={item?.id} className="text-sm">
                        <input
                          type="radio"
                          checked={tipoConexion?.id === item?.id}
                          id="tubulares_tipo_conexion_id"
                          className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                          onChange={(event) => {
                            handleChange(event);
                            setTipoConexion(item);
                          }}
                        />
                        {item?.nombre}
                      </div>
                    ))}
                    <p className="text-red-500 text-sm">
                      {errors?.tubulares_tipo_conexion_id}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">RANGO</h2>
                    {rangos?.map((item) => (
                      <div key={item?.id} className="text-sm">
                        <input
                          type="radio"
                          id="tubulares_rango_id"
                          checked={rango?.id === item?.id}
                          className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                          onChange={(event) => {
                            handleChange(event);
                            setRango(item);
                          }}
                        />
                        {item?.nombre}
                      </div>
                    ))}
                    <p className="text-red-500 text-sm">
                      {errors?.tubulares_rango_id}
                    </p>
                  </div>
                </div>
              </div>
              <InputField
                id="fecha"
                name="fecha"
                type="date"
                label={'FECHA'}
                onChange={handleChange}
                errorStyles="mt-2"
                onBlur={handleBlur}
                className="flex-[2]"
                value={values?.fecha}
                error={errors?.fecha}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-end gap-2">
        <Button icon={<ChevronLeft size={20} />} onClick={() => router.back()}>
          volver
        </Button>
        <Button onClick={() => handleShowConfirmModal()}>
          adquirir tubulares
        </Button>
      </div>
      <ModalDialog
        isOpen={showConfirmModal}
        onOk={handleConfirm}
        onCancel={() => setShowConfirmModal(false)}
        closable
      >
        <p className="text-center font-semibold">
          Se van a solicitar {formikRef?.current?.values?.cantidad} tubulares
        </p>
        <div className="flex shadow-lg p-2 rounded-md pt-4">
          <div className="flex-1">
            <p>{formikRef?.current?.values?.numero_remito}</p>
            <p>{formikRef?.current?.values?.numero_reporte}</p>
            <p>{formikRef?.current?.values?.fecha}</p>
            <p>
              {formikRef?.current?.values?.perforador_id &&
                perforadores?.find(
                  (perforador) =>
                    perforador?.idPerforador ===
                    formikRef?.current?.values?.perforador_id
                )?.nombre}
            </p>
            <p>{rango?.nombre}</p>
            <p>{tipoBarra?.nombre}</p>
            <p>{tipoConexion?.nombre}</p>
          </div>
          <div className="flex-1">
            <TubularIcon height={150} />
          </div>
        </div>
        <br />
        <p className="text-center font-semibold">¿Es correcto?</p>
      </ModalDialog>
      <ModalDialog
        autoclose
        isOpen={showSuccessModal}
        onCancel={() => {
          setShowSuccessModal(false);
        }}
        onAutoClose={() => {
          router.push(
            '/sistema-de-trazabilidad-para-tubulares/adquisicion-de-tubulares'
          );
        }}
        status={'success'}
      >
        <p className="text-center">
          La adquisición de {formikRef?.current?.values?.cantidad} tubulares
        </p>
        <p className="text-center mb-4">se realizo con exito</p>
      </ModalDialog>
      <ModalDialog
        title={'Hubo un error al intentar adquirir los tubulares'}
        isOpen={showErrorModal}
        onOk={() => setShowErrorModal(false)}
        onCancel={() => setShowErrorModal(false)}
        status={'error'}
      />
    </div>
  );
}
