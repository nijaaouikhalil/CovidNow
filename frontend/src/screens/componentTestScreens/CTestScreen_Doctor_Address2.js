import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";

function CTestScreen_Doctor_Address2() {
    const dispatch = useDispatch();
    const [address2, setAdress2] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                address2
            })
        );
    };
    return (

        <Form className="container" onSubmit={submitHandler}>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                    required
                    placeholder="Address 2"
                    value={address2}
                    onChange={(e) => setAdress2(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Row className="mb-3 justify-content-md-center">
                <div className="d-grid gap-2 py-3">
                    <Button type="submit" variant="primary" title="updatebutton2">
                        Update
                    </Button>
                </div>
            </Row>
        </Form>
    );
}

export default CTestScreen_Doctor_Address2;