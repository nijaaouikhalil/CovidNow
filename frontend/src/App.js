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
