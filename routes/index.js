const express = require('express');
const router = express.Router();

router.use('/', require('./csv'));
router.use('/', require('./users.js'));

module.exports = router;