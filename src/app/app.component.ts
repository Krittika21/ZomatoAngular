import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZOMATO';
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:44335/notify")
      .build();
      console.log('aaaaaaaaaaaaaaaaaaaa!');
    connection.start().then(k => {
      debugger;
      console.log('Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (type: string, payload: string) => {
      this.messageService.add({ severity: type, summary: payload, detail: 'Via SignalR' });
    });
  }
}
