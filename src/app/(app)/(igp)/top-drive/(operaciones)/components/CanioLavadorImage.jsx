import Image from 'next/image';

const TOP_DRIVE_ELEMENTS_IMG_NAME = {
  'Lower IBOP': 'lower-ibop',
  'Upper IBOP': 'upper-ibop',
  'Saver Sub': 'saver-sub',
  WashPipe: 'wash-pipe',
};

const TOP_DRIVE_STATES = {
  1: 'success',
  2: 'warning',
  3: 'danger',
  4: 'none',
};

function getStateType(currentValue, totalValue) {
  const STATES_LENGTH = 3;
  const STATE_SIZE = totalValue / STATES_LENGTH;

  if (currentValue == 0) return TOP_DRIVE_STATES[1];
  if (!currentValue) return TOP_DRIVE_STATES[4];

  for (let state = 1; state <= STATES_LENGTH; state++) {
    const initState = STATE_SIZE * (state - 1);
    const endState = STATE_SIZE * state;

    if (currentValue > initState && currentValue <= endState) {
      return TOP_DRIVE_STATES[state];
    } else if (currentValue >= totalValue) {
      return TOP_DRIVE_STATES[3];
    }
  }

  return TOP_DRIVE_STATES[4];
}

export default function CanioLavadorImage({
  elemento,
  elementos_deposito,
  width = 100,
  height = 100,
}) {
  const getImage = () => {
    const elementName = TOP_DRIVE_ELEMENTS_IMG_NAME?.[elemento?.nombre];
    const maxHours = elemento?.tipo_elemento?.horas_hasta;
    const hours = elementos_deposito?.horas_en_uso;

    const type = getStateType(hours, maxHours);
    return `/static/images/top-drive/${elementName}/${elementName}-${type}.png`;
  };

  return (
    <Image
      alt="top-drive"
      width={width}
      height={height}
      src={getImage()}
      unoptimized
    />
  );
}
