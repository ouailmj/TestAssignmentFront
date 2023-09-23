/**
 * AuthService.ts
 *
 * This TypeScript file defines a service class named 'AuthService' for Angular.
 * The service provides methods for user authentication, such as logging in.
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
export class AuthService {
    /**
     * Constructor for the 'AuthService' class.
     *
     * @param http - An instance of 'HttpClient' for making HTTP requests.
     */
    constructor(private http: HttpClient) {}

    /**
     * login method is used to send a POST request to the authentication API endpoint for user login.
     *
     * @param username - The username of the user trying to log in.
     * @param password - The password of the user trying to log in.
     *
     * @returns An Observable representing the HTTP response containing user authentication information.
     */
    login(username: string, password: string): Observable<any> {
        // Send a POST request to the login API endpoint with the provided username and password.
        // The 'environment.apiUrl' is used to construct the full API URL for login.
        // 'httpOptions' is used to set the request headers for JSON content.
        return this.http.post(
            environment.apiUrl + environment.apiUrlLogin,
            {
                username,
                password
            },
            httpOptions
        );
    }
}
