import React from 'react';

const ConnectionBadge = ({ isConnected, isReconnecting }) => {
  if (isReconnecting) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
        Reconnecting…
      </span>
    );
  }
  if (isConnected) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
      Disconnected
    </span>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="flex flex-col items-center px-4 py-2">
    <span className={`text-xl font-bold ${color}`}>{value}</span>
    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{label}</span>
  </div>
);

const Header = ({ isConnected, isReconnecting, onlineUsers, totalBlocks, claimedBlocks, availableBlocks }) => (
  <header className="w-full bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight leading-none">
            SharedGrid
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Real-Time Collaborative Block Claiming Platform</p>
        </div>
        <div className="flex items-center gap-3">
          <ConnectionBadge isConnected={isConnected} isReconnecting={isReconnecting} />
          <span className="text-sm text-gray-600 font-medium">
            👥 {onlineUsers} online
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-center sm:justify-start divide-x divide-gray-200 bg-gray-50 rounded-xl border border-gray-200 w-full sm:w-auto overflow-x-auto">
        <StatCard label="Total Blocks" value={totalBlocks} color="text-gray-800" />
        <StatCard label="Claimed" value={claimedBlocks} color="text-indigo-600" />
        <StatCard label="Available" value={availableBlocks} color="text-emerald-600" />
      </div>
    </div>
  </header>
);

export default Header;
