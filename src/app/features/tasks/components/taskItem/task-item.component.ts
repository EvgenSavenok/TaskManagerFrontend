import {Component, ElementRef, HostListener, Input} from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {TaskDto} from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: TaskDto | undefined;
  @Input() refreshTasks!: () => void;

  isEditing: boolean = false;
  editedTitle: string = '';
  editedDescription: string = '';
  editedCategory: number | undefined;
  editedMinutesBeforeDeadline: number | undefined;
  editedDeadlineString: string = '';

  categoryMap: { [key: number]: string } = {
    1: 'Работа',
    2: 'Учеба',
    3: 'Спорт',
    4: 'Домашние дела'
  };

  categoryKeys: number[] = Object.keys(this.categoryMap).map(Number);

  constructor(
    private tasksService: TasksService,
    private eRef: ElementRef) {}

  enableEditing() {
    if (!this.task) {
      return;
    }
    this.isEditing = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description;
    this.editedCategory = this.task.category;
    this.editedMinutesBeforeDeadline = this.task.minutesBeforeDeadline;

    this.editedDeadlineString = this.task.deadline
      ? new Date(this.task.deadline).toISOString().slice(0, 16)
      : '';
  }

  saveEdit() {
    if (this.task) {
      this.task.title = this.editedTitle;
      this.task.description = this.editedDescription;
      this.task.category = Number(this.editedCategory!);
      this.task.minutesBeforeDeadline = this.editedMinutesBeforeDeadline!;

      this.task.deadline = this.editedDeadlineString
        ? new Date(this.editedDeadlineString)
        : new Date();

      this.task.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      this.tasksService.updateTask(this.task).subscribe(() => {
        this.isEditing = false;
      });
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isEditing && !this.eRef.nativeElement.contains(event.target)) {
      this.isEditing = false;
    }
  }

  deleteTask() {
    if (this.task) {
      this.tasksService.deleteTask(this.task.taskId).subscribe(() => {
        this.refreshTasks();
      });
    }
  }

  getCategoryName(category: number | undefined): string {
    if (category === undefined || category === null) {
      return 'Неизвестно';
    }
    return this.categoryMap[category] || 'Неизвестно';
  }

  protected readonly Object = Object;
}
