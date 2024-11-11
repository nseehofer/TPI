const datosSimulados = {
    cursos: [{
        id: 1,
        identificadorCurso: 'curso_uxui',
        nombre: 'Diseño UX/UI',
        precio: 20000,
        duracion: '13 meses',
        modalidad: 'Virtual',
        imagen: '../images/uxui.png',
        imagenIndex: 'images/uxui.png',
        requisitosPrevios: 'Conocimiento básico de Diseño',
        descripcion: 'Aprende los principios fundamentales del diseño UX/UI para crear experiencias de usuario atractivas y funcionales en plataformas digitales',
        modulo1: 'Definiciones básicas de UX y UI',
        modulo2: 'Técnicas de investigación de usuarios',
        modulo3: 'Arquitectura de la información',
        modulo4: 'Prototipado con herramientas como Figma y Adobe XD',
        imagenInstructor: '../images/profesor.png',
        instructor: 'Juan Garay'
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
        descripcion: 'Aprende los conceptos básicos de ciberseguridad para proteger redes y sistemas contra amenazas y ataques.',
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
        precio: 45000,
        duracion: '4 meses',
        modalidad: 'Virtual',
        imagen: '../images/front.jpg',
        imagenIndex: 'images/front.jpg',
        requisitosPrevios: 'Conocimientos básicos de HTML y CSS',
        descripcion: 'Aprende a desarrollar interfaces web modernas y atractivas utilizando HTML, CSS y JavaScript.',
        modulo1: 'Fundamentos de HTML y CSS.',
        modulo2: 'Diseño responsivo con CSS.',
        modulo3: 'Introducción a JavaScript.',
        modulo4: 'Desarrollo de un proyecto web completo.',
        imagenInstructor: '../images/profesor.png',
        instructor: 'Mariano Rodriguez'
    }]
};

localStorage.setItem("datos", JSON.stringify(datosSimulados));

function getCursoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('identificadorCurso');
}

document.addEventListener('DOMContentLoaded', () => {
    const idCurso = getCursoIdFromURL();
    const datosSimulados = JSON.parse(localStorage.getItem('datos'));

    if (Array.isArray(datosSimulados.cursos)) {
        if (idCurso) {
            // Página de detalles del curso
            const cursoDatos = datosSimulados.cursos.find(c => c.identificadorCurso === idCurso);

            if (cursoDatos) {
                const cursoElement = document.querySelector(`#${idCurso}`).closest('.div-curso');
                if (cursoElement) {
                    cursoElement.querySelector('.js-imagen-curso img').src = cursoDatos.imagenIndex;
                    cursoElement.querySelector('.js-imagen-curso img').alt = `Curso de ${cursoDatos.nombre}`;
                    cursoElement.querySelector('.js-titulo-curso').textContent = cursoDatos.nombre;
                    cursoElement.querySelector('.js-precio-curso').innerHTML = `<strong>Valor:</strong> $${cursoDatos.precio}`;
                    cursoElement.querySelector('.js-modalidad-curso').innerHTML = `<strong>Modalidad:</strong> ${cursoDatos.modalidad}`;
                    cursoElement.querySelector('.js-duracion-curso').innerHTML = `<strong>Duración:</strong> ${cursoDatos.duracion}`;
                    cursoElement.querySelector('.js-requisitos-curso').innerHTML = `<strong>Requisitos previos:</strong> ${cursoDatos.requisitosPrevios}`;
                    cursoElement.querySelector('.js-descripcion-curso').innerHTML = `<strong>Descripción:</strong> ${cursoDatos.descripcion}`;
                } else {
                    console.error('Elemento del curso no encontrado.');
                }
            } else {
                console.error('Curso no encontrado.');
            }
        } else {
            // Página de inicio
            const cursos = document.querySelectorAll('.div-curso');

            cursos.forEach(curso => {
                const idCurso = curso.querySelector('.btn-header').id;
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
            });
        }
    } else {
        console.error('Los cursos no son un array.');
    }
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
                carritoListas.forEach(function(elemento) {
                    elemento.appendChild(mensaje.cloneNode(true));
                });
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

function moverCarritoLista() {
    
    const carritoLista = document.querySelector('.carrito-lista');
    const numeroCarrito = document.querySelector('.js-numero-carrito');
        carritoLista.style.left = '-420%';
        numeroCarrito.style.top = '0%';
}


function verificarMediaQuery() {

    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        moverCarritoLista();
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);



document.querySelectorAll('.js_usuario_icon').forEach(icono => {
    icono.style.cursor = 'pointer';

    icono.addEventListener('click', function() {
        const botonesContenedor = document.createElement('div');
        botonesContenedor.className += ' div-contenedor-botones';
        
        botonesContenedor.style.zIndex = '2000';
        botonesContenedor.style.gap = '0.5rem';
        botonesContenedor.style.flexDirection = 'column';
        botonesContenedor.style.right = '6%';
        botonesContenedor.innerHTML = `
            <button class="btn-borrar-usuario js-btn-cerrar-sesion">Cerrar sesión</button>
            <button class="btn-borrar-usuario js-btn-eliminar-cuenta">Eliminar cuenta</button>
        `;

        
        if (icono.nextElementSibling && icono.nextElementSibling.classList.contains('btn-container')) {
            icono.nextElementSibling.remove();
        } else {
            botonesContenedor.classList.add('btn-container');
            icono.insertAdjacentElement('afterend', botonesContenedor);

            
            botonesContenedor.querySelector('.js-btn-cerrar-sesion').addEventListener('click', function() {
                localStorage.removeItem('emailUsuarioLogeado');
                alert('Sesión cerrada');
            });

            botonesContenedor.querySelector('.js-btn-eliminar-cuenta').addEventListener('click', function() {
                const emailUsuarioLogeado = localStorage.getItem('emailUsuarioLogeado');
                if (emailUsuarioLogeado) {
                    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
                    delete usuarios[emailUsuarioLogeado];
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    localStorage.removeItem('emailUsuarioLogeado');
                    alert('Cuenta eliminada');
                } else {
                    alert('No hay usuario logeado.');
                }
            });
        }
    });
});




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


document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const emailUsuarioLogeado = localStorage.getItem('emailUsuarioLogeado');
    
    if (emailUsuarioLogeado) {
        // Lista de páginas donde se debe cambiar el header
        const paginas = [
            '../html/detalleDeCurso.html',
            '../html/carritoDeCompra.html',
              //'../html/giftCard.html', AVISAR A CECI
            '../html/contacto.html',
            '../html/calendario.html'
        ];

        // Obtener la URL actual
        const urlActual = window.location.pathname;

        // Verificar si la URL actual está en la lista de páginas
        if (paginas.includes(urlActual)) {
            // Mostrar los divs que estaban ocultos
            const usuarioIcon = document.querySelectorAll('.js_usuario_icon');
            usuarioIcon.forEach(icono => {
                icono.style.display = 'block';
            });

            // Ocultar los enlaces de "Iniciar Sesión" y "Registrarse"
            const btnsAEliminar = document.querySelectorAll('.btn-a-eliminar');
            btnsAEliminar.forEach(btn => {
                btn.style.display = 'none';
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {

    const emailUsuarioLogeado = localStorage.getItem('emailUsuarioLogeado');
    
    if (emailUsuarioLogeado) {
    
        const usuarioIcons = document.querySelectorAll('.js_usuario_icon');
        usuarioIcons.forEach(icono => {
            icono.style.display = 'block';
        });

   
        const btnsAEliminar = document.querySelectorAll('.btn-a-eliminar');
        btnsAEliminar.forEach(btn => {
            btn.style.display = 'none';
        });
    }
});
