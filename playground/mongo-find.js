const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err,db) => {
	
	if(err){
		return console.log('MongoDB server not connected');
	}

	console.log('MongoDB server connected');
	
	dbo=db.db('TodoApp');

	dbo.collection('Todos').find({completed:true}).toArray().then((docs)=>{
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));

	}, (err)=>{
		console.log('Unable to fetch Todos');

	});


     // ************ TO COUNT THE DOCUMENTS ***************//

	// dbo.collection('Todos').find().count().then((count)=>{
	// 	console.log(`No of Todos: ${count}`);

	// }, (err)=>{
	// 	console.log('Unable to count Todos');

	// });


     // ************ ON BASIS OF OBJECT-ID ***************//
    
	// dbo.collection('Todos').find({
	// 	_id: new ObjectID('5b7b0a1d1d2b811d30b4acef')
	// }).toArray().then((docs)=>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs,undefined,2));

	// }, (err)=>{
	// 	console.log('Unable to fetch Todos');

	// });

});