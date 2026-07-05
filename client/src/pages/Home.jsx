import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import Header from '../components/Header';
import Grid from '../components/Grid';
import GridLegend from '../components/GridLegend';
import ClaimModal from '../components/ClaimModal';
import { fetchGrid, claimGridBlock } from '../services/grid.api';

// ── Loading UI ──────────────────────────────────────────────
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p className="text-lg text-gray-500 font-medium">Loading Shared Grid…</p>
  </div>
);

// ── Error UI ────────────────────────────────────────────────
const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-5">
    <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-6 text-center max-w-sm">
      <p className="text-4xl mb-3">⚠️</p>
      <h2 className="text-lg font-bold text-red-700 mb-1">Unable to Load Grid</h2>
      <p className="text-sm text-red-500 mb-5">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

// ── Home Page ────────────────────────────────────────────────
function Home() {
  const { isConnected, isReconnecting, onlineUsers, lastClaimedBlock } = useSocket();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const loadGrid = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGrid();
      if (data.success) {
        setBlocks(data.blocks);
      } else {
        setError('Failed to load grid data.');
      }
    } catch {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadGrid(); }, []);

  // Real-time update from Socket.IO
  useEffect(() => {
    if (lastClaimedBlock) {
      setBlocks((prev) => {
        const existing = prev.find(b => b.id === lastClaimedBlock.id);
        if (existing?.claimed) return prev;
        return prev.map(b => b.id === lastClaimedBlock.id ? lastClaimedBlock : b);
      });
    }
  }, [lastClaimedBlock]);

  const handleCellClick = (block) => {
    if (!block.claimed) setSelectedBlock(block);
  };

  const handleClaimSubmit = async (id, name, color) => {
    const data = await claimGridBlock(id, name, color);
    if (data.success) {
      setBlocks((prev) => prev.map(b => b.id === id ? data.block : b));
    }
  };

  // Derived stats
  const totalBlocks = blocks.length;
  const claimedBlocks = blocks.filter(b => b.claimed).length;
  const availableBlocks = totalBlocks - claimedBlocks;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        isConnected={isConnected}
        isReconnecting={isReconnecting}
        onlineUsers={onlineUsers}
        totalBlocks={loading ? '—' : totalBlocks}
        claimedBlocks={loading ? '—' : claimedBlocks}
        availableBlocks={loading ? '—' : availableBlocks}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-6xl mx-auto w-full">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={loadGrid} />
        ) : (
          <>
            <GridLegend />
            <Grid blocks={blocks} onCellClick={handleCellClick} />
            <p className="mt-4 text-xs text-gray-400 text-center">
              Click any available block to claim it. Claims sync in real-time for all users.
            </p>
          </>
        )}
      </main>

      {/* Claim Modal */}
      {selectedBlock && (
        <ClaimModal
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
          onClaim={handleClaimSubmit}
        />
      )}
    </div>
  );
}

export default Home;
