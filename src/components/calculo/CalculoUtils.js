// Factores de conservación estándar
const FACTORES_CONSERVACION = {
  Nuevo: 1.0,
  "Buen Estado": 0.95,
  "Necesita Mantenimiento": 0.9,
  "Necesita Reparaciones": 0.85,
};

/**
 * Formatea un número a 2 decimales
 * @param {number} valor - Valor a formatear
 * @returns {number} - Valor formateado como número con 2 decimales
 */
const formatearNumero = (valor) => {
  if (valor === null || valor === undefined || isNaN(valor)) return 0;
  return parseFloat(parseFloat(valor).toFixed(2));
};

/**
 * Obtiene el factor de conservación según el estado del inmueble
 * @param {string} estado - Estado de conservación del inmueble
 * @returns {number} Factor de conservación
 */
const obtenerFactorConservacion = (estado) => {
  return FACTORES_CONSERVACION[estado] || 1.0;
};

/**
 * Determina el texto de estado de conservación basado en un factor numérico
 * @param {number} factor - Factor numérico de conservación
 * @returns {string} - Estado de conservación correspondiente o "Personalizado"
 */
const obtenerEstadoConservacionDesdeValor = (factor) => {
  if (factor === 1) return "Nuevo";
  if (factor === 0.95) return "Buen Estado";
  if (factor === 0.9) return "Necesita Mantenimiento";
  if (factor === 0.85) return "Necesita reparaciones";
  return "Personalizado";
};

/**
 * Calcula el promedio de edad basado en los años de construcción y ampliaciones
 * @param {string} anioOriginal - Año de construcción original
 * @param {Array} ampliaciones - Lista de objetos con años de ampliaciones
 * @returns {number} - Promedio de edad (año actual - promedio de años) / 100
 */
const calcularPromedioEdad = (anioOriginal, ampliaciones = []) => {
  if (!anioOriginal) return 0;

  const anioActual = new Date().getFullYear();

  // Recopilar todos los años válidos
  const anios = [parseInt(anioOriginal)];
  ampliaciones.forEach((amp) => {
    if (amp.anio && !isNaN(parseInt(amp.anio))) {
      anios.push(parseInt(amp.anio));
    }
  });

  // Calcular el promedio de años
  const sumaAnios = anios.reduce((sum, anio) => sum + anio, 0);
  const promedioAnios = sumaAnios / anios.length;

  // Fórmula para el promedio de edad: (año actual - promedio años) / 100
  const promEdad = (anioActual - promedioAnios) / 100;
  return formatearNumero(promEdad);
};

/**
 * Calcula el factor de edad basado en el promedio de edad
 * @param {number} promedioEdad - Promedio de edad calculado
 * @returns {number} - Factor de edad
 */
const calcularFactorEdad = (promedioEdad) => {
  if (!promedioEdad) return 1;

  // Fórmula para el factor edad: 1 - 0.5 * ((promedio * promedio) + promedio)
  const factorEdadCalculado =
    1 - 0.5 * (promedioEdad * promedioEdad + promedioEdad);
  return formatearNumero(Math.max(0.5, factorEdadCalculado)); // No puede ser menor a 0.5
};

/**
 * Calcula el coeficiente de edad basado en la fórmula del cliente
 * (año actual - promedio de años de construcción)/100
 * @param {Object} params - Parámetros para el cálculo
 * @param {number} params.anioOriginal - Año de construcción original
 * @param {number} params.anioAmpliacion1 - Año de primera ampliación (opcional)
 * @param {number} params.anioAmpliacion2 - Año de segunda ampliación (opcional)
 * @returns {number} Coeficiente de edad (entre 0 y 1)
 */
const calcularCoeficienteEdad = (params) => {
  const { anioOriginal, anioAmpliacion1, anioAmpliacion2 } = params;
  const anioActual = new Date().getFullYear();

  // Si solo hay año original
  if (!anioAmpliacion1 && !anioAmpliacion2) {
    return formatearNumero(Math.max(0.5, (anioActual - anioOriginal) / 100));
  }

  // Si hay ampliaciones, calcular promedio
  let sumAnios = anioOriginal;
  let cantidadAnios = 1;

  if (anioAmpliacion1) {
    sumAnios += anioAmpliacion1;
    cantidadAnios++;
  }

  if (anioAmpliacion2) {
    sumAnios += anioAmpliacion2;
    cantidadAnios++;
  }

  const promedio = sumAnios / cantidadAnios;
  return formatearNumero(Math.max(0.5, (anioActual - promedio) / 100));
};

/**
 * Calcula el precio por metro cuadrado corregido
 * @param {number} precioMetro - Precio por metro cuadrado base
 * @param {number} factorEdad - Factor de edad
 * @param {number} factorConservacion - Factor de conservación
 * @returns {number} - Precio por metro cuadrado corregido
 */
const calcularPrecioMetroCorregido = (
  precioMetro,
  factorEdad,
  factorConservacion
) => {
  if (!precioMetro || !factorEdad || !factorConservacion) return 0;

  const valorCorregido =
    parseFloat(precioMetro) *
    parseFloat(factorConservacion) *
    parseFloat(factorEdad);
  return formatearNumero(valorCorregido);
};

/**
 * Calcula el factor conservación promedio ponderado de todas las superficies
 * @param {Array} superficies - Array de superficies cubiertas
 * @returns {number} Factor conservación promedio ponderado
 */
const calcularFactorConservacionPromedio = (superficies) => {
  if (!superficies || superficies.length === 0) return 1;

  let totalMetros = 0;
  let sumaPonderadaFactorConservacion = 0;

  superficies.forEach((sup) => {
    const metros = parseFloat(sup.m2) || 0;
    const factorConservacion = parseFloat(sup.factorConservacion) || 1;

    totalMetros += metros;
    sumaPonderadaFactorConservacion += metros * factorConservacion;
  });

  if (totalMetros === 0) return 1;

  const promedio = sumaPonderadaFactorConservacion / totalMetros;
  return formatearNumero(promedio);
};

/**
 * Calcula el factor edad promedio ponderado de todas las superficies
 * @param {Array} superficies - Array de superficies cubiertas
 * @returns {number} Factor edad promedio ponderado
 */
const calcularFactorEdadPromedio = (superficies) => {
  if (!superficies || superficies.length === 0) return 1;

  let totalMetros = 0;
  let sumaPonderadaFactorEdad = 0;

  superficies.forEach((sup) => {
    const metros = parseFloat(sup.m2) || 0;
    const factorEdad = parseFloat(sup.factorEdad) || 1;

    totalMetros += metros;
    sumaPonderadaFactorEdad += metros * factorEdad;
  });

  if (totalMetros === 0) return 1;

  const promedio = sumaPonderadaFactorEdad / totalMetros;
  return formatearNumero(promedio);
};

/**
 * Calcula el valor intrínseco según el tipo de propiedad
 * @param {number} valorTerreno - Valor del terreno o cuota parte para PH
 * @param {number} valorObraCivil - Valor de la obra civil (suma de superficies cubiertas)
 * @param {string} tipoPropiedad - Tipo de propiedad ('pc', 'ph', 'terreno')
 * @returns {number} Valor intrínseco
 */
const calcularValorIntrinseco = (
  valorTerreno,
  valorObraCivil,
  tipoPropiedad = "pc"
) => {
  // Para cualquier tipo de propiedad, el valor intrínseco es la suma del valor del terreno (o cuota parte)
  // y el valor de la obra civil
  return formatearNumero(parseFloat(valorTerreno) + parseFloat(valorObraCivil));
};

/**
 * Calcula la cuota parte en valor monetario
 * @param {number} valorTerreno - Valor total del terreno
 * @param {number} porcentajeCuotaParte - Porcentaje de cuota parte (0-100)
 * @returns {number} Valor monetario de la cuota parte
 */
const calcularValorCuotaParte = (valorTerreno, porcentajeCuotaParte) => {
  if (!valorTerreno || !porcentajeCuotaParte) return 0;
  return formatearNumero(
    (parseFloat(porcentajeCuotaParte) / 100) * parseFloat(valorTerreno)
  );
};

/**
 * Calcula el porcentaje de cuota parte basado en la superficie de obra civil
 * @param {Array} superficies - Array de superficies cubiertas propias
 * @param {number} superficieTotalEdificio - Superficie total de todos los PH en el edificio
 * @returns {number} Porcentaje de cuota parte (0-100)
 */
const calcularPorcentajeCuotaParte = (superficies, superficieTotalEdificio) => {
  if (
    !superficies ||
    !superficieTotalEdificio ||
    parseFloat(superficieTotalEdificio) <= 0
  )
    return 0;

  // Sumamos todos los metros cuadrados de superficies propias
  const totalMetrosCuadrados = superficies.reduce((total, superficie) => {
    // Solo considerar superficies propias, no las comunes
    if (superficie.tipoSuperficie !== "comun") {
      // Asegurar que m2 sea un número válido
      const m2 =
        typeof superficie.m2 === "string"
          ? superficie.m2 === "G"
            ? 0
            : parseFloat(superficie.m2) || 0
          : parseFloat(superficie.m2) || 0;

      return total + m2;
    }
    return total;
  }, 0);

  // Solo calcular si tenemos metros cuadrados válidos
  if (totalMetrosCuadrados <= 0) return 0;

  const porcentaje =
    (totalMetrosCuadrados / parseFloat(superficieTotalEdificio)) * 100;
  return formatearNumero(porcentaje);
};

/**
 * Calcula el valor de mercado por metro cuadrado para Itaú
 * @param {number} valorTotal - Valor total en USD
 * @param {number} totalMetrosCuadrados - Total de metros cuadrados
 * @returns {number} - Valor por metro cuadrado
 */
const calcularValorMercadoPorMetroCuadradoItau = (
  valorTotal,
  totalMetrosCuadrados
) => {
  if (!valorTotal || !totalMetrosCuadrados || totalMetrosCuadrados <= 0)
    return 0;
  return formatearNumero(valorTotal / totalMetrosCuadrados);
};

/**
 * Calcula el valor por metro cuadrado para Itaú (para cualquier tipo de valor)
 * @param {number} valorTotal - Valor total en USD (mercado, QSV, remate, etc.)
 * @param {number} totalMetrosCuadrados - Total de metros cuadrados
 * @returns {number} - Valor por metro cuadrado
 */
const calcularValorPorMetroCuadradoItau = (
  valorTotal,
  totalMetrosCuadrados
) => {
  if (!valorTotal || !totalMetrosCuadrados || totalMetrosCuadrados <= 0)
    return 0;
  return formatearNumero(valorTotal / totalMetrosCuadrados);
};

/**
 * Calcula el valor de venta rápida (QSV) para Itaú como promedio entre valor de mercado y valor de remate
 * @param {number} valorMercado - Valor de mercado en USD
 * @param {number} valorRemate - Valor de remate en USD
 * @returns {number} - Valor de venta rápida (QSV)
 */
const calcularValorVentaRapidaItau = (valorMercado, valorRemate) => {
  if (!valorMercado || !valorRemate) return 0;
  return formatearNumero(
    (parseFloat(valorMercado) + parseFloat(valorRemate)) / 2
  );
};

/**
 * Calcula el valor de remate para Itaú como el 80% del valor de mercado
 * @param {number} valorMercado - Valor de mercado en USD
 * @returns {number} - Valor de remate
 */
const calcularValorRemateItau = (valorMercado) => {
  if (!valorMercado) return 0;
  return formatearNumero(parseFloat(valorMercado) * 0.8);
};

/**
 * Calcula el valor en UI basado en el valor en USD, cotización del dólar y valor de la UI
 * @param {number} valorUSD - Valor en dólares
 * @param {number} cotizacionDolar - Cotización del dólar
 * @param {number} valorUI - Valor de la UI
 * @returns {number} - Valor en UI
 */
/**
 * Calcula el valor en UI basado en el valor en USD, cotización del dólar y valor de la UI
 * @param {number} valorUSD - Valor en dólares
 * @param {number} cotizacionDolar - Cotización del dólar
 * @param {number} valorUI - Valor de la UI
 * @returns {number} - Valor en UI
 */
const calcularValorUI = (valorUSD, cotizacionDolar, valorUI) => {
  if (!valorUSD || !cotizacionDolar || !valorUI || valorUI <= 0) return 0;
  
  // Convertir USD a pesos y luego a UI
  const valorEnPesos = parseFloat(valorUSD) * parseFloat(cotizacionDolar);
  const valorEnUI = valorEnPesos / parseFloat(valorUI);
  
  return formatearNumero(valorEnUI);
};

/**
 * Calcula el valor de reposición a nuevo según la fórmula del cliente
 * @param {Array} superficies - Array de superficies cubiertas
 * @returns {number} Valor de reposición a nuevo
 */
const calcularValorReposicionNuevo = (superficies) => {
  // Sumar el valor nominal (sin corrección por edad/conservación) de todas las superficies
  const total = superficies.reduce((total, superficie) => {
    // Precio por m² base × metros cuadrados
    return (
      total +
      parseFloat(superficie.precioMetro || 0) * parseFloat(superficie.m2 || 0)
    );
  }, 0);

  return formatearNumero(total);
};

/**
 * Calcula el valor del terreno
 * @param {number} superficieTerreno - Superficie del terreno en m²
 * @param {number} valorMetroTerreno - Valor por metro cuadrado del terreno
 * @returns {number} Valor total del terreno
 */
const calcularValorTerreno = (superficieTerreno, valorMetroTerreno) => {
  return formatearNumero(
    parseFloat(superficieTerreno) * parseFloat(valorMetroTerreno)
  );
};

/**
 * Calcula el valor total de la obra civil (todas las superficies cubiertas)
 * @param {Array} superficies - Array de superficies cubiertas
 * @returns {number} Valor total de la obra civil
 */
const calcularValorObraCivil = (superficies) => {
  const total = superficies.reduce((total, superficie) => {
    return total + parseFloat(superficie.valorTotal || 0);
  }, 0);

  return formatearNumero(total);
};

/**
 * Calcula el valor total de una superficie (m² × precio por m² corregido)
 * @param {number} metros - Metros cuadrados
 * @param {number} precioCorregido - Precio por metro cuadrado corregido
 * @returns {number} Valor total
 */
const calcularValorTotalSuperficie = (metros, precioCorregido) => {
  return formatearNumero(parseFloat(metros) * parseFloat(precioCorregido));
};

/**
 * Calcula el valor de venta rápida (90% del valor de mercado)
 * @param {number} valorMercado - Valor de mercado del inmueble
 * @returns {number} Valor de venta rápida
 */
const calcularValorVentaRapida = (valorMercado) =>
  formatearNumero(parseFloat(valorMercado) * 0.9);

/**
 * Calcula el valor de remate (80% del valor de mercado)
 * @param {number} valorMercado - Valor de mercado del inmueble
 * @returns {number} Valor de remate
 */
const calcularValorRemate = (valorMercado) =>
  formatearNumero(parseFloat(valorMercado) * 0.8);

/**
 * Calcula el valor final de un inmueble según su tipo
 * @param {Object} params - Parámetros para el cálculo
 * @param {string} params.tipoPropiedad - Tipo de propiedad ('casa', 'departamento', 'ph', 'terreno')
 * @param {number} params.valorReposicion - Valor de reposición
 * @param {number} params.factorEdad - Factor de edad
 * @param {number} params.factorConservacion - Factor de conservación
 * @param {number} [params.factorFrente] - Factor de frente (solo para terrenos)
 * @param {number} [params.factorFondo] - Factor de fondo (solo para terrenos)
 * @param {number} [params.cuotaParteTerreno] - Cuota parte del terreno (solo para PH)
 * @returns {number} Valor final calculado
 */
const calcularValorFinal = (params) => {
  const {
    tipoPropiedad,
    valorReposicion,
    factorEdad,
    factorConservacion,
    factorFrente,
    factorFondo,
    cuotaParteTerreno,
  } = params;

  let valorFinal = 0;

  // Fórmula general: ValorFinal = ValorReposición × FactorEdad × FactorConservación
  valorFinal = valorReposicion * factorEdad * factorConservacion;

  // Ajustes según tipo de propiedad
  if (tipoPropiedad === "terreno" && factorFrente && factorFondo) {
    // Para terrenos, se aplican factores adicionales de frente y fondo
    valorFinal = valorFinal * factorFrente * factorFondo;
  } else if (tipoPropiedad === "ph" && cuotaParteTerreno) {
    // Para PH, se suma la cuota parte del terreno
    valorFinal += cuotaParteTerreno;
  }
  // Para PC (antes 'casa' y 'departamento') se usa la fórmula general sin ajustes adicionales

  return formatearNumero(valorFinal);
};

/**
 * Calcula el valor de los bienes comunes de uso común (17% del valor de bienes propios)
 * @param {Array} superficiesPropias - Array de superficies de tipo propio
 * @returns {number} Valor total de bienes comunes
 */
const calcularValorBienesComunes = (superficiesPropias) => {
  const valorTotalPropios = superficiesPropias.reduce(
    (total, sup) => total + parseFloat(sup.valorTotal || 0),
    0
  );

  return formatearNumero(valorTotalPropios * 0.17);
};

// No olvides exportar la nueva función
export {
  // ... otras exportaciones existentes
  calcularValorBienesComunes,
};

/**
 * Calcula el valor por metro cuadrado
 * @param {number} valor - Valor total
 * @param {number} superficie - Superficie en metros cuadrados
 * @returns {number} Valor por metro cuadrado (redondeado a 2 decimales)
 */
const calcularValorMetroCuadrado = (valor, superficie) => {
  if (!valor || !superficie || superficie <= 0) return 0;
  const resultado = parseFloat(valor) / parseFloat(superficie);
  return formatearNumero(resultado);
};

/**
 * Calcula la superficie construida total de todas las superficies
 * @param {Array} superficies - Array de superficies cubiertas
 * @returns {number} Superficie construida total en m²
 */
const calcularSuperficieConstruidaTotal = (superficies) => {
  const total = superficies.reduce((total, superficie) => {
    return total + parseFloat(superficie.m2 || 0);
  }, 0);

  return formatearNumero(total);
};

/**
 * Verifica si el valor homologado difiere más del porcentaje permitido
 * @param {number} valorCalculado - Valor calculado automáticamente
 * @param {number} valorHomologado - Valor homologado (ingresado manualmente)
 * @param {number} porcentajeMaximo - Porcentaje máximo de diferencia permitido
 * @returns {boolean} True si la diferencia supera el porcentaje máximo
 */
const verificarDiferenciaHomologacion = (
  valorCalculado,
  valorHomologado,
  porcentajeMaximo = 20
) => {
  if (!valorCalculado || !valorHomologado) return false;

  const diferenciaPorcentual = Math.abs(
    ((valorHomologado - valorCalculado) / valorCalculado) * 100
  );
  return diferenciaPorcentual > porcentajeMaximo;
};

/**
 * Convierte un string de años (formato "1935;1970;2013") en un array de objetos para el componente
 * @param {string} ampliacionesString - String con años separados por punto y coma
 * @returns {Object} - Objeto con año original y array de ampliaciones
 */
const parseStringAmpliaciones = (ampliacionesString) => {
  if (!ampliacionesString) return { anioOriginal: "", ampliaciones: [] };

  const anios = ampliacionesString.split(";");

  const anioOriginal = anios[0] || "";

  // Convertir ampliaciones restantes al formato interno
  const ampliaciones = anios.slice(1).map((anio, index) => ({
    id: Date.now() + index,
    anio: anio.trim(),
  }));

  return { anioOriginal, ampliaciones };
};

/**
 * Convierte un array de objetos de ampliaciones a string formato "1935;1970;2013"
 * @param {string} anioOriginal - Año original de construcción
 * @param {Array} ampliaciones - Array de objetos con años de ampliaciones
 * @returns {string} - String con todos los años separados por punto y coma
 */
const convertirAmpliacionesAString = (anioOriginal, ampliaciones = []) => {
  if (!anioOriginal) return "";

  const aniosOrdenados = [anioOriginal];
  ampliaciones.forEach((amp) => {
    if (amp.anio) aniosOrdenados.push(amp.anio);
  });

  return aniosOrdenados.join(";");
};

/**
 * Función para obtener el factor de edad de una superficie
 * @param {number} edad - Edad de la construcción
 * @returns {number} - Factor de edad
 */
const obtenerFactorEdad = (edad) => {
  const edadNum = parseFloat(edad) || 0;
  // El mínimo es 0.5 y el máximo es 1.0
  return Math.max(1 - edadNum * 0.01, 0.5);
};

/**
 * Recalcula todos los valores de una superficie para asegurar consistencia
 * @param {Object} superficie - Objeto de superficie a recalcular
 * @returns {Object} - Superficie con valores recalculados
 */
const recalcularSuperficie = (superficie) => {
  // Hacemos una copia para no mutar el objeto original
  const resultado = { ...superficie };

  // Aseguramos que los valores numéricos sean números
  const m2 = parseFloat(resultado.m2) || 0;
  const precioMetro = parseFloat(resultado.precioMetro) || 0;
  const factorEdad = parseFloat(resultado.factorEdad) || 1;
  const factorConservacion = parseFloat(resultado.factorConservacion) || 1;

  // Calculamos el precio metro corregido
  resultado.precioMetroCorregido = calcularPrecioMetroCorregido(
    precioMetro,
    factorEdad,
    factorConservacion
  );

  // Calculamos el valor total
  resultado.valorTotal = calcularValorTotalSuperficie(
    m2,
    resultado.precioMetroCorregido
  );

  // Aseguramos que el estado de conservación sea coherente con el factor
  resultado.conservacion =
    obtenerEstadoConservacionDesdeValor(factorConservacion);

  return resultado;
};

export {
  // Funciones de formateo y conversión
  formatearNumero,
  parseStringAmpliaciones,
  convertirAmpliacionesAString,

  // Funciones para factores de conservación
  obtenerFactorConservacion,
  obtenerEstadoConservacionDesdeValor,
  calcularFactorConservacionPromedio,

  // Funciones para cálculos de edad
  calcularPromedioEdad,
  calcularFactorEdad,
  calcularCoeficienteEdad,
  calcularFactorEdadPromedio,
  obtenerFactorEdad,

  // Funciones para precios y valores
  calcularPrecioMetroCorregido,
  calcularValorTotalSuperficie,
  calcularValorVentaRapida,
  calcularValorRemate,
  calcularValorFinal,
  calcularValorMetroCuadrado,

  // Funciones para cálculos globales
  calcularValorIntrinseco,
  calcularValorReposicionNuevo,
  calcularValorTerreno,
  calcularValorObraCivil,
  calcularSuperficieConstruidaTotal,
  verificarDiferenciaHomologacion,

  // Función para recalcular superficies
  recalcularSuperficie,
  calcularValorCuotaParte,
  calcularPorcentajeCuotaParte,
  calcularValorMercadoPorMetroCuadradoItau,
  calcularValorPorMetroCuadradoItau,
  calcularValorVentaRapidaItau,
  calcularValorRemateItau,
  calcularValorUI,
};
