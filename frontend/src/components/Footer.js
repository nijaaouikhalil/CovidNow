import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className="text-center py-3">Copyright &copy; CovidTracker</Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;

function Footer() {
  return (
    <footer>
      <Navbar bg="primary" collapseOnSelect variant="dark">
        <Container>
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
