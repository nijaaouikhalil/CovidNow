import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorlistUsers } from "../actions/doctorActions";
import { LinkContainer } from "react-router-bootstrap";

function DoctorPanelScreen() {
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
    // dispatch(DoctorlistUsers());
  }, [dispatch, user_info]);

  
  return (
    <div className="second_menu_links">
      <Link to="/" className="btn btn-light my-2">
        Go Back
      </Link>
      <Container>
        <h1 className="text-center">My Patients</h1>
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
                {" "}
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm text-center"
                >
                  <thead className="table-dark">
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>QUARANTINED</th>
                      <th>REMAINING</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                        {/* NEED TO MAP EACH USER TO OWN ROW ONCE RETRIEVED PATIENT LIST FROM BACKEND */}
                        <td>Joe Bloggs</td>
                        <td>joe@bloggs.com</td>
                        <td>Yes</td>
                        <td>4 days</td>
                        <td>
                            <LinkContainer
                                to={`/doctor/patientdetails/${132}`} /* update to doctors id, will redirect to detailed patient view */
                                >
                                <Button variant="dark" className="btn-sm">
                                    More
                                </Button>
                            </LinkContainer>
                        </td>
                    </tr>   
                    
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        {/* )} */}
      </Container>
    </div>
  );
}

export default DoctorPanelScreen;
