/**
 * loginRouteGuard.ts
 *
 * This TypeScript file defines a route guard class named 'loginRouteGuard' for Angular.
 * The route guard is responsible for protecting routes based on a user's authentication status.
 */

// Import necessary Angular modules and services.
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class loginRouteGuard implements CanActivate {
    /**
     * Constructor for the 'loginRouteGuard' class.
     *
     * @param tokenStorageService - An instance of the 'TokenStorageService' which provides methods
     * to interact with the user's authentication token.
     */
    constructor(private tokenStorageService: TokenStorageService) {}

    /**
     * canActivate method is implemented to determine whether a user can activate a specific route.
     *
     * @param route - The activated route snapshot, which represents the route to be protected.
     * @param state - The router state snapshot, which represents the current router state.
     *
     * @returns A boolean value indicating whether the user can activate the route (true for authorized, false for unauthorized).
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Use the 'TokenStorageService' to check if the user is authenticated.
        // If a valid token is present, the user is considered authenticated and can access the route.
        // If no token is present, the user is considered unauthorized and will be redirected to the login page.
        return !!this.tokenStorageService.getToken();
    }
}

// The 'loginRouteGuard' class implements the 'CanActivate' interface, allowing it to be used as a route guard in Angular.
// It checks for the presence of an authentication token and determines whether a user can access a specific route.
// If the user is authenticated, the route is activated; otherwise, the user is redirected to the login page.
