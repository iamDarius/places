const express = require('express');
const placesControllers = require('../controllers/places-controller');

const router = express.Router();

router.get('/:id', placesControllers.getPlacesById);

// GET - gets all places associated with a specific user
router.get('/user/:id', placesControllers.getPlaceByUserId);

// POST - Creates a new place
router.post('/', placesControllers.createPlace);

module.exports = router;