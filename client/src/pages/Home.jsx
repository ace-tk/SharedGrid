import React from 'react';
import { useSocket } from '../hooks/useSocket';

function Home() {
  const { isConnected, isReconnecting, onlineUsers } = useSocket();

  let statusDisplay;
  if (isReconnecting) {
    statusDisplay = <p className="text-xl font-medium text-yellow-600 mb-2">🟡 Reconnecting...</p>;
  } else if (isConnected) {
    statusDisplay = <p className="text-xl font-medium text-green-600 mb-2">🟢 Connected</p>;
  } else {
    statusDisplay = <p className="text-xl font-medium text-red-600 mb-2">🔴 Disconnected</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <h1 className="text-5xl font-extrabold mb-6 text-indigo-600 tracking-tight">SharedGrid</h1>
      {statusDisplay}
      <p className="text-2xl text-gray-800 font-semibold mb-6">Online Users: {onlineUsers}</p>
      <p className="text-xl text-gray-600 font-medium">Real-Time Collaborative Block Claiming Platform</p>
    </div>
  );
}

export default Home;
