var fs = require('fs');
var os = require('os');
var note = require('./note');
const _ = require('lodash');
const yargs = require('yargs');

var user = os.userInfo();
// console.log(user);

fs.appendFile('greet.txt', `Hello ${user.username} and your age is ${note.addNote()}`, function(err) {
    if (err) {
        console.log('error', err)
    }
})
 
var sum = note.addNumber(2, 3);
fs.appendFile('sum.txt', `Sum of two number is ${sum}`, (err) => {
    if(err) {
        console.log('Error', err)
    }
})

// using lodash in build functions for checking string
console.log(_.isString(true));
console.log(_.isString('Aatish Sharma'));

const array = ['Aatish', 1, 3, 1, 4, 4, 6, 2, 'Aatish', 'Sharma'];
const filteredAaray = _.uniq(array);
console.log(filteredAaray);

const command = note.command()
console.log(command);