import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, AfterViewChecked } from '@angular/core';
import { CommentDto } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements AfterViewChecked {
  @Input() comment!: CommentDto;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<CommentDto>();

  isEditing = false;

  @ViewChild('editInput') editInput?: ElementRef;

  confirmDelete() {
    if (confirm('Удалить комментарий?')) {
      this.delete.emit(this.comment.commentId);
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  confirmUpdate() {
    this.isEditing = false;
    this.update.emit(this.comment);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isEditing && this.editInput && !this.editInput.nativeElement.contains(event.target)) {
      this.confirmUpdate();
    }
  }

  ngAfterViewChecked() {
    if (this.isEditing && this.editInput) {
      setTimeout(() => this.editInput?.nativeElement.focus(), 0);
    }
  }
}
