'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { obtenerUbicaciones } from '@/services/ubicaciones.service';
import {
  actualizarLocacion,
  crearLocacion,
  eliminarLocacion,
  obtenerLocacionesPorUbicacion,
} from '@/services/locaciones.service';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { LocacionesList } from './_components/LocacionesList';
import { SkeletonLocacionesList } from './_components/SkeletonLocacionesList';

export const dynamic = 'force-dynamic';

export default function LocacionesPage() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacionesConLocaciones, setUbicacionesConLocaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [isLoadingCreateLocacion, setIsLoadingCreateLocacion] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [locacionToEdit, setLocacionToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [locacionToDelete, setLocacionToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const data = await obtenerUbicaciones();
        setUbicaciones(data?.ubicaciones);
      } catch (error) {
        setUbicaciones([]);
      }
    };
    fetchUbicaciones();
    return () => {
      setUbicaciones([]);
    };
  }, []);

  const fetchUbicacionesConLocaciones = async () => {
    try {
      setIsLoading(true);
      const data = await obtenerLocacionesPorUbicacion();
      setUbicacionesConLocaciones(data);
    } catch (error) {
      setUbicacionesConLocaciones([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicacionesConLocaciones();
  }, []);

  const initialValues = {
    nombre: '',
    nombre_clave: '',
    coordenadas: '',
    ubicacion_id: '',
    fecha_inicio: '',
    fecha_fin: '',
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values?.ubicacion_id)
      errors.ubicacion_id = 'La ubicación es requerida';

    if (!values?.nombre) {
      errors.nombre = 'El nombre es requerido';
    } else if (values?.nombre?.length > 25) {
      errors.nombre = 'El nombre no puede superar los 25 caracteres';
    }
    const currentDate = new Date();
    const twoYearsFromNow = new Date();
    twoYearsFromNow.setFullYear(currentDate.getFullYear() + 2);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

    if (values?.fecha_inicio) {
      const fechaInicio = new Date(values?.fecha_inicio);
      if (fechaInicio > twoYearsFromNow || fechaInicio < twoYearsAgo) {
        errors.fecha_inicio =
          'La fecha no puede ser mayor a 2 años en el futuro ni menor a 2 años en el pasado';
      }
    }

    if (values?.fecha_fin) {
      const fechaFin = new Date(values?.fecha_fin);
      if (fechaFin > twoYearsFromNow || fechaFin < twoYearsAgo) {
        errors.fecha_fin =
          'La fecha no puede ser mayor a 2 años en el futuro ni menor a 2 años en el pasado';
      }
    }

    if (!values?.coordenadas) {
      errors.coordenadas = 'Las coordenadas son requeridas';
    } else {
      const coordenadasRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
      if (!coordenadasRegex.test(values?.coordenadas)) {
        errors.coordenadas =
          'Formato inválido. Use: latitud,longitud (ej: 12.3456789,-12.3456789)';
      }
    }

    return errors;
  };

  const handleEdit = (locacion) => {
    setIsEditing(true);
    setLocacionToEdit(locacion);
    formikRef.current?.setValues({
      nombre: locacion?.nombre,
      nombre_clave: locacion?.nombre_clave || '',
      coordenadas: locacion?.coordenadas || '',
      ubicacion_id: locacion?.ubicacion_id?.toString(),
      fecha_inicio: locacion?.fecha_inicio
        ? new Date(locacion?.fecha_inicio).toISOString().split('T')[0]
        : '',
      fecha_fin: locacion?.fecha_fin
        ? new Date(locacion?.fecha_fin).toISOString().split('T')[0]
        : '',
    });
  };

  const handleSubmit = async (values) => {
    if (isEditing) {
      setFormValues({ ...values, id: locacionToEdit.id });
    } else {
      setFormValues(values);
    }
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setIsLoadingCreateLocacion(true);
      setShowModal(false);
      if (isEditing) {
        await actualizarLocacion(formValues);
      } else {
        await crearLocacion(formValues);
      }
      router.refresh();
      await fetchUbicacionesConLocaciones();
      formikRef.current?.resetForm();
      setFormValues(null);
      setIsEditing(false);
      setLocacionToEdit(null);
      setShowModalSuccess(true);
    } catch (error) {
      setErrorMessage('Ocurrió un error al procesar la locación');
      setShowModalError(true);
    } finally {
      setIsLoadingCreateLocacion(false);
    }
  };

  const handleDelete = (locacion) => {
    setLocacionToDelete(locacion);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoadingCreateLocacion(true);
      await eliminarLocacion(locacionToDelete?.id);
      setShowDeleteModal(false);
      setLocacionToDelete(null);
      router.refresh();
      await fetchUbicacionesConLocaciones();
      setShowModalSuccess(true);
    } catch (error) {
      setShowDeleteModal(false);
      if (error?.response?.status === 400) {
        setErrorMessage(
          'No se puede eliminar la locación porque tiene plan de pozo asociado'
        );
        return setShowModalError(true);
      }
      setErrorMessage('Ocurrió un error al eliminar la locación');
      setShowModalError(true);
    } finally {
      setIsLoadingCreateLocacion(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    formikRef.current?.resetForm();
  };

  const formikRef = useRef(null);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validate={handleValidation}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="text-2xl font-bold">Cargar nueva Locación</div>
              <div className="flex gap-6 w-full mt-6">
                <div className="bg-backgroundGray rounded-md w-2/4 px-7">
                  <div className="text-xl font-bold pt-5">
                    Locaciones cargadas
                  </div>
                  <div className="flex gap-7 mt-5">
                    {isLoading ? (
                      <SkeletonLocacionesList />
                    ) : (
                      <>
                        {ubicacionesConLocaciones?.map((ubicacion) => (
                          <LocacionesList
                            title={ubicacion?.nombre}
                            locaciones={ubicacion?.locaciones}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            key={ubicacion?.id + 'ubicacion'}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-backgroundGray rounded-md w-fit px-6 pt-6">
                  <div className="text-xl font-bold pb-4">
                    Datos de locación
                  </div>
                  <div className="flex flex-col justify-around h-[320px]">
                    <div>
                      <InputField
                        id="ubicacion_id"
                        name="ubicacion_id"
                        type="select"
                        label="Seleccionar ubicación"
                        inputStyles="p-2 text-xs"
                        labelStyles="text-xs font-medium"
                        options={[
                          { label: 'Seleccione una ubicación', value: '' },
                          ...ubicaciones?.map((u) => ({
                            label: u?.nombre,
                            value: u?.id,
                          })),
                        ]}
                        errorStyles="text-xs text-red-300"
                        value={values?.ubicacion_id}
                        error={errors?.ubicacion_id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <InputField
                          id="fecha_inicio"
                          name="fecha_inicio"
                          type="date"
                          label="Fecha de inicio"
                          labelStyles="text-xs font-medium"
                          inputStyles="text-[12px] py-[0.45rem]"
                          onChange={handleChange}
                          value={values?.fecha_inicio}
                          error={errors?.fecha_inicio}
                        />
                      </div>
                      <div>
                        <InputField
                          id="fecha_fin"
                          name="fecha_fin"
                          type="date"
                          label="Fecha de finalización"
                          labelStyles="text-xs font-medium"
                          inputStyles="text-[12px] py-[0.45rem]"
                          onChange={handleChange}
                          value={values?.fecha_fin}
                          error={errors?.fecha_fin}
                        />
                      </div>
                    </div>
                    <div>
                      <InputField
                        id="nombre"
                        name="nombre"
                        type="text"
                        label="Nombre locación"
                        labelStyles="text-xs font-medium"
                        inputStyles="text-[12px] py-[0.45rem]"
                        onChange={handleChange}
                        value={values?.nombre}
                        error={errors?.nombre}
                      />
                    </div>
                    <div>
                      <InputField
                        id="coordenadas"
                        name="coordenadas"
                        type="text"
                        label="Cargar coordenadas"
                        labelStyles="text-xs font-medium"
                        inputStyles="text-[12px] py-[0.45rem]"
                        placeholder="Ej: 12.3456789,-12.3456789"
                        onChange={handleChange}
                        value={values?.coordenadas}
                        error={errors?.coordenadas}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                {isEditing && (
                  <Button onClick={handleCancelEdit} type="button">
                    salir de edición
                  </Button>
                )}
                <Button type="submit" loading={isLoadingCreateLocacion}>
                  {isLoadingCreateLocacion
                    ? 'procesando'
                    : isEditing
                      ? 'modificar locacion'
                      : 'cargar locacion'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalDialog
        isOpen={showModal}
        onOk={handleConfirmSubmit}
        onCancel={() => setShowModal(false)}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-base font-medium text-center">La locación</h1>
          <div className="border border-[#000000] rounded-2xl px-3 py-2 text-center mx-5">
            {formValues?.nombre}
          </div>
          <p className="text-base font-medium text-center mt-1">
            {isEditing
              ? 'se modificará en el sistema'
              : 'se cargará en el sistema'}
          </p>
        </div>
      </ModalDialog>
      <ModalDialog
        isOpen={showDeleteModal}
        onOk={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setLocacionToDelete(null);
        }}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-base font-medium text-center">
            ¿Está seguro que desea eliminar la locación?
          </h1>
          <div className="border border-[#000000] rounded-2xl px-3 py-2 text-center mx-5">
            {locacionToDelete?.nombre}
          </div>
        </div>
      </ModalDialog>
      <ModalDialog
        title={'Operación realizada con exito!.'}
        isOpen={showModalSuccess}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowModalSuccess(false)}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
      />
      <ModalDialog
        title={errorMessage}
        isOpen={showModalError}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowModalError(false)}
        onCancel={() => setShowModalError(false)}
        status={'error'}
      />
    </>
  );
}
