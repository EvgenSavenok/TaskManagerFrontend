import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentDto } from '../models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {
  @Input() comment!: CommentDto;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<CommentDto>();

  confirmDelete() {
    if (confirm('Удалить комментарий?')) {
      this.delete.emit(this.comment.commentId);
    }
  }

  updateComment() {
    this.update.emit(this.comment);
  }
}
