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
            <Route path="/announcements" element={<AnnouceScreen />} />
            announcements
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
