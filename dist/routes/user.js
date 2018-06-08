'use strict'
const express = require('express');
const router = express.Router();
const path = require('path');

var userHandler = require('../controllers/userController');

router.route('/auth/sign_in/api')
      .get(userHandler.sign_in);

router.route('/auth/register/api')
      .post(userHandler.register)

router.route('/auth/sign_in/api')
      .post(userHandler.sign_in)

router.route('/get_user/api')
      .get(userHandler.loginAuth,userHandler.get_user)

module.exports = router;
