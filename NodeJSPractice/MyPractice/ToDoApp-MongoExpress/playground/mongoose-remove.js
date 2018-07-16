const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users')

// remove methods in moongoose

// to remove whole collections
ToDo.remove({}).then((doc) => {
    console.log(docs);
})

ToDo.findOneAndRemove({_id: 'any Id'}). then((todo)=> {
    console.log(doc)
})

ToDo.findByIdAndRemove('direct id can be passed').then((todo) => {
    console.log(todo);
})