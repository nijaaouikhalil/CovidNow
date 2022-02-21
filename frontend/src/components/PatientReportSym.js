import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
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

  const [updating, setUpdating] = useState(false);
  const [sucessReportRequest, setSucessReportRequest] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
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
        },
        config
      );
      setMessage(data.message);
      setUpdating(false);
      setSucessReportRequest(true);
    } catch (error) {
      setUpdating(false);
      setMessage("An error has occured! Please try again later.");
      setSucessReportRequest(false);
    }
  };
  return (
    <div id="dd-main-container">
      <FormContainer>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="row justify-content-center mt-5">
            <h2> Fill daily report </h2>
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

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={submitHandler} className="ms-3 w-50">
                  SUBMIT REPORT
                </Button>
              </div>
            </Form>
          </div>
          {updating ? (
            <Loader />
          ) : message ? (
            <Message variant={sucessReportRequest ? "success" : "danger"}>
              {message}
            </Message>
          ) : (
            ""
          )}
        </div>
      </FormContainer>
    </div>
  );
}

export default PatientReportSym;
