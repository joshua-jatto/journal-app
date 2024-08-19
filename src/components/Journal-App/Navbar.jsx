import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({displayName}) {
  return (
    <nav
      style={{
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom:'2px solid gray',
        marginBottom:'2em'
      }}
    >
      <header>
        <Link to={"/journalApp"}  style={{textDecoration:'none'}}>
          
          <h2>{`${displayName}'s Journal`} </h2>
        </Link>
      </header>

      <div>
        {/* <div> D/Nmode</div> */}
        <div
          className="avatar"
          style={{
            width: "50px",
            height: "50px",
            border: "1px solid black",
            borderRadius: "15px",
          }}
        >
          <Link to={"/dashboard"} style={{textDecoration:'none'}}>
            <div
              style={{
                width: "100%",
                fontWeight: "bolder",
                margin: "8px auto",
                textAlign: "center",
                fontSize: "1.8rem",
                
              }}
            > 
              {displayName[0]}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
