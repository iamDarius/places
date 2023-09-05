const HttpError = require("../models/http-error");
const {v4: uuidv4 } = require("uuid");

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Test user',
        email: 'testuser@test.com',
        password: 'testers'
    }
];

const getAllUsers = (request, response, next) => {

    response.json({'users': DUMMY_USERS})
};

const createNewUser = (request, response, next) => {
    const { name, email, password } = request.body;

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(newUser);
    response.json({ 'userAdded': newUser });

};

const loginUser = (request, response, next) => {
    const { email, password } = request.body;

    const userFound = DUMMY_USERS.findIndex(user => user.email === email);

    if (!userFound || userFound.password === password) {
        throw new HttpError('Could not identify user.', 401)
    };

    response.json({'message': 'user logged in'})
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.loginUser = loginUser;