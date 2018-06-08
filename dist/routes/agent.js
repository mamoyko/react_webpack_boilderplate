"use strict";
const express = require('express');
const router = express.Router();
const path = require('path');
var agent = require('../controllers/agentController');

router.route('/api')
  .get(agent.loginAuth,agent.get_agent)
  .post()
  .put()


module.exports = router;
