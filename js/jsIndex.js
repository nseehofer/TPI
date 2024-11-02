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
            imagen.classList.add('transicion'); 

            setTimeout(() => {
                indice = (indice + 1) % imagenes.length;
                imagen.src = imagenes[indice];
                imagen.classList.remove('transicion'); 
                console.log('Imagen cambiada a:', imagenes[indice]);
            }, 1000); 
        }

        function iniciarIntervalo() {
            intervalo = setInterval(cambiarImagen, 3500); 
        }

        function detenerIntervalo() {
            clearInterval(intervalo); 
        }

        iniciarIntervalo(); 

        const botones = document.querySelectorAll('.selector button');
        botones.forEach(button => {
            button.addEventListener('click', function () {
                detenerIntervalo(); 
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
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

function initCarrito() {
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.textContent = numeroActual.toString();

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

    mostrarMensajeSiCarritoVacio(numeroActual);

    marcarCursosAniadidos(cursosAgregados);

    cursosAgregados.forEach(cursoId => agregarCursoAlCarrito(cursoId));

    function marcarCursosAniadidos(cursosAgregados) {
        const contenedoresCarritoCurso = document.querySelectorAll('.js-carrito-curso');
        contenedoresCarritoCurso.forEach(contenedor => {
            const cursoId = contenedor.getAttribute('id');
            if (cursosAgregados.includes(cursoId)) {
                contenedor.classList.add('aniadido');
            } else {
                contenedor.classList.remove('aniadido');
            }

            contenedor.removeEventListener('click', handleAgregarCurso);
            if (!cursosAgregados.includes(cursoId)) {
                contenedor.addEventListener('click', handleAgregarCurso);
            }

            function handleAgregarCurso() {
                agregarCurso(cursoId, cursosAgregados);
            }
        });
    }

    function agregarCurso(cursoId, cursosAgregados) {
        cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

        if (!cursosAgregados.includes(cursoId)) {
            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            numeroActual += 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();

            cursosAgregados.push(cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            agregarCursoAlCarrito(cursoId);

            mostrarMensajeSiCarritoVacio(numeroActual);
        }
    }

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

        actualizarContadorYEliminar(cursoElemento, cursoId);
    }

    function actualizarContadorYEliminar(cursoElemento, cursoId) {
        const numeroCarrito = document.querySelector('.js-numero-carrito');

        cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
            cursoElemento.remove();

            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            if (numeroActual > 0) {
                numeroActual -= 1;
                sessionStorage.setItem('numeroCarrito', numeroActual);
                numeroCarrito.textContent = numeroActual.toString();
            }

            let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
            cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));


            mostrarMensajeSiCarritoVacio(numeroActual);


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

initCarrito();



function modificarPropiedadSiScriptEjecuta() {
    if (window.location.pathname.includes('homeSesionIniciada.html')) {
        const contenedorListaCarrito = document.querySelector('.carrito-lista');
        contenedorListaCarrito.classList.add('carrito-lista-sesion');
    }
};


modificarPropiedadSiScriptEjecuta();


function trasladarCarritoAlHeader() {
    console.log('Ejecutando trasladarCarritoAlHeader');
    const removerCarritoDeLosBotones = document.querySelector('#remover-carrito-de-media-query');
    if (removerCarritoDeLosBotones) {
        removerCarritoDeLosBotones.remove();
    } 
    const contenedorLogo = document.querySelector('.js-logo-container');
    let crearDivParaContenedorCarrito = document.querySelector('.js_contenedor_carrito');
    if (!crearDivParaContenedorCarrito) {
        crearDivParaContenedorCarrito = document.createElement('div');
        crearDivParaContenedorCarrito.classList.add('contenedor_carrito_btn');
        crearDivParaContenedorCarrito.style.zIndex = '2000';
        crearDivParaContenedorCarrito.style.width = 'auto';
        crearDivParaContenedorCarrito.classList.add('contenedor_carrito');
        crearDivParaContenedorCarrito.classList.add('js_contenedor_carrito');
        crearDivParaContenedorCarrito.innerHTML = `
            <img class="img-carrito" src="images/carritoDeComprasColor.png" alt="CarroDeCompras">
            <a href="./html/carritoDeCompra.html" class="numero-carrito-fijo js-numero-carrito">0</a>
            <ul class="carrito-lista"></ul>`;
        contenedorLogo.appendChild(crearDivParaContenedorCarrito);
        const contenedorCarritoLista = document.querySelector('.carrito-lista');
        contenedorCarritoLista.style.left ='-420%';
    }
}

function verificarMediaQuery() {
    
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if ( mediaQuery768.matches || mediaQuery575.matches) {
        trasladarCarritoAlHeader();
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);

window.addEventListener('resize', verificarMediaQuery);
