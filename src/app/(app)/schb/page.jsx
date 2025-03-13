'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import Bomba from '@/components/bomba';
import Tanques from '@/components/tanques';
import Tanque from '@/components/tanque';
import Actualizacion from '@/components/actualizacion';
import BaseContext from '@/context/base/baseContext';
import AuthContext from '@/context/auth/authContext';

const initialBombaState = {
  c1: '#C1C1C1',
  c2: '#C1C1C1',
  c3: '#C1C1C1',
  horas: 0,
  semaforo: {
    s1: '#C1C1C1',
    s2: '#C1C1C1',
    s3: '#C1C1C1',
  },
  encendido: {
    desc: '--',
    color: '#C1C1C1',
  },
};

const Index = () => {
  const router = useRouter();

  const { piezas, estado, guardarPiezas, guardarEstado } =
    useContext(BaseContext);
  const { perforador } = useContext(AuthContext);

  const [vf, setVf] = useState({
    vfb1: 'DESCONECTADA',
    vfb2: 'DESCONECTADA',
    vfb3: 'DESCONECTADA',
  });
  const [tanque, setTanque] = useState({
    lts: 0,
    nivel: 0,
    fecha: null,
    color: 'red',
  });

  const [bomba1, setBomba1] = useState(initialBombaState);
  const [bomba2, setBomba2] = useState(initialBombaState);
  const [bomba3, setBomba3] = useState(initialBombaState);

  function colorearBomba(piezasBomba, bomba) {
    let piezaAlerta = 0;
    let piezaCritica = 0;
    let piezaB;
    let cuerpo;
    let cuerpo1A = 0;
    let cuerpo1C = 0;
    let cuerpo2A = 0;
    let cuerpo2C = 0;
    let cuerpo3A = 0;
    let cuerpo3C = 0;

    let colorSemaforo = {
      s1: 'green',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    };

    let cuerpo1 = 'green';
    let cuerpo2 = 'green';
    let cuerpo3 = 'green';

    for (let i = 0; i < piezasBomba.length; i++) {
      piezaB = piezasBomba[i];
      cuerpo = piezaB.cuerpo;
      if (piezaB.hs > piezaB.pieza.hsMin && piezaB.hs <= piezaB.pieza.hsMax) {
        piezaAlerta = piezaAlerta + 1;
        switch (cuerpo) {
          case 1:
            cuerpo1A = cuerpo1A + 1;
            break;
          case 2:
            cuerpo2A = cuerpo2A + 1;
            break;
          case 3:
            cuerpo3A = cuerpo3A + 1;
            break;
        }
      }
      if (piezaB.hs > piezaB.pieza.hsMax) {
        piezaCritica = piezaCritica + 1;
        switch (cuerpo) {
          case 1:
            cuerpo1C = cuerpo1C + 1;
            break;
          case 2:
            cuerpo2C = cuerpo2C + 1;
            break;
          case 3:
            cuerpo3C = cuerpo3C + 1;
            break;
        }
      }
    }
    //Me fijo si la bomba tiene piezas criticas o en alerta
    if (piezaCritica > 0)
      colorSemaforo = {
        s1: '#C1C1C1',
        s2: '#C1C1C1',
        s3: 'red',
      };
    else if (piezaAlerta > 0)
      colorSemaforo = {
        s1: '#C1C1C1',
        s2: 'yellow',
        s3: '#C1C1C1',
      };

    //Me fijo si los cuerpos tienen piezas criticas o en alerta
    if (cuerpo1C > 0) cuerpo1 = 'red';
    else if (cuerpo1A > 0) cuerpo1 = 'yellow';

    if (cuerpo2C > 0) cuerpo2 = 'red';
    else if (cuerpo2A > 0) cuerpo2 = 'yellow';

    if (cuerpo3C > 0) cuerpo3 = 'red';
    else if (cuerpo3A > 0) cuerpo3 = 'yellow';

    if (bomba == 1)
      setBomba1({
        ...bomba1,
        c1: cuerpo1,
        c2: cuerpo2,
        c3: cuerpo3,
        semaforo: colorSemaforo,
      });

    if (bomba == 2)
      setBomba2({
        ...bomba2,
        c1: cuerpo1,
        c2: cuerpo2,
        c3: cuerpo3,
        semaforo: colorSemaforo,
      });

    if (bomba == 3)
      setBomba3({
        ...bomba3,
        c1: cuerpo1,
        c2: cuerpo2,
        c3: cuerpo3,
        semaforo: colorSemaforo,
      });
  }

  //VF Para 163 unicamente
  const openModal = () => {
    setVf1Sel(vfBdD.vf1);
    setVf2Sel(vfBdD.vf2);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const aceptarVF = async () => {
    const dataUpdate = {
      vf1: vf1Sel,
      vf2: vf2Sel,
    };
    const respUpdateVf = await axios.post('/api/base/updateVfs', dataUpdate);
    console.log(respUpdateVf);
    buscarVf();
    setShowModal(false);
  };

  //para seleccionar bomba por VF
  const [vf1Sel, setVf1Sel] = useState();

  const handleChangeVf1 = (e) => {
    const valor = parseInt(e.target.value);
    setVf1Sel(valor);
  };

  const [vf2Sel, setVf2Sel] = useState();

  const handleChangeVf2 = (e) => {
    const valor = parseInt(e.target.value);
    setVf2Sel(valor);
  };

  const [showModal, setShowModal] = useState(false);
  const [vfBdD, setVfBdD] = useState({});

  const buscarVf = async () => {
    const { data } = await axios.post('/api/base/vfs');
    const vfBombas = data[0];
    setVfBdD(vfBombas);

    let vf = {
      vfb1: 'DESCONECTADA',
      vfb2: 'DESCONECTADA',
      vfb3: 'DESCONECTADA',
    };
    try {
      switch (vfBombas.vf1) {
        case 1:
          vf.vfb1 = 'CONECTADA INVERSOR 3 Y 4';
          break;
        case 2:
          vf.vfb2 = 'CONECTADA INVERSOR 3 Y 4';
          break;
        case 3:
          vf.vfb3 = 'CONECTADA INVERSOR 3 Y 4';
          break;
      }
      switch (vfBombas.vf2) {
        case 1:
          vf.vfb1 = 'CONECTADA INVERSOR 6 Y 7';
          break;
        case 2:
          vf.vfb2 = 'CONECTADA INVERSOR 6 Y 7';
          break;
        case 3:
          vf.vfb3 = 'CONECTADA INVERSOR 6 Y 7';
          break;
      }
    } catch (e) {}
    setVf(vf);
  };

  useEffect(() => {
    if (perforador && perforador.idPerforador == '163') {
      buscarVf();
    }
    const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
      await buscarEstado();
    };
    updateData();
  }, [perforador]);

  useEffect(() => {
    const setBombaData = () => {
      if (piezas?.length > 0) {
        const piezasBomba1 = piezas.filter((pieza) => pieza.bomba == 1);
        const piezasBomba2 = piezas.filter((pieza) => pieza.bomba == 2);
        const piezasBomba3 = piezas.filter((pieza) => pieza.bomba == 3);

        colorearBomba(piezasBomba1, 1);
        colorearBomba(piezasBomba2, 2);
        colorearBomba(piezasBomba3, 3);
        return;
      }

      const defaultBombaProps = {
        c1: '#C1C1C1',
        c2: '#C1C1C1',
        c3: '#C1C1C1',
        semaforo: {
          s1: '#C1C1C1',
          s2: '#C1C1C1',
          s3: '#C1C1C1',
        },
        encendido: {
          desc: '--',
          color: '#C1C1C1',
        },
      };

      //Pone en gris los cuerpos y los semaforos
      setBomba1({ ...bomba1, ...defaultBombaProps });
      setBomba2({ ...bomba2, ...defaultBombaProps });
      setBomba3({ ...bomba2, ...defaultBombaProps });
    };
    setBombaData();
  }, [piezas]);

  //actualiza horas y encendido

  useEffect(() => {
    if (estado) {
      //Colorea bomba 1
      let colorEncendido = {
        desc: 'OFF',
        color: 'red',
      };
      if (estado.onBomba1 >= 1) {
        colorEncendido = {
          desc: 'ON',
          color: 'green',
        };
      }

      setBomba1({
        ...bomba1,
        horas: estado.hsBomba1,
        encendido: colorEncendido,
      });
      //colorea bomba 2
      if (estado.onBomba2 >= 1) {
        colorEncendido = {
          desc: 'ON',
          color: 'green',
        };
      } else {
        colorEncendido = {
          desc: 'OFF',
          color: 'red',
        };
      }
      setBomba2({
        ...bomba2,
        horas: estado.hsBomba2,
        encendido: colorEncendido,
      });
      //colorea bomba 3
      if (estado.onBomba3 >= 1) {
        colorEncendido = {
          desc: 'ON',
          color: 'green',
        };
      } else {
        colorEncendido = {
          desc: 'OFF',
          color: 'red',
        };
      }
      setBomba3({
        ...bomba3,
        horas: estado.hsBomba3,
        encendido: colorEncendido,
      });

      let nivelCalulado = 5;
      let color = 'red';
      if (estado.lts > 0) {
        //colorea y calcula nivel
        if (perforador && perforador.idPerforador == '161') {
          if (estado.lts > 5000) color = 'green';
          else if (estado.lts > 2000) color = 'yellow';
          nivelCalulado = (estado.lts * 86) / 24000;
        } else {
          if (estado.lts > 20000) color = 'green';
          else if (estado.lts > 10000) color = 'yellow';
          nivelCalulado = (estado.lts * 86) / 77000;
        }

        if (nivelCalulado > 86) nivelCalulado = 86;
      }

      setTanque({
        lts: estado.lts,
        nivel: nivelCalulado,
        fecha: estado.fechalts,
        color: color,
      });
    }
  }, [estado]);

  const handleRedirectPiezas = (bomba, cuerpo) => {
    router.push(`/schb/piezas?bomba=${bomba}&cuerpo=${cuerpo}`);
  };

  /* useEffect(() => {
    const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
      await buscarEstado();
    };
    updateData();
  }, []); */

  //funcion que rutea el esquematico bomba 1
  const B1C1 = () => handleRedirectPiezas(1, 1);
  const B1C2 = () => handleRedirectPiezas(1, 2);
  const B1C3 = () => handleRedirectPiezas(1, 3);

  //funcion que rutea el esquematico bomba 3
  const B2C1 = () => handleRedirectPiezas(2, 1);
  const B2C2 = () => handleRedirectPiezas(2, 2);
  const B2C3 = () => handleRedirectPiezas(2, 3);

  //funcion que rutea el esquematico bomba 3
  const B3C1 = () => handleRedirectPiezas(3, 1);
  const B3C2 = () => handleRedirectPiezas(3, 2);
  const B3C3 = () => handleRedirectPiezas(3, 3);

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
        hsBomba1: data.hsBomba1,
        hsBomba2: data.hsBomba2,
        hsBomba3: data.hsBomba3,
        onBomba1: data.onBomba1,
        onBomba2: data.onBomba2,
        onBomba3: data.onBomba3,
        fechaActDate: fechaAct,
        lts: ltsTanque,
        fechalts: fechaLts,
      };
    }
    guardarEstado(estado);
  };

  return (
    <>
      {perforador && perforador.acceso === 'GASOIL' ? (
        <Tanques />
      ) : (
        <>
          <div className="bg-white shadow rounded-lg ml-4 mr-4 mt-2 mb-0 p-2 text-slate-600">
            <Actualizacion />
          </div>

          <div className="flex flex-col md:flex-row items-center ">
            <Bomba
              nombre="BOMBA 1"
              horas={bomba1.horas}
              cuerpo1={bomba1.c1}
              cuerpo2={bomba1.c2}
              cuerpo3={bomba1.c3}
              s1={bomba1.semaforo.s1}
              s2={bomba1.semaforo.s2}
              s3={bomba1.semaforo.s3}
              desc={bomba1.encendido.desc}
              color={bomba1.encendido.color}
              click1={B1C1}
              click2={B1C2}
              click3={B1C3}
              tipo={perforador ? perforador.tipoBomba : 'FD1600'}
              perforador={perforador ? perforador.idPerforador : ''}
              vf={vf.vfb1}
            />

            <Bomba
              nombre="BOMBA 2"
              horas={bomba2.horas}
              cuerpo1={bomba2.c1}
              cuerpo2={bomba2.c2}
              cuerpo3={bomba2.c3}
              s1={bomba2.semaforo.s1}
              s2={bomba2.semaforo.s2}
              s3={bomba2.semaforo.s3}
              desc={bomba2.encendido.desc}
              color={bomba2.encendido.color}
              click1={B2C1}
              click2={B2C2}
              click3={B2C3}
              tipo={perforador ? perforador.tipoBomba : 'FD1600'}
              perforador={perforador ? perforador.idPerforador : ''}
              vf={vf.vfb2}
            />

            {perforador && perforador.cantBombas > 2 ? (
              <Bomba
                nombre="BOMBA 3"
                horas={bomba3.horas}
                cuerpo1={bomba3.c1}
                cuerpo2={bomba3.c2}
                cuerpo3={bomba3.c3}
                s1={bomba3.semaforo.s1}
                s2={bomba3.semaforo.s2}
                s3={bomba3.semaforo.s3}
                desc={bomba3.encendido.desc}
                color={bomba3.encendido.color}
                click1={B3C1}
                click2={B3C2}
                click3={B3C3}
                tipo={perforador ? perforador.tipoBomba : 'FD1600'}
                perforador={perforador ? perforador.idPerforador : ''}
                vf={vf.vfb3}
              />
            ) : (
              <></>
            )}
            {perforador && perforador.unidadNegocio == 'ARCNQ' ? (
              <Tanque
                nombre="TANQUE GASOIL"
                litros={tanque.lts}
                nivel={tanque.nivel}
                color={tanque.color}
                factu={tanque.fecha}
              />
            ) : (
              <></>
            )}
          </div>
          <>
            {showModal && (
              <div className=" fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="max-h-full bg-white rounded-lg p-4 w-2/6">
                  <h1>
                    <span className="font-semibold mb-2">CONEXIONES</span>
                  </h1>

                  <div className="flex flex-row md:flex-row  w-fix">
                    <div className="w-3/6 mt-1">
                      <span className="font-semibold mr-3">
                        INVERSOR 3 Y 4:
                      </span>

                      <select
                        onChange={handleChangeVf1}
                        className="p-1 border rounded-l bg-slate-100 mr-3 "
                      >
                        <option key="1" value="1" selected={vfBdD.vf1 == 1}>
                          BOMBA 1
                        </option>
                        <option key="2" value="2" selected={vfBdD.vf1 == 2}>
                          BOMBA 2
                        </option>
                        <option key="3" value="3" selected={vfBdD.vf1 == 3}>
                          BOMBA 3
                        </option>
                      </select>
                    </div>
                    <div className="w-3/6">
                      <span className="font-semibold mr-3">
                        INVERSOR 6 Y 7:
                      </span>

                      <select
                        onChange={handleChangeVf2}
                        className="p-1 border rounded-l bg-slate-100 mr-3 "
                      >
                        <option key="1" value="1" selected={vfBdD.vf2 == 1}>
                          BOMBA 1
                        </option>
                        <option key="2" value="2" selected={vfBdD.vf2 == 2}>
                          BOMBA 2
                        </option>
                        <option key="3" value="3" selected={vfBdD.vf2 == 3}>
                          BOMBA 3
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 mb-1 ">
                    <button
                      className=" rounded-md bg-red-400 hover:bg-red-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                      onClick={closeModal}
                    >
                      CANCELAR
                    </button>
                    {vf2Sel == vf1Sel ? (
                      <span className="font-semibold mt-2  text-rose-600 border rounded border-rose-600 bg-rose-100 w-full">
                        {' '}
                        No pueden conectar los Inversores a la misma bomba
                      </span>
                    ) : (
                      <button
                        className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                        onClick={aceptarVF}
                      >
                        ACEPTAR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>

          {perforador &&
          perforador.idPerforador == '163' &&
          perforador.acceso === 'Operacion' ? (
            <>
              {bomba1.horas <= 1 && bomba2.horas <= 1 && bomba3.horas <= 1 ? (
                <button
                  className="ml-4 rounded-md bg-blue-400 hover:bg-blue-500 p-2 drop-shadow-xl font-semibold text-sx text-stone-100 "
                  onClick={openModal}
                >
                  CAMBIAR CONEXIONES
                </button>
              ) : (
                <span className="font-semibold mt-2 ml-5 text-rose-600 border rounded border-rose-600 bg-rose-100 p-2 ">
                  Para cambiar los inversores las horas de bomba deben estar en
                  cero
                </span>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Index;
