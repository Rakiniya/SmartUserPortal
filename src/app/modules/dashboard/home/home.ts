import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

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
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Get User
    this.currentUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    console.log(this.currentUser);

    // Simulate API Delay
    setTimeout(() => {

      // General User
      if (
        this.currentUser.role === 'General User'
      ) {

        this.records = [

          {
            id: 1,
            name: 'User Profile',
            access: 'Limited Access'
          },

          {
            id: 2,
            name: 'Project Files',
            access: 'Limited Access'
          }

        ];

      }

      // Admin User
      else {

        this.records = [

          {
            id: 1,
            name: 'Finance Reports',
            access: 'Full Access'
          },

          {
            id: 2,
            name: 'HR Records',
            access: 'Full Access'
          },

          {
            id: 3,
            name: 'System Logs',
            access: 'Full Access'
          }

        ];
      }

      this.loading = false;

      // FORCE UI REFRESH
      this.cd.detectChanges();

      console.log(this.records);

    }, 2000);
  }

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/']);
  }
}