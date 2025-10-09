import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import Header from "./Components/Header";

export const config = {
  API_URL: import.meta.env.VITE_API_URL
};
console.log('API URL configurée:', config.API_URL);
export const API_URL = config.API_URL;

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="app-container">
      <Router>
        <Header title="MyContacts" />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? "/contacts" : "/login"} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/contacts" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/contacts" /> : <Register />} />
            <Route path="/contacts" element={isAuthenticated ? <Contacts /> : <Navigate to="/login" />} />
            {/* Route fallback pour toutes les autres URLs */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}