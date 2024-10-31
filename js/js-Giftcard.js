document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('input[placeholder="Nombre Destinatario"]').oninput = function() {
        document.getElementById('nombre-destinatario').innerText = this.value;
    };

    
    document.querySelectorAll('input[name="color"]').forEach(function(radio) {
        radio.onchange = function() {
            let color;
            switch(this.value) {
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

   
    document.querySelectorAll('input[name="font-size"]').forEach(function(radio) {
        radio.onchange = function() {
            let fontSize = this.value;
            document.getElementById('nombre-destinatario').style.fontSize = fontSize;
        }
    });


    document.getElementById('monto_input').oninput = function() {
        document.querySelector('.giftcard .monto span').innerText = '$' + this.value;
    };

    
    document.querySelectorAll('input[name="ubicacion"]').forEach(function(radio) {
        radio.onchange = function() {
            let posicion = this.value;
            let monto = document.getElementById('monto');
            monto.className = 'monto ' + posicion;
        }
    });

})

document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombre-destinatario');
    const montoInput = document.getElementById('monto_input');

    nombreInput.addEventListener('input', function() {
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
    });

    montoInput.addEventListener('input', function() {
        if (this.value.length > 7) {
            this.value = this.value.slice(0, 7);
        }
    });
});
 
 document.querySelectorAll('input[name="opcion"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        const fondoValue = this.value;
        const backgrounds = {
            1: '../images/hexagonos-naranja.jpg',
            2: '../images/circuitos.jpg',
            3: '../images/ia.jpg',
            4: '../images/marco-azul.jpg',
            5: '../images/panal-rojo.jpg'
        };
        const fondo = backgrounds[fondoValue];
        document.querySelector('.giftcard').style.backgroundImage = `url(${fondo})`;
    });
});