'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { signOut, getSession } from 'next-auth/react';
import AuthContext from '@/context/auth/authContext';
import BaseContext from '@/context/base/baseContext';
import Procesando from '@/components/icons/procesando';
import usePerforadoresStore from '@/store/perforadores.store';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { cargarPerforadores } = usePerforadoresStore();
  const { guardarPiezas, guardarEstado } = useContext(BaseContext);
  const { permisos, usuario, perforador, registrarUsuario, logout } =
    useContext(AuthContext);

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          throw new Error('No tiene sesion iniciada');
        }

        if (permisos && permisos?.length > 0) return;
        if (usuario) {
          throw new Error('No posee permisos para usar la aplicación');
        }

        const userPayload = {
          usuario: session.user.username,
          permisos: session.user.permisos,
        };
        cargarPerforadores(userPayload.permisos ?? []);
        registrarUsuario(userPayload);
      } catch (error) {
        router.push('/login');
      }
    };
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervaloUso = setInterval(async () => {
      const authMess = JSON.parse(localStorage.getItem('nextauth.message'));
      const ultimoUso = authMess.timestamp;
      const ahora = new Date().getTime() / 1000;

      if (ahora - ultimoUso > 86400) {
        logout();
        await signOut({ callbackUrl: '/login' });
      }
    }, 300000);
    return () => clearInterval(intervaloUso);
  }, []);

  const buscarPiezas = async () => {
    const filtro = {
      perf: perforador.idPerforador,
      baja: 0,
      uso: 1,
    };

    const { data } = await axios.post('/api/base/piezasPerforador', filtro);
    guardarPiezas(data);
  };

  const buscarEstado = async () => {
    const filtro = { perf: perforador.idPerforador };

    const { data } = await axios.post('/api/base/horasBomba', filtro);
    const dataTanque = await axios.post('/api/base/litrosTanque', filtro);

    let estado = {
      hsBomba1: 0,
      hsBomba2: 0,
      hsBomba3: 0,
      fechaAct: null,
      onBomba1: 0,
      onBomba2: 0,
      onBomba3: 0,
      lts: 0,
      fechalts: null,
    };

    if (data) {
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Para formato 24 horas
      };

      const fecha = data.fecha;
      const fechaAct = new Date(fecha);
      const fechaOffset = new Date(
        fechaAct.getTime() + fechaAct.getTimezoneOffset() * 60000
      );
      const fechaHoraFormateada = fechaOffset.toLocaleString('es-ES', options);

      let fechaLts = null;
      let ltsTanque = 0;

      if (dataTanque.data) {
        ltsTanque = dataTanque.data.lts;
        const fechaL = dataTanque.data.fecha;
        const fechaActL = new Date(fechaL);
        const fechaOffsetL = new Date(
          fechaActL.getTime() + fechaActL.getTimezoneOffset() * 60000
        );
        fechaLts = fechaOffsetL.toLocaleString('es-ES', options);
      }

      estado = {
        fechaAct: fechaHoraFormateada,
        hsBomba1: data?.hsBomba1,
        hsBomba2: data?.hsBomba2,
        hsBomba3: data?.hsBomba3,
        onBomba1: data?.onBomba1,
        onBomba2: data?.onBomba2,
        onBomba3: data?.onBomba3,
        fechaActDate: fechaAct,
        lts: ltsTanque,
        fechalts: fechaLts,
        tieneCambioHsBomba1: data?.tieneCambioHsBomba1,
        tieneCambioHsBomba2: data?.tieneCambioHsBomba2,
        tieneCambioHsBomba3: data?.tieneCambioHsBomba3,
      };
    }
    guardarEstado(estado);
  };

  /* useEffect(() => {
    const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
      await buscarEstado();
    };
    updateData();
  }, [perforador]); */

  return (
    <div>
      {usuario ? (
        children
      ) : (
        <div className=" h-screen h-full content-center pt-100">
          <Procesando />
        </div>
      )}
    </div>
  );
}
