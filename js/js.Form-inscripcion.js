
const params = new URLSearchParams(window.location.search);
const nombreCurso = params.get('curso');
const precioCurso = parseFloat(params.get('precio')); 
let cantidadPersonas = 1;

document.addEventListener('DOMContentLoaded', function() {
    if (nombreCurso) {
        document.querySelector('h1').textContent = nombreCurso;
    }
    
    actualizarTotal();
    
    document.querySelector('.boton-agregar-quitar:nth-child(1)').addEventListener('click', agregarPersona);
    document.querySelector('.boton-agregar-quitar:nth-child(2)').addEventListener('click', quitarPersona);
    document.getElementById('btnInscribirse').addEventListener('click', mostrarResumen);
});


function agregarPersona(event) {
    event.preventDefault();

    const nuevoGrupo = document.createElement('div');
    nuevoGrupo.classList.add('grupo-campos');
    nuevoGrupo.innerHTML = `
        <input class="input-descripcion" type="text" placeholder="Nombre" required>
        <input class="input-descripcion" type="text" placeholder="Apellido" required>
        <input class="input-descripcion" type="number" placeholder="DNI" required>
        <input class="input-descripcion" type="email" placeholder="E-mail" required>
    `;
    
    document.querySelector('form').insertBefore(nuevoGrupo, document.querySelector('.container-btnes-mas-menos'));
    cantidadPersonas++;
    actualizarTotal(); 
}

function quitarPersona(event) {
    event.preventDefault();

    const grupos = document.querySelectorAll('.grupo-campos');
    if (grupos.length > 1) {
        grupos[grupos.length - 1].remove();
        cantidadPersonas--; 
    } else {
      
        grupos[0].querySelectorAll('input').forEach(input => input.value = '');
    }
    actualizarTotal(); 
}


function actualizarTotal() {
    const total = precioCurso * cantidadPersonas;
    document.querySelector('.precio').textContent = `$${total.toFixed(2)}`;
    document.getElementById('contadorPersonas').textContent = cantidadPersonas;
}


function mostrarResumen(event) {
    event.preventDefault();

    
    const primerosCampos = document.querySelector('.grupo-campos').querySelectorAll('input');
    for (const campo of primerosCampos) {
        if (campo.value.trim() === '') {
            alert("Por favor, completa los campos de la primera persona.");
            return;
        }
    }

  
    const listaInscritos = document.getElementById('listaInscritos');
    listaInscritos.innerHTML = ''; 

    document.querySelectorAll('.grupo-campos').forEach((grupo, index) => {
        const nombre = grupo.querySelector('input[placeholder="Nombre"]').value;
        const apellido = grupo.querySelector('input[placeholder="Apellido"]').value;
        const dni = grupo.querySelector('input[placeholder="DNI"]').value;
        const email = grupo.querySelector('input[placeholder="E-mail"]').value;
        
       
        const personaItem = document.createElement('p');
        personaItem.textContent = `Persona ${index + 1}: ${nombre} ${apellido} - DNI: ${dni} - Email: ${email}`;
        listaInscritos.appendChild(personaItem);
    });

    document.getElementById('totalPersonas-inscriptos').textContent = cantidadPersonas;
    document.getElementById('totalPago-inscriptos').textContent = `$${(precioCurso * cantidadPersonas).toFixed(2)}`;

   
    document.getElementById('modalResumenn').style.display = 'block';

    document.getElementById('cerrarModal').onclick = function() {
        document.getElementById('modalResumenn').style.display = 'none';
    };
}
