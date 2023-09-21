import "../App.css";
import Papel from '../img/Papel.jpg';
import Piedra from '../img/Piedra.jpg';
import Tijera1 from '../img/Tijera1.jpg';

function Jugadas({jugadaUsuario, setJugadaUsuario, mensajeOpcionError, setOpcionSeleccionada, opcionSeleccionada }) {

  // Estado para la opción seleccionada
  

  // En el caso de que se seleccione el botón piedra, papel o tijera se cambia el estado de jugadaUsuario y opcionSeleccionada
  const CambioPiedra = (e) => { 
    setJugadaUsuario("piedra");
    setOpcionSeleccionada("piedra");
    console.log("piedra");
    };

    const CambioPapel = (e) => {
      setJugadaUsuario("papel");
      setOpcionSeleccionada("papel");
      console.log("papel");
    };

    const CambioTijera = (e) => {
      setJugadaUsuario("tijera");
      setOpcionSeleccionada("tijera");
      console.log("tijera");
    };

    return (
        <div className="opciones">
              {/*Grupo de opciones para seleccionar*/}
              <div className="botón_imagen">
              {/* Imagen seleccionable de Piedra*/}
                <button
                  type="button"
                  value={jugadaUsuario}
                  id="piedra"
                  // Se agrega la clase opciónSeleccionada con estilo en CSS a botónOpción si es "piedra"
                  className={`botónOpción ${opcionSeleccionada === "piedra" ? "opciónSeleccionada" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={CambioPiedra}
                >
                  <img className="imagen" src={Piedra} alt="piedra" />
                </button>
                {/* Imagen seleccionable de Papel*/}
                <button
                  type="button"
                  value={jugadaUsuario}
                  id="papel"
                  // Se agrega la clase opciónSeleccionada con estilo en CSS a botónOpción si es "papel"
                  className={`botónOpción ${opcionSeleccionada === "papel" ? "opciónSeleccionada" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={CambioPapel}
                >
                  <img className="imagen" src={Papel} alt="papel" />
                </button>
                {/* Imagen seleccionable de Tijera*/}
                <button
                  type="button"
                  value={jugadaUsuario}
                  id="tijera"
                  // Se agrega la clase opciónSeleccionada con estilo en CSS a botónOpción si es "tijera"
                  className={`botónOpción ${opcionSeleccionada === "tijera" ? "opciónSeleccionada" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={CambioTijera}
                >
                  <img className="imagen" src={Tijera1} alt="tijera" />
                </button>
              </div>
              {/*Mensaje oculto; visible en el caso de que no se seleccione una opción*/}
              {mensajeOpcionError && (
                <p id="mensajeSinSeleccion"> ¿Piedra, papel o tijera? </p>
              )}
            </div>
    );
}

export default Jugadas;