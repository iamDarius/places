const express = require("express");
const { check } = require('express-validator');

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:id", placesControllers.getPlacesById);

// GET - gets all places associated with a specific user
router.get("/user/:id", placesControllers.getPlacesByUserId);

// POST - Creates a new place
router.post("/", [check('title').notEmpty(), check('description').isLength({min: 5}), check('address').notEmpty()], placesControllers.createPlace);

router.patch("/:id", [check('title').notEmpty(), check('description').notEmpty()],placesControllers.updatePlace);

router.delete("/:id", placesControllers.deletePlace);

module.exports = router;
