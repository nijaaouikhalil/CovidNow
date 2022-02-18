import React from "react";
import { covid_resources } from "../utils/utils";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Row, Col, Card } from "react-bootstrap";
import Resource from "../components/Resource";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, user_info } = userLogin;

  return (
    <div className="p-3">
      <h1>COVID RESOURCES </h1>
      <div className="container mx-auto">
        <Row className="row-eq-height">
          {covid_resources.map((resource) => (
            <Col
              key={resource._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="Col_profile"
            >
              <Resource resource={resource} />
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <h1>Your account news </h1>
        {!user_info ? (
          <Message variant="info">
            Please <Link to="/login">login</Link> to view your account
            information
          </Message>
        ) : (
          <Card>
            <Card.Body>Dashboard</Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
