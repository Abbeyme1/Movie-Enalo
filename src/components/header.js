import React from "react";
import { Navbar, Form, FormControl, Container, Nav } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
function Header() {
  const history = useHistory();
  return (
    <Container>
      <Navbar
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          borderBottom: "1px solid white",
          marginBottom: "2vh",
        }}
      >
        <Container>
          <Navbar.Brand href="/">ENALO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink
                className="mt-2 mr-2"
                to="/favourites"
                style={{ color: "white" }}
              >
                Favourites
              </NavLink>
              <Form inline className="mr-auto">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="ml-auto"
                  style={{ height: "2vh" }}
                  onChange={(e) => {
                    // console.log(e.target.value.length);
                    if (e.target.value.length === 0) history.push("/");
                    else history.push(`/search?q=${e.target.value}`);
                  }}
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
