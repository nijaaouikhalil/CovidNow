import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Accordion, ListGroup, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorGetPatient, DoctorUpdatePatient } from "../actions/doctorActions";
import { LinkContainer } from "react-router-bootstrap";

function DoctorPatientDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
//   const DoctorListPatients = useSelector((state) => state.DoctorListPatients);
//   const { users, loading, error } = DoctorListPatients;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_DOCTOR") {
      navigate("/login");
    }
    // dispatch(DoctorGetPatient());
  }, [dispatch, user_info]);

  
  return (
    <div>
      <Link to="/doctor/patientlist" className="btn btn-light my-2">
        Go Back
      </Link>
      <Container>
        <h3 className="my-3 text-center">Patient Name</h3>
        {/* {updateLoading ? (
          <Loader />
        ) : updatError ? (
          <Message variant="danger">{updatError}</Message>
        ) : message ? (
          <Message variant="success">{message}</Message>
        ) : (
          ""
        )} */}

        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : ( */}
          <div>
            <Row className="justify-content-center">
              <Col md={10}>

                <h2 className="ms-3">Patient Details</h2>
                <div className="mb-5" style={{maxHeight: "200px", overflow: "scroll"}}>

                    <ListGroup variant="flush">
                        <ListGroup.Item>First Name : Joe</ListGroup.Item>
                        <ListGroup.Item>Last Name : Bloggs</ListGroup.Item>
                        <ListGroup.Item>Email : joe@bloggs.com</ListGroup.Item>
                        <ListGroup.Item>DOB : 26/05/1995</ListGroup.Item>
                        <ListGroup.Item>Street Address : 1234 park lane</ListGroup.Item>
                        <ListGroup.Item>City : Montreal</ListGroup.Item>
                        <ListGroup.Item>Province: Quebec</ListGroup.Item>
                        <ListGroup.Item>Post Code: H2R 3T4</ListGroup.Item>
                    </ListGroup>
                </div>

                <h2 className="ms-3">Requirement Updates</h2>
                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Patient Update #3</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Requirement1Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement2Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement3Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>...</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Patient Update #2</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Requirement1Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement2Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement3Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>...</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Patient Update #1</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Requirement1Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement2Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement3Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>...</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <h2 className="ms-3 mt-5 text-danger">Update Patient Details</h2>


                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Status</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup className="ms-4 w-75" variant="flush">
                                <ListGroup.Item>
                                    <Form.Check type="switch" id="covid-conf-switch" label="Covid Confirmed"/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check type="switch" id="quarntine-switch" label="In Quarantine"/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check type="switch" id="urgent-switch" label="Urgent"/>
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Requirements</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Requirement1Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement2Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>Requirement3Name : patientInfo</ListGroup.Item>
                                <ListGroup.Item>...</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Button className="ms-3 w-50">UPDATE PATIENT</Button>
                </div>



              </Col>
            </Row>
          </div>
        {/* )} */}
      </Container>
    </div>
  );
}

export default DoctorPatientDetailScreen;
