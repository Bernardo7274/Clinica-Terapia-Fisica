CREATE TABLE `clasificaciones` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nombre` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
INSERT INTO `clasificaciones` (`id`, `Nombre`) VALUES
(1, 'Miembro Superior'),
(2, 'Miembro Inferior'),
(3, 'Cabeza y tórax');


CREATE TABLE `ficha_identificaciones` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_clasificacion` int(11) DEFAULT NULL,
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
  `motivo_consulta` text DEFAULT NULL,
  CONSTRAINT `fk_id_clasificacion`
    FOREIGN KEY (`id_clasificacion`)
    REFERENCES `clasificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `antecedentespersonalesnopatologicos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
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
  CONSTRAINT `fk_id_ficha`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `antecedentesheredofamiliares` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `enfermedad` varchar(50) DEFAULT NULL,
  `si` tinyint(1) DEFAULT 0,
  `no` tinyint(1) DEFAULT 0,
  `parentesco` varchar(100) DEFAULT NULL,
  `vivo` tinyint(1) DEFAULT 0,
  `muerto` tinyint(1) DEFAULT 0,
  `otro` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  CONSTRAINT `fk_id_ficha_ahf`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `antecedentes_patologicos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `patologia` varchar(255) DEFAULT NULL,
  `si` tinyint(1) DEFAULT NULL,
  `no` tinyint(1) DEFAULT NULL,
  `edad_presentacion` int(11) DEFAULT NULL,
  `secuelas_complicaciones` text DEFAULT NULL,
  `inmunizaciones` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  CONSTRAINT `fk_id_ficha_ap`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `antecedentes_ginecobstetricos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
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
  CONSTRAINT `fk_id_ficha_ag`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `antecedentes_padecimientoactual` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  CONSTRAINT `fk_id_ficha_pa`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `exploracion` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
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
  CONSTRAINT `fk_id_ficha_expl`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `partes_cuerpo` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
INSERT INTO `partes_cuerpo` (`id`, `Nombre`) VALUES
(1, 'Miembros Superiores'),
(2, 'Miembros Inferiores'),
(3, 'Cabeza y cuello'),
(4, 'Columna, toráx y abdomen');


CREATE TABLE `des_partes_cuerpo` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `exploracion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
  CONSTRAINT `fk_id_ficha_des_partes`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `fuerza_muscular` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `derecha` varchar(255) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `izquierda` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `goniometria` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `rango_normal` varchar(50) DEFAULT NULL,
  `izquierdo` varchar(50) DEFAULT NULL,
  `movimiento` varchar(50) DEFAULT NULL,
  `derecho` varchar(50) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `reflejososteotendinosos` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `izq` varchar(255) DEFAULT NULL,
  `rot` varchar(255) DEFAULT NULL,
  `der` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `pruebasevaluacionescomplementarias` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `pruebas` varchar(255) DEFAULT NULL,
  `resultadosyanalisis` text DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `vistafrontal` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `vistalateral` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `vistaposterior` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `alineacion_corporal` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
   FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `ciclo_marcha` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `ciclo` varchar(50) DEFAULT NULL,
  `pierna_izquierda` varchar(50) DEFAULT NULL,
  `pierna_derecha` varchar(50) DEFAULT NULL,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `fuerzamuscular` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `valores_obtenidos` varchar(255) DEFAULT NULL,
  `observaciones` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `ob_partes_cuerpo` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `id_partes` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `palpacion` varchar(50) DEFAULT NULL,
  `exploracion` varchar(50) DEFAULT NULL,
  `dolor` int(11) DEFAULT NULL,
  FOREIGN KEY (`id_partes`) REFERENCES `partes_cuerpo` (`id`),
  CONSTRAINT `fk_id_ficha_ob_partes`
    FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `fuerza_muscularll` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `movimiento` varchar(255) DEFAULT NULL,
  `valores_obtenidos` varchar(255) DEFAULT NULL,
  `observaciones` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `goniometriall` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_ficha` int(11) DEFAULT NULL,
  `rangos_normales` varchar(255) DEFAULT NULL,
  `movimientos` varchar(255) DEFAULT NULL,
  `resultados` TEXT,
  FOREIGN KEY (`id_ficha`)
    REFERENCES `ficha_identificaciones` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `plan_tratamiento` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `objetivo` varchar(255) DEFAULT NULL,
  `modalidad_terapeutica` varchar(255) DEFAULT NULL,
  `descripcion` TEXT,
  `dosis` VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


CREATE TABLE `notas_seguimiento` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `diagnostico` varchar(255) DEFAULT NULL,
  `folio` varchar(10) DEFAULT NULL,
  `fecha` DATE,
  `numero_sesion` int(11),
  `notas` TEXT,
  `sugerencias_observaciones` TEXT,
  `nombre_tratante` varchar(255) DEFAULT NULL,
  `firma_encriptada` VARCHAR(64) DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
