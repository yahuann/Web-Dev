// // make connection with mongoDB driver
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//       client.close();
//     });
// });
//
//
// // insert records into database
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//     {name : "apple", price: 2.0},
//        {name : "orange"},
//        {name : "grape", price: 3.0}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
//
//
//
// //search records in the database
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruit) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruit)
//     callback(fruit);
//   });
// }


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add Name"]
  },
  price: {
    type: Number,
    min: 1,
    max: 10
  }
});
// model(x,) x is name of Collection: Fruit -> fruits
const Fruit = mongoose.model('Fruit', fruitScheme);

const fruit = new Fruit({
  name: "apple",
  price: 2.0
});
// fruit.save().then(() => console.log('meow'));

const orange = new Fruit({
  name: "Orange",
  price: 2.0
});
const grape = new Fruit({
  name: "Grape"
});

// Fruit.insertMany([orange,grape],function(err){
//   if(err){
//     console.log(err);
//   } else{
//      console.log("successfully");
//   }
// });



// Fruit.find(function(err, fruit) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Found");
//     console.log(fruit);
//
//   }
// });

// Fruit.updateOne({ _id: "5f2f90fc4db92c45e8c2fe50" }, { price: 3 },function(err){
//   if(err){
//     console.log(err);
//   } else{
//      console.log("successfully updated");
//        mongoose.connection.close();
//   }
// });

//
// Fruit.deleteMany({ name: 'Orange' }, function (err) {
//   if(err){
//       console.log(err);
//     } else{
//        console.log("successfully deleted");
//          mongoose.connection.close();
//     }
// });



const peopleScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add Name"]
  },
  fvFruit: fruitScheme
});
const Person = mongoose.model('Person', peopleScheme);
// fvFruit do not neccessary be in the Fruit schema
const person = new Person({
  name: "John",
  fvFruit: orange
});
person.save().then(() => console.log('meow'));
