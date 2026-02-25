// Paso 1: "Conectamos" los elementos del HTML con nuestro código para poder darles órdenes
const sobre = document.getElementById('sobre-interactivo');
const btnCerrar = document.getElementById('btn-cerrar');
const contenedorSobre = document.getElementById('contenedor-sobre');
const contenedorFoto = document.getElementById('contenedor-foto');
const musica = document.getElementById('musicaFondo');
const instruccion = document.querySelector('.instruccion');
const btnVolver = document.getElementById('btn-volver');

// Variable de control: Sirve para saber si la carta ya se abrió y no repetir la animación
let estaAbierto = false;

// EVENTO 1: ¿Qué pasa cuando ella hace clic en el sobre?
sobre.addEventListener('click', function() {
    // Si el sobre NO está abierto aún...
    if (!estaAbierto) {
        // 1. Le ponemos la "etiqueta" (clase) 'abierto'. 
        // El archivo CSS detecta esto y ejecuta la animación de la solapa y la carta.
        sobre.classList.add('abierto');
        estaAbierto = true; // Actualizamos el estado

        // 2. Ocultamos el texto que decía "Toca el sobre para abrir"
        instruccion.style.transition = "opacity 0.5s";
        instruccion.style.opacity = '0';
        
        // 3. ¡Que suene la música! 
        // Como ella acaba de hacer clic, el navegador (Edge/Chrome/Safari) nos da permiso de reproducir el audio.
        musica.play().catch(function(error) {
            // Por si tiene configurado su navegador con seguridad extrema, evitamos que la página colapse
            console.log("El audio requiere interacción adicional:", error);
        });
    }
});

// EVENTO 2: ¿Qué pasa cuando ella termina de leer y hace clic en "Cerrar carta"?
btnCerrar.addEventListener('click', function(evento) {
    // Esto es muy importante: Evita que el clic en el botón cuente como un clic en el sobre que está debajo
    evento.stopPropagation();

    // 1. Escondemos toda la escena del sobre
    contenedorSobre.classList.remove('visible');
    contenedorSobre.classList.add('oculto');

    // 2. Mostramos la escena de la foto sorpresa
    contenedorFoto.classList.remove('oculto');
    contenedorFoto.classList.add('visible');
    
    // Nota: La música seguirá sonando mientras ve la foto final.
});

// EVENTO 3: ¿Qué pasa cuando hace clic en "Leer de nuevo"?
btnVolver.addEventListener('click', function() {
    // 1. Ocultamos la escena de la foto
    contenedorFoto.classList.remove('visible');
    contenedorFoto.classList.add('oculto');

    // 2. Mostramos de nuevo la escena del sobre
    contenedorSobre.classList.remove('oculto');
    contenedorSobre.classList.add('visible');

    // 3. "Cerramos" el sobre para resetear la experiencia
    sobre.classList.remove('abierto');
    estaAbierto = false; 
    instruccion.style.opacity = '1'; // Volvemos a mostrar el texto "Toca el sobre para abrir"
});