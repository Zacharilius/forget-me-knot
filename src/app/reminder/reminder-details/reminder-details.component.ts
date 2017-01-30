import { Component, Input } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.css']
})

export class ReminderDetailsComponent {
  @Input()
  reminder: Reminder;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private reminderService: ReminderService) {}

  createReminder(reminder: Reminder) {
    this.reminderService.createReminder(reminder).then((newReminder: Reminder) => {
      this.createHandler(newReminder);
    });
  }

  updateReminder(reminder: Reminder): void {
    this.reminderService.updateReminder(reminder).then((updatedReminder: Reminder) => {
      this.updateHandler(updatedReminder);
    });
  }

  deleteReminder(reminderId: String): void {
    this.reminderService.deleteReminder(reminderId).then((deletedReminderId: String) => {
      this.deleteHandler(deletedReminderId);
    });
  }
}
