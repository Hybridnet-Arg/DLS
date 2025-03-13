import { TOP_DRIVE_ELEMENTS, TOP_DRIVE_ELEMENTS_NAME } from '@/constants';

export function isSaverSub(elementoId) {
  return elementoId === TOP_DRIVE_ELEMENTS.SAVER_SUB;
}

export function getElementName(nombreElemento) {
  const washPipeElement = TOP_DRIVE_ELEMENTS_NAME[TOP_DRIVE_ELEMENTS.WASH_PIPE];
  const isWashPipe = nombreElemento === washPipeElement;

  return isWashPipe ? 'Caño lavador' : nombreElemento;
}
