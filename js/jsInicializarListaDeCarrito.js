const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual',imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual',imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual',imagen: '../images/front.jpg' }
];

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
                    <p class="carrito-nombre-curso">${curso.nombre}</p>
                    <p class="carrito-precio-curso">Precio: $${curso.precio}</p>
                    <p class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
                    <p class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
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
}

function eliminarCurso(cursoId) {
    // Eliminar el curso del sessionStorage
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
    sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

    // Actualizar el número de elementos en el carrito
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    if (numeroActual > 0) {
        numeroActual -= 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
        document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
    }

    // Eliminar el curso de la lista visual del carrito
    const carritoLista = document.querySelector('.carrito-lista');
    const cursoElemento = carritoLista.querySelector(`li[data-id="${cursoId}"]`);
    if (cursoElemento) {
        cursoElemento.remove();
    }

    // Mostrar mensaje si el carrito está vacío
    if (cursosAgregados.length === 0) {
        carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
    }

    // Actualizar el precio total
    actualizarPrecioTotal();
}

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
