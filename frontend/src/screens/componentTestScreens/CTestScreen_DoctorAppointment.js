import { useState } from "react";
import { CreateNewAppointment } from '../../components/CreateNewAppointment';
import CTestScreen_ListDoctorAppoinments from './CTestScreen_ListDoctorAppointments';

function CTestScreen_DoctorAppointment({ patients }) {

    const [currentTab, setCurrentTab] = useState("Scheduled");

    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item pointer">
                        <a className={currentTab === "Scheduled" ? "nav-link active" : "nav-link"}
                            onClick={() => setCurrentTab("Scheduled")}
                        >Scheduled Appointments</a>
                    </li>
                    <li className="nav-item mx-3 pointer">
                        <a className={currentTab === "New Appointment" ? "nav-link active" : "nav-link"}
                            onClick={() => setCurrentTab("New Appointment")}
                        >New Appointment</a>
                    </li>
                </ul>
                {currentTab === "New Appointment" && <CreateNewAppointment patients={patients} />}
                {currentTab === "Scheduled" && <CTestScreen_ListDoctorAppoinments patients={patients} />}
            </div>
        </div>
    )
};
export default CTestScreen_DoctorAppointment;

