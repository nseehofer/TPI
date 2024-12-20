const formulario = document.querySelector('.formulario-contacto');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const consulta = document.querySelector('input[name="consulta"]');


function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 15000);
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const telefonoRegex = /^\d{4}-\d{4}$/;


const maxCaracteres = 1000;
const contadorCaracteres = document.createElement('p');
contadorCaracteres.style.fontSize = '0.9rem';
contadorCaracteres.style.color = 'gray';
consulta.insertAdjacentElement('afterend', contadorCaracteres);

consulta.addEventListener('input', () => {
    const caracteresUtilizados = consulta.value.length;
    const caracteresRestantes = maxCaracteres - caracteresUtilizados;
    contadorCaracteres.innerHTML = `Caracteres utilizados: ${caracteresUtilizados}<br>Caracteres restantes: ${caracteresRestantes}`;
    
    if (consulta.value.length > maxCaracteres) {
        consulta.value = consulta.value.substring(0, maxCaracteres);
    }
});


function mostrarPopup() {
    const modal = document.createElement('div');
    modal.classList.add('registro-modal');
    
    const contenidoModal = document.createElement('div');
    contenidoModal.classList.add('contenido-registro-modal');
    
    contenidoModal.innerHTML = `
        <p>Consulta enviada</p>
        <button id="modal-ok-button">Aceptar</button>
    `;
    
    modal.appendChild(contenidoModal);
    document.body.appendChild(modal);
    modal.style.display = 'block';

    document.getElementById('modal-ok-button').addEventListener('click', () => {
        document.body.removeChild(modal);
        window.location.href = '../index.html';
    });
}


function validarFormulario(event) {
    event.preventDefault();

    if (!nombre.value.trim()) {
        showError("El campo Nombre es obligatorio");
        return;
    }
    
    if (!apellido.value.trim()) {
        showError("El campo Apellido es obligatorio");
        return;
    }
    
    if (!emailRegex.test(email.value)) {
        showError("El campo Email es inválido");
        return;
    }
    
    if (telefono.value && !telefonoRegex.test(telefono.value)) {
        showError("El campo Teléfono debe tener el formato 1234-5678");
        return;
    }
    
    if (!consulta.value.trim()) {
        showError("El campo Consulta es obligatorio");
        return;
    }

    mostrarPopup();
}


formulario.addEventListener('submit', validarFormulario);

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const emailUsuarioLogeado = localStorage.getItem('emailUsuarioLogeado');
    
    if (emailUsuarioLogeado) {
        // Mostrar los divs que estaban ocultos
        const usuarioIcons = document.querySelectorAll('.js_usuario_icon');
        usuarioIcons.forEach(icon => {
            icon.style.display = 'block';
        });

        // Ocultar los enlaces de "Iniciar Sesión" y "Registrarse"
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


///////////////////////////

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