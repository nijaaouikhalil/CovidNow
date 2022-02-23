import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";

function CTestScreen_Doctor_Province() {
    const dispatch = useDispatch();
    const [province, setProvince] = useState("");
    const provinces = [
        { lable: "Quebec", value: "QC" },
        { lable: "Ontario", value: "ON" },
        { lable: "Newfoundland and Labrador", value: "NL" },
        { lable: "Manitoba", value: "MB" },
        { lable: "Saskatchewan", value: "SK" },
        { lable: "Alberta", value: "AB" },
        { lable: "British Columbia", value: "BC" },
        { lable: "Yukon", value: "YT" },
        { lable: "Nunavut", value: "NU" },
    ];
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                province
            })
        );
    };
    return (

        <Form className="container" onSubmit={submitHandler}>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                    <FloatingLabel controlId="floatingSelect" label="select province">
                        <Form.Select

                            value={province}
                            placeholder="Province"
                            onChange={(e) => setProvince(e.target.value)}
                            aria-label="Floating label select example"
                        >
                            <option>select province</option>
                            {provinces.map((prov) => (
                                <option value={prov.value}>{prov.lable}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Row className="mb-3 justify-content-md-center">
                <div className="d-grid gap-2 py-3">
                    <Button type="submit" variant="primary" title="updatebutton6">
                        Update
                    </Button>
                </div>
            </Row>
        </Form>
    );
}

export default CTestScreen_Doctor_Province;