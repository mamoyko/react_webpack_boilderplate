"use strict";
const express = require('express');
const router = express.Router();
const path = require('path');
var index_controller = require('../controllers/indexController');

router.route('/api')
  .get(index_controller.welcome_message)
  .post(index_controller.post_data_sample)

module.exports = router;
