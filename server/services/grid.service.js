const pool = require('../config/db');

const getAllBlocks = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blocks ORDER BY row_index ASC, col_index ASC'
    );
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch grid blocks: ' + error.message);
  }
};

module.exports = {
  getAllBlocks
};
