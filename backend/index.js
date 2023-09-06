const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('api/users', userRoutes);

// throw for unsupported routes
app.use((request, response, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
})

// middleware func that will apply to every incoming req
app.use((error, request, response, next) => {
    if (response.headerSent) {
        return next(error);
    }
    response.status(error.code || 500)
    response.json({message: error.message || 'An unknown error occurred'});
});

app.listen(5000);