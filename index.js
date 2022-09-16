const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const movieSpot = document.getElementById('movie-spot');
const addBtn = document.getElementById('add/remove-watchlist-id');
const startCont = document.getElementById('start-container');
let moviesApiData = []
let moviesAdded = []
let movieFromStorage = JSON.parse(localStorage.getItem('watchlist'))

if(movieFromStorage) {
    moviesAdded = [...movieFromStorage]
}

async function getMoviesDataBase() {
    const res = await fetch(`https://www.omdbapi.com/?s=${inputSearch.value}&page=1&apikey=e2fe7aa4`)
    const data = await res.json()
    if(data.response === false) {
        movieSpot.innerHTML = `
            <div class="error-container">
                <h2>Unable to find what you’re looking for. Please try another search</h2>
            </div>
        `
    }else{
        inputSearch.valu = ''
        const moviesData = data.Search.map(movie => movie.imdbID)
        movieSpot.innerHTML = ""
        getMovies(moviesData)        
    }
}

async function getMovies(moviesId) {
    for(let id of moviesId) {
        const resp = await fetch(`https://www.omdbapi.com/?i=${id}&type=movie&apikey=e2fe7aa4`)
        const data = await resp.json()
        
        try{
            moviesApiData.push(data)
        } catch (err) {
            console.log(err)
                movieSpot.innerHTML = `
                    <div class="error-container">
                        <h2>Unable to find what you’re looking for. Please try another search</h2>
                    </div>
                `
        }
    }
    renderMovies()
}

function renderMovies() {
    const renderMovies = moviesApiData.map(movie => {
        return (
            movieSpot.innerHTML +=
            `
                <div  class="movie-container"> 
                    <img src="${movie.Poster}" alt="poster of the movie ${movie.Title}" class="img-poster" id="poster">
                    <div class="movie-data">
                        <h3 class="movie-title" id="movie-title">${movie.Title}</h3>
                        <p class="movie-rating" id="rating">${movie.Ratings[0].Value}</p>
                        <div class="movie-genre-container" >
                            <p class="movie-run-time" id="run-time">${movie.Runtime}</p>
                            <p class="movie-genre" id="genre">${movie.Genre}</p>
                            <button class="watchlist" id="${movie.imdbID}">
                                <i class="plus-icon">
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
                                    </svg>
                                </i>
                                Add to Wachtlist
                            </button>
                        </div> 
                        <p class="movie-plot" id="plot">${movie.Plot}</p>
                    </div>
                </div>
            `
        )
    })
            startCont.style.display = 'none'
            movieSpot.classList.remove('invisible')
}

btnSearch.addEventListener('click', (e) => {
    getMoviesDataBase()
})

document.addEventListener('click', e => {
    if(e.target.matches('.watchlist')) {
            addEventListener("click", addToLocalStorage(e.target.id))
    }
})

function addToLocalStorage(id) {
    const addMovie = moviesApiData.find(el => el.imdbID === id)
    moviesAdded.push(addMovie)
    localStorage.setItem('watchlist', JSON.stringify(moviesAdded));
}

function isAdded(id) {
    if (localStorage.getItem(id) === null) {
      return true
    } else {
      return false
    }
}
