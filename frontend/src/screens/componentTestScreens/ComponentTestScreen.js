import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function ComponentTestScreen() {
    return (
        <Col>
            <Nav>
                < LinkContainer className="m-3" to="/ctests/doc/address1" >
                    <i> Component Test: Address 1 for DOCTOR </i>
                </LinkContainer >

                <LinkContainer className="m-3" to="/ctests/doc/address2">
                    <i> Component Test: Address 2 for DOCTOR </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/doc/city">
                    <i> Component Test: City for DOCTOR </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/doc/licencenum">
                    <i> Component Test: Licence Number for DOCTOR </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/doc/postalcode">
                    <i> Component Test: Postal Code for DOCTOR </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/doc/province">
                    <i> Component Test: Province for DOCTOR </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/gov/id">
                    <i> Component Test: Government ID for GOVERNMENT OFFICIAL </i>
                </LinkContainer>

                <LinkContainer className="m-3" to="/ctests/health/id">
                    <i> Component Test: Health ID for HEALTH OFFICIAL </i>
                </LinkContainer>

                /**NEW C-TESTS */

                < LinkContainer className="m-3" to="/ctests/adminalluserlist" >
                    <i> Component Test: AdminAllUserList </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/adminconfirmusers" >
                    <i> Component Test: AdminConfirmUsers </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/adminpiechart" >
                    <i> Component Test: AdminPieChart </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/adminstatistics" >
                    <i> Component Test: AdminStatistics </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/canadacovidcases" >
                    <i> Component Test: Canada Covid Cases by Date Range </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/createnewappointment" >
                    <i> Component Test: CreateNewAppointment </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/doctorappointment" >
                    <i> Component Test: DoctorAppointment </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/doctormessages" >
                    <i> Component Test: DoctorMessages </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/doctorpatientslist" >
                    <i> Component Test: DoctorPatientsList </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/doctorpiechart" >
                    <i> Component Test: DoctorPieChart </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/doctorstatistics" >
                    <i> Component Test: DoctorStatistics </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/footer" >
                    <i> Component Test: Footer </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/header" >
                    <i> Component Test: Header </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/healthofficialflagcovid" >
                    <i> Component Test: HealthOfficialFlagCovid </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/healthofficialpatientslist" >
                    <i> Component Test: HealthOfficialPatientsList </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/healthofficialstatistics" >
                    <i> Component Test: HealthOfficialStatistics </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/immipatientslist" >
                    <i> Component Test: ImmiPatientsList </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/immistatistics" >
                    <i> Component Test: ImmiStatistics </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/listdoctorappointments" >
                    <i> Component Test: ListDoctorAppointments </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/loader" >
                    <i> Component Test: Loader </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/message" >
                    <i> Component Test: Message </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/patientcontacttracing" >
                    <i> Component Test: PatientContactTracing </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/patientmessages" >
                    <i> Component Test: PatientMessages </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/patientreportsym" >
                    <i> Component Test: PatientReportSym </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/patientstatistics" >
                    <i> Component Test: PatientStatistics </i>
                </LinkContainer >

                < LinkContainer className="m-3" to="/ctests/resource" >
                    <i> Component Test: Resource </i>
                </LinkContainer >

                /** END OF NEW C-TESTS */
            </Nav>
        </Col>

    );
}

export default ComponentTestScreen;
