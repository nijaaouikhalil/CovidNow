import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { covid_resources } from "../utils/utils";
import {Resource} from "../components/Resource";
import { Link } from "react-router-dom";
import {Message} from "../components/Message";

function AnnouceScreen() {
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
      <Message variant="info">
        Please <Link to="/login">login</Link> to view your account
        information
      </Message>
    </div>
  </div>
  );
}

export default AnnouceScreen;
