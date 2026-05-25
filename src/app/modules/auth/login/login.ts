import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
  from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  userId: string = '';

  password: string = '';

  role: string = 'General User';

  loading: boolean = false;

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {

    // RESET ERROR
    this.errorMessage = '';

    // VALIDATION
    if (
      !this.userId ||
      !this.password ||
      !this.role
    ) {

      this.errorMessage =
        'Please fill all fields';

      return;
    }

    // START LOADER
    this.loading = true;

    // REQUEST BODY
    const loginData = {

      userId: this.userId,

      password: this.password,

      role: this.role
    };

    // LOGIN API
    this.authService
      .login(loginData)

      .subscribe({

        next: (response: any) => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );

          localStorage.setItem(
            'token',
            response.token
          );

          this.loading = false;

          // SAVE USER
          this.authService
            .saveUser(response);

          // REDIRECT
          if (
            response.user.role === 'Admin'
          ) {

            this.router.navigate([
              '/admin'
            ]);

          } else {

            this.router.navigate([
              '/dashboard'
            ]);
          }
        },

        error: (error) => {

          console.log(error);

          this.loading = false;

          this.errorMessage =
            'Invalid Credentials';
        }
      });
  }
}