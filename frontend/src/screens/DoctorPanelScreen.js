import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorlistUsers } from "../actions/doctorActions";
import { LinkContainer } from "react-router-bootstrap";

import { DoctorStatistics } from "../components/DoctorStatistics";
import { DoctorPatientsList } from "../components/DoctorPatientsList";
import { DoctorlistPatients } from "../actions/doctorActions";

function DoctorPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Statistics");
  const doctorListPatients = useSelector((state) => state.doctorListPatients);
  const { patients, loading, error } = doctorListPatients;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_DOCTOR") {
      navigate("/login");
    }
    dispatch(DoctorlistPatients());
  }, [dispatch, user_info]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h5>Doctor</h5>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => setSubPage("Statistics")}
                >
                  <i class="fas fa-chart-line me-3"></i>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setSubPage("My Patients")}
                >
                  <i class="fas fa-hospital-user me-3"></i>
                  My Patients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => setSubPage("Messages")}>
                  <i class="fas fa-inbox me-3"></i>
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setSubPage("Appointments")}
                >
                  <i class="fas fa-calendar me-3"></i>
                  Appointments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => setSubPage("Settings")}>
                  <i class="fas fa-cogs me-3"></i>
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap align-items-center pt-3 pb-2">
            <h1 className="h2 ms-3">Dashboard - {subPage}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <a
                className="nav-link"
                href="#"
                id="dd-dropdown-menu-button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-h"></i>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dd-dropdown-menu-button"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <i class="fas fa-chart-line me-2"></i> Statistics
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i class="fas fa-hospital-user me-2"></i> Patients
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i class="fas fa-inbox me-2"></i> Messages
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i class="fas fa-calendar me-2"></i> Appointments
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i class="fas fa-cogs me-2"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {subPage == "Statistics" && (
          <DoctorStatistics patients={patients} setSubPage={setSubPage} />
        )}
        {subPage == "My Patients" && <DoctorPatientsList patients={patients} />}
      </div>
    </div>

    // <div className="second_menu_links">
    //   <Container>
    //     {/* {updateLoading ? (
    //       <Loader />
    //     ) : updatError ? (
    //       <Message variant="danger">{updatError}</Message>
    //     ) : message ? (
    //       <Message variant="success">{message}</Message>
    //     ) : (
    //       ""
    //     )} */}

    //     {/* {loading ? (
    //       <Loader />
    //     ) : error ? (
    //       <Message variant="danger">{error}</Message>
    //     ) : ( */}
    //
    //     {/* )} */}
    //   </Container>
    // </div>
  );
}

export default DoctorPanelScreen;
