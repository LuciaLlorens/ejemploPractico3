import React from 'react';
import { useState, useRef } from 'react';
import './App.css';
// Importo las imagenes finales
import SarahConnor from './img/SarahConnor.png';
import Terminator1 from './img/Terminator1.png';
import terminatorAudio from './audio/terminatorAudio.mp3';
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
  const [saludoTerminator, setSaludoTerminator] = useState(false);
  const [saludoUsuario, setSaludoUsuario] = useState(false);
  const [juego, setJuego] = useState(false);
  const [paginaInicial, setPaginaInicial] = useState(true);
  const [audioTerminator, setAudioTerminator] = useState(false);
  const [mute, setMute] = useState(false);

  // actualizo el nombre del jugador con lo ingresado en el input y saludo
  const CambiarNombre = (e) => {
    setNombreJugador(e.target.value);
  };
  
  // si aprieta el botón Comenzar aparece la otra pantalla con el juego propiamente dicho, así como se comienza a reproducir la música de fondo
  const ActivarJuego = () => {
    setJuego(true);
    setPaginaInicial(false);
    setAudioTerminator(true);
    }
  
  // para poder mutear el audio en el caso de que así se quiera
  const Mute = () => {
    setMute(!mute);
    }

  return (
    <>
      <header>
      {/*Esta es la página de inicio, con las instrucciones de juego y el botón de comenzar; me permite una primera interacción del usuario con la página,
      algo que posibilita el autoPlay en la "segunda página"*/}
      {paginaInicial && (
        <div>
          <h1 className="tituloJuego" data-testid="tituloJuego">Piedra, Papel o Tijera</h1>
          <p className='reglas'> Reglas del juego: </p>
          <p className='reglas'> Hablamos del clásico juego de manos. </p>
          <p className='reglas'> Pero esta vez jugarás con la computadora. </p>
          <li className='reglas'> La piedra rompe la tijera </li>
          <li className='reglas'> La tijera corta el papel </li>
          <li className='reglas'> El papel envuelve a la piedra </li>
          <p className='reglas'> El juego finaliza tras cinco rondas jugadas, o al mejor de tres. </p>
          <button type="button" id="botónComenzar" onClick={ActivarJuego}> Comenzar </button>
        </div>
      )}

      {/*Al apretar comenzar se abre esta nueva página que contiene al juego y la música*/}
      {juego && (
        <div className="juego">
        {/* Este es el audio que se reproduce automáticamente y en loop; así también se puede mutear con un botón destinado a ello */}
          {audioTerminator && (
            <div className="ContenedorAudio">
              <button type="button" id="botónMute" onClick={Mute}> {mute ? 'Activar Sonido' : 'Silenciar'} </button>
              <audio autoPlay volume={0} loop muted={mute} >
                <source src={terminatorAudio} type="audio/mpeg" />
              </audio>
            </div>
          )}

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
              saludoTerminator={saludoTerminator} saludoUsuario={saludoUsuario}
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
              setSaludoTerminator={setSaludoTerminator} setSaludoUsuario={setSaludoUsuario} setMute={setMute}
              />
            </div>
          </div>

          {/*Espacio para los resultados de cada ronda, aparece con el cuadro de rondas tras clickear el botón Jugar*/}
          {mostrarInterfaz && (
            <div className="empezamosElJuego" id="empezamosElJuego">
              <div className="rondas">
                <p id="numeroDeRonda"> Ronda N° {numeroDeRonda}</p>
                <p className='elecciones'>{nombre} eligió {jugadaUsuario}</p>
                <p className='elecciones'>La computadora eligió {jugadaComputadora}</p>
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
              setSaludar={setSaludar} setSaludoTerminator={setSaludoTerminator} setSaludoUsuario={setSaludoUsuario} setMute={setMute}
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
      )}
      </header>
    </>
  );
}

export default App;