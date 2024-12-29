import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import Home from "./pages/home";
import VerifyEmail from "./components/Auth/verifyEmail/VerifyEmail";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import CreatePostPopup from "./components/post/createPostPopup";
import ProfilePage from "./pages/profile";
import FriendsPage from "./pages/friends";

const App: React.FC = () => {
  const [createPostPopupVisible, setCreatePostPopupVisible] = useState(false);
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const darkTheme = isDarkTheme ? "dark" : "";
  return (
    <div className={darkTheme}>
      {createPostPopupVisible && (
        <CreatePostPopup
          setCreatePostPopupVisible={setCreatePostPopupVisible}
        />
      )}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route
              path="/verify-email/:verifyToken"
              element={<VerifyEmail />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/friends/:type" element={<FriendsPage />} />
            <Route
              path="/"
              element={
                <Home setCreatePostPopupVisible={setCreatePostPopupVisible} />
              }
            />
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
    </div>
  );
};
export default App;
