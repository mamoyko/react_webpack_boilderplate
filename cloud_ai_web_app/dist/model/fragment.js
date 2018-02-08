var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FragmentSchema = mongoose.Schema({
  application_name:{
		type: String,
	},
  favicon:{
		type: String
	},
  window_title:{
		type: String
	},
  time_spent:{
		type: String
	},
  url : {
    type : String
  },
  time_opened : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

var Fragment = module.exports = mongoose.model('Fragment',FragmentSchema);
