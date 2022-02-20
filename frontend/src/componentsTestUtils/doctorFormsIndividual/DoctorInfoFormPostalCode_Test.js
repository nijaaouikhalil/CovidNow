import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { updateUser } from "../../actions/userActions";
import { Container, Row, Col } from "react-bootstrap";

function DoctorInfoPostalCode_Test() {
    const dispatch = useDispatch();
    const [postalcode, setPostalcode] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                postalCode: postalcode
            })
        );
    };

    return (

        <Form className="container" onSubmit={submitHandler}>

            <Form.Group as={Col} controlId="postalcode">
                <Form.Label>Postal code</Form.Label>
                <Form.Control
                    required
                    placeholder="Postal code"
                    value={postalcode}
                    onChange={(e) => setPostalcode(e.target.value)}
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

export default DoctorInfoPostalCode_Test;