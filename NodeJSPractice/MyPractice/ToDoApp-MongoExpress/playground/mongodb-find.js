// const MongoClient = require('mongodb').MongoClient;
// Doing same using ecmascript 6 array destructuring way.

// const { MongoClient } = require('mongodb');
// const { ObjectId } = require('mongodb');
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Error occured while connecting')
    }
    console.log('Connected to MongoDb Server');

    // Fetching all records
    //    db.collection('Todos').find().toArray().then((data) => {
    //        console.log(JSON.stringify(data, undefined, 2));
    //    }, (err) => {
    //        console.log('Error occured', err);
    //    })

    // fetching data based on some parameters
    db.collection('Todos').find({ completed: true }).toArray().then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
        console.log(JSON.stringify(data.length, 'Length of Data'));
    }, (err) => {
        console.log('Error occured', err);
    })

    // To fetch from object Id we cannot pass directly. We have to use ObjectId Above
    db.collection('Todos').find({ _id: new ObjectId('5b1e691bcf6af7e865934dce') }).toArray().then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
        console.log(JSON.stringify(data.length, 'Length of Data'));
    }, (err) => {
        console.log('Error occured', err);
    })
    db.collection('Users').find({name : 'Aatish' }).toArray().then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
        console.log(JSON.stringify(data.length, 'Length of Data'));
    }, (err) => {
        console.log('Error occured', err);
    })
    // close db connections once done with db interaction
    db.close();
})