import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagDto} from '../models/tag.model';
import {TaskDto} from '../../tasks/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseUrl = 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<TagDto[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<TagDto[]>(`${this.baseUrl}/tags/getAllTags`, { headers });
  }

  getAllTagsOfTask(taskId: string): Observable<TagDto[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<TagDto[]>(`${this.baseUrl}/tags/${taskId}/getAllTagsOfTask`, { headers });
  }

  createTag(tag: TagDto): Observable<TagDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<TagDto>(`${this.baseUrl}/tags/addTag`, tag, { headers });
  }

  updateTag(tag: TagDto): Observable<TagDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.put<TagDto>(`${this.baseUrl}/tags/updateTag/${tag.id}`, tag, { headers });
  }

  deleteTag(tagId: string): Observable<void> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.delete<void>(`${this.baseUrl}/tags/deleteTag/${tagId}`, { headers });
  }
}
