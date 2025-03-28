import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommentDto } from '../../models/comment.model';
import {NgForOf, NgIf} from '@angular/common';
import {CommentItemComponent} from '../commentItem/comment-item.component';
import {FormsModule} from '@angular/forms';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';
import {catchError, throwError} from 'rxjs';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  imports: [
    NgIf,
    CommentItemComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() taskId!: string;
  comments: CommentDto[] = [];
  newCommentText: string = '';

  constructor(
    private commentsService: CommentsService,
    private errorHandlerService: ErrorHandlerService,) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    if (this.taskId) {
      this.commentsService.getCommentsByTaskId(this.taskId).pipe(
        catchError(error => {
          this.errorHandlerService.showError('Ошибка загрузки комментариев');
          return throwError(() => error);
        })
      ).subscribe(comments => {
        this.comments = comments.map(comment => ({ ...comment }));
      });
    }
  }

  addComment() {
    if (!this.newCommentText.trim()) {
      return;
    }

    const newComment: CommentDto = {
      commentId: crypto.randomUUID(),
      taskId: this.taskId,
      content: this.newCommentText,
    };

    this.commentsService.createComment(newComment).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка создания комментария');
        return throwError(() => error);
      })
    ).subscribe(comment => {
      this.comments.unshift(comment);
      this.newCommentText = '';
    });
  }

  deleteComment(commentId: string) {
    this.commentsService.deleteComment(commentId).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка удаления комментария');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.loadComments();
    });
  }

  updateComment(comment: CommentDto) {
    this.commentsService.updateComment(comment).pipe(
      catchError(error => {
        this.errorHandlerService.showError('Ошибка обновления комментария');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.loadComments();
    });
  }
}
