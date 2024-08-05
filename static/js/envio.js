// Función para obtener el valor de un campo de texto
const obtenerValor = id => document.getElementById(id)?.value || '';
const obtenerValorNumerico = id => parseFloat(document.getElementById(id)?.value) || 0;
const obtenerValorEntero = id => parseInt(document.getElementById(id)?.value, 10) || 0;

// Función para guardar datos en tiempo real
function guardarDatosEnTiempoReal() {
    const datosFormulario = {
        // Ficha identificaciones
        fechaElaboracion: obtenerValor('fecha'),
        folio: obtenerValor('folio'),
        nombrePaciente: obtenerValor('nombrePaciente'),
        sexo: obtenerValor('sexo'),
        fechaNacimiento: obtenerValor('fechaNacimiento'),
        edad: obtenerValor('edad'),
        lugarNacimiento: obtenerValor('lugarNacimiento'),
        estadoCivil: obtenerValor('civil'),
        ocupacion: obtenerValor('ocupacion'),
        nacionalidad: obtenerValor('nacionalidad'),
        domicilioActual: obtenerValor('domicilio'),
        telefono: obtenerValor('telefono'),
        nombreContactoEmergencia: obtenerValor('nombreContactoEmergencia'),
        telefonoEmergencia: obtenerValor('telefonoEmergencia'),
        diagnosticoMedico: obtenerValor('diagnosticoMedico'),
        elaboroHistorial: obtenerValor('estadoCivil'),  // Verifica si esto es correcto
        motivoConsulta: obtenerValor('motivoConsulta'),
        // Antecedentes Personales No Patológicos
        PropiaRenta: obtenerValor('tipocasa'),
        Ventilacion: obtenerValor('ventilacion'),
        Iluminacion: obtenerValor('iluminacion'),
        Piso: obtenerValor('piso'),
        Electrodomesticos: obtenerValor('electrodomesticos'),
        Servicios: obtenerValor('servicios'),
        DescripcionVivienda: obtenerValor('descripVivienda'),
        NoComidasDia: obtenerValorEntero('noComidas'),
        AguaLts: obtenerValorNumerico('aguaLts'),
        GruposAlimenticios: obtenerValor('gruposAlimenticios'),
        DescripcionRutinaAlimenticia: obtenerValor('descripRutinaAlimentaria'),
        HigieneBucal: obtenerValor('higieneBucal'),
        BanosDia: obtenerValorEntero('bañosxdia'),
        CambiosRopa: obtenerValor('cambiosRopa'),
        ActividadFisica: obtenerValor('actFisica'),
        Deporte: obtenerValor('deporte'),
        Ocio: obtenerValor('ocio'),
        Ocupacion1: obtenerValor('ocupacion1'),
        // Antecedentes Heredofamiliares
        antecedentes: ['cancer', 'diabetes', 'hipertension', 'cardiacas', 'mentales', 'alergias'].map(enfermedad => ({
            enfermedad,
            si: document.querySelector(`input[name="${enfermedad}_si"]`)?.checked ? 1 : 0,
            no: document.querySelector(`input[name="${enfermedad}_no"]`)?.checked ? 1 : 0,
            parentesco: document.querySelector(`input[name="${enfermedad}_parentesco"]`)?.value || '',
            vivo: document.querySelector(`input[name="${enfermedad}_vivo"]`)?.checked ? 1 : 0,
            muerto: document.querySelector(`input[name="${enfermedad}_muerto"]`)?.checked ? 1 : 0
        })),
        otro: obtenerValor('otros'),
        observaciones: obtenerValor('observaciones'),
        // Antecedentes Personales Patológicos
        datosPatologicos: ['traumatismos', 'cirugías', 'luxaciones', 'alergias', 'toxicomanías', 'psiquiátricos'].map(patologia => ({
            patologia,
            si_pa: document.querySelector(`input[name="${patologia}_si"]`)?.checked ? 1 : 0,
            no_pa: document.querySelector(`input[name="${patologia}_no"]`)?.checked ? 1 : 0,
            edad_presento: document.querySelector(`input[name="${patologia}_edad"]`)?.value || '',
            secuela: document.querySelector(`input[name="${patologia}_secuelas"]`)?.value || ''
        })),
        inmunizaciones: obtenerValor('inmunizaciones'),
        observaciones1: obtenerValor('observaciones_ante'),
        // Antecedentes Ginecobstétricos
        menarquia: obtenerValor('menarquia'),
        fecha_ultima_menstruacion: obtenerValor('ultimaMenstruacion'),
        caracteristicas_menstruacion: obtenerValor('caracteristicasMenstruacion'),
        inicio_vida_sexual: obtenerValor('inicioVidaSexual'),
        uso_anticonceptivos: obtenerValor('usoAnticonceptivos'),
        numero_embarazos: obtenerValor('numEmbarazos'),
        numero_partos: obtenerValor('numPartos'),
        numero_cesareas: obtenerValor('numCesareas'),
        observaciones_gine: obtenerValor('observacionesGine'),
        // Antecedentes De Padecimiento Actual
        ac_descripcion: obtenerValor('ac_descripcion'),
        // Exploracion
        habitus_exterior: obtenerValor('habitusExte'),
        peso: obtenerValor('peso'),
        altura: obtenerValor('talla'),
        imc: obtenerValor('tensionArterial'),
        temperatura: obtenerValor('temperatura'),
        pulso_cardiaco: obtenerValor('frecuenciaCardiaca'),
        frecuencia_respiratoria: obtenerValor('frecuenciaRespiratoria'),
        presion_arterial: obtenerValorEntero('saturacion_de_oxígeno'),
        saturacion_oxigeno: obtenerValorNumerico('presionArterial'),
        observaciones2: obtenerValor('observacionesexplofisica'),
        resultados_previos_actuales: obtenerValor('resultadospreviosyactuales')
    };
    // Guardar datos en localStorage
    localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    // Mostrar datos en la consola
    console.log(datosFormulario);
}

function guardarMiembroSuperior(){
    console.log("Entre aqui")
    const datosFormularioMiembroSup = {
        observacion: obtenerValor('observacionesMiembrosSuperiores'),
        palpacion: obtenerValor('palpacionMiembrosSuperiores'),
        descripcion: obtenerValor('dolorSuperiorMiembrosSuperiores'),
        dolor: obtenerValorEntero('dolorexplofisicaMiembrosSuperiores'),
        // Fuerza Muscular
        datosMovimientos: ['Abducción y rotación superior de la escápula', 'Elevación de la escápula', 'Aducción de la escápula', 'Aducción y descenso escapular', 'Aducción y rotación inferior de la escápula', 'Flexión del hombro', 'Extensión de hombro', 'Abducción del hombro', 'Abducción horizontal del hombro', 'Aducción horizontal del hombro', 'Rotación externa del hombro','Rotación interna del hombro', 'Flexión de codo','Extensión de codo','Supinación del antebrazo','Pronación del antebrazo','Flexión de la muñeca','Extensión de la muñeca'].map(movimiento => ({
            izq: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_izquierdo"]`)?.value || '',
            movimiento,
            der: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_derecho"]`)?.value || ''
        })),
        // Goniometria
        datosGoniometria: [
            'Flexión de hombro', 'Extensión de hombro', 'Abducción de hombro', 'Aducción de hombro', 'Rotación externa de hombro', 'Rotación interna de hombro', 'Flexión de codo', 'Extensión de codo', 'Supinación del antebrazo', 'Pronación del antebrazo', 'Desviación radial de muñeca', 'Desviación cubital de la muñeca', 'Flexión de muñeca', 'Extensión de muñeca'
        ].map(movimiento => ({
            rangoNormal: document.querySelector(`td[data-movimiento="${movimiento.replace(/ /g, '_')}_Gonio"]`)?.textContent.trim() || '',
            izq: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_izquierdoGonio"]`)?.value || '',
            movimiento,
            der: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_derechoGonio"]`)?.value || ''
        })),
        // Reflejos osteotendinosos
        datosOsteotendinosos: [
            'Bicipital', 'Tricipital', 'Braquioradial', 'Estiloradial'
        ].map(rot => ({
            izq: document.querySelector(`input[name="${rot}_izq"]`)?.value || '',
            rot,
            der: document.querySelector(`input[name="${rot}_der"]`)?.value || ''
        })),
        //Pruebas y evaluaciones complementarias
        prueba1: obtenerValor('Pruebas_1_MiembrosSuperiores'),
        resultadoAnalisis1: obtenerValor('Resultados_y_análisis_1_MiembrosSuperiores'),
        prueba2: obtenerValor('Pruebas_2_MiembrosSuperiores'),
        resultadoAnalisis2: obtenerValor('Resultados_y_análisis_2_MiembrosSuperiores'),
        prueba3: obtenerValor('Pruebas_3_MiembrosSuperiores'),
        resultadoAnalisis3: obtenerValor('Resultados_y_análisis_3_MiembrosSuperiores'),
        prueba4: obtenerValor('Pruebas_4_MiembrosSuperiores'),
        resultadoAnalisis4: obtenerValor('Resultados_y_análisis_4_MiembrosSuperiores'),

    };
    localStorage.setItem('datosFormularioMiembroSup', JSON.stringify(datosFormularioMiembroSup));
    // Mostrar datos en la consola
    console.log(datosFormularioMiembroSup);
}

function mostrarDatosDatos() {
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));
    console.log(datosFormulario)
}

//Muestra los datos del form Miembro Superior
// function mostrarDatosDatos() {
//     const datosFormularioMiembroSup = JSON.parse(localStorage.getItem('datosFormularioMiembroSup'));
//     console.log(datosFormularioMiembroSup)
// }



// Enviar los datos al servidor mediante AJAX
function enviarDatosAlServidor() {
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));

    fetch('/guardar_datos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Datos guardados exitosamente');
            localStorage.clear(); // Eliminar todos los datos de localStorage
            window.location.href = '/'; // Redirigir a Home.html
        } else {
            alert('Error al guardar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//Envia los datos del formulario de Miembro Superior
function enviarDatosMiembroSup() {
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormularioMiembroSup'));
    const datosFormularioFicha = JSON.parse(localStorage.getItem('datosFormulario'));

    fetch('/guardar_datosMiembroSup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Datos guardados exitosamente');
            localStorage.clear(); // Eliminar todos los datos de localStorage
            window.location.href = '/'; // Redirigir a Home.html
        } else {
            alert('Error al guardar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Agregar event listeners a todos los campos relevantes
// document.querySelectorAll('input, select, textarea').forEach(element => {
//     element.addEventListener('change', guardarDatosEnTiempoReal());
// });

// Agregar event listener al botón para enviar datos
// document.getElementById('enviarDatos').addEventListener('click', enviarDatosAlServidor());
// document.getElementById('mostrarDatos').addEventListener('click', mostrarDatosDatos());

// Agregar event listeners a todos los campos relevantes
document.querySelectorAll('input, select, textarea').forEach(element => {
    if (element) {
        element.addEventListener('change', guardarDatosEnTiempoReal);
    }
});
document.querySelectorAll('input, select, textarea').forEach(element => {
    if (element) {
        element.addEventListener('change', guardarMiembroSuperior);
    }
});

// Agregar event listener al botón para enviar datos
document.getElementById('enviarDatos')?.addEventListener('click', enviarDatosAlServidor);
//document.getElementById('enviarDatos')?.addEventListener('click', enviarDatosMiembroSup);

document.getElementById('mostrarDatos')?.addEventListener('click', mostrarDatosDatos);