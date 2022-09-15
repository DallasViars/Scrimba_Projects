13 June 2022
    Advice from Code Review:
            1. Make color contrasts more accessible
                a. Search button
                b. Links for Search and My Watchlist
        
            2. Refactoring opportunities:
                a. Set and get localStorage functions
                b. Data destructuring
                c. Reduce document.getElement... by consolidating into a variable and manipulating variable

11 June 2022
    1. Make watchlist.js version of removeFromWatchlist() more like the index.js version

10 June 2022
    1. Figure out how to import/export functions and get them to work
    -- Tried this and live pages don't like referencing functions with IDs created with variables

        2. Fix searchbar alignment

    3. Find better hi-lite color for watchlist items

        4. Fix naming (i.e. watchList vs watchlist) 

    5. Add dark mode

    6. Better use CSS variables for colors and such (goes with dark mode)

        7. Refactor code to be DRYer. Repeated sections such as:
            /*
                addOrRemove = "removeFromWatchList"
                addOrRemoveSign = "&minus;"
                alreadyOnList = "toggle-remove";
            */
            
            a. The above could be stored in an array...
        
        7A. Specifically the renderHtml function, it looks unwieldy.
    
    8. Sort the search list so identical searches appear in the same order
    
    9. Make a clear search results button
        a. This should render below search results
    
        10. Save search results to localstorage so they can be loaded if switching back and forth b/t the Search and Watchlist pages