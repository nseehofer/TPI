document.addEventListener('DOMContentLoaded', function() {
    const nombreCurso = localStorage.getItem('cursoSeleccionado');
    const precioCurso = localStorage.getItem('precioSeleccionado');
    const formulario = document.querySelector('form');
    const btnAgregar = document.querySelector('.boton-agregar-quitar:first-child');
    const btnQuitar = document.querySelector('.boton-agregar-quitar:last-child');
    const btnInscribirse = document.getElementById('btnInscribirse');
    const modalResumenn = document.getElementById('modalResumenn');
    const cerrarModal = document.getElementById('cerrarModal');
    const precioElemento = document.querySelector('.precio');
    const contadorPersonas = document.getElementById('contadorPersonas');
    let precioPorPersona = 0;

    if (nombreCurso) {
        document.querySelector('h1').textContent = nombreCurso;
    }

    if (precioCurso) {
        precioPorPersona = parseFloat(precioCurso.replace('$', '').trim());
        actualizarTotal();
    }

    localStorage.removeItem('cursoSeleccionado');
    localStorage.removeItem('precioSeleccionado');

    function crearCamposPersona() {
        const div = document.createElement('div');
        div.classList.add('grupo-campos');
        div.innerHTML = `
            <input class="input-descripcion" type="text" placeholder="Nombre" required>
            <input class="input-descripcion" type="text" placeholder="Apellido" required>
            <input class="input-descripcion" type="number" placeholder="DNI" required>
            <input class="input-descripcion" type="email" placeholder="E-mail" required>
        `;
        return div;
    }

    function actualizarTotal() {
        const totalPersonas = document.querySelectorAll('.grupo-campos').length;
        const total = precioPorPersona * totalPersonas;
        precioElemento.textContent = `$${total.toFixed(2)}`;
        contadorPersonas.textContent = totalPersonas;
        console.log(`Total actualizado: $${total.toFixed(2)} para ${totalPersonas} personas`);
    }

    function agregarPersona(e) {
        e.preventDefault();
        formulario.insertBefore(crearCamposPersona(), btnAgregar.parentNode);
        actualizarTotal();
     
    }

    function quitarPersona(e) {
        e.preventDefault();
        const grupos = document.querySelectorAll('.grupo-campos');
        if (grupos.length > 1) {
            grupos[grupos.length - 1].remove();
        } else {
            grupos[0].querySelectorAll('input').forEach(input => input.value = '');
        }
        actualizarTotal();
      
    }

    function validarCampos() {
        let camposCompletos = true;
        document.querySelectorAll('.grupo-campos').forEach(grupo => {
            grupo.querySelectorAll('input').forEach(input => {
                if (input.value.trim() === '') {
                    camposCompletos = false;
                }
            });
        });
        console.log(`Validación de campos: ${camposCompletos ? 'Completos' : 'Incompletos'}`);
        return camposCompletos;
    }

    function guardarDatosEnLocalStorage() {
        const inscritos = [];
        document.querySelectorAll('.grupo-campos').forEach(grupo => {
            const inputs = grupo.querySelectorAll('input');
            inscritos.push({
                nombre: inputs[0].value,
                apellido: inputs[1].value,
                dni: inputs[2].value,
                email: inputs[3].value
            });
        });
        localStorage.setItem('inscritos', JSON.stringify(inscritos));
        localStorage.setItem('totalPago', precioElemento.textContent);
        localStorage.setItem('totalParticipants', contadorPersonas.textContent);
    
    }

    function mostrarResumen(e) {
        console.log('Función mostrarResumen ejecutada');
        e.preventDefault();
        if (!validarCampos()) {
            alert('Por favor, complete todos los campos antes de continuar.');
            return;
        }

        guardarDatosEnLocalStorage();
        const listaInscritos = document.getElementById('listaInscritos');
        listaInscritos.innerHTML = '';

        const inscritos = JSON.parse(localStorage.getItem('inscritos'));
        inscritos.forEach((inscrito, index) => {
            const p = document.createElement('p');
            p.textContent = `Persona ${index + 1}: ${inscrito.nombre} ${inscrito.apellido} - DNI: ${inscrito.dni} - Email: ${inscrito.email}`;
            listaInscritos.appendChild(p);
        });

        document.getElementById('totalPersonas-inscriptos').textContent = contadorPersonas.textContent;
        document.getElementById('totalPago-inscriptos').textContent = precioElemento.textContent;

        modalResumenn.style.display = 'flex';
   
    }

    btnAgregar.addEventListener('click', agregarPersona);
    btnQuitar.addEventListener('click', quitarPersona);
    btnInscribirse.addEventListener('click', mostrarResumen);

    cerrarModal.addEventListener('click', () => {
        modalResumenn.style.display = 'none';
      
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalResumenn) {
            modalResumenn.style.display = 'none';
          
        }
    });

    if (document.querySelectorAll('.grupo-campos').length === 0) {
        formulario.insertBefore(crearCamposPersona(), btnAgregar.parentNode);

    }

    actualizarTotal();
   
});