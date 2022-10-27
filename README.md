# Scrimba Projects

[Scrimba is a learning platform](https://www.scrimba.com/) that teaches Front End Web Development, among other things. The thing that sets it apart from the myriad other learning platforms out there is the ability to pause the instructional video and manipulate the code that is being taught so you can write code, see how it works in the mini-browser, save your work, then unpause and finish the lesson. In its Career Path there are a number of solo projects designed to put the skills taught in the lessons to the test. Each solo project gives you a design on Figma along with the objectives of the project. From there you are on your own to bring the project to life.

This is a repo containing the Scrimba Solo Projects I've done, with the exception of the Jeopardy Clone. I utilize a mobile-first approach for most projects prioritizing resposive design to ensure that users are able to use these projects regardless of which device they use; the Jeopardy Clone is the only project here that is not responsive at this time, but I have marked this project to redesign and refactor to be responsive.



<details>
  <summary>Movie Watchlist</summary>
  
  [Movie Watchlist](https://dallasviars.github.io/Scrimba_Projects/MovieWatchlist/)
  
  ### Project requirements: 
  - Contain two pages
    - index.html
      - Search page
      - Calls the OMDB API using title search
      - Displays search results 
    - watchlist.html
      - Displays movie data for movies saved using an "Add to watchlist" button
    - Button to "add to watchlist" to save data to local storage
  
  ### Skills used:
  - Asynchronous promises
  - Async / await
  - Error handling
  - Object destructuring
  - Spread operator
  - Nullish coalescing operator
  - HTML, CSS, and DOM manipulation
  
  ### Notes, thoughts, and methodology:

This was such a fun and educational project to work on. I really enjoyed reading through the API documentation and testing its functionality. Some of the things I learned while working on this project are: 

- Use of nullish coalescing operator: I had run into trouble with the saved watchlist trying to assign value to the currentWatchlist variable when the localStorage "watchlist" item didn't exist. Using the NCO here allowed me to account for the possibility of nullish values and offer an alternative value to the variable.
- This was my first project to check for the Enter key being pressed in order to trigger a function call
- This was my first live use of storing and retrieving info from localStorage

One of my goals in the way I wrote this project was to limit it to having only one function to fetch data from an API. My initial writeup used 4 functions to fetch that data. Should I refactor this project again I plan to utilize Partial Application of Single Use Functions in order to improve readability.
  
</details>
