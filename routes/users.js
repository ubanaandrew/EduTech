const express = require('express');
// const router = require('.');
const router = express.Router();
const userController = require('../controller/user_controller');

// Register router
router.post('/register', userController.register);

// Login router
router.post('/login', userController.login);

// Logout router
router.get('/logout', userController.logout);

module.exports = router;