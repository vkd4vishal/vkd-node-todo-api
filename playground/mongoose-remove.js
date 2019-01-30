const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({}).then((result)=>[
//     console.log(result)
// ]);

Todo.findByIdAndDelete('5c517aa94ec9d538092f3bec').then((todo)=>{
    console.log(todo);
});