import React, { useState, useEffect } from "react";
import { Col, Row, Image, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/actions";

const ListGroupItm = ({ id }) => {
  const [movie, setMovie] = useState({});

  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`;
  const base_url = "https://image.tmdb.org/t/p/original/";

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  // console.log(wishlist);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((details) => setMovie(details));
  }, [wishlist]);

  // console.log(movie);

  const removeFromwishList = () => {
    dispatch(actions.removeFromWishList(String(movie.id)));
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      {movie && (
        <Card className="m-3">
          <Row>
            <Col xs={6} md={6}>
              <Image
                style={{ height: "15vh" }}
                src={`${base_url}${movie && movie.poster_path}`}
                thumbnail
              />
            </Col>
            <Col>
              <Row>
                <strong
                  style={{
                    fontWeight: "700",
                    fontSize: "1.6rem",
                    color: "black",
                  }}
                >
                  Movie:{" "}
                </strong>
                <span className="" style={{ fontSize: "1.6rem" }}>
                  {" "}
                  {truncate(movie.title, 15)}
                </span>
              </Row>
              <Row>
                <span
                  className="mt-2"
                  md={1}
                  style={{
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    color: "rgb(28, 162, 235)",
                  }}
                >
                  Vote:
                </span>
                <span className="mt-3">
                  <Rating value={movie.vote_average} />
                </span>
              </Row>

              <Row>
                <Col>
                  <Row className="mt-5">
                    <span style={{ color: "black" }}>ReleaseDate: </span>
                  </Row>
                  <Row className="">
                    <span>{movie.release_date}</span>
                  </Row>
                </Col>
                <Col className="mt-5 pt-2">
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
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default ListGroupItm;
