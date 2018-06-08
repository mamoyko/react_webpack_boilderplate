var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AgentSchema = mongoose.Schema({
  computer_name:{
		type: String,
	},
  operation_system:{
		type: String
	},
  employee_id:{
		type: String
	},
  client_id:{
		type: String
	},
  agent_last_synced : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

var Agent = module.exports = mongoose.model('Agent',AgentSchema);
