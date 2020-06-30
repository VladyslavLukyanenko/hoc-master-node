const express = require('express');
const router = express.Router();

router.use('/notify', require('./notify'));

module.exports = router;
