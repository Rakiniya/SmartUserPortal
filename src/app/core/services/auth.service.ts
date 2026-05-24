import { Injectable } from '@angular/core';

import { HttpClient }
from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  // LOGIN API
  login(data: any) {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      data
    );
  }

  // SAVE USER
  saveUser(user: any): void {

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify(user)
    );
  }

  // GET USER
  getUser(): any {

    const user =
      localStorage.getItem(
        'loggedInUser'
      );

    return user
      ? JSON.parse(user)
      : null;
  }

  // LOGOUT
  logout(): void {

    localStorage.clear();
  }

  // IS LOGGED IN
  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'loggedInUser'
    );
  }
}