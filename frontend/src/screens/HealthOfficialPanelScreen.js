import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HealthOfficialPatientsList } from "../components/HealthOfficialPatientsList";
import { ListAllUsers } from "../actions/adminActions";
import { HealthOfficialStatistics } from "../components/HealthOfficialStatistics";
import { HealthOfficialFlagCovid } from "../components/HealthOfficialFlagCovid";

function HealthOfficialPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Home");
  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const {
    all_users
  } = AdminListAllUsers;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_HEALTH_OFFICIAL") {
      navigate("/login");
    }
    dispatch(ListAllUsers());
  }, [dispatch, user_info]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h1>
                  <i className="fas fa-user-md"></i>
                </h1>
                <h4> Welcome {user_info.name}</h4>
                <small>{user_info.email}</small>
                <br />
                <small>Health Official Account</small>
              </li>
              <li className="nav-item">
                <a
                  className={subPage == "Home" ? "nav-link active" : "nav-link"}
                  aria-current="page"
                  onClick={() => setSubPage("Home")}
                >
                  <i className="fas fa-chart-line me-3"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    subPage == "All Patients" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("All Patients")}
                >
                  <i className="fas fa-hospital-user me-3"></i>
                  All Patients
                </a>
              </li>
              <li>
                <a
                  className={
                    subPage == "Flag COVID cases"
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  onClick={() => setSubPage("Flag COVID cases")}
                >
                  <i className="fas fa-hospital-user me-2"></i> Flag COVID cases
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    subPage == "Settings" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("Settings")}
                >
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
                  <a
                    className={
                      subPage == "Home"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Home")}
                  >
                    <i className="fas fa-chart-line me-2"></i> Home
                  </a>
                </li>
                <li>
                  <a
                    className={
                      subPage == "All Patients"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("All Patients")}
                  >
                    <i className="fas fa-hospital-user me-2"></i> All Patients
                  </a>
                </li>
                <li>
                  <a
                    className={
                      subPage == "Flag COVID cases"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Flag COVID cases")}
                  >
                    <i className="fas fa-hospital-user me-2"></i> Flag COVID
                    cases
                  </a>
                </li>
                <li>
                  <a
                    className={
                      subPage == "Settings"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Settings")}
                  >
                    <i className="fas fa-cogs me-2"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {subPage === "Home" && (
          <HealthOfficialStatistics
            patients={all_users}
            setSubPage={setSubPage}
          />
        )}
        {subPage === "All Patients" && (
          <HealthOfficialPatientsList all_users={all_users} />
        )}
        {subPage === "Flag COVID cases" && (
          <HealthOfficialFlagCovid all_users={all_users} />
        )}
      </div>
    </div>
  );
}

export default HealthOfficialPanelScreen;
