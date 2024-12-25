import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./components/LoginPage";
import UserRegistration from "./components/Register";

import "./App.css";
import Navbar from "./components/Header";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route
          path="/"
          element={
            <ProtectedRoute
              element={<HomePage />}
            />
          }
        />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
