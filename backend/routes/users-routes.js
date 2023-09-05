const express = require('express');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.post("/signup", usersController.createNewUser);
router.post("/login", usersController.loginUser);

module.exports = router;