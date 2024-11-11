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


//////////////////

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

document.addEventListener('DOMContentLoaded', function() {
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