import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl =
    'http://localhost:3000/users';

  private recordsUrl =
    'http://localhost:3000/records';

  constructor(
    private http: HttpClient
  ) {}

  // JWT TOKEN HEADER
  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: token || ''
      })
    };
  }

  // GET USERS
  getUsers(
    delay: number = 1000
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.usersUrl}?delay=${delay}`,
      this.getHeaders()
    );
  }

  // ADD USER
  addUser(user: any) {

    return this.http.post(
      this.usersUrl,
      user,
      this.getHeaders()
    );
  }

  // DELETE USER
  deleteUser(userId: string) {

    return this.http.delete(
      `${this.usersUrl}/${userId}`,
      this.getHeaders()
    );
  }

  // GET RECORDS
  getRecords(
    role: string,
    delay: number = 1000
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.recordsUrl}/${role}?delay=${delay}`,
      this.getHeaders()
    );
  }
}