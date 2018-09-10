var express = require('express');
var bodyParser = require('body-parser'); 
//******* Body parser is used to pass the request in JSON format to the server ***//

var _ = require('lodash');

var {ObjectID} = require('mongodb');
//ES6 DESTRUCTORING
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User}= require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
var port = process.env.PORT || 3000;

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

app.post('/users',(req,res) => {
	// var email = req.body.email;
	// var password =req.body.password;

	// var user = new User ({
	// 	email: email,
	// 	password : password
	// });

	// LINE 58 -64 Another Method //

	var body = _.pick(req.body,['email','password']); // lodash method
	// no need to specify each var
	//syntax is _.pick(from where all var is to be taken.. like req.body , [properties])
	var user = new User(body);

	user.save().then(() => {
		// res.send(user);
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})

});


app.get('/users/me',authenticate, (req,res) => {

	res.send(req.user);


	// var token = req.header('x-auth');

	// User.findByToken(token).then((user) => {
	// 	if(!user){
	// 		return Promise.reject();
	// 	}
	// 	res.send(user);
	// }).catch((e) => {
	// 	res.status(401).send();
	// });
});

// LOGIN CHECK
app.post('/users/login', (req,res) => {
	var body = _.pick(req.body,['email','password']); // lodash method

	// 
	User.findByCredentials(body.email,body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth',token).send(user);
		})
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/users/me/token', authenticate,(req,res) => {
	req.user.deleteToken(req.token).then(() => {
		res.status(200).send();
	},() => {
		res.status(400).send();
	});
});


app.listen(port,()=>{
	console.log(`Server started on port ${port}`);
});
