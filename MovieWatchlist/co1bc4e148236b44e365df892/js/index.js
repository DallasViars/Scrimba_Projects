/*******************************
* Global variable declarations *
*******************************/

const OMDB_API_KEY = "1db25ac7";
let currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) ?? {};
let html = "";

/* Element consts */
const movieSearchBtn = document.getElementById("movie-search-btn");
const movieSearchInput = document.getElementById("movie-search-input");
const mainEl = document.getElementById("main");
const movieListDiv = document.getElementById("movie-list");

/*
Event Listeners
*/

movieSearchBtn.addEventListener("click", searchButton);
movieSearchInput.addEventListener("keypress", () => {
  if (event.key == "Enter") { searchButton() }
});
movieSearchInput.addEventListener("click", () => {
  movieSearchInput.select()
});

function searchButton() {
  if (!movieSearchInput.value) return;
  searchMovies("s");
  movieSearchInput.select();
}

/*******************************
*           Functions          *
*******************************/

/* Retrieves list of movies based on user input in the search bar */
async function fetchMovies(searchType, movieSearch) {
  const searchResponse = await fetch(`https://www.omdbapi.com/?${searchType}=${movieSearch}&type=movie&apikey=${OMDB_API_KEY}`);
  const searchData = await searchResponse.json();
  if (searchData.Error) {
    checkErrors(searchData.Error, movieSearch);
    return;
  }
  return searchData;
}

/* Processes error messages from the API */
async function checkErrors(error, movieSearch) {
  
  /* Reruns the search looking for the first exact movie title match */
  if (error == "Too many results.") {
    movieListDiv.classList.remove("error-msg");
    searchMovies("t", movieSearch, error);  
    return;
  } else {
    /* Decided all error messages coming through here boil down to "Movie not found". This displays that error message to user */
    movieListDiv.innerHTML = `<h3>Movie not found!</h3> `
    movieListDiv.classList.add("error-msg");
  }
}

async function searchMovies(searchType, movieSearch = movieSearchInput.value, error = "") {
  let movies = []
  try {
    const fetchedObject = await fetchMovies(searchType, movieSearch);
    if (searchType == "s") {
      const fetchedObjectSearch = fetchedObject.Search;
      movies = [...fetchedObjectSearch]
    } else if (searchType == "t") {
      movies = [fetchedObject]
    }
  } catch(err) {
    checkErrors(err, movieSearch);
    return; 
  }
  movies.unshift({mySearch: movieSearch})
  localStorage.setItem("movieSearchList", JSON.stringify(movies));
  movieListDiv.classList.remove("error-msg");
  movieListDiv.innerHTML = "";
  for (let movie of movies) {
    if (movie.mySearch) { continue }
    getHtml(await fetchMovies("i", movie.imdbID), "add", error = "");
  }
  renderHtml()
}

/* Renders HTML for the list of movies returned by the getMovies function */
function getHtml(data, action, error) {
  /* This controls whether the rendered listing gets the formatting for a listing that is already on the watchlist (and needs a function to remove it) or not (and needs a function to add it). It seems counter-intuitive, but the toggle-add class designates a listing as needing the button to add the listing to the watchlist.*/
  let addRemoveWatchlistArray = ["addToWatchlist", "&plus;", "toggle-add"];

  /* This checks to see if a listing is already on the watchlist and changes its formatting to show it is on the watchlist and to give the option to remove it from the watchlist*/
  try { 
    if (Object.keys(currentWatchlist[data.imdbID]).length > 0 || action == "remove") {
      addRemoveWatchlistArray = ["removeFromWatchlist", "&minus;", "toggle-remove"];
    }
  }
  /* The catch statement is to ignore any error messages the try statement may give. I don't like how this is empty, but don't know what to put here */
  catch(err) { }

  /* Inserts a generic movie poster image in case the API does not have a poster for the listing */
  if (data.Poster == "N/A") {
    data.Poster = `https://assets.codepen.io/5515635/generic-movie-poster.jpg`;
  }
  if (error) {
    movieListDiv.innerHTML += `<h4>${error} Showing first exact title match.</h4>`
  }
  const { imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster } = data;
  html += `
      <section id="${imdbID}" class="movie-data ${addRemoveWatchlistArray[2]}">
        <div>
          <div class="movie-header">
            <h2 class="movie-title">${Title}</h2>
            <p class="movie-rating"><span class="star">&starf;</span> ${imdbRating}</p>
          </div>
          <div class="movie-info">
            <p class="movie-runtime">${Runtime}</p>
            <p class="movie-genres">${Genre}</p>
            <button id="${imdbID}-btn" class="movie-watchlist-btn" onclick="${addRemoveWatchlistArray[0]}('${imdbID}')">${addRemoveWatchlistArray[1]} Watchlist</button>
          </div>
          <p class="movie-plot">${Plot}</p>
        </div>
        <img class="movie-img" src="${Poster}" aria-text="${Title} poster" />
      </section>
    `;
}

function renderHtml() { 
  movieListDiv.innerHTML = html 
  html = ""
}

/* Adds listing info to local storage so listing info does not need to be fetched from the API again. Also updates listing formatting to show it is on the watchlist */
async function addToWatchlist(movie) {
	const data = await fetchMovies("i", movie)
  const { imdbID, Title, imdbRating, Runtime, Genre, Plot, Poster } = data;
  /* Grabs watchlist info from local storage as existingWatchlist and updates watchlist with the new entry */
  /* This uses the Nullish coalescing operator to test if watchlist exists and if it doesn't creates an empty object, if it exists it returns watchlist's data */
  let existingWatchlist = JSON.parse(localStorage.getItem("watchlist")) ?? {};     
  existingWatchlist[imdbID] = { Title, Genre, imdbRating, Runtime, Genre, Plot, Poster, imdbID};
  localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
  /* Changes the listing's formatting to reflect it is now on the watchlist */
  toggleWatchlistItem(imdbID, `removeFromWatchlist('${imdbID}')`, "-")
}

/* Removes a listing from the watchlist */
function removeFromWatchlist(imdbID) {
  let existingWatchlist = localStorage.getItem("watchlist")
  existingWatchlist = existingWatchlist ? JSON.parse(existingWatchlist) : {}
  delete existingWatchlist[imdbID];
  localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
  /* Updates formatting of listing removed from the watchlist */
  toggleWatchlistItem(imdbID, `addToWatchlist('${imdbID}')`, "+")
}

function toggleWatchlistItem(imdbID, addRemoveFunction, sign) {
  const movieListing = document.getElementById(`${imdbID}`)
  const movieListingBtn = document.getElementById(`${imdbID}-btn`);
  if ([...movieListing.classList].indexOf("toggle-add") < 0) {
    movieListing.classList.remove("toggle-remove")
    movieListing.classList.add("toggle-add")
  } else {
    movieListing.classList.remove("toggle-add")
    movieListing.classList.add("toggle-remove")
  }
  movieListingBtn.setAttribute("onclick", addRemoveFunction);
  movieListingBtn.textContent = `${sign} Watchlist`;
}

async function renderLastSearch() {
  let lastSearch = JSON.parse(localStorage.getItem("movieSearchList")) ?? {};
  if (Object.keys(lastSearch) == 0) { return }
  movieSearchInput.value = lastSearch[0].mySearch;
  movieListDiv.classList.remove("error-msg");
  for (movie of lastSearch) {
    try {
      if (movie.mySearch) { continue }
    }
    catch(err) {
      console.log(err)
    }
    getHtml(await fetchMovies("i", movie.imdbID), "add", error = "")
  }
  renderHtml()
}
renderLastSearch()