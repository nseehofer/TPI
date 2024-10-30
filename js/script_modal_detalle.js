// Lista de cursos
const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

// Obtener elementos del modal
const modal = document.getElementById("modal-inscripcion");
const inscribirseBtn = document.querySelector(".btn.btn-azul");
const closeBtn = document.querySelector(".close");
const closeModalBtn = document.getElementById("close-btn");
const cartCounter = document.querySelector('.js-numero-carrito');

// Obtener los contenedores de datos para el modal y carrito
const modalTitle = document.getElementById("modal-course-title");
const modalMode = document.getElementById("modal-course-mode");
const modalDuration = document.getElementById("modal-course-duration");
const modalPrice = document.getElementById("modal-course-price");

// Mostrar el modal al hacer clic en "Inscribirse"
inscribirseBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Obtener datos del curso desde el HTML
    const courseTitle = document.querySelector(".course-title").textContent;

    // Verificar si el curso ya está en el carrito
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    const cursoEnCarrito = cursos.find(c => c.nombre === courseTitle && cursosAgregados.includes(c.id.toString()));

    if (cursoEnCarrito) {
        // Si el curso ya está en el carrito, no mostrar el modal
        alert("Este curso ya está en el carrito.");
        return;
    }

    // Obtener y asignar datos del curso para el modal
    const courseMode = document.querySelector(".course-mode").textContent;
    const courseDuration = document.querySelector(".course-duration").textContent;
    const coursePrice = document.querySelector(".course-price").textContent;

    modalTitle.textContent = courseTitle;
    modalMode.textContent = courseMode;
    modalDuration.textContent = courseDuration;
    modalPrice.textContent = coursePrice;

    // Mostrar el modal
    modal.style.display = "block";
});

// Función para agregar el curso al carrito y actualizar el contador
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

// Funciones para cerrar el modal y agregar el curso al carrito sin redirección
function cerrarModal() {
    modal.style.display = "none";
    agregarCursoAlCarrito();
    mostrarNumeroYContenidoCarrito(); // Actualiza el contenido del carrito después de cerrarlo
}

closeBtn.addEventListener("click", cerrarModal);
closeModalBtn.addEventListener("click", cerrarModal);
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
});

// Mostrar el número y contenido del carrito
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
        cursosAgregados.forEach(cursoId => {
            const curso = cursos.find(c => c.id.toString() === cursoId);
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

                // Añadir evento para eliminar el curso
                cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                    eliminarCurso(cursoId);
                });
            }
        });
    }

    actualizarPrecioTotal();
}

// Función para eliminar un curso del carrito
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

    actualizarPrecioTotal();
}

// Actualizar el precio total del carrito
function actualizarPrecioTotal() {
    const divPrecioTotalCarrito = document.querySelector('.precio_total_carrito');
    let totalPrecio = 0;
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    cursosAgregados.forEach(cursoId => {
        const curso = cursos.find(c => c.id.toString() === cursoId);
        if (curso) {
            totalPrecio += curso.precio;
        }
    });
    divPrecioTotalCarrito.textContent = `Total: $${totalPrecio}`;
    sessionStorage.setItem('precioTotal', totalPrecio);
}

// Inicializar el carrito en páginas específicas
function initCarritoEnPaginas(paginas) {
    const pathname = window.location.pathname;
    if (paginas.some(pagina => pathname.includes(pagina))) {
        mostrarNumeroYContenidoCarrito();
    }
}

const paginasConCarrito = [
    'carritoDeCompra.html',
    'detalleDeCurso.html',
    'detalleDeCursoCiber.html',
    'detalleDeCursoFront.html',
    'detalleDeCursoFullStack.html',
    'calendario.html',
    'contacto.html'
];  

initCarritoEnPaginas(paginasConCarrito);
