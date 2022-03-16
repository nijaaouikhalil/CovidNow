import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

function CTestScreen_Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  const goHome = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    dispatch(logout());
    goHome();
  };
  return (
    <Navbar id="main-navbar" className="d-flex align-items-center" bg="primary" collapseOnSelect variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>CovidTracker</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <LinkContainer className="m-3" to="/">
            <i className="fas fa-home clickable"> Home </i>
          </LinkContainer>
          {user_info && (
            <NavDropdown title={user_info.name.substring(0, 1).toUpperCase() + user_info.name.substring(1, user_info.name.length)} id="name" className="text-body d-flex align-items-center">
              <LinkContainer to={`/editprofile`}>
                <NavDropdown.Item>Edit my info</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <LinkContainer className="m-3" to="/announcements">
            <i className="fas fa-bullhorn clickable"> Announcements </i>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CTestScreen_Header;
