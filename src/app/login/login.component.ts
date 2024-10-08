import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}
  login() {
    
    const validUser = { username: 'basakco', password: 'rea1234' }; 

    if (this.username === validUser.username && this.password === validUser.password) {
      
      localStorage.setItem('currentUser', JSON.stringify({ username: this.username }));
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Username or password is incorrect.'; 
    }
  }

}
