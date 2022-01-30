import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Navbar bg="primary" collapseOnSelect variant="dark">
        <Container>
          <Navbar.Brand>CovIDTracker</Navbar.Brand>
          <Row>
            <Col className="text-center py-3">Copyright &copy; 2022 CovIDTracker</Col>
          </Row>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
