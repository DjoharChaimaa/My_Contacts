import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import Header from "./Components/Header";

export const API_URL = "http://localhost:3001";

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="app-container">
      <Router>
        <Header
          title="MyContacts"
          showAdd={true}
        />
        <main className="page-container">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/contacts" /> : <Login />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/contacts" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={isAuthenticated ? <Contacts /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
