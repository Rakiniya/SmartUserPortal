import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  currentUser: any;

  records: any[] = [];

  loading = true;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    // Get Logged In User
    this.currentUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    console.log(this.currentUser);

    // Load Records From Backend API
    this.loadRecords();
  }

  loadRecords(): void {

    this.loading = true;

    this.userService
      .getRecords(this.currentUser.role)
      .subscribe({

        next: (data: any[]) => {

          this.records = data;

          this.loading = false;

          // Force UI Refresh
          this.cd.detectChanges();

          console.log(this.records);
        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;
        }
      });
  }

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/']);
  }
}