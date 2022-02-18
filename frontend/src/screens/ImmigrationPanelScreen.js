import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { DoctorlistUsers } from "../actions/doctorActions";
import { LinkContainer } from "react-router-bootstrap";

import { ImmiPatientsList } from "../components/ImmiPatientsList";
import { ListAllUsers } from "../actions/adminActions";
import { ImmiStatistics } from "../components/ImmiStatistics";

function ImmigrationPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Statistics");
  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const {
    all_users,
    loading: loadingAllUsers,
    error: errorAllUsers,
  } = AdminListAllUsers;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_IMMIGRATION_OFFICER") {
      navigate("/login");
    }
    dispatch(ListAllUsers());
  }, [dispatch, user_info]);

  return (
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
    //       <div>
    //       </div>
    //     {/* )} */}
    //   </Container>
    // </div>

    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h5>Immigration Officer</h5>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => setSubPage("Statistics")}
                >
                  <i className="fas fa-chart-line me-3"></i>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setSubPage("My Patients")}
                >
                  <i class="fas fa-hospital-user me-3"></i>
                  All Patients
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
                    <i className="fas fa-chart-line me-2"></i> Statistics
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-hospital-user me-2"></i> All Patients
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs me-2"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* { (subPage=='Statistics') && <DoctorStatistics setSubPage={setSubPage}/>} */}
        {subPage == "Statistics" && (
          <ImmiStatistics patients={all_users} setSubPage={setSubPage} />
        )}
        {subPage == "My Patients" && <ImmiPatientsList all_users={all_users} />}
      </div>
    </div>
  );
}

export default ImmigrationPanelScreen;
