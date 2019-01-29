const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp',{ useNewUrlParser: true },(err,Client)=>{
    if(err){
        return console.log('Unable to connect to the MongoDb server');
    }
    console.log('Connected to MongoDb server');
    var user ={name: 'vishal' , age: 34};
var {name} = user;
console.log(name);
    const db = Client.db('ToDos');
    // db.collection('ToDos').insertOne({
    //     text : 'fist insertion',
    //     completed : false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert :',err);
    //     }
    //     console.log('Inserted : ',JSON.stringify(result,undefined,2));
    // });
    // db.collection('User').insertOne({
    //     name : 'Manoj Prasad',
    //     age : 40,
    //     location : 'Angul India'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Failed to insert',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());

    // });



    Client.close();
});
