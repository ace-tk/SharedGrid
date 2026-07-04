const checkHealth = (req, res) => {
  res.json({
    status: 'Server Running'
  });
};

module.exports = {
  checkHealth
};
