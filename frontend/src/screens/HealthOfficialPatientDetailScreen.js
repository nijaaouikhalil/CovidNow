import React, { useEffect } from "react";
import {Loader} from "../components/Loader";
import {Message} from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import { useParams } from "react-router-dom";

function HealthOfficialPatientDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  let { pid } = useParams();
  useEffect(() => {
    if (!user_info || user_info.roles !== "ROLE_HEALTH_OFFICIAL") {
      navigate("/login");
    }

    dispatch(getUserDetails(pid));// eslint-disable-next-line
  }, [dispatch, user_info, pid]);

  return (
    <div>
      <Link to="/healthoff/dashboard" className="btn btn-light my-2 ms-3">
        Go Back
      </Link>

      <h3 className="my-3 text-center">User Information</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h2 className="ms-3">User Details</h2>
          <div className="mb-3">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user ? user.name : "John"} {user ? user.lname : "Doe"}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user ? user.email : "johndoe@error.com"}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Role</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user ? user.role : "Patient"}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Covid Status</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user ? user.covidStatus : "Active"}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Assigned doctor</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {user && user.doctor ? user.doctor.name : "Not assigned"}{" "}
                      {user && user.doctor ? user.doctor.lname : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthOfficialPatientDetailScreen;
