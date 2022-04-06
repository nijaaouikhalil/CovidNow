import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImmiPatientsList } from "../components/ImmiPatientsList";
import { ListAllUsers } from "../actions/adminActions";
import { ImmiStatistics } from "../components/ImmiStatistics";

function ImmigrationPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState("Home");
  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const { all_users } = AdminListAllUsers;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_IMMIGRATION_OFFICER") {
      navigate("/login");
    }
    dispatch(ListAllUsers()); // eslint-disable-next-line
  }, [dispatch, user_info]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h5>Immigration Officer</h5>
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
                    subPage === "All Patients" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("All Patients")}
                >
                  <i class="fas fa-hospital-user me-3"></i>
                  All Patients
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
                      subPage === "All Patients"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("All Patients")}
                  >
                    <i className="fas fa-hospital-user me-2"></i> All Patients
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

        {subPage === "Home" && (
          <ImmiStatistics patients={all_users} setSubPage={setSubPage} />
        )}
        {subPage === "All Patients" && (
          <ImmiPatientsList all_users={all_users} />
        )}
      </div>
    </div>
  );
}

export default ImmigrationPanelScreen;
