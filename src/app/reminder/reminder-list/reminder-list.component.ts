import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';
import { ReminderDetailsComponent } from '../reminder-details/reminder-details.component';

@Component({
  selector: 'reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css'],
  providers: [ReminderService]
})

export class ReminderListComponent implements OnInit {

  reminders: Reminder[]
  selectedReminder: Reminder

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
     this.reminderService
      .getReminders()
      .then((reminders: Reminder[]) => {
        this.reminders = reminders.map((reminder) => {
          return reminder;
        });
      });
  }

  private getIndexOfReminder = (reminderId: String) => {
    return this.reminders.findIndex((reminder) => {
      return reminder._id === reminderId;
    });
  }

  selectReminder(reminder: Reminder) {
    this.selectedReminder = reminder
  }

  createNewReminder() {
    var reminder: Reminder = {
      title: '',
      startIsoDatetime: new Date().toISOString(),
      sentIsoDatetimes: '',
      dayFrequency: ''
    };

    // By default, a newly-created reminder will have the selected state.
    this.selectReminder(reminder);
  }

  deleteReminder = (reminderId: String) => {
    var idx = this.getIndexOfReminder(reminderId);
    if (idx !== -1) {
      this.reminders.splice(idx, 1);
      this.selectReminder(null);
    }
    return this.reminders;
  }

  addReminder = (reminder: Reminder) => {
    this.reminders.push(reminder);
    this.selectReminder(reminder);
    return this.reminders;
  }

  updateReminder = (reminder: Reminder) => {
    var idx = this.getIndexOfReminder(reminder._id);
    if (idx !== -1) {
      this.reminders[idx] = reminder;
      this.selectReminder(reminder);
    }
    return this.reminders;
  }
}
