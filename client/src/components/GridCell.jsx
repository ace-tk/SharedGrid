import React from 'react';

const GridCell = ({ block, onClick }) => {
  const { claimed, owner_name, owner_color } = block;

  const tooltip = claimed
    ? `Claimed by ${owner_name || 'Unknown'}`
    : 'Available — click to claim';

  return (
    <div
      onClick={!claimed ? onClick : undefined}
      title={tooltip}
      style={claimed && owner_color ? { backgroundColor: owner_color } : {}}
      className={`
        flex items-center justify-center
        w-full h-full aspect-square
        rounded-[2px] text-[7px] sm:text-[9px]
        font-semibold overflow-hidden select-none
        transition-all duration-300 ease-in-out
        ${claimed
          ? 'text-white shadow-sm cursor-not-allowed scale-100'
          : 'bg-gray-200 hover:bg-indigo-100 hover:border hover:border-indigo-300 text-transparent cursor-pointer hover:scale-110 hover:z-10 hover:shadow-md'
        }
      `}
    >
      {claimed && owner_name ? (
        <span
          className="truncate px-[1px] text-white font-bold"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
          title={owner_name}
        >
          {owner_name}
        </span>
      ) : null}
    </div>
  );
};

export default GridCell;
