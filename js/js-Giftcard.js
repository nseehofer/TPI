const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('input[placeholder="Nombre Destinatario"]').oninput = function () {
        document.getElementById('nombre-destinatario').innerText = this.value;
    };

    document.querySelectorAll('input[name="color"]').forEach(function (radio) {
        radio.onchange = function () {
            let color;
            switch (this.value) {
                case 'amarillo': color = 'yellow'; break;
                case 'rojo': color = 'red'; break;
                case 'verde': color = 'green'; break;
                case 'azul': color = 'blue'; break;
                case 'blanco': color = 'white'; break;
                case 'negro': color = 'black'; break;
            }
            document.getElementById('nombre-destinatario').style.color = color;
        }
    });

    document.querySelectorAll('input[name="font-size"]').forEach(function (radio) {
        radio.onchange = function () {
            let fontSize = this.value;
            document.getElementById('nombre-destinatario').style.fontSize = fontSize;
        }
    });

    document.getElementById('monto_input').oninput = function () {
        document.querySelector('.giftcard .monto span').innerText = '$' + this.value;
    };

    document.querySelectorAll('input[name="ubicacion"]').forEach(function (radio) {
        radio.onchange = function () {
            let posicion = this.value;
            let monto = document.getElementById('monto');
            monto.className = 'monto ' + posicion;
        }
    });

    
    document.querySelectorAll('input[name="opcion"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            const backgrounds = {
                1: '../images/hexagonos-naranja.jpg',
                2: '../images/circuitos.jpg',
                3: '../images/ia.jpg',
                4: '../images/marco-azul.jpg',
                5: '../images/panal-rojo.jpg'
            };
            const fondo = backgrounds[this.value];
            document.querySelector('.giftcard').style.backgroundImage = `url(${fondo})`;
        });
    });

  
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); 
    
        const monto = document.querySelector('.giftcard .monto span').innerText;
    
        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        numeroActual += 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
    
        document.querySelectorAll('.js-numero-carrito').forEach(element => {
            element.textContent = numeroActual.toString();
        });
    
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        giftcardsAgregadas.push({ titulo: 'GiftCard', monto: monto });
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));
    
        document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
            const giftcardElemento = document.createElement('li');
            giftcardElemento.classList.add('carrito-elemento-lista');
            giftcardElemento.innerHTML = `
                <p class="carrito-nombre-curso">GiftCard</p>
                <p class="carrito-precio-curso">Monto: ${monto}</p>
                <button class="btn-borrar">Eliminar</button>
            `;
            carritoLista.appendChild(giftcardElemento);
    
            giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                eliminarGiftcard(giftcardElemento);
            });
    
            if (giftcardsAgregadas.length === 0) {
                carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
            }
        });
    
        mostrarModal();
    });
    
    function eliminarGiftcard(elemento) {
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        const index = Array.from(elemento.parentNode.children).indexOf(elemento);
        giftcardsAgregadas.splice(index, 1);
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));
    
        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        if (numeroActual > 0) {
            numeroActual -= 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelectorAll('.js-numero-carrito').forEach(element => {
                element.textContent = numeroActual.toString();
            });
        }
    
        elemento.remove();
    
        document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
            if (giftcardsAgregadas.length === 0 && JSON.parse(sessionStorage.getItem('cursosAgregados')).length === 0) {
                carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
            }
        });
    }
    
    function eliminarCurso(cursoId) {
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        const index = cursosAgregados.indexOf(cursoId.toString());
        if (index > -1) {
            cursosAgregados.splice(index, 1);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));
    
            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            if (numeroActual > 0) {
                numeroActual -= 1;
                sessionStorage.setItem('numeroCarrito', numeroActual);
                document.querySelectorAll('.js-numero-carrito').forEach(element => {
                    element.textContent = numeroActual.toString();
                });
            }
    
            const elemento = document.querySelector(`.carrito-elemento-lista[data-id="${cursoId}"]`);
            if (elemento) {
                elemento.remove();
            }
    
            document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
                if (cursosAgregados.length === 0 && JSON.parse(sessionStorage.getItem('giftcardsAgregadas')).length === 0) {
                    carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
                }
            });
        }
    }
    
    initCarrito();
    
    function initCarrito() {
        const numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        document.querySelectorAll('.js-numero-carrito').forEach(element => {
            element.textContent = numeroActual.toString();
        });
    
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        document.querySelectorAll('.carrito-lista').forEach(carritoLista => {
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
        });
    }
    
    function mostrarModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    
        modal.querySelector('.close').onclick = function () {
            modal.style.display = 'none';
        };
    
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
    
    function moverCarritoLista() {
        document.querySelectorAll('.carrito-lista').forEach(contenedorCarritoLista => {
            contenedorCarritoLista.style.left = '-420%';
        });
    }
    
    moverCarritoLista();
    
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


///////////////

function verificarMediaQuery() {

    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        const headerNodo = document.querySelector('.header');
        const numeroCarritoNodo = document.querySelector('.js-numero-carrito');
        headerNodo.style.position = 'sticky';
        numeroCarritoNodo.style.top ='0%';
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);

/////////////////

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