import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./components/Signup";
import { PropertyProvider } from "./context/PropertyContext";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

import PropertyComponent from "./pages/Properties";
const App = () => {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/properties" element={<PropertyComponent />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </div>

          <Footer />
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
};

export default App;
