import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  user!: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.isLoggedIn=authService.isLoggedIn
    this.user=authService.user
  }

  ngOnInit(): void {
    this.authorizeUser();
  }

  authorizeUser() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user' && event.newValue === null) {
        window.location.reload();
      }
    });

    this.authService.authEvent.subscribe({
      next: (res: boolean) => {
        this.isLoggedIn = res;
        this.user = this.authService.getUserFromLocalStorage()
      },
    });
  }
  logOut() {
    this.authService.logout();
    this.toast.warning({
      detail: 'Success',
      summary: 'Logged Out',
      position: 'bottomRight',
    });
    this.router.navigate(['/login']);
  }
}
