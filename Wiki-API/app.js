const express = require("express");
const bodyParser = require("body-parser");
const credential = require(__dirname + '/constants');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

const urlLocal = "mongodb://localhost:27017/wikiDB"
// const urlextenal = "mongodb+srv://" + credential.cred + "@cluster0.fidxo.mongodb.net/todolistDB?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(urlLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // ,
  // useFindAndModify: false
});

const articleScheme = new mongoose.Schema({
  title: {
    type: String
    // required: [true, "Please Add Name"]
  },
  content: {
    type: String
  }
});
const Article = mongoose.model('Article', articleScheme);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// // GET all
// app.get("/articles", function(req, res) {
//   Article.find(function(err, articles) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(articles)
//     }
//   });
// });
//
// // POST
// app.post("/articles", function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.contentS
//   });
//   newArticle.save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("successfully insert a record in the collection");
//     }
//   });
// });
//
// // DELETE all
// app.delete("/articles", function(req, res) {
//   Article.deleteMany(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("successfully Remove all records in the collection");
//     }
//   });
// });


// chain all get/post/delete handles for the same route
app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, articles) {
      if (err) {
        console.log(err);
      } else {
        res.send(articles)
      }
    });
  })
  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully insert a record in the collection");
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully delete all records in the collection");
      }
    });
  });

// ////////////////////////////////////////////////////
app.route("/articles/:articleTitle")
  // const articleTitle = req.params.articleTitle;
  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, article) {
      if (err) {
        console.log(err);
      } else {
        res.send(article)
      }
    });
  })
  // MongoDB's overrite is true by default
  // entire record is remove and reset, if body title is sent null, the new record wont have title field
  .put(function(req, res) {
    Article.update({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overrite: true
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("successfully update a record in the collection");
        }
      });
  })
  // only update field provided with new value
  .patch(function(req, res) {
    Article.update({
        title: req.params.articleTitle
      },
      {
        title: req.body.title,
        content: req.body.content
      },
      {$set: req.body},
      function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("successfully update a record in the collection");
        }
      });
  })
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully delete a record in the collection");
      }
    });
  })
