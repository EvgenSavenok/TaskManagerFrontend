import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {NgIf} from '@angular/common';

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
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  deleteUser() {
    if (!this.userId) {
      this.errorMessage = 'ID пользователя не задан';
      return;
    }

    this.usersService.deleteUser(this.userId).subscribe(
      () => {
        alert('Пользователь успешно удален');
      },
      (error) => {
        this.errorMessage = 'Ошибка при удалении пользователя: ' + error.message;
      }
    );
  }
}
