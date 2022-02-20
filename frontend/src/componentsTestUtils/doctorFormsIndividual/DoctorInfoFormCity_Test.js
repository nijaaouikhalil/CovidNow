import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { updateUser } from "../../actions/userActions";
import { Container, Row, Col } from "react-bootstrap";

<Form className="container" onSubmit={submitHandler}>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
                required
                placeholder="Postal code"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
        </Form.Group>
    </Row>

    <Row className="mb-3 justify-content-md-center">
        <div className="d-grid gap-2 py-3">
            <Button type="submit" variant="primary">
                Update
            </Button>
        </div>
    </Row>
</Form>