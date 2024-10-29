document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el precio total desde sessionStorage
    let precioTotal = sessionStorage.getItem('precioTotal');

    if (precioTotal) {
        // Insertar el precio total en el elemento deseado
        document.querySelector('.js-monto-total').textContent = `Monto total: $${precioTotal}`;
    } else {
        console.log('No hay precio total guardado en sessionStorage');
    }
});
