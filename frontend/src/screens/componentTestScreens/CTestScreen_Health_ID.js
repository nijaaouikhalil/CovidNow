import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
//import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
//import { login } from "../actions/userActions";
//import Loader from "../components/Loader";
//import Message from "../components/Message";

import HealthOfficialInfo_Test from "../../componentsTestUtils/healthOfficialFormsIndividual/HealthOfficialInfoForm_OfficialID_Test";

function CTestScreen_Health_ID() {
    return HealthOfficialInfo_Test();
}

export default CTestScreen_Health_ID;