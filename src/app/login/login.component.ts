/**
 * LoginComponent.ts
 *
 * This TypeScript file defines an Angular component named 'LoginComponent'.
 * The component is responsible for user authentication and login functionality.
 */

// Import necessary Angular modules and services.
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // Form data for user login.
    form: any = {
        username: null,
        password: null
    };

    // Flags and error message for login status.
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Check if the user is already logged in based on stored token.
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;

            // If logged in, redirect to the home page.
            if (this.isLoggedIn) {
                this.router.navigate(['home']);
            }
        }
    }

    // Handle form submission for user login.
    onSubmit(): void {
        const { username, password } = this.form;

        // Call the login method from the AuthService to authenticate the user.
        this.authService.login(username, password).subscribe(
            data => {
                // Save the authentication token and user data in session storage.
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);

                // Reset login status and error flags.
                this.isLoginFailed = false;
                this.isLoggedIn = true;

                // Reload the page to reflect the logged-in status.
                this.reloadPage();
            },
            err => {
                // Handle login error by displaying an error message.
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    // Reload the page to update the user's session.
    reloadPage(): void {
        window.location.reload();
    }
}
