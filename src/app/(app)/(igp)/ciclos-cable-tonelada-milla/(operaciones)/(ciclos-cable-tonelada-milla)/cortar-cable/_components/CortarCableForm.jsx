'use client';
import { Form, Formik } from 'formik';
import {
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useRef, useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { formatCurrency } from '@/utils/formatters/currency.formatter';
import { cortarCable } from '@/services/cortesCable.service';
import { MOTIVOS_CORTE } from '@/constants/ciclosCable.constant';

export default function CortarCableForm({ bobina }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const handleOnFinish = async ({ fecha_inicio, ...data }) => {
    try {
      const payload = {
        ...data,
        fecha_corte: new Date(fecha_inicio),
        elemento_deposito_id: parseInt(bobina?.id),
      };

      await cortarCable(payload);
      alert('Corte realizado con exito');
      router.back();
      router.refresh();
    } catch (error) {
      alert(
        error?.response?.data?.error?.message ?? 'Error al cortar el cable'
      );
    } finally {
      setShowModalConfirm(false);
    }
  };

  function handleValidation(values) {
    const errors = {};
    if (!values?.metros_corte) {
      errors.metros_corte = 'Los metros de corte son requeridos';
    }

    if (values?.metros_corte > Number(bobina?.diametro?.largo_corte)) {
      errors.metros_corte = `Los metros de corte no pueden ser mayor a ${bobina?.diametro?.largo_corte} mts.`;
    }

    if (values?.remanente !== 0 && !values?.remanente) {
      errors.remanente = 'El remanente del tramo es requerido';
    }

    const totalCorte =
      Number(values?.metros_corte ?? 0) + Number(values?.remanente ?? 0);

    if (totalCorte !== Number(bobina?.diametro?.largo_corte)) {
      errors.remanente = `El remanente debe coincidir con el largo corte ${bobina?.diametro?.largo_corte} m.`;
    }

    if (!values?.fecha_inicio) {
      errors.fecha_inicio = 'La fecha inicio es requerida';
    }
    return errors;
  }

  const obtenerColorRemanente = (valueRaw) => {
    if (valueRaw === '' || isNaN(valueRaw)) return 'white';

    const value = Number(valueRaw);
    const maxCorte = Number(bobina?.diametro?.largo_corte);

    if (value === 0) return '#52B358';
    if (value > maxCorte || value < 0) return '#D03E48';
    if (value < maxCorte) return '#F4DD48';
    return 'white';
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          metros_corte: '',
          remanente: '',
          fecha_inicio: '',
          motivo: MOTIVOS_CORTE.VISUAL,
        }}
        innerRef={formRef}
        validate={handleValidation}
        onSubmit={(data) => handleOnFinish(data)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          handleSubmit,
          validateForm,
          errors,
          values,
          handleChange,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-8 gap-3 items-start">
              <h2 className="font-medium col-span-1">
                Fecha hora/ <br />
                último corte
              </h2>
              <div className="col-span-6">
                <div className="bg-backgroundGray px-4 py-8 rounded space-y-5">
                  <h2 className="font-semibold">Punto de corte</h2>
                  <div className="grid grid-cols-4 gap-5">
                    <InputField
                      id={'fecha_inicio'}
                      name={'fecha_inicio'}
                      type="datetime-local"
                      error={errors?.fecha_inicio}
                      label={'Fecha inicio'}
                      labelStyles="font-light"
                      inputStyles="text-xs bg-white shadow py-3 px-2 text-base"
                    />
                    <InputField
                      id={'motivo'}
                      name={'motivo'}
                      type="select"
                      options={Object.entries(MOTIVOS_CORTE).map(
                        ([, value]) => {
                          return {
                            value: value,
                            label: value,
                          };
                        }
                      )}
                      error={errors?.motivo}
                      label={'Inpeccion'}
                      labelStyles="font-light"
                      inputStyles="text-[8px] bg-white shadow py-[0.65rem] px-2 text-base"
                    />
                    <InputField
                      id={'metros_corte'}
                      name={'metros_corte'}
                      type="number"
                      error={errors?.metros_corte}
                      label={'Metros corte'}
                      labelStyles="font-light"
                      inputStyles="text-[8px] bg-white shadow py-2 px-2 text-base"
                      onChange={(value) => {
                        handleChange(value);

                        const maxCorte = Number(bobina?.diametro?.largo_corte);
                        const corte = value?.target?.value
                          ? Number(value?.target?.value)
                          : 0;

                        const remanente = corte > 0 ? maxCorte - corte : '';
                        setFieldValue('remanente', remanente);
                      }}
                    />
                    <InputField
                      id={'remanente'}
                      name={'remanente'}
                      type="number"
                      disabled
                      error={errors?.remanente}
                      value={values?.remanente}
                      label={'Remanente del tramo'}
                      labelStyles="font-light"
                      inputStyles={`text-[8px] shadow py-2 px-2 text-base`}
                      style={{
                        backgroundColor: obtenerColorRemanente(
                          values?.remanente
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-2 gap-1 items-center">
                  {values?.remanente === 0 && (
                    <Fragment>
                      <h2 className="uppercase text-sm font-semibold">
                        El corte se ajusta a la normativa
                      </h2>
                      <CircleCheck size={23} color="white" fill="#52B358" />
                    </Fragment>
                  )}
                  {values?.remanente > 0 &&
                    values?.remanente <
                      Number(bobina?.diametro?.largo_corte) && (
                      <Fragment>
                        <h2 className="uppercase text-sm font-semibold">
                          El corte está por debajo del limite establecido por la
                          norma
                        </h2>
                        <TriangleAlert size={23} color="black" fill="#F4DD48" />
                      </Fragment>
                    )}
                  {values?.remanente < 0 && (
                    <Fragment>
                      <h2 className="uppercase text-sm font-semibold">
                        El corte supero el limite establecido por la norma
                      </h2>
                      <CircleAlert size={23} color="white" fill="#D03E48" />
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end self-end mt-10">
              <Button
                icon={<ChevronLeft size={20} />}
                onClick={() => router.back()}
              >
                volver
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  const errors = await validateForm();
                  if (Object.keys(errors).length > 0) return;
                  setShowModalConfirm(true);
                }}
              >
                cortar cable
              </Button>
            </div>
            <ModalDialog
              isOpen={showModalConfirm}
              onOk={() => formRef.current?.submitForm()}
              onCancel={() => setShowModalConfirm(false)}
            >
              <div className="flex flex-col gap-2">
                <p className="text-center font-medium">Desea cortar</p>
                <div className="border border-black rounded p-2 text-center text-xl font-light mx-14">
                  {formatCurrency(values?.metros_corte ?? 0)} m
                </div>
                <p className="text-center font-medium">de cable?</p>
              </div>
            </ModalDialog>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
