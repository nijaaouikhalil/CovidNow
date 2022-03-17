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
import FormContainer from "../components/Form/FormContainer";
import { useParams } from "react-router-dom";
import {Loader} from "../components/Loader";
import {Message} from "../components/Message";

function PatientUpdateReportScreen() {
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
  const [report, setReport] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  let { report_id } = useParams();

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
    getPerviousReport(report_id);

    return () => {
      setQuestion("");
    };
  }, [dispatch, user_info, report_id]);

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
        BaseUrl + `/api/view/user/myreport/${report_id}`,
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
      console.log(data);
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

  const getPerviousReport = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.get(
        BaseUrl + `/api/view/user/myreport/${id}`,
        config
      );
      setHadAllergicReaction(data.questions.hadAllergicReaction);
      setHasAutoImmuneDisease(data.questions.hasAutoImmuneDisease);
      setHasCovid(data.questions.hasCovid);
      setHasTravelled(data.questions.hasTravelled);
      setIsPregnant(data.questions.isPregnant);
      setHeight(data.questions.Height);
      setTemperature(data.questions.Temperature);
      setWeight(data.questions.Weight);
      setCustomAns(data.questions.customAns);
      setQuestion(data.questions.customQ);
      console.log(data);
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="dd-main-container">
      <Link to="/patient/dashboard" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <h2> Update your report for </h2>
            <h3>
              &nbsp;
              <div className="fw-bold text-end">
                {new Date(report.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </h3>
            <Form>
              <Form.Group className="mb-3 py-3" controlId="hasCovid">
                <Form.Check
                  checked={hasCovid}
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
                  checked={hasTravelled}
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
                  checked={hasAutoImmuneDisease}
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
                  checked={isPregnant}
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
                  checked={hadAllergicReaction}
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
                    value={Temperature}
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
                    value={Weight}
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
                    value={Height}
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
                      value={customAns}
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
        </Row>
      </FormContainer>
    </div>
  );
}

export default PatientUpdateReportScreen;
