const pool = require('../config/db');

const getDatabaseHealth = async () => {
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM blocks');
  const [[{ claimed }]] = await pool.query('SELECT COUNT(*) AS claimed FROM blocks WHERE claimed = true');

  return {
    status: 'connected',
    totalBlocks: total,
    claimedBlocks: claimed,
    availableBlocks: total - claimed
  };
};

module.exports = { getDatabaseHealth };
