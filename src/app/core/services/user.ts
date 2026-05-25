import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getUsers(
    delay: number = 1000
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.usersUrl}?delay=${delay}`
    );
  }

  addUser(user: any) {

    return this.http.post(
      this.usersUrl,
      user
    );
  }

  deleteUser(userId: string) {

    return this.http.delete(
      `${this.usersUrl}/${userId}`
    );
  }

  getRecords(
    role: string,
    delay: number = 1000
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.recordsUrl}/${role}?delay=${delay}`
    );
  }
}