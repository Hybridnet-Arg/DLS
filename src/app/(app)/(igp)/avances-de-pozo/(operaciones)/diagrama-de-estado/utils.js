import { Position } from '@xyflow/react';

function getNodeCenter(node) {
  return {
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
  };
}

function getParams(nodeA, nodeB) {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position;

  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

function getHandleCoordsByPosition(node, handlePosition) {
  const handle = node.internals.handleBounds.source.find(
    (h) => h.position === handlePosition
  );

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

export function getEdgeParams(source, target) {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}

/**
 * Calcula el porcentaje de profundidad dentro de una etapa.
 * @param {Object} etapa - El objeto de la etapa.
 * @param {number} profundidad - El nivel de profundidad a calcular.
 * @returns {number} El porcentaje de profundidad dentro de la etapa, o 0 si no está dentro del rango.
 */
export function isStepFinished(etapa, profundidad) {
  if (!etapa || !profundidad) return false;
  const hasta = parseFloat(etapa?.profundidad_hasta);
  return profundidad > hasta;
}

export function isStepActive(etapa, profundidad) {
  if (!etapa || !profundidad) return false;
  const desde = parseFloat(etapa?.profundidad_desde);
  const hasta = parseFloat(etapa?.profundidad_hasta);
  if (profundidad >= desde && profundidad <= hasta) {
    return true;
  }
  return false;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function compareDates(d1, d2) {
  const dateParse1 = new Date(d1);
  const dateParse2 = new Date(d2);
  return dateParse1.getTime() === dateParse2.getTime();
}
