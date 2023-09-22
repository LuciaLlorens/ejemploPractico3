# Piedra, Papel o Tijera

El proyecto consiste en crear una aplicación React del popular juego de manos del mismo nombre.

## Comenzando 🚀

Este proyecto es realizado en el marco del trabajo práctico número 3 del curso "Páginas Web con Componentes Dinámicos" dictado por FAMAF-UNC, en el plan Argentina Programa 4.0.
Es un juego simple pasado a una aplicación React, reversionado del trabajo práctico 2. Esta aplicación permite a los usuarios realizar una partida de piedra, papel y tijera contra la computadora.
Este proyecto en términos visuales contiene una página inicial en la cual se detallan las instrucciones del juego, muy simples. Posteriormente, si el usuario presiona continuar, se da lugar a un cuadro de texto para ingresar el nombre del jugador, un cuadro con opciones para elegir piedra, papel o tijeras y botones que permiten iniciar las partidas y limpiar (entre otras cuestiones relacionadas con el estilo, como son bordes, imagenes, sombras, cambios de tamaño, etc. que hacen a la estética de la página web).
Esta página se encuentra integrada por diversos archivos que construyen a su funcionalidad. Anduve interviniendo aquellos que se encontraban en la carpeta source, así como public en el caso del logo de la ventana web.

### Pre-requisitos 📋

Para poder ejecutar el juego solamente se necesita una aplicación que permita abrir páginas web, como Google Chrome, Firefox, Opera, Internet Explorer, etc. 

### Reglas del juego

Las reglas son las mismas que las del juego clásico de manos. La piedra rompe la tijera, la tijera corta el papel y el papel envuelve a la piedra.
El juego finaliza, en el caso de la página web, tras cinco rondas jugadas o cuando haya tres rondas ganadas por el jugador o la computadora.

## Ejecutando las pruebas ⚙️

Se realizaron repetidas pruebas para revisar el correcto funcionamiento de la página. Sinceramente fue un proyecto muy complejo para mí de realizar, debido a que no entendía bien cómo funcionaba una aplicación React. Mis mayores complicaciones y en las cuales más tiempo invertí para solucionar fueron los problemas de actualización de estados y el paso de información entre componentes.
Al segundo problema lo solucioné creando estados "globales" en el componente padre, los cuales luego los hijos podían usar e iban modificando (props, algo que me costó un tiempo entender cómo hacer). Al primer problema terminé solucionándolo a partir de crear constantes locales en los componentes hijos y definiendo sus estados con las globales:
por ej:
* en componente padre:

---
const [nombre, setNombreJugador] = useState(null);

que luego se actualizaba con lo ingresado en el input, pero no se encontraba actualizado al llamarlo en el resultado de la ronda que se encontraba en una función del componente Juego.

Por lo que
* en componente hijo Juego:

---
const [nombreLocal, setNombreLocal] = useState(nombre);
useEffect(() => {
        setNombreLocal(nombre);
    }, [nombre]);
Y luego esta constante local era llamada a la función requerida a la hora de que se apretara un botón:
const handleJugarClick = () => {
        MostrarMensajeNombreError();
        MostrarMensajeOpcionError();
        OcultarInterfaz();

        if (!auxiliarNombreError && !auxiliarOpcionError) {
            const obtuveJugadaComputadora = ObtenerJugadaComputadora()
            const resultadoRonda = ResultadoJuego(obtuveJugadaComputadora, jugadaUsuarioLocal, nombreLocal);
            setGanadorRonda(resultadoRonda);
            SumaPuntajes(resultadoRonda);
            aumentoNumeroRondas();
        }
      };


De esta forma "forzaba" su actualización para hacer funcionar las funciones que necesitaban los estados actualizados; en este caso ResultadoJuego().
Otra forma, en el caso de problemas con la actualización de datos y visualización de los mensajes de error, fue crear variables locales que fueran iguales a las globales:

---
let auxiliarNombreError = false;
const MostrarMensajeNombreError = () => {
        if (nombreLocal === null) {
            setMensajeNombreError(true);
            auxiliarNombreError = true;
        } else {
            setMensajeNombreError(false);
            auxiliarNombreError = false;
            setSaludar(true);
            setLabel(false);
            setInput(false);
        }
    };


Tras estas correcciones afortunadamente el juego en términos de su lógica comenzó a funcionar correctamente y a dejar de tirar casos default (algo que sucedía continuamente en la primera ronda de ResultadoJuego()).

Posteriormente, cuando quise realizar mejoras en la visualización del proyecto, tuve algunos problemas con la posibilidad de ponerle música de fondo a la página. 
Tras idas y vueltas terminé comprendiendo que el problema tenía relación con la mayoría de los navegadores, los cuales bloquean el sonido de las páginas web que se reproducen automáticamente al abrir la página (autoPlay) debido a políticas de usuario. Por lo que por esto decidí hacer la primera pantalla en la cual se mostraban las instrucciones del juego y el botón comenzar, ya que si se interactúa con la página ya es posible que la música se reproduzca en autoPlay, lo cual sucede al apretar el botón comenzar.
Posteriormente mi problema fue cuando quise personalizar el final del juego con audios, los cuales se veían tapados bajo la música; por lo que tuve que frenar el audio de música de fondo al finalizar el juego, y a volver a activarlo tras el botón de reiniciar.

En otros términos utilicé todas las recomendaciones que dejaron les profes en el pdf con las consignas del tp3. Principalmente el uso de props, useState, onClick, etc.. Además de los problemas recién descriptos, otros no implican tanta complejidad que implique una detallada explicación. Como dije anteriormente, tuve problemas con el paso de datos entre componentes por lo que en un principio no sabía cómo ordenar y reordenar los componentes ya que algunos implicaban el paso de funciones de un lado a otro entre los hijos; por lo que decidí reordenarlo de forma que no sucediera esto y solamente pasara los estados que había definido en el padre, estados que luego iba cambiando en uno u otro componente de acuerdo a la necesidad. Una vez que entendí el paso de props y que la información se pasaba de padre a hijo y no de hijo a hijo, todo fue mucho más fluido, lo que me permitió hacia el final del proyecto personalizar con audios o cambiar el saludo sin tanta complejidad como me hubiera sido si intentaba en un principio.

Para finalizar este segmento, los resultados obtenidos y esperados fueron:

* Al ingresar a la página web se ve correctamente la primera pantalla de comienzo, al apretar el botón comenzar se sucede a la siguiente pantalla de forma correcta, así como se comienza a escuchar la música de fondo. El botón de silenciar también funciona correctamente.
* Al no ingresar un nombre y apretar el botón "Jugar!" se obtiene un mensaje que pide que se ingrese un nombre.
* Al no ingresar una opción (piedra, papel o tijera) y apretar el botón "Jugar!" se obtiene un mensaje que pregunta al usuario si quiere elegir piedra, papel o tijera.
* Al ingresar los datos necesarios y apretar le botón "Jugar!" se obtienen los resultados esperados, el juego corre correctamente. Se muestra correctamente el número de ronda, así como las elecciones de la computadora y el jugador; se muestra correctamente el mensaje de quién ha ganado la ronda.
* Al intentar otra ronda se van contando los puntajes de los jugadores de forma correcta.
* El juego finaliza correctamente al sucederse la quinta ronda o al haber un ganador de tres de ellas. Se visualiza bien el mensaje de ganador final y las imagenes. Así como también el saludo y los audios, la música de fondo se frena correctamente.
* El botón reiniciar funciona como se esperaba, todos los estados vuelven a un inicio, pero sin la página de comienzo.

Personalmente considero que me hubiera gustado contar con más conocimientos para mejorar visualmente el trabajo.
Una situación que sigo teniendo pendiente desde el trabajo práctico anterior es la transición de las imagenes finales. Tuve que dejar su ingreso "abrupto" debido a que no podía hacer que gradualmente cambiaran su opacidad, así como también hacer el responsive. Otros problemas que pude haber tenido están indicados en el archivo JS.
Aun así me alegro de haber podido modificar otras cosas que había anotado como pendientes en el Readme del trabajo práctico anterior, como la pantalla de comienzo con las instrucciones de juego, así como también que el cuadro con la información de las rondas no se modifique constantemente de acuerdo a su contenido. 
## Construido con 🛠️

* React.
* Visual Studio Code.
* Reconozco así también la utilización de medios alternativos para solucionar problemas o dudas que surgieran, como ChatGPT, en el caso principalmente de tratar de subir o bajar el volumen de la música de fondo y los audios finales (algo que terminé resolviendo de otra forma debido a que no estaba encontrando soluciones que me funcionaran).
* paleta de colores extraída de https://coolors.co. No hubo una específica, fueron rejuntes de varias paletas seleccionadas de acuerdo a una estética "cyberpunk" y "cyberpunk pastel".
* imagenes extraídas de Google.

## Versionado 📌

Esta es la primera versión del proyecto en React, la segunda versión de una página web de piedra, papel o tijeras (si contamos el trabajo práctico 2).

## Autores ✒️

* **Lucía Alén Llorens** - [LuciaLlorens](https://github.com/LuciaLlorens)

## Licencia 📄

Este proyecto no se encuentra bajo licencia.

## Expresiones de Gratitud 🎁

* Quiero agradecer a les profesores de Argentina Programa 4.0 por, además de sus claras explicaciones, poner a diposición de les alumnes las grabaciones de las clases y demás recursos, los cuales me posibilitaron llevar adelante el proyecto encomendado.
* Agradezco también a mi compañero que me brindó su opinión sobre cualquier problema que pude tener y me colaboró a tener más tiempo para dedicar al trabajo.
* Agradezco también al creador del template, sin cuya estructura habría estado muy perdida para llevar adelante el archivo README: [Villanuevand](https://github.com/Villanuevand). 