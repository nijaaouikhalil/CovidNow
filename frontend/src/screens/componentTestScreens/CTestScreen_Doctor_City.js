import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
//import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
//import { login } from "../actions/userActions";
//import Loader from "../components/Loader";
//import Message from "../components/Message";

import { updateUser } from "../../actions/userActions";

function CTestScreen_Doctor_City() {
    const dispatch = useDispatch();
    const [city, setCity] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                city
            })
        );
    };
    return (

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
    );
}

export default CTestScreen_Doctor_City;