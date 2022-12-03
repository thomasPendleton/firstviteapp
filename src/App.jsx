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
  const [imageUrl, setImageUrl] = useState('')
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

  // const onSubmit = () => {
  //   console.log("click")
  //   setImageUrl(input);
  //   app.models
  //     .predict(
  //   // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  //   // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  //   // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  //   // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
  //   // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
  //   // so you would change from:
  //   // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  //   // to:
  //   // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
  //       Clarifai.FACE_DETECT_MODEL,
  //       input)
  //     .then(response => {
  //       console.log('hi', response)
  //       if (response) {
  //         fetch('http://localhost:3000/image', {
  //           method: 'put',
  //           headers: {'Content-Type': 'application/json'},
  //           body: JSON.stringify({
  //             id: user.id
  //           })
  //         })
  //           .then(response => response.json())
  //           .then(count => {
  //             this.setState(Object.assign(this.state.user, { entries: count}))
  //           })

  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response))
  //     })
  //     .catch(err => console.log(err));
  // }

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
