import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

const App: React.FC = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true  }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
