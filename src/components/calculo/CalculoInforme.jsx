import React, { useState, useEffect } from 'react';
import {
    calcularValorVentaRapida,
    calcularValorRemate,
    calcularValorMetroCuadrado,
    obtenerFactorConservacion,
    obtenerEstadoConservacionDesdeValor,
    formatearNumero,
    calcularFactorEdadPromedio,
    calcularValorTerreno,
    calcularValorObraCivil,
    calcularValorReposicionNuevo,
    calcularValorIntrinseco,
    calcularSuperficieConstruidaTotal,
    calcularPrecioMetroCorregido,
    calcularValorTotalSuperficie,
    verificarDiferenciaHomologacion,
    recalcularSuperficie
} from '../calculo/CalculoUtils';
import ModalSuperficie from './ModalSuperficie';
import ModalConfirmacion from './ModalConfirmacion';
import InputNumerico from './inputNumerico';

const CalculoInforme = ({ superficieTerreno = 0, onGetCalculoData = null, tipoInforme = 'default', valorMetroTerrenoProp = 0 }) => {

    const [valorMercado, setValorMercado] = useState(0);
    const [valorVentaRapida, setValorVentaRapida] = useState(0);
    const [valorRemate, setValorRemate] = useState(0);
    const [costoReposicion, setCostoReposicion] = useState(0);
    const [valorFinalCalculado, setValorFinalCalculado] = useState(0);
    const [valorIntrinseco, setValorIntrinseco] = useState(0);
    const [valorTerreno, setValorTerreno] = useState(0);
    const [valorObraCivil, setValorObraCivil] = useState(0);

    // Estados para valores por metro cuadrado
    const [valorMercadoMetroCuadrado, setValorMercadoMetroCuadrado] = useState(0);
    const [valorVentaRapidaMetroCuadrado, setValorVentaRapidaMetroCuadrado] = useState(0);
    const [valorRemateMetroCuadrado, setValorRemateMetroCuadrado] = useState(0);
    const [costoReposicionMetroCuadrado, setCostoReposicionMetroCuadrado] = useState(0);
    const [mostrarAlertaHomologacion, setMostrarAlertaHomologacion] = useState(false);

    // Estado para el valor del metro cuadrado de terreno
    const [valorMetroTerreno, setValorMetroTerreno] = useState(0);

    // Estados para datos construcción
    const [tipoPropiedad, setTipoPropiedad] = useState('pc');
    const [estadoConservacion, setEstadoConservacion] = useState('Buen estado');
    const [factorConservacionValor, setFactorConservacionValor] = useState(1);

    // Estados para factores
    const [factorEdad, setFactorEdad] = useState(1);
    const [factorConservacion, setFactorConservacion] = useState(1);

    // Estados para superficies
    const [superficies, setSuperficies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [superficieConstruida, setSuperficieConstruida] = useState(0);

    // Estados para el modal de confirmación
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);
    //const [getCalculoData, setGetCalculoData] = useState(null);



    const [hsbcData, setHsbcData] = useState({
        cuotaPartePorcentaje: 0,
        cuotaParteValor: 0,
        bienesExclusivos: [],
        murosDuctosValor: 0,
        totalObraCivilHsbc: 0
    });

    const [totalSuperficieEdificio, setTotalSuperficieEdificio] = useState(0);
    const [cuotaPartePorcentaje, setCuotaPartePorcentaje] = useState(0);
    const [cuotaParteValor, setCuotaParteValor] = useState(0);
    const [murosDuctosValor, setMurosDuctosValor] = useState(0);
    const [totalObraCivilHsbc, setTotalObraCivilHsbc] = useState(0);
    const [bloquearRecalculoBienesComunes, setBloquearRecalculoBienesComunes] = useState(false);

    const getCalculoData = () => {
        // Objeto base para todos los tipos de informe (mantener como estaba)
        const calculoBase = {
            tipoPropiedad: tipoPropiedad.toUpperCase(),
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
                valorTotalSinCorregir: parseFloat(superficie.valorTotalSinCorregir || calcularValorTotalSinCorregir(superficie.m2 || 0, superficie.precioMetro || 0))
            }))
        };

        if (tipoPropiedad === 'ph') {
            return {
                ...calculoBase,
                totalSuperficieEdificio: parseFloat(totalSuperficieEdificio || 0),
                cuotaPartePorcentaje: parseFloat(cuotaPartePorcentaje || 0),
                cuotaParteValor: parseFloat(cuotaParteValor || 0),
            };
        }

        // Agregar campos específicos según el tipo de informe
        /*         if (tipoInforme === 'HSBC') {
                    return {
                        ...calculoBase,
                        tipoBanco: 'HSBC',
                        cuotaPartePorcentaje: parseFloat(hsbcExtensionData.cuotaPartePorcentaje || 0),
                        cuotaParteValor: parseFloat(hsbcExtensionData.cuotaParteValor || 0),
                        bienesExclusivos: (hsbcExtensionData.bienesExclusivos || []).map(bien => ({
                            descripcion: bien.descripcion || '',
                            metros: parseFloat(bien.metros || 0),
                            valorMetro: parseFloat(bien.valorMetro || 0),
                            valor: parseFloat(bien.valor || 0)
                        })),
                        bienesComunes: (hsbcExtensionData.bienesComunes || []).map(bien => ({
                            descripcion: bien.descripcion || '',
                            metros: parseFloat(bien.metros || 0),
                            valorMetro: parseFloat(bien.valorMetro || 0),
                            valor: parseFloat(bien.valor || 0)
                        })),
                        murosDuctosValor: parseFloat(hsbcExtensionData.murosDuctosValor || 0),
                        totalObraCivilHsbc: parseFloat(hsbcExtensionData.totalObraCivilHsbc || 0)
                    };
                } */
        // Podrías agregar condicionales para otros bancos si es necesario

        // Por defecto, devolver calculoBase
        return calculoBase;
    };

    const [hsbcExtensionData, setHsbcExtensionData] = useState({
        cuotaPartePorcentaje: 0,
        cuotaParteValor: 0,
        murosDuctosValor: 0,
        totalObraCivilHsbc: 0,
        bienesExclusivos: [],
        bienesComunes: []
    });

    const handleHsbcDataChange = (data) => {
        setHsbcExtensionData(data);
    };


    // Clasificar las superficies cuando hay cambios
    useEffect(() => {
        if (tipoInforme === 'HSBC') {
            // Clasificar las superficies basadas en su tipo
            const propios = superficies.filter(s => s.tipoBien === 'propio' || !s.tipoBien);
            const exclusivos = superficies.filter(s => s.tipoBien === 'comun_exclusivo');
            const comunes = superficies.filter(s => s.tipoBien === 'comun');
        }
    }, [superficies, tipoInforme]);

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

            console.log('PH - Total metros cuadrados propios:', totalMetrosCuadrados);
            console.log('PH - Total superficie edificio:', totalSuperficieEdificio);

            // Calculamos el porcentaje de cuota parte solo si los valores son válidos
            if (totalMetrosCuadrados > 0 && totalSuperficieEdificio > 0) {
                const porcentaje = (totalMetrosCuadrados / parseFloat(totalSuperficieEdificio)) * 100;
                setCuotaPartePorcentaje(formatearNumero(porcentaje));

                // Calculamos el valor en USD de la cuota parte
                const valorCuotaParte = (porcentaje / 100) * parseFloat(valorTerreno);
                setCuotaParteValor(formatearNumero(valorCuotaParte));

                console.log('PH - Porcentaje calculado:', porcentaje);
                console.log('PH - Valor cuota parte calculado:', valorCuotaParte);
            }
        } else {
            // Si no es PH, reiniciamos los valores
            setCuotaPartePorcentaje(0);
            setCuotaParteValor(0);
        }
    }, [tipoPropiedad, superficies, totalSuperficieEdificio, valorTerreno]);

    const calcularMetrosCuadradosPropios = () => {
        return superficies
            .filter(s => s.tipoSuperficie !== 'comun')
            .reduce((total, sup) => {
                const m2 = typeof sup.m2 === 'string' ?
                    (sup.m2 === 'G' ? 0 : parseFloat(sup.m2) || 0) :
                    (parseFloat(sup.m2) || 0);
                return total + m2;
            }, 0);
    };

    useEffect(() => {
        console.log('Calculando valor intrínseco:', {
            tipoPropiedad,
            valorTerreno,
            valorObraCivil,
            cuotaParteValor
        });

        // Calcular el valor intrínseco según el tipo de propiedad
        let nuevoValorIntrinseco;

        if (tipoPropiedad === 'ph' && cuotaParteValor > 0) {
            // Para PH, el valor intrínseco es la suma de la cuota parte y la obra civil
            nuevoValorIntrinseco = formatearNumero(parseFloat(cuotaParteValor) + parseFloat(valorObraCivil));
            console.log('PH - Valor intrínseco calculado:', nuevoValorIntrinseco, 'Cuota parte:', cuotaParteValor, 'Obra civil:', valorObraCivil);
        } else {
            // Para PC y otros tipos, el valor intrínseco es la suma del valor del terreno y la obra civil
            nuevoValorIntrinseco = formatearNumero(parseFloat(valorTerreno) + parseFloat(valorObraCivil));
            console.log('PC/Otro - Valor intrínseco calculado:', nuevoValorIntrinseco, 'Terreno:', valorTerreno, 'Obra civil:', valorObraCivil);
        }

        // Solo actualizar si hay un cambio real
        if (nuevoValorIntrinseco !== valorIntrinseco) {
            console.log('Actualizando valor intrínseco de', valorIntrinseco, 'a', nuevoValorIntrinseco);
            setValorIntrinseco(nuevoValorIntrinseco);
            setValorFinalCalculado(nuevoValorIntrinseco);
        }

        // Verificar si valor de mercado manual difiere mucho del calculado
        if (valorMercado && nuevoValorIntrinseco) {
            const excedeDiferencia = verificarDiferenciaHomologacion(nuevoValorIntrinseco, valorMercado);
            setMostrarAlertaHomologacion(excedeDiferencia);
        }
    }, [tipoPropiedad, valorTerreno, valorObraCivil, cuotaParteValor, valorMercado]);


    // Exponemos la función a través de una ref o useImperativeHandle si es necesario
    useEffect(() => {
        if (onGetCalculoData) {
            onGetCalculoData(getCalculoData);
        }
    }, [
        tipoPropiedad, estadoConservacion, factorConservacionValor, superficieTerreno,
        valorMetroTerreno, valorTerreno, valorMercado, valorVentaRapida, valorRemate,
        costoReposicion, valorIntrinseco, valorMercadoMetroCuadrado, valorVentaRapidaMetroCuadrado,
        valorRemateMetroCuadrado, costoReposicionMetroCuadrado, superficieConstruida, superficies,
        onGetCalculoData, tipoInforme, hsbcData // Agregar hsbcData a las dependencias
    ]);

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

    // Calcular factores promedio basados en todas las superficies
    // Mejoremos el useEffect para calcular los valores de bienes comunes
    // Mejoremos el useEffect para calcular los valores de bienes comunes
    /* useEffect(() => {
        if (bloquearRecalculoBienesComunes || superficies.length === 0) return;

        if (superficies.length > 0) {
            // Buscar si hay bienes comunes que aún no tienen valor asignado
            const bienesComunes = superficies.filter(s =>
                s.tipoSuperficie === 'comun' &&
                (s.valorTotal === 0 || s.valorTotal === undefined)
            );

            if (bienesComunes.length > 0) {
                // Calcular valor total de bienes propios
                const bienesPropios = superficies.filter(s => s.tipoSuperficie === 'propio');
                const valorTotalPropios = bienesPropios.reduce((total, sup) => {
                    const valorSup = parseFloat(sup.valorTotal || 0);
                    return total + valorSup;
                }, 0);

                // Calcular el 17% del valor total de bienes propios
                const valorBienesComunes = formatearNumero(valorTotalPropios * 0.17);

                // Actualizar solo los bienes comunes que no tengan valor manual asignado
                const nuevasSuperficies = [...superficies];
                let actualizado = false;

                nuevasSuperficies.forEach((sup, index) => {
                    if (sup.tipoSuperficie === 'comun' &&
                        (sup.valorTotal === 0 || sup.valorTotal === undefined)) {
                        nuevasSuperficies[index] = {
                            ...sup,
                            valorTotal: valorBienesComunes
                        };
                        actualizado = true;
                    }
                });

                // Solo actualizar el estado si hubo cambios
                if (actualizado) {
                    setSuperficies(nuevasSuperficies);
                }
            }
        }
    }, [superficies, bloquearRecalculoBienesComunes]); */


    // Calcular valores del terreno
    useEffect(() => {
        // Usar la función centralizada para calcular el valor del terreno
        const nuevoValorTerreno = calcularValorTerreno(superficieTerreno, valorMetroTerreno);
        setValorTerreno(nuevoValorTerreno);
    }, [superficieTerreno, valorMetroTerreno]);

    // Calcular obra civil y valores relacionados
    useEffect(() => {
        console.log('Recalculando obra civil y valores relacionados');

        // Calcular superficie construida total
        const totalSuperficie = calcularSuperficieConstruidaTotal(superficies);
        setSuperficieConstruida(totalSuperficie);

        // Calcular valor total de obra civil incluyendo TODOS los tipos de superficies
        const totalObraCivil = superficies.reduce((total, superficie) => {
            // Incluir tanto bienes propios como comunes (sin filtrar por tipoSuperficie)
            return total + parseFloat(superficie.valorTotal || 0);
        }, 0);

        console.log('Nuevo valor obra civil calculado (incluye comunes):', totalObraCivil);

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

        console.log('Nuevo valor reposición calculado:', totalReposicion);

        // Actualizar solo si hay un cambio significativo
        if (Math.abs(totalReposicion - costoReposicion) > 0.01) {
            setCostoReposicion(formatearNumero(totalReposicion));
        }
    }, [superficies]);

    /* // Calcular valor intrínseco
    useEffect(() => {
        // Usar la función centralizada para calcular el valor intrínseco
        const nuevoValorIntrinseco = calcularValorIntrinseco(valorTerreno, valorObraCivil);
        setValorIntrinseco(nuevoValorIntrinseco);
        setValorFinalCalculado(nuevoValorIntrinseco);

        // Verificar si valor de mercado manual difiere mucho del calculado usando la función centralizada
        if (valorMercado && nuevoValorIntrinseco) {
            const excedeDiferencia = verificarDiferenciaHomologacion(nuevoValorIntrinseco, valorMercado);
            setMostrarAlertaHomologacion(excedeDiferencia);
        }
    }, [valorTerreno, valorObraCivil, valorMercado]); */

    // Actualizar valores por metro cuadrado
    useEffect(() => {
        if (superficieConstruida > 0) {
            // Usar la función centralizada para calcular valores por metro cuadrado
            setValorMercadoMetroCuadrado(calcularValorMetroCuadrado(valorMercado, superficieConstruida));
            setValorVentaRapidaMetroCuadrado(calcularValorMetroCuadrado(valorVentaRapida, superficieConstruida));
            setValorRemateMetroCuadrado(calcularValorMetroCuadrado(valorRemate, superficieConstruida));
            setCostoReposicionMetroCuadrado(calcularValorMetroCuadrado(costoReposicion, superficieConstruida));
        }
    }, [valorMercado, valorVentaRapida, valorRemate, costoReposicion, superficieConstruida]);


    useEffect(() => {
        console.log('Ejecutando useEffect de actualización de valores para bienes comunes');

        if (bloquearRecalculoBienesComunes || superficies.length === 0) {
            console.log('Saliendo temprano del useEffect por bloqueo o sin superficies');
            return;
        }

        // Buscar si hay bienes comunes
        const bienesComunes = superficies.filter(s => s.tipoSuperficie === 'comun');
        if (bienesComunes.length === 0) return; // No hay bienes comunes para actualizar

        // Calcular valor total de bienes propios
        const bienesPropios = superficies.filter(s => s.tipoSuperficie === 'propio');
        const valorTotalPropios = bienesPropios.reduce((total, sup) => {
            return total + parseFloat(sup.valorTotal || 0);
        }, 0);

        console.log('Valor total de bienes propios calculado:', valorTotalPropios);

        // Actualizar el valorTotal de bienes comunes (25% del valor total de bienes propios)
        const valorBienesComunes = formatearNumero(valorTotalPropios * 0.25);
        console.log('Nuevo valor para bienes comunes calculado (25%):', valorBienesComunes);

        // Actualizar solo si el valor ha cambiado significativamente (más de 1%)
        const nuevasSuperficies = [...superficies];
        let actualizado = false;

        nuevasSuperficies.forEach((sup, index) => {
            if (sup.tipoSuperficie === 'comun') {
                // No actualizar si ha sido editado manualmente
                if (sup.editadoManualmenteValorTotal) {
                    console.log('Bien común saltado por edición manual del valorTotal:', sup.descripcion);
                    return;
                }

                const valorActual = parseFloat(sup.valorTotal || 0);
                // Solo actualizar si el cambio es significativo
                if (Math.abs((valorBienesComunes - valorActual) / (valorActual || 1)) > 0.01) {
                    console.log(`Actualizando bien común "${sup.descripcion}" valorTotal: ${valorActual} -> ${valorBienesComunes}`);
                    nuevasSuperficies[index] = {
                        ...sup,
                        valorTotal: valorBienesComunes
                    };
                    actualizado = true;
                } else {
                    console.log(`No se actualiza bien común "${sup.descripcion}" valorTotal (cambio no significativo)`);
                }
            }
        });

        // Solo actualizar el estado si hubo cambios
        if (actualizado) {
            console.log("Actualizando estado con nuevos valores de valorTotal para bienes comunes");
            setSuperficies(nuevasSuperficies);
        } else {
            console.log("No se realizaron cambios en los valorTotal de bienes comunes");
        }
    }, [superficies, bloquearRecalculoBienesComunes]);


    // Actualizar valores derivados cuando cambia el valor de mercado
    useEffect(() => {
        // Calcular como promedio entre valor de mercado y valor de remate
        if (valorMercado && valorRemate) {
            const promedio = (parseFloat(valorMercado) + parseFloat(valorRemate)) / 2;
            // Redondear a miles
            setValorVentaRapida(redondearAMiles(promedio));
        } else if (valorMercado) {
            // Si solo tenemos valor de mercado, mantener la fórmula anterior
            setValorVentaRapida(calcularValorVentaRapida(valorMercado));
        }
    }, [valorMercado, valorRemate]);

    // Manejador para el cambio del valor de venta rápida
    const handleValorVentaRapidaChange = (valor) => {
        setValorVentaRapida(valor);
    };

    // Función para calcular el valor total sin corregir (metros cuadrados * precio sin corregir)
    const calcularValorTotalSinCorregir = (metros, precioMetro) => {
        return formatearNumero(parseFloat(metros) * parseFloat(precioMetro));
    };

    const redondearAMiles = (valor) => {
        if (!valor) return 0;
        const valorRedondeado = Math.round(parseFloat(valor) / 1000) * 1000;
        return valorRedondeado;
    };

    // Función para actualizar cualquier campo de una superficie
    // Función para actualizar cualquier campo de una superficie
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

            case 'precioMetro':
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

            case 'factorEdad':
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

            case 'factorConservacion':
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

            case 'm2':
                // Si se modifican los metros cuadrados, recalculamos tanto el valor total como el valor total sin corregir
                const pCorregido = parseFloat(nuevasSuperficies[index].precioMetroCorregido) || 0;
                nuevasSuperficies[index].valorTotal = calcularValorTotalSuperficie(valor, pCorregido);

                const pSinCorregir = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
                nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(valor, pSinCorregir);
                break;

            case 'precioMetroCorregido':
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

            // Modifica el caso 'valorTotal' en la función actualizarCampoSuperficie

            case 'valorTotal':
                console.log('Actualizando valorTotal:', {
                    tipoSuperficie: nuevasSuperficies[index].tipoSuperficie,
                    indice: index,
                    valorAnterior: nuevasSuperficies[index].valorTotal,
                    nuevoValor: valor
                });

                // Si es un bien común, solo actualizamos el valor total sin más cálculos
                if (nuevasSuperficies[index].tipoSuperficie === 'comun') {
                    nuevasSuperficies[index].valorTotal = valor;
                    // Marcar como editado manualmente para evitar actualizaciones automáticas
                    nuevasSuperficies[index].editadoManualmenteValorTotal = true;

                    // Bloquear recálculos automáticos temporalmente
                    setBloquearRecalculoBienesComunes(true);
                    console.log('Bloqueo de recálculo activado para bienes comunes (valorTotal)');

                    setTimeout(() => {
                        console.log('Desactivando bloqueo de recálculo para bienes comunes');
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

                    console.log("Nuevo valor intrínseco calculado tras editar valorTotal:", nuevoValorIntrinseco);
                    setValorIntrinseco(nuevoValorIntrinseco);
                    setValorFinalCalculado(nuevoValorIntrinseco);

                    // No necesitamos un return aquí, ya que queremos que también se aplique el recálculo general
                }
                break;

            // Modifica la parte del caso valorTotalSinCorregir en la función actualizarCampoSuperficie
            // para asegurarte de que el valor intrínseco se actualice correctamente:

            case 'valorTotalSinCorregir':
                console.log('Actualizando valorTotalSinCorregir:', {
                    tipoSuperficie: nuevasSuperficies[index].tipoSuperficie,
                    indice: index,
                    valorAnterior: nuevasSuperficies[index].valorTotalSinCorregir,
                    nuevoValor: valor
                });

                // Si es un bien común, simplemente actualizar el valor sin recálculos
                if (nuevasSuperficies[index].tipoSuperficie === 'comun') {
                    nuevasSuperficies[index].valorTotalSinCorregir = valor;

                    // Marcar esta superficie como editada manualmente para evitar actualizaciones automáticas
                    nuevasSuperficies[index].editadoManualmente = true;

                    // Bloquear recálculos automáticos temporalmente
                    setBloquearRecalculoBienesComunes(true);
                    console.log('Bloqueo de recálculo activado para bienes comunes');

                    setTimeout(() => {
                        console.log('Desactivando bloqueo de recálculo para bienes comunes');
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

                    console.log("Actualizando costo de reposición después de editar bien común:", nuevoValorReposicion);
                    setCostoReposicion(formatearNumero(nuevoValorReposicion));

                    // No hay necesidad de recalcular inmediatamente el valor intrínseco aquí, 
                    // ya que los bienes comunes no afectan al valor de obra civil (que es lo que entra
                    // en el cálculo del valor intrínseco)
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

                    console.log("Nuevo valor intrínseco calculado tras editar valorTotalSinCorregir:", nuevoValorIntrinseco);
                    setValorIntrinseco(nuevoValorIntrinseco);
                    setValorFinalCalculado(nuevoValorIntrinseco);
                }
                break;

            default:
                // Para otros campos no necesitamos recálculos especiales
                break;
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

        // Actualizar el estado de superficies
        setSuperficies(nuevasSuperficies);

        // Reclasificar las superficies si estamos en el informe HSBC
        if (tipoInforme === 'HSBC') {
            const propios = nuevasSuperficies.filter(s => s.tipoBien === 'propio' || !s.tipoBien);
            const exclusivos = nuevasSuperficies.filter(s => s.tipoBien === 'comun_exclusivo');
            const comunes = nuevasSuperficies.filter(s => s.tipoBien === 'comun');
        }
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
    }, [superficies]);


    // Modificar el useEffect que actualiza los bienes comunes automáticamente
    useEffect(() => {
        console.log('Ejecutando useEffect de actualización de bienes comunes:', {
            bloqueado: bloquearRecalculoBienesComunes,
            cantidadSuperficies: superficies.length
        });

        if (bloquearRecalculoBienesComunes || superficies.length === 0) {
            console.log('Saliendo temprano del useEffect (bloqueado o sin superficies)');
            return;
        }

        // Buscar si hay bienes comunes
        const bienesComunes = superficies.filter(s => s.tipoSuperficie === 'comun');
        console.log('Bienes comunes encontrados:', bienesComunes.length);

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

        console.log('Valor reposición de bienes propios calculado:', valorReposicionPropios);

        // Actualizar los bienes comunes con el 17% del valor
        const valorBienesComunes = formatearNumero(valorReposicionPropios * 0.17);
        console.log('Nuevo valor para bienes comunes calculado:', valorBienesComunes);

        // Actualizar solo si el valor ha cambiado significativamente (más de 1%)
        const nuevasSuperficies = [...superficies];
        let actualizado = false;

        nuevasSuperficies.forEach((sup, index) => {
            if (sup.tipoSuperficie === 'comun') {
                // No actualizar si ha sido editado manualmente
                if (sup.editadoManualmente) {
                    console.log('Bien común saltado por edición manual:', sup.descripcion);
                    return;
                }

                const valorActual = parseFloat(sup.valorTotalSinCorregir || 0);
                // Solo actualizar si el cambio es significativo
                if (Math.abs((valorBienesComunes - valorActual) / (valorActual || 1)) > 0.01) {
                    console.log(`Actualizando bien común "${sup.descripcion}": ${valorActual} -> ${valorBienesComunes}`);
                    nuevasSuperficies[index] = {
                        ...sup,
                        valorTotalSinCorregir: valorBienesComunes,
                        valorTotal: 0 // El valor total sigue siendo cero
                    };
                    actualizado = true;
                } else {
                    console.log(`No se actualiza bien común "${sup.descripcion}" (cambio no significativo)`);
                }
            }
        });

        // Solo actualizar el estado si hubo cambios
        if (actualizado) {
            console.log("Actualizando estado con nuevos valores de bienes comunes");
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
        } else {
            console.log("No se realizaron cambios en los bienes comunes");
        }
    }, [superficies, bloquearRecalculoBienesComunes]);


    // Handle cambio en valor de mercado
    const handleValorMercadoChange = (valor) => {
        setValorMercado(valor);
        // Los valores derivados se actualizarán a través de los efectos
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
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold text-green-900">Cálculo de Tasación</h3>

            {/* Tipo de Propiedad */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Tipo de Propiedad</label>
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

            {/* Estado de Conservación */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Estado de Conservación</label>
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

            {/* Terreno */}
            <div className="mt-4 p-3 border rounded">
                <h4 className="text-md font-medium text-gray-700">
                    {tipoInforme === 'HSBC' ? 'Bienes Propios' : 'Obra Civil'}
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Superficie Total (m²)</label>
                        <input
                            type="text"
                            value={superficieTerreno ? formatearNumero(superficieTerreno) : ''}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">U$S / m²</label>
                        <InputNumerico
                            value={valorMetroTerreno}
                            onChange={setValorMetroTerreno}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Precio por m²"
                        />
                    </div>
                </div>
            </div>

            {/* Sección específica para Propiedad Horizontal */}
            {tipoPropiedad === 'ph' && (
                <div className="mt-4 p-3 border rounded">
                    <h4 className="text-md font-medium text-gray-700">Cálculo Cuota Parte (PH)</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Superficie Total del Edificio (m²)</label>
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
                            <label className="block text-sm font-medium text-gray-700">Superficie del PH (m²)</label>
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
                            <label className="block text-sm font-medium text-gray-700">Cuota Parte (%)</label>
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
                            <label className="block text-sm font-medium text-gray-700">Valor Cuota Parte (USD)</label>
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

            {/* Botón para agregar superficie cubierta */}
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

            {/* Tabla con superficies cubiertas */}
            {superficies.length > 0 && (
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
                            {superficies.map((superficie, index) => (
                                <tr key={index}>
                                    {/* Descripción - siempre visible */}
                                    <td className="border px-2 py-2">
                                        <input
                                            type="text"
                                            value={superficie.descripcion || ''}
                                            onChange={(e) => actualizarCampoSuperficie(index, 'descripcion', e.target.value)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>

                                    {/* Promedio Edad */}
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

                                    {/* EDAD (Factor Edad) */}
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

                                    {/* CONSERVACIÓN */}
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

                                    {/* m² */}
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

                                    {/* U$S/m² */}
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

                                    {/* U$S/m² corregido */}
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

                                    {/* Valor Total (USD) */}
                                    <td className="border px-2 py-2">
                                        {superficie.tipoSuperficie === 'comun' ? (
                                            <InputNumerico
                                                value={superficie.valorTotal || ''}
                                                onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotal', valor)}
                                                className="w-full px-1 py-1 border rounded-sm"
                                            />
                                        ) : (
                                            <InputNumerico
                                                value={superficie.valorTotal || ''}
                                                onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotal', valor)}
                                                className="w-full px-1 py-1 border rounded-sm"
                                            />
                                        )}
                                    </td>

                                    {/* Valor Reposicion a Nuevo (USD) */}
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

                                    {/* Acciones */}
                                    <td className="border px-2 py-2">
                                        <button
                                            onClick={() => handleEliminarClick(index)}
                                            className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Fila de totales */}
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
                                            // Para bienes comunes, usar directamente el valorTotalSinCorregir
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

            {/* Tabla con valores calculados y editables */}
            <div className="mt-4 p-3 border rounded">
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

                        console.log('Nuevo bien común creado con valorTotalSinCorregir:', nuevaSuperficie.valorTotalSinCorregir);
                        console.log('Nuevo bien común creado con valorTotal:', nuevaSuperficie.valorTotal);
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
                        editadoManualmenteValorTotal: nuevaSuperficie.editadoManualmenteValorTotal || false
                    }]);

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