import React from 'react';
import GridCell from './GridCell';

const Grid = ({ blocks }) => {
  return (
    <div 
      className="grid gap-[2px] p-2 bg-white rounded-lg shadow-inner max-w-4xl mx-auto w-full aspect-square"
      style={{
        gridTemplateColumns: 'repeat(30, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(30, minmax(0, 1fr))'
      }}
    >
      {blocks.map((block) => (
        <GridCell key={block.id} block={block} />
      ))}
    </div>
  );
};

export default Grid;
