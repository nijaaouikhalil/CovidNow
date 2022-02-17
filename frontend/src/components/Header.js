import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  const goHome = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(logout());
    goHome();
  };
  return (
    <Navbar id="main-navbar" bg="primary" collapseOnSelect variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>CovidTracker</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <LinkContainer className="m-3" to="/">
            <i className="fas fa-home clickable"> Home </i>
          </LinkContainer>
          {user_info ? (
            <NavDropdown title={user_info.name} id="name" className="text-body">
              <LinkContainer to={`/editprofile`}>
                <NavDropdown.Item>Edit my info</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link className="text-body">
                <i className="fas fa-user clickable"></i> Login
              </Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer className="m-3" to="/announcements">
            <i className="fas fa-bullhorn clickable"> Announcements </i>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
          {user_info && user_info.roles === "ROLE_ADMIN" && (
            <NavDropdown title="Admin" id="adminmenue">
              <LinkContainer to="/admin/dashboard">
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {user_info && user_info.roles === "ROLE_DOCTOR" && (
            <NavDropdown title="Doctor" id="doctormenue">
              <LinkContainer to="/doctor/dashboard">
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {user_info && user_info.roles === "ROLE_IMMIGRATION_OFFICER" && (
            <NavDropdown title="Immigration Officer" id="immimenue">
              <LinkContainer to="/immi/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
