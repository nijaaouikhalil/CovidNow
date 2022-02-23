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
            </Nav>
        </Col>

    );
}

export default ComponentTestScreen;
