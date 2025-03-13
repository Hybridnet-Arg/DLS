import './index.css';
import clsx from 'clsx';
import '@xyflow/react/dist/style.css';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Info,
} from 'lucide-react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  useKeyPress,
  MarkerType,
} from '@xyflow/react';

import { updateStateDiagram } from '@/services/estadosDiagrama.service';

import CustomNode from './CustomNode';
import ControlDiagram from './ControlDiagram';
import Title from '@/components/ui/labels/Title';
import SimpleFloatingEdge from './SimpleFloatingEdge';
import { NodeContent, NodeContentSteps, NodeContentWells } from './Nodes';
import {
  getRandomColor,
  isStepFinished,
  compareDates,
  isStepActive,
} from '../../utils';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { FASE_AISLACION, FASE_INTERMEDIA_SECUNDARIA } from '@/constants';

const nodeTypes = { custom: CustomNode };
const edgeTypes = { floating: SimpleFloatingEdge };

const DEFAULT_FLOW_OPTIONS = {
  zoomOnScroll: false,
  zoomOnPinch: false,
  zoomOnDoubleClick: false,
  panOnDrag: false,
  panOnScroll: false,
};

const COLORS_NODES_SETUP = ['#85736A', '#6A5144', '#6A5144', '#28170D'];
const COLORS_NODES_IN_PROGRESS = ['#6DB372', '#848993', '#28B432', '#28170D'];

const generateNodes = (nodeData, creadoEl, actualizadoEl) => {
  const nodes = [];
  const columnSpacing = 320;

  const etapasIntemediaSecundaria =
    nodeData
      ?.filter(
        (node) => node?.etapa?.tipo_etapa_pozo_id === FASE_INTERMEDIA_SECUNDARIA
      )
      ?.map((node) => node?.pozo_id) ?? [];
  const idsEtapasIntemediaSecundaria =
    nodeData
      ?.filter((node) => etapasIntemediaSecundaria?.includes(node?.pozo_id))
      ?.map((node) => node?.id) ?? [];

  nodeData.forEach((node) => {
    const {
      id,
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
      avancesPozoProfundidad,
      etapa,
      activo,
    } = node;
    // Calcular la posición de los nodos en función de sus coordenadas extraídas del id
    const [row, col] = id.split('-').map(Number);

    // Definir rowSpacing en base a la fila
    const rowSpacing = row === 0 ? 230 : 230;
    if (row === 0 && col === 0) return;

    const position = {};
    const esFaseAislacion = node?.etapa?.tipo_etapa_pozo_id === FASE_AISLACION;
    const esFaseIntermediaSecundaria = idsEtapasIntemediaSecundaria.includes(
      node?.id
    );

    if (esFaseAislacion && !esFaseIntermediaSecundaria) {
      position.y = (row + 1) * rowSpacing;
      position.x = col * columnSpacing;
    } else {
      position.x = col * columnSpacing;
      position.y = row * rowSpacing;
    }

    let style = {};
    let flagNodeContent = 0;
    let drillInStep = false;
    if (row != 0 && col === 0) {
      flagNodeContent = 1;
      style = {
        color: 'black',
        width: '230px',
        height: '140px',
        display: 'flex',
        flexDirection: 'col',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '15px',
      };
    } else if (row === 0 && col != 0) {
      flagNodeContent = 2;
      style = {
        backgroundColor: 'none',
        border: 'none',
        width: '230px',
        height: '140px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0px',
      };
    } else if (row >= 1 && col >= 1) {
      style = {
        backgroundColor: compareDates(creadoEl, actualizadoEl)
          ? COLORS_NODES_SETUP[node?.etapa?.tipo_etapa_pozo_id - 1]
          : isStepFinished(etapa, avancesPozoProfundidad) ||
              (activo && isStepActive(etapa, avancesPozoProfundidad))
            ? COLORS_NODES_IN_PROGRESS[0]
            : COLORS_NODES_IN_PROGRESS[1],
        color: 'white',
        padding: '10px',
        width: '230px',
        borderRadius: '9px ',
        border: '5px solid',
        borderColor:
          !compareDates(creadoEl, actualizadoEl) &&
          (isStepFinished(etapa, avancesPozoProfundidad) ||
            (activo && isStepActive(etapa, avancesPozoProfundidad)))
            ? COLORS_NODES_IN_PROGRESS[2]
            : COLORS_NODES_IN_PROGRESS[1],
        opacity:
          !compareDates(creadoEl, actualizadoEl) &&
          isStepFinished(etapa, avancesPozoProfundidad)
            ? '0.7'
            : '1',
        animation:
          !compareDates(creadoEl, actualizadoEl) &&
          activo &&
          !isStepFinished(etapa, avancesPozoProfundidad) &&
          isStepActive(etapa, avancesPozoProfundidad)
            ? 'shadowPulse 0.5s infinite alternate'
            : 'none',
      };
      drillInStep = !!(
        !compareDates(creadoEl, actualizadoEl) &&
        activo &&
        !isStepFinished(etapa, avancesPozoProfundidad) &&
        isStepActive(etapa, avancesPozoProfundidad)
      );
    }

    let contentNode = null;
    if (flagNodeContent === 0) {
      contentNode = (
        <NodeContent
          section1={section1}
          section2={section2}
          section3={section3}
          section4={section4}
          section5={section5}
          section6={section6}
        />
      );
    } else if (flagNodeContent === 1) {
      contentNode = <NodeContentSteps section1={section1} />;
    } else if (flagNodeContent === 2) {
      contentNode = <NodeContentWells section1={section1} />;
    }

    const newNode = {
      id,
      position,
      data: {
        label: contentNode,
        connection: row !== 0 && col !== 0,
        customData: { drillInStep },
      },
      type: 'custom',
      draggable: false,
      connectable: row !== 0 && col !== 0,
      selectable: row !== 0 && col !== 0,
      deletable: false,
      style,
    };
    nodes.push(newNode);
  });

  return nodes;
};

const generateEdges = (nodeData) => {
  const edges = [];

  nodeData.forEach((node) => {
    const { idInternal, connectedWith, avancesPozoProfundidad, etapa } = node;

    const targetNode = nodeData?.find(
      (target) =>
        idInternal !== null &&
        connectedWith !== null &&
        target?.idInternal === connectedWith
    );

    if (!targetNode) return;

    const colorEdge = isStepFinished(etapa, avancesPozoProfundidad)
      ? COLORS_NODES_IN_PROGRESS[2]
      : getRandomColor();

    const edgeStyle = {
      strokeWidth: 4,
      stroke: colorEdge,
    };

    const newEdge = {
      id: `${idInternal}-${connectedWith}`,
      source: node.id,
      target: targetNode.id,
      sourceHandle: 'a',
      targetHandle: 'b',
      type: 'floating',
      style: edgeStyle,
      //markerStart: 'green-circle',
      //markerEnd: 'green-circle',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: colorEdge,
      },
    };
    edges.push(newEdge);
  });

  return edges;
};

const processEtepsInArray = (data) => {
  let etapasTotales = [];
  let pozoCounter = 1;
  let pozoDict = {};
  let etapaCounterDict = {}; // Para llevar un control por pozo de las etapas

  data?.detalles_estado_diagrama?.forEach((detalle) => {
    let pozo = detalle.pozo;
    let pozoNombre = pozo.nombre;

    // Si el pozo no ha sido procesado, lo inicializamos
    if (!pozoDict[pozoNombre]) {
      pozoDict[pozoNombre] = pozoCounter;
      etapaCounterDict[pozoNombre] = 0; // Inicializar el contador de etapas para este pozo
      etapasTotales.push({
        id: `0-${pozoCounter}`,
        idInternal: null,
        section1: pozoNombre,
        section2: '',
        section3: '',
        section4: '',
        section5: '',
        section6: '',
        connectedWith: null,
        detalleEstadoDiagramaId: detalle.id,
        avancesPozoProfundidad: detalle?.pozo.avances_pozo[0]?.profundidad,
        etapa: detalle?.etapa_pozo,
        activo: detalle?.pozo?.en_progreso,
        pozo_id: detalle?.pozo?.id,
      });
      pozoCounter++; // Incrementamos el contador de pozos para el próximo
    }

    // Procesamos las etapas del pozo
    etapaCounterDict[pozoNombre]++; // Aumentamos el contador de etapas para el pozo actual
    let etapaCounter = etapaCounterDict[pozoNombre];

    etapasTotales.push({
      id: `${etapaCounter}-${pozoDict[pozoNombre]}`,
      idInternal: detalle.etapa_pozo.id,
      section1: `Prof. desde`,
      section2: detalle.etapa_pozo.profundidad_desde,
      section3: 'Prof. hasta',
      section4: detalle.etapa_pozo.profundidad_hasta,
      section5: 'Diámetro casing',
      section6: detalle.etapa_pozo.casing,
      connectedWith: detalle.conecta_con_etapa,
      detalleEstadoDiagramaId: detalle.id,
      avancesPozoProfundidad: detalle?.pozo.avances_pozo[0]?.profundidad,
      etapa: detalle?.etapa_pozo,
      activo: detalle?.pozo?.en_progreso,
      pozo_id: detalle?.pozo?.id,
    });
  });

  return etapasTotales;
};

const combineLists = (data) => {
  const etapasTotales = processEtepsInArray(data);
  return etapasTotales;
};

const generatePayload = (listaCombinada, conexiones, conexionesEliminadas) => {
  // Crear el nuevo array que contiene los detalles del estado del diagrama
  const nuevoArray = {
    detalles_estado_diagrama: [],
  };

  // Recorremos cada conexión
  conexiones.forEach((conexion) => {
    const sourceId = conexion.source; // Por ejemplo, "1-1"
    const targetId = conexion.target; // Por ejemplo, "1-2"

    // Encontramos el idInternal correspondiente al source en la lista combinada
    const sourceElemento = listaCombinada.find((item) => item.id === sourceId);
    const targetElemento = listaCombinada.find((item) => item.id === targetId);

    // Si ambos elementos existen, creamos el nuevo objeto
    if (sourceElemento && targetElemento) {
      nuevoArray.detalles_estado_diagrama.push({
        //id: sourceElemento.idInternal, // idInternal del source
        id: sourceElemento.detalleEstadoDiagramaId,
        conecta_con_etapa: targetElemento.idInternal, // idInternal del target
      });
    }
  });
  // Recorremos cada conexión
  conexionesEliminadas.forEach((conexion) => {
    const sourceId = conexion.source; // Por ejemplo, "1-1"
    const targetId = conexion.target; // Por ejemplo, "1-2"

    // Encontramos el idInternal correspondiente al source en la lista combinada
    const sourceElemento = listaCombinada.find((item) => item.id === sourceId);
    const targetElemento = listaCombinada.find((item) => item.id === targetId);

    // Si ambos elementos existen, creamos el nuevo objeto
    if (sourceElemento && targetElemento) {
      nuevoArray?.detalles_estado_diagrama?.push({
        //id: sourceElemento.idInternal, // idInternal del source
        id: sourceElemento.detalleEstadoDiagramaId,
        conecta_con_etapa: null, //ponemos null porque es una conexion eliminada
      });
    }
  });

  // Filtrar duplicados si conecta_con_etapa es null
  const idsConNull = new Set(); // Para rastrear ids con conecta_con_etapa null
  nuevoArray.detalles_estado_diagrama =
    nuevoArray?.detalles_estado_diagrama?.filter((elemento) => {
      if (elemento.conecta_con_etapa === null) {
        if (idsConNull.has(elemento.id)) {
          return false; // Duplicado, no incluir
        } else {
          idsConNull.add(elemento.id); // Agregar el id al conjunto
          return true; // No es duplicado, incluir
        }
      }
      return true; // Mantener elementos que no tienen null en conecta_con_etapa
    });

  // Eliminar elementos donde conecta_con_etapa es null si existe otro con el mismo id
  const seenIds = new Set(); // Para rastrear los ids que ya se han visto
  nuevoArray.detalles_estado_diagrama =
    nuevoArray?.detalles_estado_diagrama?.filter((elemento) => {
      if (seenIds.has(elemento.id)) {
        // Si ya existe un elemento con el mismo id, eliminar el que tiene conecta_con_etapa null
        return elemento.conecta_con_etapa !== null;
      } else {
        seenIds.add(elemento.id); // Agregar el id al conjunto
        return true; // Incluir el primer elemento con este id
      }
    });

  return nuevoArray;
};

const StateDiagram = ({ nodeData }) => {
  const router = useRouter();
  const flowRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [nodes, , onNodesChange] = useNodesState(
    generateNodes(
      combineLists(nodeData || []),
      nodeData?.creado_el,
      nodeData?.actualizado_el
    )
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    generateEdges(combineLists(nodeData || []))
  );
  const [deletedEdges, setDeletedEdges] = useState([]);
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);

  const onConnect = useCallback(
    (params) => {
      if (isEditingEnabled) {
        const edgeConnectorColor = getRandomColor();
        const edgeConnectorStyle = {
          stroke: edgeConnectorColor,
          strokeWidth: 4,
        };

        setEdges((eds) =>
          addEdge(
            {
              ...params,
              type: 'floating',
              deletable: isEditingEnabled, // Se actualiza el valor de deletable basado en isEditingEnabled
              style: edgeConnectorStyle,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: edgeConnectorColor,
              },
              //markerEnd: 'green-circle',
              //markerStart: 'green-circle',
            },
            eds
          )
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditingEnabled]
  );

  // Maneja la eliminación de edges y almacena los eliminados
  const onEdgesDelete = (deletedEdges) => {
    setDeletedEdges((prev) => [...prev, ...deletedEdges]); // Guarda los edges eliminados
    setEdges((currentEdges) =>
      currentEdges.filter((e) => !deletedEdges.some((del) => del.id === e.id))
    );
  };

  const onNodeClick = (event, node) => {
    if (node.data.customData.drillInStep) {
      router.push('/avances-de-pozo');
      router.refresh();
    }
  };

  // Hook key press hook para detectar delete key para los edges
  useKeyPress('Delete', () => {
    if (isEditingEnabled) {
      setEdges((eds) => eds.filter((edge) => !edge.selected)); // Elimina solo las conexiones seleccionadas si la edición está habilitada
    }
  });

  // Función para habilitar/deshabilitar edición
  const toggleEditMode = () => {
    setIsEditingEnabled(!isEditingEnabled);

    // Actualiza la propiedad deletable de todos los edges cuando cambia isEditingEnabled
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        deletable: !isEditingEnabled, // Actualiza deletable
      }))
    );
  };

  // Función para obtener y mostrar las conexiones
  const handleUpdateDiagram = () => setShowConfirmModal(true);

  const update = async (payload) => {
    setIsLoadingOnFinish(true);
    try {
      await updateStateDiagram(nodeData.id, payload);
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoadingOnFinish(false);
      setShowConfirmModal(false);
    }
  };

  const scrollLeft = () => {
    if (flowRef.current) {
      flowRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (flowRef.current) {
      flowRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (flowRef.current) {
      flowRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const scrollUp = () => {
    if (flowRef.current) {
      flowRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const deltaY = event.deltaY;

    if (event.ctrlKey || event.metaKey) {
      const zoomLevelRaw = deltaY < 0 ? 1.05 : 1;
      setZoomLevel(zoomLevelRaw);
    }

    if (deltaY > 0) return scrollDown();
    scrollUp();
  };

  useEffect(() => {
    if (flowRef.current) {
      flowRef.current.style.transform = `scale(${zoomLevel})`;
      containerRef.current.style.transform = `scale(${zoomLevel === 1 ? 1 : 1 + 0.1})`;
    }
  }, [zoomLevel]);

  return (
    <div className="flex h-full pe-5 bg-white" ref={containerRef}>
      <div className="simple-floatingedges flex-grow h-[750px] flex-[2.75]">
        <div className="bg-white absolute w-full flex gap-2 top-0 left-0 px-[2.7rem] pt-[3rem] text-lg font-semibold z-10 items-center">
          <Title>
            {compareDates(nodeData?.creado_el, nodeData?.actualizado_el)
              ? 'Crear Diagrama de Estado'
              : 'Avance Diagrama de Estado'}
          </Title>
          <div className="relative group">
            <Info size={28} color="#0d6efd" className="cursor-pointer" />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-full ml-3 hidden group-hover:block bg-[#0d6efd] text-white text-sm rounded-lg shadow-lg p-3 w-48">
              <p className="font-semibold text-center mb-2">
                Eliminar nodo/conexion:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  Win: <span className="font-medium">Click + Backspace</span>
                </li>
                <li>
                  Mac: <span className="font-medium">Click + Delete</span>
                </li>
              </ul>
              <div className="absolute left-[-5px] top-1/2 transform -translate-y-1/2 h-3 w-3 bg-[#0d6efd] rotate-45"></div>
            </div>
          </div>
        </div>

        <div className="ps-5 pe-[3.55rem] h-[750px] mt-[6rem]">
          <ReactFlow
            onWheel={(event) => handleWheel(event)}
            ref={flowRef}
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgesDelete={onEdgesDelete}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultViewport={{ x: -232, y: -59, zoom: 0.8 }}
            connectionMode={
              isEditingEnabled ? ConnectionMode.Loose : ConnectionMode.Noop
            }
            style={{
              overflow: 'scroll',
              overflowX: 'auto',
              overflowY: 'auto',
              height: '750px',
            }}
            {...DEFAULT_FLOW_OPTIONS} // Otras propiedades de ReactFlow
          >
            {/* Definir markerStart y markerEnd en SVG */}
            <svg>
              <defs>
                <marker
                  id="green-circle"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="10"
                  markerHeight="10"
                  orient="auto-start-reverse"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="4"
                    fill="white"
                    stroke="green"
                    strokeWidth="1"
                  />
                </marker>
              </defs>
            </svg>
          </ReactFlow>
          {nodeData?.plan_pozo?.pozos?.length > 0 && (
            <Fragment>
              <div className="absolute inset-y-0 left-1 flex items-center justify-center">
                <button
                  className={clsx(
                    'bg-yellow-400 hover:opacity-70 rounded-full p-2',
                    {
                      hidden: nodeData?.plan_pozo?.pozos?.length <= 3,
                    }
                  )}
                  onClick={() => scrollLeft()}
                >
                  <ChevronLeft className="text-dark" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-10 flex items-center justify-center">
                <button
                  className={clsx(
                    'bg-yellow-400 hover:opacity-70 rounded-full p-2',
                    {
                      hidden: nodeData?.plan_pozo?.pozos?.length <= 3,
                    }
                  )}
                  onClick={() => scrollRight()}
                >
                  <ChevronRight className="text-dark" />
                </button>
              </div>
              <div className="absolute bottom-11 right-11 flex items-center justify-center">
                <button
                  className={clsx(
                    'bg-yellow-400 hover:opacity-70 rounded-full p-2',
                    {
                      hidden: !nodeData?.detalles_estado_diagrama?.find(
                        (item) =>
                          item?.etapa_pozo?.tipo_etapa_pozo?.id ===
                          FASE_AISLACION
                      ),
                    }
                  )}
                  onClick={() => scrollDown()}
                >
                  <ChevronUp className="text-dark" />
                </button>
              </div>
              <div className="absolute bottom-0 right-11 flex items-center justify-center">
                <button
                  className={clsx(
                    'bg-yellow-400 hover:opacity-70 rounded-full p-2',
                    {
                      hidden: !nodeData?.detalles_estado_diagrama?.find(
                        (item) =>
                          item?.etapa_pozo?.tipo_etapa_pozo_id ===
                          FASE_AISLACION
                      ),
                    }
                  )}
                  onClick={() => scrollUp()}
                >
                  <ChevronDown className="text-dark" />
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-[0.25] justify-between pt-[5.5rem] h-[705px]">
        <ControlDiagram
          isLoading={isLoadingOnFinish}
          planPozo={nodeData?.plan_pozo}
          creadoEl={nodeData?.creado_el}
          actualizadoEl={nodeData?.actualizado_el}
          toggleEditMode={toggleEditMode}
          isEditingEnabled={isEditingEnabled}
          handleUpdateDiagram={handleUpdateDiagram}
        />
      </div>
      <ModalDialog
        title={`Vas a ${compareDates(nodeData?.creado_el, nodeData?.actualizado_el) ? 'cargar' : 'actualizar'} el Diagrama de Estado. ¿Estás seguro?`}
        isOpen={showConfirmModal}
        loading={isLoadingOnFinish}
        onCancel={() => setShowConfirmModal(false)}
        onOk={async () => {
          const payload = generatePayload(
            combineLists(nodeData || []),
            edges,
            deletedEdges
          );
          await update(payload);
        }}
      />
      <ModalDialog
        title={
          compareDates(nodeData?.creado_el, nodeData?.actualizado_el)
            ? 'Se ha cargado el Diagrama de Estado correctamente.'
            : 'Se ha actualizado el Diagrama de Estado correctamente'
        }
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
      />
      <ModalDialog
        title={
          compareDates(nodeData?.creado_el, nodeData?.actualizado_el)
            ? 'Error al cargar el Diagrama de Estado'
            : 'Error al actualizar el Diagrama de Estado.'
        }
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
    </div>
  );
};

export default StateDiagram;
