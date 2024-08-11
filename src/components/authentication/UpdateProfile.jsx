import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { currentUser, updateProfileEmail, updateProfilePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (userPassword !== userConfirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    const promises = [];

    if (userEmail !== currentUser.email) {
      promises.push(updateProfileEmail(userEmail));
      console.log('calling update email')
    }
    if (userPassword) {
      promises.push(updateProfilePassword(userPassword));
    }

    Promise.all(promises)
      .then(() => {
        console.log("profile updated sucessfully");
        navigate("/login");
      })
      .catch((e) => {
        console.error('failed to update profile',e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="-wrapper">
      <header>
        <h2>Update Profile</h2>
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
      {/* <div>{user&&user}</div> */}
      <form onSubmit={handleUpdateProfile}>
        {/* <input type="text" name="name" placeholder="Name..." autoComplete="name" /> */}
        <input
          type="email"
          name="userEmail"
          id="userEmail"
        //   value={userEmail}
          placeholder="Enter Email..."
          onChange={(e) => setUserEmail(e.target.value)}
          autoComplete="userEmail"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Leave blank to keep the same"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          autoComplete="current-password"
        />
        <input
          type="password"
          name="password"
          placeholder="Leave blank to keep the same"
          value={userConfirmPassword}
          onChange={(e) => setUserConfirmPassword(e.target.value)}
          autoComplete="current-password"
        />

        <div>
          <button
            disabled={loading}
            onClick={handleUpdateProfile}
            className="form-btn"
          >
            {loading ? "Updating profile..Pls wait" : " Update"}
          </button>
        </div>
        <div>
          <p>
            <Link to="/login">Cancel</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
