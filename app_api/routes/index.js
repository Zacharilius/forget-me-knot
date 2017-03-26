var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlReminders = require('../controllers/reminders');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileGet);
router.post('/user/verify-email', auth, ctrlProfile.verifyEmailPost);

// reminders
router.post('/reminders', auth, ctrlReminders.reminderPost);
router.delete('/reminders/:id', auth, ctrlReminders.reminderDelete);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
