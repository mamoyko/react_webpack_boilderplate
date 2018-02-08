"use strict"
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
  app: function() {

    const app = express();

    /* - Mongo DB Connection - */

    console.log("Connecting to Mongo DB...\nHost: " + config.mongodb.host + "\nDB: " + config.mongodb.db);
    if (config.mongodb.options) {
      console.log("Options:", config.mongodb.options);
    } else {
      console.log("No MongoDB options.");
    }

    var mongoConnect = 'mongodb://' + config.mongodb.host + '/' + config.mongodb.db;
    mongoConnect = mongoConnect.trim();

    console.log("URI", mongoConnect);
    mongoose.connect(mongoConnect, config.mongodb.options);

    mongoose.connection.on('error', function(err) {
      console.log("Error:", err);
    });

    mongoose.connection.on('open', function() {
      console.log("mongodb connection open");
    });

    const publicPath = express.static(path.join(__dirname, '../dist'));

    var IndexRoutes = require('./routes/index');
    var AgentRoutes = require('./routes/agent');
    var CheckVersionRoutes = require('./routes/check_version');
    var userRoutes = require('./routes/user');
    var fragmentRoutes = require('./routes/fragment');

    app.use(morgan('dev'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use((req,res,next) =>{
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
          jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs',(err,decode) =>{
              if (err) req.user = undefined;
              req.user = decode;
              next()
          });
        } else {
          req.user = undefined;
          next();
        }
    });
    app.use('/dist', publicPath)
    app.use('/',IndexRoutes)
    app.use('/agent', AgentRoutes);
    app.use('/check_version', CheckVersionRoutes);
    app.use('/user',userRoutes)
    app.use('/fragment',fragmentRoutes);

    return app;
  }
}
