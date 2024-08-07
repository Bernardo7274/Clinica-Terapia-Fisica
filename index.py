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

@app.route('/guardar_datosMiembroInf', methods=['POST'])
def guardar_datosMiembroInf():
    datos = request.json
    connection = create_connection()
    cursor = connection.cursor()

    # Insertar PartesCuerpo_MiembroInferior
    partesCuerpoInf_query = """
    INSERT INTO partes_cuerpo_miembro_inferior(id_ficha, id_partes, observacion, palpacion, descripcion, dolor)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    partesCuerpoInf_data = (
        1, 1, datos['observacion'], datos['palpacion'], datos['descripcion'], datos['numdolor']
    )
    cursor.execute(partesCuerpoInf_query, partesCuerpoInf_data)
    connection.commit()

    # Insertar datos en Fuerza Muscular
    for FuerzaInf in datos['datosMovimientos']:
        fuerzaMuscularInf_query = """
        INSERT INTO fuerza_muscular_miembro_inferior (id_ficha, derecha, movimiento, izquierda) 
        VALUES (%s, %s, %s, %s)
        """
        fuerzaMuscularInf_data = (
            1, FuerzaInf['der'], FuerzaInf['movimiento'], FuerzaInf['izq']
        )
        cursor.execute(fuerzaMuscularInf_query, fuerzaMuscularInf_data)
    connection.commit()

    # Insertar datos en Goniometria
    for goniometria in datos['datosGoniometria']:
        goniometria_miembro_inferior_query = """
        INSERT INTO goniometria_miembro_inferior(id_ficha, rango_normal, izquierdo, movimiento, derecho)
        VALUES (%s, %s, %s, %s, %s)
        """
        goniometria_miembro_inferior_data = (
            1, goniometria['rangoNormal'], goniometria['izq'], goniometria['movimiento'], goniometria['der']
        )
        cursor.execute(goniometria_miembro_inferior_query, goniometria_miembro_inferior_data)
    connection.commit()

    # Insertar datos Reflejos Osteotendinosos
    for reflejos in datos['datosOsteotendinosos']:
        reflejososteotendinosos_miembro_inferior_query = """
        INSERT INTO reflejososteotendinosos_miembro_inferior(id_ficha, izq, rot, der)
        VALUES (%s, %s, %s, %s)
        """
        reflejososteotendinosos_miembro_inferior_data = (
            1, reflejos['izq'], reflejos['rot'], reflejos['der']
        )
        cursor.execute(reflejososteotendinosos_miembro_inferior_query, reflejososteotendinosos_miembro_inferior_data)
    connection.commit()

    # Insertar datos en PruebasEvaluacionesComplementarias
    datos_list = [
        (1, datos['prueba1'], datos['resultadoAnalisis1']),
        (1, datos['prueba2'], datos['resultadoAnalisis2']),
        (1, datos['prueba3'], datos['resultadoAnalisis3']),
        (1, datos['prueba4'], datos['resultadoAnalisis4'])
    ]
    pruebasevaluacionescomplementarias_miembro_inferior_query = """
        INSERT INTO pruebasevaluacionescomplementarias_miembro_inferior(id_ficha, pruebas, resultadosyanalisis)
        VALUES (%s, %s, %s)
    """
    for data in datos_list:
        cursor.execute(pruebasevaluacionescomplementarias_miembro_inferior_query, data)
    connection.commit()

    # Insertar datos en Ciclo Marcha
    cicloMarchaInf_query = """
    INSERT INTO ciclo_marcha_miembro_inferior (
        id_ficha, fase_apoyo_completo, contacto_talon_izquierdo, contacto_talon_derecho,
        apoyo_plantar_izquierdo, apoyo_plantar_derecho, apoyo_medio_izquierdo,
        apoyo_medio_derecho, fase_oscilacion_completo, balanceo_inicial_izquierdo,
        balanceo_inicial_derecho, balanceo_medio_izquierdo, balanceo_medio_derecho,
        balanceo_terminal_izquierdo, balanceo_terminal_derecho, rotacion_pelvica_completo,
        inclinacion_pelvica_completo, flexion_rodilla_izquierdo, flexion_rodilla_derecho,
        movimientos_coordinados_rodilla_tobillo_izquierdo, movimientos_coordinados_rodilla_tobillo_derecho,
        movimiento_centro_gravedad_completo, cadencia_completo, balanceo_ms_completo
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    ciclo_marchaInf_data = (
        1, datos['faseApoyoCompleto'], datos['contactoTalonIzquierdo'],
        datos['contactoTalonDerecho'], datos['apoyoPlantarIzquierdo'], datos['apoyoPlantarDerecho'],
        datos['apoyoMedioIzquierdo'], datos['apoyoMedioDerecho'], datos['faseOscilacionCompleto'],
        datos['balanceoInicialIzquierdo'], datos['balanceoInicialDerecho'], datos['balanceoMedioIzquierdo'],
        datos['balanceoMedioDerecho'], datos['balanceoTerminalIzquierdo'], datos['balanceoTerminalDerecho'],
        datos['rotacionPelvicaCompleto'], datos['inclinacionPelvicaCompleto'], datos['flexionRodillaIzquierdo'],
        datos['flexionRodillaDerecho'], datos['movimientosCoordinadosRodillaTobilloIzquierdo'],
        datos['movimientosCoordinadosRodillaTobilloDerecho'], datos['movimientoCentroGravedadCompleto'],
        datos['cadenciaCompleto'], datos['balanceoMsCompleto']
    )
    cursor.execute(cicloMarchaInf_query, ciclo_marchaInf_data)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True, port=5011)