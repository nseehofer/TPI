document.addEventListener('DOMContentLoaded', function() {
    let precioTotal = sessionStorage.getItem('precioTotal');

    if (precioTotal) {
        document.querySelector('.js-monto-total').textContent = `Monto total: $${precioTotal}`;
    } else {
        console.log('No hay precio total guardado en sessionStorage');
    }
});
