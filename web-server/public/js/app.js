console.log('Client side JavaScript file is loaded')    // In the browser console 

const moviesForm = document.querySelector('form')       // Selecting the movie form
const search = document.querySelector('input')          // Selecting the input form 

moviesForm.addEventListener('submit', (e) => {          // User click on button 
    // e.preventDefault()                                

    const movieTitle = search.value                     // User movie title input 

    fetch('/search?title=' + encodeURIComponent(movieTitle))
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            console.log('Error:', data.error);
        } else {
            console.log('Movies similar to...', data.movie);
            const searchContainer = document.querySelector('search-container');
            searchContainer.textContent = ''      // Clear the main page 

            data.movie.forEach(m => {                       // For each movie display the output
                const div = document.createElement('div');  // Insinde the div content inside the search.hbs
                div.innerHTML = 
                `   <img src="https://image.tmdb.org/t/p/w500${m.Poster}">      
                    <h3>${m.Title}</h3>
                    <p>Rating: ${m.Rating}</p>
                    <p>Release Date: ${m.Date}</p>
                    <p>${m.Overview}</p>`;
                searchContainer.appendChild(div);
            });
        }
    })
    
    .catch((error) => {
        console.log('Fetch failed:', error);
    });
});
