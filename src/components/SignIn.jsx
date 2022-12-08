import React, { useState } from "react"

const SignIn = ({ onRouteChange, setSignIn, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value)
  }

  const onSubmit = () => {
    fetch("https://serene-lake-44298.herokuapp.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user)
          onRouteChange("home")
        }
      })
      setSignInPassword('')
      setSignInEmail('')
  }

  return (
    <article className="br3 shadow-5 ba dark-gray b--black-10 mv5 w-100 w-40-m w-40-l mw6 center tc">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={signInEmail}
                onChange={onEmailChange}
                required
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={signInPassword}
                onChange={onPasswordChange}
                required
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => {
                onSubmit()
              }}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>

          <div className="lh-copy mt3">
            <p
              href="#0"
              className="f6 link dim black db pointer"
              onClick={() => {
                onRouteChange("register")
              }}
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default SignIn
