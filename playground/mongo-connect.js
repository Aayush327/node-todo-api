//var MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); // ES6 Destructuring

MongoClient.connect('mongodb://localhost:27017/', (err,db) => {
	if(err){
		return console.log('Server Not Connected');
	}
	 console.log('Server connected Successfully')
	 dbo=db.db('TodoApp');

	 dbo.collection('Todos').insertOne({
	 	text: "Something to write",
	 	completed: false
	 },(err,result)=>{
	 	if(err){
	 		return console.log('database not connected',err)
	 	}

	 	//.ops will give us total no of documents
	 	console.log(JSON.stringify(result.ops,undefined,2));


	 	// every objectID has a timestamp so to differ between two similar request

	 	console.log(result.ops[0]._id.getTimestamp());

	 });

	 db.close();
})
