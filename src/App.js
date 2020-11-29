import React from "react";
import "./App.css";
import Header from "./components/header";
// import Home from "./Screens/HomeScreen";
import { Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
// import search from "./Screens/SearchScreen";
// import Movie from "./Screens/MoviePage";
// import Favourties from "./Screens/FavouritesScreen";
import asyncComponent from "./components/asyncComponent";

const asyncFavourites = asyncComponent(() => {
  return import("./Screens/FavouritesScreen");
});
const asyncMovie = asyncComponent(() => {
  return import("./Screens/MoviePage");
});
const asyncSearch = asyncComponent(() => {
  return import("./Screens/SearchScreen");
});
const asyncHome = asyncComponent(() => {
  return import("./Screens/HomeScreen");
});

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/favourites" component={asyncFavourites} />
        <Route path="/movie/:id" component={asyncMovie} />
        <Route path="/search" component={asyncSearch} />
        <Route path="/" component={asyncHome} exact />
      </Switch>
    </div>
  );
};

export default App;
