const healthService = require('../services/health.service');

const checkHealth = async (req, res) => {
  try {
    const { status, totalBlocks, claimedBlocks, availableBlocks } = await healthService.getDatabaseHealth();
    res.json({ server: 'running', database: status, totalBlocks, claimedBlocks, availableBlocks });
  } catch (error) {
    res.status(503).json({ server: 'running', database: 'disconnected', error: error.message });
  }
};

module.exports = { checkHealth };
