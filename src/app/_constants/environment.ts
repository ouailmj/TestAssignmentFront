/**
 * environment.api.ts
 *
 * This TypeScript file defines the environment configuration for your application's API endpoints.
 * It contains various properties related to API URLs and production settings.
 */

// Export a constant named 'environment' with configuration settings.
export const environment = {
    // 'production' flag indicates whether the application is in production mode.
    production: false,

    // 'apiUrl' is the base URL for your API.
    apiUrl: 'http://localhost:5159/api/',

    // 'apiUrlMovies' is the endpoint for accessing movie-related data.
    apiUrlMovies: 'movies',

    // 'apiUrlMoviesRecommandations' is the endpoint for movie recommendations.
    apiUrlMoviesRecommandations: 'movies/recommendations',

    // 'apiUrlMoviesSearch' is the endpoint for movie search functionality.
    apiUrlMoviesSearch: 'movies/search',

    // 'apiUrlMoviesLogAction' is the endpoint for logging movie search actions.
    apiUrlMoviesLogAction: 'movies/search/log',

    // 'apiUrlLogin' is the endpoint for user authentication and login.
    apiUrlLogin: 'auth/login',
};

// This file serves as a central place to manage API-related configurations.
// You can easily switch between different environments (e.g., development and production)
// by changing the values in this file, making it easier to manage API URLs in your application.
