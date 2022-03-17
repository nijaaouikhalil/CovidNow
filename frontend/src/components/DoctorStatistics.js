import { DoctorsPieChart } from './DoctorsPieChart';
import { CanadaCovidCasesByDateRangeLineGraph } from './CanadaCovidCasesByDateRangeLineGraph';


const DoctorStatistics = ({ setSubPage, patients }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3>1234</h3>
            <p>Total Confirmed Cases</p>
          </div>
          <div className="dd-card dd-card-link pastel-green">
            <a onClick={() => setSubPage("My Patients")}>
              <h3>{patients ? patients.length : 0}</h3>
              <p>Patients Assigned</p>
            </a>
          </div>
          <div className="dd-card dd-card-link pastel-orange">
            <a onClick={() => setSubPage("Messages")}>
              <h3>12</h3>
              <p>New Messages</p>
            </a>
          </div>
          <div className="dd-card dd-card-link pastel-red">
            <a onClick={() => setSubPage("Appointments")}>
              <h3>6</h3>
              <p>Appointments</p>
            </a>
          </div>
        </div>

        <div id="dd-data-visuals">
          <div id="dd-pie" className="pastel-blue dd-card-link">
            <DoctorsPieChart patients={patients} />
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

export { DoctorStatistics };
