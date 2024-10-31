document.addEventListener('DOMContentLoaded', function () {
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    let fechaActual = new Date();
    let indiceMesActual = fechaActual.getMonth();
    let añoActual = fechaActual.getFullYear();
    
    const mostrarMes = document.querySelector('.p-mes-actual');
    const mostrarMesMovil = document.querySelector('.mostrar_en_movil');
    const flechaIzquierda = document.querySelector('.img-flecha[src*="FlechaIzquierda"]');
    const flechaDerecha = document.querySelector('.img-flecha[src*="FlechaDerecha"]');
    const columnasFecha = document.querySelectorAll('.columna_fecha');

    // Cursos definidos en el JSON
    const cursos = [
        { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
        { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
        { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
        { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
    ];

    const cursosPorDia = {
        9: [1, 2], // IDs de los cursos para el 09/09/2024
        26: [4] // ID del curso para el 26/09/2024
    };

    function actualizarCalendario() {
        const nombreMes = nombresMeses[indiceMesActual];
        mostrarMes.textContent = `${nombreMes} ${añoActual}`;
        mostrarMesMovil.innerHTML = `<span class="flecha-mes"><</span> ${nombreMes} <span class="flecha-mes">></span>`;

        // Obtener el número de días en el mes actual
        const diasEnMes = new Date(añoActual, indiceMesActual + 1, 0).getDate();
        const primerDia = new Date(añoActual, indiceMesActual, 1).getDay(); // Obtener el primer día del mes

        // Limpiar los contenedores de fechas
        columnasFecha.forEach(columna => {
            const contenedoresFecha = columna.querySelectorAll('.contenedor_fecha');
            contenedoresFecha.forEach(contenedor => {
                contenedor.querySelector('.numero_fecha').textContent = '';
                contenedor.querySelector('.contenedor_curso').innerHTML = '';
            });
        });

        // Llenar los días en el calendario
        let dia = 1;
        for (let i = 0; i < columnasFecha.length; i++) {
            const contenedoresFecha = columnasFecha[i].querySelectorAll('.contenedor_fecha');
            for (let j = 0; j < contenedoresFecha.length; j++) {
                const contenedor = contenedoresFecha[j];
                const numeroFecha = contenedor.querySelector('.numero_fecha');
                if (dia <= diasEnMes) {
                    numeroFecha.textContent = `${dia.toString().padStart(2, '0')}/${(indiceMesActual + 1).toString().padStart(2, '0')}`;
                    
                    // Mostrar los cursos correspondientes según el día
                    const contenedorCurso = contenedor.querySelector('.contenedor_curso');
                    if (cursosPorDia[dia]) {
                        cursosPorDia[dia].forEach(cursoId => {
                            const curso = cursos.find(c => c.id === cursoId);
                            const cursoElemento = document.createElement('p');
                            cursoElemento.className = 'proxima_fecha_curso';
                            cursoElemento.textContent = curso.nombre;
                            cursoElemento.dataset.cursoId = curso.id;
                            contenedorCurso.appendChild(cursoElemento);
                        });
                    }
                }
                dia += 7; // Incrementar el día en 7 para la siguiente semana
            }
            dia = i + 2; // Ajustar el día para la siguiente columna
        }
    }

    function mostrarPopUp(curso, elemento) {
        const popUp = document.createElement('div');
        popUp.className = 'popup-curso';
        popUp.innerHTML = `
            <div class="popup-contenido">
                <img src="${curso.imagen}" alt="${curso.nombre}" class="popup-imagen">
                <h2>${curso.nombre}</h2>
                <p>Precio: $${curso.precio}</p>
                <a href="" class="btn-ver-detalle">Ver Detalle</a>
            </div>
        `;
        document.body.appendChild(popUp);

        // Posicionar el pop-up justo encima del elemento
        const rect = elemento.getBoundingClientRect();
        popUp.style.position = 'absolute';
        popUp.style.top = `${rect.top - popUp.offsetHeight}px`;
        popUp.style.left = `${rect.left}px`;

        // Cerrar el pop-up al hacer clic fuera de él
        document.addEventListener('click', function cerrarPopUp(event) {
            if (!popUp.contains(event.target) && event.target !== elemento) {
                document.body.removeChild(popUp);
                document.removeEventListener('click', cerrarPopUp);
            }
        });
    }

    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('proxima_fecha_curso')) {
            const cursoId = parseInt(event.target.dataset.cursoId, 10);
            const curso = cursos.find(c => c.id === cursoId);
            if (curso) {
                mostrarPopUp(curso, event.target);
            }
        }
    });

    flechaIzquierda.addEventListener('click', function () {
        if (indiceMesActual === 0) {
            indiceMesActual = 11;
            añoActual--;
        } else {
            indiceMesActual--;
        }
        actualizarCalendario();
    });

    flechaDerecha.addEventListener('click', function () {
        if (indiceMesActual === 11) {
            indiceMesActual = 0;
            añoActual++;
        } else {
            indiceMesActual++;
        }
        actualizarCalendario();
    });

    mostrarMesMovil.addEventListener('click', function (event) {
        if (event.target.classList.contains('flecha-mes')) {
            if (event.target.textContent === '<') {
                flechaIzquierda.click(); // Llama a la función de flecha izquierda
            } else {
                flechaDerecha.click(); // Llama a la función de flecha derecha
            }
        }
    });

    // Cambiar el cursor a "pointer" cuando esté sobre las flechas
    [flechaIzquierda, flechaDerecha].forEach(flecha => {
        flecha.style.cursor = 'pointer';
    });

    // Inicializar el calendario al cargar
    actualizarCalendario();
});
