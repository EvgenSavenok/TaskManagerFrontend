import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TagDto} from '../../models/tag.model';
import {NgForOf, NgIf} from '@angular/common';
import {TagsService} from '../../services/tags.service';
import {catchError, throwError} from 'rxjs';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-tags-control-panel',
  templateUrl: './tags-control-panel.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./tags-control-panel.component.css']
})
export class TagsControlPanelComponent implements OnInit {
  @Input() tags: TagDto[] = [];
  @Output() deleteTag = new EventEmitter<string>();
  @Output() updateTag = new EventEmitter<TagDto>();

  showAddTag: boolean = false;
  newTagName = '';
  editingTag: TagDto | null = null;

  constructor(
    private tagsService: TagsService,
    public tagRef: ElementRef,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tagsService.getAllTags().pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка загрузки тегов');
        return throwError(() => error);
      })
    ).subscribe(tags => {
      this.tags = tags.map(tag => ({ ...tag }));
    });
  }

  addTag() {
    if (!this.newTagName.trim()) {
      return;
    }

    const newTag: TagDto = { tagId: Date.now(), tagName: this.newTagName.trim() } as any;
    this.tags.push(newTag);
    this.updateTag.emit(newTag);
    this.newTagName = '';
    this.showAddTag = false;

    this.tagsService.createTag(newTag).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка добавления тега');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.loadTags();
    });
  }

  startEditing(tag: TagDto) {
    this.editingTag = tag;
  }

  confirmEdit(tag: TagDto) {
    this.editingTag = null;
    this.updateTag.emit(tag);

    this.tagsService.updateTag(tag).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка обновления тега');
        return throwError(() => error);
      })
    ).subscribe(() => {
      window.location.reload();
    });
  }

  removeTag(tag: TagDto) {
    if (confirm(`Вы уверены, что хотите удалить тег "${tag.tagName}"?`)) {
      this.tags = this.tags.filter(t => t.id !== tag.id);
      this.deleteTag.emit(tag.id);

      this.tagsService.deleteTag(tag.id).pipe(
        catchError(error => {
          this.errorHandlerService.showError('Ошибка удаления тега');
          return throwError(() => error);
        })
      ).subscribe(() => {
        window.location.reload();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    const clickedInsidePanel = this.tagRef.nativeElement.contains(targetElement);

    const clickedOnInput = targetElement.tagName === 'INPUT';

    if (this.editingTag && !clickedOnInput && !clickedInsidePanel) {
      this.editingTag = null;
    }

    if (this.showAddTag && !clickedInsidePanel) {
      this.showAddTag = false;
      this.newTagName = '';
    }
  }
}
