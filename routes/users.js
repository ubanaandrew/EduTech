const express = require('express');
// const router = require('.');
const router = express.Router();
const userController = require('../controller/user_controller');

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Unical - Dashboard' });
});

router.get('/uploads', function(req, res, next) {
    res.render('uploads', { title: 'Unical - Upload Books' });
});

router.get('/announcement-event', function(req, res, next) {
    res.render('announcement-event', { title: 'Unical - announcement-event' });
});

// Register router
router.post('/register', userController.register);

// Login router
router.post('/login', userController.login);

// Logout router
router.get('/logout', userController.logout);


module.exports = router;