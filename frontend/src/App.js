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

// COMPONENT TEST ROUTE(S)
import DoctorInfoFormAddress1_Test from "./componentsTestUtils/doctorFormsIndividual";
import DoctorInfoFormAddress2_Test from "./componentsTestUtils/doctorFormsIndividual";
import DoctorInfoFormCity_Test from "./componentsTestUtils/doctorFormsIndividual";
import DoctorInfoFormLicenceNum_Test from "./componentsTestUtils/doctorFormsIndividual";
import DoctorInfoFormPostalCode_Test from "./componentsTestUtils/doctorFormsIndividual";
import DoctorInfoFormProvince_Test from "./componentsTestUtils/doctorFormsIndividual";
import gouvernInfoForm_gouvernID_Test from "./componentsTestUtils/gouvernFormsIndividual";
import healthOfficialInfoForm_OfficialID_Test from "./componentsTestUtils/healthOfficialFormsIndividual";

import ComponentTestScreen from "./screens/componentTestScreens/ComponentTestScreen"; // implement
import CTestScreen_Doctor_Address1 from "./screens/componentTestScreens/CTestScreen_Doctor_Address1"; // implement
import CTestScreen_Doctor_Address2 from "./screens/componentTestScreens/CTestScreen_Doctor_Address2"; // implement
import CTestScreen_Doctor_City from "./screens/componentTestScreens/CTestScreen_Doctor_City"; // implement
import CTestScreen_Doctor_LicenceNum from "./screens/componentTestScreens/CTestScreen_Doctor_LicenceNum"; // implement
import CTestScreen_Doctor_PostalCode from "./screens/componentTestScreens/CTestScreen_Doctor_PostalCode"; // implement
import CTestScreen_Doctor_Province from "./screens/componentTestScreens/CTestScreen_Doctor_Province"; // implement
import CTestScreen_Govern_ID from "./screens/componentTestScreens/CTestScreen_Govern_ID"; // implement
import CTestScreen_Health_ID from "./screens/componentTestScreens/CTestScreen_Health_ID"; // implement
// END OF COMPONENT TEST ROUTE(S)


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/componentTests" element={<ComponentTestsScreen></ComponentTestsScreen>} />


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
        <Route path="/announcements" element={<AnnouceScreen />} />
        <Route path="/passwordrest" element={<PasswordRestScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
