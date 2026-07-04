const gridService = require('../services/grid.service');

const getGrid = async (req, res) => {
  try {
    const blocks = await gridService.getAllBlocks();
    res.json({
      success: true,
      total: blocks.length,
      blocks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getGrid
};
