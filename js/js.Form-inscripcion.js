document.addEventListener('DOMContentLoaded', () => {
    const containerCampos = document.querySelector('.grupo-campos');
    const btnAgregar = document.querySelector('.container-btnes-mas-menos .boton-agregar-quitar:first-child');
    const btnQuitar = document.querySelector('.container-btnes-mas-menos .boton-agregar-quitar:last-child');
    const precioElemento = document.querySelector('.precio');
    const precioPorPersona = 18000;
    const btnInscribirse = document.getElementById('btnInscribirse');
    const modal = document.getElementById('modalResumen');
    const closeModal = document.getElementById('closeModal');
    let totalPersonas = 1;

    function actualizarTotal() {
        const total = totalPersonas * precioPorPersona;
        precioElemento.textContent = `$ ${total.toFixed(2)}`;
    }

    function agregarPersona() {
        totalPersonas++;
        const nuevoGrupo = document.createElement('div');
        nuevoGrupo.classList.add('grupo-campos');

        nuevoGrupo.innerHTML = `
            <input class="input-descripcion" type="text" placeholder="Nombre" required>
            <input class="input-descripcion" type="text" placeholder="Apellido" required>
            <input class="input-descripcion" type="number" placeholder="DNI" required>
            <input class="input-descripcion" type="email" placeholder="E-mail" required>
        `;
        containerCampos.parentNode.insertBefore(nuevoGrupo, containerCampos.nextSibling);
        actualizarTotal();
    }

    function quitarPersona() {
        if (totalPersonas > 1) {
            const ultimoGrupo = containerCampos.nextElementSibling;
            if (ultimoGrupo) {
                ultimoGrupo.remove();
                totalPersonas--;
                actualizarTotal();
            }
        } else {
            containerCampos.querySelectorAll('input').forEach(input => input.value = '');
        }
    }

    function guardarDatosEnLocalStorage() {
        const inscritos = [];
        document.querySelectorAll('.grupo-campos').forEach(grupo => {
            const nombre = grupo.querySelector('input[placeholder="Nombre"]').value;
            const apellido = grupo.querySelector('input[placeholder="Apellido"]').value;
            const dni = grupo.querySelector('input[placeholder="DNI"]').value;
            const email = grupo.querySelector('input[placeholder="E-mail"]').value;

            inscritos.push({ nombre, apellido, dni, email });
        });
        localStorage.setItem('inscritos', JSON.stringify(inscritos));
        localStorage.setItem('totalPago', totalPersonas * precioPorPersona);
    }

    function mostrarResumen() {
        guardarDatosEnLocalStorage();

        const listaInscritos = document.getElementById('listaInscritos');
        listaInscritos.innerHTML = '';

        const inscritos = JSON.parse(localStorage.getItem('inscritos'));
        inscritos.forEach(inscrito => {
            const p = document.createElement('p');
            p.textContent = `${inscrito.nombre} ${inscrito.apellido} - DNI: ${inscrito.dni} - Email: ${inscrito.email}`;
            listaInscritos.appendChild(p);
        });

        const totalPago = document.getElementById('totalPago');
        totalPago.textContent = `$ ${localStorage.getItem('totalPago')}`;

        modal.style.display = 'flex';
    }

    btnAgregar.addEventListener('click', (e) => {
        e.preventDefault();
        agregarPersona();
    });

    btnQuitar.addEventListener('click', (e) => {
        e.preventDefault();
        quitarPersona();
    });

    btnInscribirse.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarResumen();
    });

    // Listener para cerrar el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    actualizarTotal();
});
