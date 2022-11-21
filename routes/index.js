const express = require('express');
const router = express.Router();

router.use('/', require('./csv'));
router.use('/', require('./users.js'));


// router.get('/uploads', function(req, res, next) {
//     res.render('uploads', { title: 'Unical' });
// });

// router.get('/announcement-event', function(req, res, next) {
//     res.render('announcement-event', { title: 'Unical' });
// });

// router.get('/results', function(req, res, next) {
//     res.render('results', { title: 'Unical' });
// });

module.exports = router;