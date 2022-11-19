import { useState } from "react"
import ParticlesBg from "particles-bg"
import Navigation from "./components/Navigation"
import ImageLinkForm from "./components/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition"
import Logo from "./components/Logo"
import Rank from "./components/Rank"




function App() {
  const [input, setInput] = useState('')


  const onInputChange = (e) => {
    console.log(e.target.value);
  }

  const onSubmit = () => {
    console.log('click');
  }

  return (
    <div className="App">
      <ParticlesBg className='particle' type="cobweb" bg={true} color="#777777" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition />            
    </div>
  )
}

export default App
