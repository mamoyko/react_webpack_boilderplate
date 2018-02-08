'use strict'

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserModel = require('../model/user')

exports.register = (req,res,next) => {
  let newUser = new UserModel(req.body);
  newUser.password = bcrypt.hashSync(req.body.password,10);
  newUser.save((err,user) => {
    if (err){
      return res.status(400).send({
        message : err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user)
    }
  });
};

exports.sign_in = (req,res,next) => {
  UserModel.findOne({
    username : req.body.username
  },(err,user) => {
    if (err) throw err;
    if (!user){
      res.status(401).json({
        message : 'Authentication failed. User not found.'
      });
    } else if (user) {
        UserModel.comparePassword(req.body.password,user.password,(err,isMatch) => {
            if (err) throw err;
            if (!isMatch){
              res.status(401).json({message : 'Authentication failed. Wrong Password.'})
            } else {
                return res.json({
                  token : jwt.sign({
                    _id : user._id,
                    fullname : user.fullname,
                    email : user.email,
                    username : user.username,
                  },'RESTFULAPIs')
                })
            }
        });
    }
  })
};

exports.get_user = (req,res,next) => {
    UserModel.find({})
      .exec()
      .then((results) => {
        res.json(results)
      })
      .catch((err) => {
        res.json({
          message : 'error'
        })
      })
};

exports.loginAuth = (req,res,next) => {
  if (req.user){
    next();
  } else {
    return res.status(401).json({message: 'Unathorized user!'});
  }
};
