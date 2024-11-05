function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 15000);
}

function showSuccessModal() {
    const modal = document.getElementById("success-modal");
    modal.style.display = "block";
}

function cambiarContraseña(email, password, newPassword, confirmPassword) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (!usuarios[email]) {
        showError("El correo electrónico no está registrado.");
        return;
    }

    if (usuarios[email].password !== password) {
        showError("La contraseña ingresada no es correcta.");
        return;
    }

    if (newPassword.length < 8) {
        showError("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (newPassword !== confirmPassword) {
        showError("Las contraseñas no coinciden.");
        return;
    }

    usuarios[email].password = newPassword;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showSuccessModal();
}

document.querySelector('.formulario-cuenta').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    cambiarContraseña(email, password, newPassword, confirmPassword);
});

document.getElementById('modal-ok-button').addEventListener('click', function() {
    const modal = document.getElementById("success-modal");
    modal.style.display = "none";
    window.location.href = '../html/inicioDeSesion.html';
});