import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  Form,
  Badge,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorGetPatient, DoctorUpdatePatient } from "../actions/doctorActions";
import { getUserDailyReports, getUserDetails } from "../actions/userActions";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../utils/utils";
import axios from "axios";
import { MarkReportViewed } from "../actions/doctorActions";

function DoctorPatientDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error, reports } = userDetails;

  const doctorViewReport = useSelector((state) => state.doctorViewReport);
  const { success } = doctorViewReport;

  const [updating, setUpdating] = useState(false);
  const [sucessReportRequest, setSucessReportRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("3");
  const [customQ, setcustomQ] = useState("");

  let { pid } = useParams();
  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_DOCTOR") {
      navigate("/login");
    }
    dispatch(getUserDetails(pid));
    dispatch(getUserDailyReports(pid));
  }, [dispatch, navigate, success, user_info, pid]);

  const requestDailtReportHandler = async () => {
    if (priorityLevel === "" || customQ === "") {
      setMessage(
        "The question is missing. Type the question and re-send the report"
      );
    } else {
      setUpdating(true);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-access-token": `${user_info.accessToken}`,
          },
        };

        const { data } = await axios.put(
          BaseUrl + `/api/view/requestReport`,
          { userId: pid, date: new Date(), customQ, priorityLevel },
          config
        );
        setMessage(data.message);
        setUpdating(false);
        setSucessReportRequest(true);
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setUpdating(false);
        setSucessReportRequest(false);
      }
    }
  };
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const MarkViewd = (id) => {
    console.log(id);
    dispatch(
      MarkReportViewed({
        id,
      })
    );
  };
  return (
    <div>
      <Link to="/doctor/dashboard" className="btn btn-light my-2 ms-3">
        Go Back
      </Link>
      <Container>
        <h3 className="my-3 text-center">Patient Name</h3>

        <div>
          <Row className="justify-content-center">
            <Col md={10}>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div>
                  <h2 className="ms-3">Patient Details</h2>
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
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0 fw-bold">Status</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0 text-uppercase">
                              {user ? user.covidStatus : "Negative"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="my-3">
                <Row className="mb-3">
                  <Col md={10}>
                    <h2 className="ms-3">Request daily symptome report</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="mb-0 fw-bold">Priority</p>
                  </Col>
                  <Col className="mb-3">
                    <Form.Check
                      name="priority"
                      value="1"
                      type={"radio"}
                      label={`Priority level 1`}
                      id={`Priority level 1`}
                      className="text-danger fw-bold"
                      onClick={(e) => {
                        setPriorityLevel(e.target.value);
                      }}
                    />
                    <Form.Check
                      name="priority"
                      value="2"
                      className="text-info fw-bold"
                      type={"radio"}
                      label={`Priority level 2`}
                      onClick={(e) => {
                        setPriorityLevel(e.target.value);
                      }}
                      id={`Priority level 2`}
                    />
                    <Form.Check
                      name="priority"
                      value="3"
                      className="fw-bold"
                      type={"radio"}
                      label={`Priority level 3`}
                      onClick={(e) => {
                        setPriorityLevel(e.target.value);
                      }}
                      defaultChecked={priorityLevel}
                      id={`Priority level 3`}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={3}>
                    <p className="mb-0 fw-bold">Custom question</p>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Question .."
                      onChange={(e) => {
                        setcustomQ(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className="ms-3 w-50"
                    onClick={() => requestDailtReportHandler()}
                  >
                    Request report
                  </Button>
                </div>
              </div>
              <Row className="mb-3">
                <Col md={10}>
                  <h4 className="ms-3">
                    Report requested for: &nbsp; &nbsp;
                    <div className="text-center badge bg-warning text-wrap fw-bold text-white ">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </h4>
                </Col>
                <Col>
                  <div className="text-center badge bg-success text-wrap fw-bold text-white fs-5">
                    True
                  </div>
                </Col>
              </Row>
              {updating ? (
                <Loader />
              ) : message ? (
                <Message variant={sucessReportRequest ? "success" : "danger"}>
                  {message}
                </Message>
              ) : (
                ""
              )}

              <h2 className="ms-3">Daily reports </h2>

              <Accordion flush>
                {reports && reports.length > 0 ? (
                  reports.map(
                    (report, index) =>
                      report.questions && (
                        <Accordion.Item key={index} eventKey={index}>
                          <Accordion.Header>
                            Patient Update &nbsp;
                            <div className="fw-bold text-end">
                              {new Date(report.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            &nbsp;
                            <div className={"fw-bold text-end col"}>
                              Priority {report.priorityLevel}
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Row>
                              <Col md={8}>
                                <Message
                                  variant={
                                    report.viewed ? "success" : "warning"
                                  }
                                  className="text-center"
                                >
                                  report
                                  {report.viewed ? " viewed" : " not viewed"}
                                </Message>
                              </Col>
                              <Col>
                                {report.viewed ? (
                                  ""
                                ) : (
                                  <Button onClick={() => MarkViewd(report._id)}>
                                    Mark as viewed
                                  </Button>
                                )}
                              </Col>
                            </Row>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                Have tested positif for covid19 ? :{" "}
                                {report.questions.hasCovid ? (
                                  <Badge bg="success">True</Badge>
                                ) : (
                                  <Badge bg="danger">False</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Have travelled recently ? :{" "}
                                {report.questions.hasTravelled ? (
                                  <Badge bg="success">True</Badge>
                                ) : (
                                  <Badge bg="danger">False</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Has auto immune disease? :{" "}
                                {report.questions.hasAutoImmuneDisease ? (
                                  <Badge bg="success">True</Badge>
                                ) : (
                                  <Badge bg="danger">False</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Is pregnant? :{" "}
                                {report.questions.isPregnant ? (
                                  <Badge bg="success">True</Badge>
                                ) : (
                                  <Badge bg="danger">False</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Has allergic reaction? :
                                {report.questions.hadAllergicReaction ? (
                                  <Badge bg="success">True</Badge>
                                ) : (
                                  <Badge bg="danger">False</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Your Height? :{" "}
                                {report.questions.Height ? (
                                  <Badge bg="info">
                                    {report.questions.Height}
                                  </Badge>
                                ) : (
                                  <Badge bg="info">Not reported</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Your Weight? :{" "}
                                {report.questions.Weight ? (
                                  <Badge bg="info">
                                    {report.questions.Weight}
                                  </Badge>
                                ) : (
                                  <Badge bg="info">Not reported</Badge>
                                )}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Your Temperature? :{" "}
                                {report.questions.Temperature ? (
                                  <Badge bg="info">
                                    {report.questions.Temperature}
                                  </Badge>
                                ) : (
                                  <Badge bg="info">Not reported</Badge>
                                )}
                              </ListGroup.Item>
                              {report.questions.customQ && (
                                <ListGroup.Item>
                                  {report.questions.customQ} :
                                  {report.questions.customAns ? (
                                    <Badge bg="info">
                                      {report.questions.customAns}
                                    </Badge>
                                  ) : (
                                    <Badge bg="info">Not reported</Badge>
                                  )}
                                </ListGroup.Item>
                              )}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                  )
                ) : (
                  <Message variant={"warning"}>
                    {"No reports have been submitted recently"}
                  </Message>
                )}
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
