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

function App() {
  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/admin/dashboard" element={<AdminPanelScreen />} />
            <Route path="/admin/userdetails/:uid" element={<AdminUserDetailScreen />}/>
            <Route path="/doctor/dashboard" element={<DoctorPanelScreen />} />
            <Route path="/doctor/patientdetails/:pid" element={<DoctorPatientDetailScreen />}/>
            <Route path="/healthoff/dashboard" element={<HealthOfficialPanelScreen />} />
            <Route path="/healthoff/patientdetails/:pid" element={<HealthOfficialPatientDetailScreen />}/>
            <Route path="/immi/dashboard" element={<ImmigrationPanelScreen />} />
            <Route path="/immi/patientdetails/:uid" element={<ImmigrationPatientDetailScreen />} />
            <Route path="/patient/dashboard" element={<PatientPanelScreen />} />
            <Route path="/announcements" element={<AnnouceScreen />} />
            <Route path="/passwordrest" element={<PasswordRestScreen />} />
          </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
