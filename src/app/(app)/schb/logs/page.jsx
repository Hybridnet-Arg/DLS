'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '@/context/auth/authContext';
import Procesando from '@/components/icons/procesando';

const Logs = () => {
  const { perforador } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [logsBomba, setLogsBombas] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha',
    direction: 'desc',
  });

  useEffect(() => {
    if (perforador?.idPerforador === 'L') {
      redirect('/schb');
    }
  }, [perforador]);

  useEffect(() => {
    const buscarLogs = async () => {
      try {
        setIsLoading(true);
        if (!perforador) return;
        const filtro = {
          perf: perforador.idPerforador,
        };

        const { data } = await axios.post('/api/base/logs', filtro);
        setLogs(data);
        setLogsBombas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    buscarLogs();

    return () => {
      setLogs([]);
      setLogsBombas([]);
      setIsLoading(true);
    };
  }, [perforador]);

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
    if (!sortConfig.key) return logsBomba;

    return [...logsBomba].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  const handleChangeBomba = (e) => {
    e.preventDefault();
    const bomba = e.target.value;
    if (bomba === '0') {
      setLogsBombas(logs);
    } else {
      const logsFiltrados = logs.filter((log) => log.bomba == bomba);
      setLogsBombas(logsFiltrados);
    }
  };

  return (
    <div className="flex flex-row md:flex-row items-center justify-between w-full">
      <div className=" bg-white shadow rounded-lg ml-1 p-1 pt-5 mt-2 text-slate-600 w-full h-6/6">
        <h2>
          <span className="font-semibold pt-4 ml-5 mt-4">
            {' '}
            Registro de Movimientos
          </span>
        </h2>
        <div className=" mt-3 mb-3 ml-5">
          <span className=" font-semibold pt-4 mt-4"> Bomba:</span>
          <select
            onChange={handleChangeBomba}
            className="ml-1 border rounded-l bg-slate-100 mr-3 "
          >
            <option key="0" value="0" selected>
              Todas
            </option>
            <option key="1" value="1">
              Bomba 1
            </option>
            <option key="2" value="2">
              Bomba 2
            </option>
            <option key="3" value="3">
              Bomba 3
            </option>
          </select>
        </div>

        {!isLoading ? (
          sortedData().length > 0 ? (
            <div className="h-96 overflow-y-auto mt-2 ml-3">
              <table className="w-full snap-y">
                <thead>
                  <tr className="top-0  bg-gray-100 sticky">
                    <th
                      className="ml-1 py-1 cursor-pointer"
                      onClick={() => requestSort('fecha')}
                    >
                      Fecha
                    </th>
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
                    <th className="ml-1 py-1">Modulo</th>
                    <th className="ml-1 py-1">Nro.</th>
                    <th className="ml-1 py-1 ">Tipo</th>
                    <th className="ml-1 py-1 ">Diametro</th>
                    <th className="ml-1 py-1 ">Marca</th>
                    <th className="ml-1 py-1 ">Modelo</th>
                    <th className="ml-1 py-1 ">Hs</th>
                    <th className="ml-1 py-1 ">Movimiento</th>
                    <th className="ml-1 py-1 ">Detalle</th>
                    <th className="ml-1 py-1 ">Usuario</th>
                    <th className="ml-1 py-1 ">Serie</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {sortedData().map((item) => (
                    <tr key={item.idLog} className="hover:bg-blue-200">
                      <td className="border px-2 py-1">
                        {new Date(item.fecha).toLocaleString()}
                      </td>
                      <td className="border px-2 py-1">{item.bomba}</td>
                      <td className="border px-2 py-1">{item.cuerpo}</td>
                      <td className="border px-2 py-1">{item.modulo}</td>
                      <td className="border px-2 py-1">
                        {item.perforadorPieza.pieza.nroPieza}
                      </td>
                      <td className="border px-2 py-1">
                        {item.perforadorPieza.pieza.tipo}
                      </td>
                      <td className="border px-2 py-1">
                        {item.perforadorPieza.diametro
                          ? item.perforadorPieza.diametro.diametro
                          : ''}
                      </td>
                      <td className="border px-2 py-1">
                        {item.perforadorPieza.marca
                          ? item.perforadorPieza.marca.marca
                          : ''}
                      </td>
                      <td className="border px-2 py-1">
                        {item?.perforadorPieza?.modelo
                          ? item?.perforadorPieza?.modelo?.modelo
                          : ''}
                      </td>
                      <td className="border px-2 py-1">{item.hs}</td>
                      <td className="border px-2 py-1">{item.movimiento}</td>
                      <td className="border px-2 py-1">{item.detalle}</td>
                      <td className="border px-2 py-1">{item.usuario}</td>
                      <td className="border px-2 py-1">
                        {item.perforadorPieza.serie}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6">No se encontraron registros...</p>
          )
        ) : (
          <Procesando />
        )}
      </div>
    </div>
  );
};

export default Logs;
