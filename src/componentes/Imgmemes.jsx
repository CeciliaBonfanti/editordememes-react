import html2canvas from "html2canvas"
import React, {useState} from "react";

const Imgmemes = () => {

  const [imgmeme, setImgmeme] = useState();
  const [textmeme, setTextmeme] = useState();

  const textomeme = (e) => {
    setTextmeme(e.target.value);
  }

  return (
    <div className="text-center">
      <h1 className="mt-3 mb-3 text-center">Editor de Memes</h1>
      <h3>Ingresa el texto del meme</h3>
      <input onChange={textomeme} className="form-control w-50 m-auto d-block" type="text" placeholder="Ingresa tu frase" name="meme" arial-label="default input example"/>

      <figure className="text-center">
        <p>{textmeme}</p>
        <img/>
      </figure>
    </div>
  )
}

export default Imgmemes