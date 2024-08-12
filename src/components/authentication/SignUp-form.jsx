import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, userName, setUserName,setUserCredential, currentUser, updateProfile, userCredential} =
    useAuth();

  async function handleSignUp(e) {
    e.preventDefault();
    console.log(userEmail, userPassword, userConfirmPassword);
    if (userPassword !== userConfirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signup(userEmail, userPassword);
      // setUserCredential(userCredential)
      console.log('tis', userCredential.user)

      // Update user profile with display name
      // await userCredential.user.updateProfile({ userName });//
      // await updateProfile(currentUser.user, {
      //   displayName: userName,
      // });
      console.log("Signing up: ", userEmail);
      setLoading(false);
      navigate("/login");
      console.log(
        "Signing up: SUCESSFUL, proceed to Login ",
        userEmail,
        userName
      );
    } catch (error) {
      console.error("error signing in FAILED!:", error.message);
      setLoading(false);
    }
  }

  return (
    <div className="-wrapper">
      <header>
        <h2>Sign-up</h2>
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
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={userEmail}
          placeholder="Enter Email..."
          onChange={(e) => setUserEmail(e.target.value)}
          autoComplete="userEmail"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          autoComplete="current-password"
        />
        <input
          type="password"
          name="password"
          placeholder="Confirm password..."
          value={userConfirmPassword}
          onChange={(e) => setUserConfirmPassword(e.target.value)}
          autoComplete="current-password"
        />

        <div>
          <button
            disabled={loading}
            onClick={handleSignUp}
            className="form-btn"
          >
            {loading ? "Signing up..." : " Sign up"}
          </button>
        </div>
        <div>
          <p>
            Already have an Account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );

  // todo yet to implement routes and auth
}
