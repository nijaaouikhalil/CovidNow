import { CanadaCovidCasesByDateRangeLineGraph } from "./CanadaCovidCasesByDateRangeLineGraph";
import { CasesByProvincePieChart } from "./CasesByProvincePieChart";

const ImmiStatistics = ({ setSubPage, patients }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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

export { ImmiStatistics };
