import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5271';

  constructor(
    private http: HttpClient,
    private router: Router) {}

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
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<{ accessToken: string } | null> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return of(null);
    }
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/token/refresh`,
      { accessToken: accessToken },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
      }
    ).pipe(
      map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        return response;
      }),
      catchError(error => {
        console.error('Ошибка обновления access-токена:', error);
        this.localLogout();
        return throwError(() => error);
      })
    );
  }
}
