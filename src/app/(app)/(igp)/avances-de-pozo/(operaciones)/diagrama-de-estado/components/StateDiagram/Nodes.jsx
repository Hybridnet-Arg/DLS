export function NodeContentWells({ section1 }) {
  return (
    <div className="p-1 bg-dark w-full rounded-lg font-bold text-[15px] text-yellow-400 py-3">
      <div className="flex flex-row justify-center items-end text-base tracking-[0.3rem]">
        {section1 && <div>{section1}</div>}
      </div>
    </div>
  );
}

export function NodeContentSteps({ section1 }) {
  return (
    <div className="flex flex-row justify-end items-center">
      {section1 && <div>{section1}</div>}
    </div>
  );
}

export function NodeContent({
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
}) {
  return (
    <div className="p-1 text-sm">
      <div className="flex flex-row justify-around items-center">
        <div className="w-1/2 pr-1 text-left">
          {section1 && <div className="pb-1">{section1}</div>}
          {section2 && (
            <div className="flex flex-row justify-center items-center bg-white text-black p-1 rounded-md font-bold">
              {section2}
            </div>
          )}
        </div>
        <div className="w-1/2 pl-1 text-left">
          {section3 && <div className="pb-1">{section3}</div>}
          {section4 && (
            <div className="flex flex-row justify-center items-center bg-white text-black p-1 rounded-md font-bold w-full">
              {section4}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between items-start pt-2">
        {section5 && <div className="pb-1">{section5}</div>}
        {section6 && (
          <div className="w-full flex flex-row justify-center items-center bg-white text-black p-1 rounded-md font-bold">
            {section6}
          </div>
        )}
      </div>
    </div>
  );
}
