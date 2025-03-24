import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentDto} from '../models/comment.model';
import {TaskDto} from '../../tasks/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  getCommentsByTaskId(taskId: string): Observable<CommentDto[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<CommentDto[]>(
      `${this.baseUrl}/comments/${taskId}/getAllCommentsOfTask`, { headers });
  }

  createComment(comment: CommentDto): Observable<CommentDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<CommentDto>(`${this.baseUrl}/comments/addComment`, comment, { headers });
  }

  deleteComment(commentId: string): Observable<void> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.delete<void>(`${this.baseUrl}/comments/deleteComment/${commentId}`, { headers });
  }

  updateComment(comment: CommentDto): Observable<TaskDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.put<TaskDto>(`${this.baseUrl}/comments/updateComment`, comment, { headers });
  }
}
