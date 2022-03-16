import { Table, Badge, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./CTestScreen_Loader";
import Message from "./CTestScreen_Message";
import {
  AdminlistUsers,
  AdminUpdateUser,
  ListAllUsers,
  UpdateCovidStatus,
} from "../actions/adminActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CTestScreen_HealthOfficialFlagCovid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const AdminListAllUsers = useSelector((state) => state.AdminListAllUsers);
  const {
    all_users,
    loading: loadingAllUsers,
    error: errorAllUsers,
  } = AdminListAllUsers;

  const FlagCovid = useSelector((state) => state.FlagCovid);
  const {
    message,
    loading: updateLoading,
    error: updatError,
    success,
  } = FlagCovid;

  const UpdateStatus = (id, decision) => {
    dispatch(UpdateCovidStatus({ id, covidStatus: decision }));
  };

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
    dispatch(ListAllUsers());
  }, [dispatch, success, user_info]);
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {updateLoading ? (
          <Loader />
        ) : updatError ? (
          <Message variant="danger">{updatError}</Message>
        ) : message ? (
          <Message variant="success">{message}</Message>
        ) : (
          ""
        )}
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
                  <th>Flag as covid case</th>
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
                      <td>
                        {user.covidStatus === "Positive" ||
                          user.covidStatus === "Pending"
                          ? "True"
                          : "False"}
                      </td>
                      <td>
                        <Col className="m-3">
                          <Button
                            variant="danger"
                            className="m-1"
                            size="sm"
                            onClick={() => UpdateStatus(user._id, "Positive")}
                          >
                            Positive
                          </Button>
                          <Button
                            variant="warning"
                            className="m-1"
                            size="sm"
                            onClick={() => UpdateStatus(user._id, "Pending")}
                          >
                            Pending
                          </Button>
                          <Button
                            variant="primary"
                            className="m-1"
                            size="sm"
                            onClick={() => UpdateStatus(user._id, "Negative")}
                          >
                            Negative
                          </Button>
                        </Col>
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

export { CTestScreen_HealthOfficialFlagCovid };
