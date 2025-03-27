import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import {TagDto} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRTaskService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5271/taskHub")
      .build();

    this.startConnection();
    this.addTaskUpdateListener();
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection established');
      })
      .catch(err => {
        console.error('Error while establishing SignalR connection: ', err);
      });
  }

  addTaskUpdateListener(): void {
    this.hubConnection.on('ReceiveTaskUpdate', (task) => {
      console.log('Task updated:', task);
    });
  }

  public sendTaskUpdate(task: TagDto): void {
    this.hubConnection.invoke('SendTaskUpdate', task)
      .catch(err => console.error('Error while sending task update: ', err));
  }
}

