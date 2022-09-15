// import {renderHtml, removeFromWatchlist, showWatchlist} from "./javascript.js";

let html = "";
let watchlist = {};
const mainEl = document.getElementById("main");
const movieListDiv = document.getElementById("movie-list");
if (!localStorage.getItem("watchlist")) {
  let myStorage = JSON.parse(localStorage.getItem("watchlist"));
}


/* Renders HTML for the list of movies returned by the getMovies function */
function renderHtml(data, action, error) {
  
  /* These control whether the rendered listing gets the formatting for a listing that is already on the watchlist (and needs a function to remove it) or not (and needs a function to add it).  */
  let addOrRemove = "";
  let addOrRemoveSign = "";
  let alreadyOnList = "";
  
  if (action == "add") {
    addOrRemove = "addToWatchlist";
    addOrRemoveSign = "&plus;";
    /* It seems counter-intuitive, but the toggle-add class designates a listing as needing the button to add the listing to the watchlist. */
    alreadyOnList = "toggle-add";
  }
  if (action == "remove") {
      addOrRemove = "removeFromWatchlist"
      addOrRemoveSign = "&minus;"
      alreadyOnList = "toggle-remove";
  }
  /* This checks to see if a listing is already on the watchlist and changes its formatting to show it is on the watchlist and to logive the option to remove it from the watchlist*/
  try {
    if (Object.keys(currentWatchlist[data.imdbID]).length > 0 ) {
      addOrRemove = "removeFromWatchlist";
      addOrRemoveSign = "&minus;";
      alreadyOnList = "toggle-remove";
    }
  }
  /* The catch statement is to ignore any error messages the try statement may give */
  catch(err) {
    /* I don't like how this is empty, but don't know what to put here */
  }
  
  /* Inserts a generic movie poster image in case the API does not have a poster for the listing */
  if (data.Poster == "N/A") {
    data.Poster = `https://assets.codepen.io/5515635/generic-movie-poster.jpg`;
  }
  if (error) {
    movieListDiv.innerHTML += `<h4>${error} Showing first exact title match.</h4>`
  }
  const { Title, imdbRating, Runtime, Genre, Plot, Poster, imdbID } = data;
  movieListDiv.innerHTML += `
      <section id="${imdbID}" class="movie-data ${alreadyOnList}">
        <div>
          <div class="movie-header">
            <h2 class="movie-title">${Title}</h2>
            <p class="movie-rating"><span class="star">&starf;</span> ${imdbRating}</p>
          </div>
          <div class="movie-info">
            <p class="movie-runtime">${Runtime}</p>
            <p class="movie-genres">${Genre}</p>
            <button id="${imdbID}-btn" class="movie-watchlist-btn" onclick="${addOrRemove}('${imdbID}')">${addOrRemoveSign} Watchlist</button>
            
          </div>
          <p class="movie-plot">${Plot}</p>
        </div>
        <img class="movie-img" src="${Poster}" aria-text="${Title} poster" />
      </section>
    `;
}

function removeFromWatchlist(imdbID) {
  delete watchlist[imdbID];
  document.getElementById(`${imdbID}`).classList.remove("toggle-remove");
  document.getElementById(`${imdbID}`).classList.add("toggle-add");
  document.getElementById(`${imdbID}-btn`).setAttribute("onclick", `addToWatchlist('${imdbID}')`);
  document.getElementById(`${imdbID}-btn`).textContent = "+ Watchlist";
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  
  //The line below is only for the watchlist.html page
  document.getElementById(`${imdbID}`).remove()
  if (!watchlist || Object.keys(watchlist).length === "null" || Object.keys(watchlist).length === 0) {
    movieListDiv.classList.add("error-msg");
    movieListDiv.innerHTML = `
        <div>
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html">&plus;Let's add some movies!</a>
        </div>
    `
  }
}

/* Displays the watchlist */
function showWatchlist() {
  movieListDiv.innerHTML = "";
  watchlist = JSON.parse(localStorage.getItem("watchlist"));  
  /* Checks to see if the watchlist exists and if not renders a message and links back to index.html */
  if (!watchlist || Object.keys(watchlist).length === "null") {
    movieListDiv.classList.add("error-msg");
    movieListDiv.innerHTML = `
        <div>
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html">&plus;Let's add some movies!</a>
        </div>
    `
  } else {
      /* Calls the renderHtml function along with data to display the watchlist */
    for (let key of Object.keys(watchlist)) {
      renderHtml(watchlist[key], "remove");
    }
  }
}
showWatchlist()