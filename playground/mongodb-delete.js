const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',{ useNewUrlParser: true },(err,Client)=>{
    if(err){
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to MongoDb server');
 
    // const db = Client.db('ToDos');
    // db.collection('ToDos').find({
    //     _id:new ObjectID ('5c4c0ca6b704fd079459312e')
    // })
    //     .toArray().then((docs)=>
    // {
    //     console.log('ToDos App');
    //     console.log(docs);
    // },(err)=>{
    //     console.log('Unable to fetch the data: ',err);
    // });
    
    const db = Client.db('ToDos');

    db.collection('User').deleteOne({_id: new ObjectID('5c4c0f6718a7690998baae80') }).then((result)=>{
        console.log(result);
    });



    Client.close();
});
