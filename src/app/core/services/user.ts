import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserRecords() {

    return new Promise<any[]>((resolve) => {

      setTimeout(() => {

        resolve([
          {
            id: 1,
            name: 'Rakiniya',
            role: 'General User',
            access: 'Read Only'
          },
          {
            id: 2,
            name: 'Karthik',
            role: 'Admin',
            access: 'Full Access'
          },
          {
            id: 3,
            name: 'John',
            role: 'General User',
            access: 'Limited Access'
          }
        ]);

      }, 3000);

    });

  }

}