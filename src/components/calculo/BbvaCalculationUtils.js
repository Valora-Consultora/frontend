import { formatearNumero } from './CalculoUtils';

/**
 * Calcula el valor por metro cuadrado para BBVA
 * @param {number} valor - Valor total
 * @param {number} superficie - Superficie en metros cuadrados
 * @returns {number} - Valor por metro cuadrado
 */
export const calcularValorPorMetroCuadradoBbva = (valor, superficie) => {
    if (!valor || !superficie || superficie <= 0) return 0;
    return formatearNumero(valor / superficie);
};

/**
 * Calcula el valor de venta rápida (90% del valor de mercado)
 * @param {number} valorMercado - Valor de mercado
 * @returns {number} - Valor de venta rápida
 */
export const calcularValorVentaRapidaBbva = (valorMercado) => {
    if (!valorMercado) return 0;
    return formatearNumero(parseFloat(valorMercado) * 0.9);
};

/**
 * Calcula el valor de remate (80% del valor de mercado)
 * @param {number} valorMercado - Valor de mercado
 * @returns {number} - Valor de remate
 */
export const calcularValorRemateBbva = (valorMercado) => {
    if (!valorMercado) return 0;
    return formatearNumero(parseFloat(valorMercado) * 0.8);
};

/**
 * Calcula el valor intrínseco (suma del valor de terreno y obra civil)
 * @param {number} valorTerreno - Valor del terreno
 * @param {number} valorObraCivil - Valor de la obra civil
 * @returns {number} - Valor intrínseco
 */
export const calcularValorIntrisecoBbva = (valorTerreno, valorObraCivil) => {
    const terreno = parseFloat(valorTerreno) || 0;
    const obraCivil = parseFloat(valorObraCivil) || 0;
    return formatearNumero(terreno + obraCivil);
};

/**
 * Prepara el objeto de datos de cálculo específico para BBVA
 * @param {Object} calculoData - Datos base del cálculo
 * @returns {Object} - Datos de cálculo formateados para BBVA
 */
export const getBbvaCalculationData = (calculoData) => {
    if (!calculoData) return {};
    
    // Extraer valores relevantes del objeto de cálculo base
    const {
        tipoPropiedad,
        estadoConservacion,
        factorConservacion,
        superficieTerreno,
        valorMetroTerreno,
        valorTerreno,
        valorObraCivil,
        valorMercado,
        valorVentaRapida,
        valorRemate,
        valorIntrinseco,
        superficieConstruidaTotal,
        superficies = []
    } = calculoData;
    
    // Calcular valor obra civil por metro cuadrado
    const valorObraCivilM2 = superficieConstruidaTotal && valorObraCivil 
        ? formatearNumero(valorObraCivil / superficieConstruidaTotal) 
        : 0;
    
    // Calcular valor intrínseco por metro cuadrado
    const valorIntrisecoM2 = superficieConstruidaTotal && valorIntrinseco 
        ? formatearNumero(valorIntrinseco / superficieConstruidaTotal) 
        : 0;
    
    // Devolver objeto con estructura específica para BBVA
    return {
        tipoPropiedad,
        estadoConservacion,
        factorConservacion,
        superficieTerreno: parseFloat(superficieTerreno || 0),
        valorMetroTerreno,
        valorTerreno,
        valorObraCivil,
        valorObraCivilM2,
        valorMercado,
        valorVentaRapida,
        valorRemate,
        valorIntrinseco,
        valorIntrisecoM2,
        superficieConstruidaTotal,
        superficies: superficies.map(superficie => ({
            descripcion: superficie.descripcion,
            m2: parseFloat(superficie.m2 || 0),
            ampliaciones: superficie.ampliaciones || '',
            promedioEdad: parseFloat(superficie.promedioEdad || 0),
            factorEdad: parseFloat(superficie.factorEdad || 0),
            conservacion: superficie.conservacion || '',
            factorConservacion: parseFloat(superficie.factorConservacion || 0),
            precioMetro: parseFloat(superficie.precioMetro || 0),
            precioMetroCorregido: parseFloat(superficie.precioMetroCorregido || 0),
            valorTotal: parseFloat(superficie.valorTotal || 0),
            valorTotalSinCorregir: parseFloat(superficie.valorTotalSinCorregir || 0),
            tipoSuperficie: superficie.tipoSuperficie || 'propio',
            superficieDocumentadaObraCivilSeccionEDescripcionInmueble: parseFloat(superficie.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || 0),
            superficieVerificadaObraCivilSeccionEDescripcionInmueble: parseFloat(superficie.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 0)
        })),
        // Datos específicos para BBVA
        tipoInforme: 'BBVA'
    };
}