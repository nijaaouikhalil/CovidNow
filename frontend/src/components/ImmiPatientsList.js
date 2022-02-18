import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ImmiPatientsList = ({ all_users }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="row justify-content-center mt-5">
          <div className="col-11">
            <Table striped bordered hover variant="light" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th className="dd-patient-email">Email</th>
                  <th>Confirmed</th>
                  <th>Quarantined</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {all_users && all_users.length > 0
                  ? all_users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lname}</td>
                        <td className="dd-patient-email">{user.email}</td>
                        <td>True</td>
                        <td>True</td>
                        <td>
                          <Link to={"/admin/userdetails/" + user._id}>
                            More
                          </Link>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImmiPatientsList };
