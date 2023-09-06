const express = require('express');
const usersController = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.post("/signup",  [check('email').notEmpty().isEmail(), check('password').notEmpty()], usersController.createNewUser);
router.post("/login", [check('email').normalizeEmail().notEmpty().isEmail(), check('password').isLength({min: 6}).notEmpty()], usersController.loginUser);

module.exports = router;