import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/actions";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [canAddToWishList, setAddToWishlist] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`;

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((details) => setMovie(details));

    wishlist.forEach((m) => {
      if (m === id) {
        setAddToWishlist(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist, dispatch, canAddToWishList]);

  // console.log("SDFSF", movie && movie.production_companies.length);

  const addTowishList = () => {
    dispatch(actions.addToWishlist(id));
  };

  const removeFromwishList = () => {
    dispatch(actions.removeFromWishList(id));
    setAddToWishlist(true);
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center my-5">
          <Col xs={12} sm={4} style={{ backgroundColor: "" }} className="mr-3">
            <Card
              className="mt-2 justify-content-md-center p-0.5 rounded"
              style={{
                width: "25em",
                float: "right",
                justifyContent: "center",
              }}
            >
              <Row>
                <Col>
                  <Card.Img
                    src={`${base_url}${movie && movie.poster_path}`}
                    varient="top"
                  ></Card.Img>
                </Col>
              </Row>

              {/* <Card.Body>
                <Card.Text as="div"></Card.Text>
              </Card.Body> */}
            </Card>
          </Col>
          <Col xs={12} sm={6} style={{ backgroundColor: "" }}>
            <Row className="justify-content-md-center mb-3">
              <p
                style={{
                  color: "white",
                  fontSize: "3rem",
                  borderBottom: "1px solid white",
                }}
              >
                {movie && movie.title}
              </p>
            </Row>
            <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Col md={3} style={{ backgroundColor: "" }}>
                <Rating value={movie && movie.vote_average / 2} />
              </Col>
              <Col md={5} style={{ backgroundColor: "" }}>
                <p style={{ color: "white", fontSize: "1.1em" }}>
                  Rel. Date: {movie && movie.release_date}
                </p>
              </Col>

              <Col md={4} style={{ backgroundColor: "" }} className="pl-5">
                {movie && movie.adult ? (
                  <p>
                    <span
                      style={{
                        border: "0.1px solid white",
                        padding: "0.2em",
                        color: "yellow",
                      }}
                    >
                      18+
                    </span>
                  </p>
                ) : (
                  <p>
                    <span
                      style={{
                        border: "0.1px solid white",
                        padding: "0.2em",
                        color: "yellow",
                      }}
                    >
                      UA
                    </span>
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Container
                style={{ color: "white", fontSize: "1.5em" }}
                className="mx-4 mt-3"
              >
                Overview: {movie && movie.overview}
              </Container>
            </Row>
            {/* <Row>
              <p>{movie && movie.original_language}</p>
            </Row> */}
            <Row className="mt-3 ml-3" style={{ backgroundColor: "" }}>
              <span className="mr-2 mt-2" style={{ color: "grey" }}>
                Production Companies:-
              </span>

              {movie && movie.production_companies.length ? (
                movie.production_companies.map((v) => (
                  <Badge
                    pill
                    variant="info"
                    key={v.id}
                    className="mr-2 mt-2"
                    style={{ fontSize: "1.1em" }}
                  >
                    {v.name}
                  </Badge>
                ))
              ) : (
                <Badge
                  pill
                  variant="danger"
                  key={404}
                  className="mr-2 mt-2"
                  style={{ fontSize: "1.1em" }}
                >
                  Data Not Available
                </Badge>
              )}
            </Row>

            {canAddToWishList ? (
              <Row
                onClick={() => {
                  addTowishList();
                }}
                className="mt-5 ml-3 py-3"
                style={{
                  backgroundColor: "#00A86B",
                  borderRadius: "0.3em",
                  cursor: "pointer",
                }}
              >
                <span style={{ margin: "0 auto", color: "white" }}>
                  <i className="fas fa-plus"></i> WishList
                </span>
              </Row>
            ) : (
              <Row
                onClick={() => {
                  removeFromwishList();
                }}
                className="mt-5 ml-3 py-3"
                style={{
                  backgroundColor: "grey",
                  borderRadius: "0.3em",
                  cursor: "cursor",
                }}
              >
                <span style={{ margin: "0 auto", color: "white" }}>
                  <i className="fas fa-minus"></i> wishlisted
                </span>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
