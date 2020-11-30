
### Description

It is single page application to display movies using [The Movie Database API](https://developers.themoviedb.org/3).

When opening the application, a list of popular movies with pagination or dynamic loading (optional) is displayed. 
There is search field on the page. 
When you enter some text there, the films that correspond to it is displayed. 
For each movie, the list displays a list of genres (genre names, not idics) to which it belongs.

When you click on a card with a film, a page with detailed information about this film and a list of recommended or similar (you can do both) films to it is shown.

Also implemented the ability to add or remove movies to favorites both from the list and on the page with a single movie. 
Saved the list of such movies locally (localStorage, for example). 
List of favourites movies is shown in "Favourites" .
