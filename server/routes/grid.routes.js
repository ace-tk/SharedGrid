const express = require('express');
const router = express.Router();
const { getGrid, claimGridBlock } = require('../controllers/grid.controller');

router.get('/', getGrid);
router.post('/claim/:id', claimGridBlock);

module.exports = router;
