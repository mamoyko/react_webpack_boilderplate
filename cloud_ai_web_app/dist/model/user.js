var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = mongoose.Schema({
  fullname:{
		type: String,
	},
  email:{
		type: String
	},
  username:{
		type: String
	},
  password:{
		type: String
	},
  date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

var User = module.exports = mongoose.model('User',UserSchema);

// module.exports.comparePassword = function(hash_password,password){
//     return bcrypt.compareSync(hash_password,password);
// };

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}
