import { useState } from "react"
import ParticlesBg from "particles-bg"
import Navigation from "./components/Navigation"
import ImageLinkForm from "./components/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition"
import Logo from "./components/Logo"
import Rank from "./components/Rank"
import SignIn from "./components/SignIn"
import Register from "./components/Register"

const initialState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
}

function App() {
  const [input, setInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [route, setRoute] = useState("signIn")
  const [box, setBox] = useState([])
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState(initialState)

  const loadUser = (data) => {
    const { id, name, email, entries, joined } = data
    setUser({
      id,
      name,
      email,
      entries,
      joined,
    })
  }

  const calculateFaceLocation = (data) => {
    const arrayOfRegions = data.outputs[0].data.regions
    const boxes = arrayOfRegions.map((region) => {
      const boundingBox = region.region_info.bounding_box
      const image = document.getElementById("inputimage")
      const width = Number(image.width)
      const height = Number(image.height)
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      }
    })
    return boxes

    // Single box return
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box

    // const image = document.getElementById("inputimage")
    // const width = Number(image.width)
    // const height = Number(image.height)
  
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - clarifaiFace.right_col * width,
    //   bottomRow: height - clarifaiFace.bottom_row * height,
    // }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onSubmit = () => {
    if (!input) return

    setImageUrl(input)

    fetch("https://serene-lake-44298.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://serene-lake-44298.herokuapp.com//image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              const { entries } = count
              setUser((state) => ({ ...state, entries: entries }))
            })
            .catch((err) => console.log(err))
        }
        displayFaceBox(calculateFaceLocation(response))
        setInput("")
      })
      .catch((err) => console.log(err))
  }

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false)
      setUser(initialState)
      setInput("")
      setImageUrl("")
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
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            input={input}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
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
