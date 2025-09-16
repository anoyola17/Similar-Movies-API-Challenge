require('dotenv').config();             // Load environment variable frist 
const express = require('express');     // Importing Express Module 
const path = require('path');           // Importing Path Module 
const hbs = require('hbs');             // Importing Hbs Module 

const {                 // Importing Each Movie List Module 
    fetchNowPlaying,    
    fetchPopular,
    fetchTopRated,
    fetchUpcoming
} = require('./utils/movieLists');
const similarMovies = require('./utils/search');    // Importing Similar Movies Module 

// Creating Express application 
const app = express();      

// Define paths for Express configuration 
const publicDirectoryPath = path.join(__dirname, "../public");      // Paths to public directory 
const viewPath = path.join(__dirname, '../frontEnd/views');         // Paths to views directory
const partialPath = path.join(__dirname, '../frontEnd/partials');   // Paths to partials directory

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');                  // Setting view engine to hbs
app.set('views', viewPath);                     // Setting views directory
hbs.registerPartials(partialPath);              // This allows partials to be registered
app.use(express.static(publicDirectoryPath));   // Serving static files from public directory

// Routes websites
app.get('', (req, res) => {                                 // Now Playing page endpoint (index root)
    fetchNowPlaying((error, movies) => {                    // Callback for fetchNowPlaying
        if (error) {                                    
            return res.send({ error })                      // If error, pass the error message
        } else {
            res.render('index', { movieData: movies })      // Otherwise, pass the movie data
        }          
    })
});

app.get('/popular', (req, res) => {                         // Popular page endpoint
    fetchPopular((error, movies) => {                       // Callback for fetchPopular
        if (error) {
            return res.send({ error })                      // If error, pass the error message
        } else {
            res.render('popular', { movieData: movies })    // Otherwise, pass the movie data
        }
    })
});

app.get('/topRated', (req, res) => {                        // Top Rated page endpoint
    fetchTopRated((error, movies) => {                      // Callback for fetchTopRated
        if (error) {
            return res.send({ error })                      // If error, pass the error message
        } else {
            res.render('topRated', { movieData: movies })   // Otherwise, pass the movie data
        }
    })
});

app.get('/upcoming', (req, res) => {                        // Upcoming page endpoint
    fetchUpcoming((error, movies) => {                      // Callback for fetchUpcoming
        if (error) {
            return res.send({ error })                      // If error, pass the error message
        } else {
            res.render('upcoming', { movieData: movies })   // Otherwise, pass the movie data
        }
    })
});

app.get('/search', (req, res) => {                                          // Upcoming page endpoint
    if (!req.query.title) {                                                 // If no movie is given then display the message below
        return res.send({ error: 'You must provide a movie title' });
    }

    similarMovies(req.query.title, (error, movie) => {                      // Otherwise display the movie data 
        if (error) {
            return res.send({ error });
        } 
        res.render('search', {movieData: movie});
    });
});

app.get(/.*/, (req, res) => {                   // 404 endpoint
    res.render('404', {                         // Rendering 404 template
        title: '404',                           // Displaying title
        message: 'Page not found'               // Displaying error message
    })
});

const port = process.env.PORT || 3000;          // Use PORT from .env or default to 3000
app.listen(port, () => {                                
    console.log(`Server is running on port ${port}`);  // Logging a message when the server starts
});