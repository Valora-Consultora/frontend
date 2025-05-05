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
import InformeScotiaService from '../../api/InformeScotiaService'

const CalculoInforme = ({ superficieTerreno = 0, onGetCalculoData = null }) => {
    // Estados para los valores calculados (valores numéricos para cálculos)
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
    const [tipoPropiedad, setTipoPropiedad] = useState('casa');
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

    const getCalculoData = () => {
        return {
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
    };


    // Exponemos la función a través de una ref o useImperativeHandle si es necesario
    // React.useEffect(() => {
    //     console.log('BLAMED');
    //     if (onGetCalculoData) {
    //         onGetCalculoData(getCalculoData);
    //     }
    // }, [
    //     tipoPropiedad, estadoConservacion, factorConservacionValor, superficieTerreno,
    //     valorMetroTerreno, valorTerreno, valorMercado, valorVentaRapida, valorRemate,
    //     costoReposicion, valorIntrinseco, valorMercadoMetroCuadrado, valorVentaRapidaMetroCuadrado,
    //     valorRemateMetroCuadrado, costoReposicionMetroCuadrado, superficieConstruida, superficies,
    //     onGetCalculoData
    // ]);

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
    useEffect(() => {
        if (superficies.length > 0) {
            // Usar la función centralizada para calcular el factor edad promedio
            const promedioFactorEdad = calcularFactorEdadPromedio(superficies);
            setFactorEdad(promedioFactorEdad);
        }
    }, [superficies]);

    // Calcular valores del terreno
    useEffect(() => {
        // Usar la función centralizada para calcular el valor del terreno
        const nuevoValorTerreno = calcularValorTerreno(superficieTerreno, valorMetroTerreno);
        setValorTerreno(nuevoValorTerreno);
    }, [superficieTerreno, valorMetroTerreno]);

    // Calcular obra civil y valores relacionados
    useEffect(() => {
        // Usar funciones centralizadas para los cálculos
        const totalSuperficie = calcularSuperficieConstruidaTotal(superficies);
        setSuperficieConstruida(totalSuperficie);

        const totalObraCivil = calcularValorObraCivil(superficies);
        setValorObraCivil(totalObraCivil);

        const totalReposicion = calcularValorReposicionNuevo(superficies);
        setCostoReposicion(totalReposicion);
    }, [superficies]);

    // Calcular valor intrínseco
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
    }, [valorTerreno, valorObraCivil, valorMercado]);

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
    const actualizarCampoSuperficie = (index, campo, valor) => {
        const nuevasSuperficies = [...superficies];

        // Actualizamos el campo específico
        nuevasSuperficies[index] = {
            ...nuevasSuperficies[index],
            [campo]: valor
        };

        // MEJORA: Recalcular todos los valores relacionados en función del campo modificado
        switch (campo) {
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

            case 'valorTotal':
                // Si se modifica directamente el valor total, ajustamos el precio corregido
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
                }
                break;

            case 'valorTotalSinCorregir':
                // Si se modifica directamente el valor total sin corregir, ajustamos el precio base
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
                }
                break;

            default:
                // Para otros campos no necesitamos recálculos especiales
                break;
        }

        // MEJORA: Aplicar recálculo completo para asegurar consistencia en todos los valores
        nuevasSuperficies[index] = recalcularSuperficie(nuevasSuperficies[index]);

        // Asegurar que siempre tengamos un valor total sin corregir
        if (nuevasSuperficies[index].valorTotalSinCorregir === undefined) {
            const m2 = parseFloat(nuevasSuperficies[index].m2) || 0;
            const precioMetro = parseFloat(nuevasSuperficies[index].precioMetro) || 0;
            nuevasSuperficies[index].valorTotalSinCorregir = calcularValorTotalSinCorregir(m2, precioMetro);
        }
        setSuperficies(nuevasSuperficies);
    };

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
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="ph">PH</option>
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
                <h4 className="text-md font-medium text-gray-700">Terreno</h4>
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
                    <h4 className="text-md font-medium text-gray-700">Obra Civil</h4>
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
                            {superficies.map((superficie, index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-2">
                                        <input
                                            type="text"
                                            value={superficie.descripcion || ''}
                                            onChange={(e) => actualizarCampoSuperficie(index, 'descripcion', e.target.value)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.promedioEdad || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'promedioEdad', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.factorEdad || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'factorEdad', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.factorConservacion || obtenerFactorConservacion(superficie.conservacion)}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'factorConservacion', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.m2 || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'm2', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.precioMetro || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'precioMetro', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.precioMetroCorregido || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'precioMetroCorregido', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.valorTotal || ''}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotal', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
                                    </td>
                                    <td className="border px-2 py-2">
                                        <InputNumerico
                                            value={superficie.valorTotalSinCorregir || calcularValorTotalSinCorregir(superficie.m2, superficie.precioMetro)}
                                            onChange={(valor) => actualizarCampoSuperficie(index, 'valorTotalSinCorregir', valor)}
                                            className="w-full px-1 py-1 border rounded-sm"
                                        />
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
                            ))}
                            {/* Fila de totales */}
                            <tr className="bg-gray-200">
                                <td className="border px-2 py-2 font-bold">Total Obra civil</td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2 font-bold">{formatearNumero(superficieConstruida)}</td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2"></td>
                                <td className="border px-2 py-2 font-bold">
                                    {formatearNumero(valorObraCivil)}
                                </td>
                                <td className="border px-2 py-2 font-bold">
                                    {formatearNumero(superficies.reduce((total, sup) =>
                                        total + parseFloat(sup.valorTotalSinCorregir || calcularValorTotalSinCorregir(sup.m2, sup.precioMetro)), 0))}
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
                onAddSuperficie={(nuevaSuperficie) => {
                    // Agregar la nueva superficie al array de superficies
                    setSuperficies(prev => [...prev, {
                        descripcion: nuevaSuperficie.nombre,
                        ampliaciones: nuevaSuperficie.ampliaciones,
                        promedioEdad: nuevaSuperficie.promedioEdad,
                        m2: nuevaSuperficie.metros,
                        factorEdad: nuevaSuperficie.factorEdad,
                        conservacion: nuevaSuperficie.conservacion,
                        factorConservacion: nuevaSuperficie.factorConservacion,
                        precioMetro: nuevaSuperficie.precioMetro,
                        precioMetroCorregido: nuevaSuperficie.precioMetroCorregido,
                        valorTotal: nuevaSuperficie.valorTotal
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