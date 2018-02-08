"use strict";
const express = require('express');
const router = express.Router();
const path = require('path');
var checkversion = require('../controllers/checkVersionController');

router.route('/api')
  .get(checkversion.loginAuth,checkversion.check_version)

module.exports = router;
