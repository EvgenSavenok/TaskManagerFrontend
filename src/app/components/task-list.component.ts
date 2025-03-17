import { CommonModule } from '@angular/common';
import {TaskDto} from '../models/task.model';
import {Component, OnInit} from '@angular/core';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: TaskDto[] = [];

  constructor(private apiService: TasksService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
