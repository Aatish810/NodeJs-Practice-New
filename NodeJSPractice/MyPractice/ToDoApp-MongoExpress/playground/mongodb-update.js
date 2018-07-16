
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if (err) {
        return console.log('Error occured while connecting')
    }
    console.log('Connected to MongoDb Server');


  // updating one property completed using $set
  //returnOriginal return updated record if set to true else with false returns old record
    db.collection('Todos').findOneAndUpdate(
        { _id: new ObjectId("5b1e54e4efbda129c4de54a0") },
        {
            $set: {
                completed: false
            }
        },
        { returnOriginal: false }
    ).then((result) => {
        console.log(result);
    })

    db.collection('Users').findOneAndUpdate({_id: new ObjectId("5b1e56190ae4d33ca442c5e9")},
      {
          $set: {
            name: 'Hero Details'
          }
      },
      {
          returnOriginal: false
      }
).then((result) => {
    console.log(result);
})


   // incrementing or decrementing values using $inc operator
    db.collection('Users').findOneAndUpdate({_id: new ObjectId("5b1e56190ae4d33ca442c5e9")},
        {
            $inc: {
                age: 1
            }
        },
     {
         returnOriginal: true
     }
    ).then((result)=> {
        console.log(result);
    } )
    //  db.close();

    db.collection('Users').findOneAndUpdate({_id: new ObjectId("5b1e56190ae4d33ca442c5e9")},
    {
        $inc: {
            age: -2
        }
    },
 {
     returnOriginal: true
 }
).then((result)=> {
    console.log(result);
} )

db.close();
})