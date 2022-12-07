import React from 'react'

const FaceRecognition = ({box, imageUrl}) => {
  return (
    <div className='center ma2'>
    <div className='absolute mt2'>
      {imageUrl ? <img id='inputimage' alt='picture output' src={imageUrl} width='500px' heigh='auto'/> : null}
      
      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  </div>
  )
}

export default FaceRecognition