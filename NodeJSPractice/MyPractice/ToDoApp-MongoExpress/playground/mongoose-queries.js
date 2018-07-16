const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users')

var id = '5b2aaec5c291d1141aa26263';
var userId = '5b2a611ccc76ddc82428d6ad';
if(!ObjectID.isValid(id)){
    console.log('id not found')
}

ToDo.find({_id: id}).then((todos) => {
    if(!todos) {
        return console.log('No Such Id Found')
    }
    console.log(todos)
}).catch((e)=> {
    console.log('error occured', e)
})

ToDo.findOne({_id: id}).then((todo)=> {
    if(!todo) {
        return console.log('No Such Id Found')
    }
    console.log(todo)
}).catch((e)=> {
    console.log('error occured', e)
})

ToDo.findById(id).then((todo)=> {
    if(!todo) {
        return console.log('No Such Id Found')
    }
    console.log(todo)
}).catch((e)=> {
    console.log('error occured', e)
})


// from user collections
Users.findById(userId).then((user)=> {
    if(!user){
        console.log('No such user');
    }
    console.log(user)
}).catch((e)=> {
    console.log(e);
})