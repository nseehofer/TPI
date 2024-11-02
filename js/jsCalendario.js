document.addEventListener('DOMContentLoaded', function () {
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    let fechaActual = new Date();
    let indiceMesActual = fechaActual.getMonth();
    let añoActual = fechaActual.getFullYear();

    const mostrarMes = document.querySelector('.p-mes-actual');
    const mostrarMesMovil = document.querySelector('.mostrar_en_movil');
    const flechaIzquierda = document.querySelector('.img-flecha[src*="FlechaIzquierda"]');
    const flechaDerecha = document.querySelector('.img-flecha[src*="FlechaDerecha"]');
    const columnasFecha = document.querySelectorAll('.columna_fecha');

    const cursos = [
        { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png', href: '../html/detalleDeCurso.html' },
        { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png', href: '../html/detalleDeCursoCiber.html' },
        { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg', href: '../html/detalleDeCursoFullStack.html' },
        { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg', href: '../html/detalleDeCursoFront.html' }
    ];

    const cursosPorDia = {
        9: [1, 2],
        26: [4]
    };

    function actualizarCalendario() {
        const nombreMes = nombresMeses[indiceMesActual];
        mostrarMes.textContent = `${nombreMes} ${añoActual}`;
        mostrarMesMovil.innerHTML = `<span class="flecha-mes"><</span> ${nombreMes} <span class="flecha-mes">></span>`;

        const diasEnMes = new Date(añoActual, indiceMesActual + 1, 0).getDate();
        const primerDia = new Date(añoActual, indiceMesActual, 1).getDay();

        columnasFecha.forEach(columna => {
            const contenedoresFecha = columna.querySelectorAll('.contenedor_fecha');
            contenedoresFecha.forEach(contenedor => {
                contenedor.querySelector('.numero_fecha').textContent = '';
                contenedor.querySelector('.contenedor_curso').innerHTML = '';
            });
        });

        let dia = 1;
        for (let i = 0; i < columnasFecha.length; i++) {
            const contenedoresFecha = columnasFecha[i].querySelectorAll('.contenedor_fecha');
            for (let j = 0; j < contenedoresFecha.length; j++) {
                const contenedor = contenedoresFecha[j];
                const numeroFecha = contenedor.querySelector('.numero_fecha');
                if (dia <= diasEnMes) {
                    numeroFecha.textContent = `${dia.toString().padStart(2, '0')}/${(indiceMesActual + 1).toString().padStart(2, '0')}`;

                    const contenedorCurso = contenedor.querySelector('.contenedor_curso');
                    if (cursosPorDia[dia]) {
                        cursosPorDia[dia].forEach(cursoId => {
                            const curso = cursos.find(c => c.id === cursoId);
                            const cursoElemento = document.createElement('p');
                            cursoElemento.className = 'proxima_fecha_curso';
                            cursoElemento.textContent = curso.nombre;
                            cursoElemento.dataset.cursoId = curso.id;
                            contenedorCurso.appendChild(cursoElemento);
                        });
                    }
                }
                dia += 7;
            }
            dia = i + 2;
        }
    }

    function mostrarPopUp(curso, elemento) {
        const popUp = document.createElement('div');
        popUp.className = 'popup-curso';
        popUp.innerHTML = `
            <div class="popup-contenido">
                <img src="${curso.imagen}" alt="${curso.nombre}" class="popup-imagen">
                <p class="texto-popup-curso">${curso.nombre}</p>
                <p class="texto-popup-curso">Precio: $${curso.precio}</p>
                <a href="${curso.href}" class="btn-ver-detalle">Ver Detalle</a>
            </div>
        `;
        document.body.appendChild(popUp);

        popUp.style.position = 'absolute';
        popUp.style.top = '50%';
        popUp.style.left = '50%';
        popUp.style.transform = 'translate(-50%, -50%)';

        document.addEventListener('click', function cerrarPopUp(event) {
            if (!popUp.contains(event.target) && event.target !== elemento) {
                document.body.removeChild(popUp);
                document.removeEventListener('click', cerrarPopUp);
            }
        });
    }

    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('proxima_fecha_curso')) {
            const cursoId = parseInt(event.target.dataset.cursoId, 10);
            const curso = cursos.find(c => c.id === cursoId);
            if (curso) {
                mostrarPopUp(curso, event.target);
            }
        }
    });

    flechaIzquierda.addEventListener('click', function () {
        if (indiceMesActual === 0) {
            indiceMesActual = 11;
            añoActual--;
        } else {
            indiceMesActual--;
        }
        actualizarCalendario();
    });

    flechaDerecha.addEventListener('click', function () {
        if (indiceMesActual === 11) {
            indiceMesActual = 0;
            añoActual++;
        } else {
            indiceMesActual++;
        }
        actualizarCalendario();
    });

    mostrarMesMovil.addEventListener('click', function (event) {
        if (event.target.classList.contains('flecha-mes')) {
            if (event.target.textContent === '<') {
                flechaIzquierda.click();
            } else {
                flechaDerecha.click();
            }
        }
    });

    [flechaIzquierda, flechaDerecha].forEach(flecha => {
        flecha.style.cursor = 'pointer';
    });

    actualizarCalendario();
});

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
