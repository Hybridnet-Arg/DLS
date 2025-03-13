'use client';
import CargarElementoDeposito from '../components/CargarElementoDeposito';
import { obtenerElementoDepositoPorId } from '@/services/elementosDeposito.service';

export default async function TopDriveAlmacenPiezaId({ params }) {
  const { id, elemento_deposito_id } = params;
  let initialValues = {};
  let elementoComponente = {};

  try {
    const data = await obtenerElementoDepositoPorId(elemento_deposito_id);
    const fechaIngreso = data?.fecha_ingreso && new Date(data?.fecha_ingreso);

    elementoComponente = data?.elemento_componente;
    initialValues = {
      marca_id: data?.modelo?.marca_id,
      modelo_id: data?.modelo_id,
      tipo_rosca_id: data?.tipo_rosca_id,
      serie: data?.serie,
      condicion: data?.condicion,
      fecha_ingreso: fechaIngreso && fechaIngreso.toISOString().split('T')[0],
      hora_ingreso:
        fechaIngreso && fechaIngreso.toISOString().split('T')[1].split('.')[0],
    };
  } catch (error) {
    elementoComponente = {};
  }

  return (
    <CargarElementoDeposito
      elementoComponenteId={id}
      initialValues={initialValues}
      elementoComponente={elementoComponente}
      elementoDepositoId={elemento_deposito_id}
    />
  );
}
