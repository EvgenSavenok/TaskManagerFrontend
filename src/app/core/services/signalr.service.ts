import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  hubConnection: signalR.HubConnection;
  private isConnected = false;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5151/userHub')
      .withAutomaticReconnect()
      .build();
  }

  startConnection() {
    if (this.isConnected) {
      console.warn('SignalR уже подключен');
      return;
    }

    this.hubConnection
      .start()
      .then(() => {
        this.isConnected = true;
      })
      .catch(err => console.error('Ошибка подключения SignalR:', err));
  }
}
