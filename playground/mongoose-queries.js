const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {User} = require('./../server/models/user.js');

var id = '5b7d772564629c2f40b7d537'; 


//IF ID is not valid then we can use isValid Function

if (!ObjectID.isValid(id)){
	console.log('ID not valid');
}

// ******* There are various methods to find/GET queries 

//Find

User.find({
	_id: id
}).then((users) => {
	console.log('Users',users);
},(e) => {
	console.log('Unable to find User',e);
});

//FindOne

User.findOne({
	_id: id
}).then((user) => {
	console.log('User',user);
},(e) => {
	console.log('Unable to find User',e);
});


//FindById

User.findById(id).then((user) => {
	if(!user){
		return console.log('No user Found');
	}
	console.log('User by ID',user);
},(e) => {
	console.log('Unable to find User',e);
});