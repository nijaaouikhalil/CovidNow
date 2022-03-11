
import { CanadaCovidCasesByDateRangeLineGraph } from './CanadaCovidCasesByDateRangeLineGraph';

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
            <h3>7</h3>
            <p>Remaining Days In Quarantine</p>
          </div>
          <div onClick={() => setSubPage("Contact Tracing")} className="dd-card dd-card-link pastel-orange">
              <h3>4</h3>
              <p>Users Traced</p>
          </div>
        </div>

        <div
          id="dd-data-visuals"
          className="d-flex justify-content-around align-items-center"
        >
          <div id="dd-pie" className="pastel-blue">
            <h5 className="text-center">Pie Chart Title</h5>
            <img src="/img/piechart.png" alt="pie-chart" />
          </div>
          <div id="dd-chart" className="pastel-orange dd-card-link">
            <h4>Canadian Covid Cases</h4>
            <CanadaCovidCasesByDateRangeLineGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PatientStatistics };
