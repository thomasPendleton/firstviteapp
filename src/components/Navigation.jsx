import React from 'react'
import Logo from "./Logo"
const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => {
            onRouteChange("signout")
          }}
          className="f3 link dim black pa3 pointer mr3"
        >
          Sign out
        </p>
      </nav>
    )
  } else {
    return (
      <nav
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <p
          onClick={() => onRouteChange("signIn")}
          className="f3 link dim black pa3 pointer"
        >
          Sign in
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black pa3 pointer mr3"
        >
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation