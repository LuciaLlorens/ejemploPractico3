import React, { useEffect, useState } from 'react';
import hastaLaVista from '../audio/hastaLaVista.mp3';
import volvere1 from '../audio/volvere1.mp3';

function Resultado({ nombre, puntajeComputadora, puntajeUsuario, numeroDeRonda, setBotonJugar, setImagen1, setImagen2, 
  setSaludar, setSaludoTerminator, setSaludoUsuario, setMute }) {
  
  // establezco las variables ganadorFinal y CuadroResultadoFinal con su estado inicial
  const [ganadorFinal, setGanadorFinal] = useState(null);
  const [CuadroResultadoFinal, setCuadroResultadoFinal] = useState(false);
  const [audioCompu, setAudioCompu] = useState(false);
  const [audioUsuario, setAudioUsuario] = useState(false);

  // Establezco que en el caso de una serie de condiciones se obtenga el ganador final del juego
  useEffect(() => {
    console.log("puntajeComputadora:", puntajeComputadora);
    console.log("puntajeUsuario:", puntajeUsuario);
    console.log("numeroDeRonda:", numeroDeRonda);

    if (puntajeComputadora === 3 || puntajeUsuario === 3 || numeroDeRonda === 5) {
      // Lógica para determinar el ganador final
      if (puntajeComputadora > puntajeUsuario) {
        setGanadorFinal("Gana la computadora");
        setCuadroResultadoFinal(true);
        // en el caso de se obtenga un ganador final saco el botón jugar
        setBotonJugar(false);
        setImagen2(true);
        setSaludar(false);
        setSaludoTerminator(true);
        setMute(true);
        setAudioCompu(true);
        console.log("gana la compu");
      } else if (puntajeUsuario > puntajeComputadora) {
        setGanadorFinal("Gana " + nombre);
        setCuadroResultadoFinal(true);
        setBotonJugar(false);
        setImagen1(true);
        setSaludar(false);
        setSaludoUsuario(true);
        setMute(true);
        setAudioUsuario(true);
        console.log("gana el usuario");
      } else {
        setGanadorFinal("Empate");
        setCuadroResultadoFinal(true);
        setBotonJugar(false);
        setImagen1(true);
        setImagen2(true);
        setSaludar(false);
        setSaludoUsuario(true);
        setMute(true);
        setAudioUsuario(true);
        console.log("empate");
      }
    }
  }, [nombre, puntajeComputadora, puntajeUsuario, numeroDeRonda, setBotonJugar, setImagen1, setImagen2, setSaludar, setSaludoTerminator, setSaludoUsuario, setAudioCompu, setAudioUsuario, setMute]);

  return (
    <>
      {audioCompu && (
            <audio autoPlay volume={1.0}>
              <source src={hastaLaVista} type="audio/mpeg" />
            </audio>
          )}
      {audioUsuario && (
            <audio autoPlay volume={1.0}>
              <source src={volvere1} type="audio/mpeg" />
            </audio>
          )}
      {CuadroResultadoFinal && (
        <div className="resultadoFinal" id="resultadoFinal_">
            <p id="títuloResultadoFinal">Resultado final:</p>
            <p id="resultadoFinal">{ganadorFinal}</p>
        </div>
        
    )};
    </>
  );
}

export default Resultado;