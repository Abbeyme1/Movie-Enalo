import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieTile from "./MovieTile";

function movies({ movies, loading, type }) {
  if (loading) return <h2>Loading..</h2>;
  return (
    <Row>
      {movies.map((m) => {
        if (m.poster_path == null) {
          return null;
        } else
          return (
            <Col key={m.id}>
              <MovieTile movie={m} type={type} />
            </Col>
          );
      })}
    </Row>
  );
}

export default movies;
