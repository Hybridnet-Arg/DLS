import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tanque from './tanque';
import Procesando from './icons/procesando';

const Tanques = () => {
  const [tanques, setTanques] = useState([]);

  const buscarTanques = async () => {
    const dataTanques = await axios.post('/api/base/tanques');
    if (dataTanques.data.length > 0) {
      dataTanques.data.forEach((tanque) => {
        let nivelCalulado = 5;
        let color = 'red';
        let nombre = 'DLS4';
        if (tanque.perforador == '1')
          nombre = 'PAE00' + (tanque?.perforador ?? '');
        else nombre = 'DLS4' + (tanque?.perforador ?? '');

        if (tanque.lts > 0) {
          //colorea y calcula nivel
          if (tanque.perforador == '161') {
            if (tanque.lts > 5000) color = 'green';
            else if (tanque.lts > 2000) color = 'yellow';
            nivelCalulado = (tanque.lts * 86) / 24000;
          } else {
            if (tanque.lts > 20000) color = 'green';
            else if (tanque.lts > 10000) color = 'yellow';
            nivelCalulado = (tanque.lts * 86) / 77000;
          }
          if (nivelCalulado > 86) nivelCalulado = 86;
        }

        setTanques((tanques) => [
          ...tanques,
          {
            nombre: nombre,
            lts: tanque.lts,
            nivel: nivelCalulado,
            fecha: tanque.fecha,
            color: color,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    buscarTanques();
  }, []);

  return tanques.length === 0 ? (
    <Procesando />
  ) : (
    <div>
      <div className="flex flex-col md:flex-row items-center ">
        <Tanque
          nombre={tanques?.[0]?.nombre}
          litros={tanques?.[0]?.lts}
          nivel={tanques?.[0]?.nivel}
          color={tanques?.[0]?.color}
          factu={tanques?.[0]?.fecha}
        />
        <Tanque
          nombre={tanques?.[1]?.nombre}
          litros={tanques?.[1]?.lts}
          nivel={tanques?.[1]?.nivel}
          color={tanques?.[1]?.color}
          factu={tanques?.[1]?.fecha}
        />
        <Tanque
          nombre={tanques?.[2]?.nombre}
          litros={tanques?.[2]?.lts}
          nivel={tanques?.[2]?.nivel}
          color={tanques?.[2]?.color}
          factu={tanques?.[2]?.fecha}
        />{' '}
        <Tanque
          nombre={tanques?.[3]?.nombre}
          litros={tanques?.[3]?.lts}
          nivel={tanques?.[3]?.nivel}
          color={tanques?.[3]?.color}
          factu={tanques?.[3]?.fecha}
        />
        <Tanque
          nombre={tanques?.[4]?.nombre}
          litros={tanques?.[4]?.lts}
          nivel={tanques?.[4]?.nivel}
          color={tanques?.[4]?.color}
          factu={tanques?.[4]?.fecha}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center ">
        <Tanque
          nombre={tanques?.[5]?.nombre}
          litros={tanques?.[5]?.lts}
          nivel={tanques?.[5]?.nivel}
          color={tanques?.[5]?.color}
          factu={tanques?.[5]?.fecha}
        />
        <Tanque
          nombre={tanques?.[6]?.nombre}
          litros={tanques?.[6]?.lts}
          nivel={tanques?.[6]?.nivel}
          color={tanques?.[6]?.color}
          factu={tanques?.[6]?.fecha}
        />
        <Tanque
          nombre={tanques?.[7]?.nombre}
          litros={tanques?.[7]?.lts}
          nivel={tanques?.[7]?.nivel}
          color={tanques?.[7]?.color}
          factu={tanques?.[7]?.fecha}
        />
        <Tanque
          nombre={tanques?.[8]?.nombre}
          litros={tanques?.[8]?.lts}
          nivel={tanques?.[8]?.nivel}
          color={tanques?.[8]?.color}
          factu={tanques?.[8]?.fecha}
        />
      </div>
    </div>
  );
};
export default Tanques;
