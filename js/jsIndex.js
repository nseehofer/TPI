/* CONSIGNA

 El SlideroCarousel mostrará al menos 3 imágenes, las cuales iterarán
 automáticamente y se debe permitir adicionalmente la elección de una imagen en
 particular

*/

// CLASES A UTILIZAR 
// js-traslacion 
// js_contenedor_imagen_carrousel
// js-img-carrousel

window.onload = function () {
    const imagenes = ['./images/sliderImagen.jpeg', './images/sliderImagen2.jpeg', './images/sliderImagen3.jpeg'];
    let indice = 0;
    const imagen = document.querySelector('.js-img-carrousel');
    let intervalo;

    if (imagen) {
        function cambiarImagen() {
            imagen.classList.add('transicion'); // Inicia la animación de desvanecimiento

            setTimeout(() => {
                indice = (indice + 1) % imagenes.length;
                imagen.src = imagenes[indice];
                imagen.classList.remove('transicion'); // Quita la clase después de cambiar la imagen
                console.log('Imagen cambiada a:', imagenes[indice]);
            }, 1000); // Espera el tiempo de la transición antes de cambiar la imagen
        }

        function iniciarIntervalo() {
            intervalo = setInterval(cambiarImagen, 3500); // Cambia la imagen cada 2 segundos
        }

        function detenerIntervalo() {
            clearInterval(intervalo); // Detiene el cambio de imagen
        }

        iniciarIntervalo(); // Inicia el intervalo al cargar la página

        // Agregar funcionalidad para seleccionar imagen
        const botones = document.querySelectorAll('.selector button');
        botones.forEach(button => {
            button.addEventListener('click', function () {
                detenerIntervalo(); // Detiene el cambio automático de imágenes
                indice = parseInt(this.getAttribute('data-index'));
                imagen.src = imagenes[indice];
                console.log('Imagen seleccionada:', imagenes[indice]);
            });
        });
    } else {
        console.error('No se encontró el elemento con la clase "js-img-carrousel".');
    }
};


/*
    El contador de cursos obtenidos tendrá un número que se irá incrementando a medida
    que vayamos clickeando sobre los botones “Comprar”/”Inscribirse”. El valor que toma
    el contador se debe almacenar en el sessionstorage para que no se “pierda” durante la
    navegación.
*/

// 1RO ALOJO TODOS LOS CURSOS EN UN ARRAY PARA ACCEDER A SUS CONTENIDOS EN SUS ETIQUETAS HTML
// 2DO CREO MI CONSTANTE DE CURSOS CON LOS DATOS QUE ME INTERESAN 
// 3RO UTILIZO A GUSTO ESA CONSTANTE  

const todosLosCursos = document.querySelectorAll('.js-curso');
console.log(todosLosCursos);

const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual',imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual',imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual',imagen: '../images/front.jpg' }
];

// Inicializar el carrito
function initCarrito() {
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.textContent = numeroActual.toString();

    // Recuperar cursos agregados desde sessionStorage
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    
    // Mostrar mensaje si no hay cursos agregados
    mostrarMensajeSiCarritoVacio(numeroActual);

    // Marcar cursos ya añadidos
    marcarCursosAniadidos(cursosAgregados);

    // Mostrar cursos en el carrito
    cursosAgregados.forEach(cursoId => agregarCursoAlCarrito(cursoId));

    // Marcar los cursos que ya están en el carrito
    function marcarCursosAniadidos(cursosAgregados) {
        const contenedoresCarritoCurso = document.querySelectorAll('.js-carrito-curso');
        contenedoresCarritoCurso.forEach(contenedor => {
            const cursoId = contenedor.getAttribute('id');
            if (cursosAgregados.includes(cursoId)) {
                contenedor.classList.add('aniadido');
            } else {
                contenedor.classList.remove('aniadido'); // Asegúrate de eliminar la clase si no está en el carrito
            }
    
            // Asegurarse de que el evento click solo se añada una vez
            contenedor.removeEventListener('click', handleAgregarCurso);
            if (!cursosAgregados.includes(cursoId)) { // Solo añadir el evento si el curso no está en el carrito
                contenedor.addEventListener('click', handleAgregarCurso);
            }
    
            function handleAgregarCurso() {
                agregarCurso(cursoId, cursosAgregados);
            }
        });
    }

    // Agregar curso al carrito
    function agregarCurso(cursoId, cursosAgregados) {
        // Actualizar la lista de cursos agregados desde sessionStorage
        cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

        // Verificar si el curso ya está en el carrito
        if (!cursosAgregados.includes(cursoId)) {
            // Actualizar contador
            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            numeroActual += 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();

            // Agregar curso a la lista de cursos agregados
            cursosAgregados.push(cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            agregarCursoAlCarrito(cursoId);

            // Ocultar mensaje de carrito vacío
            mostrarMensajeSiCarritoVacio(numeroActual);
        }
    }

    // Función para agregar el curso a la lista visual del carrito
    function agregarCursoAlCarrito(cursoId) {
        const curso = cursos.find(c => c.id.toString() === cursoId);
        const carritoLista = document.querySelector('.carrito-lista');

        const cursoElemento = document.createElement('li');
        cursoElemento.classList.add('carrito-elemento-lista');
        cursoElemento.innerHTML = `
            <p class="carrito-nombre-curso">${curso.nombre}</p>
            <p class="carrito-precio-curso">Precio: $${curso.precio}</p>
            <p class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
            <p class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
            <button class="btn-borrar" data-id="${cursoId}">Eliminar</button>
        `;
        carritoLista.appendChild(cursoElemento);

        // Actualizar contador y manejar eliminación
        actualizarContadorYEliminar(cursoElemento, cursoId);
    }

    // Actualizar contador y eliminar curso
    function actualizarContadorYEliminar(cursoElemento, cursoId) {
        const numeroCarrito = document.querySelector('.js-numero-carrito');

        cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
            cursoElemento.remove();

            // Disminuir el contador solo en 1
            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            if (numeroActual > 0) {
                numeroActual -= 1;
                sessionStorage.setItem('numeroCarrito', numeroActual);
                numeroCarrito.textContent = numeroActual.toString();
            }

            // Eliminar el curso de la lista de cursos agregados
            let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
            cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            // Mostrar mensaje si el carrito está vacío
            mostrarMensajeSiCarritoVacio(numeroActual);

            // Permitir agregar el curso nuevamente
            const contenedorCurso = document.getElementById(cursoId);
            if (contenedorCurso) {
                contenedorCurso.classList.remove('aniadido');
                contenedorCurso.removeEventListener('click', handleAgregarCurso);
                contenedorCurso.addEventListener('click', handleAgregarCurso);

                function handleAgregarCurso() {
                    agregarCurso(cursoId, cursosAgregados);
                }
            }
        });
    }

    // Mostrar mensaje si el carrito está vacío
    function mostrarMensajeSiCarritoVacio(numeroActual) {
        const carritoLista = document.querySelector('.carrito-lista');
        const mensajeVacio = document.querySelector('.mensaje-vacio');

        if (numeroActual === 0) {
            if (!mensajeVacio) {
                const mensaje = document.createElement('p');
                mensaje.classList.add('mensaje-vacio');
                mensaje.textContent = 'No se agregaron cursos';
                carritoLista.appendChild(mensaje);
            }
        } else {
            if (mensajeVacio) {
                mensajeVacio.remove();
            }
        }
    }
}

// Iniciar la aplicación
initCarrito();





