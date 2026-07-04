import React from 'react';

const GridCell = ({ block, onClick }) => {
  const { claimed, owner_name, owner_color } = block;

  return (
    <div
      onClick={!claimed ? onClick : undefined}
      style={claimed && owner_color ? { backgroundColor: owner_color } : {}}
      className={`
        flex items-center justify-center 
        w-full h-full aspect-square 
        rounded-[2px] text-[8px] sm:text-[10px] 
        font-medium overflow-hidden select-none 
        transition-all duration-200 
        ${claimed 
          ? 'text-white shadow-sm cursor-default' 
          : 'bg-gray-200 hover:bg-gray-300 text-transparent cursor-pointer hover:scale-110 hover:z-10 hover:shadow-md'
        }
      `}
    >
      {claimed && owner_name ? (
        <span className="truncate px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-white" title={owner_name}>{owner_name}</span>
      ) : null}
    </div>
  );
};

export default GridCell;
