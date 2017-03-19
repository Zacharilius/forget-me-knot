var mongoose = require('mongoose');
var User = mongoose.model('User');
var Reminder = mongoose.model('Reminder');

module.exports.reminderPost = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in to post"
    });
  } else {
    var receivedReminder = req.body;
    if (receivedReminder.type === 'add') {
      User
        .findById(req.payload._id)
        .exec(function(err, user) {
          if (err) throw err;
          var newReminder = new Reminder({
            user: user._id,
            title: receivedReminder.title,
            startReminderTime: new Date(),
            remindersSent: [],
            remindEveryDays: receivedReminder.remindEveryDays
          });
          newReminder.save(function(err) {
            if (err) throw err;
            res.json(newReminder);
          });
        });
      } else if(receivedReminder.type === 'update') {
        Reminder
          .findById(receivedReminder._id)
          .exec(function(err, reminder) {
            if (err) throw err;
            reminder.update(receivedReminder, function(err, reminder) {
              if (err) return next(error);
                res.json(reminder);
            });
          });
      } else {
        throw 'Could not locate reminder type for: ' + reminder.type;
      }
  }
}

module.exports.reminderDelete = function(req, res) {
  var id = req.params.id;
  Reminder
    .findByIdAndRemove(id)
    .exec(function(err) {
      if (err) throw err;

      res.json({"message": "Deleted"});
    });
}
