import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor(private authService: AuthService, private router: Router) {
  
    }
  
    Loguot() {
      this.authService.logout()
    }

}
