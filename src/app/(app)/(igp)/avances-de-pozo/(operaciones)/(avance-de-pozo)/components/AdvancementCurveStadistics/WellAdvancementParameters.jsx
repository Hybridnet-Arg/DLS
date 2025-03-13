'use client';
import BitPositionImage from '../../../../../../../../../public/static/images/avance-pozo/bit-position.png';

function BitPositionIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={60}
      viewBox="0 0 28 86"
      fill="none"
      {...props}
    >
      <path fill="#28B432" d="M0 0h28v86H0z" />
      <path stroke="#131313" strokeWidth={2} d="M14 49V0" />
      <path
        fill="#C9CCD2"
        fillRule="evenodd"
        d="m14 66-5-4.408-5-2.923 2-4.722L7.8 49h12.4l1.8 4.947 2 4.721-5 2.924L14 66Z"
        clipRule="evenodd"
        style={{ animation: 'blink 0.3s infinite' }}
      />
    </svg>
  );
}

function InfoBox({ title, value, img, icon, description }) {
  return (
    <div className="rounded-lg p-2 bg-dark flex items-center justify-between min-w-[200px] h-[60px] shadow">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="flex items-center">
          {icon && icon}
          {img && (
            <img
              src={img}
              alt={description}
              className="object-contain h-[60px]"
            />
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xs text-gray-300 m-0">{title}</p>
          <p className="text-[1rem] text-white font-medium m-0">
            <span className="me-3">{description}</span> {value} mts
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WellAdvancementParameters({
  titleBitPosition,
  valueBitPosition,
  titleHoleDepth,
  valueHoleDepth,
}) {
  return (
    <div className="flex gap-[20px] justify-center items-center p-0">
      <InfoBox
        title={titleBitPosition}
        value={valueBitPosition}
        icon={<BitPositionIcon />}
        description="BP"
      />
      <InfoBox
        title={titleHoleDepth}
        value={valueHoleDepth}
        img={BitPositionImage.src}
        description="HD"
      />
    </div>
  );
}
