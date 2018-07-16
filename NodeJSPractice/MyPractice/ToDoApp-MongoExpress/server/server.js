require('./config/config');
 
const lodash = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { Users } = require('./models/users');
var {authenticate} = require('./middleware/authenticate')
var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/user', (req, res) => {
    var body = lodash.pick(req.body, ['email', 'password'])
    var user = new Users(body);
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})



app.get('/user/me', authenticate, (req, res) => {
   res.send(req.send);
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
