/*      reassign     function-scope     block-scope
var       Y            local               global
let       Y            local               local
const     N            local               local
*/
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser")
const app = express();

//date is a function=getDate in date.js; to run the funtion, now we can do date()
const date = require(__dirname+"/date.js");

const port = 3000;
let items = ["Buy Food", "Cook Food", "Eat Food"];

// can still push to the array. but cant be assign as a new array;
 //some of dic, can change a key /value; cant be assign as a new dic 
const workItems = [];


app.use(bodyParser.urlencoded({
  extended: true
}));
// tell express to serve static file(css, img, js for browser) in the folder public
app.use(express.static("public"));

//ejs package; serve up .ejs file
app.set('view engine', 'ejs');


app.listen(port, function() {
  console.log('To Do List project listening at http://localhost:' + port);
});


app.get("/", function(req, res) {



  // var curDay = today.getDay(); // new Date.getDay(); 0-6 Sun-Sat
  // var day = "";
  // switch (curDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     // code block
  //     console.log("Error: current day is:" + curDay);
  // }

 let day = date.getDate();

  // res.sendFile(__dirname + "/index.html");

  //look for a folder called views and file call list.ejs
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
      items.push(item);
      res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work",function(req,res) {
 let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.get("/about", function(req,res){
  res.render("about");
});
