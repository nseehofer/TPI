const datosSimulados = {
    cursos: [{
        id: 1,
        identificadorCurso: 'curso_uxui',
        nombre: 'Diseño UX/UI', // js-titulo-curso
        precio: 20000, // js-precio-curso
        duracion: '13 meses', // js-modalidad-curso
        modalidad: 'Virtual', // js-duracion-curso
        imagen: '../images/uxui.png', // js-img-
        imagenIndex: 'images/uxui.png',
        requisitosPrevios: 'Conocimiento básico de Diseño', // js-requisitos-curso // js-descripcion-curso
        descripcion: 'Aprende los principios fundamentales del diseño UX/UI para crear experiencias de usuario atractivas y funcionales en plataformas digitales', // js-descripcion-curso
        modulo1: 'Definiciones básicas de UX y UI', //js-modulo1
        modulo2: 'Técnicas de investigación de usuarios', //js-modulo2
        modulo3: 'Arquitectura de la información', //js-modulo3
        modulo4: 'Prototipado con herramientas como Figma y Adobe XD', //js-modulo4
        imagenInstructor: '../images/profesor.png',
        instructor: 'Juan Garay' //js-instructor
    },
    {
        id: 2,
        identificadorCurso: 'curso_ciber',
        nombre: 'Ciberseguridad',
        precio: 50000,
        duracion: '5 meses',
        modalidad: 'Virtual',
        imagen: '../images/ciberseguridad.png',
        imagenIndex: 'images/ciberseguridad.png',
        requisitosPrevios: 'Conocimiento básico de redes',
        descripcion: ' Aprende los conceptos básicos de ciberseguridad para proteger redes y sistemas contra amenazas y ataques.',
        modulo1: 'Introducción a la ciberseguridad.',
        modulo2: 'Amenazas y vulnerabilidades en redes.',
        modulo3: 'Seguridad en aplicaciones web.',
        modulo4: 'Protocolos y normativas de seguridad.',
        imagenInstructor: '../images/profesor.png',
        instructor: 'Nazareno Montoya'
    },
    {
        id: 3,
        identificadorCurso: 'curso_full',
        nombre: 'Desarrollo Full Stack',
        precio: 60000,
        duracion: '6 meses',
        modalidad: 'Virtual',
        imagen: '../images/fullstack.jpg',
        imagenIndex: 'images/fullstack.jpg',
        requisitosPrevios: 'Conocimientos en desarrollo web básico (HTML, CSS, JavaScript)',
        descripcion: 'Aprende a desarrollar aplicaciones completas, tanto en el frontend como en el backend, utilizando tecnologías modernas.',
        modulo1: 'Fundamentos de desarrollo frontend.',
        modulo2: 'Desarrollo backend con Node.js.',
        modulo3: 'Integración frontend y backend.',
        modulo4: 'Despliegue de aplicaciones web.',
        imagenInstructor: '../images/profesor.png',
        instructor: 'Jorge Narvaez'
    },
    {
        id: 4,
        identificadorCurso: 'curso_front',
        nombre: 'Desarrollo Front End',
        precio: 45000, duracion: '4 meses',
        modalidad: 'Virtual',
        imagen: '../images/front.jpg',
        imagenIndex: 'images/front.jpg',
        requisitosPrevios: 'Conocimientos básicos de HTML y CSS',
        descripcion: ' Aprende a desarrollar interfaces web modernas y atractivas utilizando HTML, CSS y JavaScript.',
        modulo1: 'Fundamentos de HTML y CSS.',
        modulo2: 'Diseño responsivo con CSS.',
        modulo3: 'Introducción a JavaScript.',
        modulo4: 'Desarrollo de un proyecto web completo.',
        imagenInstructor: '../images/profesor.png',
        instructor: 'Mariano Rodriguez'
    }
    ]
    // REVISAR QUE OTROS ELEMENTOS FALTAN AGREGAR AL LOCAL, POR AHORA SOLO ESTAN LOS CURSOS CON SUS DATOS ESCENCIALES
};

localStorage.setItem("datos", JSON.stringify(datosSimulados));


document.addEventListener('DOMContentLoaded', () => {
    const cursos = document.querySelectorAll('.div-curso');

    cursos.forEach(curso => {
        const idCurso = curso.querySelector('.btn-header').id;

        const datosSimulados = JSON.parse(localStorage.getItem('datos'));

        if (Array.isArray(datosSimulados.cursos)) {
            const cursoDatos = datosSimulados.cursos.find(c => c.identificadorCurso === idCurso);

            if (cursoDatos) {
                curso.querySelector('.js-imagen-curso img').src = cursoDatos.imagenIndex;
                curso.querySelector('.js-imagen-curso img').alt = `Curso de ${cursoDatos.nombre}`;
                curso.querySelector('.js-titulo-curso').textContent = cursoDatos.nombre;
                curso.querySelector('.js-precio-curso').innerHTML = `<strong>Valor:</strong> $${cursoDatos.precio}`;
                curso.querySelector('.js-modalidad-curso').innerHTML = `<strong>Modalidad:</strong> ${cursoDatos.modalidad}`;
                curso.querySelector('.js-duracion-curso').innerHTML = `<strong>Duración:</strong> ${cursoDatos.duracion}`;
                curso.querySelector('.js-requisitos-curso').innerHTML = `<strong>Requisitos previos:</strong> ${cursoDatos.requisitosPrevios}`;
                curso.querySelector('.js-descripcion-curso').innerHTML = `<strong>Descripción:</strong> ${cursoDatos.descripcion}`;
            } else {
                console.error('Curso no encontrado.');
            }
        } else {
            console.error('Los cursos no son un array.');
        }
    });
});



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

const todosLosCursos = document.querySelectorAll('.js-curso');
console.log(todosLosCursos);

const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

function initCarrito() {
    const numeroCarrito = document.querySelectorAll('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.forEach(el => el.textContent = numeroActual.toString());

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];

    mostrarMensajeSiCarritoVacio(numeroActual);

    marcarCursosAniadidos(cursosAgregados);

    cursosAgregados.forEach(cursoId => agregarCursoAlCarrito(cursoId));
    giftcardsAgregadas.forEach(giftcard => agregarGiftcardAlCarrito(giftcard));

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
            numeroCarrito.forEach(el => el.textContent = numeroActual.toString());

            cursosAgregados.push(cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            agregarCursoAlCarrito(cursoId);

            mostrarMensajeSiCarritoVacio(numeroActual);
        }
    }

    function agregarCursoAlCarrito(cursoId) {
        const curso = datosSimulados.cursos.find(c => c.id.toString() === cursoId);
        const carritoListas = document.querySelectorAll('.carrito-lista');

        carritoListas.forEach(carritoLista => {
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
        });
    }

    function agregarGiftcardAlCarrito(giftcard) {
        const carritoListas = document.querySelectorAll('.carrito-lista');

        carritoListas.forEach(carritoLista => {
            const giftcardElemento = document.createElement('li');
            giftcardElemento.classList.add('carrito-elemento-lista');
            giftcardElemento.innerHTML = `
                <p class="carrito-nombre-curso">GiftCard</p>
                <p class="carrito-precio-curso">Monto: ${giftcard.monto}</p>
                <button class="btn-borrar">Eliminar</button>
            `;
            carritoLista.appendChild(giftcardElemento);

            giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                eliminarGiftcard(giftcardElemento, giftcard);
            });
        });
    }

    function eliminarGiftcard(giftcardElemento, giftcard) {
        giftcardElemento.remove();

        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        if (numeroActual > 0) {
            numeroActual -= 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            numeroCarrito.forEach(el => el.textContent = numeroActual.toString());
        }

        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        giftcardsAgregadas = giftcardsAgregadas.filter(g => g.monto !== giftcard.monto);
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));

        mostrarMensajeSiCarritoVacio(numeroActual);
    }

    function actualizarContadorYEliminar(cursoElemento, cursoId) {
        const numeroCarrito = document.querySelectorAll('.js-numero-carrito');

        cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
            cursoElemento.remove();

            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            if (numeroActual > 0) {
                numeroActual -= 1;
                sessionStorage.setItem('numeroCarrito', numeroActual);
                numeroCarrito.forEach(el => el.textContent = numeroActual.toString());
            }

            let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
            cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            mostrarMensajeSiCarritoVacio(numeroActual);

            const contenedorCurso = document.querySelectorAll(`#${cursoId}`);
            contenedorCurso.forEach(contenedor => {
                contenedor.classList.remove('aniadido');
                contenedor.removeEventListener('click', handleAgregarCurso);
                contenedor.addEventListener('click', handleAgregarCurso);
            });

            function handleAgregarCurso() {
                agregarCurso(cursoId, cursosAgregados);
            }
        });
    }

    function mostrarMensajeSiCarritoVacio(numeroActual) {
        const carritoListas = document.querySelectorAll('.carrito-lista');
        const mensajeVacio = document.querySelector('.mensaje-vacio');
        if (numeroActual === 0) {
            if (!mensajeVacio) {
                const mensaje = document.createElement('p');
                mensaje.classList.add('mensaje-vacio');
                mensaje.textContent = 'No se agregaron cursos';
                carritoListas.appendChild(mensaje);
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
}

modificarPropiedadSiScriptEjecuta();
/*
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
        contenedorCarritoLista.style.left = '-420%';
    }

    initCarrito();
}


function verificarMediaQuery() {

    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        trasladarCarritoAlHeader();
    }
}
*/
document.addEventListener('DOMContentLoaded', verificarMediaQuery);

window.addEventListener('resize', verificarMediaQuery);

document.addEventListener('DOMContentLoaded', eliminarUsuarioOCerrarSesion);

document.addEventListener('DOMContentLoaded', eliminarUsuarioOCerrarSesion);

function mostrarBotones() {
    const contenedorBtnUsuario = document.querySelector('.js_contenedor_usuario_icon');
    if (contenedorBtnUsuario && !contenedorBtnUsuario.querySelector('.btn-borrar-usuario')) {
        let divParaContenedorBtnUsuario = document.createElement('div');
        divParaContenedorBtnUsuario.innerHTML = `
        <button class="btn-borrar-usuario js-btn-cerrar-sesion">Cerrar sesión</button>
        <button class="btn-borrar-usuario js-btn-eliminar-cuenta">Eliminar cuenta</button>
        `;
        divParaContenedorBtnUsuario.className += ' div-contenedor-botones';
        
        divParaContenedorBtnUsuario.style.zIndex = '2000';
        divParaContenedorBtnUsuario.style.gap = '0.5rem';
        divParaContenedorBtnUsuario.style.flexDirection = 'column';
        divParaContenedorBtnUsuario.style.right = '6%';
        
        contenedorBtnUsuario.appendChild(divParaContenedorBtnUsuario);

        document.querySelector('.js-btn-cerrar-sesion').addEventListener('click', cerrarSesion);
        document.querySelector('.js-btn-eliminar-cuenta').addEventListener('click', eliminarUsuario);
        divParaContenedorBtnUsuario.addEventListener('mouseover', mantenerBotones);
        divParaContenedorBtnUsuario.addEventListener('mouseout', ocultarBotones);
    } else if (contenedorBtnUsuario) {
        const botones = contenedorBtnUsuario.querySelector('.div-contenedor-botones');
        if (botones) {
            botones.style.display = 'flex';
        }
    }
}

function mantenerBotones(event) {
    event.stopPropagation();
}

function ocultarBotones(event) {
    const contenedorLogoUsuario = document.querySelector('.js_usuario_icon');
    const contenedorBtnUsuario = document.querySelector('.js_contenedor_usuario_icon');

    if (!contenedorLogoUsuario || !contenedorBtnUsuario) {
        console.error('No se encontró el contenedor del logo de usuario o el contenedor de botones de usuario.');
        return;
    }

    if (event.relatedTarget !== contenedorLogoUsuario && !contenedorLogoUsuario.contains(event.relatedTarget) &&
        event.relatedTarget !== contenedorBtnUsuario && !contenedorBtnUsuario.contains(event.relatedTarget)) {
        const botones = contenedorBtnUsuario.querySelector('.div-contenedor-botones');
        if (botones) {
            botones.style.display = 'none';
        }
    }
}

function obtenerEmailUsuarioLogeado() {
    return localStorage.getItem('emailUsuarioLogeado');
}

function eliminarUsuario() {
    const emailUsuarioLogeado = obtenerEmailUsuarioLogeado();
    if (!emailUsuarioLogeado) {
        console.error('No se pudo obtener el email del usuario logeado.');
        return;
    }

    console.log('Estado del localStorage antes de eliminar:', localStorage.getItem('usuarios'));

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    if (usuarios[emailUsuarioLogeado]) {
        delete usuarios[emailUsuarioLogeado];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log(`Usuario con email ${emailUsuarioLogeado} eliminado.`);
        console.log('Estado del localStorage después de eliminar:', localStorage.getItem('usuarios'));
    } else {
        console.error(`Usuario con email ${emailUsuarioLogeado} no encontrado.`);
    }

    localStorage.removeItem('emailUsuarioLogeado');
    console.log('Email del usuario logeado eliminado del localStorage.');

    window.location.href = 'index.html';
}

function cerrarSesion() {
    localStorage.removeItem('emailUsuarioLogeado');
    console.log('Email del usuario logeado eliminado del localStorage.');

    window.location.href = 'index.html';
}

function eliminarUsuarioOCerrarSesion() {
    if (window.location.pathname.includes('homeSesionIniciada.html')) {     
        const contenedorLogoUsuario = document.querySelector('.js_usuario_icon');
        if (contenedorLogoUsuario) {
            contenedorLogoUsuario.addEventListener('mouseover', mostrarBotones);
            contenedorLogoUsuario.addEventListener('mouseout', ocultarBotones);
        } else {
            console.error('El elemento .js_usuario_icon no se encontró en el DOM.');
        }
    }
}



// FUNCIONALIDAD PARA GUARDAR ID DEL BOTON VER DETALLE DE CADA CURSO

document.addEventListener('DOMContentLoaded', () => {
    const botonesVerDetalle = document.querySelectorAll('.btn-header');

    botonesVerDetalle.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const idCurso = boton.id;

            localStorage.setItem('cursoSeleccionado', idCurso);

            window.location.href = boton.href;
        });
    });
});
