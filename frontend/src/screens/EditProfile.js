import React from "react";
import DoctorInfo from "../components/Form/DoctorInfo";
import GouvernInfo from "../components/Form/GouvernInfo";
import HealthOfficialInfo from "../components/Form/HealthOfficialInfo";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
function EditProfile() {
  return (
    <div>
      <Row className="mb-3">
        <Col className="align-self-center">
          <h1 className="text-center"> Update </h1>
        </Col>
      </Row>
      {/* <DoctorInfo />; */}
      {/* <GouvernInfo></GouvernInfo> */}
      <HealthOfficialInfo></HealthOfficialInfo>
    </div>
  );
}

export default EditProfile;
