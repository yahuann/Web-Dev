//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const userScheme = new mongoose.Schema({
  email: {
    type: String
    // required: [true, "Please Add Name"]
  },
  password: {
    type: String
  }
});
<<<<<<< HEAD
const User = mongoose.model('User', userScheme);

=======
// encrypt when "save", decrypt when "find"

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: [] });
const User = mongoose.model('User', userSchema);
>>>>>>> 7a6e972... level 2: encrytion and dotenv


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res){
  res.render("home");
});

// level 1 login
app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});

// level 1 register
app.post("/register", function(req, res){
  const newUser =  new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});
