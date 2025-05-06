import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {catchError, throwError} from 'rxjs';
import {TagsService} from '../../services/tags.service';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';
import {TagDto} from '../../models/tag.model';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tag-list.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  @Input() tags: TagDto[] = [];
  @Input() taskId!: string;

  constructor(
    private tagsService: TagsService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    if (this.taskId) {
      this.tagsService.getAllTagsOfTask(this.taskId).pipe(
        catchError(error => {
          this.errorHandlerService.showError('Ошибка загрузки тегов для задачи');
          return throwError(() => error);
        })
      ).subscribe(tags => {
        this.tags = tags.map(tag => ({...tag}));
      });
    }
  }
}
