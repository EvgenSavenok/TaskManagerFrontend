import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { TaskDto } from '../moduls/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})

export class TaskListComponent implements OnInit {
  task: TaskDto | null = null;
  @Input() tasks: any[] = [];

  constructor(private apiService: TasksService) {}

  ngOnInit() {
    this.getTaskById("1e13a1c4-2ea3-434c-a111-0835e13e9c8e");
  }

  getTaskById(id: string) {
    this.apiService.getTaskById(id).subscribe(task => {
      this.task = task;
    });
  }
}
