import React, { useState, useEffect, useCallback } from 'react';
import {
    calcularValorVentaRapida,
    calcularValorRemate,
    calcularValorMetroCuadrado,
    obtenerFactorConservacion,
    obtenerEstadoConservacionDesdeValor,
    formatearNumero,
    calcularValorTerreno,
    calcularSuperficieConstruidaTotal,
    calcularPrecioMetroCorregido,
    calcularValorTotalSuperficie,
    verificarDiferenciaHomologacion,
    recalcularSuperficie,
    calcularValorPorMetroCuadradoItau,
    calcularValorRemateItau,
    calcularValorUI,
    calcularValorIntrinseco,
    TIPOS_INFORME
} from '../calculo/CalculoUtils';
import TerrenoItauStandalone from './TerrenoItauStandalone'
import ModalSuperficie from './ModalSuperficie';
import ModalConfirmacion from './ModalConfirmacion';
import InputNumerico from './inputNumerico';
import TotalesItau from './TotalesItau';
import TotalesBbva from './TotalesBbva';
import PropTypes from 'prop-types';

const CalculoInforme = ({ superficieTerreno = 0, onGetCalculoData = null, tipoInforme = 'default', valorMetroTerrenoProp = 0 }) => {

    CalculoInforme.propTypes = {
        superficieTerreno: PropTypes.number,
        onGetCalculoData: PropTypes.func,
        tipoInforme: PropTypes.string,
        valorMetroTerrenoProp: PropTypes.number
    };

    const [costoReposicion, setCostoReposicion] = useState(0);
    const [valorFinalCalculado, setValorFinalCalculado] = useState(0);
    const [valorIntrinseco, setValorIntrinseco] = useState(0);
    const [valorTerreno, setValorTerreno] = useState(0);
    const [valorObraCivil, setValorObraCivil] = useState(0);

    const [costoReposicionMetroCuadrado, setCostoReposicionMetroCuadrado] = useState(0);
    const [mostrarAlertaHomologacion, setMostrarAlertaHomologacion] = useState(false);

    const [valorMercado, setValorMercado] = useState(0);
    const [valorVentaRapida, setValorVentaRapida] = useState(0);
    const [valorRemate, setValorRemate] = useState(0);
    const [valorMercadoMetroCuadrado, setValorMercadoMetroCuadrado] = useState(0);
    const [valorVentaRapidaMetroCuadrado, setValorVentaRapidaMetroCuadrado] = useState(0);
    const [valorRemateMetroCuadrado, setValorRemateMetroCuadrado] = useState(0);

    // Estados específicos para BBVA
    const [valorObraCivilM2, setValorObraCivilM2] = useState(0);
    const [valorIntrisecoBbva, setValorIntrisecoBbva] = useState(0);

    // Estado para el valor del metro cuadrado de terreno
    const [valorMetroTerreno, setValorMetroTerreno] = useState(valorMetroTerrenoProp || 0);

    // Estados para datos construcción
    const [tipoPropiedad, setTipoPropiedad] = useState('pc');
    const [estadoConservacion, setEstadoConservacion] = useState('Buen estado');
    const [factorConservacionValor, setFactorConservacionValor] = useState(1);

    // Estados para factores
    //const [factorEdad, setFactorEdad] = useState(1);
    const [factorConservacion, setFactorConservacion] = useState(1);

    // Estados para superficies
    const [superficies, setSuperficies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [superficieConstruida, setSuperficieConstruida] = useState(0);

    // Estados para el modal de confirmación
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);

    const [dolarCotizacion, setDolarCotizacion] = useState(42.151);
    const [valorUI, setValorUI] = useState(6.2922);
    const [totalSuperficieEdificio, setTotalSuperficieEdificio] = useState(0);
    const [cuotaPartePorcentaje, setCuotaPartePorcentaje] = useState(0);
    const [cuotaParteValor, setCuotaParteValor] = useState(0);
    const [bloquearRecalculoBienesComunes, setBloquearRecalculoBienesComunes] = useState(false);

    const [superficieLocal, setSuperficieLocal] = useState(superficieTerreno);

    useEffect(() => {
        setSuperficieLocal(superficieTerreno);
    }, [superficieTerreno]);


    const calcularValorTotalPorTipo = (superficies, tipo, campoValor = 'valorTotal') => {
        return superficies
            .filter(s => s.tipoSuperficie === tipo)
            .reduce((total, sup) => total + parseFloat(sup[campoValor] || 0), 0);
    };

    const getCalculoData = useCallback(() => {
        // Mapa de conversión para tipoPropiedad
        const tipoConversion = {
            'pc': 'CASA',    // Cambiamos "PC" (Propiedad Común) a "CASA"
            'ph': 'PH',      // "PH" coincide con el valor del enum
            'terreno': 'TERRENO' // "TERRENO" coincide con el valor del enum
        };

        // Obtener el valor correcto para el tipo de propiedad usando el mapa de conversión
        const tipoValido = tipoConversion[tipoPropiedad.toLowerCase()] || 'CASA';

        const calculoBase = {
            tipoPropiedad: tipoValido, // Usamos el valor mapeado en lugar del original
            estadoConservacion: estadoConservacion,
            factorConservacion: factorConservacionValor,
            superficieTerreno: parseFloat(superficieTerreno || 0),
            valorMetroTerreno: valorMetroTerreno,
            valorTerreno: valorTerreno,
            valorMercado: valorMercado,
            valorVentaRapida: valorVentaRapida,
            valorRemate: valorRemate,
            costoReposicion: costoReposicion,
            valorIntrinseco: valorIntrinseco,
            valorMercadoMetroCuadrado: valorMercadoMetroCuadrado,
            valorVentaRapidaMetroCuadrado: valorVentaRapidaMetroCuadrado,
            valorRemateMetroCuadrado: valorRemateMetroCuadrado,
            costoReposicionMetroCuadrado: costoReposicionMetroCuadrado,
            superficieConstruidaTotal: superficieConstruida,
            // Campos específicos de Scotia
            homologacionPermitida: true,
            porcentajeHomologacion: 20.0,
            porcentajeVentaRapida: 0.9,
            porcentajeRemate: 0.8,
            // Datos de las superficies construidas
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
                valorTotalSinCorregir: parseFloat(superficie.valorTotalSinCorregir || calcularValorTotalSinCorregir(superficie.m2 || 0, superficie.precioMetro || 0)),
                tipoSuperficie: superficie.tipoSuperficie || 'propio',
                tipoObraCivilBbva: superficie.tipoObraCivilBbva,
                superficieDocumentadaObraCivilSeccionEDescripcionInmueble:
                    parseFloat(superficie.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || 0),
                superficieVerificadaObraCivilSeccionEDescripcionInmueble:
                    parseFloat(superficie.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 0)
            }))
        };

        // Si es PH, añadir propiedades específicas
        if (tipoPropiedad === 'ph') {
            return {
                ...calculoBase,
                totalSuperficieEdificio: parseFloat(totalSuperficieEdificio || 0),
                cuotaPartePorcentaje: parseFloat(cuotaPartePorcentaje || 0),
                cuotaParteValor: parseFloat(cuotaParteValor || 0),
            };
        }

        // Si es BBVA, añadir propiedades específicas
        if (tipoInforme === 'BBVA') {
            return {
                ...calculoBase,
                valorObraCivilM2,
                valorIntrisecoBbva,
            };
        }
        // Si es ITAU, añadir propiedades específicas
        else if (tipoInforme === 'ITAU') {
            return {
                ...calculoBase,
                dolarCotizacion: dolarCotizacion,
                valorUI: valorUI,
                valorMercadoUI: calcularValorUI(valorMercado, dolarCotizacion, valorUI),
                valorRemateUI: calcularValorUI(valorRemate, dolarCotizacion, valorUI)
            };
        }

        // Por defecto, devolver calculoBase
        return calculoBase;
    }, [
        tipoPropiedad, estadoConservacion, factorConservacionValor, superficieTerreno,
        valorMetroTerreno, valorTerreno, valorMercado, valorVentaRapida, valorRemate,
        costoReposicion, valorIntrinseco, valorMercadoMetroCuadrado, valorVentaRapidaMetroCuadrado,
        valorRemateMetroCuadrado, costoReposicionMetroCuadrado, superficieConstruida, superficies,
        tipoInforme, dolarCotizacion, valorUI, valorObraCivilM2, valorIntrisecoBbva,
        totalSuperficieEdificio, cuotaPartePorcentaje, cuotaParteValor
    ]);

    const handleTerrenoItauValuesChange = ({ superficie, precioMetro, valorTotal }) => {
        setSuperficieLocal(superficie);
        setValorMetroTerreno(precioMetro);
        setValorTerreno(valorTotal);

        if (tipoInforme === 'ITAU') {
            setValorMercado(valorTotal);
        }
    };

    // Añade estas funciones a tu componente CalculoInforme.jsx
    const handleValorMercadoMetroCuadradoChange = (valor) => {
        setValorMercadoMetroCuadrado(valor);
        // Si cambia el valor por metro cuadrado, recalculamos el valor total
        if (superficieConstruida > 0) {
            setValorMercado(formatearNumero(valor * superficieConstruida));
        }
    };

    const handleValorVentaRapidaMetroCuadradoChange = (valor) => {
        setValorVentaRapidaMetroCuadrado(valor);
        // Si cambia el valor por metro cuadrado, recalculamos el valor total
        if (superficieConstruida > 0) {
            setValorVentaRapida(formatearNumero(valor * superficieConstruida));
        }
    };

    const handleValorRemateMetroCuadradoChange = (valor) => {
        setValorRemateMetroCuadrado(valor);
        // Si cambia el valor por metro cuadrado, recalculamos el valor total
        if (superficieConstruida > 0) {
            setValorRemate(formatearNumero(valor * superficieConstruida));
        }
    };

    useEffect(() => {
        if (tipoInforme === 'BBVA') {
            if (superficieConstruida > 0 && valorObraCivil) {
                setValorObraCivilM2(formatearNumero(valorObraCivil / superficieConstruida));
            }
    
            // Cambia la llamada a la función unificada, especificando el tipo BBVA
            const nuevoValorIntriseco = calcularValorIntrinseco(
                valorTerreno, 
                valorObraCivil, 
                tipoPropiedad, // si tienes este dato disponible
                TIPOS_INFORME.BBVA // usa la constante para el tipo
            );
            setValorIntrisecoBbva(nuevoValorIntriseco);
    
            if (valorMercado) {
                // Estas funciones también deberían recibir el tipo BBVA
                setValorVentaRapida(calcularValorVentaRapida(valorMercado, 0, TIPOS_INFORME.BBVA));
                setValorRemate(calcularValorRemate(valorMercado, TIPOS_INFORME.BBVA));
            }
        }
    }, [tipoInforme, valorTerreno, valorObraCivil, superficieConstruida, valorMercado]);


    useEffect(() => {
        // Solo calculamos la cuota parte si el tipo de propiedad es "ph"
        if (tipoPropiedad === 'ph' && totalSuperficieEdificio > 0) {
            // Calculamos la superficie total de la propiedad (suma de m² de todas las superficies propias)
            const totalMetrosCuadrados = superficies.reduce((total, superficie) => {
                // Solo considerar superficies que no sean de tipo "comun"
                if (superficie.tipoSuperficie !== 'comun') {
                    // Verificar que m2 sea un número válido
                    const m2 = typeof superficie.m2 === 'string' ?
                        (superficie.m2 === 'G' ? 0 : parseFloat(superficie.m2) || 0) :
                        (parseFloat(superficie.m2) || 0);

                    return total + m2;
                }
                return total;
            }, 0);

            // Calculamos el porcentaje de cuota parte solo si los valores son válidos
            if (totalMetrosCuadrados > 0 && totalSuperficieEdificio > 0) {
                const porcentaje = (totalMetrosCuadrados / parseFloat(totalSuperficieEdificio)) * 100;
                setCuotaPartePorcentaje(formatearNumero(porcentaje));

                // Calculamos el valor en USD de la cuota parte
                const valorCuotaParte = (porcentaje / 100) * parseFloat(valorTerreno);
                setCuotaParteValor(formatearNumero(valorCuotaParte));
            }
        } else {
            // Si no es PH, reiniciamos los valores
            setCuotaPartePorcentaje(0);
            setCuotaParteValor(0);
        }
    }, [tipoPropiedad, superficies, totalSuperficieEdificio, valorTerreno]);

    useEffect(() => {
        // Efecto primario: calcular valor intrínseco
        const calcularIntrinseco = () => {
            let nuevoValorIntrinseco;
            if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
                nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + parseFloat(valorObraCivil));
            } else {
                nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + parseFloat(valorObraCivil));
            }
            return nuevoValorIntrinseco;
        };

        const nuevoValorIntrinseco = calcularIntrinseco();

        // Solo actualizar si hay cambio real
        if (nuevoValorIntrinseco !== valorIntrinseco) {
            setValorIntrinseco(nuevoValorIntrinseco);
            setValorFinalCalculado(nuevoValorIntrinseco);

            // Verificar homologación solo cuando cambia el valor intrínseco
            if (valorMercado) {
                const excedeDiferencia = verificarDiferenciaHomologacion(nuevoValorIntrinseco, valorMercado);
                setMostrarAlertaHomologacion(excedeDiferencia);
            }
        }
    }, [tipoPropiedad, valorTerreno, valorObraCivil, cuotaParteValor, valorIntrinseco, valorMercado]);


    useEffect(() => {
        if (onGetCalculoData) {
            onGetCalculoData(getCalculoData);
        }
    }, [onGetCalculoData, getCalculoData]);

    // Función para iniciar el proceso de eliminación
    const handleEliminarClick = (index) => {
        setIndexToDelete(index);
        setConfirmModalOpen(true);
    };

    // Función para confirmar la eliminación
    const handleEliminarSuperficie = () => {
        if (indexToDelete !== null) {
            setSuperficies(prev => prev.filter((_, index) => index !== indexToDelete));
            setIndexToDelete(null);
        }
    };

    // Calcular el factor de conservación cuando cambia el estado seleccionado
    useEffect(() => {
        if (estadoConservacion !== 'Personalizado') {
            const factor = obtenerFactorConservacion(estadoConservacion);
            setFactorConservacionValor(factor);
            setFactorConservacion(factor);
        }
    }, [estadoConservacion]);

    // Calcular valores del terreno
    useEffect(() => {
        // Usar la función centralizada para calcular el valor del terreno
        const nuevoValorTerreno = calcularValorTerreno(superficieTerreno, valorMetroTerreno);
        setValorTerreno(nuevoValorTerreno);
    }, [superficieTerreno, valorMetroTerreno]);

    // Calcular obra civil y valores relacionados
    useEffect(() => {

        // Calcular superficie construida total
        const totalSuperficie = calcularSuperficieConstruidaTotal(superficies);
        setSuperficieConstruida(totalSuperficie);

        // Calcular valor total de obra civil incluyendo TODOS los tipos de superficies
        const totalObraCivil = superficies.reduce((total, superficie) => {
            // Incluir tanto bienes propios como comunes (sin filtrar por tipoSuperficie)
            return total + parseFloat(superficie.valorTotal || 0);
        }, 0);


        // Actualizar solo si hay un cambio significativo
        if (Math.abs(totalObraCivil - valorObraCivil) > 0.01) {
            setValorObraCivil(formatearNumero(totalObraCivil));
        }

        // Calcular valor de reposición a nuevo incluyendo tanto bienes propios como comunes
        const totalReposicion = superficies.reduce((total, superficie) => {
            if (superficie.tipoSuperficie === 'comun') {
                // Para bienes comunes, usar directamente el valorTotalSinCorregir 
                return total + parseFloat(superficie.valorTotalSinCorregir || 0);
            } else {
                // Para bienes propios, calcular normalmente
                const valorReposicion = superficie.valorTotalSinCorregir ||
                    calcularValorTotalSinCorregir(
                        typeof superficie.m2 === 'number' ? superficie.m2 : parseFloat(superficie.m2 || 0),
                        typeof superficie.precioMetro === 'number' ? superficie.precioMetro : parseFloat(superficie.precioMetro || 0)
                    );
                return total + parseFloat(valorReposicion || 0);
            }
        }, 0);


        // Actualizar solo si hay un cambio significativo
        if (Math.abs(totalReposicion - costoReposicion) > 0.01) {
            setCostoReposicion(formatearNumero(totalReposicion));
        }
    }, [costoReposicion, superficies, valorObraCivil]);



    useEffect(() => {
        if (superficieConstruida > 0) {
            if (tipoInforme === 'ITAU') {
                // Para Itaú, calculamos el valor por m² dividiendo el valor total entre los m² totales
                setValorMercadoMetroCuadrado(calcularValorPorMetroCuadradoItau(valorMercado, superficieConstruida));
                setValorVentaRapidaMetroCuadrado(calcularValorPorMetroCuadradoItau(valorVentaRapida, superficieConstruida));
                setValorRemateMetroCuadrado(calcularValorPorMetroCuadradoItau(valorRemate, superficieConstruida));
            } else {
                // Para otros tipos de informe, usamos la función estándar
                setValorMercadoMetroCuadrado(calcularValorMetroCuadrado(valorMercado, superficieConstruida));
                setValorVentaRapidaMetroCuadrado(calcularValorMetroCuadrado(valorVentaRapida, superficieConstruida));
                setValorRemateMetroCuadrado(calcularValorMetroCuadrado(valorRemate, superficieConstruida));
                setCostoReposicionMetroCuadrado(calcularValorMetroCuadrado(costoReposicion, superficieConstruida));
            }
        }
    }, [valorMercado, valorVentaRapida, valorRemate, costoReposicion, superficieConstruida, tipoInforme]);


    useEffect(() => {
        if (bloquearRecalculoBienesComunes || superficies.length === 0) {
            return;
        }

        // Buscar si hay bienes comunes
        const bienesComunes = superficies.filter(s => s.tipoSuperficie === 'comun');
        if (bienesComunes.length === 0) return; // No hay bienes comunes para actualizar

        // Calcular valor total de bienes propios
        const valorTotalPropios = calcularValorTotalPorTipo(superficies, 'propio');

        // Actualizar el valorTotal de bienes comunes (25% del valor total de bienes propios)
        const valorBienesComunes = formatearNumero(valorTotalPropios * 0.25);

        // Actualizar solo si el valor ha cambiado significativamente (más de 1%)
        const nuevasSuperficies = [...superficies];
        let actualizado = false;

        nuevasSuperficies.forEach((sup, index) => {
            if (sup.tipoSuperficie === 'comun') {
                // No actualizar si ha sido editado manualmente
                if (sup.editadoManualmenteValorTotal) {
                    return;
                }

                const valorActual = parseFloat(sup.valorTotal || 0);
                // Solo actualizar si el cambio es significativo
                if (Math.abs((valorBienesComunes - valorActual) / (valorActual || 1)) > 0.01) {
                    nuevasSuperficies[index] = {
                        ...sup,
                        valorTotal: valorBienesComunes
                    };
                    actualizado = true;
                }
            }
        });

        // Solo actualizar el estado si hubo cambios
        if (actualizado) {
            setSuperficies(nuevasSuperficies);
        }
    }, [superficies, bloquearRecalculoBienesComunes]);


    // Actualizar valores derivados cuando cambia el valor de mercado
    useEffect(() => {
        if (valorMercado && valorRemate) {
            const promedio = (parseFloat(valorMercado) + parseFloat(valorRemate)) / 2;
            // Redondear a miles
            setValorVentaRapida(promedio ? Math.round(parseFloat(promedio) / 1000) * 1000 : 0);
        } else if (valorMercado) {
            // Si solo tenemos valor de mercado, mantener la fórmula anterior
            setValorVentaRapida(calcularValorVentaRapida(valorMercado));
        }
    }, [valorMercado, valorRemate]);

    // Manejador para el cambio del valor de venta rápida
    const handleValorVentaRapidaChange = (valor) => {
        setValorVentaRapida(valor);

        // Actualizar valor por m²
        if (superficieConstruida > 0) {
            setValorVentaRapidaMetroCuadrado(calcularValorMetroCuadrado(valor, superficieConstruida));
        }
    };

    // Función para calcular el valor total sin corregir (metros cuadrados * precio sin corregir)
    const calcularValorTotalSinCorregir = (metros, precioMetro) => {
        return formatearNumero(parseFloat(metros) * parseFloat(precioMetro));
    };

    const actualizarCampoSuperficie = (index, campo, valor) => {

        if (campo === 'valorTotal' && superficies[index]?.tipoSuperficie === 'comun') {
            setBloquearRecalculoBienesComunes(true);

            // Desbloquear después de un tiempo para permitir recálculos futuros
            setTimeout(() => setBloquearRecalculoBienesComunes(false), 1000);
        }

        const nuevasSuperficies = [...superficies];

        // Actualizamos el campo específico
        nuevasSuperficies[index] = {
            ...nuevasSuperficies[index],
            [campo]: valor
        };

        // MEJORA: Recalcular todos los valores relacionados en función del campo modificado
        switch (campo) {
            case 'tipoBien':
                // Si cambia el tipo de bien, simplemente actualizamos el valor
                // No se requieren recálculos adicionales
                break;

            case 'precioMetro': {
                // Si se modifica el precio por metro, recalculamos el precio corregido y valor total
                const factorEdad = parseFloat(nuevasSuperficies[index].factorEdad) || 1;
                const factorConservacion = parseFloat(nuevasSuperficies[index].factorConservacion) || 1;
                const precioCorregido = calcularPrecioMetroCorregido(valor, factorEdad, factorConservacion);
                nuevasSuperficies[index].precioMetroCorregido = precioCorregido;

                // Actualizamos el valor total
                const m2 = parseFloat(nuevasSuperficies[index].m2) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(m2, precioCorregido);

                // Calcular y actualizar el valor total sin corregir
                nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(m2, valor);
                break;
            }
            case 'factorEdad': {
                // Si se modifica el factor de edad, recalculamos el precio corregido y valor total
                const precio = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
                const conservacion = parseFloat(nuevasSuperficies[index].factorConservacion) || 1;
                nuevasSuperficies[index].precioMetroCorregido = calcularPrecioMetroCorregido(precio, valor, conservacion);

                // Actualizamos el valor total
                const metros = parseFloat(nuevasSuperficies[index].m2) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(
                    metros,
                    nuevasSuperficies[index].precioMetroCorregido
                );
                break;
            }
            case 'factorConservacion': {
                // Si se modifica el factor de conservación, recalculamos el precio corregido y valor total
                const precioM = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
                const fEdad = parseFloat(nuevasSuperficies[index].factorEdad) || 1;
                nuevasSuperficies[index].precioMetroCorregido = calcularPrecioMetroCorregido(precioM, fEdad, valor);

                // Actualizamos el valor total
                const metrosC = parseFloat(nuevasSuperficies[index].m2) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(
                    metrosC,
                    nuevasSuperficies[index].precioMetroCorregido
                );

                // Actualizamos el estado de conservación basado en el factor
                nuevasSuperficies[index].conservacion = obtenerEstadoConservacionDesdeValor(valor);
                break;
            }
            case 'm2': {
                // Si se modifican los metros cuadrados, recalculamos tanto el valor total como el valor total sin corregir
                const pCorregido = parseFloat(nuevasSuperficies[index].precioMetroCorregido) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(valor, pCorregido);

                const pSinCorregir = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
                nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(valor, pSinCorregir);
                break;
            }
            case 'precioMetroCorregido': {
                // Si se modifica directamente el precio corregido, recalculamos el valor total
                // y ajustamos el precio base para mantener consistencia
                const m2Valor = parseFloat(nuevasSuperficies[index].m2) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(m2Valor, valor);

                // MEJORA: Ajustar el precio base para mantener consistencia con el precio corregido
                const fEdadActual = parseFloat(nuevasSuperficies[index].factorEdad) || 1;
                const fConservacionActual = parseFloat(nuevasSuperficies[index].factorConservacion) || 1;

                // Solo ajustamos si los factores no son cero para evitar división por cero
                if (fEdadActual > 0 && fConservacionActual > 0) {
                    const nuevoPrecioBase = valor / (fEdadActual * fConservacionActual);
                    nuevasSuperficies[index].precioMetro = nuevoPrecioBase;

                    // Actualizar el valor total sin corregir con el nuevo precio base
                    nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(m2Valor, nuevoPrecioBase);
                }
                break;
            }

            // Modifica el caso 'valorTotal' en la función actualizarCampoSuperficie
            case 'valorTotal': {

                // Si es un bien común, solo actualizamos el valor total sin más cálculos
                if (nuevasSuperficies[index].tipoSuperficie === 'comun') {
                    nuevasSuperficies[index].valorTotal = valor;
                    // Marcar como editado manualmente para evitar actualizaciones automáticas
                    nuevasSuperficies[index].editadoManualmenteValorTotal = true;

                    // Bloquear recálculos automáticos temporalmente
                    setBloquearRecalculoBienesComunes(true);

                    setTimeout(() => {
                        setBloquearRecalculoBienesComunes(false);
                    }, 2000);

                    // Actualizar el estado y salir
                    setSuperficies(nuevasSuperficies);
                    return;
                }

                // Para otros tipos, continuar con la lógica existente...
                const metros2 = parseFloat(nuevasSuperficies[index].m2) || 0;

                // Evitar división por cero
                if (metros2 > 0) {
                    const nuevoPrecioCorregido = valor / metros2;
                    nuevasSuperficies[index].precioMetroCorregido = nuevoPrecioCorregido;

                    // MEJORA: Ajustar el precio base para mantener consistencia
                    const factorE = parseFloat(nuevasSuperficies[index].factorEdad) || 1;
                    const factorC = parseFloat(nuevasSuperficies[index].factorConservacion) || 1;

                    if (factorE > 0 && factorC > 0) {
                        const nuevoPrecioBase = nuevoPrecioCorregido / (factorE * factorC);
                        nuevasSuperficies[index].precioMetro = nuevoPrecioBase;

                        // Actualizar el valor total sin corregir con el nuevo precio base
                        nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(metros2, nuevoPrecioBase);
                    }

                    // Actualizar el estado de superficies
                    setSuperficies(nuevasSuperficies);

                    // Recalcular el valor de obra civil inmediatamente
                    const nuevoValorObraCivil = nuevasSuperficies
                        .filter(superficie => superficie.tipoSuperficie !== 'comun')
                        .reduce((total, superficie) => {
                            return total + parseFloat(superficie.valorTotal || 0);
                        }, 0);

                    // Actualizar el valor de la obra civil sin esperar al efecto
                    setValorObraCivil(formatearNumero(nuevoValorObraCivil));

                    // Recalcular también el valor intrínseco inmediatamente
                    let nuevoValorIntrinseco;
                    if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
                        nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + nuevoValorObraCivil);
                    } else {
                        nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + nuevoValorObraCivil);
                    }

                    setValorIntrinseco(nuevoValorIntrinseco);
                    setValorFinalCalculado(nuevoValorIntrinseco);

                    // No necesitamos un return aquí, ya que queremos que también se aplique el recálculo general
                }
                break;
            }
            // Modifica la parte del caso valorTotalSinCorregir en la función actualizarCampoSuperficie
            // para asegurarte de que el valor intrínseco se actualice correctamente:

            case 'valorTotalSinCorregir': {

                // Si es un bien común, simplemente actualizar el valor sin recálculos
                if (nuevasSuperficies[index].tipoSuperficie === 'comun') {
                    nuevasSuperficies[index].valorTotalSinCorregir = valor;

                    // Marcar esta superficie como editada manualmente para evitar actualizaciones automáticas
                    nuevasSuperficies[index].editadoManualmente = true;

                    // Bloquear recálculos automáticos temporalmente
                    setBloquearRecalculoBienesComunes(true);

                    setTimeout(() => {
                        setBloquearRecalculoBienesComunes(false);
                    }, 2000);

                    // Actualizar el estado de superficies antes de recalcular otros valores
                    setSuperficies(nuevasSuperficies);

                    // Trigger inmediato del recálculo del costo de reposición total
                    const nuevoValorReposicion = nuevasSuperficies.reduce((total, superficie) => {
                        if (superficie.tipoSuperficie === 'comun') {
                            // Para el bien común que estamos editando, usar el nuevo valor
                            if (superficie === nuevasSuperficies[index]) {
                                return total + parseFloat(valor || 0);
                            }
                            // Para otros bienes comunes, usar el valor existente
                            return total + parseFloat(superficie.valorTotalSinCorregir || 0);
                        } else {
                            // Para bienes propios, calcular normalmente
                            const valorReposicion = superficie.valorTotalSinCorregir ||
                                calcularValorTotalSinCorregir(
                                    typeof superficie.m2 === 'number' ? superficie.m2 : parseFloat(superficie.m2 || 0),
                                    typeof superficie.precioMetro === 'number' ? superficie.precioMetro : parseFloat(superficie.precioMetro || 0)
                                );
                            return total + parseFloat(valorReposicion || 0);
                        }
                    }, 0);

                    setCostoReposicion(formatearNumero(nuevoValorReposicion));

                    return;
                }

                // Si no es bien común (es un bien propio), su valorTotalSinCorregir NO afecta directamente
                // al valor intrínseco, pero el valorTotal sí, así que necesitamos actualizar ambos

                const metrosBase = parseFloat(nuevasSuperficies[index].m2) || 0;

                // Evitar división por cero
                if (metrosBase > 0) {
                    const nuevoPrecioBase = valor / metrosBase;
                    nuevasSuperficies[index].precioMetro = nuevoPrecioBase;

                    // Recalcular el precio corregido y el valor total con el nuevo precio base
                    const factorEdadActual = parseFloat(nuevasSuperficies[index].factorEdad) || 1;
                    const factorConservacionActual = parseFloat(nuevasSuperficies[index].factorConservacion) || 1;

                    const nuevoPrecioCorregido = calcularPrecioMetroCorregido(
                        nuevoPrecioBase,
                        factorEdadActual,
                        factorConservacionActual
                    );

                    nuevasSuperficies[index].precioMetroCorregido = nuevoPrecioCorregido;
                    nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(metrosBase, nuevoPrecioCorregido);

                    // Actualizar el estado de superficies
                    setSuperficies(nuevasSuperficies);

                    // Recalcular el valor de obra civil inmediatamente
                    const nuevoValorObraCivil = nuevasSuperficies
                        .filter(superficie => superficie.tipoSuperficie !== 'comun')
                        .reduce((total, superficie) => {
                            return total + parseFloat(superficie.valorTotal || 0);
                        }, 0);

                    // Actualizar el valor de la obra civil sin esperar al efecto
                    setValorObraCivil(formatearNumero(nuevoValorObraCivil));

                    // Recalcular también el valor intrínseco inmediatamente
                    let nuevoValorIntrinseco;
                    if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
                        nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + nuevoValorObraCivil);
                    } else {
                        nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + nuevoValorObraCivil);
                    }

                    setValorIntrinseco(nuevoValorIntrinseco);
                    setValorFinalCalculado(nuevoValorIntrinseco);
                }
                break;
            }
            default: {
                // Para otros campos no necesitamos recálculos especiales
                break;
            }
        }

        // MEJORA: Aplicar recálculo completo para asegurar consistencia en todos los valores
        if (!(campo === 'valorTotal' && nuevasSuperficies[index].tipoSuperficie === 'comun')) {
            nuevasSuperficies[index] = recalcularSuperficie(nuevasSuperficies[index]);
        }
        // Asegurar que siempre tengamos un valor total sin corregir
        if (nuevasSuperficies[index].valorTotalSinCorregir === undefined) {
            const m2 = parseFloat(nuevasSuperficies[index].m2) || 0;
            const precioMetro = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
            nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(m2, precioMetro);
        }

        setSuperficies(nuevasSuperficies);
    };

    // Añade este useEffect para calcular los totales (sin modificar los valores individuales)
    useEffect(() => {
        // Calcular el total de todas las superficies para el valor de obra civil
        // Incluimos TODAS las superficies en este cálculo, sin filtrar por tipoSuperficie
        const nuevoValorObraCivil = superficies.reduce((total, superficie) => {
            return total + parseFloat(superficie.valorTotal || 0);
        }, 0);

        // Actualizar el valor de la obra civil sin modificar las superficies individuales
        if (nuevoValorObraCivil !== valorObraCivil) {
            setValorObraCivil(formatearNumero(nuevoValorObraCivil));
        }

        // Calcular superficie construida total
        const nuevaSuperficieConstruida = calcularSuperficieConstruidaTotal(superficies);
        if (nuevaSuperficieConstruida !== superficieConstruida) {
            setSuperficieConstruida(formatearNumero(nuevaSuperficieConstruida));
        }

        // Actualizar valor de reposición a nuevo
        // Incluimos tanto bienes propios como comunes para este cálculo
        const nuevoValorReposicion = superficies.reduce((total, superficie) => {
            if (superficie.tipoSuperficie === 'comun') {
                // Para bienes comunes, usar directamente el valorTotalSinCorregir 
                return total + parseFloat(superficie.valorTotalSinCorregir || 0);
            } else {
                // Para bienes propios, calcular normalmente
                const valorReposicion = superficie.valorTotalSinCorregir ||
                    calcularValorTotalSinCorregir(
                        typeof superficie.m2 === 'number' ? superficie.m2 : parseFloat(superficie.m2 || 0),
                        typeof superficie.precioMetro === 'number' ? superficie.precioMetro : parseFloat(superficie.precioMetro || 0)
                    );
                return total + parseFloat(valorReposicion || 0);
            }
        }, 0);

        if (nuevoValorReposicion !== costoReposicion) {
            setCostoReposicion(formatearNumero(nuevoValorReposicion));
        }
    }, [costoReposicion, superficieConstruida, superficies, valorObraCivil]);


    // Modificar el useEffect que actualiza los bienes comunes automáticamente
    useEffect(() => {
        if (bloquearRecalculoBienesComunes || superficies.length === 0) {
            return;
        }

        // Buscar si hay bienes comunes
        const bienesComunes = superficies.filter(s => s.tipoSuperficie === 'comun');

        if (bienesComunes.length === 0) return; // No hay bienes comunes para actualizar

        // Calcular valor de reposición total de bienes propios
        const bienesPropios = superficies.filter(s => s.tipoSuperficie === 'propio');
        const valorReposicionPropios = bienesPropios.reduce((total, sup) => {
            const valorReposicion = parseFloat(sup.valorTotalSinCorregir ||
                calcularValorTotalSinCorregir(
                    typeof sup.m2 === 'number' ? sup.m2 : parseFloat(sup.m2 || 0),
                    typeof sup.precioMetro === 'number' ? sup.precioMetro : parseFloat(sup.precioMetro || 0)
                ));
            return total + valorReposicion;
        }, 0);


        // Actualizar los bienes comunes con el 17% del valor
        const valorBienesComunes = formatearNumero(valorReposicionPropios * 0.17);
        // Actualizar solo si el valor ha cambiado significativamente (más de 1%)
        const nuevasSuperficies = [...superficies];
        let actualizado = false;

        nuevasSuperficies.forEach((sup, index) => {
            if (sup.tipoSuperficie === 'comun') {
                // No actualizar si ha sido editado manualmente
                if (sup.editadoManualmente) {
                    return;
                }

                const valorActual = parseFloat(sup.valorTotalSinCorregir || 0);
                // Solo actualizar si el cambio es significativo
                if (Math.abs((valorBienesComunes - valorActual) / (valorActual || 1)) > 0.01) {
                    nuevasSuperficies[index] = {
                        ...sup,
                        valorTotalSinCorregir: valorBienesComunes,
                        valorTotal: 0 // El valor total sigue siendo cero
                    };
                    actualizado = true;
                }
            }
        });

        // Solo actualizar el estado si hubo cambios
        if (actualizado) {
            setSuperficies(nuevasSuperficies);

            // Trigger manual para recalcular el costo de reposición total inmediatamente
            const nuevoValorReposicion = nuevasSuperficies.reduce((total, superficie) => {
                if (superficie.tipoSuperficie === 'comun') {
                    return total + parseFloat(superficie.valorTotalSinCorregir || 0);
                } else {
                    const valorReposicion = superficie.valorTotalSinCorregir ||
                        calcularValorTotalSinCorregir(
                            typeof superficie.m2 === 'number' ? superficie.m2 : parseFloat(superficie.m2 || 0),
                            typeof superficie.precioMetro === 'number' ? superficie.precioMetro : parseFloat(superficie.precioMetro || 0)
                        );
                    return total + parseFloat(valorReposicion || 0);
                }
            }, 0);

            // Actualizar el costo de reposición
            setCostoReposicion(formatearNumero(nuevoValorReposicion));
        }
    }, [superficies, bloquearRecalculoBienesComunes]);


    // Handle cambio en valor de mercado
    const handleValorMercadoChange = (valor) => {
        setValorMercado(valor);

        if (tipoInforme === 'BBVA') {
            const nuevoValorVentaRapida = calcularValorVentaRapida(valor);
            const nuevoValorRemate = calcularValorRemate(valor);
            setValorVentaRapida(nuevoValorVentaRapida);
            setValorRemate(nuevoValorRemate);
        } else if (tipoInforme === 'ITAU') {
            // Código existente para ITAU
            const nuevoValorRemate = calcularValorRemateItau(valor);
            setValorRemate(nuevoValorRemate);
            setValorVentaRapida(calcularValorVentaRapida(valor, nuevoValorRemate));
        } else {
            // Código existente para otros tipos
            setValorRemate(calcularValorRemate(valor));
            setValorVentaRapida(calcularValorVentaRapida(valor));
        }
    };

    // Handlers específicos para BBVA
    const handleSuperficieTerrenoChangeBbva = (valor) => {
        // Lógica específica para BBVA...
        const nuevoValorTerreno = formatearNumero(valorMetroTerreno * valor);
        setValorTerreno(nuevoValorTerreno);
    };

    const handleValorMetroTerrenoChangeBbva = (valor) => {
        // Lógica específica para BBVA...
        setValorMetroTerreno(valor);
        const nuevoValorTerreno = formatearNumero(valor * superficieTerreno);
        setValorTerreno(nuevoValorTerreno);
    };


    const handleUpdateSuperficieBbva = (index, campo, valor) => {
        // Reutilizar la función existente actualizarCampoSuperficie
        // que ya tiene toda la lógica necesaria
        actualizarCampoSuperficie(index, campo, valor);

        // Opcionalmente, agregar lógica específica para BBVA si es necesario
        if (tipoInforme === 'BBVA') {
            // Por ejemplo, forzar actualización de totales
            recalcularTotalesBbva();
        }
    };

    const recalcularTotalesBbva = () => {
        // Actualizar superficieObraCivil, valorObraCivilM2, etc.
        if (superficieConstruida > 0) {
            setValorObraCivilM2(formatearNumero(valorObraCivil / superficieConstruida));
        }
    
        // Actualizar valor intrínseco usando la función unificada
        const nuevoValorIntriseco = calcularValorIntrinseco(
            valorTerreno, 
            valorObraCivil, 
            tipoPropiedad,  // Si tienes esta variable disponible en el componente
            TIPOS_INFORME.BBVA
        );
        setValorIntrisecoBbva(nuevoValorIntriseco);
    };

    const handleSuperficieObraCivilChange = (valor) => {
        setSuperficieConstruida(valor);

        // Recalcular valores dependientes
        if (valor > 0) {
            // Recalcular valor por m²
            setValorObraCivilM2(formatearNumero(valorObraCivil / valor));
            setValorMercadoMetroCuadrado(formatearNumero(valorMercado / valor));
            setValorVentaRapidaMetroCuadrado(formatearNumero(valorVentaRapida / valor));
            setValorRemateMetroCuadrado(formatearNumero(valorRemate / valor));
        }
    };

    useEffect(() => {
    }, [tipoInforme, tipoPropiedad, valorTerreno, superficieTerreno]);

    const handleValorObraCivilChange = (valor) => {
        setValorObraCivil(valor);
        // Recalcular valor por m²
        if (superficieConstruida > 0) {
            setValorObraCivilM2(formatearNumero(valor / superficieConstruida));
        }
        // Recalcular valor intrínseco
        if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
            const nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + parseFloat(valor));
            setValorIntrinseco(nuevoValorIntrinseco);
        } else {
            const nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + parseFloat(valor));
            setValorIntrinseco(nuevoValorIntrinseco);
        }
    };

    const handleValorObraCivilM2Change = (valor) => {
        setValorObraCivilM2(valor);
        // Recalcular valor total
        if (superficieConstruida > 0) {
            const nuevoValorObraCivil = formatearNumero(valor * superficieConstruida);
            setValorObraCivil(nuevoValorObraCivil);

            // Recalcular valor intrínseco
            if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
                const nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + parseFloat(nuevoValorObraCivil));
                setValorIntrinseco(nuevoValorIntrinseco);
            } else {
                const nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + parseFloat(nuevoValorObraCivil));
                setValorIntrinseco(nuevoValorIntrinseco);
            }
        }
    };

    const handleValorIntrinsecoChange = (valor) => {
        setValorIntrinseco(valor);
        // Otros cálculos derivados que puedan depender del valor intrínseco
    };

    // Manejador cuando cambia el estado de conservación
    const handleConservacionChange = (e) => {
        const nuevoEstado = e.target.value;
        setEstadoConservacion(nuevoEstado);

        if (nuevoEstado !== 'Personalizado') {
            const factor = obtenerFactorConservacion(nuevoEstado);
            setFactorConservacionValor(factor);
            setFactorConservacion(factor);
        }
    };

    // Actualizar valores derivados cuando cambia el valor de mercado o valor de remate
    useEffect(() => {
        if (valorMercado) {
            if (tipoInforme === 'ITAU') {
                // Para Itaú: Valor de Remate = 80% del Valor de Mercado
                setValorRemate(calcularValorRemateItau(valorMercado));

                // Si ya tenemos el valor de remate, también actualizamos el QSV
                if (valorRemate) {
                    setValorVentaRapida(calcularValorVentaRapida(valorMercado, calcularValorRemateItau(valorMercado)));
                }
            } else {
                // Para otros tipos de informe: Remate = 80% del Valor de Mercado
                setValorRemate(calcularValorRemate(valorMercado));
                // Venta rápida es 90% del valor de mercado para otros informes
                setValorVentaRapida(calcularValorVentaRapida(valorMercado));
            }
        }
    }, [valorMercado, tipoInforme, valorRemate]);



    // Manejador cuando cambia el valor personalizado del factor de conservación
    const handleFactorConservacionChange = (valor) => {
        setFactorConservacionValor(valor);
        setFactorConservacion(valor);
        // Usar la función centralizada para determinar el estado basado en el valor
        setEstadoConservacion(obtenerEstadoConservacionDesdeValor(valor));
    };

    // Manejador para el cambio del valor de remate (nuevo)
    const handleValorRemateChange = (valor) => {
        setValorRemate(valor);

        // Actualizar valor por m²
        if (superficieConstruida > 0) {
            setValorRemateMetroCuadrado(calcularValorMetroCuadrado(valor, superficieConstruida));
        }

        // Si estamos en un informe Itaú, actualizar QSV 
        if (tipoInforme === 'ITAU' && valorMercado) {
            setValorVentaRapida(calcularValorVentaRapida(valorMercado, valor));
        }
    };

    const mostrarComoTerrenoItau = tipoInforme === 'ITAU' && tipoPropiedad === 'terreno';

    const renderTotales = () => {
        if (tipoInforme === 'ITAU') {
            return (
                <TotalesItau
                    valorMercado={valorMercado}
                    valorVentaRapida={valorVentaRapida}
                    valorRemate={valorRemate}
                    valorMercadoMetroCuadrado={valorMercadoMetroCuadrado}
                    valorVentaRapidaMetroCuadrado={valorVentaRapidaMetroCuadrado}
                    valorRemateMetroCuadrado={valorRemateMetroCuadrado}
                    dolarCotizacion={dolarCotizacion}
                    valorUI={valorUI}
                    onDolarCotizacionChange={setDolarCotizacion}
                    onValorUIChange={setValorUI}
                    onValorMercadoChange={handleValorMercadoChange}
                    onValorVentaRapidaChange={handleValorVentaRapidaChange}
                    onValorRemateChange={handleValorRemateChange}
                    onValorMercadoMetroCuadradoChange={handleValorMercadoMetroCuadradoChange}
                    onValorVentaRapidaMetroCuadradoChange={handleValorVentaRapidaMetroCuadradoChange}
                    onValorRemateMetroCuadradoChange={handleValorRemateMetroCuadradoChange}
                    formatearNumero={formatearNumero}
                />
            );
        } else if (tipoInforme === 'BBVA') {
            return (
                <TotalesBbva
                    // Valores principales
                    valorMercado={valorMercado}
                    valorVentaRapida={valorVentaRapida}
                    valorRemate={valorRemate}
                    valorTerreno={valorTerreno}
                    valorObraCivil={valorObraCivil}
                    valorIntrinseco={valorIntrisecoBbva}

                    // Superficies
                    superficieTerreno={superficieTerreno}
                    superficieObraCivil={superficieConstruida}

                    // Valores por m²
                    valorMetroTerreno={valorMetroTerreno}
                    valorObraCivilM2={valorObraCivilM2}
                    valorMercadoM2={valorMercadoMetroCuadrado}

                    // Superficies para BBVA
                    superficies={superficies}

                    // Funciones de actualización existentes
                    onValorMercadoChange={handleValorMercadoChange}
                    onValorVentaRapidaChange={handleValorVentaRapidaChange}
                    onValorRemateChange={handleValorRemateChange}
                    onValorTerrenoChange={setValorTerreno}
                    onValorMetroTerrenoChange={handleValorMetroTerrenoChangeBbva}
                    onSuperficieTerrenoChange={handleSuperficieTerrenoChangeBbva}
                    onUpdateSuperficie={handleUpdateSuperficieBbva}

                    // Nuevas funciones de actualización
                    onValorObraCivilChange={handleValorObraCivilChange}
                    onValorObraCivilM2Change={handleValorObraCivilM2Change}
                    onValorIntrinsecoChange={handleValorIntrinsecoChange}
                    onSuperficieObraCivilChange={handleSuperficieObraCivilChange}
                />
            );
        } else {
            return (
                <>
                    <h4 className="text-md font-medium text-gray-700">Valores Estimados:</h4>
                    <table className="w-full border-collapse mt-2">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border px-4 py-2">Concepto</th>
                                <th className="border px-4 py-2">Valor (USD)</th>
                                <th className="border px-4 py-2">USD/m²</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Precio de MERCADO</td>
                                <td className="border px-4 py-2">
                                    <InputNumerico
                                        value={valorMercado}
                                        onChange={handleValorMercadoChange}
                                        className={`w-full text-center px-2 py-1 border rounded-md ${mostrarAlertaHomologacion ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    {mostrarAlertaHomologacion && (
                                        <p className="text-xs text-red-600 mt-1">
                                            El valor ingresado difiere más del 20% del valor calculado ({formatearNumero(valorFinalCalculado)} USD)
                                        </p>
                                    )}
                                </td>
                                <td className="border px-4 py-2 font-bold">
                                    <input
                                        type="text"
                                        value={formatearNumero(valorMercadoMetroCuadrado)}
                                        readOnly
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Precio de REALIZACIÓN INMEDIATA</td>
                                <td className="border px-4 py-2">
                                    <InputNumerico
                                        value={valorVentaRapida}
                                        onChange={handleValorVentaRapidaChange}
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                                <td className="border px-4 py-2 font-bold">
                                    <input
                                        type="text"
                                        value={formatearNumero(valorVentaRapidaMetroCuadrado)}
                                        readOnly
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Precio de REMATE</td>
                                <td className="border px-4 py-2">
                                    <InputNumerico
                                        value={valorRemate}
                                        onChange={handleValorRemateChange}
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                                <td className="border px-4 py-2 font-bold">
                                    <input
                                        type="text"
                                        value={formatearNumero(valorRemateMetroCuadrado)}
                                        readOnly
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Precio de REPOSICIÓN A NUEVO</td>
                                <td className="border px-4 py-2">
                                    <InputNumerico
                                        value={costoReposicion}
                                        onChange={setCostoReposicion}
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                                <td className="border px-4 py-2 font-bold">
                                    <input
                                        type="text"
                                        value={formatearNumero(costoReposicionMetroCuadrado)}
                                        readOnly
                                        className="w-full text-center px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold text-green-900">Cálculo de Tasación</h3>

            {/* Tipo de Propiedad */}
            <div className="mt-4">
                <label htmlFor="tipoPropiedad" className="block text-sm font-medium text-gray-700">Tipo de Propiedad</label>
                <select
                    value={tipoPropiedad}
                    onChange={(e) => setTipoPropiedad(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                >
                    <option value="pc">Propiedad Común (Casa)</option>
                    <option value="ph">Propiedad Horizontal</option>
                    <option value="terreno">Terreno</option>
                </select>
            </div>

            {/* Estado de Conservación - Solo mostrar si NO es terreno de Itaú */}
            {!mostrarComoTerrenoItau && (
                <div className="mt-4">
                    <label htmlFor="estadoConservacion" className="block text-sm font-medium text-gray-700">Estado de Conservación</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <select
                            value={estadoConservacion}
                            onChange={handleConservacionChange}
                            className="block w-full px-3 py-2 border rounded-md"
                        >
                            <option value="Nuevo">Nuevo (1.00)</option>
                            <option value="Buen Estado">Buen Estado (0.95)</option>
                            <option value="Necesita Mantenimiento">Necesita Mantenimiento (0.90)</option>
                            <option value="Necesita Reparaciones">Necesita Reparaciones (0.85)</option>
                            <option value="Personalizado">Personalizado</option>
                        </select>
                        <InputNumerico
                            value={factorConservacionValor}
                            onChange={handleFactorConservacionChange}
                            className="block w-full px-3 py-2 border rounded-md"
                            placeholder="Factor"
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                </div>
            )}

            {mostrarComoTerrenoItau && (
                <TerrenoItauStandalone
                    initialSuperficie={superficieLocal}
                    initialPrecioMetro={valorMetroTerreno}
                    initialValorTotal={valorTerreno}
                    formatearNumero={formatearNumero}
                    onFinalValuesChange={handleTerrenoItauValuesChange}
                />
            )}
            {/* Para terrenos de Itaú mostrar la tabla de componentes, en otro caso mostrar la sección de obra civil */}

            {!mostrarComoTerrenoItau && (
                <div className="mt-4 p-3 border rounded">
                    <h4 className="text-md font-medium text-gray-700">
                        {tipoInforme === 'HSBC' ? 'Bienes Propios' : 'Obra Civil'}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label htmlFor="superficieTotalM2" className="block text-sm font-medium text-gray-700">Superficie Total (m²)</label>
                            <input
                                type="text"
                                value={superficieTerreno ? formatearNumero(superficieTerreno) : ''}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="u$sm2" className="block text-sm font-medium text-gray-700">U$S / m²</label>
                            <InputNumerico
                                value={valorMetroTerreno}
                                onChange={setValorMetroTerreno}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="Precio por m²"
                            />
                        </div>
                    </div>
                </div>
            )}



            {/* Sección específica para Propiedad Horizontal */}
            {tipoPropiedad === 'ph' && !mostrarComoTerrenoItau && (
                <div className="mt-4 p-3 border rounded">
                    <h4 className="text-md font-medium text-gray-700">Cálculo Cuota Parte (PH)</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label htmlFor="supTotalEdificioM2" className="block text-sm font-medium text-gray-700">Superficie Total del Edificio (m²)</label>
                            <InputNumerico
                                value={totalSuperficieEdificio}
                                onChange={setTotalSuperficieEdificio}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="Superficie total de todo el edificio"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Ingrese la superficie total de todo el edificio para calcular la cuota parte
                            </p>
                        </div>
                        <div>
                            <label htmlFor="supPhM2" className="block text-sm font-medium text-gray-700">Superficie del PH (m²)</label>
                            <input
                                type="text"
                                value={superficieConstruida ? formatearNumero(superficieConstruida) : '0.00'}
                                className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                                readOnly
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Suma de todas las superficies propias ingresadas (excluye bienes comunes)
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label htmlFor="cuotaParte" className="block text-sm font-medium text-gray-700">Cuota Parte (%)</label>
                            <InputNumerico
                                value={cuotaPartePorcentaje}
                                onChange={setCuotaPartePorcentaje}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="% de participación en el terreno"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Se calcula como: (Superficie del PH / Superficie Total del Edificio) * 100
                            </p>
                        </div>
                        <div>
                            <label htmlFor="valorCuotaParteUSD" className="block text-sm font-medium text-gray-700">Valor Cuota Parte (USD)</label>
                            <input
                                type="text"
                                value={formatearNumero(cuotaParteValor)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                                readOnly
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Calculado como: {cuotaPartePorcentaje}% del valor del terreno (${formatearNumero(valorTerreno)})
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Botón para agregar superficie cubierta - NO mostrar para terrenos de Itaú */}
            {!mostrarComoTerrenoItau && (
                <button
                    type="button" // <-- Agregar esto
                    onClick={(e) => {
                        e.preventDefault(); // <-- También agregar esto
                        setModalOpen(true);
                    }}
                    className="mt-4 bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Agregar Superficie Cubierta
                </button>
            )}

            {/* Tabla con superficies cubiertas */}
            {superficies.length > 0 && !mostrarComoTerrenoItau && (
                <div className="mt-4 p-3 border rounded overflow-x-auto">
                    <h4 className="text-md font-medium text-gray-700">
                        {tipoInforme === 'HSBC' ? 'Bienes Propios' : 'Obra Civil'}
                    </h4>
                    <table className="w-full border-collapse mt-2 text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border px-2 py-2">Descripción</th>
                                <th className="border px-2 py-2">Promedio</th>
                                <th className="border px-2 py-2">EDAD</th>
                                <th className="border px-2 py-2">CONSERVACIÓN</th>
                                <th className="border px-2 py-2">m²</th>
                                <th className="border px-2 py-2">U$S/m²</th>
                                <th className="border px-2 py-2">U$S/m² corregido</th>
                                <th className="border px-2 py-2">Valor Total (USD)</th>
                                <th className="border px-2 py-2">Valor Reposicion a Nuevo (USD)</th>
                                <th className="border px-2 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Filtrar las superficies según su tipo para HSBC */}
                            {superficies.map((superficie, index) => {
                                // Declarar la variable fuera de la expresión JSX
                                const uniqueKey = superficie.descripcion
                                    ? `${superficie.descripcion}-${index}`
                                    : `superficie-${index}`;
                                return (
                                    <tr key={uniqueKey}>
                                        <td className="border px-2 py-2">
                                            <input
                                                type="text"
                                                value={superficie.descripcion || ''}
                                                onChange={(e) => actualizarCampoSuperficie(index, 'descripcion', e.target.value)}
                                                className="w-full px-1 py-1 border rounded-sm"
                                            />
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">-</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.promedioEdad || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'promedioEdad', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">-</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.factorEdad || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'factorEdad', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">-</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.factorConservacion || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'factorConservacion', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">G</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.m2 || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'm2', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">G</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.precioMetro || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'precioMetro', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <span className="px-1 py-1">G</span>
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.precioMetroCorregido || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'precioMetroCorregido', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            <InputNumerico
                                                value={superficie.valorTotal || ''}
                                                onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotal', valor)}
                                                className="w-full px-1 py-1 border rounded-sm"
                                            />
                                        </td>
                                        <td className="border px-2 py-2">
                                            {superficie.tipoSuperficie === 'comun' ? (
                                                <InputNumerico
                                                    value={superficie.valorTotalSinCorregir || ''}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotalSinCorregir', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            ) : (
                                                <InputNumerico
                                                    value={superficie.valorTotalSinCorregir || calcularValorTotalSinCorregir(superficie.m2, superficie.precioMetro)}
                                                    onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotalSinCorregir', valor)}
                                                    className="w-full px-1 py-1 border rounded-sm"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-2 py-2">
                                            <button
                                                onClick={() => handleEliminarClick(index)}
                                                className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="bg-gray-200">
                                <td className="border px-2 py-2 font-bold">
                                    {tipoInforme === 'HSBC' ? 'Total Bienes Propios' : 'Total Obra civil'}
                                </td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2 font-bold">
                                    {formatearNumero(
                                        superficies
                                            .filter(s => s.tipoSuperficie !== 'comun') // Excluir bienes comunes del cálculo de m²
                                            .reduce((total, sup) => {
                                                // Asegurarse de que m2 sea un número para la suma
                                                const m2 = typeof sup.m2 === 'string' && sup.m2 !== 'G' ?
                                                    parseFloat(sup.m2) :
                                                    (typeof sup.m2 === 'number' ? sup.m2 : 0);
                                                return total + m2;
                                            }, 0)
                                    )}
                                </td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2 font-bold">
                                    {formatearNumero(valorObraCivil)}
                                </td>
                                <td className="border px-2 py-2 font-bold">
                                    {formatearNumero(
                                        superficies.reduce((total, sup) => {
                                            if (sup.tipoSuperficie === 'comun') {
                                                return total + parseFloat(sup.valorTotalSinCorregir || 0);
                                            }
                                            // Para bienes propios, calcular normalmente
                                            else {
                                                const valorReposicion = sup.valorTotalSinCorregir ||
                                                    calcularValorTotalSinCorregir(
                                                        typeof sup.m2 === 'number' ? sup.m2 : parseFloat(sup.m2 || 0),
                                                        typeof sup.precioMetro === 'number' ? sup.precioMetro : parseFloat(sup.precioMetro || 0)
                                                    );
                                                return total + parseFloat(valorReposicion || 0);
                                            }
                                        }, 0)
                                    )}
                                </td>
                                <td className="border px-2 py-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Valor Intrínseco */}
            {!mostrarComoTerrenoItau && tipoInforme !== 'ITAU' && tipoInforme !== 'BBVA' && (
                <div className="mt-4 p-3 border rounded">
                    <h4 className="text-md font-medium text-gray-700">Valor Intrínseco</h4>
                    <p className="text-sm text-gray-500 mb-2">
                        Suma del valor del terreno y la obra civil
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="font-bold">{formatearNumero(valorIntrinseco)} USD</span>
                        {superficieConstruida > 0 && (
                            <span className="text-sm">
                                {formatearNumero(calcularValorMetroCuadrado(valorIntrinseco, superficieConstruida))} USD/m²
                            </span>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 border rounded">
                {renderTotales()}
            </div>
            {/* Modal para agregar superficies */}
            <ModalSuperficie
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                tipoInforme={tipoInforme}
                onAddSuperficie={(nuevaSuperficie) => {

                    // Calcular el valor para bienes comunes
                    if (nuevaSuperficie.tipoSuperficie === 'comun') {
                        // Calcular valor total de bienes propios existentes para valorTotalSinCorregir (17%)
                        const bienesPropios = superficies.filter(s => s.tipoSuperficie === 'propio');
                        const valorReposicionPropios = bienesPropios.reduce((total, sup) => {
                            const valorReposicion = parseFloat(sup.valorTotalSinCorregir ||
                                calcularValorTotalSinCorregir(
                                    typeof sup.m2 === 'number' ? sup.m2 : parseFloat(sup.m2 || 0),
                                    typeof sup.precioMetro === 'number' ? sup.precioMetro : parseFloat(sup.precioMetro || 0)
                                ));
                            return total + valorReposicion;
                        }, 0);

                        // Calcular valor total de bienes propios existentes para valorTotal (25%)
                        const valorTotalPropios = bienesPropios.reduce((total, sup) => {
                            return total + parseFloat(sup.valorTotal || 0);
                        }, 0);

                        // Asignar el 17% del valor de reposición como valor inicial para valorTotalSinCorregir
                        nuevaSuperficie.valorTotalSinCorregir = formatearNumero(valorReposicionPropios * 0.17);
                        // Asignar el 25% del valor total como valor inicial para valorTotal
                        nuevaSuperficie.valorTotal = formatearNumero(valorTotalPropios * 0.25);

                        // Marcar como no editado manualmente
                        nuevaSuperficie.editadoManualmente = false;
                        nuevaSuperficie.editadoManualmenteValorTotal = false;

                    }
                    // Agregar la nueva superficie al array - USAR SOLO UNO DE ESTOS MÉTODOS
                    // Método 1: Especificar todos los campos individualmente

                    setSuperficies(prev => [...prev, {
                        descripcion: nuevaSuperficie.descripcion,
                        ampliaciones: nuevaSuperficie.ampliaciones,
                        promedioEdad: nuevaSuperficie.promedioEdad,
                        m2: nuevaSuperficie.m2,
                        factorEdad: nuevaSuperficie.factorEdad,
                        conservacion: nuevaSuperficie.conservacion,
                        factorConservacion: nuevaSuperficie.factorConservacion,
                        precioMetro: nuevaSuperficie.precioMetro,
                        precioMetroCorregido: nuevaSuperficie.precioMetroCorregido,
                        valorTotal: nuevaSuperficie.valorTotal,
                        tipoSuperficie: nuevaSuperficie.tipoSuperficie,
                        valorTotalSinCorregir: nuevaSuperficie.valorTotalSinCorregir,
                        editadoManualmente: nuevaSuperficie.editadoManualmente || false,
                        editadoManualmenteValorTotal: nuevaSuperficie.editadoManualmenteValorTotal || false,
                        tipoObraCivilBbva: nuevaSuperficie.tipoObraCivilBbva,
                        superficieDocumentadaObraCivilSeccionEDescripcionInmueble: nuevaSuperficie.m2,
                        superficieVerificadaObraCivilSeccionEDescripcionInmueble: nuevaSuperficie.m2,
                    }]);

                    setTimeout(() => {
                    }, 100);
                }}
            />


            {/* Modal de confirmación para eliminar */}
            <ModalConfirmacion
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleEliminarSuperficie}
                mensaje={indexToDelete !== null && superficies[indexToDelete] ?
                    `¿Estás seguro de que deseas eliminar la superficie "${superficies[indexToDelete].descripcion}"?` :
                    "¿Estás seguro de que deseas eliminar esta superficie?"}
            />
        </div>
    );
};

export default CalculoInforme;