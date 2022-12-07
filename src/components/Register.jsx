import React, { useState } from "react"

const Register = ({ onRouteChange, loadUser }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onNameChange = (e) => {
    setName(e.target.value)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    if (!email.includes("@")) return
    if (!name || !password || !email) return

    fetch("http://localhost:3000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user)
          onRouteChange("home")
          setName("")
          setEmail("")
          setPassword("")
        }
      })
  }

  return (
    <article className="br3 shadow-5 ba dark-gray b--black-10 mv5 w-100 w-40-m w-40-l mw6 center tc">
      <main className="pa4 black-80">
        <form className="measure" type="submit">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                required
                value={email}
                onChange={onEmailChange}
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
                required
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <input
              onClick={onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mt3"
              type="submit"
              value="Register"
            />
          </fieldset>
        </form>
      </main>
    </article>
  )
}

export default Register
