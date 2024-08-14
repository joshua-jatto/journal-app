import React,{useState}from "react";
import { Link, useNavigate} from "react-router-dom";
import {useAuth} from '../context/auth-context'


export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleReset(){
    setErrorMsg('')
    setLoading(true)
   try {
    await resetPassword(userEmail)
    setMessage(`Check ${userEmail} inbox for reset instruction`)
    setLoading(false)
   } catch (error) {
    setErrorMsg("failed to reset", error.message)
    setLoading(false)
   } 
  }

  return (
    <div className="-wrapper">
      <header>
        <h2>Reset password</h2>
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

      {message && (<div
      style={{
        height: "2em",
        width: "400px",
        border: "4px solid green",
        color: "yellowgreen",
      }}
    >
      {message}
    </div> )}
      <form onSubmit={handleReset}>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={userEmail}
          placeholder="Enter Email..."
          onChange={(e) => setUserEmail(e.target.value)}
          autoComplete="userEmail"
        />

        <div>
          <button disabled={loading} onClick={handleReset} className="form-btn">{loading ? 'Resetting...':'Reset'}
            
          </button>
        </div>
        <div>
        <br />
        <div>
          <p><Link to="/">Log in</Link></p>
        </div>
        
        
       
        </div>
      </form>
    </div>
  );
}
