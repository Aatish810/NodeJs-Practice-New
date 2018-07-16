
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Error occured while connecting')
    }
    console.log('Connected to MongoDb Server');


    // deleteOne
//   db.collection('Todos').deleteOne({text: 'Walking on road'}).then((result) => {
//        console.log(result);
//   });

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Walking on road'}).then((result) => {
    //   console.log(result);
    // })
    
    //findOneAndDelete
    //  db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    //      console.log(result);
    //  })

    // testing delete many
    db.collection('Users').deleteMany({name : 'Andrew'}).then((result) => {
        console.log(result, 'Delete MAny result');
    })

    db.collection('Users').findOneAndDelete({_id: new ObjectId("5b29fd4020c7f59c3d8c1527")})
    .then((result) => {
        console.log(result);
    })

  //  db.close();
})