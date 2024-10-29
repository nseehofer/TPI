const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual',imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual',imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual',imagen: '../images/front.jpg' }
];

function initCarritoCarritoDeCompra() {
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.textContent = numeroActual.toString();

    // Recuperar cursos agregados desde sessionStorage
    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];

    // Obtener el contenedor principal del carrito
    const articleCursosCarrito = document.querySelector('.js_article_cursos_carrito');
    const carritoLista = document.querySelector('.carrito-lista');

    // Limpiar el contenedor principal del carrito
    articleCursosCarrito.innerHTML = '';
    carritoLista.innerHTML = '';

    // Agregar cursos al carrito
    cursosAgregados.forEach(cursoId => {
        agregarCursoAlCarrito(cursoId);
        agregarCursoALista(cursoId);
    });

    // Actualizar el precio total
    actualizarPrecioTotal();

    // Función para agregar el curso al carrito
    function agregarCursoAlCarrito(cursoId) {
        const curso = cursos.find(c => c.id.toString() === cursoId);
        const divCursoCarrito = document.createElement('div');
        divCursoCarrito.classList.add('div_curso_carrito');
        divCursoCarrito.innerHTML = `
            <div class="div_contenedor_imagen">
                <img src="${curso.imagen}" alt="${curso.nombre}" class="imagen">
            </div>
            <div class="div_contenedor_texto_curso">
                <p class="titulo_curso">${curso.nombre}</p>
                <p>Precio: $${curso.precio}</p>
                <p>Duración: ${curso.duracion} </p>
                <p>Modalidad:${curso.modalidad} </p>
                <button class="btn-borrar-curso" data-id="${cursoId}">Eliminar</button>
            </div>
        `;
        articleCursosCarrito.appendChild(divCursoCarrito);

        // Añadir evento para eliminar el curso
        divCursoCarrito.querySelector('.btn-borrar-curso').addEventListener('click', function () {
            eliminarCurso(cursoId, divCursoCarrito);
        });
    }

    // Función para agregar el curso a la lista visual del carrito
    function agregarCursoALista(cursoId) {
        const curso = cursos.find(c => c.id.toString() === cursoId);
        const cursoElemento = document.createElement('li');
        cursoElemento.classList.add('carrito-elemento-lista');
        cursoElemento.setAttribute('data-id', cursoId);
        cursoElemento.innerHTML = `
            <p class="carrito-nombre-curso">${curso.nombre}</p>
            <p class="carrito-precio-curso">Precio: $${curso.precio}</p>
            <p class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
            <p class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
        `;
        carritoLista.appendChild(cursoElemento);
    }

    // Función para eliminar el curso del carrito
    function eliminarCurso(cursoId, divCursoCarrito) {
        divCursoCarrito.remove();
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        cursosAgregados = cursosAgregados.filter(id => id !== cursoId);
        sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));
        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        if (numeroActual > 0) {
            numeroActual -= 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
        }
        actualizarPrecioTotal();

        // Eliminar el curso de la lista visual del carrito
        const cursoElemento = carritoLista.querySelector(`li[data-id="${cursoId}"]`);
        if (cursoElemento) {
            cursoElemento.remove();
        }
    }

    // Función para actualizar el precio total
    function actualizarPrecioTotal() { 
        const divPrecioTotalCarrito = document.querySelector('.precio_total_carrito');
        let totalPrecio = 0;
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        cursosAgregados.forEach(cursoId => {
            const curso = cursos.find(c => c.id.toString() === cursoId);
            totalPrecio += curso.precio;
        });
        divPrecioTotalCarrito.textContent = `Total: $${totalPrecio}`;
        // Guardar el precio total en sessionStorage
        sessionStorage.setItem('precioTotal', totalPrecio);
    }
}

// Iniciar la función específica para carritoDeCompra.html
if (window.location.pathname.includes('carritoDeCompra.html')) {
    initCarritoCarritoDeCompra();
}

