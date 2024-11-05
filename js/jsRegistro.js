function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 15000);
}

function registrarUsuarios(email, nombre, apellido, password, confirmPassword) {
   

    if (password.length < 8 && password !== confirmPassword) {
        showError("La contraseña debe tener al menos 8 caracteres y ambas contraseñas deben coincidir.");
        return; 
    }

    if (password.length < 8) {
        showError("La contraseña debe tener al menos 8 caracteres.");
        return;
    }
    
    if (password !== confirmPassword) {
        showError("Las contraseñas no coinciden. Inténtalo nuevamente.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (usuarios[email]) {
        showError("Este correo ya está registrado.");
        return;
    }


    usuarios[email] = { nombre, apellido, password };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));


    document.getElementById('success-modal').style.display = 'flex';
}

document.querySelector('.formulario-cuenta').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    registrarUsuarios(email, nombre, apellido, password, confirmPassword);
});


document.getElementById('modal-ok-button').addEventListener('click', function() {

    document.getElementById('success-modal').style.display = 'none';
    
  
    window.location.href = '../html/inicioDeSesion.html';
});