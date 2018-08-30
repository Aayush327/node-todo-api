var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
	text : {
		///////// MONGOOSE DEFAULT VALIDATORS /////////

		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// var newTodo = new Todo({
// 	text: '       Walk the Dog        '
// });

// newTodo.save().then((doc)=>{
// 	console.log('Saved Todo',doc);
// },(e)=>{
// 	console.log('Unable to fetch todos',e);
// });

module.exports = {Todo};