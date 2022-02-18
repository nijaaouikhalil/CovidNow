import { Table } from "react-bootstrap";

const DoctorPatientsList = ({ patients }) => {
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
                {patients && patients.length > 0
                  ? patients.map((patient, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{patient.name}</td>
                        <td>{patient.lname}</td>
                        <td className="dd-patient-email">{patient.email}</td>
                        <td>False</td>
                        <td>False</td>
                        <td>
                          <a href={"/doctor/patientdetails/" + patient._id}>
                            More
                          </a>
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

export { DoctorPatientsList };
