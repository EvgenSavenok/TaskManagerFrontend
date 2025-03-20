import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<TaskDto[]>(`${this.baseUrl}/tasks/getAllTasksOfUser`, { headers });
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<TaskDto>(`${this.baseUrl}/tasks/addTask`, task, { headers });
  }

  updateTask(task: TaskDto): Observable<TaskDto> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.put<TaskDto>(`${this.baseUrl}/tasks/updateTask`, task, { headers });
  }

  deleteTask(id: string): Observable<void> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.delete<void>(`${this.baseUrl}/tasks/deleteTask/${id}`, { headers });
  }
}
