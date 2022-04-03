import { CanadaCovidCasesByDateRangeLineGraph } from './CanadaCovidCasesByDateRangeLineGraph';
import { CasesByProvincePieChart } from './CasesByProvincePieChart';

const PatientStatistics = ({ setSubPage }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3>1234</h3>
            <p>Total submitted daily reports </p>
          </div>
          <div onClick={() => setSubPage("")} className="dd-card dd-card-link pastel-green">
            <h3 data-testid={'patient-remaining-days'}>7</h3>
            <p>Remaining Days In Quarantine</p>
          </div>
          <div onClick={() => setSubPage("Contact Tracing")} className="dd-card dd-card-link pastel-orange">
              <h3 data-testid={'patient-users-traced'}>4</h3>
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
