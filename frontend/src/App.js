import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import EditProfile from "./screens/EditProfile";
import AdminPanelScreen from "./screens/AdminPanelScreen";
import AdminUserDetailScreen from "./screens/AdminUserDetailScreen";
import AnnouceScreen from "./screens/AnnouceScreen";
import DoctorPanelScreen from "./screens/DoctorPanelScreen";
import DoctorPatientDetailScreen from "./screens/DoctorPatientDetailScreen";
import HealthOfficialPanelScreen from "./screens/HealthOfficialPanelScreen";
import HealthOfficialPatientDetailScreen from "./screens/HealthOfficialPatientDetailScreen";
import ImmigrationPanelScreen from "./screens/ImmigrationPanelScreen";
import ImmigrationPatientDetailScreen from "./screens/ImmigrationPatientDetailScreen";
import PasswordRestScreen from "./screens/PasswordRestScreen";
import PatientPanelScreen from "./screens/PatientPanelScreen";
import PatientUpdateReportScreen from "./screens/PatientUpdateReportScreen";

// COMPONENT TEST ROUTE(S)
import ComponentTestScreen from "./screens/componentTestScreens/ComponentTestScreen";
import CTestScreen_Doctor_Address1 from "./screens/componentTestScreens/CTestScreen_Doctor_Address1";
import CTestScreen_Doctor_Address2 from "./screens/componentTestScreens/CTestScreen_Doctor_Address2";
import CTestScreen_Doctor_City from "./screens/componentTestScreens/CTestScreen_Doctor_City";
import CTestScreen_Doctor_LicenceNum from "./screens/componentTestScreens/CTestScreen_Doctor_LicenceNum";
import CTestScreen_Doctor_PostalCode from "./screens/componentTestScreens/CTestScreen_Doctor_PostalCode";
import CTestScreen_Doctor_Province from "./screens/componentTestScreens/CTestScreen_Doctor_Province";
import CTestScreen_Govern_ID from "./screens/componentTestScreens/CTestScreen_Govern_ID";
import CTestScreen_Health_ID from "./screens/componentTestScreens/CTestScreen_Health_ID";

// NEW:
import CTestScreen_AdminAllUsersList from "./screens/componentTestScreens/CTestScreen_AdminAllUsersList";
import CTestScreen_AdminConfirmUsers from "./screens/componentTestScreens/CTestScreen_AdminConfirmUsers";
import CTestScreen_AdminPieChart from "./screens/componentTestScreens/CTestScreen_AdminPieChart";
import CTestScreen_AdminStatistics from "./screens/componentTestScreens/CTestScreen_AdminStatistics";
import CTestScreen_CanadaCovidCasesByDateRangeLineGraph from "./screens/componentTestScreens/CTestScreen_CanadaCovidCasesByDateRangeLineGraph";
import CTestScreen_CreateNewAppointment from "./screens/componentTestScreens/CTestScreen_CreateNewAppointment";
import CTestScreen_DoctorAppointment from "./screens/componentTestScreens/CTestScreen_DoctorAppointment";
import CTestScreen_DoctorMessages from "./screens/componentTestScreens/CTestScreen_DoctorMessages";
import CTestScreen_DoctorPatientsList from "./screens/componentTestScreens/CTestScreen_DoctorPatientsList";
import CTestScreen_DoctorsPieChart from "./screens/componentTestScreens/CTestScreen_DoctorsPieChart";
import CTestScreen_DoctorStatistics from "./screens/componentTestScreens/CTestScreen_DoctorStatistics";
import CTestScreen_Footer from "./screens/componentTestScreens/CTestScreen_Footer";
import CTestScreen_Header from "./screens/componentTestScreens/CTestScreen_Header";
import CTestScreen_HealthOfficialFlagCovid from "./screens/componentTestScreens/CTestScreen_HealthOfficialFlagCovid";
import CTestScreen_HealthOfficialPatientsList from "./screens/componentTestScreens/CTestScreen_HealthOfficialPatientsList";
import CTestScreen_HealthOfficialStatistics from "./screens/componentTestScreens/CTestScreen_HealthOfficialStatistics";
import CTestScreen_ImmiPatientsList from "./screens/componentTestScreens/CTestScreen_ImmiPatientsList";
import CTestScreen_ImmiStatistics from "./screens/componentTestScreens/CTestScreen_ImmiStatistics";
import CTestScreen_ListDoctorAppointments from "./screens/componentTestScreens/CTestScreen_ListDoctorAppointments";
import CTestScreen_Loader from "./screens/componentTestScreens/CTestScreen_Loader";
import CTestScreen_Message from "./screens/componentTestScreens/CTestScreen_Message";
import CTestScreen_PatientContactTracing from "./screens/componentTestScreens/CTestScreen_PatientContactTracing";
import CTestScreen_PatientMessages from "./screens/componentTestScreens/CTestScreen_PatientMessages";
import CTestScreen_PatientReportSym from "./screens/componentTestScreens/CTestScreen_PatientReportSym";
import CTestScreen_PatientStatistics from "./screens/componentTestScreens/CTestScreen_PatientStatistics";
import CTestScreen_Resource from "./screens/componentTestScreens/CTestScreen_Resource";

// END OF COMPONENT TEST ROUTE(S)

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/ctests"
          element={<ComponentTestScreen></ComponentTestScreen>}
        />
        <Route
          path="/ctests/doc/address1"
          element={<CTestScreen_Doctor_Address1></CTestScreen_Doctor_Address1>}
        />
        <Route
          path="/ctests/doc/address2"
          element={<CTestScreen_Doctor_Address2></CTestScreen_Doctor_Address2>}
        />
        <Route
          path="/ctests/doc/city"
          element={<CTestScreen_Doctor_City></CTestScreen_Doctor_City>}
        />
        <Route
          path="/ctests/doc/licencenum"
          element={
            <CTestScreen_Doctor_LicenceNum></CTestScreen_Doctor_LicenceNum>
          }
        />
        <Route
          path="/ctests/doc/postalcode"
          element={
            <CTestScreen_Doctor_PostalCode></CTestScreen_Doctor_PostalCode>
          }
        />
        <Route
          path="/ctests/doc/province"
          element={<CTestScreen_Doctor_Province></CTestScreen_Doctor_Province>}
        />
        <Route
          path="/ctests/gov/id"
          element={<CTestScreen_Govern_ID></CTestScreen_Govern_ID>}
        />
        <Route
          path="/ctests/health/id"
          element={<CTestScreen_Health_ID></CTestScreen_Health_ID>}
        />

        // start of new c-tests routes
        <Route
          path="/ctests/adminalluserlist"
          element={<CTestScreen_AdminAllUsersList></CTestScreen_AdminAllUsersList>}
        />
        <Route
          path="/ctests/adminconfirmusers"
          element={<CTestScreen_AdminConfirmUsers></CTestScreen_AdminConfirmUsers>}
        />
        <Route
          path="/ctests/adminpiechart"
          element={<CTestScreen_AdminPieChart></CTestScreen_AdminPieChart>}
        />
        <Route
          path="/ctests/adminstatistics"
          element={<CTestScreen_AdminStatistics></CTestScreen_AdminStatistics>}
        />
        <Route
          path="/ctests/canadacovidcases"
          element={<CTestScreen_CanadaCovidCasesByDateRangeLineGraph></CTestScreen_CanadaCovidCasesByDateRangeLineGraph>}
        />
        <Route
          path="/ctests/createnewappointment"
          element={<CTestScreen_CreateNewAppointment></CTestScreen_CreateNewAppointment>}
        />
        <Route
          path="/ctests/doctorappointment"
          element={<CTestScreen_DoctorAppointment></CTestScreen_DoctorAppointment>}
        />
        <Route
          path="/ctests/doctormessages"
          element={<CTestScreen_DoctorMessages></CTestScreen_DoctorMessages>}
        />
        <Route
          path="/ctests/doctorstatistics"
          element={<CTestScreen_DoctorStatistics></CTestScreen_DoctorStatistics>}
        />
        <Route
          path="/ctests/footer"
          element={<CTestScreen_Footer></CTestScreen_Footer>}
        />
        <Route
          path="/ctests/header"
          element={<CTestScreen_Header></CTestScreen_Header>}
        />
        <Route
          path="/ctests/healthofficialflagcovid"
          element={<CTestScreen_HealthOfficialFlagCovid></CTestScreen_HealthOfficialFlagCovid>}
        />
        <Route
          path="/ctests/healthofficialpatientslist"
          element={<CTestScreen_HealthOfficialPatientsList></CTestScreen_HealthOfficialPatientsList>}
        />
        <Route
          path="/ctests/healthofficialstatistics"
          element={<CTestScreen_HealthOfficialStatistics></CTestScreen_HealthOfficialStatistics>}
        />
        <Route
          path="/ctests/immipatientslist"
          element={<CTestScreen_ImmiPatientsList></CTestScreen_ImmiPatientsList>}
        />
        <Route
          path="/ctests/immistatistics"
          element={<CTestScreen_ImmiStatistics></CTestScreen_ImmiStatistics>}
        />
        <Route
          path="/ctests/listdoctorappointments"
          element={<CTestScreen_ListDoctorAppointments></CTestScreen_ListDoctorAppointments>}
        />
        <Route
          path="/ctests/loader"
          element={<CTestScreen_Loader></CTestScreen_Loader>}
        />
        <Route
          path="/ctests/message"
          element={<CTestScreen_Message></CTestScreen_Message>}
        />
        <Route
          path="/ctests/patientcontacttracing"
          element={<CTestScreen_PatientContactTracing></CTestScreen_PatientContactTracing>}
        />
        <Route
          path="/ctests/patientmessages"
          element={<CTestScreen_PatientMessages></CTestScreen_PatientMessages>}
        />
        <Route
          path="/ctests/patientreportsym"
          element={<CTestScreen_PatientReportSym></CTestScreen_PatientReportSym>}
        />
        <Route
          path="/ctests/patientstatistics"
          element={<CTestScreen_PatientStatistics></CTestScreen_PatientStatistics>}
        />
        <Route
          path="/ctests/resource"
          element={<CTestScreen_Resource></CTestScreen_Resource>}
        />
        // end of new c-tests routes

        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/admin/dashboard" element={<AdminPanelScreen />} />
        <Route
          path="/admin/userdetails/:pid"
          element={<AdminUserDetailScreen />}
        />
        <Route path="/doctor/dashboard" element={<DoctorPanelScreen />} />
        <Route
          path="/doctor/patientdetails/:pid"
          element={<DoctorPatientDetailScreen />}
        />
        <Route
          path="/healthoff/dashboard"
          element={<HealthOfficialPanelScreen />}
        />
        <Route
          path="/healthoff/patientdetails/:pid"
          element={<HealthOfficialPatientDetailScreen />}
        />
        <Route path="/immi/dashboard" element={<ImmigrationPanelScreen />} />
        <Route
          path="/immi/patientdetails/:pid"
          element={<ImmigrationPatientDetailScreen />}
        />
        <Route path="/patient/dashboard" element={<PatientPanelScreen />} />
        <Route
          path="/patient/updatereport/:report_id"
          element={<PatientUpdateReportScreen />}
        />
        <Route path="/announcements" element={<AnnouceScreen />} />
        <Route path="/passwordrest" element={<PasswordRestScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
