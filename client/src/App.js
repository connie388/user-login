import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MenuHeader from "./navbar/MenuHeader";
import SignUp from "./signup/SignUp";
import SignIn from "./signup/SignIn";
import ResentVerification from "./signup/ResentVerification";
import SignOut from "./signup/SignOut";
import ForgotPassword from "./signup/ForgotPassword";
import UpdatePassword from "./signup/UpdatePassword";
import ThankYou from "./signup/ThankYou";
import PDFreader from "./helpers/PDFreader.js";
import { DataProvider } from "./helpers/DataProvider";
import { ErrorBoundary } from "react-error-boundary";

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <DataProvider>
        <Router>
          <div className="pageContainer">
            <MenuHeader />
            <div className="pageContent">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-out" element={<SignOut />} />
                <Route path="/verify-email/:email/:OTP" element={<Home />} />
                {/* <Route path="/verify-email/:email" element={<VerifyEmail />} /> */}
                <Route
                  path="/resent-verification/:email"
                  element={<ResentVerification />}
                />
                <Route
                  path="/update-password/:userId/:token"
                  element={<UpdatePassword />}
                />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/pdf-reader" element={<PDFreader />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </ErrorBoundary>
  );
}
