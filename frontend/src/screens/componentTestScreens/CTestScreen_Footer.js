import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function CTestScreen_Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">&copy; {getCurrentYear()} CovIDTracker</Col>
        </Row>
      </Container>
    </footer>
  );
}

function getCurrentYear() {
  return (new Date()).getFullYear();
}

export default CTestScreen_Footer;
