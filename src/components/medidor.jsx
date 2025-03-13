import clsx from 'clsx';

export default function Medidor({
  value = 0,
  maxValue = 0,
  minValue = 0,
  progress = 0,
  disabled = false,
  children = null,
}) {
  return (
    <div className="relative w-full mt-5">
      {children}
      <div className="flex flex-col justify-center items-end mb-[2rem]">
        {parseFloat(progress) >= 67 && (
          <div className="flex flex-col justify-center items-end bg-[#D03F49] rounded-s rounded-e p-1 text-white">
            {parseFloat(progress) >= 98 ? (
              <>🚨 Urgente: ¡Debe cortar el cable ahora!</>
            ) : parseFloat(progress) >= 90 ? (
              <>⚠️ Atención: Es momento de realizar el corte.</>
            ) : (
              <>⏳ Recuerde: El corte debe realizarse pronto.</>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-1">
        <div
          className={clsx('flex-1 p-[0.72rem] rounded-s bg-[#52B358]', {
            'bg-backgroundGray': disabled,
          })}
        ></div>
        <div
          className={clsx('flex-1 p-[0.72rem] bg-[#F4DD48]', {
            'bg-backgroundGray': disabled,
          })}
        ></div>
        <div
          className={clsx('flex-1 p-[0.72rem] rounded-e bg-[#D03F49]', {
            'bg-backgroundGray': disabled,
          })}
        ></div>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-light mt-1">{minValue}</p>
        <p className="text-sm font-light mt-1">{maxValue}</p>
      </div>
      <div
        className="absolute bottom-12 left-0 flex flex-col items-center"
        style={{
          left: progress ?? 0,
          transform: 'translateX(-50%)',
        }}
      >
        <span className="text-xs mb-1 font-semibold">{value}</span>
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}
