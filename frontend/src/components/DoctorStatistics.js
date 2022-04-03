import { CasesByProvincePieChart } from './CasesByProvincePieChart';
import { CanadaCovidCasesByDateRangeLineGraph } from '../components/CanadaCovidCasesByDateRangeLineGraph';


const DoctorStatistics = ({ setSubPage, patients }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3 data-testid='doctor-stats-count-cases'>1234</h3>
            <p>Total Confirmed Cases</p>
          </div>
          <div className="dd-card dd-card-link pastel-green">
            <div onClick={() => setSubPage("My Patients")}>
              <h3 data-testid='doctor-stats-count-patients'>{patients ? patients.length : 0}</h3>
              <p>Patients Assigned</p>
            </div>
          </div>
          <div className="dd-card dd-card-link pastel-orange">
            <div onClick={() => setSubPage("Messages")}>
              <h3 data-testid='doctor-stats-count-messages'>12</h3>
              <p>New Messages</p>
            </div>
          </div>
          <div className="dd-card dd-card-link pastel-red">
            <div onClick={() => setSubPage("Appointments")}>
              <h3 data-testid='doctor-stats-count-appointments'>6</h3>
              <p>Appointments</p>
            </div>
          </div>
        </div>

        <div id="dd-data-visuals">
          <div id="dd-pie" className="pastel-blue dd-card-link">
            <CasesByProvincePieChart />
          </div>
          <div id="dd-chart" className="pastel-orange dd-card-link">
            <h4 data-testid='doctor-stats-count-covid-cases'>Daily Covid Cases Canada</h4>
            <CanadaCovidCasesByDateRangeLineGraph />
          </div>

        </div>
      </div>
    </div>


  );
};

export { DoctorStatistics };
