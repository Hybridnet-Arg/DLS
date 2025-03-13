'use client';
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import Bomba from '@/components/bomba';
import Actualizacion from '@/components/actualizacion';
import BaseContext from '@/context/base/baseContext';
import AuthContext from '@/context/auth/authContext';

const Index = () => {
  const router = useRouter();

  const baseContext = useContext(BaseContext);
  const { piezas, estado } = baseContext;

  const authContext = useContext(AuthContext);
  const { perforador } = authContext;

  const [bomba1, setBomba1] = useState({
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
  });
  const [bomba2, setBomba2] = useState({
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
  });
  const [bomba3, setBomba3] = useState({
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
  });

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

  useEffect(() => {
    if (piezas.length === 0) {
      //Pone en gris los cuerpos y los semaforos
      setBomba1({
        ...bomba1,
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
      });
      setBomba2({
        ...bomba2,
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
      });
      setBomba3({
        ...bomba2,
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
      });
    } else {
      const piezasBomba1 = piezas.filter((pieza) => pieza.bomba == 1);

      const piezasBomba2 = piezas.filter((pieza) => pieza.bomba == 2);

      const piezasBomba3 = piezas.filter((pieza) => pieza.bomba == 3);

      colorearBomba(piezasBomba1, 1);
      colorearBomba(piezasBomba2, 2);
      colorearBomba(piezasBomba3, 3);
    }
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
    }
  }, [estado]);

  //funcion que rutea el esquematico bomba 1
  const B1C1 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 1, cuerpo: 1 },
    });
  };
  const B1C2 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 1, cuerpo: 2 },
    });
  };
  const B1C3 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 1, cuerpo: 3 },
    });
  };

  //funcion que rutea el esquematico bomba 3
  const B2C1 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 2, cuerpo: 1 },
    });
  };
  const B2C2 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 2, cuerpo: 2 },
    });
  };
  const B2C3 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 2, cuerpo: 3 },
    });
  };

  //funcion que rutea el esquematico bomba 3
  const B3C1 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 3, cuerpo: 1 },
    });
  };
  const B3C2 = () => {
    router.push({
      pathname: '/piezas',
      query: { bomba: 3, cuerpo: 2 },
    });
  };
  const B3C3 = () => {
    console.log('hace click');

    router.push({
      pathname: '/piezas',
      query: { bomba: 3, cuerpo: 3 },
    });
  };

  return (
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
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Index;
