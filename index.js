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
    console.log(movieFromStorage)
}


async function getMoviesDataBase() {
    const res = await fetch(`https://www.omdbapi.com/?s=${inputSearch.value}&page=1&apikey=e2fe7aa4`)
    const data = await res.json()
    console.log(data)
    if(data.response === false) {
        movieSpot.innerHTML = `
            <div class="error-container">
                <h2>Unable to find what you’re looking for. Please try another search</h2>
            </div>
        `
    }else{
        inputSearch.valu = ''
        const moviesData = data.Search.map(movie => movie.imdbID)
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
                        <button class="watchlist plus-icon" id="${movie.imdbID}">Wachtlist</button>
                    </div> 
                    <p class="movie-plot" id="plot">${movie.Plot}</p>
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
    console.log(movieFromStorage)
}



function isAdded(id) {
    if (localStorage.getItem(id) === null) {
      return true
    } else {
      return false
    }
  }

