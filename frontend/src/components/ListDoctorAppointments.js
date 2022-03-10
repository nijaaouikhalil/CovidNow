import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ListDoctorsAppoinments = ({ patients }) => {
  return (
          <div className="d-flex flex-column mt-3 justify-content-center">
            <h4 className="my-3 ms-3">Scheduled Appointments</h4>
            <Table className="px-5" striped bordered hover variant="light" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th className="dd-patient-email">Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {patients && patients.length > 0
                  ? patients.map((patient, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{patient ? patient.name : "John"}</td>
                        <td>{patient ? patient.lname : "Doe"}</td>
                        <td className="dd-patient-email">
                          {patient ? patient.email : "johndoe@test.com"}
                        </td>
                        <td>?</td>
                        <td>?</td>
                        <td>
                          {patient ? (
                            <Link to={"/doctor/patientdetails/" + patient._id}>
                              More
                            </Link>
                          ) : (
                            <Link to={"/doctor/patientdetails/" + index}>
                              More
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </Table>
          </div>
  );
};

