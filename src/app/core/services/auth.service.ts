import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  userId: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Dummy Database
  private users: User[] = [
    {
      userId: 'admin',
      password: 'admin123',
      role: 'Admin'
    },
    {
      userId: 'john',
      password: 'john123',
      role: 'General User'
    }
  ];

  constructor(private router: Router) {}

  // Login API Simulation
  login(userId: string, password: string, role: string): Promise<User> {

    return new Promise((resolve, reject) => {

      // Simulate API Delay
      setTimeout(() => {

        const user = this.users.find(
          u =>
            u.userId === userId &&
            u.password === password &&
            u.role === role
        );

        if (user) {

          // Store Session
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify(user)
          );

          resolve(user);

        } else {
          reject('Invalid User ID / Password / Role');
        }

      }, 2000);

    });
  }

  // Logout
  logout(): void {

    localStorage.removeItem('loggedInUser');

    this.router.navigate(['/']);
  }

  // Get Current User
  getCurrentUser(): User | null {

    const user = localStorage.getItem('loggedInUser');

    return user ? JSON.parse(user) : null;
  }

  // Check Login Status
  isLoggedIn(): boolean {

    return !!localStorage.getItem('loggedInUser');
  }

  // Check Admin Access
  isAdmin(): boolean {

    const user = this.getCurrentUser();

    return user?.role === 'Admin';
  }
}