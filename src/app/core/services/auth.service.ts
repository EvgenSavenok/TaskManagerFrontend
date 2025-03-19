import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getRole(): string | null {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role || null;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'Administrator';
  }

  isUser(): boolean {
    const role = this.getRole();
    return role === 'User';
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }
}
