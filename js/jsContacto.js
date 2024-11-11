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
    const caracteresRestantes = maxCaracteres - consulta.value.length;
    contadorCaracteres.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    
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
