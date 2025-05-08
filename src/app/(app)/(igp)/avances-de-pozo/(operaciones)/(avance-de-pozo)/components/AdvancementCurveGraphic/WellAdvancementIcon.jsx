'use client';
import { useRef, useState, useEffect } from 'react';

const MAX_TRANSLATE_Y = 370;
const MAX_TRANSLATE_X = 565;

const CURVE_START_Y = 270;
const CURVE_END_Y = MAX_TRANSLATE_Y;

const CURVE_START_X = 0;
const CURVE_END_X = 80;

const CURVE_START_PERCENT = 30;
const CURVE_END_PERCENT = 50;

function calculateCoordinatesFromPercentage(
  percentage,
  MAX_TRANSLATE = { X: MAX_TRANSLATE_X, Y: MAX_TRANSLATE_Y },
  CURVE = {
    START: { X: CURVE_START_X, Y: CURVE_START_Y },
    END: { X: CURVE_END_X, Y: CURVE_END_Y },
  }
) {
  let x, y;

  if (percentage === 0) {
    x = 0;
    y = 0;
  } else if (percentage === 100) {
    x = MAX_TRANSLATE.X;
    y = MAX_TRANSLATE.Y;
  } else if (percentage <= CURVE_START_PERCENT) {
    y = (percentage / CURVE_START_PERCENT) * CURVE.START.Y;
    x = 0;
  } else if (percentage <= CURVE_END_PERCENT) {
    const curveProgress =
      (percentage - CURVE_START_PERCENT) /
      (CURVE_END_PERCENT - CURVE_START_PERCENT);

    const controlPoint = {
      X: CURVE.START.X + (CURVE.END.X - CURVE.START.X) * 0.1,
      Y: CURVE.START.Y + (CURVE.END.Y - CURVE.START.Y) * 0.7,
    };

    const calculateCurveByCoords = (type = 'X') => {
      const baseA = (1 - curveProgress) ** 2 * CURVE.START[type];
      const baseB =
        2 * (1 - curveProgress) * curveProgress * controlPoint[type];
      const baseC = curveProgress ** 2 * CURVE.END[type];

      return baseA + baseB + baseC;
    };

    x = calculateCurveByCoords('X');
    y = calculateCurveByCoords('Y');
  } else {
    const straightProgress =
      (percentage - CURVE_END_PERCENT) / (100 - CURVE_END_PERCENT);
    y = MAX_TRANSLATE.Y;
    x = CURVE.END.X + straightProgress * (MAX_TRANSLATE.X - CURVE.END.X);
  }

  return { x, y };
}

export default function WellAdvancementIcon({
  progress = 0,
  progressNivelTrepano = 0,
  trepanLevel = 0,
  holeDepth = 0,
  maxDepth = 0,
  enProgreso = false,
  ...props
}) {
  const trepanoRef = useRef(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [bitPositionText, setBitPositionText] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const points = getPositionsHoleDepth(progress);
    let lastPoint = points[points.length - 1];

    if (progress < 39) {
      lastPoint = { x: lastPoint.x + 25, y: lastPoint.y - 5 };
    } else if (progress >= 39 && progress <= 44) {
      lastPoint = { x: lastPoint.x + 15, y: lastPoint.y - 25 };
    } else {
      lastPoint = { x: lastPoint.x - 5, y: lastPoint.y - 25 };
    }
    setTextPosition(lastPoint);
  }, [progress]);

  useEffect(() => {
    const MIN_PROGRESS = 1.5;
    const points = getPositionsHoleDepth(progressNivelTrepano);
    let lastPoint = points[points.length - 1];

    const restProgressRaw = progress - progressNivelTrepano;
    const restProgress = Math.abs(restProgressRaw);
    const isValid = restProgress <= MIN_PROGRESS;

    if (progressNivelTrepano === progress || isValid) {
      if (progressNivelTrepano < 39) {
        lastPoint = { x: lastPoint.x + 55, y: lastPoint.y - 5 };
      } else if (progressNivelTrepano >= 39 && progressNivelTrepano <= 44) {
        lastPoint = { x: lastPoint.x + 45, y: lastPoint.y - 25 };
      } else {
        lastPoint = { x: lastPoint.x - 35, y: lastPoint.y - 25 };
      }
      return setBitPositionText(lastPoint);
    }

    if (progressNivelTrepano < 39) {
      lastPoint = { x: lastPoint.x + 25, y: lastPoint.y - 5 };
    } else if (progressNivelTrepano >= 39 && progressNivelTrepano <= 44) {
      lastPoint = { x: lastPoint.x + 15, y: lastPoint.y - 25 };
    } else {
      lastPoint = { x: lastPoint.x - 5, y: lastPoint.y - 25 };
    }
    setBitPositionText(lastPoint);
  }, [progress]);

  const getTransform = (progressNivelTrepano) => {
    const translate = calculateCoordinatesFromPercentage(progressNivelTrepano);
    return `translate(${translate.x}, ${translate.y})`;
  };

  const linePath = () => {
    const INIT_X = 58.8;
    const INIT_Y = 245;

    return Array.from({ length: progressNivelTrepano + 1 }, (_, segment) => {
      const { x, y } = calculateCoordinatesFromPercentage(segment);
      return `${segment === 0 ? 'M' : 'L'}${x + INIT_X},${y + INIT_Y}`;
    }).join(' ');
  };
  const depthTraveledPath = () => {
    const INITIAL_POSITION = { X: 58.8, Y: 250 };
    const MAX_TRANSLATE = { X: 570, Y: 366 };
    const CURVE = {
      START: { X: CURVE_START_X, Y: 265 },
      END: { X: CURVE_END_X + 7, Y: MAX_TRANSLATE.Y },
    };
    const points = Array.from({ length: progress + 1 }, (_, segment) => {
      const { x, y } = calculateCoordinatesFromPercentage(
        segment,
        MAX_TRANSLATE,
        CURVE
      );
      const command = segment === 0 ? 'M' : 'L';
      return `${command}${x + INITIAL_POSITION.X},${y + INITIAL_POSITION.Y}`;
    }).join(' ');
    return points;
  };
  const getPositionsHoleDepth = (progress) => {
    const INITIAL_POSITION = { X: 58.8, Y: 250 };
    const MAX_TRANSLATE = { X: 570, Y: 366 };
    const CURVE = {
      START: { X: CURVE_START_X, Y: 265 },
      END: { X: CURVE_END_X + 7, Y: MAX_TRANSLATE.Y },
    };
    const points = Array.from({ length: progress + 1 }, (_, segment) => {
      const { x, y } = calculateCoordinatesFromPercentage(
        segment,
        MAX_TRANSLATE,
        CURVE
      );
      return { x: x + INITIAL_POSITION.X, y: y + INITIAL_POSITION.Y };
    });

    return points;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 629 627"
      width="100%"
      height="100%"
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M150.677 606.675c-35.733-10.517-80.87-38.126-82.75-99.916V250.396H51v255.048c2.508 82.168 65.197 111.749 99.05 120.294l478.95.658v-19.721H150.677Z"
        clipRule="evenodd"
        id="pozo"
      />
      <text x="635" y="620" fontSize="16" fill="white">
        {maxDepth}
      </text>
      <g transform="translate(-61, -7)" id="perforador">
        <path fill="#25303B" d="M0 232.5h71v4H0z" />
        <path
          stroke="#25303B"
          strokeWidth={2}
          d="M120 164v60 M153 32.5v164 M144 32.5v164 m-3-164v164 M150 32.5v164 M147 32.5v164"
        />
        <path
          fill="#fff"
          d="m112 9.445-2.929.095L101 196.5h3l8-187.055ZM103.461 202.027l-6.995-.113L94 257.553l6.782.094 2.679-55.62ZM137 202.027l6.995-.113 2.466 55.639-6.782.094-2.679-55.62ZM127.805 9.361l2.929.095 7.765 187.044h-3L127.805 9.361Z"
        />
        <path
          id="rueda"
          fill="#25303B"
          fillRule="evenodd"
          d="M24.034 221.469c0-4.775-3.998-8.727-9.017-8.727-4.934 0-9.017 3.87-9.017 8.727 0 3.87 2.637 7.163 6.21 8.234v-8.069h5.53v8.069c3.572-1.153 6.21-4.446 6.21-8.316l.084.082Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M17.138 229.879v-7.597h-4.244v10.601h4.244v-3.004Z"
          clipRule="evenodd"
        />
        <path fill="#fff" d="M111 9.5h20v4h-20z" />
        <circle cx={120} cy={7.5} r={7} fill="#fff" />
        <path fill="#fff" d="M58 192.5h103v29H58z" />
        <path
          fill="#fff"
          d="m46 224.5 13.947-16.564 2.295 1.932L50 224.5h-4ZM201 257.5l-41.66-49.565-2.295 1.933L197 257.5h4ZM5.5 257.5l30.16-35.565 2.294 1.933L9.5 257.5h-4Z"
        />
        <path
          fill="#fff"
          d="m35.008 221.552 15.137-.01-.008 3-15.13.018v-3.008Z"
        />
        <path
          stroke="#25303B"
          strokeWidth={0.756}
          d="M124 7.5V106M116 7.5v99M116 7 6.5 219.742"
        />
        <path stroke="#25303B" d="M120 11.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
        <path fill="#fff" d="M105 68.5h51v19h-51z" />
        <path fill="#F5D92F" d="M105 68.5h51v3h-51z" />
        <path fill="#8FBFE7" d="M105 84.5h51v3h-51z" />
        <path fill="#F5D92F" d="M58 192.5h103v3H58z" />
        <path fill="#8FBFE7" d="M58 218.5h103v3H58z" />
        <path fill="#25303B" d="M3 236.5h2v21H3zM66 236.5h2v21h-2z" />
        <g filter="url(#a)">
          <g
            fill="#8FBFE7"
            fillRule="evenodd"
            clipRule="evenodd"
            filter="url(#b)"
          >
            <path d="m87.318 215.085-4.671-1.672-4.626 1.672v-17.297h9.297v17.297Zm.236-17.585h-9.78v18l4.862-1.741 4.907 1.741v-18h.011Z" />
            <path d="m82.648 213.079 4.434 1.614v-16.616H78.27v16.616l4.379-1.614Z" />
          </g>
          <path
            fill="#FED400"
            d="M82.82 209.723c3.768 0 6.822-1.503 6.822-3.356s-3.054-3.355-6.821-3.355S76 204.514 76 206.367s3.054 3.356 6.82 3.356Z"
          />
          <path
            fill="#404851"
            fillRule="evenodd"
            d="M82.844 209.435c-3.602 0-6.528-1.373-6.528-3.068s2.926-3.067 6.528-3.067c3.602 0 6.528 1.372 6.528 3.067s-2.927 3.068-6.528 3.068Zm6.81-3.068c0-1.856-3.05-3.355-6.822-3.355-3.77 0-6.82 1.499-6.82 3.355 0 1.857 3.05 3.356 6.82 3.356 3.771 0 6.821-1.499 6.821-3.356Z"
            clipRule="evenodd"
          />
          <path
            fill="#404851"
            fillRule="evenodd"
            d="M82.856 209.227c-3.444 0-6.246-1.28-6.246-2.848 0-1.568 2.79-2.848 6.246-2.848 3.445 0 6.247 1.28 6.247 2.848 0 1.568-2.791 2.848-6.247 2.848Zm-6.337-2.848c0 1.614 2.837 2.917 6.337 2.917 3.5 0 6.337-1.303 6.337-2.917 0-1.615-2.836-2.918-6.337-2.918-3.5 0-6.337 1.303-6.337 2.918Z"
            clipRule="evenodd"
          />
          <path
            fill="#404850"
            d="M79.14 207.728v-.173h.034c.124-.012.203-.035.225-.058.023-.034.034-.127.034-.288v-1.649c0-.161-.011-.265-.034-.288-.022-.035-.1-.058-.225-.069h-.033v-.173H80.57c.428 0 .754.115.99.334.226.219.338.542.338.957 0 .427-.112.773-.349 1.026-.236.254-.54.381-.934.381h-1.474Zm.867-2.525v1.994c0 .15.023.243.068.277.045.035.157.058.326.058.293 0 .518-.104.664-.3.147-.207.225-.507.225-.911 0-.403-.078-.692-.247-.865-.169-.173-.44-.253-.833-.253h-.203Zm4.255 2.525h-2.116v-.173h.034c.123-.012.202-.035.225-.058.022-.034.034-.127.034-.288v-1.649c0-.161-.012-.265-.034-.288-.023-.035-.102-.058-.225-.069h-.034v-.173h1.16v.173h-.035c-.123.011-.202.034-.225.069-.022.034-.034.127-.034.288v1.649c0 .208.023.311.068.323.034.011.135.011.293.011h.236c.09 0 .18 0 .27-.011.045 0 .146-.023.158-.046.022-.046.067-.312.078-.392h.136v.645l.01-.011Zm.214-.104v-.53h.135c.056.276.056.346.146.415.113.092.338.115.484.115a.461.461 0 0 0 .349-.138.476.476 0 0 0 .135-.346.425.425 0 0 0-.079-.277c-.056-.069-.157-.138-.304-.231l-.18-.103c-.461-.254-.686-.519-.686-.808 0-.23.079-.415.247-.553.17-.138.383-.208.664-.208.214 0 .462.035.732.116v.542h-.124c0-.093-.056-.3-.124-.369-.09-.093-.315-.116-.45-.116a.453.453 0 0 0-.304.127.433.433 0 0 0-.124.312c0 .092.023.173.08.23.056.069.157.139.303.219l.18.104c.27.15.45.288.552.404a.642.642 0 0 1 .146.438c0 .242-.09.438-.281.588-.192.15-.44.219-.754.219-.225 0-.484-.104-.766-.161l.023.011Z"
          />
        </g>
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M114.009 208.87c.024-.353.484-1.642.611-2.06.199-.655.465-1.363.616-2.012.137.148.611 1.823.673 2.021.119.38.593 1.746.611 2.051h-.75l.012.919h2.928l.003-.919c-.377 0-.448-.089-.546-.418l-.684-2.116c-.302-.919-.673-1.911-.928-2.836h-2.596c-.267.922-.604 1.909-.916 2.833-.163.486-.293.925-.465 1.417-.332.954-.201 1.123-.762 1.123l.012.919h2.908l.003-.919h-.732l.002-.003ZM126.938 208.968v.889h2.478v-.898l-.436-.006.015-2.537c.267-.083.646-.154.934-.106.343.053.379.302.376.652-.003.548-.015 1.464-.018 2.003h-.412l.015.898h2.457l.003-.898c-.59 0-.439-.193-.439-1.565 0-1.079.306-2.584-1.612-2.297-.797.119-1.126.489-1.319.623-.011-.448-.014-1.568-.026-1.983-.003-.089-.11-.163-.148-.16-.418.003-1.473.009-1.951.009l.015.951c.261 0 .309-.012.466.11.091.311.071 4.001-.015 4.25-.145.068-.181.05-.383.068v-.003Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M133.964 206.915c.05-.51.234-.955.753-.984.61-.033.696.462.756.984h-1.509Zm2.848 2.498.009-.969-.874.009c-.125.18-.234.281-.537.373-.708.213-1.428-.071-1.455-1.07h3.044c.077-1.491-.267-2.489-1.615-2.726-1.414-.249-2.466.355-2.869 1.339-.4.972-.261 2.507.797 3.139.877.524 2.682.468 3.503-.095h-.003ZM126.651 208.422c-.343 0-.548.003-.776.009-.492.759-1.663.652-1.781-.601-.092-.961.157-2.03 1.176-1.79.391.092.513.323.566.426h.83l-.006-1.25c-2.16-.646-4.264-.048-4.226 2.311.03 1.85 1.366 2.451 2.922 2.318.673-.027.863-.16 1.316-.391 0-.267-.024-.735-.021-1.029v-.003Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M118.855 206.016c.326.015.525-.077.525.371 0 .415.047 2.142-.05 2.424-.19.074-.237.059-.454.059l.012.919 2.691-.009.003-.907-.602-.006v-2.409c.706-.225.821-.217 1.541-.205 0-.257-.005-.942-.005-1.203-.907-.21-1.302.403-1.53.62-.071-.285-.047-.611-.4-.611-.409 0-1.351.03-1.728.027v.924l-.003.006ZM98.073 208.002c.566-.092.762.024.762.616 0 .552-.205.729-.76.608v-1.224h-.002Zm.234 2.498v-.391l-.267-.003.003-.513c.294.214.954.155 1.25-.074.235-.18.377-.643.36-1.072-.054-1.296-1.162-1.251-1.55-.786-.01-.009-.015-.024-.021-.032l-.054-.092c-.083-.134-.068-.128-.376-.125-.213.003-.424.003-.649 0-.003.145 0 .35-.003.483.151 0 .24-.003.255.068l-.006 2.057c-.03.074-.039.08-.246.08v.397h1.301l.003.003ZM100.602 209.303c-.157-.113-.261-.62.498-.463 0 .193.044.38-.077.472-.116.089-.308.097-.421-.009Zm1.503.521-.003-.474h-.279c-.074-1.037.519-2.46-1.938-1.784l-.006.581c.112 0 .228.003.308-.003.089-.08.474-.323.892-.077.101.089.098.264.053.364-.693-.011-1.52-.044-1.416.824.083.697 1.061.744 1.425.329.199.282.555.305.961.234l.003.006ZM107.207 208.751c-.071-1.052.842-1.138.922-.263.095 1.031-.866 1.111-.922.263Zm-.815.089c.228 1.447 2.807 1.328 2.537-.468-.222-1.494-2.816-1.286-2.537.468Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M110.023 207.895c.143 0 .243.006.409.003l.003-.483c-.151 0-.243.003-.382 0 .003-.32.127-.329.427-.329l-.015-.438c-.237-.119-.661-.089-.889.014-.291.134-.332.362-.332.75h-.231l.003.483h.231v.898c.021.714.024.531-.243.569l.009.427 1.333.003.003-.471c-.444-.003-.323-.323-.323-1.426h-.003ZM105.146 207.898c.145-.003.21 0 .429 0v-.483h-.414l-.003-.628-.81-.006v.634h-.243l.003.483h.24c0 .341-.047 1.337.054 1.586.178.444.969.382 1.194.257v-.4c-.477-.103-.462.163-.45-1.443ZM137.168 206.016c.326.015.525-.077.525.371 0 .415.047 2.142-.051 2.424-.19.074-.237.059-.453.059l.012.919 2.691-.009.002-.907-.601-.006v-2.409c.705-.225.821-.217 1.541-.205 0-.257-.006-.942-.006-1.203-.907-.21-1.301.403-1.529.62-.071-.285-.048-.611-.4-.611-.409 0-1.352.03-1.728.027v.924l-.003.006ZM102.136 207.933c.163.009.264-.038.264.187 0 .211.029 1.058-.021 1.2-.095.039-.125.033-.234.033l.006.48 1.354-.003v-.456l-.302-.003v-1.215c.355-.113.412-.11.776-.104l-.003-.608c-.456-.106-.655.202-.77.315-.036-.143-.024-.309-.202-.309-.204 0-.682.015-.871.015v.465l.003.003Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          stroke="#25303B"
          strokeWidth={0.033}
          d="m117.314 116.694 2.874 1.023 3.1-1.023 2.994-8.456-2.99-4.221H117.309l-2.99 4.221 2.995 8.456Z"
        />
        <path
          fill="#25303B"
          d="M114.301 131.47h12v5.06h-12zM117.07 136.53h6.461v3.614h-6.461zM117.07 140.145h.923v18.795h-.923zM122.609 140.145h.923v18.795h-.923z"
        />
        <path
          fill="#25303B"
          d="m118.035 121.335 1.268.194-2.649 10.614-1.268-.195z"
        />
        <path
          fill="#25303B"
          d="M122.608 121.711c0-.238-.06-.473-.176-.692a1.846 1.846 0 0 0-.5-.586 2.44 2.44 0 0 0-.749-.392 2.866 2.866 0 0 0-.883-.138c-.303 0-.603.047-.883.138-.28.091-.535.224-.749.392a1.846 1.846 0 0 0-.5.586 1.473 1.473 0 0 0-.176.692h1.266a.67.67 0 0 1 .079-.313.831.831 0 0 1 .226-.265 1.12 1.12 0 0 1 .338-.176 1.296 1.296 0 0 1 .798 0c.126.041.241.101.338.176a.844.844 0 0 1 .226.265.67.67 0 0 1 .079.313h1.266ZM115.223 131.47l2.307-9.398h-2.307v9.398Z"
        />
        <path
          fill="#25303B"
          d="m122.609 121.35-1.268.194 2.649 10.614 1.268-.195zM125.469 131.484l-2.308-9.397h2.308v9.397ZM123.531 131.47h-6.461l1.846-7.229h2.769l1.846 7.229ZM118.918 140.145h2.769v11.566h-2.769zM115.223 117.735h10.154v1.446h-10.154zM116.148 119.181h.923v2.892h-.923z"
        />
        <path
          fill="#25303B"
          d="M123.531 119.181h.923v2.892h-.923zM116.609 158.217h1.846v2.892h-1.846zM122.148 158.217h1.846v2.892h-1.846z"
        />
        <path fill="#25303B" d="M116.148 161.108h8.308V164h-8.308z" />
        <defs id="sombra_logo_dls_archer">
          <filter
            id="a"
            width={23.652}
            height={28}
            x={73}
            y={197.5}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={2} dy={5} />
            <feGaussianBlur stdDeviation={2.5} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_8451_27756"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_8451_27756"
              result="shape"
            />
          </filter>
          <filter
            id="b"
            width={10.46}
            height={18.679}
            x={77.434}
            y={197.16}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation={0.17} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_8451_27756"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_8451_27756"
              result="shape"
            />
          </filter>
        </defs>
      </g>
      <path
        stroke="#25303B"
        strokeWidth={1.8}
        d="M58.645 212v33"
        id="guia-trepano"
      />
      <path
        fill="none"
        stroke="#27B433"
        strokeWidth={18}
        d={depthTraveledPath()}
        id="profundidad-trepano"
      />
      <path
        fill="none"
        stroke="#000"
        strokeWidth={1.8}
        d={linePath()}
        id="linea-seguidora"
      />
      <path
        ref={trepanoRef}
        fill="#373435"
        fillRule="evenodd"
        stroke="#373435"
        strokeWidth={0.378}
        transform={getTransform(progressNivelTrepano)}
        d="m59.056 250.281-3.184-2.774-3.184-1.84 1.273-2.971 1.147-3.113h7.897l1.147 3.113 1.274 2.971-3.185 1.84-3.184 2.774Z"
        clipRule="evenodd"
        id="trepano"
        style={{ animation: enProgreso ? 'blink 0.3s infinite' : 'none' }}
      />
      <text
        x={bitPositionText.x}
        y={bitPositionText.y}
        fill="#fff"
        fontSize="17"
        fontWeight="bold"
        alignmentBaseline="middle"
      >
        BP
      </text>
      <text
        x={textPosition.x}
        y={textPosition.y}
        fill="#fff"
        fontSize="17"
        fontWeight="bold"
        alignmentBaseline="middle"
      >
        HD
      </text>
    </svg>
  );
}
