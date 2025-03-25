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
}
