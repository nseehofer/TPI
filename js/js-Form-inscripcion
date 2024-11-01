document.addEventListener('DOMContentLoaded', () => {


 
  const params = new URLSearchParams(window.location.search);
  const cursoSeleccionado = params.get('curso');


  if (cursoSeleccionado) {
      const tituloCurso = document.querySelector('.formulario-inscripcion h1');
      tituloCurso.textContent = cursoSeleccionado;
  }



    const containerCampos = document.querySelector('.grupo-campos');
    const btnAgregar = document.querySelector('.container-btnes-mas-menos .boton-agregar-quitar:first-child');
    const btnQuitar = document.querySelector('.container-btnes-mas-menos .boton-agregar-quitar:last-child');
    const precioElemento = document.querySelector('.precio');
    const precioPorPersona = 20; // USD 20
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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    actualizarTotal();
});
