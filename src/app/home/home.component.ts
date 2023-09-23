/**
 * HomeComponent.ts
 *
 * This TypeScript file defines an Angular component named 'HomeComponent'.
 * The component is responsible for the home page of the application and includes functionality for movie recommendations and search.
 */

// Import necessary Angular modules and services.
import { Component, OnInit } from '@angular/core';
import { MovieService } from "../_services/movie-service.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // Array of random image URLs for movie recommendations.
    randomImageUrls = [
        "https://image.tmdb.org/t/p/w1280/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
        "https://image.tmdb.org/t/p/w1280/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        "https://image.tmdb.org/t/p/w1280/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        "https://image.tmdb.org/t/p/w1280/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
        "https://image.tmdb.org/t/p/w1280/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
        "https://image.tmdb.org/t/p/w1280/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg",
        "https://image.tmdb.org/t/p/w1280/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
        "https://image.tmdb.org/t/p/w1280/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
        "https://image.tmdb.org/t/p/w1280/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg",
        "https://image.tmdb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg",
        "https://image.tmdb.org/t/p/w1280/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
        "https://image.tmdb.org/t/p/w1280/oupWWrVuCgNEa5GcjdkpjCYbx2X.jpg",
        "https://image.tmdb.org/t/p/w1280/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
        "https://image.tmdb.org/t/p/w1280/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        "https://image.tmdb.org/t/p/w1280/6v1N2SBhaF8lTBgsjfTAgVmS5q9.jpg",
        "https://image.tmdb.org/t/p/w1280/jGKCpt3zzbGZbgoza6HCvecqElM.jpg",
        "https://image.tmdb.org/t/p/w1280/n1hqbSCtyBAxaXEl1Dj3ipXJAJG.jpg",
        "https://image.tmdb.org/t/p/w1280/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
        "https://image.tmdb.org/t/p/w1280/c8B4DsVcFVDLVmbpHMHU3RjLNAV.jpg"
    ];

    // Variables for managing search functionality.
    searchTerm = '';
    showSuggestions = false;
    movies: any[] = [];
    lastSearchedKeywords: string[] = [];
    recommendedKeywords: string[] = [];
    searchedMovies: any[] = [];

    constructor(private movieService: MovieService, private router: Router) {}

    ngOnInit() {
        // Load movie recommendations when the component initializes.
        this.loadMovieRecommandations();
    }

    // Load movie recommendations using the MovieService.
    loadMovieRecommandations() {
        this.movieService.getMovieRecommandations().subscribe((data: any) => {
            this.movies = data;
            // Map the data to create a custom movie object with selected properties.
            // @ts-ignore
            this.movies = data.map(m => {
                return {
                    id: m.id,
                    title: m.title,
                    year: m.year,
                    genres: m.genres,
                    imageUrl: this.getImageUrl()
                }
            });
        });
    }

    // Generate a random image URL from the 'randomImageUrls' array.
    getImageUrl(): string {
        const randomIndex = Math.floor(Math.random() * this.randomImageUrls.length);
        return this.randomImageUrls[randomIndex];
    }

    // Perform movie search based on user input and options.
    searchMovies(showOptions: boolean, word: string) {
        if (showOptions) {
            this.movieService.searchForMovies(this.searchTerm, 5, 10).subscribe((data: any) => {
                this.showSuggestions = true;
                this.lastSearchedKeywords = data.lastSearchedKeywords;
                this.recommendedKeywords = data.recommendedKeywords;
                this.searchedMovies = data.searchedMovies;
            });
        } else {
            if (this.searchTerm == '') {
                this.showSuggestions = false;
                this.loadMovieRecommandations();
            } else {
                this.movieService.fetchMoviesByKeyword(word != '' ? word : this.searchTerm).subscribe((data: any) => {
                    this.showSuggestions = false;
                    this.movies = data;
                    // @ts-ignore
                    this.movies = data.map(m => {
                        return {
                            id: m.id,
                            title: m.title,
                            year: m.year,
                            genres: m.genres,
                            imageUrl: this.getImageUrl()
                        }
                    });
                });
                this.movieService.logAction(word != '' ? word : this.searchTerm, 0, '', 2).subscribe((data: any) => {
                    // Log the user's action.
                });
            }
        }
    }

    // Handle the click event on a movie item.
    handleMovieClickEvent(Id: number, name: string) {
        this.movieService.logAction(name, Id, name, 0).subscribe((data: any) => {
            // Log the user's action.
        });
        this.router.navigate(['movie-details', Id]);
    }
}
