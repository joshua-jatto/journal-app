import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Navbar from "./Navbar";

export default function DashBoard() {
  const [errorMsg, setErrorMsg] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    setErrorMsg("");
    try {
      await logout();
      navigate("/");
    } catch {
      setErrorMsg("Failed to Log  out");
    }
    console.log("handle logout called");
  }
  return (
    <div className="-wrapper">
      <Navbar displayName={currentUser.displayName}/>
      <header>
        <h2>Profile</h2>
      </header>
      {errorMsg && (
        <div
          style={{
            height: "2em",
            width: "400px",
            border: "4px solid red",
            color: "red", 
          }}
        >
          {errorMsg}
        </div>
      )}

      <div style={{ margin: "1.5rem auto" }}>
       <h3>Display name: {currentUser.displayName}</h3> <br />
       <h3>Email: {currentUser.email}</h3>
        
        <hr />
        <div style={{ margin: "1rem", color: "green" }}>
          <Link to={"/update-profile"}>
            <button className="form-btn" style={{ color: "green" }}>
              Update Profile
            </button>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <div>
            <button
              className="form-btn"
              style={{ maxWidth: "200px", color: "red" }}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
