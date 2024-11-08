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
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.textContent = numeroActual.toString();

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    const carritoLista = document.querySelector('.carrito-lista');
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
}


function eliminarCurso(cursoId) {
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
    sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    if (numeroActual > 0) {
        numeroActual -= 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
        document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
    }

    const carritoLista = document.querySelector('.carrito-lista');
    const cursoElemento = carritoLista.querySelector(`li[data-id="${cursoId}"]`);
    if (cursoElemento) {
        cursoElemento.remove();
    }

    if (cursosAgregados.length === 0) {
        carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
    }

}



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
            <img class="img-carrito" src="../images/carritoDeComprasColor.png" alt="CarroDeCompras">
            <a href="./html/carritoDeCompra.html" class="numero-carrito-fijo js-numero-carrito">0</a>
            <ul class="carrito-lista"></ul>`;
        contenedorLogo.appendChild(crearDivParaContenedorCarrito);
        const contenedorCarritoLista = document.querySelector('.carrito-lista');
        contenedorCarritoLista.style.left = '-420%';
    }
}

function verificarMediaQuery() {

    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        trasladarCarritoAlHeader();
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);

window.addEventListener('resize', verificarMediaQuery);



function initCarrito() {
    const pathname = window.location.pathname;
    mostrarNumeroYContenidoCarrito();

}


document.addEventListener('DOMContentLoaded', function () {
    console.log('El DOM está completamente cargado y listo para ser manipulado');
    initCarrito();
});

