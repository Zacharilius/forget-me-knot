var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var REMINDERS_COLLECTION = "reminders";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Reminder Routes

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/reminders/:id"
 *    GET: find reminder by id
 *    PUT: update reminder by id
 *    DELETE: deletes reminder by id
 */

app.get("/api/reminders", function(req, res) {
  db.collection(REMINDERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get reminders.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/reminders", function(req, res) {
  var newReminder = req.body;

  if (!req.body.title) {
    handleError(res, "Invalid user input", "Must provide a title.", 400);
  } else if (!req.body.dayFrequency) {
    handleError(res, "Invalid user input", "Must provide a dayFrequency.", 400);
  }

  db.collection(REMINDERS_COLLECTION).insertOne(newReminder, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new reminder.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/reminders/:id"
 *    GET: find reminder by id
 *    PUT: update reminder by id
 *    DELETE: deletes reminder by id
 */

app.get("/api/reminders/:id", function(req, res) {
  db.collection(REMINDERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get reminder");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/reminders/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(REMINDERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update reminder");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/reminders/:id", function(req, res) {
  db.collection(REMINDERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete reminder");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
