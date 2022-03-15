import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Accordion,
  ListGroup,
  Badge,
  FloatingLabel,
} from "react-bootstrap";
import { BaseUrl } from "../utils/utils";
import axios from "axios";
import FormContainer from "./Form/FormContainer";
import Message from "./Message";
import Loader from "./Loader";
import { getUserDailyReports, getUserDetails } from "../actions/userActions";

function PatientReportSym() {
  const [hasCovid, setHasCovid] = useState(false);
  const [hasTravelled, setHasTravelled] = useState(false);
  const [hasAutoImmuneDisease, setHasAutoImmuneDisease] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [hadAllergicReaction, setHadAllergicReaction] = useState(false);
  const [Temperature, setTemperature] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [customAns, setCustomAns] = useState("");

  const [updating, setUpdating] = useState(false);
  const [sucessReportRequest, setSucessReportRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [reports, setReports] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
    getCustomMessage();
    getPerviousReports();

    return () => {
      setQuestion("");
    };
  }, [dispatch, user_info]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.put(
        BaseUrl + `/api/view/fillReport`,
        {
          hasCovid,
          hasTravelled,
          hasAutoImmuneDisease,
          isPregnant,
          hadAllergicReaction,
          Temperature,
          Weight,
          Height,
          customAns,
        },
        config
      );
      setMessage(data.message);
      setUpdating(false);
      setSucessReportRequest(true);
    } catch (error) {
      setUpdating(false);
      console.log(error.response.data);
      setMessage(error.response.data);
      setSucessReportRequest(false);
    }
  };

  const getCustomMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
        data: {
          userId: user_info.id,
        },
      };

      const { data } = await axios.get(
        BaseUrl + `/api/view/fillReport/getCustom`,
        config
      );
      console.log(data);
      setQuestion(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPerviousReports = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
        data: {
          userId: user_info.id,
        },
      };

      const { data } = await axios.get(
        BaseUrl + `/api/view/user/myreport`,
        config
      );
      console.log(data);
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="dd-main-container">
      <FormContainer>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <h2> Fill daily report </h2>
            {question ? (
              <Form>
                <Form.Group className="mb-3 py-3" controlId="hasCovid">
                  <Form.Check
                    type="switch"
                    id="HasCovid"
                    label="Have you tested positif for covid19 ?"
                    onChange={(e) => {
                      setHasCovid(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 py-3" controlId="setHasTravelled">
                  <Form.Check
                    type="switch"
                    id="travelled"
                    label="Have you travelled recently ?"
                    onChange={(e) => {
                      setHasTravelled(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 py-3"
                  controlId="setHasAutoImmuneDisease"
                >
                  <Form.Check
                    type="switch"
                    id="immune"
                    label="Do you have auto immune disease?"
                    onChange={(e) => {
                      setHasAutoImmuneDisease(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 py-3" controlId="setIsPregnant">
                  <Form.Check
                    type="switch"
                    id="pregnant"
                    label="are you pregnant?"
                    onChange={(e) => {
                      setIsPregnant(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 py-3"
                  controlId="setHadAllergicReaction"
                >
                  <Form.Check
                    type="switch"
                    id="AllergicReaction"
                    label="Do you have allergic reaction?"
                    onChange={(e) => {
                      setHadAllergicReaction(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 py-3" controlId="temprature">
                  <FloatingLabel
                    controlId="Temp"
                    label="enter your temprature"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your temprature.."
                      onChange={(e) => {
                        setTemperature(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 py-3" controlId="Weight">
                  <FloatingLabel
                    controlId="weight"
                    label="enter your weight .."
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="enter your weight.."
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 py-3" controlId="height">
                  <FloatingLabel
                    controlId="Height"
                    label="enter your height .."
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="enter your height .."
                      onChange={(e) => {
                        setHeight(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                {question && (
                  <Form.Group className="mb-3 py-3" controlId="CustomAns">
                    <FloatingLabel
                      controlId="CustomQuestion"
                      label={question}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder={question}
                        onChange={(e) => {
                          setCustomAns(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={submitHandler} className="ms-3 w-50">
                    SUBMIT REPORT
                  </Button>
                </div>
              </Form>
            ) : (
              <Message variant={"warning"}>
                {"Your doctor didn't request a report today."}
              </Message>
            )}
          </Col>
          {updating ? (
            <Loader />
          ) : message ? (
            <Message variant={sucessReportRequest ? "success" : "danger"}>
              {message}
            </Message>
          ) : (
            ""
          )}
          <Col>
            <h2 className="ms-3">Submitted Daily reports </h2>

            <Accordion flush>
              {reports && reports.length > 0 ? (
                reports.map(
                  (report, index) =>
                    report.questions &&
                    report.questions.customAns && (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          Report on &nbsp;
                          <div className="fw-bold text-end">
                            {new Date(report.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          &nbsp;
                          <div className={"fw-bold text-end col"}>
                            Priority {report.priorityLevel}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Link
                              className="ms-3 w-50 btn btn-dark"
                              to={"/patient/updatereport/" + report._id}
                            >
                              Update REPORT
                            </Link>
                          </div>
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
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default PatientReportSym;
