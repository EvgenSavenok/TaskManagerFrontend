import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskListComponent} from './features/tasks/components/tasksList/task-list.component';
import {UsersModule} from './features/users/moduls/users.module';
import {RegisterComponent} from './features/users/components/register/register.component';

@Component({
  selector: 'app-root',
  imports: [UsersModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManager';
}
