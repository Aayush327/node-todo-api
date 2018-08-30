var express = require('express');
var bodyParser = require('body-parser'); 
//******* Body parser is used to pass the request in JSON format to the server ***//
var {ObjectID} = require('mongodb');
//ES6 DESTRUCTORING
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user}= require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text : req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res) => {
	Todo.find().then((todos)=>{
	 res.send(todos);
},(e) => {
     res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		res.status(404).send();		
	}

	Todo.findById(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});

});

app.listen(3000,()=>{
	console.log('Server started on port 3000');
});
