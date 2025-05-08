'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { usePlantaStore } from '@/store/planta.store';
import usePerforadoresStore from '@/store/perforadores.store';
import { CONFIG } from '@/constants';
import LocalTime from '../localTime/LocalTime';
import { LOCACIONES_PLANTA } from '@/constants/plantaLocacion.constant';

export default function PlantaIcon({
  height = '100%',
  width = '100%',
  backgroundImage = '/static/images/planta/background.jpeg',
  ...props
}) {
  const router = useRouter();

  const {
    data,
    loading,
    fetchData,
    activeSection,
    initial,
    topDriveEstado,
    cableEstado,
    setSetSelectedOptionMenu,
    setActiveSection,
    setInitial,
  } = usePlantaStore();
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [semaforoBomba1, setSemaforoBomba1] = useState('');
  const [semaforoBomba2, setSemaforoBomba2] = useState('');
  const [semaforoBomba3, setSemaforoBomba3] = useState('');
  const [semaforoTanque, setSemaforoTanque] = useState('');
  const [semaforoTopDrive, setSemaforoTopDrive] = useState('');
  const [semaforoCable, setSemaforoCable] = useState('');
  const [imagenPlanta, setImagenPlanta] = useState('');

  const [posicionBomba1, setPosicionBomba1] = useState(null);
  const [posicionBomba2, setPosicionBomba2] = useState(null);
  const [posicionBomba3, setPosicionBomba3] = useState(null);
  const [posicionTanque, setPosicionTanque] = useState(null);
  const [posicionAvancePozo, setPosicionAvancePozo] = useState(null);
  const [posicionTopDrive, setPosicionTopDrive] = useState(null);
  const [posicionCable, setPosicionCable] = useState(null);
  const [posicionTubulares, setPosicionTubulares] = useState([]);

  useEffect(() => {
    if (
      perforadorSeleccionado.idPerforador === '167' ||
      perforadorSeleccionado.idPerforador === '168'
    ) {
      setImagenPlanta('/static/images/planta/planta_168.png');
    } else if (perforadorSeleccionado.idPerforador === '166') {
      setImagenPlanta('/static/images/planta/planta_166.png');
    } else if (perforadorSeleccionado.idPerforador === '165') {
      setImagenPlanta('/static/images/planta/planta_165.png');
    } else if (perforadorSeleccionado.idPerforador === '001') {
      setImagenPlanta('/static/images/planta/planta_PAE001.png');
    } else if (perforadorSeleccionado.idPerforador === '169') {
      setImagenPlanta('/static/images/planta/planta_169.png');
    } else if (perforadorSeleccionado.idPerforador === '170') {
      setImagenPlanta('/static/images/planta/planta_170.png');
    } else {
      //imagen por defecto para el 163, 171, 173 y 174
      setImagenPlanta('/static/images/planta/planta_168.png');
    }
    fetchData(true, perforadorSeleccionado.idPerforador, 0, 1);
    obtenerPosiciones();
  }, [perforadorSeleccionado]);

  useEffect(() => {
    if (data.length > 0) {
      setSemaforoBomba1(data[0].semaforo);
      setSemaforoBomba2(data[1].semaforo);
      setSemaforoBomba3(data[2].semaforo);
      setSemaforoTanque(data[3].semaforo);
    }
    if (topDriveEstado) {
      setSemaforoTopDrive(topDriveEstado?.semaforo);
    }
    if (cableEstado) {
      setSemaforoCable(cableEstado?.semaforo);
    }
  }, [data, topDriveEstado, cableEstado]);

  const obtenerPosiciones = () => {
    if (perforadorSeleccionado.idPerforador === '166') {
      setPosicionBomba1({
        width: 39,
        height: 91,
        x: -329,
        y: -323,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 39,
        height: 91,
        x: -373,
        y: -323,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 39,
        height: 91,
        x: -417,
        y: -323,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 35,
        height: 121,
        x: -115,
        y: -372,
        rx: 2,
        ry: 2,
      });
      setPosicionAvancePozo({
        width: 88,
        height: 105,
        x: -570,
        y: -506,
      });
      setPosicionTopDrive({
        width: 20,
        height: 24,
        x: -537,
        y: -463,
      });
      setPosicionCable({
        width: 28,
        height: 19,
        x: -523,
        y: -382,
      });
      setPosicionTubulares([
        {
          width: 148,
          height: 100,
          x: -273,
          y: -655,
        },
        {
          width: 88,
          height: 113,
          x: -848,
          y: -662,
        },
      ]);
    } else if (perforadorSeleccionado.idPerforador === '165') {
      setPosicionBomba1({
        width: 42,
        height: 95,
        x: -315,
        y: -392,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 42,
        height: 95,
        x: -361,
        y: -392,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 42,
        height: 95,
        x: -407,
        y: -392,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 35,
        height: 126,
        x: -93,
        y: -442,
        rx: 2,
        ry: 2,
      });
      setPosicionAvancePozo({
        width: 108,
        height: 69,
        x: -586,
        y: -541,
      });
      setPosicionTopDrive({
        width: 25,
        height: 22,
        x: -541,
        y: -529,
      });
      setPosicionCable({
        width: 19,
        height: 28,
        x: -457,
        y: -550,
      });
      setPosicionTubulares([
        {
          width: 154,
          height: 104,
          x: -224,
          y: -730,
        },
        {
          width: 78,
          height: 118,
          x: -809,
          y: -737,
        },
      ]);
    } else if (perforadorSeleccionado.idPerforador === '001') {
      setPosicionBomba1({
        width: 42,
        height: 102,
        x: -372,
        y: -346,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 43,
        height: 102,
        x: -420,
        y: -346,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 43,
        height: 102,
        x: -469,
        y: -346,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 35,
        height: 131,
        x: -50,
        y: -397,
        rx: 2,
        ry: 2,
      });
      setPosicionAvancePozo({
        width: 115,
        height: 73,
        x: -660,
        y: -504,
      });
      setPosicionTopDrive({
        width: 26,
        height: 22,
        x: -612,
        y: -490,
      });
      setPosicionCable({
        width: 19,
        height: 28,
        x: -523,
        y: -510,
      });
      setPosicionTubulares([
        {
          width: 161,
          height: 109,
          x: -266,
          y: -701,
        },
        {
          width: 83,
          height: 123,
          x: -885,
          y: -708,
        },
      ]);
    } else if (perforadorSeleccionado.idPerforador === '169') {
      setPosicionBomba1({
        width: 39,
        height: 91,
        x: -333,
        y: -326,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 39,
        height: 91,
        x: -376,
        y: -326,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 39,
        height: 91,
        x: -420,
        y: -326,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 35,
        height: 119,
        x: -61,
        y: -373,
        rx: 2,
        ry: 2,
      });
      setPosicionAvancePozo({
        width: 88,
        height: 105,
        x: -572,
        y: -509,
      });
      setPosicionTopDrive({
        width: 20,
        height: 24,
        x: -539,
        y: -465,
      });
      setPosicionCable({
        width: 28,
        height: 19,
        x: -525,
        y: -384,
      });
      setPosicionTubulares([
        {
          width: 148,
          height: 100,
          x: -258,
          y: -629,
        },
        {
          width: 73,
          height: 113,
          x: -820,
          y: -636,
        },
      ]);
    } else if (perforadorSeleccionado.idPerforador === '170') {
      setPosicionBomba1({
        width: 39,
        height: 93,
        x: -330,
        y: -325,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 39,
        height: 93,
        x: -375,
        y: -325,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 39,
        height: 93,
        x: -419,
        y: -325,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 35,
        height: 121,
        x: -117,
        y: -372,
        rx: 2,
        ry: 2,
      });
      setPosicionAvancePozo({
        width: 88,
        height: 105,
        x: -572,
        y: -507,
      });
      setPosicionTopDrive({
        width: 20,
        height: 24,
        x: -538,
        y: -463,
      });
      setPosicionCable({
        width: 28,
        height: 19,
        x: -525,
        y: -381,
      });
      setPosicionTubulares([
        {
          width: 148,
          height: 100,
          x: -240,
          y: -654,
        },
        {
          width: 73,
          height: 113,
          x: -807,
          y: -660,
        },
      ]);
    } else {
      setPosicionBomba1({
        width: 39,
        height: 91,
        x: -332,
        y: -327,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba2({
        width: 39,
        height: 91,
        x: -376,
        y: -327,
        rx: 10,
        ry: 10,
      });
      setPosicionBomba3({
        width: 39,
        height: 91,
        x: -420,
        y: -327,
        rx: 10,
        ry: 10,
      });
      setPosicionTanque({
        width: 34,
        height: 120,
        x: -60,
        y: -374,
        rx: 10,
        ry: 10,
      });
      setPosicionAvancePozo({
        width: 88,
        height: 105,
        x: -573,
        y: -508,
      });
      setPosicionTopDrive({
        width: 20,
        height: 24,
        x: -539,
        y: -465,
      });
      setPosicionCable({
        width: 28,
        height: 19,
        x: -525,
        y: -384,
      });
      setPosicionTubulares([
        {
          width: 148,
          height: 100,
          x: -252,
          y: -630,
        },
        {
          width: 73,
          height: 112,
          x: -815,
          y: -636,
        },
      ]);
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-cover bg-center">
      <div className="absolute top-2 left-4 text-white text-2xl font-bold z-10">
        Planta Locación
      </div>

      <svg
        width={width}
        height={600}
        viewBox="0 0 967 789"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        {...props}
      >
        <style>
          {`
          @keyframes flash {
            0% { fill-opacity: 0.2; }
            50% { fill-opacity: 0.8; }
            100% { fill-opacity: 0.5; }
          }

          .flashing {
            animation: flash 0.5s infinite;
          }
        `}
        </style>
        {imagenPlanta && <image width={958} height={780} href={imagenPlanta} />}
        <rect
          width={posicionBomba1?.width}
          height={posicionBomba1?.height}
          x={posicionBomba1?.x}
          y={posicionBomba1?.y}
          className={
            activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
              ? 'flashing'
              : ''
          }
          rx={posicionBomba1?.rx}
          ry={posicionBomba1?.ry}
          style={{
            fill:
              initial ||
              activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
                ? semaforoBomba1.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.5,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/sistema-de-horas-de-bomba')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
            setActiveSection(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />
        <rect
          width={posicionBomba2?.width}
          height={posicionBomba2?.height}
          x={posicionBomba2?.x}
          y={posicionBomba2?.y}
          className={
            activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
              ? 'flashing'
              : ''
          }
          rx={posicionBomba2?.rx}
          ry={posicionBomba2?.ry}
          style={{
            fill:
              initial ||
              activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
                ? semaforoBomba2.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.5,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/sistema-de-horas-de-bomba')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
            setActiveSection(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />
        <rect
          width={posicionBomba3?.width}
          height={posicionBomba3?.height}
          x={posicionBomba3?.x}
          y={posicionBomba3?.y}
          className={
            activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
              ? 'flashing'
              : ''
          }
          rx={posicionBomba3?.rx}
          ry={posicionBomba3?.ry}
          style={{
            fill:
              initial ||
              activeSection === LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS
                ? semaforoBomba3.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.5,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/sistema-de-horas-de-bomba')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
            setActiveSection(LOCACIONES_PLANTA.SISTEMA_HORAS_BOMBAS);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionTanque?.width}
          height={posicionTanque?.height}
          x={posicionTanque?.x}
          y={posicionTanque?.y}
          className={
            activeSection === LOCACIONES_PLANTA.TANQUES_GASOIL ? 'flashing' : ''
          }
          rx={posicionTanque?.rx}
          ry={posicionTanque?.ry}
          style={{
            fill:
              initial || activeSection === LOCACIONES_PLANTA.TANQUES_GASOIL
                ? semaforoTanque.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.5,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/tanques-gasoil')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.TANQUES_GASOIL);
            setActiveSection(LOCACIONES_PLANTA.TANQUES_GASOIL);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionAvancePozo?.width}
          height={posicionAvancePozo?.height}
          x={posicionAvancePozo?.x}
          y={posicionAvancePozo?.y}
          className={
            activeSection === LOCACIONES_PLANTA.AVANCES_DE_POZO
              ? 'flashing'
              : ''
          }
          style={{
            fill:
              initial || activeSection === LOCACIONES_PLANTA.AVANCES_DE_POZO
                ? 'green'
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.5,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/avances-de-pozo')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.AVANCES_DE_POZO);
            setActiveSection(LOCACIONES_PLANTA.AVANCES_DE_POZO);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionTopDrive?.width}
          height={posicionTopDrive?.height}
          x={posicionTopDrive?.x}
          y={posicionTopDrive?.y}
          pointerEvents="all"
          className={
            activeSection === LOCACIONES_PLANTA.TOP_DRIVE ? 'flashing' : ''
          }
          style={{
            fill:
              initial || activeSection === LOCACIONES_PLANTA.TOP_DRIVE
                ? semaforoTopDrive?.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.8,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/top-drive')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.TOP_DRIVE);
            setActiveSection(LOCACIONES_PLANTA.TOP_DRIVE);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionCable?.width}
          height={posicionCable?.height}
          x={posicionCable?.x}
          y={posicionCable?.y}
          className={
            activeSection === LOCACIONES_PLANTA.CICLOS_CABLE_TONELADA_MILLA
              ? 'flashing'
              : ''
          }
          style={{
            fill:
              initial ||
              activeSection === LOCACIONES_PLANTA.CICLOS_CABLE_TONELADA_MILLA
                ? semaforoCable?.color
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.8,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/ciclos-cable-tonelada-milla')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(
              LOCACIONES_PLANTA.CICLOS_CABLE_TONELADA_MILLA
            );
            setActiveSection(LOCACIONES_PLANTA.CICLOS_CABLE_TONELADA_MILLA);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionTubulares[0]?.width}
          height={posicionTubulares[0]?.height}
          x={posicionTubulares[0]?.x}
          y={posicionTubulares[0]?.y}
          className={
            activeSection === LOCACIONES_PLANTA.SISTEMA_TUBULARES
              ? 'flashing'
              : ''
          }
          style={{
            fill:
              initial || activeSection === LOCACIONES_PLANTA.SISTEMA_TUBULARES
                ? 'green'
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.8,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() => router.push('/sistema-de-trazabilidad-para-tubulares')}
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.SISTEMA_TUBULARES);
            setActiveSection(LOCACIONES_PLANTA.SISTEMA_TUBULARES);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />

        <rect
          width={posicionTubulares[1]?.width}
          height={posicionTubulares[1]?.height}
          x={posicionTubulares[1]?.x}
          y={posicionTubulares[1]?.y}
          className={
            activeSection === LOCACIONES_PLANTA.SISTEMA_TUBULARES
              ? 'flashing'
              : ''
          }
          style={{
            fill:
              initial || activeSection === LOCACIONES_PLANTA.SISTEMA_TUBULARES
                ? 'green'
                : 'none',
            stroke: 'none',
            strokeWidth: 1,
            fillOpacity: 0.8,
            cursor: 'pointer',
          }}
          transform="rotate(180 0 0)"
          onClick={() =>
            CONFIG.APP_ENV !== CONFIG.WORK_ENVS.TEST &&
            router.push('/sistema-de-trazabilidad-para-tubulares')
          }
          onMouseEnter={() => {
            setSetSelectedOptionMenu(LOCACIONES_PLANTA.SISTEMA_TUBULARES);
            setActiveSection(LOCACIONES_PLANTA.SISTEMA_TUBULARES);
          }}
          onMouseLeave={() => {
            setSetSelectedOptionMenu(null);
            setActiveSection(null);
            setInitial(true);
          }}
        />
      </svg>
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-30 text-xs px-2 py-2 rounded z-10 text-white">
        <LocalTime />
      </div>
    </div>
  );
}
