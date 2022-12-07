import React from 'react'

const FaceRecognition = ({box, imageUrl}) => {
  return (
    <div className="center ma2">
      <div className="absolute mt2">
        {imageUrl ? (
          <img
            id="inputimage"
            alt="picture output"
            src={imageUrl}
            width="500px"
            heigh="auto"
          />
        ) : null}
        {box.map((blueBox, idx) => {
          return (
            <div
              key={idx}
              className="bounding-box"
              style={{
                top: blueBox.topRow,
                right: blueBox.rightCol,
                bottom: blueBox.bottomRow,
                left: blueBox.leftCol,
              }}
            ></div>
          )
        })}
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
      </div>
    </div>
  )
}

export default FaceRecognition