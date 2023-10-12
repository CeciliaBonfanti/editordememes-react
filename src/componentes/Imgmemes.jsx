import html2canvas from "html2canvas";
import React, {useState, useEffect} from "react";

const Imgmemes = () => {
  const [imgmeme, setImgmeme] = useState('https://i.imgflip.com/2wifvo.jpg');
  const [textmeme, setTextmeme] = useState();
  const [textmeme2, setTextmeme2] = useState();
  const [memes, setMemes] = useState([]);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [ejex, setEjex] = useState(0);
  const [ejey, setEjey] =useState(0);
  const [ejex2, setEjex2] = useState(0);
  const [ejey2, setEjey2] =useState(0);
  const [fontSize, setFontSize] = useState(40);

  const textomeme = (e) => {
    setTextmeme(e.target.value);
  }

  const textomeme2 = (e) => {
    setTextmeme2(e.target.value);
  }

  const seleccionarImg = (id) => {
    const memeSeleccionado = memes.find(meme => meme.id === id);
    if (memeSeleccionado) {
      setImgmeme(memeSeleccionado.url);
      window.scrollTo(0, 0);
    }
  }

  const descargar = (e) => {
    html2canvas(document.querySelector('#exportar'), {useCORS: true}).then(function(canvas) {
       /*{document.body.appendChild(canvas);}*/
      let img = canvas.toDataURL('image/jpg');
      let link = document.createElement('a');
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
          const memesFiltrados = datos.data.memes.filter(meme => meme.height < 1400);
          setMemes(memesFiltrados);
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
    <h1 className="titulo text-center">Editor de Memes</h1>
    <div className="contenedor">
    <div id="exportar" style={{display: 'inline-block'}}>
        {imgmeme && (
          <figure className="contenedor-meme">
            <p className="texto-meme" style={{fontSize: `${fontSize}px`,color: `rgb(${red}, ${green}, ${blue})`,  transform: `translate(${ejex}px, ${ejey}px)`}}>{textmeme}</p>
            <p className="texto-meme2"style={{fontSize: `${fontSize}px`,color: `rgb(${red}, ${green}, ${blue})`, transform: `translate(${ejex2}px, ${ejey2}px)`}}>{textmeme2}</p>
            <img src={imgmeme} className="figure-img d-block m-auto" alt="meme"/>
          </figure>
          )}
        </div>
      
      <div className="edit-container">
        <div className="texto">
          <h3>Ingresa el texto del meme</h3>
          <div className="input-texto">
            <input onChange={textomeme} className="form-control d-block" type="text" placeholder="Ingresa tu primer texto" name="meme" arial-labe="default input example"/>
            <input onChange={textomeme2} className="form-control d-block" type="text" placeholder="Ingresa tu segundo texto" name="meme" aria-label="default input example"/>
          </div>
        </div>

        <div> 
          <h3>Posiciona el texto</h3>
          <div className="position">
            <div className="position-inputs">
              <div className="position-input">
                <h4>Texto 1</h4>
                <label>horizontal: 
                  <input type="range" min="0" max="800" value={ejex} onChange={(e) => setEjex(e.target.value)}/>
                </label>
                <label>vertical: 
                  <input type="range" min="0" max="800" value={ejey} onChange={(e) => setEjey(e.target.value)} />
                </label>
              </div>
              <div className="position-input">
                <h4>Texto 2</h4>
                <label>horizontal: 
                  <input type="range" min="0" max="800" value={ejex2} onChange={(e) => setEjex2(e.target.value)}/>
                </label>
                <label>vertical: 
                  <input type="range" min="0" max="800" value={ejey2} onChange={(e) => setEjey2(e.target.value)}/>
                </label>
              </div>
            </div>  
          </div>
        </div>
    </div>

    <div className="edit-container2">
    <div className="tamaño-letra">
      <label><h3>Tamaño de la letra:</h3></label>
      <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
    </div>
    <div className="color">
            <h3>Elige el color</h3>
            <div className="input-color"style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}>
              <label>R: 
                <input type="range" min="0" max="255" value={red} onChange={(e) => setRed(e.target.value)}/>
              </label>
              <label>G: 
                <input type="range" min="0" max="255" value={green} onChange={(e) => setGreen(e.target.value)} />
              </label>
              <label>B: 
                <input type="range" min="0" max="255" value={blue} onChange={(e) => setBlue(e.target.value)} />
              </label>
            </div>
        </div>
    </div>
      </div>

    <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4 ">Descargar meme</button>

    <h3 className="mt-3 mb-3 tect-center">Elegí tu imagen favorita</h3>

    <section className="grid-container">
      {memes.map(meme => (
        <div key={meme.id} onClick={() => seleccionarImg(meme.id)}>
          <img src={meme.url} alt={meme.name} />
        </div>
      ))}
    </section>

  </div>
)
}
export default Imgmemes;