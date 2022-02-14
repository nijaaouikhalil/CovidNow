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
import AnnouceScreen from "./screens/AnnouceScreen";
import DoctorPanelScreen from "./screens/DoctorPanelScreen";
import DoctorPatientDetailScreen from "./screens/DoctorPatientDetailScreen";
import ImmigrationPanelScreen from "./screens/ImmigrationPanelScreen";
import ImmigrationUserDetailScreen from "./screens/ImmigrationUserDetailScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/admin/userlist" element={<AdminPanelScreen />} />
            <Route path="/doctor/patientlist" element={<DoctorPanelScreen />} />
            <Route path="/doctor/patientdetails/:pid" element={<DoctorPatientDetailScreen />} />
            <Route path="/immi/userlist" element={<ImmigrationPanelScreen />} />
            <Route path="/immi/userdetails/:uid" element={<ImmigrationUserDetailScreen />} />
            <Route path="/announcements" element={<AnnouceScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
