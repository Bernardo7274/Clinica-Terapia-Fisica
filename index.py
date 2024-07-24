from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='terapia_fisica'
        )
        if connection.is_connected():
            print("Conexión exitosa a la base de datos")
    except Error as e:
        print(f"Error: '{e}'")
    return connection

@app.route('/')
def principal():
    return render_template('index.html')

@app.route('/Miembro_Superior')
def Miembro_superior():
    return render_template('Miembro_Superior.html')

@app.route('/Miembro_Inferior')
def Miembro_inferior():
    return render_template('Miembro_Inferior.html')

@app.route('/Cabeza_y_toráx')
def Cabeza_y_toráx():
    return render_template('Cabeza_y_toráx.html')

@app.route('/Notas_de_seguimiento')
def Notas_de_seguimiento():
    return render_template('Notas_de_seguimiento.html', current_page='Notas_de_seguimiento')

@app.route('/Plan_de_tratamiento')
def Plan_de_tratamiento():
    return render_template('Plan_de_tratamiento.html')

# Seccion para insertar datos #
@app.route('/guardar_datos', methods=['POST'])
def guardar_datos():
    data = request.get_json()
    connection = create_connection()

    if connection is None:
        return jsonify({'success': False, 'message': 'Error en la conexión a la base de datos'})

    try:
        cursor = connection.cursor()

        # Insertar datos en ficha_identificaciones
        query_ficha = """
        INSERT INTO ficha_identificaciones (
            id_clasificacion, fecha_elaboracion, nombre_paciente, genero, folio, edad,
            fecha_nacimiento, lugar_nacimiento, ocupacion, domicilio_actual, estado_civil,
            nacionalidad, telefono, contacto_emergencia_nombre, contacto_emergencia_telefono,
            diagnostico_medico, elaboro_historial_clinico, motivo_consulta
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values_ficha = (
            1, data['fechaElaboracion'], data['nombrePaciente'], data['sexo'], data['folio'],
            data['edad'], data['fechaNacimiento'], data['lugarNacimiento'], data['ocupacion'],
            data['domicilioActual'], data['estadoCivil'], data['nacionalidad'], data['telefono'],
            data['nombreContactoEmergencia'], data['telefonoEmergencia'], data['diagnosticoMedico'],
            data['elaboroHistorial'], data['motivoConsulta']
        )

        cursor.execute(query_ficha, values_ficha)
        connection.commit()

        # Obtener el último ID insertado
        last_id_query = "SELECT LAST_INSERT_ID()"
        cursor.execute(last_id_query)
        last_id = cursor.fetchone()[0]

        # Insertar datos en antecedentespersonalesnopatologicos
        query_antecedentes_personales = """
        INSERT INTO antecedentespersonalesnopatologicos (
            id_ficha, PropiaRenta, Ventilacion, Iluminacion, Piso, Electrodomesticos, Servicios, 
            DescripcionVivienda, NoComidasDia, AguaLts, GruposAlimenticios, DescripcionRutinaAlimenticia, 
            HigieneBucal, BanosDia, CambiosRopa, ActividadFisica, Deporte, Ocio, Ocupacion
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values_antecedentes_personales = (
            last_id, data['PropiaRenta'], data['Ventilacion'], data['Iluminacion'],
            data['Piso'], data['Electrodomesticos'], data['Servicios'], data['DescripcionVivienda'],
            data['NoComidasDia'], data['AguaLts'], data['GruposAlimenticios'],
            data['DescripcionRutinaAlimenticia'], data['HigieneBucal'], data['BanosDia'],
            data['CambiosRopa'], data['ActividadFisica'], data['Deporte'], data['Ocio'], data['Ocupacion1']
        )

        cursor.execute(query_antecedentes_personales, values_antecedentes_personales)
        connection.commit()

        # Insertar datos en antecedentesheredofamiliares
        query_antecedentes_heredofamiliares = """
        INSERT INTO antecedentesheredofamiliares (
            id_ficha, enfermedad, si, no, parentesco, vivo, muerto, otro, observaciones
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        for antecedente in data.get('antecedentes', []):
            if antecedente.get('parentesco'):  # Verifica si 'parentesco' no está vacío
                values_antecedente = (
                    last_id, antecedente['enfermedad'], antecedente['si'], antecedente['no'],
                    antecedente['parentesco'], antecedente['vivo'], antecedente['muerto'],
                    data['otro'], data['observaciones']
                )
                cursor.execute(query_antecedentes_heredofamiliares, values_antecedente)
        connection.commit()

        # Insertar datos en antecedentes_patologicos
        query_antecedentes_patologias = """
        INSERT INTO antecedentes_patologicos (
            id_ficha, patologia, si, no, edad_presentacion, secuelas_complicaciones, inmunizaciones, observaciones
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        for patologia in data.get('datosPatologicos', []):
            if patologia.get('edad_presento') and patologia.get('secuela'):  # Verifica si 'parentesco' no está vacío
                values_patologia = (
                    last_id, patologia['patologia'], patologia['si_pa'], patologia['no_pa'],
                    patologia['edad_presento'], patologia['secuela'],
                    data['inmunizaciones'], data['observaciones1']
                )
                cursor.execute(query_antecedentes_patologias, values_patologia)
        connection.commit()

        # Antecedentes Ginecobstétricos
        query_antecedentes_ginecobstetricos = """
        INSERT INTO antecedentes_ginecobstetricos (
            id_ficha, menarquia, fecha_ultima_menstruacion, caracteristicas_menstruacion, inicio_vida_sexual, uso_anticonceptivos, numero_embarazos, 
            numero_partos, numero_cesareas, observaciones
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values_antecedentes_ginecobstetricos = (
            last_id, data['menarquia'], data['fecha_ultima_menstruacion'], data['caracteristicas_menstruacion'],
            data['inicio_vida_sexual'], data['uso_anticonceptivos'], data['numero_embarazos'], data['numero_partos'],
            data['numero_cesareas'], data['observaciones_gine']
        )
        cursor.execute(query_antecedentes_ginecobstetricos, values_antecedentes_ginecobstetricos)
        connection.commit()

        # Antecedentes De Padecimiento Actual
        query_antecedentes_padecimiento_atual = """
        INSERT INTO antecedentes_padecimientoactual (
            id_ficha, descripcion
        ) VALUES (%s, %s)
        """
        values_antecedentes_padecimiento_atual = (
            last_id, data['ac_descripcion']
        )
        cursor.execute(query_antecedentes_padecimiento_atual, values_antecedentes_padecimiento_atual)
        connection.commit()

        # Insertar datos en exploracion
        query_exploracion = """
        INSERT INTO exploracion (
            id_ficha, habitus_exterior, peso, altura, imc, temperatura, pulso_cardiaco, 
            frecuencia_respiratoria, presion_arterial, saturacion_oxigeno, observaciones, resultados_previos_actuales
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values_exploracion = (
            last_id, data['habitus_exterior'], data['peso'], data['altura'],
            data['imc'], data['temperatura'], data['pulso_cardiaco'], data['frecuencia_respiratoria'],
            data['presion_arterial'], data['saturacion_oxigeno'], data['observaciones2'],
            data['resultados_previos_actuales']
        )
        cursor.execute(query_exploracion, values_exploracion)
        connection.commit()

        # Insertar datos en des_partes_cuerpo
        query_des_partes_cuerpo = """
        INSERT INTO des_partes_cuerpo (
            id_ficha, id_partes, observacion, palpacion, exploracion, dolor
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        values_des_partes_cuerpo = (
            last_id, 1, data['observacion'], data['palpacion'], data['exploracion'],
            data['dolor']
        )
        cursor.execute(query_des_partes_cuerpo, values_des_partes_cuerpo)
        connection.commit()

        # Insertar datos en fuerza muscular
        query_fuerza_muscular = """
        INSERT INTO fuerza_muscular (
            id_ficha, derecha, movimiento, izquierda
        ) VALUES (%s, %s, %s, %s)
        """

        for movimiento in data.get('datosMovimientos', []):
            if movimiento.get('derecha') and movimiento.get('izquierda'):  # Verifica si 'derecha' y 'izquierda' no están vacíos
                values_fuerza_muscular = (
                    last_id, movimiento['derecha'], movimiento['movimiento'], movimiento['izquierda']
                )
                cursor.execute(query_fuerza_muscular, values_fuerza_muscular)
        connection.commit()

        # Insertar datos en Goniometría
        query_goniometria = """
        INSERT INTO goniometria (
            id_ficha, rango_normal, movimiento, izquierdo, derecho
        ) VALUES (%s, %s, %s, %s, %s)
        """

        for goniometria in data.get('datosGoniometria', []):
            if goniometria.get('izquierdoG') and goniometria.get('derechoG'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_goniometria = (
                    last_id, goniometria['rangoNormal'], goniometria['movimientoG'],
                    goniometria['izquierdoG'], goniometria['derechoG']
                )
                cursor.execute(query_goniometria, values_goniometria)
        connection.commit()


        # Insertar datos en Reflejos osteotendinosos
        query_reflejososteotendinosos = """
        INSERT INTO reflejososteotendinosos (
            id_ficha, izq, rot, der
        ) VALUES (%s, %s, %s, %s)
        """

        for reflejososteotendinosos in data.get('datosReflejososteotendinosos', []):
            if reflejososteotendinosos.get('izq') and reflejososteotendinosos.get('der'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_reflejososteotendinosos = (
                    last_id, reflejososteotendinosos['izq'], reflejososteotendinosos['rot'],
                    reflejososteotendinosos['der']
                )
                cursor.execute(query_reflejososteotendinosos, values_reflejososteotendinosos)
        connection.commit()

        # Insertar datos en PRUEBAS Y EVALUACIONES COMPLEMENTARIAS
        query_pruebasevaluacionescomplementarias = """
        INSERT INTO pruebasevaluacionescomplementarias (
            id_ficha, pruebas, resultadosyanalisis
        ) VALUES (%s, %s, %s)
        """

        for pruebasevaluacionescomplementarias in data.get('datosPrueba', []):
            if pruebasevaluacionescomplementarias.get('pruebas') and pruebasevaluacionescomplementarias.get('evaluaciones'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_pruebasevaluacionescomplementarias = (
                    last_id, pruebasevaluacionescomplementarias['pruebas'], pruebasevaluacionescomplementarias['evaluaciones'],
                )
                cursor.execute(query_pruebasevaluacionescomplementarias, values_pruebasevaluacionescomplementarias)
        connection.commit()

        # Insertar datos en Vista frontal
        query_vistafrontal = """
        INSERT INTO vistafrontal (
            id_ficha, alineacion_corporal, observaciones
        ) VALUES (%s, %s, %s)
        """

        for vistafrontal in data.get('datosVistafrontal', []):
            if vistafrontal.get('observaciones3'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_vistafrontal = (
                    last_id, vistafrontal['alineacion_corporal'], vistafrontal['observaciones3']
                )
                cursor.execute(query_vistafrontal, values_vistafrontal)
        connection.commit()

        # Insertar datos en Vista lateral
        query_vistalateral = """
        INSERT INTO vistalateral (
            id_ficha, alineacion_corporal, observaciones
        ) VALUES (%s, %s, %s)
        """

        for vistalateral in data.get('datosVistalateral', []):
            if vistalateral.get('observaciones4'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_vistalateral = (
                    last_id, vistalateral['alineacion_corporal1'], vistalateral['observaciones4']
                )
                cursor.execute(query_vistalateral, values_vistalateral)
        connection.commit()

        # Insertar datos en Vista posterior
        query_vistaposterior = """
        INSERT INTO vistaposterior (
            id_ficha, alineacion_corporal, observaciones
        ) VALUES (%s, %s, %s)
        """

        for vistaposterior in data.get('datosVistaposterior', []):
            if vistaposterior.get('observaciones5'):  # Verifica que 'rangoNormal' y 'movimiento' no estén vacíos
                values_vistaposterior = (
                    last_id, vistaposterior['alineacion_corporal2'], vistaposterior['observaciones5']
                )
                cursor.execute(query_vistaposterior, values_vistaposterior)
        connection.commit()





        return jsonify({'success': True, 'last_id': last_id})

    except Error as e:
        print(f"Error al insertar los datos: '{e}'")
        return jsonify({'success': False})

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Fin seccion para insertar datos #            


if __name__ == '__main__':
    app.run(debug=True, port=5017)
