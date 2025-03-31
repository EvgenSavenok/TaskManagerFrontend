import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';
import {SignalRService} from '../../../../core/services/signalr.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() userId: string = '';
  @Output() userDeleted = new EventEmitter<void>();
  errorMessage: string | null = null;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private signalRService: SignalRService) {}

  ngOnInit(): void {}

  deleteUser() {
    if (!this.userId) {
      this.errorMessage = 'ID пользователя не задан';
      return;
    }

    const isConfirmed = confirm('Вы уверены, что хотите удалить этого пользователя?');

    if (!isConfirmed) {
      return;
    }

    this.signalRService.hubConnection.invoke('DeleteUser', this.userId)
      .then(() => {
        this.userDeleted.emit();
      })
      .catch(() => {
        this.errorHandlerService.showError("Ошибка при удалении пользователя")
      });
  }
}
