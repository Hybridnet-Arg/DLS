import React from 'react';

export const SkeletonRow = () => {
  return (
    <div className="animate-pulse flex justify-between items-center ps-5 py-1 border-b-2 border-backgroundGray">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
      <div className="flex gap-2 me-2">
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
