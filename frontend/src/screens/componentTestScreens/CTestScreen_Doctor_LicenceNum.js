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

function CTestScreen_Doctor_LicenceNum() {
    const dispatch = useDispatch();
    const [licenceNumber, setLicenceNumber] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                licenceNumber
            })
        );
    };
    return (

        <Form className="container" onSubmit={submitHandler}>

            <Form.Group as={Col} controlId="LicenceNumber">
                <Form.Label>Licence number</Form.Label>
                <Form.Control
                    required
                    placeholder="Licence number"
                    value={licenceNumber}
                    onChange={(e) => setLicenceNumber(e.target.value)}
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

export default CTestScreen_Doctor_LicenceNum;