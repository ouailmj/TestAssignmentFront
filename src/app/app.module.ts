import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {loginRouteGuard} from "./_guards/login-route.guard";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        MovieDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [authInterceptorProviders, loginRouteGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
