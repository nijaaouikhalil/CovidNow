import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { updateUser } from "../../actions/userActions";

<Form className="container" onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address 1</Form.Label>
        <Form.Control
            required
            placeholder="Postal code"
            value={address1}
            onChange={(e) => setAdress1(e.target.value)}
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