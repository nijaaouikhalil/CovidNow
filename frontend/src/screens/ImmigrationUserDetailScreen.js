import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Accordion, ListGroup, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorGetPatient, DoctorUpdatePatient } from "../actions/doctorActions";
import { LinkContainer } from "react-router-bootstrap";

function ImmigrationUserDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
//   const DoctorListPatients = useSelector((state) => state.DoctorListPatients);
//   const { users, loading, error } = DoctorListPatients;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_IMMIGRATION_OFFICER") {
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
        <h3 className="my-3 text-center">User Name</h3>
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

                <h2 className="ms-3">User Details</h2>
                <div className="mb-3" style={{maxHeight: "200px", overflow: "scroll"}}>

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


                



              </Col>
            </Row>
          </div>
        {/* )} */}
      </Container>
    </div>
  );
}

export default ImmigrationUserDetailScreen;
