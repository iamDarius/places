const HttpError = require("../models/http-error");
const {v4: uuidv4 } = require("uuid");
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: "20 W 34th St., New York, NY 10001",
    creator: "u1",
  },
];

const getPlacesById = (request, response) => {
  const id = request.params.id;
  const place = DUMMY_PLACES.find((place) => place.id === id);

  if (!place) {
    throw new HttpError("Could not find a place for the provided ID", 404);
  }

  response.json({ place });
};

const getPlacesByUserId = (request, response) => {
  const userId = request.params.id;
  const placesFound = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (!placesFound?.length) {
    throw new HttpError("Could not find a place for the provided ID", 404);
  }
  console.log("Place Found!");
  response.json(placesFound);
};

const createPlace = (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new HttpError('Whoops. There seems to be some invalid values. Please check your data', 422);
  }

  const { title, description, coordinates, address, creator } = request.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  response.status(201).json({ place: createdPlace });
};

const updatePlace = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new HttpError('Whoops. There seems to be some invalid values. Please check your data', 422);
  }

  const { title, description } = request.body;
  const id = request.params.id;

  const indexOfPlace = DUMMY_PLACES.findIndex((place) => place.id === id);
  const placeToUpdate = { ...DUMMY_PLACES[indexOfPlace] };

  if (indexOfPlace >= 0) {
    placeToUpdate.title = title;
    placeToUpdate.description = description;

    DUMMY_PLACES[indexOfPlace] = placeToUpdate;

    response.json({ updatedPlace: placeToUpdate });
  }
};
const deletePlace = (request, response, next) => {
  const id = request.params.id;
  const placeFound = DUMMY_PLACES.find(place => place.id === id);

  if (!placeFound) {
    throw new HttpError('Could not find a place', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== id);

  response.status(200).json({ message: "Delete successful" });
};

exports.getPlacesByUserId = getPlacesByUserId;
exports.getPlacesById = getPlacesById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
