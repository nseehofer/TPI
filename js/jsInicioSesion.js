document.addEventListener("DOMContentLoaded", function() {
    function showError(message) {
        console.log("Mostrando error:", message);
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerText = message;
        errorMessage.style.display = "block";
        
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 15000);
    }

    function iniciarSesion(email, password) {
        console.log("Intentando iniciar sesión para:", email);

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
        console.log("Usuarios actuales:", usuarios);

        if (!usuarios[email]) {
            showError("El correo no está registrado. Verifica tus datos o regístrate.");
            return;
        }

        if (usuarios[email].password !== password) {
            showError("La contraseña es incorrecta. Inténtalo de nuevo.");
            return;
        }

        console.log("Inicio de sesión exitoso.");
        localStorage.setItem('emailUsuarioLogeado', email);
        console.log("Email del usuario logeado almacenado:", localStorage.getItem('emailUsuarioLogeado'));
        window.location.href = '../homeSesionIniciada.html';
    }

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Formulario de inicio de sesión enviado.");
        iniciarSesion(email, password);
    });
});
