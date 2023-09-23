/**
 * AuthInterceptor.ts
 *
 * This TypeScript file defines an HTTP interceptor class named 'AuthInterceptor' for Angular.
 * The interceptor adds an authorization token to outgoing HTTP requests to secure API calls.
 */

// Import necessary Angular modules and services.
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

// Define a constant for the token header key.
const TOKEN_HEADER_KEY = 'Authorization'; // For Spring Boot back-end

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor for the 'AuthInterceptor' class.
     *
     * @param token - An instance of 'TokenStorageService' which provides methods to access the user's authentication token.
     */
    constructor(private token: TokenStorageService) {}

    /**
     * intercept method is implemented to intercept and modify outgoing HTTP requests.
     *
     * @param req - The HTTP request to be intercepted.
     * @param next - The HTTP handler responsible for passing the request to the next interceptor or HTTP client.
     *
     * @returns An Observable of an HTTP event representing the response from the server.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();

        // If a valid token is present, clone the request and add the 'Authorization' header with the token.
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }

        // Pass the modified request to the next HTTP handler in the chain.
        return next.handle(authReq);
    }
}

/**
 * authInterceptorProviders is an array of providers used to provide the 'AuthInterceptor' class as an HTTP interceptor.
 * It specifies that 'AuthInterceptor' should be used as a multi-provider for HTTP interceptors.
 */
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
