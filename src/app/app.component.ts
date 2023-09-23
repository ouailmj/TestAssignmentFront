/**
 * AppComponent.ts
 *
 * This TypeScript file defines the root Angular component named 'AppComponent'.
 * The component manages user authentication status and provides logout functionality.
 */

// Import necessary Angular modules and services.
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // Flags for checking user login status and storing the username.
    isLoggedIn = false;
    username?: string;

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

    ngOnInit(): void {
        // Check if the user is logged in based on the presence of a token.
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            // @ts-ignore
            this.username = this.tokenStorageService.getUser();
        } else {
            // Redirect to the login page if the user is not logged in.
            this.router.navigate(['login']);
        }
    }

    // Handle user logout.
    logout(): void {
        // Clear the user's session by removing the token and reloading the page.
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
