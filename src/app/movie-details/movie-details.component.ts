/**
 * MovieDetailsComponent.ts
 *
 * This TypeScript file defines an Angular component named 'MovieDetailsComponent'.
 * The component is responsible for displaying details of a movie.
 */

// Import necessary Angular modules and services.
import { Component, OnInit } from '@angular/core';
import { MovieService } from "../_services/movie-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    // Array of random image URLs for movie details.
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

    // Variables for storing movie details and image URL.
    imageUrl = '';
    movie: any;

    constructor(private movieService: MovieService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Get the movie ID from the route parameters.
        // @ts-ignore
        const id = this.route.snapshot.params.id;

        // Initialize the image URL and fetch movie details.
        this.imageUrl = this.getImageUrl();
        this.getMovieById(id);
    }

    // Fetch movie details by ID using the MovieService.
    getMovieById(id: number) {
        this.movieService.getMovieById(id).subscribe((data: any) => {
            this.movie = {
                id: data[0].id,
                title: data[0].title,
                year: data[0].year,
                genres: data[0].genres,
                imageUrl: this.getImageUrl()
            };
        });
    }

    // Generate a random image URL from the 'randomImageUrls' array.
    getImageUrl(): string {
        const randomIndex = Math.floor(Math.random() * this.randomImageUrls.length);
        return this.randomImageUrls[randomIndex];
    }

    // Handle the movie view event and log user's action.
    handleMovieViewEvent(movieId: number, title: string) {
        this.movieService.logAction(title, movieId, title, 1).subscribe((data: any) => {
            // Log the user's action.
        });
    }
}
