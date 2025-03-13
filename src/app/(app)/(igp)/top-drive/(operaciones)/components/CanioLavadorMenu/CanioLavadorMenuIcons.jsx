import { usePlanPozoStore } from '@/store/planPozo.store';

function getColorByState(currentValue, totalValue, selected) {
  const typeState = {
    1: '#52B358',
    2: '#F4DD48',
    3: '#D03F49',
    4: 'gray',
    5: 'white',
  };
  const STATES_LENGTH = 3;
  const STATE_SIZE = totalValue / STATES_LENGTH;

  const planPozo = usePlanPozoStore.getState().planPozo;
  if (!planPozo?.id) return typeState[4];

  if (!currentValue && selected) return typeState[5];
  else if (!currentValue) return typeState[4];

  if (currentValue == 0) return typeState[1];

  for (let state = 1; state <= STATES_LENGTH; state++) {
    const initState = STATE_SIZE * (state - 1);
    const endState = STATE_SIZE * state;

    if (currentValue > initState && currentValue <= endState) {
      return typeState[state];
    } else if (currentValue >= totalValue) {
      return typeState[3];
    }
  }

  return typeState[4];
}
function DropShadowFilter() {
  return (
    <filter id="dropshadow" height="100%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feFlood floodColor="rgb(255, 255, 255)" result="color" />
      <feComposite in2="offsetblur" operator="in" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="1" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export function UpperIBOPIcon({
  selected = false,
  hours = 0,
  maxHours = 0,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={82}
      fill="none"
      {...props}
    >
      <DropShadowFilter />
      <path
        fill={getColorByState(hours, maxHours, selected)}
        fillRule="evenodd"
        d="M0 21.466v59.798h31.868V21.466h-1.77v-3.067h1.77V0H0v18.4h1.77v3.066H0Z"
        clipRule="evenodd"
        opacity={selected ? 1 : 0.7}
        filter={`${selected ? 'url(#dropshadow)' : ''}`}
      />
    </svg>
  );
}

export function WashPipeIcon({
  selected = false,
  hours = 0,
  maxHours = 0,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={83}
      height={149}
      fill="none"
      {...props}
    >
      <DropShadowFilter />
      <path
        fill={getColorByState(hours, maxHours, selected)}
        fillRule="evenodd"
        d="M63.602 81.198V60.222h3.5V39.246h5.252v41.952h-9.336.584ZM.584 86.612h1.75v3.383h2.334v6.09h2.918v-6.09H9.92v-3.383h5.835v4.736H13.42v8.797h2.918v14.886h-9.92v13.533H9.92l4.084 6.766v12.857h53.682V135.33l5.252-6.766h4.084v-13.533h-9.92v-14.886h2.918v-8.797h-2.334v-4.736h5.252v3.383h2.334v6.09h2.917v-6.09h2.334v-3.383h2.334v-5.414H79.94V39.246h2.334v-7.443h-5.252V18.27h-4.084l-5.252-6.767V0H14.004v11.503L9.92 18.27H6.419v13.533H.584v7.443h1.75v41.952H0v5.414h.584Zm19.255-26.39v20.976h-9.92V39.246h6.419v20.976h3.501Z"
        clipRule="evenodd"
        opacity={selected ? 1 : 0.7}
        filter={`${selected ? 'url(#dropshadow)' : ''}`}
      />
    </svg>
  );
}

export function LowerIBOPIcon({
  selected = false,
  hours = 0,
  maxHours = 0,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={91}
      fill="none"
      {...props}
    >
      <DropShadowFilter />
      <path
        fill={getColorByState(hours, maxHours, selected)}
        fillRule="evenodd"
        d="M26.557 8.41 23.104 0H8.852l-3.54 8.41L0 11.774v79.05h31.868v-79.05L26.557 8.41Z"
        clipRule="evenodd"
        opacity={selected ? 1 : 0.7}
        filter={`${selected ? 'url(#dropshadow)' : ''}`}
      />
    </svg>
  );
}

export function SaverSupIcon({
  selected = false,
  hours = 0,
  maxHours = 0,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={50}
      fill="none"
      {...props}
    >
      <DropShadowFilter />
      <path
        fill={getColorByState(hours, maxHours, selected)}
        fillRule="evenodd"
        d="M30.275 36.143V16.867h-2.752v-3.615h2.752L24.77 0H5.505L0 13.252h2.752v3.615H0v19.276l5.505 2.41 2.752 10.843h13.761l2.752-10.843 5.505-2.41Z"
        clipRule="evenodd"
        opacity={selected ? 1 : 0.7}
        filter={`${selected ? 'url(#dropshadow)' : ''}`}
      />
    </svg>
  );
}
