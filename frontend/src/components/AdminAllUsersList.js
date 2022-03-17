import { Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
const AdminAllUsersList = ({ all_users }) => {
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
                  <th>Role</th>
                  <th>Confirmed</th>
                  <th>Assigned Doctor</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody data-testid={'admin-all-users-table-body'}>
                {all_users && all_users.length > 0
                  ? all_users.map((user, index) => (
                      <tr data-testid={'admin-all-users-table-row'} key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lname}</td>
                        <td className="dd-patient-email">{user.email}</td>
                        <td>
                          {user.roles ? (
                            <div className="text-center">
                              {user.roles.name}
                              {user.roles.name === "doctor" && (
                                <div className="fw-bold fst-italic">
                                  assigned &nbsp;
                                  {user.count} patients
                                </div>
                              )}
                            </div>
                          ) : (
                            "User"
                          )}
                        </td>
                        <td>
                          <Badge
                            bg={
                              user.covidStatus === "Positive"
                                ? "danger"
                                : user.covidStatus === "Pending"
                                ? "warning"
                                : "info"
                            }
                          >
                            {user.covidStatus}
                          </Badge>
                        </td>
                        <td className="text-center">
                          {user.your_doctor
                            ? user.your_doctor.name
                            : "Not assigned"}
                        </td>
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

export { AdminAllUsersList };
