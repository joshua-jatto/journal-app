import React from "react";
import JournalApp from "./components/Journal-App/Journal-app";
import LoginForm from "./components/authentication/Login-form";
import SignUpForm from "./components/authentication/SignUp-form";
import DashBoard from "./components/Journal-App/DashBoard";
import { AuthProvider } from "./components/context/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateProfile from "./components/authentication/UpdateProfile";
import PrivateRoute from "./components/authentication/privateRoute";

import "../src/styles.css";
import ForgotPassword from "./components/authentication/ForgotPassword";
function App() {
  return (
    <>
      <BrowserRouter basename="/Journal_App">
        <AuthProvider>
          <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/journalApp" element={<JournalApp />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
