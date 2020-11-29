import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import Movies from "../components/movies";
import Pagination from "../components/pagination";
import Loader from "../components/Loader";

const Home = () => {
  const [popularMovies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const movieURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`;
    setLoading(true);
    fetch(movieURL)
      .then((res) => res.json())
      .then((movies) => {
        setMovies(movies.results);
        setLoading(false);
      });
  }, []);

  // console.log(popularMovies);
  const indexOfLastMovie = currentPage * postsPerPage; // 5 , 10
  const indexOfFirstMovie = indexOfLastMovie - postsPerPage; // 5 - 5, 10 - 5
  const currentMovies = popularMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  // pagination fun to change page
  const paginate = (num) => {
    setcurrentPage(num);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Movies movies={currentMovies} loading={loading} type="home" />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={popularMovies.length}
            paginate={paginate}
            current={currentPage}
          />
        </Container>
      )}
    </div>
  );
};

export default Home;
