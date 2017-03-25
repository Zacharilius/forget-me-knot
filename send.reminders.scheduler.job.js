#! /app/bin/node

require('./app_api/models/db');
require('./app_api/models/reminders.js')
require('./app_api/models/users.js')

var mongoose = require('mongoose');
var Reminder = mongoose.model('Reminder');
var User = mongoose.model('User');

function sendReminders() {
  Reminder.find({}, function(err, reminders) {
    if (err) {
        throw err
    };

    reminders.forEach(function(reminder) {
        if (shouldSendReminder(reminder)) {
            var reminderType = reminder.reminderType;
            var userEmail = users.email;
            var reminderMessage = reminder.title;
            if (reminderType === 'text') {
                sendReminderTextFor(reminderMessage, user.phoneNumber);
            } else if (reminderType === 'email') {
                sendReminderEmailFor(reminderMessage, user.email);
            } else {
                throw 'Unrecognized reminderType';
            }
        }
    });
    process.exit();
  });
}

function shouldSendReminder(reminder) {
    var remindersSent = reminder.remindersSent;
    var reminderTimeToUse;
    if (remindersSent.length == 0) {
        reminderTimeToUse = new Date(reminder.startReminderTime);
    } else {
        remindersSent.sort();
        reminderTimeToUse = new Date(reminderSent[reminderSent.length - 1]);
    }

    var msInADay = (1000*60*60*24);
    var now = new Date();
    return (now - oldDate) / msInADay >= reminder.remindEveryDays
}

function sendReminderEmailFor(reminderMessage, userEmail) {
    var send = require('gmail-send')({
        user: process.env.GMAIL_SMTP_USER || 'test@test.com', // Test Email
        pass: process.env.GMAIL_SMTP_PASSWORD || 'password',  // Test Password
        to:   userEmail,              // Send to yourself
        subject: 'Reminder',
        text:    reminderMessage           // Plain text
    })();                             // Send without any check
}

function sendReminderTextFor(reminderMessage, phoneNumber) {
    // TODO: Implement
    console.log('Not Implemented');
}

sendReminders();
