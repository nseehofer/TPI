const datosSimulados = {
    cursos: [{
        id: 1,
        identificadorCurso: 'curso_uxui',
        nombre: 'Diseño UX/UI', // js-titulo-curso
        precio: 20000, // js-precio-curso
        duracion: '13 meses', // js-modalidad-curso
        modalidad: 'Virtual', // js-duracion-curso
        imagen: '../images/uxui.png', // js-img-curso
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

// AGREGUE EL 'MOCKDATA == DATOSSIMULADOS' Y LOS PUSE EN EL LOCALSTORAGE PARA GENERAR LOS CURSOS DINAMICOS
// LA FUNCIONALIDAD PARA COMPLETAR EL DETALLE DE CURSO 

const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];


document.addEventListener('DOMContentLoaded', () => {
    const idCursoSeleccionado = localStorage.getItem('cursoSeleccionado');

    if (idCursoSeleccionado) {
        const datosSimulados = JSON.parse(localStorage.getItem('datos'));

        if (Array.isArray(datosSimulados.cursos)) {
            const curso = datosSimulados.cursos.find(c => c.identificadorCurso === idCursoSeleccionado);

            if (curso) {
                document.querySelector('.js-imagen-curso img').src = curso.imagen;
                document.querySelector('.js-titulo-curso').textContent = curso.nombre;
                document.querySelector('.js-precio-curso').textContent = `$${curso.precio}`;
                document.querySelector('.js-modalidad-curso').textContent = curso.modalidad;
                document.querySelector('.js-duracion-curso').textContent = curso.duracion;
                document.querySelector('.js-requisitos-curso').textContent = curso.requisitosPrevios;
                document.querySelector('.js-descripcion-curso').textContent = curso.descripcion;
                document.querySelector('.js-modulo1').textContent = curso.modulo1;
                document.querySelector('.js-modulo2').textContent = curso.modulo2;
                document.querySelector('.js-modulo3').textContent = curso.modulo3;
                document.querySelector('.js-modulo4').textContent = curso.modulo4;
                document.querySelector('.js-instructor').textContent = curso.instructor;

                const cursosRelacionadosMap = {
                    'curso_uxui': ['curso_full', 'curso_front'],
                    'curso_ciber': ['curso_full', 'curso_uxui'],
                    'curso_full': ['curso_ciber', 'curso_uxui'],
                    'curso_front': ['curso_full', 'curso_uxui']
                };

                const cursosRelacionados = cursosRelacionadosMap[idCursoSeleccionado];

                if (cursosRelacionados) {
                    const cursoRelacionado1 = datosSimulados.cursos.find(c => c.identificadorCurso === cursosRelacionados[0]);
                    if (cursoRelacionado1) {
                        document.querySelector('.js-imagen-curso-relacionado1').src = cursoRelacionado1.imagen;
                        document.querySelector('.js-titulo-curso-relacionado1').textContent = cursoRelacionado1.nombre;
                        document.querySelector('.js-descripcion-curso-relacionado1').textContent = cursoRelacionado1.descripcion;
                        document.querySelector('.js-duracion-curso-relacionado1').textContent = `Duración: ${cursoRelacionado1.duracion}`;
                        document.querySelector('.js-precio-curso-relacionado1').textContent = `Precio: $${cursoRelacionado1.precio}`;
                        document.querySelector('.js-modalidad-curso-relacionado1').textContent = `Modalidad: ${cursoRelacionado1.modalidad}`;

                        const btnDetalle1 = document.querySelector('.js-imagen-curso-relacionado1').closest('.div-curso-destacado-detalle').querySelector('.btn_detalle');
                        btnDetalle1.id = cursoRelacionado1.identificadorCurso;
                        btnDetalle1.addEventListener('click', () => {
                            localStorage.setItem('cursoSeleccionado', cursoRelacionado1.identificadorCurso);
                        });
                    } else {
                        console.error('Primer curso relacionado no encontrado.');
                    }

                    const cursoRelacionado2 = datosSimulados.cursos.find(c => c.identificadorCurso === cursosRelacionados[1]);
                    if (cursoRelacionado2) {
                        document.querySelector('.js-imagen-curso-relacionado2').src = cursoRelacionado2.imagen;
                        document.querySelector('.js-titulo-curso-relacionado2').textContent = cursoRelacionado2.nombre;
                        document.querySelector('.js-descripcion-curso-relacionado2').textContent = cursoRelacionado2.descripcion;
                        document.querySelector('.js-duracion-curso-relacionado2').textContent = `Duración: ${cursoRelacionado2.duracion}`;
                        document.querySelector('.js-precio-curso-relacionado2').textContent = `Precio: $${cursoRelacionado2.precio}`;
                        document.querySelector('.js-modalidad-curso-relacionado2').textContent = `Modalidad: ${cursoRelacionado2.modalidad}`;

                        const btnDetalle2 = document.querySelector('.js-imagen-curso-relacionado2').closest('.div-curso-destacado-detalle').querySelector('.btn_detalle');
                        btnDetalle2.id = cursoRelacionado2.identificadorCurso;
                        btnDetalle2.addEventListener('click', () => {
                            localStorage.setItem('cursoSeleccionado', cursoRelacionado2.identificadorCurso);
                        });
                    } else {
                        console.error('Segundo curso relacionado no encontrado.');
                    }
                } else {
                    console.error('Cursos relacionados no definidos para este curso.');
                }
            } else {
                console.error('Curso no encontrado.');
            }
        } else {
            console.error('Los cursos no son un array.');
        }
    } else {
        console.error('No se encontró el ID del curso seleccionado en el localStorage.');
    }
});



const modal = document.getElementById("modal-inscripcion");
const inscribirseBtn = document.querySelector(".btn.btn-azul");
const closeBtn = document.querySelector(".close");
const closeModalBtn = document.getElementById("close-btn");
const cartCounter = document.querySelector('.js-numero-carrito');

const modalTitle = document.getElementById("modal-course-title");
const modalMode = document.getElementById("modal-course-mode");
const modalDuration = document.getElementById("modal-course-duration");
const modalPrice = document.getElementById("modal-course-price");

//formulario para empresas


function agregarYRedirigirACursoEmpresa() {
    agregarCursoAlCarrito();
    mostrarNumeroYContenidoCarrito();

    const courseTitle = document.querySelector(".js-titulo-curso").textContent;
    const coursePrice = document.querySelector(".js-precio-curso").textContent;

    localStorage.setItem('cursoSeleccionado', courseTitle);
    localStorage.setItem('precioSeleccionado', coursePrice);
    window.location.href = "../html/formularioEmpresa.html";
}

const empresaBtn = document.querySelector(".btn.btn-empresa");
empresaBtn.addEventListener("click", function (event) {
    event.preventDefault();

    agregarYRedirigirACursoEmpresa();
});




inscribirseBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const courseTitle = document.querySelector(".course-title").textContent;

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    const cursoEnCarrito = datosSimulados.cursos.find(c => c.nombre === courseTitle && cursosAgregados.includes(c.id.toString())); if (cursoEnCarrito) {
        alert("Este curso ya está en el carrito.");
        return;
    }

    const courseMode = document.querySelector(".course-mode").textContent;
    const courseDuration = document.querySelector(".course-duration").textContent;
    const coursePrice = document.querySelector(".course-price").textContent;

    modalTitle.textContent = courseTitle;
    modalMode.textContent = courseMode;
    modalDuration.textContent = courseDuration;
    modalPrice.textContent = coursePrice;

    modal.style.display = "block";
});

function agregarCursoAlCarrito() {
    const courseTitle = modalTitle.textContent;
    const curso = cursos.find(c => c.nombre === courseTitle);

    if (!curso) return;

    const courseId = curso.id.toString();
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

    if (!cursosAgregados.includes(courseId)) {
        cursosAgregados.push(courseId);
        sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        numeroActual += 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
        cartCounter.textContent = numeroActual.toString();
    }
}

function cerrarModal() {
    modal.style.display = "none";
    agregarCursoAlCarrito();
    mostrarNumeroYContenidoCarrito();
}

closeBtn.addEventListener("click", cerrarModal);
closeModalBtn.addEventListener("click", cerrarModal);
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        cerrarModal();
    }
});

function mostrarNumeroYContenidoCarrito() {
    const numeroCarritos = document.querySelectorAll('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;

    numeroCarritos.forEach(numeroCarrito => {
        numeroCarrito.textContent = numeroActual.toString();
    });

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

    const carritoListas = document.querySelectorAll('.carrito-lista');

    carritoListas.forEach(carritoLista => {
        carritoLista.innerHTML = '';

        if (cursosAgregados.length === 0) {
            carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
        } else {
            const datosSimulados = JSON.parse(localStorage.getItem('datos'));

            if (Array.isArray(datosSimulados.cursos)) {
                cursosAgregados.forEach(cursoId => {
                    const curso = datosSimulados.cursos.find(c => c.id.toString() === cursoId);
                    if (curso) {
                        const cursoElemento = document.createElement('li');
                        cursoElemento.classList.add('carrito-elemento-lista');
                        cursoElemento.setAttribute('data-id', cursoId);
                        cursoElemento.innerHTML = `
                            <p id="modal-course-title" class="carrito-nombre-curso">${curso.nombre}</p>
                            <p id="modal-course-price" class="carrito-precio-curso">Precio: $${curso.precio}</p>
                            <p id="modal-course-duration" class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
                            <p id="modal-course-mode" class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
                            <button class="btn-borrar" data-id="${cursoId}">Eliminar</button>
                        `;
                        carritoLista.appendChild(cursoElemento);

                        cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                            eliminarCurso(cursoId);
                        });
                    }
                });
            } else {
                console.error('Los cursos no son un array.');
            }
        }
    });
}



function eliminarCurso(cursoId) {
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
    sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    if (numeroActual > 0) {
        numeroActual -= 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);

        document.querySelectorAll('.js-numero-carrito').forEach(numeroCarrito => {
            numeroCarrito.textContent = numeroActual.toString();
        });
    }

    document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
        const cursoElemento = carritoLista.querySelector(`li[data-id="${cursoId}"]`);
        if (cursoElemento) {
            cursoElemento.remove();
        }

        if (cursosAgregados.length === 0) {
            carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
        }
    });
}

function moverCarritoLista() {
    document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
        carritoLista.style.left = '-420%';
    });

    document.querySelectorAll('.js-numero-carrito').forEach(numeroCarrito => {
        numeroCarrito.style.top = '0%';
    });
}



function verificarMediaQuery() {

    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        moverCarritoLista();
        const headerNodo = document.querySelector('.header');
        headerNodo.style.position = 'sticky';
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);



function initCarrito() {
    const pathname = window.location.pathname;
    mostrarNumeroYContenidoCarrito();

}


///////////////////////

document.addEventListener('DOMContentLoaded', eliminarUsuarioOCerrarSesion);

function mostrarBotones() {
    const contenedorBtnUsuarios = document.querySelectorAll('.js_usuario_icon');
    contenedorBtnUsuarios.forEach(contenedorBtnUsuario => {
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
    });
}

function mantenerBotones(event) {
    event.stopPropagation();
}

function ocultarBotones(event) {
    const contenedorLogoUsuarios = document.querySelectorAll('.js_usuario_icon');
    const contenedorBtnUsuarios = document.querySelectorAll('.js_usuario_icon');

    contenedorLogoUsuarios.forEach((contenedorLogoUsuario, index) => {
        const contenedorBtnUsuario = contenedorBtnUsuarios[index];

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
    });
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

    window.location.href = '../index.html';
}

function cerrarSesion() {
    localStorage.removeItem('emailUsuarioLogeado');
    console.log('Email del usuario logeado eliminado del localStorage.');

    window.location.href = '../index.html';
}

function eliminarUsuarioOCerrarSesion() {
    const contenedorLogoUsuarios = document.querySelectorAll('.js_usuario_icon');
    contenedorLogoUsuarios.forEach(contenedorLogoUsuario => {
        if (contenedorLogoUsuario) {
            contenedorLogoUsuario.addEventListener('mouseover', mostrarBotones);
            contenedorLogoUsuario.addEventListener('mouseout', ocultarBotones);
        } else {
            console.error('El elemento .js_usuario_icon no se encontró en el DOM.');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const emailUsuarioLogeado = localStorage.getItem('emailUsuarioLogeado');

    if (emailUsuarioLogeado) {
        const usuarioIcons = document.querySelectorAll('.js_usuario_icon');
        usuarioIcons.forEach(icon => {
            icon.style.display = 'block';
        });

        const btnsAEliminar = document.querySelectorAll('.btn-a-eliminar');
        btnsAEliminar.forEach(btn => {
            btn.style.display = 'none';
        });
    }
});

