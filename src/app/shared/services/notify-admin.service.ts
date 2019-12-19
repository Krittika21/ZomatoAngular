import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class NotifyAdminService {
  connection: signalR.HubConnection;
  public msg: BehaviorSubject<string>;
  currentUser: User;
  isAdmin: boolean;
  constructor() {
    this.isAdmin = false;
    this.msg = new BehaviorSubject('');
  }



  StartConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("https://localhost:44349/notify")
      .build();
    this.connection.start().then(k => {
      console.log('Connected!');
      if (this.isAdmin) {
        this.connection.invoke("AdminCheck");
        console.log('admin logged in.');
        this.connection.on("SendMessage", (type: string, payload: string) => {
          this.msg.next(payload);
          console.log('user ordered.');
          // this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
        });
      }
    }).catch(function (err) {
      return console.error(err.toString());
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser && this.currentUser.role[0] === "admin") {
      this.isAdmin = true;
    }


  }

  SendNotification(type: string, payload: string) {
    if (!this.isAdmin) {
      this.connection.invoke("SendNotification", type, payload);
    }
  }

  StopConnection() {
    if (this.isAdmin) {
      this.connection.invoke("RemoveConnection");
    }
  }
}