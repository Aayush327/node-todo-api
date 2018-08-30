const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/',(err,db)=>{
	if(err){
		return console.log('Server Not Connected');
	}
	
	console.log('MongoDB Server Connected Successfully');
	
	var dbo=db.db('TodoApp');

	// Syntax for Update is (filter,update,Options).then promise

	//filter contains an object on the basis of which we want to filter the data
	//update contains an object as the name suggest
	   // but we cant directly update the documents..
	   //there are certain keywords for that

	dbo.collection('Todos').updateOne({
		_id: new ObjectID('5b7b1da7b21ee9fa32a0953e')
	},{
		$set:{
			completed: true
		},
		$inc:{
			age:2
		}
	},{
		returnOriginal:false
	}).then((result)=>{
		console.log(result);
	})
})
