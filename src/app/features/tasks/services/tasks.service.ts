import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDto } from '../moduls/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${this.baseUrl}/tasks/getAllTasksOfUser`);
  }

  getTaskById(id: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.baseUrl}/tasks/getTaskById/${id}`);
  }

  createTask(task: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(id: string, task: TaskDto): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }
}
