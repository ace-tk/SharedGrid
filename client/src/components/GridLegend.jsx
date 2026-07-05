import React from 'react';

const GridLegend = () => (
  <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-sm bg-gray-200 border border-gray-300 flex-shrink-0"></div>
      <span className="text-sm text-gray-600 font-medium">Available</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-sm flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
      ></div>
      <span className="text-sm text-gray-600 font-medium">Claimed</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-sm bg-indigo-100 border-2 border-indigo-400 flex-shrink-0"></div>
      <span className="text-sm text-gray-600 font-medium">Click to Claim</span>
    </div>
  </div>
);

export default GridLegend;
