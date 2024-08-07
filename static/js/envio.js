// Función para obtener el valor de un campo de texto
const obtenerValor = id => document.getElementById(id)?.value || '';
const obtenerValorNumerico = id => parseFloat(document.getElementById(id)?.value) || 0;
const obtenerValorEntero = id => parseInt(document.getElementById(id)?.value, 10) || 0;

// Función para guardar datos en tiempo real
//
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

    // // Mostrar datos en la consola
    // console.log(datosFormulario);
}

function mostrarDatosDatos() {
    const datosFormulario = JSON.parse(localStorage.getItem('datosFormulario'));
    console.log(datosFormulario)
}

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



// Agregar event listeners a todos los campos relevantes
// document.querySelectorAll('input, select, textarea').forEach(element => {
//     element.addEventListener('change', guardarDatosEnTiempoReal);
// });

// Agregar event listener al botón para enviar datos
// document.getElementById('enviarDatos').addEventListener('click', enviarDatosAlServidor);

// document.getElementById('mostrarDatos').addEventListener('click', mostrarDatosDatos);


//********************MIEMBRO INFERIOR*******************************
function guardarDatosMiembroInf() {
    const datosMiembroInf = {
        //partes_cuerpoo
      
            // id_partes: obtenerValor('id_partes'),
            observacion: obtenerValor('observacionesMiembrosInferiores'),
            palpacion: obtenerValor('palpacionMiembrosInferiores'),
            numdolor: obtenerValorEntero('numerodolor'),
            descripcion: obtenerValor('dolorSuperiorMiembrosInferiores'),
      
            // Fuerza Muscular
            datosMovimientos: ['flexión de cadera','extensión de la cadera','abducción de la cadera','aducción de la cadera','rotación externa de la cadera','rotación interna de la cadera','flexión de la rodilla','extensión de la rodilla','flexión plantar del tobillo', 'dorsiflexión e inversión del pie','inversión del pie','eversión del pie con flexión plantar','eversión del pie con dorsiflexión'].map(movimiento => ({
                izq: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_izquierdo"]`)?.value || '',
                movimiento,
                der: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_derecho"]`)?.value || ''
            })),
       
      // Goniometria
        datosGoniometria: [
            'Flexion de cadera','Extensión de cadera','Abducción de cadera','Aducción de cadera','Rotación externa de cadera','Rotación interna de cadera','Flexión de rodilla','Extensión de rodilla','Plantiflexión','Dorsiflexión','Inversión del pie','Eversión del pie'
        ].map(movimiento => ({
            rangoNormal: document.querySelector(`td[name="${movimiento.replace(/ /g, '_')}_Gonio"]`)?.textContent.trim() || '',
            izq: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_izquierdoGonio"]`)?.value || '',
            movimiento,
            der: document.querySelector(`input[name="${movimiento.replace(/ /g, '_')}_derechoGonio"]`)?.value || ''
        })), 

        //datos osteotendinosos
        datosOsteotendinosos: [
            'Rotuliano', 'Aquileo'
        ].map(rot => ({
            izq: document.querySelector(`input[name="${rot}_izq"]`)?.value || '',
            rot,
            der: document.querySelector(`input[name="${rot}_der"]`)?.value || ''
        })),
      
       // pruebasEvaluacionesComplementarias
       prueba1: obtenerValor('Pruebas_1_MiembrosInferiores'),
       resultadoAnalisis1: obtenerValor('Resultados_y_análisis_1_MiembrosInferiores'),
       prueba2: obtenerValor('Pruebas_2_MiembrosInferiores'),
       resultadoAnalisis2: obtenerValor('Resultados_y_análisis_2_MiembrosInferiores'),
       prueba3: obtenerValor('Pruebas_3_MiembrosInferiores'),
       resultadoAnalisis3: obtenerValor('Resultados_y_análisis_3_MiembrosInferiores'),
       prueba4: obtenerValor('Pruebas_4_MiembrosInferiores'),
       resultadoAnalisis4: obtenerValor('Resultados_y_análisis_4_MiembrosInferiores'),
    
       // ciclo Macha
            faseApoyoCompleto: obtenerValor('fase_apoyo_completo'),
            contactoTalonIzquierdo: obtenerValor('contacto_talon_izquierdo'),
            contactoTalonDerecho: obtenerValor('contacto_talon_derecho'),
            apoyoPlantarIzquierdo: obtenerValor('apoyo_plantar_izquierdo'),
            apoyoPlantarDerecho: obtenerValor('apoyo_plantar_derecho'),
            apoyoMedioIzquierdo: obtenerValor('apoyo_medio_izquierdo'),
            apoyoMedioDerecho: obtenerValor('apoyo_medio_derecho'),
            faseOscilacionCompleto: obtenerValor('fase_oscilacion_completo'),
            balanceoInicialIzquierdo: obtenerValor('balanceo_inicial_izquierdo'),
            balanceoInicialDerecho: obtenerValor('balanceo_inicial_derecho'),
            balanceoMedioIzquierdo: obtenerValor('balanceo_medio_izquierdo'),
            balanceoMedioDerecho: obtenerValor('balanceo_medio_derecho'),
            balanceoTerminalIzquierdo: obtenerValor('balanceo_terminal_izquierdo'),
            balanceoTerminalDerecho: obtenerValor('balanceo_terminal_derecho'),
            rotacionPelvicaCompleto: obtenerValor('rotacion_pelvica_completo'),
            inclinacionPelvicaCompleto: obtenerValor('inclinacion_pelvica_completo'),
            flexionRodillaIzquierdo: obtenerValor('flexion_rodilla_izquierdo'),
            flexionRodillaDerecho: obtenerValor('flexion_rodilla_derecho'),
            movimientosCoordinadosRodillaTobilloIzquierdo: obtenerValor('movimientos_coordinados_rodilla_tobillo_izquierdo'),
            movimientosCoordinadosRodillaTobilloDerecho: obtenerValor('movimientos_coordinados_rodilla_tobillo_derecho'),
            movimientoCentroGravedadCompleto: obtenerValor('movimiento_centro_gravedad_completo'),
            cadenciaCompleto: obtenerValor('cadencia_completo'),
            balanceoMsCompleto: obtenerValor('balanceo_ms_completo')
        }
        // Guardar datos en localStorage
        localStorage.setItem('datosMiembroInf', JSON.stringify(datosMiembroInf));
        console.log(datosMiembroInf);
    }


function mostrarDatosDatosMiembroInf() {
    const datosMiembroInf = JSON.parse(localStorage.getItem('datosMiembroInf'));
    console.log(datosMiembroInf)
}

// Enviar los datos al servidor mediante AJAX
function enviarDatosMiembroInf() {
    const datosMiembroInf = JSON.parse(localStorage.getItem('datosMiembroInf'));
    const datosFormularioFicha = JSON.parse(localStorage.getItem('datosFormulario'));

    fetch('/guardar_datosMiembroInf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosMiembroInf)
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
document.querySelectorAll('input, select, textarea').forEach(element => {
    if (element) {
        element.addEventListener('change', guardarDatosEnTiempoReal);
    }
});
document.querySelectorAll('input, select, textarea').forEach(element => {
    if (element) {
        element.addEventListener('change', guardarDatosMiembroInf);
    }
});

// Agregar event listener al botón para enviar datos
document.getElementById('enviarDatos')?.addEventListener('click', enviarDatosMiembroInf);

document.getElementById('mostrarDatos').addEventListener('click', mostrarDatosDatosMiembroInf);

