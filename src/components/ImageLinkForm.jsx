import React from "react"

const ImageLinkForm = ({onInputChange, onSubmit, input}) => {
  return (
    <div>
      <p className="f3 tc">
        This magic brain will detect faces in your pictures. Give it a try
      </p>
      <div className="center">
        <form className="center form pa4 br3 shadow-5">
          <input required type="text" value={input} className="f4 pa2 w-70 center" onChange={onInputChange} />
          <button type="button" className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>
            Detect
          </button>
        </form>
      </div>
    </div>
  )
}

export default ImageLinkForm
