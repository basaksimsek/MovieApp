import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'movie-list',
    loadComponent: () => import('./movie-list/movie-list.component').then(m => m.MovieListComponent),
    data: {
      title: 'Movie List'
    }
  }
];
