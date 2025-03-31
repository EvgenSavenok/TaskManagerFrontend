import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRole(): string | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'Administrator';
  }

  isUser(): boolean {
    return this.getRole() === 'User';
  }

  localLogout() {
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    window.location.href = '/login';
  }

  refreshToken(): Observable<string> {
    const accessToken = localStorage.getItem('accessToken');

    return this.http.post<string>(
      `${this.baseUrl}/token/refresh`,
      { accessToken: accessToken },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
      }
    ).pipe(
      map(response => {
        console.log('Новый accessToken:', response);
        localStorage.setItem('accessToken', response);
        return response;
      }),
      catchError(error => {
        console.error('Ошибка обновления access-токена:', error);
        return throwError(() => error);
      })
    );
  }

}
