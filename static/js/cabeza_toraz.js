// Función para obtener el valor de un campo de texto
const obtenerValor = id => document.getElementById(id)?.value || '';
const obtenerValorNumerico = id => parseFloat(document.getElementById(id)?.value) || 0;
const obtenerValorEntero = id => parseInt(document.getElementById(id)?.value, 10) || 0;

// Función para guardar datos en tiempo real
function guardarDatosEnTiempoRealCabezaTorax() {
    const datosCabezaTorax = {
        observacionesCabezaCuello: obtenerValor('observacionesCabezaCuello'),
        palpacionCabezaCuello: obtenerValor('palpacionCabezaCuello'),
        dolorexplofisicaCabezaCuello: obtenerValorNumerico('dolorexplofisicaCabezaCuello'),
        dolorSuperiorCabezaCuello: obtenerValor('dolorSuperiorCabezaCuello'),
        // Datos adicionales
        inspeccionTorax: obtenerValor('inspeccionTorax'),
        palpacionTorax: obtenerValor('palpacionTorax'),
        percusionTorax: obtenerValor('percusionTorax'),
        auscultacionTorax: obtenerValor('auscultacionTorax')
    };

    // Guardar datos en localStorage
    localStorage.setItem('datosCabezaTorax', JSON.stringify(datosCabezaTorax));

    // Mostrar datos en la consola (opcional)
    // console.log(datosCabezaTorax);
}

function mostrarDatosCabezaTorax() {
    const datosCabezaTorax = JSON.parse(localStorage.getItem('datosCabezaTorax'));
    console.log(datosCabezaTorax);
}

// Enviar los datos al servidor mediante AJAX
function enviarDatosCabezaToraxAlServidor() {
    const datosCabezaTorax = JSON.parse(localStorage.getItem('datosCabezaTorax'));

    fetch('/guardar_datos_cabeza_torax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCabezaTorax)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Datos guardados exitosamente');
            localStorage.removeItem('datosCabezaTorax'); // Eliminar datos específicos de esta sección
            window.location.href = '/'; // Redirigir a Home.html o a otra página
        } else {
            alert('Error al guardar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Agregar event listeners a todos los campos relevantes
document.querySelectorAll('#contenedorFicha18 input, #contenedorFicha18 textarea').forEach(element => {
    element.addEventListener('change', guardarDatosEnTiempoRealCabezaTorax);
});

// Agregar event listener al botón para enviar datos
document.getElementById('enviarDatosCabezaTorax').addEventListener('click', enviarDatosCabezaToraxAlServidor);

// Event listener para mostrar datos
document.getElementById('mostrarDatosCabezaTorax').addEventListener('click', mostrarDatosCabezaTorax);
