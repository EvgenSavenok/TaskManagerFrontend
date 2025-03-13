import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../models/task.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.addTaskUpdateListener();
  }

  updateTask(): void {
    const updatedTask: TaskDto = {
      TaskId: 'some-guid',
      UserId: 'user-id',
      Title: 'Updated Task',
      Description: 'Updated task description',
      Category: 1,
      Priority: 1,
      Deadline: new Date(),
      MinutesBeforeDeadline: 30,
      UserTimeZone: 'UTC',
      UserEmail: 'user@example.com',
      TaskTags: [],
      TaskComments: []
    };

    this.taskService.sendTaskUpdate(updatedTask);
  }
}
