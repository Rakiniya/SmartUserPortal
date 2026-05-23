import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  users: any[] = [];

  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getUserRecords()
      .then((data: any) => {

        this.users = data;

        this.loading = false;

      });

  }

}