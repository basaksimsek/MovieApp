import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent {
  username: string | null = ''; 

  constructor(private router: Router) { 
    this.loadUsername();
  }

  loadUsername() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.username = user.username; 
    }
  }

  logout() {
    localStorage.removeItem('currentUser'); 
    this.router.navigate(['/']); 
  }
}
