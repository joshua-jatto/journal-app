import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function LogInForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogIn(e) {
    e.preventDefault();
    console.log(userEmail, userPassword);

    try {
      setErrorMsg("");
      setLoading(true);
      await login(userEmail, userPassword);
      // Update user profile if displayName needs to be set or changed
      // if (!currentUser.displayName || currentUser.displayName !== displayName) {
      //   await updateProfile(currentUser, {
      //     displayName: displayName,
      //   });
      // }
      console.log("logging in Sucessful at: ");

      navigate("/journalApp");
      console.log("Logged in: ", userEmail);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="-wrapper">
      <header>
        <h2>Login</h2>
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
      <form onSubmit={handleLogIn}>
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

        <div>
          <button disabled={loading} onClick={handleLogIn} className="form-btn">
            {loading ? "logging in...pls wait" : "Log in"}
          </button>
        </div>
        <br />
        <div>
          <br />
          <div>
            <p>
              Need an Account? <Link to="/signup">sign up</Link>
            </p>
          </div>
          <br />
          <div>
            <p>
              Forgot password? <Link to="/forgot-password">Reset password</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
