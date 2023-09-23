/**
 * MovieService.ts
 *
 * This TypeScript file defines a service class named 'MovieService' for Angular.
 * The service provides methods for interacting with movie-related data through HTTP requests.
 */

// Import necessary Angular modules and services.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../_constants/environment';

// Define HTTP options with headers for JSON content.
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    // Define the API URL for movie recommendations.
    private apiUrlRecommandation = environment.apiUrl + environment.apiUrlMoviesRecommandations;

    /**
     * Constructor for the 'MovieService' class.
     *
     * @param http - An instance of 'HttpClient' for making HTTP requests.
     */
    constructor(private http: HttpClient) {}

    /**
     * getMovieRecommandations method is used to fetch movie recommendations.
     *
     * @returns An Observable representing the HTTP response containing movie recommendations.
     */
    getMovieRecommandations(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrlRecommandation);
    }

    /**
     * getMovieById method is used to fetch movie details by its ID.
     *
     * @param id - The unique ID of the movie to fetch.
     *
     * @returns An Observable representing the HTTP response containing movie details.
     */
    getMovieById(id: number): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + environment.apiUrlMovies + '/' + id);
    }

    /**
     * searchForMovies method is used to search for movies based on a query string and search options.
     *
     * @param query - The search query string.
     * @param maxOldSearchOptions - The maximum number of old search options to consider.
     * @param maxSuggestedSearch - The maximum number of suggested search results.
     *
     * @returns An Observable representing the HTTP response containing search results.
     */
    searchForMovies(query: string, maxOldSearchOptions: number, maxSuggestedSearch: number): Observable<any> {
        return this.http.post(environment.apiUrl + environment.apiUrlMoviesSearch, {
            Query: query,
            MaxOldSearchOptions: maxOldSearchOptions,
            MaxSuggestedSearch: maxSuggestedSearch
        }, httpOptions);
    }

    /**
     * fetchMoviesByKeyword method is used to fetch movies based on a keyword.
     *
     * @param query - The keyword for fetching movies.
     *
     * @returns An Observable representing the HTTP response containing movies matching the keyword.
     */
    fetchMoviesByKeyword(query: string): Observable<any> {
        return this.http.post(environment.apiUrl + environment.apiUrlMovies, {
            Query: query
        }, httpOptions);
    }

    /**
     * logAction method is used to log user actions related to movie searches.
     *
     * @param query - The search query string.
     * @param movieId - The ID of the movie.
     * @param movieName - The name of the movie.
     * @param action - The action code representing the user's action (e.g., click, view).
     *
     * @returns An Observable representing the HTTP response for logging the action.
     */
    logAction(query: string, movieId: number, movieName: string, action: number): Observable<any> {
        return this.http.post(environment.apiUrl + environment.apiUrlMoviesLogAction, {
            Keyword: query,
            MovieId: movieId,
            MovieName: movieName,
            Action: action,
        }, httpOptions);
    }
}
