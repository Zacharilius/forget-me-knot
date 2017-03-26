var mongoose = require('mongoose');
var gravatar = require('gravatar');
var User = mongoose.model('User');
var Reminder = mongoose.model('Reminder');

/* GET Proile */
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
          var userInfo = {};
          userInfo._id = user._id;
          userInfo.email = user.email;
          userInfo.name = user.name;
          userInfo.gravatarSrc = gravatar.url(user.email, {s: '200', r: 'pg', d: 'retro'});
          res.status(200).json({
            'user': userInfo,
            'reminders': reminders});
        });
      });
  }
};

function gravatarUrl() {
  crypto.createHash('md5').update(data).digest("hex");
}

/* Verify Email */

module.exports.verifyEmailPost = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in to verify email."
    });
  } else {
    var receivedEmailVerifyCode = req.body;
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if (receivedEmailVerifyCode === user.emailVerificationCode) {
          user.emailVerified = true;
          user.update(user, function(err, updatedUser) {
            if (err) return next(error);

            res.status(200).json({
              "message" : "Success: You account email has been verified."
            });
          });
        } else {
          res.status(404).json({
            "message" : "Verification code does not match the one you were emailed."
          });
        }
      });
  }
}
