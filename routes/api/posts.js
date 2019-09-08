const express = require('express');
const router = express.Router();

// @route
//req type GET
//endpoint api/posts
//@desc test route
//@access Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
