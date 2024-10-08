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
  filteredMovies: { title: string; year: string; type: string }[] = []; 
  newMovieTitle: string = '';
  newMovieYear: string = '';
  newMovieType: string = '';
  typeDropdownOpen: boolean = false; 
  movieTypes: string[] = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']; 
  years: string[] =  ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  editIndex: number | null = null; 
  isEditing: boolean = false; 

  searchTerm: string = ''; 
  selectedType: string = 'All'; 
  selectedYear: string = ''; 

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
      this.filteredMovies = [...this.movies]; 
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
      this.searchMovies(); 
    }
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.saveMovies();
    this.searchMovies(); 
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

  
  searchMovies() {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType === 'All' || movie.type === this.selectedType;
      const matchesYear = this.selectedYear === '' || movie.year === this.selectedYear;
      return matchesSearch && matchesType && matchesYear;
    });
  }
}
