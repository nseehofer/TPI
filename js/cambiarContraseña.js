function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
}

function cambiarContraseña(email, password, newPassword) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    // Verifica si el usuario existe
    if (!usuarios[email]) {
        showError("El correo electrónico no está registrado.");
        return;
    }

    // Verifica que la contraseña actual sea correcta
    if (usuarios[email].password !== password) {
        showError("La contraseña ingresada no es correcta.");
        return;
    }

    // Verifica que la nueva contraseña tenga al menos 8 caracteres
    if (newPassword.length < 8) {
        showError("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
    }

    // Actualiza la contraseña
    usuarios[email].password = newPassword;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Contraseña cambiada exitosamente.");
    window.location.href = '../html/inicioDeSesion.html'; // Redirige al inicio de sesión
}

document.querySelector('.formulario-cuenta').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('new_password').value;

    cambiarContraseña(email, password, newPassword);
});