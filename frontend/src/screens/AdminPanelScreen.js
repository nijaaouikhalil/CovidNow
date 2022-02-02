import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AdminlistUsers, AdminUpdateUser } from "../actions/adminActions";
import { LinkContainer } from "react-router-bootstrap";
function AdminPanelScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const AdminListUsers = useSelector((state) => state.AdminListUsers);
  const { users, loading, error } = AdminListUsers;
  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { message, loading: updateLoading, error: updatError } = adminUpdate;

  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_ADMIN") {
      navigate("/login");
    }
    dispatch(AdminlistUsers());
  }, [dispatch, user_info]);

  const ConfirmUser = (id, decision) => {
    dispatch(
      AdminUpdateUser({
        id,
        decision,
      })
    );
  };
  return (
    <div className="second_menu_links">
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container>
        <h1 className="text-center">Admin panel</h1>
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
            <Row className="justify-content-md-center">
              <Col sm={8}>
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
                      <th>EMAIL</th>
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
                          <td>{user.email}</td>

                          <td>{user.roles ? user.roles : ""}</td>
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
                        <td>
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
      </Container>
    </div>
  );
}

export default AdminPanelScreen;
