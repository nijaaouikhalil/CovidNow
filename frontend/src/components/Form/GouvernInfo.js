import React, { useState } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";

function GouvernInfo() {
  const [gouvID, setGouvID] = useState("");
  return (
    <Form className="container">
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Gouverment ID</Form.Label>
        <Form.Control
          required
          placeholder="Gouverment ID"
          value={gouvID}
          onChange={(e) => setGouvID(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Row className="mb-3 justify-content-md-center">
        <div className="d-grid gap-2 py-3">
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default GouvernInfo;
