import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8010/api/auth/login';
  private REGISTER_URL = 'http://localhost:8010/api/auth/register';
  private tokenKey = 'authToken';

  constructor(private httClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.httClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.router.navigate(['/dashboard']);
        }
      })
    )
  }

  register(name: string, email: string, password: string): Observable<any> {
  return this.httClient.post<any>(this.REGISTER_URL, { name, email, password });
}


  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp * 1000;
        return Date.now() < expiration;
    }catch (error) {
      return false;
  }
  }
}
