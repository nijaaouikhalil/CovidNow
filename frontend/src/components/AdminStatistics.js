import { CanadaCovidCasesByDateRangeLineGraph } from './CanadaCovidCasesByDateRangeLineGraph';
import { AdminPieChart } from './AdminPieChart';

const AdminStatistics = ({
  setSubPage,
  all_users,
  users_to_confirm,
  doctors,
}) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex flex-wrap justify-content-around mt-5 text-center">
          <div className="dd-card pastel-blue">
            <h3>1234</h3>
            <p>Total Confirmed Cases</p>
          </div>
          <div className="dd-card dd-card-link pastel-green">
            <a onClick={() => setSubPage("All Users")}>
              <h3 data-testid='admin-stats-count-all'>{all_users ? all_users.length : 0}</h3>
              <p>Total users</p>
            </a>
          </div>
          <div className="dd-card dd-card-link pastel-orange">
            <a onClick={() => setSubPage("Confirm Users")}>
              <h3 data-testid='admin-stats-count-confirm'>{users_to_confirm ? users_to_confirm.length : 0}</h3>
              <p>Users to Confirm</p>
            </a>
          </div>
          <div className="dd-card dd-card-link pastel-green">
            <a onClick={() => setSubPage("All Users")}>
              <h3 data-testid='admin-stats-count-doctors'>{doctors ? doctors.length : 0}</h3>
              <p>Total doctors</p>
            </a>
          </div>
        </div>

        <div
          id="dd-data-visuals"
          className="d-flex justify-content-around align-items-center"
        >
          <div id="dd-pie" className="pastel-blue dd-card-link">
            <AdminPieChart all_users={all_users} />
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

export { AdminStatistics };
