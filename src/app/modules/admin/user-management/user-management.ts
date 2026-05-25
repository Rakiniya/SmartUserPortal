import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { UserService }
from '../../../core/services/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagementComponent
implements OnInit {

  users: any[] = [];

  loading = false;

  newUser = {

    userId: '',

    password: '',

    role: 'General User'
  };

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadUsers();
  }

  // LOAD USERS
  loadUsers(): void {

    this.loading = true;

    this.userService
      .getUsers(4000)
      .subscribe({

        next: (data: any) => {

          console.log('API:', data);

          this.users = data;

          this.loading = false;

          // FORCE UI REFRESH
          this.cd.detectChanges();
        },

        error: (err) => {

          console.log(err);

          this.loading = false;

          this.cd.detectChanges();
        }
      });
  }

  // ADD USER
  addUser(): void {

    if (
      !this.newUser.userId ||
      !this.newUser.password
    ) {

      return;
    }

    this.userService
      .addUser(this.newUser)
      .subscribe(() => {

        this.loadUsers();

        this.newUser = {

          userId: '',

          password: '',

          role: 'General User'
        };

        this.cd.detectChanges();
      });
  }

  // DELETE USER
  deleteUser(userId: string): void {

    this.userService
      .deleteUser(userId)
      .subscribe(() => {

        this.loadUsers();

        this.cd.detectChanges();
      });
  }
}