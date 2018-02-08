'use strict'
const express = require('express');
const router = express.Router();
const path = require('path');

var fragment_handler = require('../controllers/fragmentController');

router.route('/api')
      .get(fragment_handler.get_fragment)
      .post(fragment_handler.post_fragment)
module.exports = router;
