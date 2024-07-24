function guardarYMostrar() {
    // Ficha identificaciones
    const obtenerValor = id => document.getElementById(id)?.value || '';

    const fechaElaboracion = obtenerValor('fecha');
    const folio = obtenerValor('folio');
    const nombrePaciente = obtenerValor('nombrePaciente');
    const sexo = obtenerValor('sexo');
    const fechaNacimiento = obtenerValor('fechaNacimiento');
    const edad = obtenerValor('edad');
    const lugarNacimiento = obtenerValor('lugarNacimiento');
    const estadoCivil = obtenerValor('civil');
    const ocupacion = obtenerValor('ocupacion');
    const nacionalidad = obtenerValor('nacionalidad');
    const domicilioActual = obtenerValor('domicilio');
    const telefono = obtenerValor('telefono');
    const nombreContactoEmergencia = obtenerValor('nombreContactoEmergencia');
    const telefonoEmergencia = obtenerValor('telefonoEmergencia');
    const diagnosticoMedico = obtenerValor('diagnosticoMedico');
    const elaboroHistorial = obtenerValor('estadoCivil');  // Verifica si esto es correcto
    const motivoConsulta = obtenerValor('motivoConsulta');

    // Antecedentes Personales No Patológicos
    const obtenerValorNumerico = id => parseFloat(document.getElementById(id)?.value) || 0;
    const obtenerValorEntero = id => parseInt(document.getElementById(id)?.value, 10) || 0;

    const PropiaRenta = obtenerValor('tipocasa');
    const Ventilacion = obtenerValor('ventilacion');
    const Iluminacion = obtenerValor('iluminacion');
    const Piso = obtenerValor('piso');
    const Electrodomesticos = obtenerValor('electrodomesticos');
    const Servicios = obtenerValor('servicios');
    const DescripcionVivienda = obtenerValor('descripVivienda');
    const NoComidasDia = obtenerValorEntero('noComidas');
    const AguaLts = obtenerValorNumerico('aguaLts');
    const GruposAlimenticios = obtenerValor('gruposAlimenticios');
    const DescripcionRutinaAlimenticia = obtenerValor('descripRutinaAlimentaria');
    const HigieneBucal = obtenerValor('higieneBucal');
    const BanosDia = obtenerValorEntero('bañosxdia');
    const CambiosRopa = obtenerValor('cambiosRopa');
    const ActividadFisica = obtenerValor('actFisica');
    const Deporte = obtenerValor('deporte');
    const Ocio = obtenerValor('ocio');
    const Ocupacion1 = obtenerValor('ocupacion1');

    // Antecedentes Heredofamiliares
    function obtenerDatosEnfermedad(enfermedad) {
        const si = document.querySelector(`input[name="${enfermedad}_si"]`)?.checked ? 1 : 0;
        const no = document.querySelector(`input[name="${enfermedad}_no"]`)?.checked ? 1 : 0;
        const parentesco = document.querySelector(`input[name="${enfermedad}_parentesco"]`)?.value || '';
        const vivo = document.querySelector(`input[name="${enfermedad}_vivo"]`)?.checked ? 1 : 0;
        const muerto = document.querySelector(`input[name="${enfermedad}_muerto"]`)?.checked ? 1 : 0;
        return { enfermedad, si, no, parentesco, vivo, muerto };
    }
    const enfermedades = ['cancer', 'diabetes', 'hipertension', 'cardiacas', 'mentales', 'alergias'];
    const antecedentes = enfermedades.map(obtenerDatosEnfermedad);
    const otro = obtenerValor('otros');
    const observaciones = obtenerValor('observaciones');

    // Antecedentes Personales Patológicos
    function obtenerDatosPatologia(patologia) {
        const si_pa = document.querySelector(`input[name="${patologia}_si"]`)?.checked ? 1 : 0;
        const no_pa = document.querySelector(`input[name="${patologia}_no"]`)?.checked ? 1 : 0;
        const edad_presento = document.querySelector(`input[name="${patologia}_edad"]`)?.value || '';
        const secuela = document.querySelector(`input[name="${patologia}_secuelas"]`)?.value || '';
        return { patologia, si_pa, no_pa, edad_presento, secuela };
    }
    const patologias = ['traumatismos', 'cirugías', 'luxaciones', 'alergias', 'toxicomanías', 'psiquiátricos'];
    const datosPatologicos = patologias.map(obtenerDatosPatologia);
    const inmunizaciones = obtenerValor('inmunizaciones');
    const observaciones1 = obtenerValor('observaciones_ante');

    // Antecedentes Ginecobstétricos
    const menarquia = obtenerValor('menarquia');
    const fecha_ultima_menstruacion = obtenerValor('ultimaMenstruacion');
    const caracteristicas_menstruacion = obtenerValor('caracteristicasMenstruacion');
    const inicio_vida_sexual = obtenerValor('inicioVidaSexual');
    const uso_anticonceptivos = obtenerValor('usoAnticonceptivos');
    const numero_embarazos = obtenerValor('numEmbarazos');
    const numero_partos = obtenerValor('numPartos');
    const numero_cesareas = obtenerValor('numCesareas');
    const observaciones_gine = obtenerValor('observacionesGine');

    // Antecedentes De Padecimiento Actual
    const ac_descripcion = obtenerValor('ac_descripcion');

    // Exploracion
    const habitus_exterior = obtenerValor('habitusExte');
    const peso = obtenerValor('peso');
    const altura = obtenerValor('talla');
    const imc = obtenerValor('tensionArterial');
    const temperatura = obtenerValor('temperatura');
    const pulso_cardiaco = obtenerValor('frecuenciaCardiaca');
    const frecuencia_respiratoria = obtenerValor('frecuenciaRespiratoria');
    const presion_arterial = obtenerValorEntero('saturacion_de_oxígeno');
    const saturacion_oxigeno = obtenerValorNumerico('presionArterial');
    const observaciones2 = obtenerValor('observacionesexplofisica');
    const resultados_previos_actuales = obtenerValor('resultadospreviosyactuales');

    // des_partes_cuerpo
    const observacion = obtenerValor('observacionesMiembrosSuperiores');
    const palpacion = obtenerValor('palpacionsuperior');
    const exploracion = obtenerValor('dolorexplofisica');
    const dolor = obtenerValor('dolorSuperior');

    // fuerza_muscular
    function obtenerDatosMovimiento(movimiento) {
        const izquierda = document.querySelector(`input[name="${movimiento}_izquierdo"]`)?.value || '';
        const derecha = document.querySelector(`input[name="${movimiento}_derecho"]`)?.value || '';
        return { movimiento, izquierda, derecha };
    }
    const movimientos = ['abducción_y_rotación_superior_de_la_escápula', 'elevación_de_la_escápula', 'aducción_de_la_escápula',
        'aducción_y_descenso_escapular', 'aducción_y_rotación_inferior_de_la_escápula', 'flexión_del_hombro',
        'extensión_de_hombro', 'abducción_del_hombro', 'abducción_horizontal_del_hombro', 'aducción_horizontal_del_hombro', 'rotación_externa_del_hombro', 'rotación_interna_del_hombro',
        'flexión_de_codo', 'extensión_de_codo', 'supinación_del_antebrazo', 'pronación_del_antebrazo', 'flexión_de_la_muñeca', 'extensión_de_la_muñeca'
    ];
    const datosMovimientos = movimientos.map(obtenerDatosMovimiento);

    // Goniometría
    function obtenerDatosGoniometria(rangoNormal, movimientoG) {
        const izquierdoG = document.querySelector(`input[name="${rangoNormal}_${movimientoG}_izquierdo"]`)?.value || '';
        const derechoG = document.querySelector(`input[name="${rangoNormal}_${movimientoG}_derecho"]`)?.value || '';
        return { rangoNormal, movimientoG, izquierdoG, derechoG };
    }
    const rangosNormales = ['0°-150°/170°', '0°-40°','0-160°/180°', '0°-30°','0°-70°', '0°-70°','0°-150°', '0°(activa)-10°(pasiva)','0°-90°', '0°-90°'
        ,'0°-25°-30°', '0°-30°-40°','0°-50°/60°', '0°-35°/60°'
    ];
    const movimientosGoniometria = ['flexión_de_hombro', 'extensión_de_hombro', 'abducción_de_hombro', 'aducción_de_hombro', 'rotación_externa_de_hombro', 'rotación_interna_de_hombro'
        ,'flexión_de_codo', 'extensión_de_codo', 'supinación_del_antebrazo', 'pronación_del_antebrazo', 'desviación_radial_de_muñeca', 'desviación_cubital_de_la_muñeca'
        ,'flexión_de_muñeca', 'extensión_de_muñeca'
    ];
    const datosGoniometria = [];

    rangosNormales.forEach(rangoNormal => {
        movimientosGoniometria.forEach(movimientoG => {
            datosGoniometria.push(obtenerDatosGoniometria(rangoNormal, movimientoG));
        });
    });

    // Reflejos osteotendinosos
    function obtenerDatosReflejososteotendinosos(rot) {
        const izq = document.querySelector(`input[name="${rot}_izq"]`)?.value || '';
        const der = document.querySelector(`input[name="${rot}_der"]`)?.value || '';
        return { rot, izq, der };
    }
    const movimientos1 = ['Bicipital', 'Tricipital', 'Braquioradial', 'Estiloradial'];
    const datosReflejososteotendinosos = movimientos1.map(obtenerDatosReflejososteotendinosos);

    // PRUEBAS Y EVALUACIONES COMPLEMENTARIAS
    function obtenerDatosPrueba(numeroPrueba, movimientoPruebas) {
        const pruebas = document.querySelector(`input[name="${movimientoPruebas}_${numeroPrueba}"]`)?.value || '';
        const evaluaciones = document.querySelector(`input[name="${movimientoPruebas}_${numeroPrueba}"]`)?.value || '';
        return {pruebas, evaluaciones };
    }
    const numero = ['1', '2', '3', '4'];
    const movimientosPrueba = ['Pruebas', 'Resultados y análisis'];
    const datosPrueba = [];

    numero.forEach(numeroPrueba => {
        movimientosPrueba.forEach(movimientoPruebas => {
            datosPrueba.push(obtenerDatosPrueba(numeroPrueba, movimientoPruebas));
        });
    });


    // Vista frontal
    function obtenerDatosVistafrontal(alineacion_corporal) {
        const observaciones3 = document.querySelector(`input[name="${alineacion_corporal}_ob"]`)?.value || '';
        return { alineacion_corporal, observaciones3};
    }
    const alineaciones_corporales = ['Cabeza', 'Hombros', 'Miembros Superiores', 'Tronco', 'Cadera', 'Rodillas', 'Pies'];
    const datosVistafrontal = alineaciones_corporales.map(obtenerDatosVistafrontal);

    // Vista lateral
    function obtenerDatosVistalateral(alineacion_corporal1) {
        const observaciones4 = document.querySelector(`input[name="${alineacion_corporal1}_ob1"]`)?.value || '';
        return { alineacion_corporal1, observaciones4};
    }
    const alineaciones_corporales1 = ['Cabeza', 'Hombros', 'Miembros Superiores', 'Tronco', 'Cadera', 'Rodillas', 'Pies'];
    const datosVistalateral = alineaciones_corporales1.map(obtenerDatosVistalateral);

    // Vista posterior
    function obtenerDatosVistaposterior(alineacion_corporal2) {
        const observaciones5 = document.querySelector(`input[name="${alineacion_corporal2}_ob2"]`)?.value || '';
        return { alineacion_corporal2, observaciones5};
    }
    const alineaciones_corporales2 = ['Cabeza', 'Hombros', 'Miembros Superiores', 'Tronco', 'Cadera', 'Rodillas', 'Pies'];
    const datosVistaposterior = alineaciones_corporales2.map(obtenerDatosVistaposterior);






    const datosFormulario = {
        // Ficha identificaciones
        fechaElaboracion,
        folio,
        nombrePaciente,
        sexo,
        fechaNacimiento,
        edad,
        lugarNacimiento,
        estadoCivil,
        ocupacion,
        nacionalidad,
        domicilioActual,
        telefono,
        nombreContactoEmergencia,
        telefonoEmergencia,
        diagnosticoMedico,
        elaboroHistorial,
        motivoConsulta,
        // Antecedentes Personales No Patológicos
        PropiaRenta,
        Ventilacion,
        Iluminacion,
        Piso,
        Electrodomesticos,
        Servicios,
        DescripcionVivienda,
        NoComidasDia,
        AguaLts,
        GruposAlimenticios,
        DescripcionRutinaAlimenticia,
        HigieneBucal,
        BanosDia,
        CambiosRopa,
        ActividadFisica,
        Deporte,
        Ocio,
        Ocupacion1,
        // Antecedentes Heredofamiliares
        antecedentes,
        otro,
        observaciones,
        // Antecedentes Personales Patológicos
        datosPatologicos,
        inmunizaciones,
        observaciones1,
        // Antecedentes Ginecobstétricos
        menarquia,
        fecha_ultima_menstruacion,
        caracteristicas_menstruacion,
        inicio_vida_sexual,
        uso_anticonceptivos,
        numero_embarazos,
        numero_partos,
        numero_cesareas,
        observaciones_gine,
        // Antecedentes De Padecimiento Actual
        ac_descripcion,
        // Exploracion
        habitus_exterior,
        peso,
        altura,
        imc,
        temperatura,
        pulso_cardiaco,
        frecuencia_respiratoria,
        presion_arterial,
        saturacion_oxigeno,
        observaciones2,
        resultados_previos_actuales,
        // des_partes_cuerpo
        observacion,
        palpacion,
        exploracion,
        dolor,
        // Fuerza muscular
        datosMovimientos,
        // Goniometría
        datosGoniometria,
        // Reflejos osteotendinosos
        datosReflejososteotendinosos,
        // PRUEBAS Y EVALUACIONES COMPLEMENTARIAS
        datosPrueba,
        // Vista frontal
        datosVistafrontal,
        // Vista lateral
        datosVistalateral,
        // Vista posterior
        datosVistaposterior
    };
    console.log(datosFormulario);

    // Enviar los datos al servidor mediante AJAX
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
            } else {
                alert('Error al guardar los datos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
