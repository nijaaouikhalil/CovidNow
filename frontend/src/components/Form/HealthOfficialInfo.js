import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { updateUser } from "../../actions/userActions";
function HealthOfficialInfo() {
  const dispatch = useDispatch();
  const [healthID, sethealthID] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        healthOfficialID: healthID,
      })
    );
  };
  return (
    <Form className="container" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Health official ID</Form.Label>
        <Form.Control
          required
          placeholder="Health official ID"
          value={healthID}
          onChange={(e) => sethealthID(e.target.value)}
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

export default HealthOfficialInfo;
