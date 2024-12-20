import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor() {}
  
    // Method to log in the user
    login() {
      this.isAuthenticated.next(true);
    }
  
    // Method to log out the user
    logout() {
      this.isAuthenticated.next(false);
    }
  
    // Observable to check if the user is signed in
    isUserAuthenticated() {
      return this.isAuthenticated.asObservable();
    }
}
