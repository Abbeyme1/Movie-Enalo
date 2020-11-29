import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import Movies from "../components/movies";
import { Container } from "react-bootstrap";
import Pagination from "../components/pagination";

const SearchScreen = () => {
  const location = useLocation();
  const query = location.search.replace("?q=", "");

  const [foundMovies, setFoundedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    let mounting = true;

    if (mounting) search(query);

    return function cleanup() {
      mounting = false;
    };
  }, [query]);

  const search = (text) => {
    setLoading(true);
    const searchLink = `https://api.themoviedb.org/3/search/movie?api_key=748046f3c7ed5e779409b55dc7afae53&language=en-US&query=${text}&page=1&include_adult=false`;
    fetch(searchLink)
      .then((res) => res.json())
      .then((e) => {
        setFoundedMovies(e.results);
        setLoading(false);
      });
  };

  const indexOfLastMovie = currentPage * postsPerPage; // 5 , 10
  const indexOfFirstMovie = indexOfLastMovie - postsPerPage; // 5 - 5, 10 - 5
  const currentMovies = foundMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (num) => {
    setcurrentPage(num);
  };

  return (
    <div>
      {loading ? (
        <div className="loader">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <Container className="center">
          <Movies movies={currentMovies} loading={loading} type="search" />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={foundMovies.length}
            paginate={paginate}
            current={currentPage}
          />
        </Container>
      )}
    </div>
  );
};

export default SearchScreen;
