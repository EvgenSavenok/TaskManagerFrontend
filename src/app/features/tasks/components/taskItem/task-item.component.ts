import { Component, Input } from '@angular/core';
import { TaskDto } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  imports: [
    FormsModule,
    NgIf,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: TaskDto | undefined;
  editingField: string | null = null;
  editableValue: any = '';

  categoryMap: Record<number, string> = {
    1: 'Работа',
    2: 'Учёба',
    3: 'Спорт',
    4: 'Домашние дела'
  };

  categoryKeys = Object.keys(this.categoryMap).map(Number);

  constructor(private tasksService: TasksService) {}

  getCategoryName(category?: number): string {
    return category !== undefined ? this.categoryMap[category] ?? 'Неизвестная категория' : 'Неизвестная категория';
  }

  editField(field: string) {
    this.editingField = field;

    if (this.task) {
      this.editableValue = this.task[field];
      console.log("this.editableValue");
    }
  }

  onCategoryChange(newValue: any) {
    this.editableValue = newValue;
    console.log("Updated editableValue:", this.editableValue);
  }

  saveEdit(field: string) {
    if (this.task) {
      console.log(this.task);
      console.log(this.editableValue);
      this.task = { ...this.task, [field]: this.editableValue };
      console.log(this.task);

      this.tasksService.updateTask(this.task).subscribe(() => {
        this.editingField = null;
      });
    }
  }

  deleteTask() {
    console.log('Задача удалена');
    // ToDo
  }
}

