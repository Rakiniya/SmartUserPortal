import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { UserService }
from '../../../core/services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  // FULL RESPONSE FROM LOCALSTORAGE
  currentUser: any;

  // DISPLAY VARIABLES
  userName: string = '';

  role: string = '';

  // RECORDS
  records: any[] = [];

  loading = true;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    // GET LOGGED IN USER
    this.currentUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    console.log(
      'CURRENT USER:',
      this.currentUser
    );

    // GET USER DETAILS
    if (this.currentUser.user) {

      this.userName =
        this.currentUser.user.userId;

      this.role =
        this.currentUser.user.role;
    }

    // LOAD RECORDS
    this.loadRecords();
  }

  // LOAD RECORDS
  loadRecords(): void {

    this.loading = true;

    const role = this.currentUser.user.role;

    this.userService.getRecords(role, 3000)
      .subscribe({

        next: (data: any[]) => {

          this.records = data;

          this.loading = false;

          // FORCE UI REFRESH
          this.cd.detectChanges();

          console.log(this.records);
        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;
        }
      });
}

  // LOGOUT
  logout(): void {

    localStorage.clear();

    this.router.navigate(['/']);
  }
}