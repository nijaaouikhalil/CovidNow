import { CanadaCovidCasesByDateRangeLineGraph } from "../CanadaCovidCasesByDateRangeLineGraph";
import { CasesByProvincePieChart } from "../CasesByProvincePieChart";
import { BaseUrl } from "../../utils/utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PatientStatistics = ({ setSubPage }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const [reports, setReports] = useState([]);
  const [contactedReports, setContactedReports] = useState([]);
  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
    getPreviousReports();
    getPreviousContactReports();
  }, [user_info]);

  const getPreviousReports = async () => {
    if (user_info) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-access-token": `${user_info.accessToken}`,
          },
          data: {
            userId: user_info.id,
          },
        };

        const { data } = await axios.get(
          BaseUrl + `/api/view/user/myreport`,
          config
        );
        console.log(data);
        setReports(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPreviousContactReports = async () => {
    if (user_info) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-access-token": `${user_info.accessToken}`,
          },
        };

        const { data } = await axios.get(
          BaseUrl + `/api/contactedPeopleList`,
          config
        );

        setContactedReports(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3>{reports ? reports.length : 0}</h3>
            <p>Total submitted daily reports </p>
          </div>
          {/* <div
            onClick={() => setSubPage("")}
            className="dd-card dd-card-link pastel-green"
          >
            <h3 data-testid={"patient-remaining-days"}>7</h3>
            <p>Remaining Days In Quarantine</p>
          </div> */}
          <div
            onClick={() => setSubPage("Contact Tracing")}
            className="dd-card dd-card-link pastel-orange"
          >
            <h3 data-testid={"patient-users-traced"}>
              {contactedReports.length}{" "}
            </h3>
            <p>Users Traced</p>
          </div>
        </div>

        <div
          id="dd-data-visuals"
          className="d-flex justify-content-around align-items-center"
        >
          <div id="dd-pie" className="pastel-blue dd-card-link">
            <CasesByProvincePieChart />
          </div>
          <div id="dd-chart" className="pastel-orange dd-card-link">
            <h4>Daily Covid Cases Canada</h4>
            <CanadaCovidCasesByDateRangeLineGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PatientStatistics };
