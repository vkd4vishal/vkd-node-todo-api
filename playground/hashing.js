const jwt = require('jsonwebtoken');

var data ={
    id: 10
};
var token = jwt.sign(data,'123');
console.log(token);
var decoded = jwt.verify(token,'123');
console.log(decoded);

// const {SHA256}= require('crypto-js');

// var message = 'yo yo honey singh';

// var hash = SHA256(message).toString();
// console.log(hash);

// var data ={
//     id: 5
// };
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data)+'secret').toString()
// };
// // data.id =5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
// var hashResult = SHA256(JSON.stringify(token.data)+'secret').toString();

// if(hashResult === token.hash){
//     console.log('Login succesful');
// }else{
//     console.log('Incorrect password');
// }