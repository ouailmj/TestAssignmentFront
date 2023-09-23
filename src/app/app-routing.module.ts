/**
 * AppRoutingModule.ts
 *
 * This TypeScript file defines the Angular routing module for the application.
 * It configures the routes for different components and sets up route guards.
 */

// Import necessary Angular modules and classes.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components and route guard.
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { loginRouteGuard } from "./_guards/login-route.guard";

// Define the application routes.
const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [loginRouteGuard] },
    { path: 'movie-details/:id', component: MovieDetailsComponent, canActivate: [loginRouteGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
