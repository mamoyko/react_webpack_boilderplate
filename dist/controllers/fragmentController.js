"use strict"
var mongoose = require('mongoose');
var FragmentModel = require('../model/fragment')

exports.get_fragment = (req,res,next) => {
    FragmentModel.find({})
      .exec()
      .then((results) => {
        res.json(results)
      })
      .catch((err) => {
        res.json({message : error})
      })
};

exports.post_fragment = (req,res,next) => {

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
        let results;
        for (let key in data){
          results = saveFragment(data[key])
        }
        resolve(results)
    });
  }

  function saveFragment(data){
      setTimeout(() => {
          let newFragment = new FragmentModel(data);
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
    res.json({message : 'success'})
  }
};

exports.loginAuth = (req,res,next) => {
  if (req.user){
    next();
  } else {
    return res.status(401).json({message: 'Unathorized user!'});
  }
};
