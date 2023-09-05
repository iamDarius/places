const express = require("express");
const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:id", placesControllers.getPlacesById);

// GET - gets all places associated with a specific user
router.get("/user/:id", placesControllers.getPlacesByUserId);

// POST - Creates a new place
router.post("/", placesControllers.createPlace);

router.patch("/:id", placesControllers.updatePlace);

router.delete("/:id", placesControllers.deletePlace);

module.exports = router;
