import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/actions";

const MovieTile = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const genreURI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API}&language=en-US`;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  // console.log(wishlist);
  const [canAddToWishList, setAddToWishlist] = useState(true);
  let genreMap = new Map();
  const [genresOfMovie, setgenresOfMovie] = useState([]);

  useEffect(() => {
    let mounting = true;
    fetch(genreURI)
      .then((res) => res.json())
      .then((g) => {
        if (mounting) setGenre(g.genres);
      });

    wishlist.forEach((m) => {
      // console.log("comparing ", m, movie.id);
      if (Number(m) === movie.id) {
        // console.log("yesss");
        setAddToWishlist(false);
      }
    });

    return function cleanup() {
      mounting = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  const addTowishList = (event) => {
    dispatch(actions.addToWishlist(String(movie.id)));
    setAddToWishlist(false);
  };

  const removeFromwishList = () => {
    dispatch(actions.removeFromWishList(String(movie.id)));
    setAddToWishlist(true);
  };

  function setGenre(g) {
    if (g.length > 0) {
      g.forEach((e) => {
        genreMap.set(e.id, e.name);
      });
    }

    if (genreMap.size > 0) {
      let arr = [];
      movie.genre_ids.forEach((g) => {
        arr.push(genreMap.get(g));
      });

      setgenresOfMovie(arr);
    }
    // console.log("GM", genresOfMovie);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // console.log(genresOfMovie);
  return (
    <>
      <Card className="my-2 p-0.5 rounded" style={{ width: "18rem" }}>
        <Row>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
            <Col>
              <Card.Img
                src={`${base_url}${movie.poster_path}`}
                varient="top"
              ></Card.Img>
            </Col>
          </Link>
        </Row>

        <Card.Body className="p-3">
          <Row>
            <Col md={10}>
              <Card.Text as="div">
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h5>{truncate(movie?.original_title, 15)}</h5>
                </Link>
              </Card.Text>

              {genresOfMovie.length > 0 ? (
                genresOfMovie.map((e) => (
                  <Badge pill key={e} variant="dark" className="mr-1">
                    {e}
                  </Badge>
                ))
              ) : (
                <p></p>
              )}
            </Col>

            {canAddToWishList === true ? (
              <Col md={2} className="p-0 mt-2">
                <span
                  onClick={(e) => addTowishList(e)}
                  className="p-2"
                  style={{
                    backgroundColor: "#00A86B",
                    borderRadius: "0.3em",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-plus p-auto"
                    style={{ margin: "", color: "white" }}
                  ></i>
                </span>
              </Col>
            ) : (
              <Col md={2} className="p-0 mt-2">
                <span
                  onClick={() => removeFromwishList()}
                  className="p-2"
                  style={{
                    backgroundColor: "grey",
                    borderRadius: "0.3em",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-minus p-auto"
                    style={{ margin: "", color: "white" }}
                  ></i>
                </span>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieTile;
