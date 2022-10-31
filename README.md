# Scrimba Projects

[Scrimba](https://www.scrimba.com/) is a learning platform that teaches Front End Web Development, among other things. The thing that sets it apart from the myriad other learning platforms out there is the ability to pause the instructional video and manipulate the code that is being taught so you can write code, see how it works in the mini-browser, save your work, then unpause and finish the lesson. In its Career Path there are a number of solo projects designed to put the skills taught in the lessons to the test. Each solo project gives you a design on Figma along with the objectives of the project. From there you are on your own to bring the project to life.

This is a repo containing the Scrimba Solo Projects I've done, with the exception of the Jeopardy Clone. I utilize a mobile-first approach for most projects prioritizing resposive design to ensure that users are able to use these projects regardless of which device they use; the Jeopardy Clone is the only project here that is not responsive at this time, but I have marked this project to redesign and refactor to be responsive.



<details>
  <summary>Movie Watchlist</summary>
  
  - [Movie Watchlist](https://dallasviars.github.io/Scrimba_Projects/MovieWatchlist/)
  
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

<details>
  <summary> Color Scheme Generator </summary>
  
  - [Color Scheme Generator](https://dallasviars.github.io/Scrimba_Projects/Color-Scheme-Generator/)
  
  #### Project requirements: 
  - Use an `<input type="color">` element
  - Use `<select>` to choose a color scheme
  - Use fetch to retrieve color information from an API
  - Initiate the fetch by clicking a button
  - Display the scheme colors and hex values
  - Extra credit:
    - Display color name
    - Enable one-click copy for the hex value
  
  #### Skills used:
  - HTML, CSS, and DOM manipulation
  - Asynchronous promises
  - Fetch data from an API
  - Use of ternary operator
  - Minor use of regex
  
  #### Notes, thoughts, and methodology:
The Color Scheme Generator was my first solo foray into REST API use and I was in awe of the sheer amount of information one can get from an API. It was so exciting to see how much an API could do. I had a great deal of fun with this project, and given that Scrimba does not actually grade solo projects I took some liberty to make some changes to it. The biggest change was to add a button to enable animation of the colors displayed. I had been doing some CSS animation practice and thought it would be fun to add, but also recognized not everyone would want that animation all the time, thus the enable button was born.
</details>
<details>
  <summary> Color Scheme Generator using Partial Application of Single Responsibility Functions</summary>
  
  - [Color Scheme Generator using Partial Application of Single Responsibility Functions](https://dallasviars.github.io/Scrimba_Projects/Color-Scheme-Generator-Partial-Application/)
  
  #### Project requirements: 
  - Use an `<input type="color">` element
  - Use `<select>` to choose a color scheme
  - Use fetch to retrieve color information from an API
  - Initiate the fetch by clicking a button
  - Display the scheme colors and hex values
  - Extra credit:
    - Display color name
    - Enable one-click copy for the hex value
  
  #### Skills used:
  - HTML, CSS, and DOM manipulation
  - Asynchronous promises
  - Fetch data from an API
  - Use of ternary operator
  - Minor use of regex
  - Improved naming convention of functions and variables
  - Partial Application of Single Responsibility Functions
  
  #### Notes, thoughts, and methodology:
Having just learned about the idea behind Partial Application I set out to find a project I'd already done and apply what I'd learned to it. Refactoring the original Color Scheme Generator code was more challenging than I originally thought it would be, but the resulting code appears cleaner and easier to read as well as having components that are more readily suited to be used in other projects without significant reworking. 
</details>
<details>
  <summary> Invoice Creator  </summary>
  
  [Invoice Creator](https://dallasviars.github.io/Scrimba_Projects/Invoice-Creator/)
  
  #### Project requirements: 
  - Use an array to hold services requested
  - Buttons to add service to array
  - Place to display data from the array
  - Update display each time the array is changed
  - Can only use each service once
  - Total cos stays updated
  - Button to "send invoice" (reset page)
  - Stretch: Add ability to remove items after they've been added

  
  #### Skills used:
  - Use of 1D objects
  - DOM manipulation
  - Use of .slice(), .reduce(), and .map() methods

  
  #### Notes, thoughts, and methodology:
  - This was one of the first Scrimba Solo Projects I created. Like many other challenges I had a fun time doing this one. Looking back now I see many places where I could improve my code (some of the more obvious changes for a future refactoring listed below). 
  - The Figma file for this project suggested items related to lawn care, but since this is a Solo Project and the content for it is flexible I chose Bakery items since I love to bake, and feeding people tasty things is something I enjoy very much.
  - I decided to leave this project here without refactoring it as an easy reference point on how my code has improved with expereience.

  #### Room for improvement:
  - Remember to remove unnecessary instances of console.log()
  - Remember to remove code that has been commented out
  - Simplify comparisons to use the ternary operator when it will improve readability
  - Use better naming conventions in CSS and Javascript (i.e. instead of `addToInvoice(x)` use `addToInvoice(item)`)
  - Use `.classList.toggle(className)` instead of using multiple lines to change individual CSS properties
  - Rework functions to avoid onclick function calls in the HTML
  
</details>
