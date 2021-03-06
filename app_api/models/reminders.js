var mongoose = require( 'mongoose' );
require( './users' );

var reminderSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  title: {
    type: String,
    required: true
  },
  startReminderTime: {
    type: Date,
    required: true
  },
  remindersSent: [
    {sentTime: Date}
  ],
  remindEveryDays: Number,
  reminderType: {
    type: String,
    enum: ['text', 'email'],
    default: 'email'
  }
});

mongoose.model('Reminder', reminderSchema);
