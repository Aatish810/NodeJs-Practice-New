// const MongoClient = require('mongodb').MongoClient;
// Doing same using ecmascript 6 array destructuring way.

// const { MongoClient } = require('mongodb');
// const { ObjectId } = require('mongodb');
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
   if(err) {
       return console.log('Error occured while connecting')
   }
   console.log('Connected to MongoDb Server');
//    db.collection('Todos').insertOne({
//        text: 'Something to do',
//        comleted: false
//    }, (err, result) => {
//      if(err) {
//         return console.log('Error occured in inserting data', err);
//      }
//      console.log('Result of insert one ', JSON.stringify(result.ops, undefined, 2));
//    })
    db.collection('Users').insertOne({
        name: 'Aatish',
        age: 25,
        location: 'Bhubaneshwar'
    }, (err, result) => {
        if(err) {
            return console.log('Error Occured while adding new record', err);
        }
        console.log('Result of User', JSON.stringify(result.ops, undefined, 2))
    })
   db.close();
})