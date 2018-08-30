const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err,db) => {
	
	if(err){
		return console.log('MongoDB server not connected');
	}

	console.log('MongoDB server connected');
	
	dbo=db.db('TodoApp');

	// **********  DELETE MANY *************//

	// dbo.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
	// 	console.log(JSON.stringify(result,undefined,2));
	// });

	// **********  DELETE ONE *************//

	// dbo.collection('Todos').deleteOne({completed: true}).then((result)=>{
	// 	console.log(JSON.stringify(result,undefined,2));
	// })

	dbo.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
		console.log(result);
	})

});