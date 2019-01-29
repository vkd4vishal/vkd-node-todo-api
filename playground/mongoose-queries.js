const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c4d8d38840c373ef0ba0469';

if(!ObjectId.isValid(id)){
    console.log('id is not valid');
}
// Todo.find({
//     _id : id
// }).then((todos)=>{
//     console.log('todos:',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('todo:',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('id not found');
//     }
//     console.log('todo by id:',todo);
// }).catch((e) =>console.log(e));

User.findById(id).then((user)=>{
    if(!user){
        return console.log('user not found');
    }console.log('user found is:',user); 
    
}).catch((e)=> console.log(e));
