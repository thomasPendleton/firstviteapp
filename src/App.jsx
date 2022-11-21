import { useState } from "react"
import ParticlesBg from "particles-bg"
import Navigation from "./components/Navigation"
import ImageLinkForm from "./components/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition"
import Logo from "./components/Logo"
import Rank from "./components/Rank"
import SignIn from "./components/SignIn"
import Register from "./components/Register"

function App() {
  const [input, setInput] = useState("")
  const [route, setRoute] = useState("signIn")
  const [isSignedIn, setIsSignedIn] = useState(false)

  const onInputChange = (e) => {
    console.log(e.target.value)
  }

  const onSubmit = () => {
    console.log("click")
  }

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setIsSignedIn(false)
    } else if(route === 'home'){
      setIsSignedIn(true)
    }
    setRoute(route)
  }
  return (
    <div className="App">
      <ParticlesBg
        className="particle"
        type="cobweb"
        bg={true}
        color="#777777"
      />

      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      {route === "home" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition />
        </>
      ) : route === "signIn" ? (
        <SignIn onRouteChange={onRouteChange} setSignIn={setIsSignedIn}/>
      ) : (
        <Register onRouteChange={onRouteChange}/>
      )}
    </div>
  )
}

export default App
