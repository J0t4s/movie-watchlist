
const movieSpot = document.getElementById('movie-spot');
const errorCont = document.getElementById('error-cont')
let myWatchlistStorage = JSON.parse(localStorage.getItem('watchlist'))
let movies = myWatchlistStorage;

renderMovies(movies);
function renderMovies (watchlistMovie) {
    if(myWatchlistStorage !== null){
        let moviesEl = movies.map(movie => { 

            return( `
                <div clas="movie-storage">
                    <div  class="movie-container"> 
                    <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}" class="img-poster" id="poster">
                    <div class="movie-data">
                        <h3 class="movie-title" id="movie-title">${movie.Title}</h3>
                        <p class="movie-rating" id="rating">${movie.Ratings[0].Value}</p>
                        <div class="movie-genre-container" >
                            <p class="movie-run-time" id="run-time">${movie.Runtime}</p>
                            <p class="movie-genre" id="genre">${movie.Genre}</p>
                            <button class="watchlist" id="${movie.imdbID}">
                                <i class="remove-icon">
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="white"/>
                                    </svg>
                                </i>
                                Remove from Wachtlist
                            </button>
                        </div> 
                        <p class="movie-plot" id="plot">${movie.Plot}</p>
                    </div>
                </div>
            `
            )
        })
        movieSpot.innerHTML = moviesEl
        movieSpot.classList.remove('invisible');        
    }else{
        errorCont.classList.add('invisible');
    }
}

document.addEventListener('click', e => {
    if(e.target.matches('.watchlist')) {
            addEventListener("click", removeFromLocalStorage(e.target.id))
            renderMovies(movies)
    }
})

function removeFromLocalStorage(id) {
    const removeMovie = movies.find(el => el.imdbID === id)
    const indexMovie = movies.findIndex(movie => movie.imdbID === removeMovie.imdbID)
    movies.splice(indexMovie, 1)
    localStorage.setItem('watchlist', JSON.stringify(movies));
}