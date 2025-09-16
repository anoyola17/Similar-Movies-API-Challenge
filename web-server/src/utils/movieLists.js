require('dotenv').config();         // Load .env file

// Import the 'request' library for making HTTP requests
const request = require('request');

// Fetching Movies Lists from The Movie Database (TMDb) API
const fetchMovies = (url, callback) => {
    request({ url, json: true }, (error, { body } = {}) => {                // Making a request to the Movie Database TMDb API
        if (error) {                                                        // Handling request errors
            callback('Unable to connect to movie service!', undefined);     // Display Network error
        } else if (!body || body.results.length === 0) {                    // If no movies is found based on the search 
            callback('No movies found!', undefined);                        // Display movies not found error
        } else {                                                            // Otherwise  
            const movies = body.results.slice(0, 15).map(movie => ({        // Create a new array providing each 15 results
                poster: movie.poster_path,          // Display Poster of the Movie  
                rating: movie.vote_average,         // Display Movie Rating 
                title: movie.title,                 // Display Movie Name
                releaseDate: movie.release_date     // Display Release Date 
            }));
            callback(undefined, movies);            // Display new movie database information
        }
    });
};

// Base URL
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = process.env.TMDB_API_KEY        // Read from .env

// Exporting the URLs from the URL Movies Lists
module.exports = {
    fetchNowPlaying: (callback) =>    // URL for fetching Now Playing Movies 
        fetchMovies(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US`, callback),
    fetchPopular: (callback) =>       // URL for fetching Popular Movies 
        fetchMovies(`${BASE_URL}/popular?api_key=${API_KEY}&language=en-US`, callback),
    fetchTopRated: (callback) =>      // URL for fetching Top Rated Movies 
        fetchMovies(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US`, callback),
    fetchUpcoming: (callback) =>      // URL for Upcoming Movies 
        fetchMovies(`${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US`, callback)
};