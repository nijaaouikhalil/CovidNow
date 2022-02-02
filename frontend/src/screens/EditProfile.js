import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorInfo from "../components/Form/DoctorInfo";
import GouvernInfo from "../components/Form/GouvernInfo";
import HealthOfficialInfo from "../components/Form/HealthOfficialInfo";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Message from "../components/Message";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
  }, [navigate, user_info]);

  return (
    <div>
      {user_info && user_info.verified === "Pending" && (
        <Row className="mb-3 text-center">
          <Message variant="warning">
            {"Please make sure your information is up-to-date!"} <br />
            {
              "Our system will verify the information you provided and confirm your access as soon as possible!"
            }
            <br />
            {"Thank you for your patience"}
            <br />
          </Message>
        </Row>
      )}

      <Row className="mb-3">
        <Col className="align-self-center">
          <h1 className="text-center"> Update </h1>
        </Col>
      </Row>
      {user_info ? (
        user_info.roles === "ROLE_DOCTOR" ? (
          <DoctorInfo />
        ) : user_info.roles === "ROLE_HEALTH" ? (
          <GouvernInfo></GouvernInfo>
        ) : user_info.roles === "ROLE_OFFICER" ? (
          <HealthOfficialInfo></HealthOfficialInfo>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default EditProfile;
