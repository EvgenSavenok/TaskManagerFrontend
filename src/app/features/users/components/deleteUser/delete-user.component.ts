import {Component, EventEmitter, Input, Output} from '@angular/core';
import { UsersService } from '../../services/users.service';
import {NgIf} from '@angular/common';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';
import {catchError, throwError} from 'rxjs';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Input() userId: string = '';
  @Output() userDeleted = new EventEmitter<void>();
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    private errorHandlerService: ErrorHandlerService) {}

  deleteUser() {
    if (!this.userId) {
      this.errorMessage = 'ID пользователя не задан';
      return;
    }

    const isConfirmed = confirm('Вы уверены, что хотите удалить этого пользователя?');

    if (!isConfirmed) {
      return;
    }

    this.usersService.deleteUser(this.userId).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка удаления пользователя');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.userDeleted.emit();
    });
  }
}
