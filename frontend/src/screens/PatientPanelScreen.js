import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PatientStatistics } from '../components/PatientStatistics'


function PatientPanelScreen() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [subPage, setSubPage] = useState('Statistics')

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    };
  }, [user_info]);


  return (

    <div className="container-fluid">
        <div className="row">
              
            <nav className="col-md-3 col-lg-2 d-md-block bg-light dd-sidebar collapse">
              <div className="position-sticky pt-3">
                <ul className="nav flex-column mt-5">
                <li className="text-center mb-2"><h5>Patient</h5></li>
                  <li className="nav-item">
                      <a className={subPage=='Statistics' ? "nav-link active" : "nav-link"} aria-current="page" onClick={() => (setSubPage("Statistics"))}>
                      <i className="fas fa-chart-line me-3"></i>
                      Statistics
                      </a>
                  </li>
                  <li className="nav-item">
                      <a className={subPage=='Menu item' ? "nav-link active" : "nav-link"} onClick={() => (setSubPage("Menu item"))}>
                      <i className="fas fa-hospital-user me-3"></i>
                      Menu item
                      </a>
                  </li>
                  <li className="nav-item">
                      <a className={subPage=='Menu item' ? "nav-link active" : "nav-link"} onClick={() => (setSubPage("Menu item"))}>
                      <i className="fas fa-check-square me-3"></i>
                      Menu item
                      </a>
                  </li>
                  <li className="nav-item">
                      <a className={subPage=='Settings' ? "nav-link active" : "nav-link"}  onClick={() => (setSubPage("Settings"))}>
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
                    <a className="nav-link" href="#" id="dd-dropdown-menu-button" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dd-dropdown-menu-button">
                      <li><a className="dropdown-item"  onClick={() => (setSubPage("Statistics"))}><i className="fas fa-chart-line me-2"></i> Statistics</a></li>
                      <li><a className="dropdown-item"  onClick={() => (setSubPage("Menu item"))}><i className="fas fa-hospital-user me-2"></i> Menu item</a></li>
                      <li><a className="dropdown-item"  onClick={() => (setSubPage("Menu item"))}><i className="fas fa-check-square me-2"></i> Menu item</a></li>
                      <li><a className="dropdown-item"  onClick={() => (setSubPage("Settings"))}><i className="fas fa-cogs me-2"></i> Settings</a></li>
                    </ul>
                  </div>
                </div>
            </div>

            { (subPage=='Statistics') && <PatientStatistics setSubPage={setSubPage}/> }


        </div>
    </div>
  );
}

export default PatientPanelScreen;
