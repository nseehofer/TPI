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

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];

    const articleCursosCarrito = document.querySelector('.js_article_cursos_carrito');
    const carritoLista = document.querySelector('.carrito-lista');

    articleCursosCarrito.innerHTML = '';
    carritoLista.innerHTML = '';

    cursosAgregados.forEach(cursoId => {
        agregarCursoAlCarrito(cursoId);
        agregarCursoALista(cursoId);
    });

    giftcardsAgregadas.forEach(giftcard => {
        agregarGiftcardAlCarrito(giftcard);
        agregarGiftcardALista(giftcard);
    });

    actualizarPrecioTotal();
    mostrarMensajeSiCarritoVacio(numeroActual);

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

        divCursoCarrito.querySelector('.btn-borrar-curso').addEventListener('click', function () {
            eliminarCurso(cursoId, divCursoCarrito);
        });
    }

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

    function agregarGiftcardAlCarrito(giftcard) {
        const divGiftcardCarrito = document.createElement('div');
        divGiftcardCarrito.classList.add('div_curso_carrito');
        divGiftcardCarrito.innerHTML = `
            <div class="div_contenedor_texto_curso">
                <p class="titulo_curso">GiftCard</p>
                <p class="precio-giftcard">Monto: ${giftcard.monto}</p>
                <button class="btn-borrar-curso">Eliminar</button>
            </div>
        `;
        articleCursosCarrito.appendChild(divGiftcardCarrito);

        divGiftcardCarrito.querySelector('.btn-borrar-curso').addEventListener('click', function () {
            eliminarGiftcard(giftcard, divGiftcardCarrito);
        });
    }

    function agregarGiftcardALista(giftcard) {
        const giftcardElemento = document.createElement('li');
        giftcardElemento.classList.add('carrito-elemento-lista');
        giftcardElemento.innerHTML = `
            <p class="carrito-nombre-curso">GiftCard</p>
            <p class="carrito-precio-curso precio-giftcard">Monto: ${giftcard.monto}</p>
        `;
        carritoLista.appendChild(giftcardElemento);
    }

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
        mostrarMensajeSiCarritoVacio(numeroActual);

        const cursoElemento = carritoLista.querySelector(`li[data-id="${cursoId}"]`);
        if (cursoElemento) {
            cursoElemento.remove();
        }
    }

    function eliminarGiftcard(giftcard, divGiftcardCarrito) {
        divGiftcardCarrito.remove();
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        giftcardsAgregadas = giftcardsAgregadas.filter(g => g.monto !== giftcard.monto);
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));
        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        if (numeroActual > 0) {
            numeroActual -= 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
        }
        actualizarPrecioTotal();
        mostrarMensajeSiCarritoVacio(numeroActual);

        const giftcardElemento = carritoLista.querySelector(`li[data-id="${giftcard.monto}"]`);
        if (giftcardElemento) {
            giftcardElemento.remove();
        }
    }

    function actualizarPrecioTotal() { 
        const divPrecioTotalCarrito = document.querySelector('.precio_total_carrito');
        let totalPrecio = 0;
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        
        cursosAgregados.forEach(cursoId => {
            const curso = cursos.find(c => c.id.toString() === cursoId);
            totalPrecio += curso.precio;
        });

        giftcardsAgregadas.forEach(giftcard => {
            const monto = parseFloat(giftcard.monto.replace('$', ''));
            if (!isNaN(monto)) {
                totalPrecio += monto;
            }
        });

        divPrecioTotalCarrito.textContent = `Total: $${totalPrecio}`;
        sessionStorage.setItem('precioTotal', totalPrecio);
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

if (window.location.pathname.includes('carritoDeCompra.html')) {
    initCarritoCarritoDeCompra();
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
    const contenedorHeader = document.querySelector('.header');
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        contenedorHeader.style.position = 'static';
        trasladarCarritoAlHeader();
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);
window.addEventListener('resize', verificarMediaQuery);
