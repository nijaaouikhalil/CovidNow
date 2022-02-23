import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ListAllUsers,
  AdminlistUsers,
  AdminUpdateUser,
} from "../actions/adminActions";
import { LinkContainer } from "react-router-bootstrap";
import { AdminConfirmUsers } from "../components/AdminConfirmUsers";
import { AdminAllUsersList } from "../components/AdminAllUsersList";
import { AdminStatistics } from "../components/AdminStatistics";

function AdminPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const AdminListUsers = useSelector((state) => state.AdminListUsers);
  const { users, loading, error } = AdminListUsers;

  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const {
    all_users,
    loading: loadingAllUsers,
    error: errorAllUsers,
    doctors,
  } = AdminListAllUsers;

  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { message, loading: updateLoading, error: updatError } = adminUpdate;
  const [subPage, setSubPage] = useState("Statistics");

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_ADMIN") {
      navigate("/login");
    }
    dispatch(ListAllUsers());
    dispatch(AdminlistUsers());
  }, [user_info, dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column mt-5">
              <li className="text-center mb-2">
                <h1>
                  <i className="fas fa-lock"></i>
                </h1>
                <h4> Welcome {user_info.name}</h4>
                <small>{user_info.email}</small>
                <br />
                <small>Admin Account</small>
              </li>
              <li className="nav-item">
                <a
                  className={
                    subPage == "Statistics" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  onClick={() => setSubPage("Statistics")}
                >
                  <i className="fas fa-chart-line me-3"></i>
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    subPage == "All Users" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("All Users")}
                >
                  <i className="fas fa-hospital-user me-3"></i>
                  All Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    subPage == "Confirm Users" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setSubPage("Confirm Users")}
                >
                  <i className="fas fa-check-square me-3"></i>
                  Confirm Users
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
                      subPage == "Statistics"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Statistics")}
                  >
                    <i className="fas fa-chart-line me-2"></i> Statistics
                  </a>
                </li>
                <li>
                  <a
                    className={
                      subPage == "All Users"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("All Users")}
                  >
                    <i className="fas fa-hospital-user me-2"></i> All Users
                  </a>
                </li>
                <li>
                  <a
                    className={
                      subPage == "Confirm Users"
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onClick={() => setSubPage("Confirm Users")}
                  >
                    <i className="fas fa-check-square me-2"></i> Confirm Users
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

        {subPage == "Statistics" && (
          <AdminStatistics
            all_users={all_users}
            users_to_confirm={users}
            doctors={doctors}
            setSubPage={setSubPage}
          />
        )}
        {subPage == "Confirm Users" && <AdminConfirmUsers />}
        {subPage == "All Users" && <AdminAllUsersList all_users={all_users} />}
      </div>
    </div>
  );
}

export default AdminPanelScreen;
