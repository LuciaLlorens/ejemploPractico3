import React from 'react';
import { useState, useRef } from 'react';
import './App.css';
// Importo las imagenes finales
import SarahConnor from './img/SarahConnor.png';
import Terminator1 from './img/Terminator1.png';
// importo los componentes hijos
import ObtencionNombre from './componentes/ObtencionNombre.jsx';
import Jugadas from './componentes/Jugadas.jsx';
import Juego from './componentes/Juego.jsx';
import {Marcador} from './componentes/Marcador.jsx';
import Resultado from './componentes/Resultado.jsx';
import Reinicio from './componentes/Reinicio';


function App() {
  // defino las variables que voy a necesitar usar entre los componentes hijos con sus estados iniciales.
  const [jugadaUsuario, setJugadaUsuario] = useState(null);
  const [jugadaComputadora, setJugadaComputadora] = useState(null);
  const [mostrarInterfaz, setMostrarInterfaz] = useState(false);
  const [nombre, setNombreJugador] = useState(null);
  const [saludo, setSaludar] = useState(false);
  const [label, setLabel] = useState(true);
  const [input, setinput] = useState(true);
  const [mensajeNombreError, setMensajeNombreError] = useState(false);
  const [ganadorRonda, setGanadorRonda] = useState(null);
  const [puntajeUsuario, setPuntajeUsuario] = useState(0);
  const [puntajeComputadora, setPuntajeComputadora] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [numeroDeRonda, setNumeroDeRonda] = useState(0);
  const [mensajeOpcionError, setMensajeOpcionError] = useState(false);
  const [botonJugar, setBotonJugar] = useState(true);
  const inputRef = useRef(null);
  const [imagen1, setImagen1] = useState(false);
  const [imagen2, setImagen2] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  // actualizo el nombre del jugador con lo ingresado en el input y saludo
  const CambiarNombre = (e) => {
    setNombreJugador(e.target.value);
  };

  return (
    <>
      <header>
        <div className="juego">
          {imagen1 && (
          // Imagen de la izquierda, aparece con el resultado final
          <div className="img" id="img1">
            <img src={SarahConnor} alt="Sarah Connor" />
          </div>
          )}

          <div className="panelDeControl" id="panelDeControl">
            <div className="base">
            {/*Título tamaño grande*/}
              <h1 data-testid="tituloJuego">Piedra, Papel o Tijera</h1>
            </div>
            
            {/*Espacio para ingresar el nombre del usuario, saludar y obtener el mensaje de error*/}
            <div>
              <ObtencionNombre nombre={nombre} saludo={saludo} mensajeNombreError={mensajeNombreError} 
              onChange={CambiarNombre} inputRef={inputRef} input={input} label={label} 
              />
            </div>

            {/*Espacio para los botones de opciones piedra, papel o tijera*/}
            <div>
              <Jugadas jugadaUsuario={jugadaUsuario} setJugadaUsuario={setJugadaUsuario} 
              mensajeOpcionError={mensajeOpcionError} opcionSeleccionada={opcionSeleccionada} setOpcionSeleccionada={setOpcionSeleccionada}  
                
              />
            </div>

            <div>
              {/*Botón que al ser presionado ejecuta la función handleJugarClick en el componente Juego y muestra el cuadro con la información de rondas*/}
              {botonJugar && (
                <Juego nombre={nombre} setMensajeNombreError={setMensajeNombreError} setMensajeOpcionError={setMensajeOpcionError} setMostrarInterfaz={setMostrarInterfaz} botonJugar={botonJugar}
                setSaludar={setSaludar} jugadaUsuario={jugadaUsuario} setJugadaComputadora={setJugadaComputadora}
                setNumeroDeRonda={setNumeroDeRonda} setGanadorRonda={setGanadorRonda} setInput={setinput}
                setPuntajeComputadora={setPuntajeComputadora} setPuntajeUsuario={setPuntajeUsuario} setEmpates={setEmpates} setLabel={setLabel} 
              />
              )}
            </div>

            <div>
              {/*Botón que al ser presionado ejecuta la función Reinicio*/}
              <Reinicio setMostrarInterfaz={setMostrarInterfaz} setBotonJugar={setBotonJugar} 
              setJugadaUsuario={setJugadaUsuario} setJugadaComputadora={setJugadaComputadora}
              setNombreJugador={setNombreJugador} setSaludar={setSaludar} setInput={setinput} setLabel={setLabel} 
              setMensajeNombreError={setMensajeNombreError} setMensajeOpcionError={setMensajeOpcionError}
              setEmpates={setEmpates} setGanadorRonda={setGanadorRonda} setNumeroDeRonda={setNumeroDeRonda}
              setPuntajeUsuario={setPuntajeUsuario} setPuntajeComputadora={setPuntajeComputadora}
              setImagen1={setImagen1} setImagen2={setImagen2} setOpcionSeleccionada={setOpcionSeleccionada} 
              />
            </div>
          </div>

          {/*Espacio para los resultados de cada ronda, aparece con el cuadro de rondas tras clickear el botón Jugar*/}
          {mostrarInterfaz && (
            <div className="empezamosElJuego" id="empezamosElJuego">
              <div className="rondas">
                <p id="numeroDeRonda"> Ronda N° {numeroDeRonda}</p>
                <p>{nombre} eligió {jugadaUsuario}</p>
                <p>La computadora eligió {jugadaComputadora}</p>
                {/*Agrego diferentes clases con diferentes estilos en el caso de que ganadorRonda sea empate, la computadora o el usuario*/}
                <p id="resultadoRonda" className={ganadorRonda === "Ronda ganada por la computadora" ? "ganadorComputadora" : 
                ganadorRonda === "Ronda ganada por " + nombre ? "ganadorUsuario" : 
                ganadorRonda === "El resultado de la ronda fue empate" ? "empate" : ""}> 
                {ganadorRonda} 
                </p>
              </div>
              {/*Espacio para el conteo de los puntajes generales*/}
              <Marcador nombre={nombre} puntajeComputadora={puntajeComputadora} puntajeUsuario={puntajeUsuario} empates={empates}/>
              {/*Espacio para presentar el resultado final (mejor de 5 rondas o ganador de 3)*/}
              <Resultado nombre={nombre} puntajeComputadora={puntajeComputadora} 
              puntajeUsuario={puntajeUsuario} numeroDeRonda={numeroDeRonda} 
              setBotonJugar={setBotonJugar} botonJugar={botonJugar}
              setImagen1={setImagen1} setImagen2={setImagen2}
              />
            </div>
          )}
          
          {imagen2 && (
            // Imagen de la derecha, que aparece con el resultado final
            <div className="img" id="img2">
              <img src={Terminator1} alt="Terminator" />
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default App;