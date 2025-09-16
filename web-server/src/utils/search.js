require('dotenv').config();     // Load .env file

// Importing the request library to make HTTP requests
const request = require('request');     

// URL for fetching Similar Movies from The Movie Database (TMDb) API
const similarMovies = (movieTitle, callback) => {
    const url ='https://api.themoviedb.org/3/search/movie?query=' 
        + encodeURIComponent(movieTitle) 
        + '&api_key=' + process.env.TMDB_API_KEY
        + '&language=en-US';

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to movie service!', undefined);
        } else if (body.results.length === 0) {
            callback('Unable to find movie! Try another search.', undefined);
        } else {    // Return the frist 10 movies 
            const movies = body.results.slice(0,10).map(movie =>({
                Poster: movie.poster_path,
                Title: movie.title,
                Date: movie.release_date,
                Rating: movie.vote_average,
                Overview: movie.overview
            }))
            callback(undefined, movies);
        }
    });
};

// Exporting the similarMoviesURL function for use in other files
module.exports = similarMovies;  