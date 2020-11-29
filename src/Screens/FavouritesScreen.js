import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListGroupItem from "../components/ListGroupItem";

const FavouritesScreen = () => {
  const favourites = useSelector((state) => state.wishlist.wishlist);

  return (
    <Container>
      <Row>
        {favourites.map((m) => (
          <ListGroupItem id={m} key={m} />
        ))}
      </Row>
    </Container>
  );
};

export default FavouritesScreen;
