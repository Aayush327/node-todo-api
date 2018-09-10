var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength:1,
		unique: true,
		validate : {
			validator : validator.isEmail,
			message : '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required : true,
		minlength : 6
	},
	tokens : [{
		access : {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true		
		}
	}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject(); // this will convert the mongoose user module in object

	return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id : user._id.toHexString(),access},'secretCode').toString();
	// console.log(token);
	user.tokens.push({access,token});

	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.deleteToken =function (token) {
	var user = this;

	return user.update({
		$pull : {
			tokens : {token}
		}
	});
};


UserSchema.statics.findByToken = function(token) {
	var user = this;
	var decoder;

	try{
		decoder = jwt.verify(token,'secretCode');
	}catch(e){
		// return new Promise((resolve,reject) => {
		// 	return reject();
		// });
		return Promise.reject();
	};

	return User.findOne({
		'_id'           : decoder._id,
		'tokens.token'  : token,
		'tokens.access' : 'auth'
	});
};

UserSchema.statics.findByCredentials = function(email,password){
	var User = this;

	returnUser.findOne({email}).then((user) => {

		if(!user){
			return Promise.reject();
		}

		// BCRYPT donot support promises..only callbacks
		return new Promise((resolve,reject) => {
			bcrypt.compare(password, user.password, (err,res) =>{

				if(res){
				   resolve(user);
				}else{
				   reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10, (err,salt) => {
			bcrypt.hash(user.password,salt,(err,hash) =>{
				user.password = hash;
				next();
			});
		});
	}
	else{
		next();
	}
})

var User = mongoose.model('User',UserSchema);


// var newUser = new User({
// 	email: 'abc@example.com'
// });

// newUser.save().then((doc)=>{
// 	console.log('Saved Todo',doc);
// },(e)=>{
// 	console.log('Unable to Save Todo',e);
// });

module.exports = {User};