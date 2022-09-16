
const movieSpot = document.getElementById('movie-spot');
const errorCont = document.getElementById('error-cont')


let myWatchlistStorage = JSON.parse(localStorage.getItem('watchlist'))
console.log(myWatchlistStorage)
let movies = myWatchlistStorage;

console.log(movies)
renderMovies(movies);
function renderMovies (watchlistMovie) {
    if(myWatchlistStorage !== null){
        let moviesEl = movies.map(movie => {    
            return( `
                <div  class="movie-container"> 
                
                <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}" class="img-poster" id="poster">
                <div class="movie-data">
                    <h3 class="movie-title" id="movie-title">${movie.Title}</h3>
                    <p class="movie-rating" id="rating">${movie.Ratings[0].Value}</p>
                    <div class="movie-genre-container" >
                        <p class="movie-run-time" id="run-time">${movie.Runtime}</p>
                        <p class="movie-genre" id="genre">${movie.Genre}</p>
                        <button class="watchlist remove-icon" id="${movie.imdbID}">Wachtlist</button>
                    </div> 
                    <p class="movie-plot" id="plot">${movie.Plot}</p>
                </div>
            `
            )
    })
        movieSpot.innerHTML = moviesEl
        movieSpot.classList.remove('invisible');        
        errorCont.classList.add('invisible');
    }

}

document.addEventListener('click', e => {
    if(e.target.matches('.watchlist')) {
            addEventListener("click", removeFromLocalStorage(e.target.id))
    }
})

function removeFromLocalStorage(id) {
    const removeMovie = movies.find(el => el.imdbID === id)
    const indexMovie = movies.findIndex(movie => movie.imdbID === removeMovie.imdbID)
    movies.splice(indexMovie, 1)
    console.log(movies)
    localStorage.setItem('watchlist', JSON.stringify(movies));
    // console.log(movieFromStorage)
}