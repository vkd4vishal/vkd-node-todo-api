var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/ToDoApp',{ useNewUrlParser: true });
//mongodb://<dbuser>:<dbpassword>@ds245523.mlab.com:45523/vkd-todo-api-database
