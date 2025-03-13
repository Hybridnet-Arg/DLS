'use client';
import { redirect } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '@/context/auth/authContext';
import BaseContext from '@/context/base/baseContext';
import Procesando from '@/components/icons/procesando';

const Plan = () => {
  const { perforador } = useContext(AuthContext);
  const { piezas } = useContext(BaseContext);

  const [piezasCalculadas, setPiezasCalculadas] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const calculaHoras = async (dias) => {
    let d = parseInt(dias);
    const piezasCalc = piezas.map((p) => ({
      ...p,
      hsCalc: parseFloat(p.hs) + d,
      hsRest: (parseFloat(p.pieza.hsMax) - (parseFloat(p.hs) + d)).toFixed(2),
    }));

    const piezasFiltro = piezasCalc.filter((p) => p.hsCalc >= p.pieza.hsMin);
    const piezasOrden = piezasFiltro.sort((a, b) => a.hsRest - b.hsRest);

    setSortConfig({ key: null, direction: 'asc' });
    setPiezasCalculadas(piezasOrden);
  };

  useEffect(() => {
    if (perforador?.idPerforador === 'L') {
      redirect('/schb');
    }
  }, [perforador]);

  useEffect(() => {
    calculaHoras(24);

    return () => {
      setPiezasCalculadas([]);
    };
  }, [piezas]);

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
    if (!sortConfig.key) return piezasCalculadas;

    return [...piezasCalculadas].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleChangeDias = (e) => {
    e.preventDefault();
    const d = e.target.value;
    calculaHoras(d);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full">
      <div className=" bg-white shadow rounded-lg ml-1 p-1 mt-2 text-slate-600 w-full">
        <h2>
          <span className="font-semibold pt-4 ml-5 mt-4">
            {' '}
            Planificador de tareas
          </span>
        </h2>
        <div className=" mt-4 mb-3">
          <span className="ml-5 font-semibold mt-4"> Cantidad de días:</span>
          <select
            onChange={handleChangeDias}
            className="ml-1 border rounded-l bg-slate-100 mr-3 "
          >
            <option key="1" value="24" selected>
              1 dia
            </option>
            <option key="2" value="48">
              2 días
            </option>
            <option key="3" value="72">
              3 días
            </option>
            <option key="4" value="96">
              4 días
            </option>
            <option key="5" value="120">
              5 días
            </option>
          </select>
          <h4 className="ml-5 text-xs"> Cada día se estima como 24hs de uso</h4>
        </div>
        <div className="h-96 overflow-y-auto mt-2">
          {sortedData().length > 0 ? (
            <table className="w-full">
              <thead className="text-s">
                <tr className="top-0  bg-gray-100 sticky">
                  <th
                    className="ml-1 py-1 cursor-pointer"
                    onClick={() => requestSort('bomba')}
                  >
                    Bomba
                  </th>
                  <th
                    className="ml-1 py-1 cursor-pointer"
                    onClick={() => requestSort('cuerpo')}
                  >
                    Cuerpo
                  </th>
                  <th
                    className="ml-1 py-1 cursor-pointer"
                    onClick={() => requestSort('pieza.nroPieza')}
                  >
                    Nro.
                  </th>
                  <th className="ml-1 py-1 ">Tipo</th>
                  <th className="ml-1 py-1">Modulo</th>
                  <th
                    className="ml-1 py-1 cursor-pointer"
                    onClick={() => requestSort('hsCalc')}
                  >
                    Hs. Uso
                  </th>
                  <th className="ml-1 py-1 ">Rango Hs.</th>
                  <th
                    className="ml-1 py-1 cursor-pointer"
                    onClick={() => requestSort('hsRest')}
                  >
                    Hs. Rest.
                  </th>
                  <th className="ml-1 py-1 ">N°Serie</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {sortedData().map((item) => (
                  <tr
                    key={item.idPerforadorPieza}
                    className=" hover:bg-blue-200"
                  >
                    <td className="border px-2 py-1">{item.bomba}</td>
                    <td className="border px-2 py-1">{item.cuerpo}</td>
                    <td className="border px-2 py-1">{item.pieza.nroPieza}</td>
                    <td className="border px-2 py-1">{item.pieza.tipo}</td>
                    <td className="border px-2 py-1">{item.modulo}</td>
                    <td className="border px-2 py-1">{item.hsCalc}</td>
                    <td className="border px-2 py-1">
                      {item.pieza.hsMin + '/' + item.pieza.hsMax}
                    </td>
                    <td
                      className={
                        item.hsRest < 0
                          ? 'hover:bg-blue-200 bg-red-300 border px-2 py-1'
                          : 'hover:bg-blue-200 bg-yellow-200 border px-2 py-1'
                      }
                    >
                      {item.hsRest}
                    </td>
                    <td className="border px-2 py-1">{item.serie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Procesando />
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
