import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { tap } from "rxjs/operators";
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {

  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/api/auth/register`, user);
  }

  login(user: IUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/login`, user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
