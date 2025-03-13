import React, { useEffect, useContext, useState } from 'react';
import Procesando from './icons/procesando';
import axios from 'axios';

const Config = () => {
  const [diametros, setDiametros] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [diametroSel, setDiametroSel] = useState(null);
  const [marcaSel, setMarcaSel] = useState(null);

  const buscarMaestros = async () => {
    const dataDiametros = await axios.post('/api/base/diametros');
    setDiametros(dataDiametros.data);

    const dataMarcas = await axios.post('/api/base/marcas');
    setMarcas(dataMarcas.data);
  };

  useEffect(() => {
    buscarMaestros();
  }, []);

  const handleRowClickDiametro = (diametro) => {
    setDiametroSel(diametro);
  };

  const handleRowClickMarca = (marca) => {
    setMarcaSel(marca);
  };

  return (
    <div className="flex flex-col md:flex-row content-start  w-full">
      <div className="bg-white shadow rounded-lg ml-1 mt-1 p-1 text-slate-600 text-sm w-full">
        {diametros.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto mt-2 ml-3">
              <table className="w-full snap-y">
                <thead>
                  <tr className="top-0  bg-gray-200 sticky">
                    <th className="ml-1 py-1 cursor-pointer">DIAMETROS</th>
                  </tr>
                </thead>

                <tbody className="text-xs">
                  {diametros.map((item) => (
                    <tr
                      key={item.idDiametro}
                      onClick={() => handleRowClickDiametro(item)}
                      className={
                        diametroSel
                          ? diametroSel.idDiametro === item.idDiametro
                            ? 'bg-blue-200'
                            : ''
                          : ''
                      }
                    >
                      <td className="border px-2 py-1">{item.diametro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Procesando />
        )}
      </div>
      <div className="bg-white shadow rounded-lg ml-1 mt-1 p-1 text-slate-600 text-sm w-full">
        {marcas.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto mt-2 ml-3">
              <table className="w-full snap-y">
                <thead>
                  <tr className="top-0  bg-gray-200 sticky">
                    <th className="ml-1 py-1 cursor-pointer">MARCAS</th>
                  </tr>
                </thead>

                <tbody className="text-xs">
                  {marcas.map((item) => (
                    <tr
                      key={item.idMarca}
                      onClick={() => handleRowClickMarca(item)}
                      className={
                        marcaSel
                          ? marcaSel.idMarca === item.idMarca
                            ? 'bg-blue-200'
                            : ''
                          : ''
                      }
                    >
                      <td className="border px-2 py-1">{item.marca}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Procesando />
        )}
      </div>
    </div>
  );
};
export default Config;
