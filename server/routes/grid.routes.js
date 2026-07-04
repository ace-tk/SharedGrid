const express = require('express');
const router = express.Router();
const { getGrid } = require('../controllers/grid.controller');

router.get('/', getGrid);

module.exports = router;
