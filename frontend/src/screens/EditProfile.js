import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorInfo from "../components/Form/DoctorInfo";
import GouvernInfo from "../components/Form/GouvernInfo";
import HealthOfficialInfo from "../components/Form/HealthOfficialInfo";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";

function EditProfile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  return (
    <div>
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
