import html2canvas from "html2canvas"
import React, {useState, useEffect} from "react";

const Imgmemes = () => {

  const [imgmeme, setImgmeme] = useState();
  const [textmeme, setTextmeme] = useState();
  const [memes, setMemes] = useState([]);

  const textomeme = (e) => {
    setTextmeme(e.target.value);
  }

  const seleccionarImg = (id) => {
    const memeSeleccionado = memes.find(meme => meme.id === id);
    if (memeSeleccionado) {
      setImgmeme(memeSeleccionado.url);
    }
  }

  const descargar = (e) => {
    html2canvas(document.querySelector('#exportar')).then(function(canvas) {
      /*{document.body.appendChild(canvas);}*/
      let img = canvas.toDataURL('memes/jpg');
      let link =  document.createElement('a');
      link.download = "memepropio.jpg";
      link.href = img;
      link.click();
    });
  } 

  useEffect(() => {
    const cargarImagenes = async() => {
      const url = 'https://api.imgflip.com/get_memes';
      
      try {
        const respuesta = await fetch(url);

        if(respuesta.status === 200){
          const datos = await respuesta.json();
          setMemes(datos.data.memes);
        } else {
          console.log("Hubo un error al obtener las imágenes");
        }
      }
      catch(error) {
        console.log(error.message);
      }
    }

    cargarImagenes();
  }, []);

  return (
    <div className="meme-editor text-center">
      <h1 className="mt-3 mb-3 text-center">Editor de Memes</h1>

      <div className="container">
      {imgmeme && (
      <figure className="text-center" id="exportar">
        <p className="mt-5 w-100 px-30 position-absolute top-50 start-30 h1 text-center">{textmeme}</p>
        <img src={imgmeme} className="figure-img mt-3 d-block m-auto" alt="meme"/>
      </figure>
      )}
    
        <div>
        <h3>Ingresa el texto del meme</h3>
        <input onChange={textomeme} className="form-control w-50 m-auto d-block" type="text" placeholder="Ingresa tu frase" name="meme" arial-label="default input example"/>
        </div>
      </div>

      <h3 className="mt-3 mb-3 tect-center">Elegí tu imagen favorita</h3>
      <section className="grid-container">
      {memes.map(meme => (
        <div key={meme.id} onClick={() => seleccionarImg(meme.id)}>
        <img src={meme.url} alt={meme.name} />
      </div>
      ))}
      </section>

      <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar meme</button>
    </div>
  )
}

export default Imgmemes;