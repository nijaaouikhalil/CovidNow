import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "../components/Form/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user_type, setType] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log();
  };
  return (
    <div className="container">
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col>
            <h1>Sign up </h1>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSelect" label="User type">
              <Form.Select
                value={user_type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Floating label select example"
              >
                <option>select user type</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="health">Health official</option>
                <option value="immigration officer">Immigration officer</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>confirm email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3 justify-content-md-center">
          <div className="d-grid gap-2 py-3">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to={"/login"}>Sign In</Link>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterScreen;
