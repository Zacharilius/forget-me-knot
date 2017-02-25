var mongoose = require('mongoose');
var User = mongoose.model('User');
var Reminder = mongoose.model('Reminder');

module.exports.profileGet = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        Reminder.find({user: req.payload._id})
        .exec(function(err, reminders) {
          res.status(200).json({
            'user': user,
            'reminders': reminders});
        });
      });
  }
};
