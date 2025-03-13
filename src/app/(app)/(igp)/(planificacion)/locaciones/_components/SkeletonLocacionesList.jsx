import React from 'react';

export const SkeletonLocacionesList = () => {
  return (
    <>
      {[...Array(2)].map((_, index) => (
        <div
          key={`skeleton-list-${index}`}
          className="w-1/2 mb-6 h-full flex flex-col"
        >
          <div className="animate-pulse h-6 bg-backgroundGray rounded w-32 mb-2"></div>
          <div className="bg-white rounded-md h-[300px]">
            {[...Array(5)].map((_, idx) => (
              <div
                key={`skeleton-row-${idx}`}
                className="animate-pulse flex justify-between items-center ps-5 py-1 border-b-2 border-backgroundGray"
              >
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="flex gap-2 me-2">
                  <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
