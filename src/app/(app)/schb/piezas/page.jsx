'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import Esquematico from '@/components/esquematico';
import EsquematicoFD1600S from '@/components/esquematicoFD1600S';
import EsquematicoPz from '@/components/esquematicoPZ';
import EsquematicoPz2 from '@/components/esquematicoPZ2';
import EsquematicoBomco from '@/components/esquematicoBomco';
import EsquematicoLewco from '@/components/esquematicoLewco';
import BaseContext from '@/context/base/baseContext';
import SemaforoPiezas from '@/components/semaforoPiezas';
import Actualizacion from '@/components/actualizacion';
import AuthContext from '@/context/auth/authContext';
import Procesando from '@/components/icons/procesando';

const Piezas = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { perforador, usuario } = useContext(AuthContext);
  const { piezas, estado, guardarPiezas, guardarEstado } =
    useContext(BaseContext);

  const bomba = searchParams.get('bomba');
  const cuerpo = searchParams.get('cuerpo');

  const [pieza1, setPieza1] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza3, setPieza3] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza5, setPieza5] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza13S, setPieza13S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza13D, setPieza13D] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza15S, setPieza15S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza15D, setPieza15D] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza16S, setPieza16S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza16D, setPieza16D] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza4D, setPieza4D] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza4M, setPieza4M] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza33, setPieza33] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  //BOMBAS FD1600S
  const [pieza13, setPieza13] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [Pieza33s, setPieza33s] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [Pieza33d, setPieza33d] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [Pieza34s, setPieza34s] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [Pieza34d, setPieza34d] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [Pieza35s, setPieza35s] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [Pieza35d, setPieza35d] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  //BOMBAS PZ, BOMBCO Y LEWCO
  const [pieza1S, setPieza1S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza1I, setPieza1I] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza4S, setPieza4S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza4I, setPieza4I] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza5S, setPieza5S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza5I, setPieza5I] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });
  const [pieza6S, setPieza6S] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza6I, setPieza6I] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza8, setPieza8] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza10, setPieza10] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza11, setPieza11] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [pieza12, setPieza12] = useState({
    hs: 0,
    color: '#C1C1C1',
    semaforo: {
      s1: '#C1C1C1',
      s2: '#C1C1C1',
      s3: '#C1C1C1',
    },
  });

  const [piezasCuerpo, setPiezasCuerpo] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [piezaCambio, setPiezaCambio] = useState(null);

  const [piezaNueva, setPiezaNueva] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const colorearPiezas = async () => {
    await delay(800); // Espera 1 segundos
    if (piezas.length > 0) {
      resetPiezas();
      if (!showModal) setPiezaCambio(null);
      const pc = piezas.filter(
        (pieza) => pieza.bomba == bomba && pieza.cuerpo == cuerpo
      );
      const piezasC = pc.sort((a, b) => a.pieza.nroPieza - b.pieza.nroPieza);

      setPiezasCuerpo(piezasC);

      let col;
      let horas;
      let piezaB;
      let sem;

      for (let i = 0; i < piezasC.length; i++) {
        piezaB = piezasC[i];
        horas = piezaB.hs;
        //setea colores
        col = 'green';
        sem = {
          s1: 'green',
          s2: '#C1C1C1',
          s3: '#C1C1C1',
        };

        if (piezaB.hs > piezaB.pieza.hsMin && piezaB.hs <= piezaB.pieza.hsMax) {
          col = 'yellow';
          sem = {
            s1: '#C1C1C1',
            s2: 'yellow',
            s3: '#C1C1C1',
          };
        }
        if (piezaB.hs > piezaB.pieza.hsMax) {
          col = 'red';
          sem = {
            s1: '#C1C1C1',
            s2: '#C1C1C1',
            s3: 'red',
          };
        }

        //BOMBAS FD1600
        if (perforador && perforador.tipoBomba === 'FD1600') {
          if (piezaB.idPieza === 1)
            setPieza1({ hs: horas, color: col, semaforo: sem });

          if (piezaB.idPieza === 34)
            setPieza3({ hs: horas, color: col, semaforo: sem });

          if (piezaB.idPieza === 5)
            setPieza5({ hs: horas, color: col, semaforo: sem });

          if (piezaB.idPieza === 13) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza13D({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza13S({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.idPieza === 15) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza15D({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza15S({ hs: horas, color: col, semaforo: sem });
            }
          }
          if (piezaB.idPieza === 16) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza16D({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza16S({ hs: horas, color: col, semaforo: sem });
            }
          }
          //EMPAQUETADURAS
          if (piezaB.pieza.nroPieza === 4) {
            if (piezaB.modulo === 'DE MODULO') {
              setPieza4M({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza4D({ hs: horas, color: col, semaforo: sem });
            }
          }
          //ORRIN
          if (piezaB.pieza.nroPieza === 33)
            setPieza33({ hs: horas, color: col, semaforo: sem });

          //161 y 163
        } else if (perforador && perforador.tipoBomba === 'FD1600S') {
          if (piezaB.pieza.nroPieza === 12)
            setPieza12({ hs: horas, color: col, semaforo: sem });

          if (piezaB.pieza.nroPieza === 13)
            setPieza13({ hs: horas, color: col, semaforo: sem });

          if (piezaB.pieza.nroPieza === 33) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza33d({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza33s({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 34) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza34d({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza34s({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 35) {
            if (piezaB.modulo === 'DESCARGA') {
              setPieza35d({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza35s({ hs: horas, color: col, semaforo: sem });
            }
          }
        } else {
          //BOMBAS PZ, BOMCO, LEWCO

          if (piezaB.pieza.nroPieza === 1) {
            if (piezaB.modulo === 'INFERIOR') {
              setPieza1I({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza1S({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 4) {
            if (piezaB.modulo === 'INFERIOR') {
              setPieza4I({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza4S({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 5) {
            if (piezaB.modulo === 'INFERIOR') {
              setPieza5I({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza5S({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 6) {
            if (piezaB.modulo === 'INFERIOR') {
              setPieza6I({ hs: horas, color: col, semaforo: sem });
            } else {
              setPieza6S({ hs: horas, color: col, semaforo: sem });
            }
          }

          if (piezaB.pieza.nroPieza === 8)
            setPieza8({ hs: horas, color: col, semaforo: sem });

          if (piezaB.pieza.nroPieza === 10)
            setPieza10({ hs: horas, color: col, semaforo: sem });

          if (piezaB.pieza.nroPieza === 11)
            setPieza11({ hs: horas, color: col, semaforo: sem });

          if (piezaB.pieza.nroPieza === 12)
            setPieza12({ hs: horas, color: col, semaforo: sem });
        }
      }
    } else {
      if (!showModal) {
        setPiezaCambio(null);
        setPiezasCuerpo([]);
      }
      resetPiezas();
    }
  };

  useEffect(() => {
    colorearPiezas();
  }, [piezas]);

  useEffect(() => {
    //colorearPiezas();
    /* const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
      await buscarEstado();
    };
    updateData(); */
  }, []);

  useEffect(() => {
    if (perforador && perforador.idPerforador == '163') {
      buscarVf();
    }
    const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
      await buscarEstado();
    };
    resetPiezas();
    updateData();
  }, [perforador]);

  const resetPiezas = () => {
    const reset = {
      hs: 0,
      color: '#C1C1C1',
      semaforo: {
        s1: '#C1C1C1',
        s2: '#C1C1C1',
        s3: '#C1C1C1',
      },
    };
    setPieza1(reset);
    setPieza3(reset);
    setPieza5(reset);
    setPieza13D(reset);
    setPieza13S(reset);
    setPieza15D(reset);
    setPieza15S(reset);
    setPieza16D(reset);
    setPieza16S(reset);
    setPieza4D(reset);
    setPieza4M(reset);
    setPieza33(reset);

    setPieza1I(reset);
    setPieza1S(reset);
    setPieza4I(reset);
    setPieza4S(reset);
    setPieza5I(reset);
    setPieza5S(reset);
    setPieza6I(reset);
    setPieza6S(reset);
    setPieza8(reset);
    setPieza10(reset);
    setPieza11(reset);
    setPieza12(reset);

    setPieza13(reset);
    setPieza33s(reset);
    setPieza33d(reset);
    setPieza34s(reset);
    setPieza34d(reset);
    setPieza35s(reset);
    setPieza35d(reset);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig.key) return piezasCuerpo;

    return [...piezasCuerpo].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleRowClick = (pieza) => {
    setPiezaCambio(pieza);
  };

  const handleRowClickNueva = (pieza) => {
    setPiezaNueva(pieza);
  };

  const volver = () => router.push('/schb');

  const reemplazarPieza = () => {
    buscarPiezasStock();
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  const [motivo, setMotivo] = useState();

  const [procesando, setProcesando] = useState(false);

  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const cancelarCambio = async () => {
    setMotivo();
    setPiezaNueva(null);
    setShowModal(false);
  };

  const buscarPiezas = async () => {
    const filtro = {
      perf: perforador.idPerforador,
      baja: 0,
      uso: 1,
    };

    const { data } = await axios.post('/api/base/piezasPerforador', filtro);
    guardarPiezas(data);
  };

  const aceptarCambio = async () => {
    setProcesando(true);

    let horas;
    let hayError = false;

    if (bomba === '1') horas = estado.hsBomba1;
    if (bomba === '2') horas = estado.hsBomba2;
    if (bomba === '3') horas = estado.hsBomba3;

    //Alta nueva pieza
    const dataAlta = {
      idPerforadorPieza: piezaNueva.idPerforadorPieza,
      uso: 1,
      baja: 0,
      hsInst: horas,
      motivo: null,
      bomba: piezaCambio.bomba,
      cuerpo: piezaCambio.cuerpo,
      modulo: piezaCambio.modulo,
    };

    const respAlta = await axios.post(
      '/api/base/updatePiezasPerforador',
      dataAlta
    );
    if (!respAlta.data.exito) hayError = true;

    //Log Alta
    const altaLog = {
      idPerforadorPieza: piezaNueva.idPerforadorPieza,
      hs: piezaNueva.hs,
      movimiento: 'INSTALACION',
      motivo: '',
      bomba: piezaCambio.bomba,
      cuerpo: piezaCambio.cuerpo,
      modulo: piezaCambio.modulo,
      usuario: usuario,
      perforador: perforador.idPerforador,
    };

    const respLogAlta = await axios.post('/api/base/insertLog', altaLog);
    if (!respLogAlta.data.exito) hayError = true;

    //PIEZA BAJA
    let baja = 1;

    //poner serie
    // if (piezaCambio.idPieza === 5) baja = 0;
    if (piezaCambio.pieza.serie && motivo !== 'Rotura') baja = 0;

    const dataBaja = {
      idPerforadorPieza: piezaCambio.idPerforadorPieza,
      uso: 0,
      baja: baja,
      hsInst: piezaCambio.hsInst,
      motivo: motivo,
      bomba: piezaCambio.bomba,
      cuerpo: piezaCambio.cuerpo,
      modulo: piezaCambio.modulo,
    };

    const respBaja = await axios.post(
      '/api/base/updatePiezasPerforador',
      dataBaja
    );
    if (!respBaja.data.exito) hayError = true;

    //Log Baja
    const bajaLog = {
      idPerforadorPieza: piezaCambio.idPerforadorPieza,
      hs: piezaCambio.hs,
      movimiento: 'DESINSTALACION',
      motivo: motivo,
      bomba: piezaCambio.bomba,
      cuerpo: piezaCambio.cuerpo,
      modulo: piezaCambio.modulo,
      usuario: usuario,
      perforador: perforador.idPerforador,
    };

    const respLogBaja = await axios.post('/api/base/insertLog', bajaLog);
    if (!respLogBaja.data.exito) hayError = true;

    //genera PNQ
    const respDisp = await axios.post('/api/base/stockPieza', piezaNueva);
    if (respDisp.data[0].disp < respDisp.data[0].stock) {
      const items = await axios.post('/api/base/item', piezaNueva);
      //existen items para el pnq
      if (items.data.length > 0) {
        var inv1 = items.data[0].inv_item;
        var inv2 = null;
        var inv3 = null;
        var inv4 = null;
        if (items.data.length > 1) inv2 = items.data[1].inv_item;
        if (items.data.length > 2) inv3 = items.data[2].inv_item;
        if (items.data.length > 3) inv4 = items.data[3].inv_item;

        const pnq = {
          unidadNegocio: perforador.unidadNegocio,
          distributionType: perforador.distributionType,
          inv_item1: inv1,
          inv_item2: inv2,
          inv_item3: inv3,
          inv_item4: inv4,
          cantidad: respDisp.data[0].reposicion,
        };
        const respPnqAlta = await axios.post('/api/base/insertPnq', pnq);
        if (!respPnqAlta.data.exito) hayError = true;
      }
    }

    if (hayError) setError(true);
    else setExito(true);

    await delay(1500);
    setMotivo();
    setPiezaNueva(null);
    setPiezasStock([]);
    buscarPiezas();
    setExito(false);
    setError(false);
    setProcesando(false);
    setShowModal(false);
  };

  const [piezasStock, setPiezasStock] = useState([]);

  const buscarPiezasStock = async () => {
    const filtro = {
      perf: perforador.idPerforador,
      baja: 0,
      uso: 0,
    };

    const { data } = await axios.post('/api/base/piezasPerforador', filtro);
    if (data.length > 0) {
      if (piezaCambio) {
        const piezasStock = data.filter(
          (p) => p.pieza.nroPieza == piezaCambio.pieza.nroPieza
        );
        setPiezasStock(piezasStock);
      } else {
        setPiezasStock([]);
      }
    } else {
      setPiezasStock([]);
    }
  };

  const handleChangeMotivo = (e) => {
    setMotivo(e.target.value);
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
      <>
        {showModal && (
          <div className=" fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            {piezaCambio ? (
              <div className="max-h-full bg-white rounded-lg p-4 w-4/5">
                <div>
                  <h1>
                    <span className="font-semibold "> REEMPLAZO DE PIEZA</span>
                  </h1>
                  <h1>
                    <span className="font-semibold mt-2 mb-2">Nro:</span>
                    {piezaCambio.idPieza}{' '}
                    <span className="font-semibold "> - Tipo:</span>{' '}
                    {piezaCambio.pieza.tipo}
                    <span className="font-semibold "> - Diametro:</span>{' '}
                    {piezaCambio.diametro ? piezaCambio.diametro.diametro : ''}{' '}
                    <span className="font-semibold "> - Serie:</span>{' '}
                    {piezaCambio.serie}
                    <span className="font-semibold "> - Modulo:</span>{' '}
                    {piezaCambio.modulo}
                  </h1>
                </div>
                {!procesando ? (
                  <>
                    <div className=" mt-2">
                      <h2>
                        <span className="font-semibold mt-2"> Motivo:</span>
                      </h2>
                      <select
                        onChange={handleChangeMotivo}
                        className="p-1 border rounded-l bg-slate-100 mr-3 "
                      >
                        <option value=""></option>
                        <option key="1" value="Rotura">
                          Rotura
                        </option>
                        <option key="2" value="Cambio de Diametro">
                          Cambio de Diametro
                        </option>
                        <option key="3" value="Mantenimiento Preventivo">
                          Mantenimiento Preventivo
                        </option>
                        <option key="4" value="Mantenimiento Predictivo">
                          Mantenimiento Predictivo
                        </option>
                      </select>

                      {motivo ? (
                        <></>
                      ) : (
                        <span className="font-semibold mt-2 p-1 text-rose-600 border rounded border-rose-600 bg-rose-100">
                          {' '}
                          Seleccione Motivo
                        </span>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto mt-2">
                      <h2>
                        <span className="font-semibold mt-4">
                          {' '}
                          Piezas Disponibles:
                        </span>
                      </h2>

                      <table className=" w-full snap-y ">
                        <thead>
                          <tr className="top-0  bg-gray-100 sticky">
                            <th className="ml-1 py-1 ">Nro.</th>
                            <th className="ml-1 py-1">Tipo</th>
                            <th className="ml-1 py-1 ">Diam.</th>
                            <th className="ml-1 py-1 ">Marca</th>
                            <th className="ml-1 py-1">Hs</th>
                            <th className="ml-1 py-1 ">N°Serie</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {piezasStock.map((item) => (
                            <tr
                              key={item.idPerforadorPieza}
                              onClick={() => handleRowClickNueva(item)}
                              className={
                                piezaNueva
                                  ? piezaNueva.idPerforadorPieza ===
                                    item.idPerforadorPieza
                                    ? 'bg-blue-200'
                                    : ''
                                  : ''
                              }
                            >
                              <td className="border px-2 py-1">
                                {item.idPieza}
                              </td>
                              <td className="border px-2 py-1">
                                {item.pieza.tipo}
                              </td>
                              <td className="border px-2 py-1">
                                {item.diametro ? item.diametro.diametro : ''}
                              </td>
                              <td className="border px-2 py-1">
                                {item.marca ? item.marca.marca : ''}
                              </td>
                              <td className="border px-2 py-1">{item.hs}</td>
                              <td className="border px-2 py-1">{item.serie}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      {piezaNueva ? (
                        <div className="mt-0 p-1">
                          <br></br>
                        </div>
                      ) : (
                        <div className="text-center font-semibold mt-0 p-1 text-rose-600 border rounded border-rose-600 bg-rose-100">
                          <span> Seleccione Motivo y Pieza</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-1 mb-1 ">
                      <button
                        className=" rounded-md bg-red-400 hover:bg-red-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/6"
                        onClick={cancelarCambio}
                      >
                        CANCELAR
                      </button>
                      {piezaNueva && motivo ? (
                        <button
                          className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-3/6"
                          onClick={aceptarCambio}
                        >
                          ACEPTAR
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Procesando />
                    {exito ? (
                      <div className="text-center font-semibold mt-0 p-1 text-green-600 border rounded border-green-600 bg-green-100">
                        <span> Piezas actualizadas con exito</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    {error ? (
                      <div className="text-center font-semibold mt-0 p-1 text-rose-600 border rounded border-rose-600 bg-rose-100">
                        <span> Error al actualizar las piezas</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4">Atencion!</h2>
                <p className="text-gray-800">Debe Seleccionar una pieza!</p>
                <button
                  onClick={closeModal}
                  className="rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        )}
      </>
      <div className=" content-start w-full">
        {/**Datos y semaforo */}
        <div className=" justify-start w-full h-full">
          {/*SEMAFOROS*/}
          <div className=" bg-white shadow rounded-lg ml-1 p-1 text-slate-600 w-full">
            {perforador && perforador.tipoBomba === 'FD1600' ? (
              <>
                <div className="flex flex-col md:flex-row  w-full ">
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <div className="flex flex-col md:flex-col w-fix pr-6">
                      <h1>
                        <span className="font-semibold ...">
                          {perforador ? perforador.nombre : <></>}
                        </span>{' '}
                        Bomba: {bomba}- Cuerpo: {cuerpo}{' '}
                      </h1>
                      <Actualizacion />
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.1"
                      s1={pieza1.semaforo.s1}
                      s2={pieza1.semaforo.s2}
                      s3={pieza1.semaforo.s3}
                      hs={pieza1.hs}
                      escala={{
                        m1: 800,
                        m2: 1200,
                        max: 1600,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.3"
                      s1={pieza3.semaforo.s1}
                      s2={pieza3.semaforo.s2}
                      s3={pieza3.semaforo.s3}
                      hs={pieza3.hs}
                      escala={{
                        m1: 800,
                        m2: 1200,
                        max: 1600,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.5"
                      s1={pieza5.semaforo.s1}
                      s2={pieza5.semaforo.s2}
                      s3={pieza5.semaforo.s3}
                      hs={pieza5.hs}
                      escala={{
                        m1: 250,
                        m2: 400,
                        max: 550,
                      }}
                    />
                  </div>
                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.4 Plato"
                      s1={pieza4D.semaforo.s1}
                      s2={pieza4D.semaforo.s2}
                      s3={pieza4D.semaforo.s3}
                      hs={pieza4D.hs}
                      escala={{
                        m1: 4000,
                        m2: 5000,
                        max: 6000,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.4 Modulo"
                      s1={pieza4M.semaforo.s1}
                      s2={pieza4M.semaforo.s2}
                      s3={pieza4M.semaforo.s3}
                      hs={pieza4M.hs}
                      escala={{
                        m1: 4000,
                        m2: 5000,
                        max: 6000,
                      }}
                    />
                  </div>
                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.13 Descarga"
                      s1={pieza13D.semaforo.s1}
                      s2={pieza13D.semaforo.s2}
                      s3={pieza13D.semaforo.s3}
                      hs={pieza13D.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.13 Succion"
                      s1={pieza13S.semaforo.s1}
                      s2={pieza13S.semaforo.s2}
                      s3={pieza13S.semaforo.s3}
                      hs={pieza13S.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row  w-full ">
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.15 Descarga"
                      s1={pieza15D.semaforo.s1}
                      s2={pieza15D.semaforo.s2}
                      s3={pieza15D.semaforo.s3}
                      hs={pieza15D.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.15 Succion"
                      s1={pieza15S.semaforo.s1}
                      s2={pieza15S.semaforo.s2}
                      s3={pieza15S.semaforo.s3}
                      hs={pieza15S.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>
                  <div className="flex flex-row md:flex-row">
                    <SemaforoPiezas
                      descripcion="Nro.16 Descarga"
                      s1={pieza16D.semaforo.s1}
                      s2={pieza16D.semaforo.s2}
                      s3={pieza16D.semaforo.s3}
                      hs={pieza16D.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.16 Succion"
                      s1={pieza16S.semaforo.s1}
                      s2={pieza16S.semaforo.s2}
                      s3={pieza16S.semaforo.s3}
                      hs={pieza16S.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.33"
                      s1={pieza33.semaforo.s1}
                      s2={pieza33.semaforo.s2}
                      s3={pieza33.semaforo.s3}
                      hs={pieza33.hs}
                      escala={{
                        m1: 2000,
                        m2: 3000,
                        max: 4000,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : perforador && perforador.tipoBomba === 'FD1600S' ? (
              <>
                <div className="flex flex-col md:flex-row  w-full ">
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <div className="flex flex-col md:flex-col w-fix pr-6">
                      <h1>
                        <span className="font-semibold ...">
                          {perforador ? perforador.nombre : <></>}
                        </span>{' '}
                        Bomba: {bomba}- Cuerpo: {cuerpo}{' '}
                      </h1>
                      <Actualizacion />
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.12"
                      s1={pieza12.semaforo.s1}
                      s2={pieza12.semaforo.s2}
                      s3={pieza12.semaforo.s3}
                      hs={pieza12.hs}
                      escala={{
                        m1: 800,
                        m2: 1200,
                        max: 1600,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.13"
                      s1={pieza13.semaforo.s1}
                      s2={pieza13.semaforo.s2}
                      s3={pieza13.semaforo.s3}
                      hs={pieza13.hs}
                      escala={{
                        m1: 250,
                        m2: 400,
                        max: 550,
                      }}
                    />
                  </div>

                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.33 Descarga"
                      s1={Pieza33d.semaforo.s1}
                      s2={Pieza33d.semaforo.s2}
                      s3={Pieza33d.semaforo.s3}
                      hs={Pieza33d.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.33 Succion"
                      s1={Pieza33s.semaforo.s1}
                      s2={Pieza33s.semaforo.s2}
                      s3={Pieza33s.semaforo.s3}
                      hs={Pieza33s.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>

                  <div className="flex flex-row md:flex-row">
                    <SemaforoPiezas
                      descripcion="Nro.34 Descarga"
                      s1={Pieza34d.semaforo.s1}
                      s2={Pieza34d.semaforo.s2}
                      s3={Pieza34d.semaforo.s3}
                      hs={Pieza34d.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.34 Succion"
                      s1={Pieza34s.semaforo.s1}
                      s2={Pieza34s.semaforo.s2}
                      s3={Pieza34s.semaforo.s3}
                      hs={Pieza34s.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row  w-full ">
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.35 Descarga"
                      s1={Pieza35d.semaforo.s1}
                      s2={Pieza35d.semaforo.s2}
                      s3={Pieza35d.semaforo.s3}
                      hs={Pieza35d.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.35 Succion"
                      s1={Pieza35s.semaforo.s1}
                      s2={Pieza35s.semaforo.s2}
                      s3={Pieza35s.semaforo.s3}
                      hs={Pieza35s.hs}
                      escala={{
                        m1: 500,
                        m2: 1200,
                        max: 1500,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col md:flex-row  w-full ">
                  <div className="flex flex-row md:flex-row  w-fix ">
                    <div className="flex flex-col md:flex-col w-fix pr-6">
                      <h1>
                        <span className="font-semibold ...">
                          {perforador ? perforador.nombre : <></>}
                        </span>{' '}
                        Bomba: {bomba}- Cuerpo: {cuerpo}{' '}
                      </h1>
                      <Actualizacion />
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.1 Superior"
                      s1={pieza1S.semaforo.s1}
                      s2={pieza1S.semaforo.s2}
                      s3={pieza1S.semaforo.s3}
                      hs={pieza1S.hs}
                      escala={{
                        m1: 200,
                        m2: 400,
                        max: 600,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.1 Inferior"
                      s1={pieza1I.semaforo.s1}
                      s2={pieza1I.semaforo.s2}
                      s3={pieza1I.semaforo.s3}
                      hs={pieza1I.hs}
                      escala={{
                        m1: 200,
                        m2: 400,
                        max: 600,
                      }}
                    />
                  </div>
                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.4 Superior"
                      s1={pieza4S.semaforo.s1}
                      s2={pieza4S.semaforo.s2}
                      s3={pieza4S.semaforo.s3}
                      hs={pieza4S.hs}
                      escala={{
                        m1: 100,
                        m2: 200,
                        max: 300,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.4 Inferior"
                      s1={pieza4I.semaforo.s1}
                      s2={pieza4I.semaforo.s2}
                      s3={pieza4I.semaforo.s3}
                      hs={pieza4I.hs}
                      escala={{
                        m1: 100,
                        m2: 200,
                        max: 300,
                      }}
                    />
                  </div>

                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.5 Superior"
                      s1={pieza5S.semaforo.s1}
                      s2={pieza5S.semaforo.s2}
                      s3={pieza5S.semaforo.s3}
                      hs={pieza5S.hs}
                      escala={{
                        m1: 100,
                        m2: 200,
                        max: 300,
                      }}
                    />
                    <SemaforoPiezas
                      descripcion="Nro.5 Inferior"
                      s1={pieza5I.semaforo.s1}
                      s2={pieza5I.semaforo.s2}
                      s3={pieza5I.semaforo.s3}
                      hs={pieza5I.hs}
                      escala={{
                        m1: 100,
                        m2: 200,
                        max: 300,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row ">
                  <div className="flex flex-row md:flex-row ">
                    <SemaforoPiezas
                      descripcion="Nro.6 Superior"
                      s1={pieza6S.semaforo.s1}
                      s2={pieza6S.semaforo.s2}
                      s3={pieza6S.semaforo.s3}
                      hs={pieza6S.hs}
                      escala={{
                        m1: 200,
                        m2: 400,
                        max: 600,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.6 Inferior"
                      s1={pieza6I.semaforo.s1}
                      s2={pieza6I.semaforo.s2}
                      s3={pieza6I.semaforo.s3}
                      hs={pieza6I.hs}
                      escala={{
                        m1: 200,
                        m2: 400,
                        max: 600,
                      }}
                    />
                  </div>

                  <div className="flex flex-row md:flex-row  w-fix ">
                    <SemaforoPiezas
                      descripcion="Nro.8"
                      s1={pieza8.semaforo.s1}
                      s2={pieza8.semaforo.s2}
                      s3={pieza8.semaforo.s3}
                      hs={pieza8.hs}
                      escala={{
                        m1: 200,
                        m2: 400,
                        max: 600,
                      }}
                    />

                    <SemaforoPiezas
                      descripcion="Nro.10"
                      s1={pieza10.semaforo.s1}
                      s2={pieza10.semaforo.s2}
                      s3={pieza10.semaforo.s3}
                      hs={pieza10.hs}
                      escala={{
                        m1: 70,
                        m2: 140,
                        max: 210,
                      }}
                    />

                    <div className="flex flex-row md:flex-row ">
                      <SemaforoPiezas
                        descripcion="Nro.11"
                        s1={pieza11.semaforo.s1}
                        s2={pieza11.semaforo.s2}
                        s3={pieza11.semaforo.s3}
                        hs={pieza11.hs}
                        escala={{
                          m1: 35,
                          m2: 70,
                          max: 105,
                        }}
                      />

                      <SemaforoPiezas
                        descripcion="Nro.12"
                        s1={pieza12.semaforo.s1}
                        s2={pieza12.semaforo.s2}
                        s3={pieza12.semaforo.s3}
                        hs={pieza12.hs}
                        escala={{
                          m1: 100,
                          m2: 200,
                          max: 300,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/*FIN SEMAFOROS*/}
        </div>
        {/**Fin Datos y semaforos */}

        {/**Tabla y Esquematico */}
        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-white shadow rounded-lg ml-1 mt-1 p-1 text-slate-600 text-sm w-full">
            {sortedData().length > 0 ? (
              <>
                <table className="w-full snap-y">
                  <thead>
                    <tr>
                      <th
                        className="ml-1 py-1 cursor-pointer"
                        onClick={() => requestSort('pieza.nroPieza')}
                      >
                        Nro.
                      </th>
                      <th className="ml-1 py-1">Tipo</th>
                      <th className="ml-1 py-1 ">Marca</th>
                      <th className="ml-1 py-1 ">Diam.</th>
                      <th
                        className="ml-1 py-1 cursor-pointer"
                        onClick={() => requestSort('hs')}
                      >
                        Hs
                      </th>
                      <th className="ml-1 py-1 ">Modulo</th>
                      <th className="ml-1 py-1 ">N°Serie</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {sortedData().map((item) => (
                      <tr
                        key={item.idPerforadorPieza}
                        onClick={() => handleRowClick(item)}
                        className={
                          piezaCambio
                            ? piezaCambio.idPerforadorPieza ===
                              item.idPerforadorPieza
                              ? 'bg-blue-200'
                              : ''
                            : ''
                        }
                      >
                        <td className="border px-2 py-1">
                          {item.pieza.nroPieza}
                        </td>
                        <td className="border px-2 py-1">{item.pieza.tipo}</td>
                        <td className="border px-2 py-1">
                          {item.marca ? item.marca.marca : ''}
                        </td>
                        <td className="border px-2 py-1">
                          {item.diametro ? item.diametro.diametro : ''}
                        </td>
                        <td className="border px-2 py-1">{item.hs}</td>
                        <td className="border px-2 py-1">{item.modulo}</td>
                        <td className="border px-2 py-1">{item.serie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between mt-1 mb-1 ">
                  <button
                    className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-1  mb-1 drop-shadow-xl font-semibold text-sx text-stone-100 w-1/4"
                    onClick={volver}
                  >
                    VOLVER
                  </button>

                  {perforador ? (
                    perforador.acceso === 'Operacion' ? (
                      <button
                        className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                        onClick={reemplazarPieza}
                      >
                        REEMPLAZAR PIEZA
                      </button>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <Procesando />
            )}
          </div>

          <div className="bg-white shadow rounded-lg m-1 p-1 text-slate-600">
            {perforador && perforador.tipoBomba === 'FD1600' ? (
              <Esquematico
                p1={pieza1.color}
                p3={pieza3.color}
                p5={pieza5.color}
                p13S={pieza13S.color}
                p13D={pieza13D.color}
                p15S={pieza15S.color}
                p15D={pieza15D.color}
                p16S={pieza16S.color}
                p16D={pieza16D.color}
                p4D={pieza4D.color}
                p4M={pieza4M.color}
                p33={pieza33.color}
              />
            ) : perforador && perforador.tipoBomba === 'PZ' ? (
              <EsquematicoPz />
            ) : perforador && perforador.tipoBomba === 'BOMCO' ? (
              <EsquematicoBomco />
            ) : perforador && perforador.tipoBomba === 'LEWCO' ? (
              <EsquematicoLewco />
            ) : perforador && perforador.tipoBomba === 'PZ2' ? (
              <EsquematicoPz2 />
            ) : perforador && perforador.tipoBomba === 'FD1600S' ? (
              <EsquematicoFD1600S
                p12={pieza12.color}
                p13={pieza13.color}
                p33s={Pieza33s.color}
                p33d={Pieza33d.color}
                p34s={Pieza34s.color}
                p34d={Pieza34d.color}
                p35s={Pieza35s.color}
                p35d={Pieza35d.color}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Piezas;
