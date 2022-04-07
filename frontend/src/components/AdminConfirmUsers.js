import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Loader } from "./Loader";
import { Message } from "./Message";
import { AdminlistUsers, AdminUpdateUser } from "../actions/adminActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminConfirmUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const AdminListUsers = useSelector((state) => state.AdminListUsers);
  const { users, loading, error } = AdminListUsers;
  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { message, loading: updateLoading, error: updatError } = adminUpdate;

  const ConfirmUser = (id, decision) => {
    dispatch(
      AdminUpdateUser({
        id,
        decision,
      })
    );
  };

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_ADMIN") {
      navigate("/login");
    }
    dispatch(AdminlistUsers());
  }, [dispatch, user_info]);

  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="row justify-content-center mt-5">
          <div className="col-11">
            {updateLoading ? (
              <Loader />
            ) : updatError ? (
              <Message variant="danger">{updatError}</Message>
            ) : message ? (
              <Message variant="success">{message}</Message>
            ) : (
              ""
            )}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div>
                <Row>
                  <Col>
                    {" "}
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="table-sm text-center"
                    >
                      <thead className="table-dark">
                        <tr>
                          <th>NAME</th>
                          <th className="dd-patient-email">EMAIL</th>
                          <th>ROLE</th>

                          <th>ACCOUNT STATUS</th>
                          <th>DETAILS</th>
                          <th>ACTIONS TO TAKE</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users && users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={user._id}>
                              <td>
                                {user.name} {user.lname}
                              </td>
                              <td className="dd-patient-email">{user.email}</td>

                              <td>{user.roles ? user.roles.name : ""}</td>
                              <td>
                                {user.verified === "Active" ? (
                                  <i
                                    className="fa fa-check-circle btn-success"
                                    aria-hidden="true"
                                  ></i>
                                ) : (
                                  <i className="fas fa-user-times text-danger"></i>
                                )}
                              </td>
                              <td>
                                <LinkContainer
                                  to={`/admin/userdetails/${user._id}`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                              <td>
                                <Button
                                  variant="light"
                                  className="btn-sm text-success m-2"
                                  onClick={() => ConfirmUser(user._id, true)}
                                >
                                  <i className="fas fa-check"></i>
                                </Button>
                                <Button
                                  variant="light"
                                  className="btn-sm text-danger m-2"
                                  onClick={() => ConfirmUser(user._id, false)}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colspan="6">
                              <Message variant="info">{"No users"}</Message>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminConfirmUsers };
