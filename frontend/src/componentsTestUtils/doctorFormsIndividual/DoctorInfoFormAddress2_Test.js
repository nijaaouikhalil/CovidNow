import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { updateUser } from "../../actions/userActions";
import { Container, Row, Col } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

<Form className="container" onSubmit={submitHandler}>

    <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
            required
            placeholder="Postal code"
            value={address2}
            onChange={(e) => setAdress2(e.target.value)}
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