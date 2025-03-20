import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskDto} from '../../models/task.model';
import {TaskItemComponent} from '../taskItem/task-item.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: TaskDto[] = [];
  highPriorityTasks: TaskDto[] = [];
  mediumPriorityTasks: TaskDto[] = [];
  lowPriorityTasks: TaskDto[] = [];

  isAddingTask: boolean = false;
  newTask: TaskDto =
    {
      taskId: '',
      title: '',
      description: '',
      priority: 2,
      category: 1,
      deadline: new Date(),
      minutesBeforeDeadline: 1,
      userTimeZone: 'Europe/Minsk',
    };

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

  toggleAddTaskForm() {
    this.isAddingTask = !this.isAddingTask;
  }

  addTask() {
    const localDeadline = new Date(this.newTask.deadline);
    this.newTask.priority = Number(this.newTask.priority);
    this.newTask.category = Number(this.newTask.category);

    this.newTask.taskId = crypto.randomUUID();

    this.newTask.deadline = new Date(localDeadline.getTime() - localDeadline.getTimezoneOffset() * 60000);

    this.tasksService.createTask(this.newTask).subscribe(() => {
      this.isAddingTask = false;
      this.getAllTasksOfUser();
    });
  }

}
