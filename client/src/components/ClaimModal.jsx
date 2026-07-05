import React, { useState, useEffect, useRef } from 'react';

const Spinner = ({ size = 'sm' }) => {
  const s = size === 'sm' ? 'h-4 w-4' : 'h-8 w-8';
  return (
    <svg className={`animate-spin ${s} text-current`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
};

const ClaimModal = ({ block, onClose, onClaim }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) { setError('Name cannot be empty.'); return; }
    if (trimmedName.length > 30) { setError('Name cannot exceed 30 characters.'); return; }

    try {
      setLoading(true);
      setError(null);
      await onClaim(block.id, trimmedName, color);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 flex justify-between items-start">
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-white">Claim Block</h3>
            <p className="text-indigo-200 text-sm mt-0.5">Row {block.row_index}, Column {block.col_index}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition-colors disabled:opacity-40 text-2xl leading-none mt-0.5"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg" role="alert">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="ownerName" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              id="ownerName"
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (error) setError(null); }}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              placeholder="Enter your name"
              maxLength={30}
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{name.length}/30</p>
          </div>

          <div>
            <label htmlFor="ownerColor" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Color
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-200 overflow-hidden flex-shrink-0 shadow-inner"
                style={{ backgroundColor: color }}
              >
                <input
                  id="ownerColor"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="opacity-0 w-full h-full cursor-pointer"
                  disabled={loading}
                />
              </div>
              <div>
                <p className="text-sm font-mono text-gray-700">{color.toUpperCase()}</p>
                <p className="text-xs text-gray-400">Click the swatch to change</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2 min-w-[130px] justify-center"
            >
              {loading ? <><Spinner /> Claiming…</> : '🎯 Claim Block'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
