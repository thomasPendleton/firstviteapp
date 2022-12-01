import { useState, useEffect } from "react"
// import Clarifai from "clarifai"
import ParticlesBg from "particles-bg"
import Navigation from "./components/Navigation"
import ImageLinkForm from "./components/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition"
import Logo from "./components/Logo"
import Rank from "./components/Rank"
import SignIn from "./components/SignIn"
import Register from "./components/Register"

// const app = new Clarifai.App({
//   apiKey: "deca23d8796b49889658378ab992aa74",
// })

function App() {
  const [input, setInput] = useState("")
  const [route, setRoute] = useState("signIn")
  const [box, setBox] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    })
  }

  // const calculateFaceLocation = (data) => {
  //   const clarifaiFace =
  //     data.outputs[0].data.regions[0].region_info.bounding_box
  //   const image = document.getElementById("inputimage")
  //   const width = Number(image.width)
  //   const height = Number(image.height)
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - clarifaiFace.right_col * width,
  //     bottomRow: height - clarifaiFace.bottom_row * height,
  //   }
  // }

  // const displayFaceBox = (box) => {
  //   setBox({ box: box })
  // }

  const onInputChange = (e) => {
    console.log(e.target.value)
  }

  const onSubmit = () => {
    console.log("click")
  }

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false)
    } else if (route === "home") {
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

      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank userName={user.name} userEntries={user.entries} user={user} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition />
        </>
      ) : route === "signIn" ? (
        <SignIn
          onRouteChange={onRouteChange}
          setSignIn={setIsSignedIn}
          loadUser={loadUser}
        />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  )
}

export default App
