import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import Home from "./pages/home";
import VerifyEmail from "./components/Auth/verifyEmail/VerifyEmail";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

const App: React.FC = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/verify-email/:verifyToken" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<NotLoggedInRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </Router>
);

export default App;
