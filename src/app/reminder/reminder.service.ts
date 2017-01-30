import { Injectable } from '@angular/core';
import { Reminder } from './reminder';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReminderService {
    private remindersUrl = '/api/reminders';

    constructor (private http: Http) {}

    // get("/api/reminders")
    getReminders(): Promise<Reminder[]> {
      return this.http.get(this.remindersUrl)
                 .toPromise()
                 .then(response => response.json() as Reminder[])
                 .catch(this.handleError);
    }

    // post("/api/reminders")
    createReminder(newReminder: Reminder): Promise<Reminder> {
      return this.http.post(this.remindersUrl, newReminder)
                 .toPromise()
                 .then(response => response.json() as Reminder)
                 .catch(this.handleError);
    }

    // get("/api/reminders/:id") endpoint not used by Angular app

    // delete("/api/reminders/:id")
    deleteReminder(delReminderId: String): Promise<String> {
      return this.http.delete(this.remindersUrl + '/' + delReminderId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/reminders/:id")
    updateReminder(putReminder: Reminder): Promise<Reminder> {
      var putUrl = this.remindersUrl + '/' + putReminder._id;
      return this.http.put(putUrl, putReminder)
                 .toPromise()
                 .then(response => response.json() as Reminder)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
