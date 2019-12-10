import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as signalR from '@aspnet/signalr';
import { NotifyAdminService } from './shared/services/notify-admin.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZOMATO';
  connection: signalR.HubConnection;
  msgs : string;
  currentUser: User;
  constructor(private messageService: MessageService, private _signalr: NotifyAdminService) { 
    _signalr.msg.subscribe(
      k=>{
        console.log('notified!');
        this.messageService.add({
          severity: "success", summary: k, detail: ''
        })
      }
    )
  }

  ngOnInit(): void {
    this._signalr.StartConnection();
  }
}
