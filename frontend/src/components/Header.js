import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Header() {
  return (
    <Navbar bg="primary" collapseOnSelect variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>CovidTracker</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <LinkContainer className="m-3" to="/">
            <i className="fas fa-home"> Home </i>
          </LinkContainer>
          <LinkContainer className="m-3" to="/login">
            <i className="fas fa-user"> Login </i>
          </LinkContainer>
          <LinkContainer className="m-3" to="/announcements">
            <i className="fas fa-bullhorn"> Announcements </i>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
