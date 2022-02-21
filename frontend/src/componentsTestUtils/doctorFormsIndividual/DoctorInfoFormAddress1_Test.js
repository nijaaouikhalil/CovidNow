import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import FormContainer from "./components/Form/FormContainer";
import { updateUser } from "../../actions/userActions";


function DoctorInfoAddress1_Test() {
    const dispatch = useDispatch();
    const [address1, setAdress1] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                address1
            })
        );
    };
    return (
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
    );
}
export default DoctorInfoAddress1_Test;