const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

function mostrarNumeroYContenidoCarrito() {
    const numeroCarrito = document.querySelector('.js-numero-carrito');
    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroCarrito.textContent = numeroActual.toString();

    let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];

    const carritoLista = document.querySelector('.carrito-lista');
    carritoLista.innerHTML = '';

    if (cursosAgregados.length === 0 && giftcardsAgregadas.length === 0) {
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

                cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                    eliminarCurso(cursoId);
                });
            }
        });

        giftcardsAgregadas.forEach(giftcard => {
            const giftcardElemento = document.createElement('li');
            giftcardElemento.classList.add('carrito-elemento-lista');
            giftcardElemento.innerHTML = `
                <p class="carrito-nombre-curso">GiftCard</p>
                <p class="carrito-precio-curso">Monto: ${giftcard.monto}</p>
                <button class="btn-borrar">Eliminar</button>
            `;
            carritoLista.appendChild(giftcardElemento);

            giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                eliminarGiftcard(giftcardElemento);
            });
        });
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

    if (cursosAgregados.length === 0 && JSON.parse(sessionStorage.getItem('giftcardsAgregadas')).length === 0) {
        carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
    }
}

function eliminarGiftcard(elemento) {
    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
    const index = Array.from(elemento.parentNode.children).indexOf(elemento);
    giftcardsAgregadas.splice(index, 1);
    sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));

    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    if (numeroActual > 0) {
        numeroActual -= 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
        document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
    }

    elemento.remove();

    const carritoLista = document.querySelector('.carrito-lista');
    if (giftcardsAgregadas.length === 0 && JSON.parse(sessionStorage.getItem('cursosAgregados')).length === 0) {
        carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
    }
}

function initCarrito() {
    const pathname = window.location.pathname;
    mostrarNumeroYContenidoCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('El DOM está completamente cargado y listo para ser manipulado');
    initCarrito();
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const monto = document.querySelector('.giftcard .monto span').innerText;

    let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
    numeroActual += 1;
    sessionStorage.setItem('numeroCarrito', numeroActual);
    document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();

    let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
    giftcardsAgregadas.push({ titulo: 'GiftCard', monto: monto });
    sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));

    const carritoLista = document.querySelector('.carrito-lista');
    const giftcardElemento = document.createElement('li');
    giftcardElemento.classList.add('carrito-elemento-lista');
    giftcardElemento.innerHTML = `
        <p class="carrito-nombre-curso">GiftCard</p>
        <p class="carrito-precio-curso">Monto: ${monto}</p>
        <button class="btn-borrar">Eliminar</button>
    `;
    carritoLista.appendChild(giftcardElemento);

    giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function() {
        eliminarGiftcard(giftcardElemento);
    });

    if (giftcardsAgregadas.length === 0) {
        carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
    }

    mostrarModal();
});

function mostrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);

    modal.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function trasladarCarritoAlHeader() {
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

function trasladarLogoAlHeader() {
    const removerLogooDeLosBotones = document.querySelector('#remover-logueado-de-media-query');
    if (removerLogooDeLosBotones) {
        removerLogooDeLosBotones.remove();
    } 
    const contenedorLogo = document.querySelector('.js-logo-container');
    
    let crearDivParaContenedorLogo = document.querySelector('.js_contenedor_carrito');
    if (!crearDivParaContenedorLogo) {
        crearDivParaContenedorLogo = document.createElement('div');
        crearDivParaContenedorLogo.classList.add('usuario_icon');
        crearDivParaContenedorLogo.classList.add('js_usuario_icon');
        crearDivParaContenedorLogo.innerHTML = `
            <img class="icon-img" src="../iconos/usuario.png" alt="">`;
        contenedorLogo.appendChild(crearDivParaContenedorLogo);
    }
}

function verificarMediaQuery() {
    const contenedorHeader = document.querySelector('.header');
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        contenedorHeader.style.position = 'static';
        trasladarCarritoAlHeader();
        trasladarLogoAlHeader();
        initCarrito();
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);
window.addEventListener('resize', verificarMediaQuery);
