var mongoose = require('mongoose');
var User = mongoose.model('User');
var Reminder = mongoose.model('Reminder');

module.exports.reminderPost = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in to post"
    });
  } else {
    var reminder = req.body;
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if (err) throw err;
        var newReminder = new Reminder({
          user: user._id,
          title: reminder.title,
          startReminderTime: new Date(),
          remindersSent: [],
          remindEveryDays: reminder.remindEveryDays
        });
        newReminder.save(function(err) {
          if (err) throw err;
          res.json(newReminder);
        });
      });
  }
}

module.exports.reminderDelete = function(req, res) {
  console.log('reminderDelete');
  var id = req.params.id;
  console.log(id);
  Reminder
      .findByIdAndRemove(id)
      .exec(function(err) {
        if (err) throw err;

        res.json({"message": "Deleted"});
      });
}
