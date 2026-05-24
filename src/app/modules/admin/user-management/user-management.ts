import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagementComponent {

  users = [
    {
      userId: 'admin',
      role: 'Admin'
    },
    {
      userId: 'john',
      role: 'General User'
    }
  ];

  newUserId: string = '';

  newRole: string = 'General User';

  addUser(): void {

    if (!this.newUserId) {
      return;
    }

    this.users.push({
      userId: this.newUserId,
      role: this.newRole
    });

    this.newUserId = '';

    this.newRole = 'General User';
  }

  deleteUser(index: number): void {

    this.users.splice(index, 1);
  }
}