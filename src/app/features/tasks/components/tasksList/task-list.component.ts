﻿import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {TaskDto} from '../../models/task.model';
import {TaskItemComponent} from '../taskItem/task-item.component';
import {FormsModule} from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {catchError, throwError} from 'rxjs';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';
import {AddTagItemComponent} from '../../../tags/components/tagsListInAddTask/add-tag-list.component';
import {TagDto} from '../../../tags/models/tag.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, FormsModule, CdkDropList, CdkDrag, CdkDropListGroup, AddTagItemComponent],
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

  constructor(
    private tasksService: TasksService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.getAllTasksOfUser();
  }

  getAllTasksOfUser() {
    this.tasksService.getTasks().pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка получения всех задач');
        return throwError(() => error);
      })
    ).subscribe((tasks) => {
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
    this.newTask.deadline = new Date(this.newTask.deadline);

    this.tasksService.createTask(this.newTask).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка создния задачи');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.getAllTasksOfUser();
      this.newTask = this.getEmptyTask();
      this.closeForms();
    });
  }

  onTagsChanged(tags: TagDto[]): void {
    this.newTask.taskTags = tags;
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
      taskTags: []
    };
  }

  drop(event: CdkDragDrop<any[]>, newPriority: string) {
    if (event.previousContainer != event.container) {
      const task = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const priorityMap: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
      task.priority = priorityMap[newPriority];

      this.updateTaskPriority(task);
    }
  }

  updateTaskPriority(taskDto: TaskDto) {
    taskDto.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.tasksService.updateTask(taskDto).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка обновления приоритета задачи');
        return throwError(() => error);
      })
    ).subscribe(
      () => {}
    );
  }
}
