// Importing the similarMoviesURL function from utils/search.js
const similarMoviesURL = require('./utils/search');

// Importing the movie category URLs from utils/movieLists.js
const { nowPlayingURL, popularURL, topRatedURL, upcomingURL } = require('./utils/movieLists');

// Getting the movie title from command line arguments
const address = process.argv[2]                         

// Checking if the movie title is provided
if(!address) {
    console.log('Please provide a movie title')         // Prompting user to provide a movie title if not given
} else {
    similarMoviesURL(address, (error, data) => {
    if (error) {
        return console.log('Error:', error)             // If there's an error, log it and return
    } else {
        console.log('Data:', data)                      // If successful, log the movie data
    }
})
}

// Logging the URLs for different movie categories
console.log("Now Playing Movies URL:", nowPlayingURL);
console.log("Popular Movies URL:", popularURL);
console.log("Top Rated Movies URL:", topRatedURL);
console.log("Upcoming Movies URL:", upcomingURL);   