import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movies: { title: string; year: string; type: string }[] = [];
  newMovieTitle: string = '';
  newMovieYear: string = '';
  newMovieType: string = '';
  typeDropdownOpen: boolean = false; 
  movieTypes: string[] = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']; 
  editIndex: number | null = null; 
  isEditing: boolean = false; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMovies(); 
    }
  }

  loadMovies() {
    const movies = localStorage.getItem('movies');
    if (movies) {
      this.movies = JSON.parse(movies);
    }
  }

  addMovie() {
    if (this.newMovieTitle.trim() && this.newMovieYear.trim() && this.newMovieType.trim()) {
      const newMovie = {
        title: this.newMovieTitle,
        year: this.newMovieYear,
        type: this.newMovieType,
        
      };

      if (this.isEditing && this.editIndex !== null) {
        this.movies[this.editIndex] = newMovie; 
        this.isEditing = false; 
        this.editIndex = null; 
      } else {
        this.movies.push(newMovie); 
      }

      this.saveMovies();
      this.resetForm(); 
    }
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.saveMovies();
  }

  editMovie(index: number) {
    const movie = this.movies[index];
    this.newMovieTitle = movie.title;
    this.newMovieYear = movie.year;
    this.newMovieType = movie.type; 
    this.isEditing = true; 
    this.editIndex = index; 
  }

  resetForm() {
    this.newMovieTitle = '';
    this.newMovieYear = '';
    this.newMovieType = '';
    this.typeDropdownOpen = false; 
    this.isEditing = false; 
    this.editIndex = null; 
  }

  saveMovies() {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }

  toggleTypeDropdown() {
    this.typeDropdownOpen = !this.typeDropdownOpen;
  }

  selectMovieType(type: string) {
    this.newMovieType = type; 
    this.typeDropdownOpen = false; 
  }
}
