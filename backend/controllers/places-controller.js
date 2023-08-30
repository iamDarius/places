const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        address: '20 W 34th St., New York, NY 10001',
        creator: 'u1'

    }
];

const getPlacesById = (request, response) => {
    const id = request.params.id;
    const place = DUMMY_PLACES.find(place => place.id === id);

    if (!place) {
        throw new HttpError('Could not find a place for the provided ID', 404);
    } 

    response.json({place})
}

const getPlaceByUserId = (request, response) => {
    const userId = request.params.id;
    const placeFound = DUMMY_PLACES.filter(place => place.creator === userId);

    if (!placeFound) {
        throw new HttpError('Could not find a place for the provided ID', 404);
    }
    console.log('Place Found!');
    response.json(placeFound);
}

const createPlace = (request, response) => {
    const { title, description, coordinates, address, creator } = request.body;
    const createdPlace = { 
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);
    response.status(201).json({place: createdPlace})
}

exports.getPlaceByUserId = getPlaceByUserId;
exports.getPlacesById = getPlacesById;
exports.createPlace = createPlace;