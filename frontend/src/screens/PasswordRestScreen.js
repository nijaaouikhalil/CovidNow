import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/utils";
import axios from "axios";
import {Loader} from "../components/Loader";
import {Message} from "../components/Message";
function PasswordRestScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [updating, setUpdating] = useState(false);
  const [sucessReportRequest, setSucessReportRequest] = useState(false);
  const [message, setMessage] = useState("");

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const { data } = await axios.put(BaseUrl + `/api/auth/passwordrest`, {
        email,
      });
      setMessage(data.message);
      setUpdating(false);
      setSucessReportRequest(true);
    } catch (error) {
      setUpdating(false);
      setMessage("An error has occured! Please try again later.");
      setSucessReportRequest(false);
    }
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
      {updating ? (
        <Loader />
      ) : message ? (
        <Message variant={sucessReportRequest ? "success" : "danger"}>
          {message}
        </Message>
      ) : (
        ""
      )}
    </FormContainer>
  );
}

export default PasswordRestScreen;
