const cursos = [
    { id: 1, nombre: 'Diseño UX/UI', precio: 20000, duracion: '13 meses', modalidad: 'Virtual', imagen: '../images/uxui.png' },
    { id: 2, nombre: 'Ciberseguridad', precio: 50000, duracion: '5 meses', modalidad: 'Virtual', imagen: '../images/ciberseguridad.png' },
    { id: 3, nombre: 'Desarrollo Full Stack', precio: 60000, duracion: '6 meses', modalidad: 'Virtual', imagen: '../images/fullstack.jpg' },
    { id: 4, nombre: 'Desarrollo Front End', precio: 45000, duracion: '4 meses', modalidad: 'Virtual', imagen: '../images/front.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad existente para personalizar la giftcard
    document.querySelector('input[placeholder="Nombre Destinatario"]').oninput = function () {
        document.getElementById('nombre-destinatario').innerText = this.value;
    };

    document.querySelectorAll('input[name="color"]').forEach(function (radio) {
        radio.onchange = function () {
            let color;
            switch (this.value) {
                case 'amarillo': color = 'yellow'; break;
                case 'rojo': color = 'red'; break;
                case 'verde': color = 'green'; break;
                case 'azul': color = 'blue'; break;
                case 'blanco': color = 'white'; break;
                case 'negro': color = 'black'; break;
            }
            document.getElementById('nombre-destinatario').style.color = color;
        }
    });

    document.querySelectorAll('input[name="font-size"]').forEach(function (radio) {
        radio.onchange = function () {
            let fontSize = this.value;
            document.getElementById('nombre-destinatario').style.fontSize = fontSize;
        }
    });

    document.getElementById('monto_input').oninput = function () {
        document.querySelector('.giftcard .monto span').innerText = '$' + this.value;
    };

    document.querySelectorAll('input[name="ubicacion"]').forEach(function (radio) {
        radio.onchange = function () {
            let posicion = this.value;
            let monto = document.getElementById('monto');
            monto.className = 'monto ' + posicion;
        }
    });

    // Nueva funcionalidad para agregar la giftcard al carrito
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        const monto = document.querySelector('.giftcard .monto span').innerText;

        // Actualizar sessionStorage
        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        numeroActual += 1;
        sessionStorage.setItem('numeroCarrito', numeroActual);
        document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();

        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        giftcardsAgregadas.push({ titulo: 'GiftCard', monto: monto });
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));

        // Agregar el elemento 'li' al carrito
        const carritoLista = document.querySelector('.carrito-lista');
        const giftcardElemento = document.createElement('li');
        giftcardElemento.classList.add('carrito-elemento-lista');
        giftcardElemento.innerHTML = `
            <p class="carrito-nombre-curso">GiftCard</p>
            <p class="carrito-precio-curso">Monto: ${monto}</p>
            <button class="btn-borrar">Eliminar</button>
        `;
        carritoLista.appendChild(giftcardElemento);

        // Agregar funcionalidad al botón de eliminar
        giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function () {
            eliminarGiftcard(giftcardElemento);
        });

        // Mostrar mensaje si el carrito está vacío
        if (giftcardsAgregadas.length === 0) {
            carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
        }

        // Mostrar el modal
        mostrarModal();
    });

    function eliminarGiftcard(elemento) {
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        const index = Array.from(elemento.parentNode.children).indexOf(elemento);
        giftcardsAgregadas.splice(index, 1);
        sessionStorage.setItem('giftcardsAgregadas', JSON.stringify(giftcardsAgregadas));

        let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        if (numeroActual > 0) {
            numeroActual -= 1;
            sessionStorage.setItem('numeroCarrito', numeroActual);
            document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
        }

        elemento.remove();

        const carritoLista = document.querySelector('.carrito-lista');
        if (giftcardsAgregadas.length === 0 && JSON.parse(sessionStorage.getItem('cursosAgregados')).length === 0) {
            carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
        }
    }

    function eliminarCurso(cursoId) {
        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        const index = cursosAgregados.indexOf(cursoId.toString());
        if (index > -1) {
            cursosAgregados.splice(index, 1);
            sessionStorage.setItem('cursosAgregados', JSON.stringify(cursosAgregados));

            let numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
            if (numeroActual > 0) {
                numeroActual -= 1;
                sessionStorage.setItem('numeroCarrito', numeroActual);
                document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();
            }

            const elemento = document.querySelector(`.carrito-elemento-lista[data-id="${cursoId}"]`);
            if (elemento) {
                elemento.remove();
            }

            const carritoLista = document.querySelector('.carrito-lista');
            if (cursosAgregados.length === 0 && JSON.parse(sessionStorage.getItem('giftcardsAgregadas')).length === 0) {
                carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
            }
        }
    }

    // Inicializar el carrito al cargar la página
    initCarrito();

    function initCarrito() {
        const numeroActual = parseInt(sessionStorage.getItem('numeroCarrito')) || 0;
        document.querySelector('.js-numero-carrito').textContent = numeroActual.toString();

        let cursosAgregados = JSON.parse(sessionStorage.getItem('cursosAgregados')) || [];
        let giftcardsAgregadas = JSON.parse(sessionStorage.getItem('giftcardsAgregadas')) || [];
        const carritoLista = document.querySelector('.carrito-lista');
        carritoLista.innerHTML = '';

        if (cursosAgregados.length === 0 && giftcardsAgregadas.length === 0) {
            carritoLista.innerHTML = '<p>No se agregaron cursos</p>';
        } else {
            cursosAgregados.forEach(cursoId => {
                const curso = cursos.find(c => c.id.toString() === cursoId);
                if (curso) {
                    const cursoElemento = document.createElement('li');
                    cursoElemento.classList.add('carrito-elemento-lista');
                    cursoElemento.setAttribute('data-id', cursoId);
                    cursoElemento.innerHTML = `
                        <p class="carrito-nombre-curso">${curso.nombre}</p>
                        <p class="carrito-precio-curso">Precio: $${curso.precio}</p>
                        <p class="carrito-duracion-curso">Duración: ${curso.duracion}</p>
                        <p class="carrito-modalidad-curso">Modalidad: ${curso.modalidad}</p>
                        <button class="btn-borrar" data-id="${cursoId}">Eliminar</button>
                    `;
                    carritoLista.appendChild(cursoElemento);

                    cursoElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                        eliminarCurso(cursoId);
                    });
                }
            });

            giftcardsAgregadas.forEach(giftcard => {
                const giftcardElemento = document.createElement('li');
                giftcardElemento.classList.add('carrito-elemento-lista');
                giftcardElemento.innerHTML = `
                    <p class="carrito-nombre-curso">GiftCard</p>
                    <p class="carrito-precio-curso">Monto: ${giftcard.monto}</p>
                    <button class="btn-borrar">Eliminar</button>
                `;
                carritoLista.appendChild(giftcardElemento);

                giftcardElemento.querySelector('.btn-borrar').addEventListener('click', function () {
                    eliminarGiftcard(giftcardElemento);
                });
            });
        }
    }

    // Función para mostrar el modal
    function mostrarModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        // Cerrar el modal después de 3 segundos
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);

        // Cerrar el modal al hacer clic en la "x"
        modal.querySelector('.close').onclick = function () {
            modal.style.display = 'none';
        };

        // Cerrar el modal al hacer clic en la "x"
        modal.querySelector('.close').onclick = function () {
            modal.style.display = 'none';
        };

        // Cerrar el modal al hacer clic fuera del contenido del modal
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
});

function verificarMediaQuery() {
    const mediaQuery768 = window.matchMedia('(max-width: 768px)');
    const mediaQuery575 = window.matchMedia('(max-width: 575px)');
    if (mediaQuery768.matches || mediaQuery575.matches) {
        const contenedorCarritoLista = document.querySelector('.carrito-lista');
        contenedorCarritoLista.style.left = '-420%';
    }
}

document.addEventListener('DOMContentLoaded', verificarMediaQuery);
window.addEventListener('resize', verificarMediaQuery);