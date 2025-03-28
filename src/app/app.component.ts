import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskListComponent} from './features/tasks/components/tasksList/task-list.component';
import {UsersModule} from './features/users/moduls/users.module';
import {RegisterComponent} from './features/users/components/register/register.component';
import {ErrorMessageComponent} from './core/components/errorMessage/error-message.component';

@Component({
  selector: 'app-root',
  imports: [UsersModule, RouterOutlet, ErrorMessageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManager';
}
