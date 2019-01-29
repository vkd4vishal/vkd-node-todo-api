const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',{ useNewUrlParser: true },(err,Client)=>{
    if(err){
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to MongoDb server');
 
    
    const db = Client.db('ToDos');

    db.collection('User').findOneAndUpdate({_id: new ObjectID ('5c4ca6364ec9d538092cbaee') },{
        $inc:
    
    {
        age: -34
        
    }
    }
    ,{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });



    Client.close();
});
