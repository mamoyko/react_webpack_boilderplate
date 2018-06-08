"use strict"
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

exports.check_version = (req,res,next) => {
    res.json({version : 'D5ou3pZwkm1LemGqFMe93JJyF8rnAJ5MBkuboTm6PCaiuZr6mC'})
};

exports.loginAuth = (req,res,next) => {
  if (req.user){
    next();
  } else {
    return res.status(401).json({message: 'Unathorized user!'});
  }
};
