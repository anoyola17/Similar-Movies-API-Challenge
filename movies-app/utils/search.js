// Importing the request library to make HTTP requests
const request = require('request');     

// URL for fetching Similar Movies from The Movie Database (TMDb) API
const similarMoviesURL = (movieTitle, callback) => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(movieTitle) + '&api_key=53081e60dc98a3680ca06e2ca7bb20f2&language=en-US';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to movie service!', undefined)
        } else if (body.results.length === 0) {
            callback('Unable to find movie! Try another search.', undefined)
        } else {
            for (let i = 0; i < 5; i++) {
            callback(undefined, {
                Poster: body.results[i].poster_path,
                Title: body.results[i].title,
                Date: body.results[i].release_date,
                Rating: body.results[i].vote_average,
                Overview: body.results[i].overview
            })
        }}
    })
}

module.exports = similarMoviesURL;  