import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the authentication status
    this.authService.isUserAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
