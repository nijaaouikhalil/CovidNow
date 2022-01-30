import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Navbar bg="primary" collapseOnSelect variant="dark">
        <Container>
          <Navbar.Brand>CovIDTracker</Navbar.Brand>
          <Row>
            <Col className="text-center py-3">&copy; {getCurrentYear()} CovIDTracker</Col>
          </Row>
        </Container>
      </Navbar>
    </footer>
  );
}

function getCurrentYear() {
  return (new Date()).getFullYear();
}

export default Footer;
