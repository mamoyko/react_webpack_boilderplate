"use strict"
var mongoose = require('mongoose');
var AgentModel = require('../model/agent')

exports.get_agent = (req,res,next) => {
    AgentModel.find({})
      .exec()
      .then((results) => {
        res.json(results)
      })
      .catch((err) => {
        res.json({message : 'error'})
      })
};

exports.loginAuth = (req,res,next) => {
  if (req.user){
    next();
  } else {
    return res.status(401).json({message: 'Unathorized user!'});
  }
};
