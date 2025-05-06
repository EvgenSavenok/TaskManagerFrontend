import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../features/users/services/users.service';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { TaskListComponent } from '../../../features/tasks/components/tasksList/task-list.component';
import { GetAllUsersComponent } from '../../../features/users/components/usersList/get-all-users.component';
import {LogoutComponent} from '../../../features/users/components/logout/logout.component';
import {TagsControlPanelComponent} from '../../../features/tags/components/tagsControlPanel/tags-control-panel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgIf,
    TaskListComponent,
    GetAllUsersComponent,
    TagsControlPanelComponent,
    LogoutComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  users: any[] = [];
  tasks: any[] = [];
  tags: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    setInterval(() => {
      this.authService.refreshToken().subscribe({});
      // Expiration time of access token (5 minutes)
    }, 10000);
  }

  loadData() {
    if (this.authService.isAdmin()) {
      this.role = "Administrator";
      this.getAllUsers();
    } else if (this.authService.isUser()) {
      this.role = "User";
    } else {
      this.errorMessage = 'Роль пользователя не определена.';
    }
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
