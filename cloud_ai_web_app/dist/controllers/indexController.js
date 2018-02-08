'use strict'
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.welcome_message = (req,res,next) => {
    res.json({
      message : 'Welcome to Cloud AI api'
    })
};

exports.post_data_sample = (req,res,next) => {

  asyncCall(req.body)

  function pushArrayDataFunc(data){
      return new Promise(resolve => {
          let data_array = [];
          data_array.push(data);
          resolve(data_array)
      });
  }

  function addFragment(data){
    return new Promise(resolve => {
        for (let key in data){
          saveFragment(data[key])
        }
        resolve('success')
    });
  }

  function saveFragment(data){
      setTimeout(() => {
          let newFragment = new fragmentModel(data);
          newFragment.save((err,user) => {
              if (err){
                return 'error';
              } else {
                return 'success'
              }
          });
      },3000)
  }

  async function asyncCall(data){
    var pushArr = await pushArrayDataFunc(data);
    var saveData = await addFragment(pushArr);
    res.json({message : saveData})
  }
};
