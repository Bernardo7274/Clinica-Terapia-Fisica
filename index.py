from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error
import logging
app = Flask(__name__)

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='terapia_fisica2'
        )
        if connection.is_connected():
            print("Conexión exitosa a la base de datos")
    except Error as e:
        print(f"Error: '{e}'")
    return connection

@app.route('/')
def principal():
    return render_template('Home.html')

@app.route('/NuevoRegistro')
def NuevoRegistro():
    return render_template('NuevoRegistro.html', current_page='NuevoRegistro')

@app.route('/Ficha')
def Ficha():
    return render_template('Ficha.html')

@app.route('/MiembroSuperior')
def MiembroSuperior():
    return render_template('MiembroSuperior.html')

@app.route('/MiembroInferior')
def MiembroInferior():
    return render_template('MiembroInferior.html')

@app.route('/CabezaTorax')
def CabezaTorax():
    return render_template('CabezaTorax.html')

@app.route('/EvaluacionDeLaPostura')
def EvaluacionDeLaPostura():
    return render_template('EvaluacionDeLaPostura.html')

@app.route('/ConsultaRegistro')
def ConsultaRegistro():
    connection = create_connection()
    cursor = connection.cursor()
    
    # Obtener los folios de la tabla ficha_identificaciones
    cursor.execute("SELECT folio FROM ficha_identificaciones")
    folios = cursor.fetchall()
    
    # Obtener los nombres de la tabla clasificaciones
    cursor.execute("SELECT nombre_paciente FROM ficha_identificaciones")
    clasificaciones = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return render_template('ConsultaRegistro.html', folios=folios, clasificaciones=clasificaciones)

@app.route('/guardar_datos', methods=['POST'])
def guardar_datos():
    datos = request.json
    connection = create_connection()
    cursor = connection.cursor()

    # Insertar datos en ficha_identificaciones
    ficha_identificaciones_query = """
    INSERT INTO ficha_identificaciones (fecha_elaboracion, nombre_paciente, genero, folio, edad, fecha_nacimiento, lugar_nacimiento, ocupacion, domicilio_actual, estado_civil, nacionalidad, telefono, contacto_emergencia_nombre, contacto_emergencia_telefono, diagnostico_medico, elaboro_historial_clinico, motivo_consulta)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    ficha_identificaciones_data = (
        datos['fechaElaboracion'], datos['nombrePaciente'], datos['sexo'], datos['folio'], datos['edad'],
        datos['fechaNacimiento'], datos['lugarNacimiento'], datos['ocupacion'], datos['domicilioActual'],
        datos['estadoCivil'], datos['nacionalidad'], datos['telefono'], datos['nombreContactoEmergencia'],
        datos['telefonoEmergencia'], datos['diagnosticoMedico'], datos['elaboroHistorial'], datos['motivoConsulta']
    )
    cursor.execute(ficha_identificaciones_query, ficha_identificaciones_data)
    connection.commit()
    id_ficha = cursor.lastrowid  # Obtener el último ID insertado

    # Insertar datos en antecedentespersonalesnopatologicos
    antecedentes_personales_query = """
    INSERT INTO antecedentespersonalesnopatologicos (id_ficha, PropiaRenta, Ventilacion, Iluminacion, Piso, Electrodomesticos, Servicios, DescripcionVivienda, NoComidasDia, AguaLts, GruposAlimenticios, DescripcionRutinaAlimenticia, HigieneBucal, BanosDia, CambiosRopa, ActividadFisica, Deporte, Ocio, Ocupacion)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    antecedentes_personales_data = (
        id_ficha, datos['PropiaRenta'], datos['Ventilacion'], datos['Iluminacion'], datos['Piso'],
        datos['Electrodomesticos'], datos['Servicios'], datos['DescripcionVivienda'], datos['NoComidasDia'],
        datos['AguaLts'], datos['GruposAlimenticios'], datos['DescripcionRutinaAlimenticia'], datos['HigieneBucal'],
        datos['BanosDia'], datos['CambiosRopa'], datos['ActividadFisica'], datos['Deporte'], datos['Ocio'],
        datos['Ocupacion1']
    )
    cursor.execute(antecedentes_personales_query, antecedentes_personales_data)
    connection.commit()

    # Insertar datos en antecedentesheredofamiliares
    for antecedente in datos['antecedentes']:
        antecedentes_heredofamiliares_query = """
        INSERT INTO antecedentesheredofamiliares (id_ficha, enfermedad, si, no, parentesco, vivo, muerto, otro, observaciones)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        antecedentes_heredofamiliares_data = (
            id_ficha, antecedente['enfermedad'], antecedente['si'], antecedente['no'], antecedente['parentesco'],
            antecedente['vivo'], antecedente['muerto'], datos['otro'], datos['observaciones']
        )
        cursor.execute(antecedentes_heredofamiliares_query, antecedentes_heredofamiliares_data)
    connection.commit()

    # Insertar datos en antecedentes_patologicos
    for patologico in datos['datosPatologicos']:
        antecedentes_patologicos_query = """
        INSERT INTO antecedentes_patologicos (id_ficha, patologia, si, no, edad_presentacion, secuelas_complicaciones, inmunizaciones, observaciones)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        antecedentes_patologicos_data = (
            id_ficha, patologico['patologia'], patologico['si_pa'], patologico['no_pa'], patologico['edad_presento'],
            patologico['secuela'], datos['inmunizaciones'], datos['observaciones1']
        )
        cursor.execute(antecedentes_patologicos_query, antecedentes_patologicos_data)
    connection.commit()

    # Insertar datos en antecedentes_ginecobstetricos
    antecedentes_ginecobstetricos_query = """
    INSERT INTO antecedentes_ginecobstetricos (id_ficha, menarquia, fecha_ultima_menstruacion, caracteristicas_menstruacion, inicio_vida_sexual, uso_anticonceptivos, numero_embarazos, numero_partos, numero_cesareas, observaciones)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    antecedentes_ginecobstetricos_data = (
        id_ficha, datos['menarquia'], datos['fecha_ultima_menstruacion'], datos['caracteristicas_menstruacion'],
        datos['inicio_vida_sexual'], datos['uso_anticonceptivos'], datos['numero_embarazos'], datos['numero_partos'],
        datos['numero_cesareas'], datos['observaciones_gine']
    )
    cursor.execute(antecedentes_ginecobstetricos_query, antecedentes_ginecobstetricos_data)
    connection.commit()

    # Insertar datos en antecedentes_padecimientoactual
    antecedentes_padecimientoactual_query = """
    INSERT INTO antecedentes_padecimientoactual (id_ficha, descripcion)
    VALUES (%s, %s)
    """
    antecedentes_padecimientoactual_data = (
        id_ficha, datos['ac_descripcion']
    )
    cursor.execute(antecedentes_padecimientoactual_query, antecedentes_padecimientoactual_data)
    connection.commit()

    # Insertar datos en exploracion
    exploracion_query = """
    INSERT INTO exploracion (id_ficha, habitus_exterior, peso, altura, imc, temperatura, pulso_cardiaco, frecuencia_respiratoria, presion_arterial, saturacion_oxigeno, observaciones, resultados_previos_actuales)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    exploracion_data = (
        id_ficha, datos['habitus_exterior'], datos['peso'], datos['altura'], datos['imc'], datos['temperatura'],
        datos['pulso_cardiaco'], datos['frecuencia_respiratoria'], datos['presion_arterial'], datos['saturacion_oxigeno'],
        datos['observaciones2'], datos['resultados_previos_actuales']
    )
    cursor.execute(exploracion_query, exploracion_data)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'success': True})

logging.basicConfig(level=logging.DEBUG)
@app.route('/guardar_datosMiembroSup', methods=['POST'])
def guardar_datosMiembroSup():
    datos = request.json
    connection = create_connection()
    cursor = connection.cursor()

    # Insertar PartesCuerpo_MiembroSuperior
    partesCuerpo_query = """
    INSERT INTO partes_cuerpo_miembro_superior(id_ficha, id_partes, observacion, palpacion, descripcion, dolor)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    partesCuerpo_data = (
        1, 1, datos['observacion'], datos['palpacion'], datos['descripcion'], datos['dolor']
    )
    cursor.execute(partesCuerpo_query, partesCuerpo_data)
    connection.commit()

    # Insertar datos en Fuerza Muscular
    for Fuerza in datos['datosMovimientos']:
        fuerzaMuscular_query = """
        INSERT INTO fuerza_muscular_miembro_superior (id_ficha, derecha, movimiento, izquierda) 
        VALUES (%s, %s, %s, %s)
        """
        fuerzaMuscular_data = (
            1, Fuerza['der'], Fuerza['movimiento'], Fuerza['izq']
        )
        cursor.execute(fuerzaMuscular_query, fuerzaMuscular_data)
    connection.commit()

    # Insertar datos en Goniometria
    for goniometria in datos['datosGoniometria']:
        goniometria_miembro_superior_patologicos_query = """
        INSERT INTO goniometria_miembro_superior(id_ficha, rango_normal, izquierdo, movimiento, derecho)
        VALUES (%s, %s, %s, %s, %s)
        """
        goniometria_miembro_superior_data = (
            1, goniometria['rangoNormal'], goniometria['izq'], goniometria['movimiento'], goniometria['der']
        )
        cursor.execute(goniometria_miembro_superior_patologicos_query, goniometria_miembro_superior_data)
    connection.commit()

    # Insertar datos Reflejos Osteotendinosos
    for reflejos in datos['datosOsteotendinosos']:
        relejos_osteotendinosos_query = """
        INSERT INTO reflejososteotendinosos_miembro_superior(id_ficha, izq, rot, der)
        VALUES (%s, %s, %s, %s)
        """
        relejos_osteotendinosos_data = (
            1, reflejos['izq'], reflejos['rot'], reflejos['der']
        )
        cursor.execute(relejos_osteotendinosos_query, relejos_osteotendinosos_data)
    connection.commit()

    # Insertar datos en PruebasEvaluacionesComplementarias
    datos_list = [
        (1, datos['prueba1'], datos['resultadoAnalisis1']),
        (1, datos['prueba2'], datos['resultadoAnalisis2']),
        (1, datos['prueba3'], datos['resultadoAnalisis3']),
        (1, datos['prueba4'], datos['resultadoAnalisis4'])
    ]
    pruebasevaluacionescomplementarias_query = """
        INSERT INTO pruebasevaluacionescomplementarias_miembro_superior(id_ficha, pruebas, resultadosyanalisis)
        VALUES (%s, %s, %s)
    """
    for data in datos_list:
        cursor.execute(pruebasevaluacionescomplementarias_query, data)
    connection.commit()
    
    cursor.close()
    connection.close()

    return jsonify({'success': True})




if __name__ == '__main__':
    app.run(debug=True, port=5011)
