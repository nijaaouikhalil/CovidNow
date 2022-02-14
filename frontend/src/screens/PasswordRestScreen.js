import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function PasswordRestScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, user_info } = userLogin;
  useEffect(() => {
    if (user_info) {
      if (user_info.verified === "Pending") {
        navigate("/editprofile");
      } else {
        navigate("/");
      }
    }
  }, [navigate, user_info]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <h1>Reset Password</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="d-grid gap-2 py-3">
          <Button type="submit" variant="primary">
            Send Confirmation
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default PasswordRestScreen;
