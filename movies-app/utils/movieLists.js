// Import the 'request' library for making HTTP requests
const request = require('request');

// URL for fetching Now Playing Movies from The Movie Database (TMDb) API
const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=53081e60dc98a3680ca06e2ca7bb20f2&language=en-US';
request({url: nowPlayingURL, json: true}, (error, {body}) => {
    if (error) {
        console.log('Unable to connect to movie service!')
    } else if (body.error) {
        console.log('Unable to find movie!')
    } else {
        for (let i = 0; i < 10; i++) {
            console.log('Now Playing Movie: ' + body.results[i].poster_path + " " + body.results[i].vote_average + " " + body.results[i].title + " " + body.results[i].release_date);
        }
    }
})

// URL for fetching Popular Movies from The Movie Database (TMDb) API
const popularURL = 'https://api.themoviedb.org/3/movie/popular?api_key=53081e60dc98a3680ca06e2ca7bb20f2&language=en-US';
request({url: popularURL, json: true}, (error, {body}) => {
    if (error) {
        console.log('Unable to connect to movie service!')
    } else if (body.error) {
        console.log('Unable to find movie!')
    } else {
        for (let i = 0; i < 10; i++) {
            console.log('Popular Movie: ' + body.results[i].poster_path + " " + body.results[i].vote_average + " " + body.results[i].title + " " + body.results[i].release_date);
        }
    }
})

// URL for fetching Top Rated Movies from The Movie Database (TMDb) API
const topRatedURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=53081e60dc98a3680ca06e2ca7bb20f2&language=en-US';
request({url: topRatedURL, json: true}, (error, {body}) => {
    if (error) {
        console.log('Unable to connect to movie service!')
    } else if (body.error) {
        console.log('Unable to find movie!')
    } else {
        for (let i = 0; i < 10; i++) {
            console.log('Top Rated Movie: ' + body.results[i].poster_path + " " + body.results[i].vote_average + " " + body.results[i].title + " " + body.results[i].release_date);
        }
    }
})

// URL for fetching Upcoming Movies from The Movie Database (TMDb) API
const upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=53081e60dc98a3680ca06e2ca7bb20f2&language=en-US';
request({url: upcomingURL, json: true}, (error, {body}) => {
    if (error) {
        console.log('Unable to connect to movie service!')
    } else if (body.error) {
        console.log('Unable to find movie!')
    } else {
        for (let i = 0; i < 10; i++) {
            console.log('Upcoming Movie: ' + body.results[i].poster_path + " " + body.results[i].vote_average + " " + body.results[i].title + " " + body.results[i].release_date);
        }
    }
})

// Exporting the URLs for use in other files
module.exports = {
    nowPlayingURL,
    popularURL,
    topRatedURL,
    upcomingURL
};