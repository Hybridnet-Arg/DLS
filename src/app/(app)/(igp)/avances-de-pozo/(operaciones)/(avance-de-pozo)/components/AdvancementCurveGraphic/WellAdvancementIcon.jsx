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
      <text x="635" y="620" font-size="16" fill="white">
        {maxDepth}
      </text>
      <>
        {/* <path fill="#28B432" d="M51 250.396h17v100H51v-100Z" /> */}
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M27.864 222.816h29.612v-7.007H.355v7.007h27.509ZM60.281 215.809v7.007h57.909v-7.007H60.281ZM29.617 215.031 53.972 11.579h-6.57L18.577 215.03h11.039ZM65.356 14.011l24.092 201.02h10.6L76.832 51.569 65.356 14.01Z"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M65.367 14.011 76.843 51.57l-5.694-39.99h-6.57l.788 2.432ZM62.82 11.58V6.13c-.176 2.14-1.753 3.893-3.768 3.893-2.015 0-3.68-1.85-3.767-4.088v5.742h7.535v-.097Z"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          d="M58.887 8.435a2.636 2.636 0 1 0 0-5.273 2.636 2.636 0 0 0 0 5.273Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M64.57 11.579h10.338V0H43.457v11.579h11.74V5.74c0-2.336 1.664-4.184 3.767-4.184 2.102 0 3.767 1.848 3.767 4.184l1.752 5.838h.088Z"
          clipRule="evenodd"
        />
        <path
          stroke="#373435"
          strokeWidth={0.756}
          d="M55.285 5.74v71.418M62.82 6.032V77.45"
        />
        <path
          stroke="#25303B"
          strokeWidth={0.756}
          d="m62.82 5.74 59.117 195.127"
        />
        <path
          fill="#25303B"
          stroke="#25303B"
          strokeWidth={0.046}
          d="m55.825 99.458.058-.041h-.136v-5.014h6.087l.087 5.134v.012l.01.007 1.48.966v1.35c.022 2.214-.022 3.538-.11 4.326-.043.394-.098.652-.16.819-.062.168-.13.241-.198.27-.07.031-.145.02-.23.004a.57.57 0 0 0-.27-.009c-.096.025-.188.096-.275.25-.086.153-.17.391-.246.757v21.485h-6.087v-20.799c0-.512-.03-.859-.083-1.095-.052-.237-.127-.366-.22-.438-.093-.071-.2-.082-.305-.091l-.01-.001c-.102-.009-.204-.017-.303-.074-.1-.057-.201-.166-.291-.385-.09-.219-.17-.547-.23-1.039-.118-.982-.157-2.613-.048-5.33l1.48-1.064ZM58.967 86.476H57.4L54.26 82.21l-.088-2.717v-2.71l2.699-1.353H61.589l2.261 1.352v5.428l-3.23 4.266h-1.653ZM58.184 88.467l.016-.005v-1.648H59.73V88.46l.015.006c1.13.386 2 1.544 2 2.995 0 .867-.346 1.733-.95 2.313h-3.749c-.604-.58-.95-1.35-.95-2.313 0-1.45.87-2.61 2.087-2.995Zm2.206 2.995c0-.985-.71-1.678-1.512-1.678-.892 0-1.513.792-1.513 1.678 0 .984.71 1.677 1.513 1.677.892 0 1.512-.792 1.512-1.677Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M28.477 223.496H17.44l-4.244 26.662h12.458l2.824-26.662ZM90.418 223.593l11.126.097 3.649 26.468h-11.5l-3.275-26.565Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M122.999 203.764c0-4.775-3.998-8.727-9.017-8.727-4.934 0-9.017 3.87-9.017 8.727 0 3.87 2.637 7.163 6.21 8.234v-8.069h5.529v8.069c3.573-1.153 6.21-4.446 6.21-8.316l.085.082Z"
          clipRule="evenodd"
        />
        <path
          fill="#25303B"
          fillRule="evenodd"
          d="M116.107 212.174v-7.597h-4.244V215.177h4.244v-3.003Z"
          clipRule="evenodd"
        />
        <path
          stroke="#373435"
          strokeWidth={0.756}
          d="M58.886 9.49a3.69 3.69 0 1 0 .002-7.382 3.69 3.69 0 0 0-.002 7.381Z"
        />
      </>
      <path
        stroke="#25303B"
        strokeWidth={0.756}
        d="M58.645 120v130"
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
        strokeWidth={1}
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
        style={{ animation: 'blink 0.3s infinite' }}
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
