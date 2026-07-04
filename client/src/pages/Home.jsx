import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import Grid from '../components/Grid';
import { fetchGrid } from '../services/grid.api';

function Home() {
  const { isConnected, isReconnecting, onlineUsers } = useSocket();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGrid = async () => {
      try {
        setLoading(true);
        const data = await fetchGrid();
        if (data.success) {
          setBlocks(data.blocks);
        } else {
          setError('Failed to load grid data.');
        }
      } catch (err) {
        setError('Unable to load grid.');
      } finally {
        setLoading(false);
      }
    };

    loadGrid();
  }, []);

  let statusDisplay;
  if (isReconnecting) {
    statusDisplay = <p className="text-sm font-medium text-yellow-600 mb-2">🟡 Reconnecting...</p>;
  } else if (isConnected) {
    statusDisplay = <p className="text-sm font-medium text-green-600 mb-2">🟢 Connected</p>;
  } else {
    statusDisplay = <p className="text-sm font-medium text-red-600 mb-2">🔴 Disconnected</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gray-50 text-gray-900">
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-indigo-600 tracking-tight">SharedGrid</h1>
        <p className="text-lg text-gray-600 font-medium mb-4">Real-Time Collaborative Block Claiming Platform</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 bg-white py-2 px-6 rounded-full shadow-sm border border-gray-200">
          {statusDisplay}
          <p className="text-sm text-gray-800 font-semibold mb-2">Online Users: {onlineUsers}</p>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto">
        {loading ? (
          <p className="text-xl text-gray-500 font-medium animate-pulse">Loading Grid...</p>
        ) : error ? (
          <p className="text-xl text-red-500 font-medium">{error}</p>
        ) : (
          <Grid blocks={blocks} />
        )}
      </div>
    </div>
  );
}

export default Home;
