import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, DashboardComponent, RouterModule] 
})
export class AppComponent {
  title = 'MovieApp';
}
