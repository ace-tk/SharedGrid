import React from 'react';

const GridCell = ({ block }) => {
  const { claimed, owner_name } = block;

  return (
    <div
      className={`
        flex items-center justify-center 
        w-full h-full aspect-square 
        rounded-[2px] text-[8px] sm:text-[10px] 
        font-medium overflow-hidden select-none 
        cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-md
        ${claimed ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-200 hover:bg-gray-300 text-transparent'}
      `}
    >
      {claimed && owner_name ? (
        <span className="truncate px-1">{owner_name}</span>
      ) : null}
    </div>
  );
};

export default GridCell;
