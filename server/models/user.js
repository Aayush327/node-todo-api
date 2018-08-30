var mongoose = require('mongoose');

var User = mongoose.model('User',{
	email: {
		type: String,
		required: true,
		trim: true,
		minlength:1
	},
	password: {
		type: String
	}
});


// var newUser = new User({
// 	email: 'abc@example.com'
// });

// newUser.save().then((doc)=>{
// 	console.log('Saved Todo',doc);
// },(e)=>{
// 	console.log('Unable to Save Todo',e);
// });

module.exports = {User};