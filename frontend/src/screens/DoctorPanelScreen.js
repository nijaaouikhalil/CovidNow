import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DoctorStatistics } from "../components/DoctorStatistics";
import { DoctorPatientsList } from "../components/DoctorPatientsList";
import { DoctorlistPatients } from "../actions/doctorActions";
import { DoctorAppointment } from '../components/DoctorAppointment';
import { DoctorMessages } from '../components/DoctorMessages';

function DoctorPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Home");
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
              <li className="text-center mb-3">
                <h1><i className="fas fa-user-md"></i></h1>
                <h4> Welcome Dr. {user_info.name}</h4>
                <small>{user_info.email}</small><br />
                <small>Doctor Account</small>
              </li>
              <li className="nav-item">
                <a
                  className={subPage =='Home' ? "nav-link active" : "nav-link"}
                  aria-current="page"
                  onClick={() => setSubPage("Home")}
                >
                  <i className="fas fa-chart-line me-3"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={subPage =='My Patients' ? "nav-link active" : "nav-link"}
                  onClick={() => setSubPage("My Patients")}
                >
                  <i className="fas fa-hospital-user me-3"></i>
                  My Patients
                </a>
              </li>
              <li className="nav-item">
                <a className={subPage =='Messages' ? "nav-link active" : "nav-link"} onClick={() => setSubPage("Messages")}>
                  <i className="fas fa-inbox me-3"></i>
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={subPage =='Appointments' ? "nav-link active" : "nav-link"}
                  onClick={() => setSubPage("Appointments")}
                >
                  <i className="fas fa-calendar me-3"></i>
                  Appointments
                </a>
              </li>
              <li className="nav-item">
                <a className={subPage =='Settings' ? "nav-link active" : "nav-link"} onClick={() => setSubPage("Settings")}>
                  <i className="fas fa-cogs me-3"></i>
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
                  <a className={subPage =='Home' ? "dropdown-item active" : "dropdown-item"}
                  onClick={() => setSubPage("Home")}>
                    <i className="fas fa-chart-line me-2"></i> Home
                  </a>
                </li>
                <li>
                  <a className={subPage =='My Patients' ? "dropdown-item active" : "dropdown-item"}
                  onClick={() => setSubPage("My Patients")}>
                    <i className="fas fa-hospital-user me-2"></i> My Patients
                  </a>
                </li>
                <li>
                  <a className={subPage =='Messages' ? "dropdown-item active" : "dropdown-item"}
                  onClick={() => setSubPage("Messages")}>
                    <i className="fas fa-inbox me-2"></i> Messages
                  </a>
                </li>
                <li>
                  <a className={subPage =='Appointments' ? "dropdown-item active" : "dropdown-item"}
                  onClick={() => setSubPage("Appointments")} >
                    <i className="fas fa-calendar me-2"></i> Appointments
                  </a>
                </li>
                <li>
                  <a className={subPage =='Settings' ? "dropdown-item active" : "dropdown-item"}
                  onClick={() => setSubPage("Settings")}>
                    <i className="fas fa-cogs me-2"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {subPage == "Home" && (
          <DoctorStatistics patients={patients} setSubPage={setSubPage} />
        )}
        {subPage == "My Patients" && <DoctorPatientsList patients={patients} />}
        {subPage == "Appointments" && <DoctorAppointment patients={patients} />}
        {subPage == "Messages" && <DoctorMessages patients={patients} />}
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
