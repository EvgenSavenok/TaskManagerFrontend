import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../features/users/services/users.service';
import { AuthService } from '../services/auth.service';
import { TasksService } from '../../features/tasks/services/tasks.service';
import { NgIf } from '@angular/common';
import { TaskListComponent } from '../../features/tasks/components/tasksList/task-list.component';
import { GetAllUsersComponent } from '../../features/users/components/usersList/get-all-users.component';
import {Router} from '@angular/router';
import {LogoutComponent} from '../../features/users/components/logout/logout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgIf,
    TaskListComponent,
    GetAllUsersComponent,
    LogoutComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  users: any[] = [];
  tasks: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.authService.isAdmin()) {
      this.role = "Administrator";
      this.getAllUsers();
    } else if (this.authService.isUser()) {
      this.role = "User";
      this.getTasks();
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

  getTasks() {
    // this.tasksService.getAllTasks().subscribe(
    //   (response) => {
    //     this.tasks = response;
    //   },
    //   (error) => {
    //     this.errorMessage = 'Ошибка при загрузке задач: ' + error.message;
    //   }
    // );
  }
}
