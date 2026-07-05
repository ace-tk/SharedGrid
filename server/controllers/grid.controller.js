const gridService = require('../services/grid.service');
const { broadcastBlockClaimed } = require('../sockets/socketManager');

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

const claimGridBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerName, ownerColor } = req.body;
    
    if (!ownerName || !ownerColor) {
      return res.status(400).json({ success: false, error: 'Name and color are required' });
    }
    
    const updatedBlock = await gridService.claimBlock(id, ownerName, ownerColor);
    
    broadcastBlockClaimed(updatedBlock);
    
    res.json({
      success: true,
      block: updatedBlock
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getGrid,
  claimGridBlock
};
