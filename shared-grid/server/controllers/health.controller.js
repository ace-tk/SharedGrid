const healthService = require('../services/health.service');

const checkHealth = async (req, res) => {
  try {
    const dbHealth = await healthService.getDatabaseHealth();
    
    res.json({
      server: 'running',
      database: dbHealth.status,
      totalBlocks: dbHealth.totalBlocks,
      claimedBlocks: dbHealth.claimedBlocks,
      availableBlocks: dbHealth.availableBlocks
    });
  } catch (error) {
    res.status(503).json({
      server: 'running',
      database: 'disconnected',
      error: error.message
    });
  }
};

module.exports = {
  checkHealth
};
