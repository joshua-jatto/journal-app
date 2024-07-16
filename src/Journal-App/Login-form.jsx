import { useState } from "react"
import './styles.css'


export default function LoginForm() {

    const[userName, setUserName] = useState('')
    const[userPassword, setUserPassword] = useState()
    const[userEmail, setUserEmail] = useState('')


    return <div className="login-wrapper">
        <header>
            <h2>Login_Sign-up</h2>
        </header>

         <form action="">
         <div className="submit-container">
                <button className="form-btn">Log in</button>
                <button className="form-btn">Sign up</button>
            </div>
            <input
                type="text"
                name="name"
                placeholder="Name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="email"
                name="email"
                placeholder="Enter Email..."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password..."
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
            />

            <div>
                <button className="form-btn">Submit</button>
                
            </div>
        </form>

    </div>

    // todo yet to implement routes and auth


};