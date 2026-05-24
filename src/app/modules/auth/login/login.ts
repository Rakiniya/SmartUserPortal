import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

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
  ) {}

  onLogin(): void {

    // Reset Error
    this.errorMessage = '';

    // Validation
    if (
      !this.userId ||
      !this.password ||
      !this.role
    ) {

      this.errorMessage = 'Please fill all fields';

      return;
    }

    // Start Loader
    this.loading = true;

    // Call Login API
    this.authService
      .login(
        this.userId,
        this.password,
        this.role
      )

      .then((user) => {

        this.loading = false;

        // Redirect Based On Role
        if (user.role === 'Admin') {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/dashboard']);
        }
      })

      .catch((error) => {

        this.loading = false;

        this.errorMessage = error;
      });
  }
}