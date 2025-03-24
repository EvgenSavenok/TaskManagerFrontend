import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { CommentDto } from '../models/comment.model';
import {NgForOf, NgIf} from '@angular/common';
import {CommentItemComponent} from '../commentItem/comment-item.component';
import {FormsModule} from '@angular/forms';

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

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    if (this.taskId) {
      this.commentsService.getCommentsByTaskId(this.taskId).subscribe((comments) => {
        this.comments = comments;
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

    this.commentsService.createComment(newComment).subscribe((comment) => {
      this.comments.unshift(comment);
      this.newCommentText = '';
    });
  }

  deleteComment(commentId: string) {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.loadComments();
    });
  }

  updateComment(comment: CommentDto) {
    this.commentsService.updateComment(comment).subscribe(() => {
      this.loadComments();
    })
  }
}
