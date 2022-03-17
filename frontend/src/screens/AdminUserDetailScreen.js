import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  Form,
  FloatingLabel,
} from "react-bootstrap";

import {Loader} from "../components/Loader";
import {Message} from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserDetails } from "../actions/userActions";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../utils/utils";

function AdminUserDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const {
    all_users,
    loading: loadingAllUsers,
    error: errorAllUsers,
    doctors,
  } = AdminListAllUsers;

  const [doctorId, setDoctorId] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  let { pid } = useParams();
  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_ADMIN") {
      navigate("/login");
    }
    dispatch(getUserDetails(pid));
  }, [dispatch, user_info, pid]);

  const updateDoctorHandler = async (doctorId) => {
    setUpdating(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.post(
        BaseUrl + `/api/view/assign`,
        { doctorId, userId: pid },
        config
      );
      setMessage(data.message);
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
    }
  };
  return (
    <div>
      <Link to="/admin/dashboard" className="btn btn-light my-2 ms-3">
        Go Back
      </Link>
      <Container>
        <div>
          <Row className="justify-content-center">
            <Col md={10}>
              <h3 className="my-3 text-center">User Information</h3>

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div>
                  <h2 className="ms-3">User Details</h2>
                  <div className="mb-3">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0 fw-bold">Full Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {user ? user.name : "John"}{" "}
                              {user ? user.lname : "Doe"}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0 fw-bold">Email</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              {user ? user.email : "johndoe@error.com"}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0 fw-bold">Role</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0 text-uppercase">
                              {user ? user.role : "Patient"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="ms-3">Assign to a doctor</h2>
              <Row className="mb-3">
                <Col xs={10}>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Select doctor"
                  >
                    <Form.Select
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      aria-label="select a doctor"
                    >
                      <option>select a doctor</option>
                      {doctors &&
                        doctors.length > 0 &&
                        doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            {doctor.name}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col>
                  <Button
                    disabled={doctorId === ""}
                    onClick={() => updateDoctorHandler(doctorId)}
                  >
                    Update doctor
                  </Button>
                </Col>
              </Row>
              {updating ? (
                <Loader />
              ) : message ? (
                <Message
                  variant={
                    message === "Assigned user to doctor" ? "success" : "danger"
                  }
                >
                  {message}
                </Message>
              ) : (
                ""
              )}

              <h2 className="ms-3">Requirement Updates</h2>
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Patient Update #3</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Requirement1Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement2Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement3Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>...</ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Patient Update #2</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Requirement1Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement2Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement3Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>...</ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Patient Update #1</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Requirement1Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement2Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement3Name : patientInfo
                      </ListGroup.Item>
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
                        <Form.Check
                          type="switch"
                          id="covid-conf-switch"
                          label="Covid Confirmed"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Check
                          type="switch"
                          id="quarntine-switch"
                          label="In Quarantine"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Check
                          type="switch"
                          id="urgent-switch"
                          label="Urgent"
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Requirements</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Requirement1Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement2Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Requirement3Name : patientInfo
                      </ListGroup.Item>
                      <ListGroup.Item>...</ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button className="ms-3 w-50">UPDATE USER</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AdminUserDetailScreen;
