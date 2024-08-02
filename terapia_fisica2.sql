CREATE TABLE `partes_cuerpo` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
INSERT INTO `partes_cuerpo` (`id`, `Nombre`) VALUES
(1, 'Miembros Superiores'),
(2, 'Miembros Inferiores'),
(3, 'Cabeza y cuello'),
(4, 'Columna, toráx y abdomen');

-- Tabla ficha_identificaciones
CREATE TABLE `ficha_identificaciones` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `fecha_elaboracion` date DEFAULT NULL,
  `nombre_paciente` varchar(255) DEFAULT NULL,
  `genero` varchar(25) DEFAULT NULL,
  `folio` int(11) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `lugar_nacimiento` varchar(255) DEFAULT NULL,
  `ocupacion` varchar(255) DEFAULT NULL,
  `domicilio_actual` varchar(300) DEFAULT NULL,
  `estado_civil` varchar(20) DEFAULT NULL,
  `nacionalidad` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contacto_emergencia_nombre` varchar(255) DEFAULT NULL,
  `contacto_emergencia_telefono` varchar(20) DEFAULT NULL,
  `diagnostico_medico` text DEFAULT NULL,
  `elaboro_historial_clinico` varchar(255) DEFAULT NULL,
  `motivo_consulta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla antecedentespersonalesnopatologicos
CREATE TABLE `antecedentespersonalesnopatologicos` (
  `id_ficha` int(11) DEFAULT NULL,
  `PropiaRenta` varchar(255) DEFAULT NULL,
  `Ventilacion` varchar(255) DEFAULT NULL,
  `Iluminacion` varchar(255) DEFAULT NULL,
  `Piso` varchar(255) DEFAULT NULL,
  `Electrodomesticos` varchar(255) DEFAULT NULL,
  `Servicios` varchar(255) DEFAULT NULL,
  `DescripcionVivienda` text DEFAULT NULL,
  `NoComidasDia` int(11) DEFAULT NULL,
  `AguaLts` float DEFAULT NULL,
  `GruposAlimenticios` varchar(255) DEFAULT NULL,
  `DescripcionRutinaAlimenticia` text DEFAULT NULL,
  `HigieneBucal` varchar(255) DEFAULT NULL,
  `BanosDia` int(11) DEFAULT NULL,
  `CambiosRopa` varchar(255) DEFAULT NULL,
  `ActividadFisica` varchar(255) DEFAULT NULL,
  `Deporte` varchar(255) DEFAULT NULL,
  `Ocio` varchar(255) DEFAULT NULL,
  `Ocupacion` varchar(255) DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla antecedentesheredofamiliares
CREATE TABLE `antecedentesheredofamiliares` (
  `id_ficha` int(11) DEFAULT NULL,
  `enfermedad` varchar(50) DEFAULT NULL,
  `si` tinyint(1) DEFAULT 0,
  `no` tinyint(1) DEFAULT 0,
  `parentesco` varchar(100) DEFAULT NULL,
  `vivo` tinyint(1) DEFAULT 0,
  `muerto` tinyint(1) DEFAULT 0,
  `otro` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla antecedentes_patologicos
CREATE TABLE `antecedentes_patologicos` (
  `id_ficha` int(11) DEFAULT NULL,
  `patologia` varchar(255) DEFAULT NULL,
  `si` tinyint(1) DEFAULT NULL,
  `no` tinyint(1) DEFAULT NULL,
  `edad_presentacion` int(11) DEFAULT NULL,
  `secuelas_complicaciones` text DEFAULT NULL,
  `inmunizaciones` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla antecedentes_ginecobstetricos
CREATE TABLE `antecedentes_ginecobstetricos` (
  `id_ficha` int(11) DEFAULT NULL,
  `menarquia` varchar(255) DEFAULT NULL,
  `fecha_ultima_menstruacion` date DEFAULT NULL,
  `caracteristicas_menstruacion` text DEFAULT NULL,
  `inicio_vida_sexual` date DEFAULT NULL,
  `uso_anticonceptivos` varchar(255) DEFAULT NULL,
  `numero_embarazos` int(11) DEFAULT NULL,
  `numero_partos` int(11) DEFAULT NULL,
  `numero_cesareas` int(11) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla antecedentes_padecimientoactual
CREATE TABLE `antecedentes_padecimientoactual` (
  `id_ficha` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla exploracion
CREATE TABLE `exploracion` (
  `id_ficha` int(11) NOT NULL,
  `habitus_exterior` varchar(255) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `imc` decimal(5,2) DEFAULT NULL,
  `temperatura` decimal(4,2) DEFAULT NULL,
  `pulso_cardiaco` int(11) DEFAULT NULL,
  `frecuencia_respiratoria` int(11) DEFAULT NULL,
  `presion_arterial` varchar(50) DEFAULT NULL,
  `saturacion_oxigeno` decimal(4,2) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `resultados_previos_actuales` text DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla partes_cuerpo_miembro_superior
CREATE TABLE `partes_cuerpo_miembro_superior` (
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla fuerza_muscular_miembro_superior
CREATE TABLE `fuerza_muscular_miembro_superior` (
  `id_ficha` int(11) DEFAULT NULL,
  `derecha` varchar(255) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `izquierda` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla goniometria_miembro_superior
CREATE TABLE `goniometria_miembro_superior` (
  `id_ficha` int(11) DEFAULT NULL,
  `rango_normal` varchar(50) DEFAULT NULL,
  `izquierdo` varchar(50) DEFAULT NULL,
  `movimiento` varchar(50) DEFAULT NULL,
  `derecho` varchar(50) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla reflejososteotendinosos_miembro_superior
CREATE TABLE `reflejososteotendinosos_miembro_superior` (
  `id_ficha` int(11) DEFAULT NULL,
  `izq` varchar(255) DEFAULT NULL,
  `rot` varchar(255) DEFAULT NULL,
  `der` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla pruebasevaluacionescomplementarias_miembro_superior
CREATE TABLE `pruebasevaluacionescomplementarias_miembro_superior` (
  `id_ficha` int(11) DEFAULT NULL,
  `pruebas` varchar(255) DEFAULT NULL,
  `resultadosyanalisis` text DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla partes_cuerpo_miembro_inferior
CREATE TABLE `partes_cuerpo_miembro_inferior` (
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla fuerza_muscular_miembro_inferior
CREATE TABLE `fuerza_muscular_miembro_inferior` (
  `id_ficha` int(11) DEFAULT NULL,
  `derecha` varchar(255) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `izquierda` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla goniometria_miembro_inferior
CREATE TABLE `goniometria_miembro_inferior` (
  `id_ficha` int(11) DEFAULT NULL,
  `rango_normal` varchar(50) DEFAULT NULL,
  `izquierdo` varchar(50) DEFAULT NULL,
  `movimiento` varchar(50) DEFAULT NULL,
  `derecho` varchar(50) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla reflejososteotendinosos_miembro_inferior
CREATE TABLE `reflejososteotendinosos_miembro_inferior` (
  `id_ficha` int(11) DEFAULT NULL,
  `izq` varchar(255) DEFAULT NULL,
  `rot` varchar(255) DEFAULT NULL,
  `der` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla pruebasevaluacionescomplementarias_miembro_inferior
CREATE TABLE `pruebasevaluacionescomplementarias_miembro_inferior` (
  `id_ficha` int(11) DEFAULT NULL,
  `pruebas` varchar(255) DEFAULT NULL,
  `resultadosyanalisis` text DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla ciclo_marcha_miembro_inferior
CREATE TABLE ciclo_marcha_miembro_inferior (
    id_ficha INT DEFAULT NULL,
    fase_apoyo_completo VARCHAR(255) DEFAULT NULL,
    contacto_talon_izquierdo VARCHAR(255) DEFAULT NULL,
    contacto_talon_derecho VARCHAR(255) DEFAULT NULL,
    apoyo_plantar_izquierdo VARCHAR(255) DEFAULT NULL,
    apoyo_plantar_derecho VARCHAR(255) DEFAULT NULL,
    apoyo_medio_izquierdo VARCHAR(255) DEFAULT NULL,
    apoyo_medio_derecho VARCHAR(255) DEFAULT NULL,
    fase_oscilacion_completo VARCHAR(255) DEFAULT NULL,
    balanceo_inicial_izquierdo VARCHAR(255) DEFAULT NULL,
    balanceo_inicial_derecho VARCHAR(255) DEFAULT NULL,
    balanceo_medio_izquierdo VARCHAR(255) DEFAULT NULL,
    balanceo_medio_derecho VARCHAR(255) DEFAULT NULL,
    balanceo_terminal_izquierdo VARCHAR(255) DEFAULT NULL,
    balanceo_terminal_derecho VARCHAR(255) DEFAULT NULL,
    rotacion_pelvica_completo VARCHAR(255) DEFAULT NULL,
    inclinacion_pelvica_completo VARCHAR(255) DEFAULT NULL,
    flexion_rodilla_izquierdo VARCHAR(255) DEFAULT NULL,
    flexion_rodilla_derecho VARCHAR(255) DEFAULT NULL,
    movimientos_coordinados_rodilla_tobillo_izquierdo VARCHAR(255) DEFAULT NULL,
    movimientos_coordinados_rodilla_tobillo_derecho VARCHAR(255) DEFAULT NULL,
    movimiento_centro_gravedad_completo VARCHAR(255) DEFAULT NULL,
    cadencia_completo VARCHAR(255) DEFAULT NULL,
    balanceo_ms_completo VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla partes_cuerpo_cabeza_y_torax
CREATE TABLE `partes_cuerpo_cabeza_y_torax` (
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla fuerza_muscular_cabeza_y_torax
CREATE TABLE `fuerza_muscular_cabeza_y_torax` (
  `id_ficha` int(11) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `valores_obtenidos` varchar(255) DEFAULT NULL,
  `observaciones` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla partes_cuerpo_cabeza_y_torax1
CREATE TABLE `partes_cuerpo_cabeza_y_torax1` (
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla fuerza_muscular_cabeza_y_torax1
CREATE TABLE `fuerza_muscular_cabeza_y_torax1` (
  `id_ficha` int(11) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `valores_obtenidos` varchar(255) DEFAULT NULL,
  `observaciones` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla goniometria_cabeza_y_torax
CREATE TABLE `goniometria_cabeza_y_torax` (
  `id_ficha` int(11) DEFAULT NULL,
  `rangos_normales` varchar(255) DEFAULT NULL,
  `movimientos` varchar(255) DEFAULT NULL,
  `resultados` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla pruebasevaluacionescomplementarias_cabeza_y_torax
CREATE TABLE `pruebasevaluacionescomplementarias_cabeza_y_torax` (
  `id_ficha` int(11) DEFAULT NULL,
  `pruebas` varchar(255) DEFAULT NULL,
  `resultadosyanalisis` text DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla vistafrontal
CREATE TABLE `vistafrontal` (
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla vistalateral
CREATE TABLE `vistalateral` (
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Tabla vistaposterior
CREATE TABLE `vistaposterior` (
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
