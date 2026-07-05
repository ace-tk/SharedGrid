import React from 'react';
import GridCell from './GridCell';

const Grid = ({ blocks, onCellClick }) => (
  <div className="w-full overflow-x-auto">
    <div className="min-w-[320px] max-w-4xl mx-auto">
      <div
        className="grid gap-[2px] p-3 bg-white rounded-2xl shadow-md border border-gray-100"
        style={{
          gridTemplateColumns: 'repeat(30, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(30, minmax(0, 1fr))',
          aspectRatio: '1 / 1',
        }}
      >
        {blocks.map((block) => (
          <GridCell key={block.id} block={block} onClick={() => onCellClick(block)} />
        ))}
      </div>
    </div>
  </div>
);

export default Grid;
