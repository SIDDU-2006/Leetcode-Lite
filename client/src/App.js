import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Submissions from "./pages/Submissions";

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/" element={<PrivateRoute><Problems /></PrivateRoute>} />
        <Route path="/problem/:id" element={<PrivateRoute><ProblemDetail /></PrivateRoute>} />
        <Route path="/submissions" element={<PrivateRoute><Submissions /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;