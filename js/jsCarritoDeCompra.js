const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

function initCarritoCarritoDeCompra() {
    const numeroCarritos = document.querySelectorAll('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarritos.forEach(el => el.textContent = numeroActual.toString());

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];

    const articleCursosCarritos = document.querySelectorAll('.js_article_cursos_carrito');
    const carritoListas = document.querySelectorAll('.carrito-lista');

    articleCursosCarritos.forEach(article => article.innerHTML = '');
    carritoListas.forEach(lista => lista.innerHTML = '');

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
        articleCursosCarritos.forEach(article => {
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
            article.appendChild(divCursoCarrito);

            divCursoCarrito.querySelector('.btn-borrar-curso').addEventListener('click', function () {
                eliminarCurso(cursoId, divCursoCarrito);
            });
        });
    }

    function agregarCursoALista(cursoId) {
        const curso = cursos.find(c => c.id.toString() === cursoId);
        carritoListas.forEach(lista => {
            const cursoElemento = document.createElement('li');
            cursoElemento.classList.add('carrito-elemento-lista');
            cursoElemento.setAttribute('data-id', cursoId);
            cursoElemento.innerHTML = `
                <p class="carrito-nombre-curso">${curso.nombre}</p>
                <p class="carrito-precio-curso">Precio: $${curso.precio}</p>
                <p class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
                <p class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
            `;
            lista.appendChild(cursoElemento);
        });
    }

    function agregarGiftcardAlCarrito(giftcard) {
        articleCursosCarritos.forEach(article => {
            const divGiftcardCarrito = document.createElement('div');
            divGiftcardCarrito.classList.add('div_curso_carrito');
            divGiftcardCarrito.innerHTML = `
                <div class="div_contenedor_texto_curso">
                    <p class="titulo_curso">GiftCard</p>
                    <p class="precio-giftcard">Monto: ${giftcard.monto}</p>
                    <button class="btn-borrar-curso">Eliminar</button>
                </div>
            `;
            article.appendChild(divGiftcardCarrito);

            divGiftcardCarrito.querySelector('.btn-borrar-curso').addEventListener('click', function () {
                eliminarGiftcard(giftcard, divGiftcardCarrito);
            });
        });
    }

    function agregarGiftcardALista(giftcard) {
        carritoListas.forEach(lista => {
            const giftcardElemento = document.createElement('li');
            giftcardElemento.classList.add('carrito-elemento-lista');
            giftcardElemento.innerHTML = `
                <p class="carrito-nombre-curso">GiftCard</p>
                <p class="carrito-precio-curso precio-giftcard">Monto: ${giftcard.monto}</p>
            `;
            lista.appendChild(giftcardElemento);
        });
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
            numeroCarritos.forEach(el => el.textContent = numeroActual.toString());
        }
        actualizarPrecioTotal();
        mostrarMensajeSiCarritoVacio(numeroActual);

        carritoListas.forEach(lista => {
            const cursoElemento = lista.querySelector(`li[data-id="${cursoId}"]`);
            if (cursoElemento) {
                cursoElemento.remove();
            }
        });
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
            numeroCarritos.forEach(el => el.textContent = numeroActual.toString());
        }
        actualizarPrecioTotal();
        mostrarMensajeSiCarritoVacio(numeroActual);

        carritoListas.forEach(lista => {
            const giftcardElemento = lista.querySelector(`li[data-id="${giftcard.monto}"]`);
            if (giftcardElemento) {
                giftcardElemento.remove();
            }
        });
    }

    function actualizarPrecioTotal() {
        const divPrecioTotalCarritos = document.querySelectorAll('.precio_total_carrito');
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

        divPrecioTotalCarritos.forEach(div => div.textContent = `Total: $${totalPrecio}`);
        sessionStorage.setItem('precioTotal', totalPrecio);
    }

    function mostrarMensajeSiCarritoVacio(numeroActual) {
        carritoListas.forEach(lista => {
            const mensajeVacio = lista.querySelector('.mensaje-vacio');
            if (numeroActual === 0) {
                if (!mensajeVacio) {
                    const mensaje = document.createElement('p');
                    mensaje.classList.add('mensaje-vacio');
                    mensaje.textContent = 'No se agregaron cursos';
                    lista.appendChild(mensaje);
                }
            } else {
                if (mensajeVacio) {
                    mensajeVacio.remove();
                }
            }
        });
    }
}

if (window.location.pathname.includes('carritoDeCompra.html')) {
    initCarritoCarritoDeCompra();
}


function moverCarritoLista() {

    const carritoLista = document.querySelector('.carrito-lista');
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    carritoLista.style.left = '-420%';
    numeroCarrito.style.top = '0%';
}

function verificarMediaQuery() {
    const contenedorHeader = document.querySelector('.header');
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        contenedorHeader.style.position = 'static';
        moverCarritoLista();
        initCarritoCarritoDeCompra();

    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);
window.addEventListener('resize', verificarMediaQuery);
