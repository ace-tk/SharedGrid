const pool = require('../config/db');

const getDatabaseHealth = async () => {
  try {
    const [totalRows] = await pool.query('SELECT COUNT(*) as total FROM blocks');
    const [claimedRows] = await pool.query('SELECT COUNT(*) as claimed FROM blocks WHERE claimed = true');
    
    const totalBlocks = totalRows[0].total;
    const claimedBlocks = claimedRows[0].claimed;
    
    return {
      status: 'connected',
      totalBlocks: totalBlocks,
      claimedBlocks: claimedBlocks,
      availableBlocks: totalBlocks - claimedBlocks
    };
  } catch (error) {
    throw new Error('Database connection failed: ' + error.message);
  }
};

module.exports = {
  getDatabaseHealth
};
