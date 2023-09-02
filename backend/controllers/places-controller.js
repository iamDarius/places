const HttpError = require("../models/http-error");
const uuid = require("uuid/v4");

const DUMMY_PLACES = [
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

const getPlaceByUserId = (request, response) => {
  const userId = request.params.id;
  const placeFound = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (!placeFound) {
    throw new HttpError("Could not find a place for the provided ID", 404);
  }
  console.log("Place Found!");
  response.json(placeFound);
};

const createPlace = (request, response) => {
  const { title, description, coordinates, address, creator } = request.body;
  const createdPlace = {
    id: uuid(),
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
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== id);

  response.status(200).json({ message: "Delete successful" });
};

exports.getPlaceByUserId = getPlaceByUserId;
exports.getPlacesById = getPlacesById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
