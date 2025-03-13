import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskComponent} from './components/task.component';

@Component({
  selector: 'app-root',
  imports: [TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManagerFrontend';
}
