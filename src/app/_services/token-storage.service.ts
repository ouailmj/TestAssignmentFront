/**
 * TokenStorageService.ts
 *
 * This TypeScript file defines a service class named 'TokenStorageService' for Angular.
 * The service provides methods for managing user authentication tokens and user data in session storage.
 */

// Import necessary Angular modules and services.
import { Injectable } from '@angular/core';

// Define constants for keys used to store authentication token and user data in session storage.
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    /**
     * Constructor for the 'TokenStorageService' class.
     */
    constructor() {}

    /**
     * signOut method is used to clear session storage, effectively signing the user out.
     */
    signOut(): void {
        window.sessionStorage.clear();
    }

    /**
     * saveToken method is used to save the authentication token in session storage.
     *
     * @param token - The authentication token to be saved.
     */
    public saveToken(token: string): void {
        // Remove any existing token and save the new token in session storage.
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * getToken method is used to retrieve the authentication token from session storage.
     *
     * @returns The authentication token as a string, or null if not found.
     */
    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    /**
     * saveUser method is used to save the user's username in session storage.
     *
     * @param userName - The username of the authenticated user to be saved.
     */
    public saveUser(userName: string): void {
        // Remove any existing user data and save the new user data in session storage.
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, userName);
    }

    /**
     * getUser method is used to retrieve the user's username from session storage.
     *
     * @returns The user's username as a string, or null if not found.
     */
    public getUser(): string | null {
        return window.sessionStorage.getItem(USER_KEY);
    }
}
