var {ObjectId} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
const port = process.env.PORT || 3000;
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());



app.post('/todos',(req,res)=>{
    var newTodo = new Todo({
        text: req.body.text
    } );
    newTodo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e); 
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res)=>{
   var id = req.params.id;
   
if(!ObjectId.isValid(id)){
    res.status(404).send();
}
Todo.findById(id).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.status(200).send({todo});
}).catch((e)=>res.status(400).send());

}); 

app.listen(port,()=>{
    console.log('Server is up on port ',port);
});

module.exports = {app};