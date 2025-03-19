import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskDto } from '../../models/task.model';
import { TaskItemComponent } from '../taskItem/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: TaskDto[] = [];
  highPriorityTasks: TaskDto[] = [];
  mediumPriorityTasks: TaskDto[] = [];
  lowPriorityTasks: TaskDto[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.getAllTasksOfUser();
  }

  getAllTasksOfUser() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.categorizeTasksByPriority();
    });
  }

  categorizeTasksByPriority() {
    this.highPriorityTasks = this.tasks.filter((task) => task.priority === 1);
    this.mediumPriorityTasks = this.tasks.filter((task) => task.priority === 2);
    this.lowPriorityTasks = this.tasks.filter((task) => task.priority === 3);
  }
}
