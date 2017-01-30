import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReminderDetailsComponent } from './reminder/reminder-details/reminder-details.component';
import { ReminderListComponent } from './reminder/reminder-list/reminder-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ReminderDetailsComponent,
    ReminderListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
