import React, { useEffect, useState } from 'react';

function Resultado({ nombre, puntajeComputadora, puntajeUsuario, numeroDeRonda, setBotonJugar, setImagen1, setImagen2 }) {
  
  // establezco las variables ganadorFinal y CuadroResultadoFinal con su estado inicial
  const [ganadorFinal, setGanadorFinal] = useState(null);
  const [CuadroResultadoFinal, setCuadroResultadoFinal] = useState(false);

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
        console.log("gana la compu");
      } else if (puntajeUsuario > puntajeComputadora) {
        setGanadorFinal("Gana " + nombre);
        setCuadroResultadoFinal(true);
        setBotonJugar(false);
        setImagen1(true);
        console.log("gana el usuario");
      } else {
        setGanadorFinal("Empate");
        setCuadroResultadoFinal(true);
        setBotonJugar(false);
        setImagen1(true);
        setImagen2(true);
        console.log("empate");
      }
    }
  }, [nombre, puntajeComputadora, puntajeUsuario, numeroDeRonda, setBotonJugar, setImagen1, setImagen2]);

  return (
    <>
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