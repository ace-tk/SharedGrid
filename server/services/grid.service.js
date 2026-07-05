const pool = require('../config/db');

const getAllBlocks = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM blocks ORDER BY row_index ASC, col_index ASC'
  );
  return rows;
};

const claimBlock = async (id, ownerName, ownerColor) => {
  const [rows] = await pool.query('SELECT id, claimed FROM blocks WHERE id = ?', [id]);

  if (rows.length === 0) {
    throw new Error('Block not found');
  }
  if (rows[0].claimed) {
    throw new Error('Block is already claimed');
  }

  const [result] = await pool.query(
    'UPDATE blocks SET claimed = true, owner_name = ?, owner_color = ?, claimed_at = NOW() WHERE id = ?',
    [ownerName, ownerColor, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('Failed to claim block');
  }

  const [updatedRows] = await pool.query('SELECT * FROM blocks WHERE id = ?', [id]);
  return updatedRows[0];
};

module.exports = {
  getAllBlocks,
  claimBlock
};
