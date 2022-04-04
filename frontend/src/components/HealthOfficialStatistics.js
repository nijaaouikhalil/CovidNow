import { CanadaCovidCasesByDateRangeLineGraph } from "./CanadaCovidCasesByDateRangeLineGraph";
import { CasesByProvincePieChart } from "./CasesByProvincePieChart";

const HealthOfficialStatistics = ({ setSubPage, patients }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3 data-testid="immi-stats-count-cases">57</h3>
            <p>Total Confirmed Cases</p>
          </div>
          <div
            onClick={() => setSubPage("All Patients")}
            className="dd-card dd-card-link pastel-green"
          >
            <h3 data-testid="immi-stats-count-patients">
              {patients ? patients.length : 0}
            </h3>
            <p>Patients </p>
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
            <h4 data-testid="immi-stats-count-covid-cases">
              Daily Covid Cases Canada
            </h4>
            <CanadaCovidCasesByDateRangeLineGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HealthOfficialStatistics };
