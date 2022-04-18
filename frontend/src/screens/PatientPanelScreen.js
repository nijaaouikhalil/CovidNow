import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PatientReportSym } from "../components/Patient/PatientReportSym";
import { PatientStatistics } from "../components/Patient/PatientStatistics";
import { PatientContactTracing } from "../components/Patient/PatientContactTracing";
import { PatientMessages } from "../components/Patient/PatientMessages";

function PatientPanelScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Home");

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    } // eslint-disable-next-line
  }, [user_info]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h1>
                  <i className="fas fa-hospital-user"></i>
                </h1>
                <h4> Patient {user_info.name}</h4>
                <small>{user_info.email}</small>
                <br />
                <small>Patient Account</small>
              </li>
              <li className="nav-item">
                <div
                  className={
                    subPage === "Home" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  onClick={() => setSubPage("Home")}
                >
                  <i className="fas fa-chart-line me-3"></i>
                  Home
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    subPage === "Daily symptom report"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => setSubPage("Daily symptom report")}
                >
                  <i className="fas fa-hospital-user me-3"></i>
                  Daily symptom report
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    subPage === "Messages" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("Messages")}
                >
                  <i className="fas fa-inbox me-3"></i>
                  Messages
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    subPage === "Contact Tracing"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => setSubPage("Contact Tracing")}
                >
                  <i className="fas fa-search-location me-3"></i>
                  Contact Tracing
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    subPage === "Settings" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("Settings")}
                >
                  <i className="fas fa-cogs me-3"></i>
                  Settings
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap align-items-center pt-3 pb-2">
            <h1 className="h2 ms-3">Dashboard - {subPage}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div
                className="nav-link"
                href="#"
                id="dd-dropdown-menu-button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dd-dropdown-menu-button"
              >
                <li>
                  <div
                    className={
                      subPage === "Home"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Home")}
                  >
                    <i className="fas fa-chart-line me-2"></i> Home
                  </div>
                </li>
                <li>
                  <div
                    className={
                      subPage === "Daily symptom report"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Daily symptom report")}
                  >
                    <i className="fas fa-hospital-user me-2"></i> Daily symptom
                    report
                  </div>
                </li>
                <li>
                  <div
                    className={
                      subPage === "Messages"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Messages")}
                  >
                    <i className="fas fa-inbox me-2"></i> Messages
                  </div>
                </li>
                <li>
                  <div
                    className={
                      subPage === "Contact Tracing"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Contact Tracing")}
                  >
                    <i className="fas fa-search-location me-2"></i> Contact
                    Tracing
                  </div>
                </li>
                <li>
                  <div
                    className={
                      subPage === "Settings"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Settings")}
                  >
                    <i className="fas fa-cogs me-2"></i> Settings
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {subPage === "Home" && <PatientStatistics setSubPage={setSubPage} />}
        {subPage === "Daily symptom report" && (
          <PatientReportSym setSubPage={setSubPage} />
        )}
        {subPage === "Contact Tracing" && <PatientContactTracing />}
        {subPage === "Messages" && <PatientMessages />}
      </div>
    </div>
  );
}

export default PatientPanelScreen;
