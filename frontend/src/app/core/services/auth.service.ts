import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User
} from '../../shared/interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Initialize user from token if exists
    if (this.tokenService.hasToken()) {
      this.loadProfile();
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, data)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  private loadProfile(): void {
    this.http.get<{ user: User }>(`${environment.apiUrl}/auth/profile`)
      .subscribe({
        next: (response) => {
          this.currentUserSubject.next(response.user);
        },
        error: () => {
          // Token is invalid, clear it
          this.tokenService.removeToken();
          this.currentUserSubject.next(null);
        }
      });
  }
}
