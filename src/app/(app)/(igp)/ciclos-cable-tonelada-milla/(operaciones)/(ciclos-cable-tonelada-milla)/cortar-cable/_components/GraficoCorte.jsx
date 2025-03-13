import { formatCurrency } from '@/utils/formatters/currency.formatter';

function ArrowDown({ progress, progressValue }) {
  return (
    <div
      className="absolute bottom-5 left-0 flex flex-col items-center"
      style={{
        left: progress,
        transform: 'translateX(-50%)',
      }}
    >
      <span className="text-base mb-1 font-semibold">
        {formatCurrency(progressValue)} ton.mill
      </span>
      <div
        id="down-arrow"
        className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"
      ></div>
    </div>
  );
}

export default function GraficoCorte({
  progress = '0%',
  progressValue = 0,
  tm = 0,
}) {
  return (
    <div className="grid grid-cols-8 gap-3 items-center">
      <div className="space-y-3">
        <h2 className="font-medium col-span-1">
          Toneladas/millas <br /> del tramo actual
        </h2>
      </div>
      <div className="col-span-6 space-y-10">
        <div className="relative bg-gradient-to-r from-green-500 via-yellow-300 to-red-500 py-[9px]">
          <ArrowDown progress={progress} progressValue={progressValue} />
        </div>
      </div>
      <div className="col-span-1 space-y-9">
        <div className="text-[0.95rem] font-semibold">
          {formatCurrency(tm)} ton.mill
        </div>
      </div>
    </div>
  );
}
