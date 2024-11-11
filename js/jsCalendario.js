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


/////////////////////////

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