// Obtener elementos
const modal = document.getElementById("modal-inscripcion");
const inscribirseBtn = document.querySelector(".btn.btn-azul");
const closeBtn = document.querySelector(".close");
const closeModalBtn = document.getElementById("close-btn");

// Obtener los contenedores de datos para el modal
const modalTitle = document.getElementById("modal-course-title");
const modalMode = document.getElementById("modal-course-mode");
const modalDuration = document.getElementById("modal-course-duration");
const modalPrice = document.getElementById("modal-course-price");

// Mostrar el modal al hacer clic en "Inscribirse"
inscribirseBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Evitar redireccionar

    // Obtener datos del curso desde el HTML
    const courseTitle = document.querySelector(".course-title").textContent;
    const courseMode = document.querySelector(".course-mode").textContent;
    const courseDuration = document.querySelector(".course-duration").textContent;
    const coursePrice = document.querySelector(".course-price").textContent;

    // Asignar los datos al modal
    modalTitle.textContent = courseTitle;
    modalMode.textContent = courseMode;
    modalDuration.textContent = courseDuration;
    modalPrice.textContent = coursePrice;

    // Mostrar el modal
    modal.style.display = "block";
});

// Cerrar el modal al hacer clic en "X"
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    window.location.href = "../html/formularioEmpresa.html";
});

// Cerrar el modal al hacer clic en el botón "Cerrar"
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
    window.location.href = "../html/formularioEmpresa.html";
});

// Cerrar el modal si el usuario hace clic fuera de él
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        window.location.href = "../html/formularioEmpresa.html";
    }
});