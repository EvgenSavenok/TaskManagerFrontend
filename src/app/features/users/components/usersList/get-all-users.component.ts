import {Component, Input, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import {NgForOf, NgIf} from '@angular/common';
import {DeleteUserComponent} from '../deleteUser/delete-user.component';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  imports: [
    NgForOf,
    NgIf,
    DeleteUserComponent
  ],
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit {
  @Input() users: any[] = [];
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        this.errorMessage = 'Ошибка при загрузке пользователей: ' + error.message;
      }
    );
  }
}
