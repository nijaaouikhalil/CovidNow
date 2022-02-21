import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";

function CTestScreen_Govern_ID() {
    const dispatch = useDispatch();
    const [gouvID, setGouvID] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                governmentID: gouvID,
            })
        );
    };
    return (

        <Form className="container" onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Gouverment ID</Form.Label>
                <Form.Control
                    required
                    placeholder="Gouverment ID"
                    value={gouvID}
                    onChange={(e) => setGouvID(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Row className="mb-3 justify-content-md-center">
                <div className="d-grid gap-2 py-3">
                    <Button type="submit" variant="primary" title="updatebutton7">
                        Update
                    </Button>
                </div>
            </Row>
        </Form>
    );
}

export default CTestScreen_Govern_ID;