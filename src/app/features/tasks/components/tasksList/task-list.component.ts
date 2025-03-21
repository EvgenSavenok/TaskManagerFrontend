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

  isAddingHigh = false;
  isAddingMedium = false;
  isAddingLow = false;

  newTask: TaskDto = this.getEmptyTask();

  categories = [
    { id: 1, name: 'Работа' },
    { id: 2, name: 'Учёба' },
    { id: 3, name: 'Спорт' },
    { id: 4, name: 'Домашние дела' }
  ];

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

  toggleAddTaskForm(priority: string) {
    this.isAddingHigh = priority === 'high' ? !this.isAddingHigh : false;
    this.isAddingMedium = priority === 'medium' ? !this.isAddingMedium : false;
    this.isAddingLow = priority === 'low' ? !this.isAddingLow : false;
  }

  addTask(priority: number) {
    this.newTask.priority = priority;
    this.newTask.category = (Number)(this.newTask.category);
    this.newTask.taskId = crypto.randomUUID();

    const localDeadline = new Date(this.newTask.deadline);
    this.newTask.deadline = new Date(localDeadline.getTime() - localDeadline.getTimezoneOffset() * 60000);

    this.tasksService.createTask(this.newTask).subscribe(() => {
      this.getAllTasksOfUser();
      this.newTask = this.getEmptyTask();
      this.closeForms();
    });
  }

  private closeForms() {
    this.isAddingHigh = false;
    this.isAddingMedium = false;
    this.isAddingLow = false;
  }

  private getEmptyTask(): TaskDto {
    return {
      taskId: '',
      title: '',
      description: '',
      priority: 2,
      category: 1,
      deadline: new Date(),
      minutesBeforeDeadline: 1,
      userTimeZone: 'Europe/Minsk',
    };
  }
}
