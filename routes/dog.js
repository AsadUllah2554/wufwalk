const express = require('express');

const { getDogs,addDog,deleteDog  } = require('../controllers/dogController');
const router = express.Router();

// getting dog route
router.get('/:userID/dogs', getDogs) 

// for adding a dog
router.post('/:userID/dogs', addDog)

// for deleting a dog
router.delete('/:userID/dogs/:dogID', deleteDog)


module.exports = router;