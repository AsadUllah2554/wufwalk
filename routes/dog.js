const express = require('express');

const { getDogs  } = require('../controllers/dogController');
const router = express.Router();

// getting dog route
router.get('/:username/dogs', getDogs) 

module.exports = router;