'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useContext, useEffect } from 'react';
import BaseContext from '@/context/base/baseContext';
import AuthContext from '@/context/auth/authContext';
import Config from '@/components/config';
import Procesando from '@/components/icons/procesando';
import ConfigIcon from '@/components/icons/config';

const Almacen = () => {
  const { perforador } = useContext(AuthContext);
  const { piezas, guardarPiezas } = useContext(BaseContext);

  const [sortConfig, setSortConfig] = useState({
    key: 'idPieza',
    direction: 'asc',
  });

  const [piezaSel, setPiezaSel] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalBaja, setShowModalBaja] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const [piezasBase, setPiezasBase] = useState([]);
  const [piezasStock, setPiezasStock] = useState([]);

  const [resumen, setResumen] = useState([]);

  const [maestro, setMaestro] = useState([]);
  const [diametros, setDiametros] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [procesando, setProcesando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (perforador?.idPerforador === 'L') {
      redirect('/schb');
    }
    const updateData = async () => {
      if (!perforador) return;
      await buscarPiezas();
    };
    updateData();
  }, [perforador]);

  const filtrarPiezas = (tipo, data) => {
    if (tipo && tipo != '0') {
      const piezasS = data.filter((p) => p.idPieza == tipo);
      setPiezasStock(piezasS);
    } else {
      setPiezasStock(data);
    }
  };

  const buscarPiezasStock = async () => {
    delay(500);

    if (perforador) {
      const filtro = {
        perf: perforador.idPerforador,
        baja: 0,
        uso: 0,
      };

      const { data } = await axios.post('/api/base/piezasPerforador', filtro);
      console.log(data);
      setPiezasBase(data);
      filtrarPiezas('0', data);
      resumenStock();
    }
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

  const resumenStock = async () => {
    setResumen([]);
    if (perforador) {
      const filtro = {
        perf: perforador.idPerforador,
      };
      const res = await axios.post('/api/base/stock', filtro);
      setResumen(res.data);
    }
  };

  const buscarMaestro = async () => {
    delay(500);

    if (perforador) {
      const filtro = {
        perf: perforador.idPerforador,
      };

      const { data } = await axios.post('/api/base/piezas', filtro);
      setMaestro(data);

      const dataDiametros = await axios.post('/api/base/diametros');
      setDiametros(dataDiametros.data);

      const dataMarcas = await axios.post('/api/base/marcas');
      setMarcas(dataMarcas.data);
    }
  };

  useEffect(() => {
    buscarPiezasStock();
    buscarMaestro();
  }, []);

  useEffect(() => {
    buscarPiezasStock();
    buscarMaestro();
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
    if (!sortConfig.key) return piezasStock;

    return [...piezasStock].sort((a, b) => {
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
    setPiezaSel(pieza);
  };

  const bajaPieza = () => {
    setShowModalBaja(true);
  };

  const aceptarBaja = async () => {
    setProcesando(true);

    const dataBaja = {
      idPerforadorPieza: piezaSel.idPerforadorPieza,
      uso: 0,
      baja: 1,
      hsInst: piezaSel.hsInst,
      motivo: piezaSel.motivo,
      bomba: piezaSel.bomba,
      cuerpo: piezaSel.cuerpo,
      modulo: piezaSel.modulo,
    };

    const respBaja = await axios.post(
      '/api/base/updatePiezasPerforador',
      dataBaja
    );

    if (!respBaja.data.exito) setError(true);
    else setExito(true);

    await delay(1500);
    buscarPiezasStock();
    setExito(false);
    setError(false);
    setPiezaSel(null);
    setProcesando(false);
    setShowModalBaja(false);
  };

  const altaPieza = () => {
    setShowModal(true);
  };

  const closeModalBaja = () => {
    setShowModalBaja(false);
  };

  const cancelarCambio = () => {
    setShowModal(false);
  };

  const aceptarAlta = async (values) => {
    setProcesando(true);
    let datos = [];
    let cantidad = values.cantidad;
    let serie = '';
    let idDiametro = null;
    let idMarca = parseInt(values.marca);
    const pieza = JSON.parse(values.pieza);
    let idPieza = pieza.idPieza;

    //lleva numero de serie
    if (pieza.serie === 1) {
      cantidad = 1;
      serie = values.serie.toString();
    }

    if (pieza.diametro === 1) {
      idDiametro = parseInt(values.diametro);
    }

    for (let i = 0; i < cantidad; i++) {
      datos.push({
        perforador: perforador.idPerforador,
        idPieza: idPieza,
        hs: 0,
        hsInst: 0,
        serie: serie,
        enUso: 0,
        baja: 0,
        motivo: null,
        bomba: 0,
        cuerpo: 0,
        modulo: null,
        idMarca: idMarca,
        idDiametro: idDiametro,
      });
    }

    console.log(datos);

    const respAlta = await axios.post(
      '/api/base/insertPiezasPerforador',
      datos
    );
    if (!respAlta.data.exito) setError(true);
    else setExito(true);

    await delay(1500);
    buscarPiezasStock();
    setExito(false);
    setError(false);
    setPiezaSel(null);
    setProcesando(false);
    setShowModal(false);
  };

  const handleChangeTipo = (e) => {
    e.preventDefault();
    filtrarPiezas(e.target.value, piezasBase);
  };

  const validateForm = async (values) => {
    const errors = {};
    const pieza = JSON.parse(values.pieza);

    if (!pieza.idPieza) errors.pieza = 'Debe seleccionar tipo';

    if (pieza.serie === 1) {
      const filtro = {
        perf: perforador.idPerforador,
        idPieza: pieza.idPieza,
      };
      const res = await axios.post('/api/base/nroSerie', filtro);
      values.serie = res.data[0].nro;
    }

    // Si es camisa lleva numero de serie
    if (pieza.serie === 1 && !values.serie) {
      errors.serie = 'Debe ingresar el nro. de inventario';
    }
    // Si no es camisa debe indicar cantidad
    if (pieza.serie != 1 && !(values.cantidad > 0)) {
      errors.cantidad = 'Debe ingresar la cantidad';
    }
    return errors;
  };

  return (
    <>
      <>
        {showModalBaja && (
          <div className=" fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            {piezaSel ? (
              <div className="max-h-full bg-white rounded-lg p-4 ">
                <div>
                  <h1>
                    <span className="font-semibold ">
                      DESEA DAR DE BAJA LA SIGUIENTE PIEZA?
                    </span>
                  </h1>
                  <h1>
                    <span className="font-semibold mt-20 mb-2">Nro:</span>
                    {piezaSel.idPieza}
                  </h1>
                  <h1>
                    {' '}
                    <span className="font-semibold ">Tipo:</span>{' '}
                    {piezaSel.pieza.tipo}
                  </h1>
                  <h1>
                    <span className="font-semibold ">Diametro:</span>{' '}
                    {piezaSel.diametro ? piezaSel.diametro.diametro : ''}
                  </h1>
                  <h1>
                    {' '}
                    <span className="font-semibold ">N°Serie.:</span>{' '}
                    {piezaSel.serie}
                  </h1>
                  <h1>
                    {' '}
                    <span className="font-semibold "> Hs:</span> {piezaSel.hs}
                  </h1>
                </div>
                {!procesando ? (
                  <>
                    <div className="flex justify-between mt-1 mb-1 ">
                      <button
                        className=" rounded-md bg-red-400 hover:bg-red-500 p-2 mr-2 mt-5  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-1/3"
                        onClick={closeModalBaja}
                      >
                        CANCELAR
                      </button>
                      <button
                        className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-5  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/3"
                        onClick={aceptarBaja}
                      >
                        ACEPTAR
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Procesando />
                    {exito ? (
                      <div className="text-center font-semibold mt-0 p-1 text-green-600 border rounded border-green-600 bg-green-100">
                        <span> Pieza dada de baja con éxito</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    {error ? (
                      <div className="text-center font-semibold mt-0 p-1 text-rose-600 border rounded border-rose-600 bg-rose-100">
                        <span> Error al dar de baja la pieza</span>
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
                  onClick={closeModalBaja}
                  className="rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        )}
      </>
      <>
        {showModal && (
          <div className=" fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-full bg-white rounded-lg p-4 w-4/5">
              <div>
                <h1>
                  <span className="font-semibold "> ALTA DE PIEZA</span>
                </h1>
              </div>
              {!procesando ? (
                <>
                  <div className="max-h-96 mt-2 w-full">
                    <Formik
                      initialValues={{
                        pieza: '{}',
                        marca: '1',
                        diametro: 1,
                        cantidad: 1,

                        serie: null,
                      }}
                      validate={validateForm}
                      onSubmit={(values) => {
                        // Manejar la subida del formulario aquí
                        aceptarAlta(values);
                      }}
                    >
                      {({ values }) => (
                        <Form>
                          <div className="my-3">
                            <label
                              className="uppercase text-gray-600 "
                              htmlFor="tipo"
                            >
                              TIPO:
                            </label>
                            <Field
                              as="select"
                              id="pieza"
                              name="pieza"
                              className="w-full mt-1 p-1 border rounded-l bg-gray-50"
                            >
                              <option key="0" value="{}"></option>
                              {maestro.map((p) => (
                                <option
                                  key={p.idPieza}
                                  value={JSON.stringify(p.pieza)}
                                >
                                  {p.pieza.tipo}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="pieza"
                              component="div"
                              className="text-center  text-rose-600 border rounded border-rose-600 bg-rose-100"
                            />
                          </div>
                          <div className="my-3">
                            <label
                              className="uppercase text-gray-600 "
                              htmlFor="marca"
                            >
                              MARCA:
                            </label>
                            <Field
                              as="select"
                              id="marca"
                              name="marca"
                              className="w-full mt-1 p-1 border rounded-l bg-gray-50"
                            >
                              {marcas.map((m) => (
                                <option key={m.idMarca} value={m.idMarca}>
                                  {m.marca}
                                </option>
                              ))}
                            </Field>
                          </div>
                          {JSON.parse(values.pieza) &&
                            JSON.parse(values.pieza).diametro == 1 && (
                              <div className="my-3">
                                <label
                                  className="uppercase text-gray-600 "
                                  htmlFor="diametro"
                                >
                                  DIAMETRO:
                                </label>
                                <Field
                                  as="select"
                                  id="diametro"
                                  name="diametro"
                                  className="w-full mt-1 p-1 border rounded-l bg-gray-50"
                                >
                                  {diametros.map((d) => (
                                    <option
                                      key={d.idDiametro}
                                      value={d.idDiametro}
                                    >
                                      {d.diametro}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            )}

                          {JSON.parse(values.pieza) &&
                            JSON.parse(values.pieza).serie == 1 && (
                              <div className="my-3">
                                <label
                                  className="uppercase text-gray-600 block"
                                  htmlFor="serie"
                                >
                                  N°SERIE:
                                </label>
                                <Field
                                  type="text"
                                  id="serie"
                                  name="serie"
                                  disabled="true"
                                  className="w-full mt-1 p-1 border rounded-l bg-gray-50"
                                />
                                <ErrorMessage
                                  name="serie"
                                  component="div"
                                  className="text-center  text-rose-600 border rounded border-rose-600 bg-rose-100"
                                />
                              </div>
                            )}

                          {JSON.parse(values.pieza) &&
                            JSON.parse(values.pieza).serie == 0 && (
                              <div className="my-3">
                                <label className="uppercase text-gray-600 block">
                                  CANTIDAD:
                                </label>
                                <Field
                                  type="number"
                                  id="cantidad"
                                  name="cantidad"
                                  className="w-full mt-1 p-1 border rounded-l bg-gray-50"
                                />
                                <ErrorMessage
                                  name="cantidad"
                                  component="div"
                                  className="text-center  text-rose-600 border rounded border-rose-600 bg-rose-100"
                                />
                              </div>
                            )}
                          <div className="flex justify-between">
                            <button
                              className=" bg-rose-400 mb-2 w-2/6 pt-2 pb-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-rose-500 transition-colors"
                              onClick={cancelarCambio}
                            >
                              CANCELAR
                            </button>
                            <input
                              type="submit"
                              value="ACEPTAR"
                              className="bg-sky-500 mb-2 w-3/6 pt-2 pb-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-600 transition-colors"
                            />
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </>
              ) : (
                <>
                  <Procesando />
                  {exito ? (
                    <div className="text-center font-semibold mt-0 p-1 text-green-600 border rounded border-green-600 bg-green-100">
                      <span> Piezas dadas de alta con exito</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {error ? (
                    <div className="text-center font-semibold mt-0 p-1 text-rose-600 border rounded border-rose-600 bg-rose-100">
                      <span> Error al dar de alta las piezas</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </>
      <>
        {showConfig && (
          <div className=" fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-full bg-slate-100 rounded-lg p-4 w-3/5">
              <Config />
              <button
                className="rounded hover:cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                onClick={() => setShowConfig(false)}
              >
                VOLVER
              </button>
            </div>
          </div>
        )}
      </>
      <div className="flex flex-col md:flex-row content-start  w-full">
        <div className="w-full ml-1 mr-2">
          <div className="bg-white shadow rounded-lg ml-1 mr-1 mt-1 mb-0 p-2 text-slate-600 flex flex-row md:flex-row ">
            <div className="mr-5 ">
              <h1>
                <span className="font-semibold ...">
                  {perforador ? perforador.nombre : <></>}
                </span>{' '}
                - STOCK DE PIEZAS{' '}
              </h1>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg ml-1 mr-2 mt-1 p-1 text-slate-600 text-sm w-full ">
            <div className="max-h-96 overflow-y-auto mt-2 ml-3">
              {resumen.length > 0 ? (
                <table className="w-full snap-y">
                  <thead>
                    <tr className="top-0  bg-gray-200 sticky">
                      <th className="ml-1 py-1">Nro.</th>
                      <th className="ml-1 py-1">Tipo</th>
                      <th className="ml-1 py-1">Diam.</th>
                      <th className="ml-1 py-1 ">Disponible</th>
                      <th className="ml-1 py-1 ">Minimo</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs">
                    {resumen.map((item) => (
                      <tr key={item.idPieza + item.diametro} className="text">
                        <td className="border px-2 py-1">{item.nroPieza}</td>
                        <td className="border px-2 py-1">{item.tipo}</td>
                        <td className="border px-2 py-1">{item.diametro}</td>
                        <td
                          className={
                            item.disp < item.stock
                              ? 'border px-2 py-1 text-red-500 font-bold'
                              : item.disp === item.stock
                                ? 'border px-2 py-1 text-yellow-500 font-bold'
                                : 'border px-2 py-1 text-green-500 font-bold'
                          }
                        >
                          {item.disp}
                        </td>
                        <td className="border px-2 py-1">{item.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Procesando />
              )}
            </div>
            <div className="flex ml-3 mt-3 mb-1 ">
              {perforador ? (
                perforador.acceso === 'Operacion' ? (
                  <button
                    className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100"
                    onClick={() => setShowConfig(true)}
                  >
                    <ConfigIcon />
                  </button>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg ml-1 mt-1 p-1 text-slate-600 text-sm w-full">
          <div className="ml-3 mt-3 ">
            <span className="font-semibold mt-2 "> PIEZA:</span>
            <select
              onChange={handleChangeTipo}
              className="p-1 w-1/3 ml-2 border rounded-l bg-slate-100 mr-3 "
            >
              <option key="0" value="0">
                TODAS
              </option>
              {maestro.map((p) => (
                <option key={p.pieza.idPieza} value={p.pieza.idPieza}>
                  {p.pieza.tipo}
                </option>
              ))}
            </select>
          </div>
          {sortedData().length > 0 ? (
            <>
              <div className="max-h-96 overflow-y-auto mt-2 ml-3">
                <table className="w-full snap-y">
                  <thead>
                    <tr className="top-0  bg-gray-200 sticky">
                      <th
                        className="ml-1 py-1 cursor-pointer"
                        onClick={() => requestSort('idPieza')}
                      >
                        Nro.
                      </th>
                      <th className="ml-1 py-1">Tipo</th>
                      <th className="ml-1 py-1">Diam.</th>
                      <th className="ml-1 py-1 ">Marca</th>
                      <th className="ml-1 py-1 ">N°Serie</th>
                      <th
                        className="ml-1 py-1 cursor-pointer"
                        onClick={() => requestSort('hs')}
                      >
                        Hs. Uso
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-xs">
                    {sortedData().map((item) => (
                      <tr
                        key={item.idPerforadorPieza}
                        onClick={() => handleRowClick(item)}
                        className={
                          piezaSel
                            ? piezaSel.idPerforadorPieza ===
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
                          {item.diametro ? item.diametro.diametro : ''}
                        </td>
                        <td className="border px-2 py-1">
                          {item.marca ? item.marca.marca : ''}
                        </td>
                        <td className="border px-2 py-1">{item.serie}</td>
                        <td className="border px-2 py-1">{item.hs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <Procesando />
          )}
          <div className="flex justify-between mt-3 mb-1 ">
            {perforador ? (
              perforador.acceso === 'Operacion' ? (
                <button
                  className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-1/4"
                  onClick={bajaPieza}
                >
                  BAJA
                </button>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {perforador ? (
              perforador.acceso === 'Operacion' ? (
                <button
                  className=" rounded-md bg-blue-400 hover:bg-blue-500 p-2 mt-2  mb-2 drop-shadow-xl font-semibold text-sx text-stone-100 w-2/4"
                  onClick={altaPieza}
                >
                  ALTA
                </button>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Almacen;
