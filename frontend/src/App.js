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
import DoctorInfoAddress1_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormAddress1_Test";
import DoctorInfoAddress2_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormAddress2_Test";
import DoctorInfoCity_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormCity_Test";
import DoctorInfoLicenceNum_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormLicenceNum_Test";
import DoctorInfoPostalCode_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormPostalCode_Test";
import DoctorInfoProvince_Test from "./componentsTestUtils/doctorFormsIndividual/DoctorInfoFormProvince_Test";
import GouvernInfo_Test from "./componentsTestUtils/gouvernFormsIndividual/gouvernInfoForm_gouvernID_Test";
import HealthOfficialInfo_Test from "./componentsTestUtils/healthOfficialFormsIndividual/healthOfficialInfoForm_OfficialID_Test";

import ComponentTestScreen from "./screens/componentTestScreens/componentTestScreen"; //implement
import CTestScreen_Doctor_Address1 from "./screens/componentTestScreens/CTestScreen_Doctor_Address1"; //implement
import CTestScreen_Doctor_Address2 from "./screens/componentTestScreens/CTestScreen_Doctor_Address2"; //implement
import CTestScreen_Doctor_City from "./screens/componentTestScreens/CTestScreen_Doctor_City"; //implement
import CTestScreen_Doctor_LicenceNum from "./screens/componentTestScreens/CTestScreen_Doctor_LicenceNum"; //implement
import CTestScreen_Doctor_PostalCode from "./screens/componentTestScreens/CTestScreen_Doctor_PostalCode"; //implement
import CTestScreen_Doctor_Province from "./screens/componentTestScreens/CTestScreen_Doctor_Province"; //implement
import CTestScreen_Govern_ID from "./screens/componentTestScreens/CTestScreen_Govern_ID"; // implement
import CTestScreen_Health_ID from "./screens/componentTestScreens/CTestScreen_Health_ID"; // implement
// END OF COMPONENT TEST ROUTE(S)


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/componentTests" element={<ComponentTestScreen></ComponentTestScreen>} />
        <Route path="/componentTests/doc/address1" element={<CTestScreen_Doctor_Address1></CTestScreen_Doctor_Address1>} />
        <Route path="/componentTests/doc/address2" element={<CTestScreen_Doctor_Address2></CTestScreen_Doctor_Address2>} />
        <Route path="/componentTests/doc/city" element={<CTestScreen_Doctor_City></CTestScreen_Doctor_City>} />
        <Route path="/componentTests/doc/licencenum" element={<CTestScreen_Doctor_LicenceNum></CTestScreen_Doctor_LicenceNum>} />
        <Route path="/componentTests/doc/postalcode" element={<CTestScreen_Doctor_PostalCode></CTestScreen_Doctor_PostalCode>} />
        <Route path="/componentTests/doc/province" element={<CTestScreen_Doctor_Province></CTestScreen_Doctor_Province>} />
        <Route path="/componentTests/gov/id" element={<CTestScreen_Govern_ID></CTestScreen_Govern_ID>} />
        <Route path="/componentTests/health/id" element={<CTestScreen_Health_ID></CTestScreen_Health_ID>} />

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
