const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken');
const {ToDo} = require('./../../models/todo')
const {User} = require('./../../models/users')


const todosArr = [
    {
        _id: new ObjectID,
        text: 'I am eating'
    },
    {
        _id: new ObjectID,
        text: 'I am sleaping'
    }
]

const userIdOne = new ObjectID();
const userIdTwo = new ObjectID();

const users = [{
         _id: userIdOne,
         email: 'aabcd@gmail.com',
         password: 'UserOnePass',
         tokens: [{
             access : 'auth',
             token: jwt.sign({_id: userIdOne, access: 'auth'}, 'abc123').toString()
         }]
}, {
      _id: userIdTwo,
      email: 'bcbcb@gmail.com',
      password: 'UserTwoPass'
}]

const populateTodos = (done) => {
    ToDo.remove({}).then(() =>{
        return Todo.insertMany(todos)
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(user[1]).save();
        return Promise.all([userOne, userTwo]).then(() => done());
    })
}


module.exports = {todosArr, populateTodos, users, populateUsers}