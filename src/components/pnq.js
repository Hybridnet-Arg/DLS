import React, { useEffect, useContext, useState } from 'react';
import Procesando from './icons/procesando';
import axios from 'axios';
import AuthContext from '@/context/auth/authContext';

const Pnq = () => {
  const authContext = useContext(AuthContext);
  const { perforador } = authContext;
  const [pnqs, setPnqs] = useState([]);
  const [pnqSel, setPnqSel] = useState(null);

  const buscarPnqs = async () => {
    const filtro = { dist: perforador.distributionType };
    const dataPnqs = await axios.post('/api/base/pnqs', filtro);
    setPnqs(dataPnqs.data);
  };

  useEffect(() => {
    buscarPnqs();
  }, []);

  const handleRowClickPnq = (pnq) => {
    setPnqSel(pnq);
  };

  return (
    <div className="flex flex-col md:flex-row content-start  w-full">
      <div className="bg-white shadow rounded-lg ml-1 mt-1 p-1 text-slate-600 text-sm w-full">
        <div>
          <h1>
            <span className="font-semibold "> PNQs</span>
          </h1>
        </div>
        {pnqs.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto mt-2 ml-3">
              <table className="w-full snap-y">
                <thead>
                  <tr className="top-0  bg-gray-200 sticky">
                    <th className="ml-1 py-1 cursor-pointer">Fecha</th>
                    <th className="ml-1 py-1 cursor-pointer">Pieza</th>
                    <th className="ml-1 py-1 cursor-pointer">Diametro</th>
                    <th className="ml-1 py-1 cursor-pointer">Opc.1</th>
                    <th className="ml-1 py-1 cursor-pointer">Opc.2</th>
                    <th className="ml-1 py-1 cursor-pointer">Opc.3</th>
                    <th className="ml-1 py-1 cursor-pointer">Opc.4</th>
                    <th className="ml-1 py-1 cursor-pointer">Cantidad</th>
                    <th className="ml-1 py-1 cursor-pointer">Estado</th>
                  </tr>
                </thead>

                <tbody className="text-xs">
                  {pnqs.map((item) => (
                    <tr
                      key={item.idDiametro}
                      onClick={() => handleRowClickPnq(item)}
                      className={
                        pnqSel
                          ? pnqSel.idPnq === item.idPnq
                            ? 'bg-blue-200'
                            : ''
                          : ''
                      }
                    >
                      <td className="border px-2 py-1">
                        {new Date(item.fecha).toLocaleString()}
                      </td>
                      <td className="border px-2 py-1">{item.pieza}</td>
                      <td className="border px-2 py-1">{item.diametro}</td>
                      <td className="border px-2 py-1">{item.op1}</td>
                      <td className="border px-2 py-1">{item.op2}</td>
                      <td className="border px-2 py-1">{item.op3}</td>
                      <td className="border px-2 py-1">{item.op4}</td>
                      <td className="border px-2 py-1">{item.cantidad}</td>
                      <td className="border px-2 py-1">{item.estado}</td>
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
export default Pnq;
