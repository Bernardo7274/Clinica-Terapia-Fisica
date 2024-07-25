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
            database='terapia_fisica1'
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

        # Obtener el último ID insertado en ficha_identificaciones
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
                    last_id, movimiento['derecha'], movimiento['movimiento'],
                    movimiento['izquierda']
                )
                cursor.execute(query_fuerza_muscular, values_fuerza_muscular)
        connection.commit()

        # Insertar datos en goniometria
        query_goniometria = """
        INSERT INTO goniometria (
            id_ficha, rango_normal, izquierdo, movimiento, derecho
        ) VALUES (%s, %s, %s, %s, %s)
        """

        for movimiento_gonio in data.get('datosMovimientos', []):
            if movimiento_gonio.get('izquierdo') and movimiento_gonio.get('derecho'):  # Verifica si 'izquierdo' y 'derecho' no están vacíos
                values_goniometria = (
                    last_id, movimiento_gonio['rango_normal'], movimiento_gonio['izquierdo'],
                    movimiento_gonio['movimiento'], movimiento_gonio['derecho']
                )
                cursor.execute(query_goniometria, values_goniometria)
        connection.commit()

        cursor.close()
        return jsonify({'success': True})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

    finally:
        connection.close()


# Fin seccion para insertar datos #            


if __name__ == '__main__':
    app.run(debug=True, port=5017)
