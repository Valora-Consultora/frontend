import React, { useState, useEffect } from 'react';
import InputNumerico from './inputNumerico';
import {
    obtenerFactorConservacion,
    obtenerEstadoConservacionDesdeValor,
    formatearNumero,
    calcularPromedioEdad,
    calcularFactorEdad,
    calcularPrecioMetroCorregido,
    calcularValorTotalSuperficie,
    parseStringAmpliaciones,
    convertirAmpliacionesAString
} from '../calculo/CalculoUtils';

const ModalSuperficie = ({ isOpen, onClose, onAddSuperficie, superficieEditar = null }) => {
    // Datos básicos de la superficie
    const [nombre, setNombre] = useState('');
    const [metros, setMetros] = useState(0);
    const [conservacion, setConservacion] = useState('Buen estado');
    const [factorConservacionValor, setFactorConservacionValor] = useState(1);
    const [precioMetro, setPrecioMetro] = useState(0);
    const [precioMetroCorregido, setPrecioMetroCorregido] = useState(0);

    // Datos para el cálculo de la edad
    const [anioOriginal, setAnioOriginal] = useState('');
    const [ampliaciones, setAmpliaciones] = useState([]);
    const [promedioEdad, setPromedioEdad] = useState(0);
    const [factorEdad, setFactorEdad] = useState(0);
    const [calculoAutomatico, setCalculoAutomatico] = useState(true);

    // Cargar datos si estamos editando una superficie existente
    useEffect(() => {
        if (superficieEditar) {
            setNombre(superficieEditar.descripcion || '');
            setMetros(superficieEditar.m2 || 0);

            // Para el estado de conservación, usar la función centralizada
            const factorConservacionEditar = parseFloat(superficieEditar.factorConservacion) || 1;
            setConservacion(obtenerEstadoConservacionDesdeValor(factorConservacionEditar));
            setFactorConservacionValor(factorConservacionEditar);

            setPrecioMetro(superficieEditar.precioMetro || 0);
            setPrecioMetroCorregido(superficieEditar.precioMetroCorregido || 0);
            setPromedioEdad(superficieEditar.promedioEdad || 0);
            setFactorEdad(superficieEditar.factorEdad || 0);

            // Parsear ampliaciones usando la función centralizada
            if (superficieEditar.ampliaciones) {
                const { anioOriginal: anioOrig, ampliaciones: amps } = parseStringAmpliaciones(superficieEditar.ampliaciones);
                setAnioOriginal(anioOrig);
                setAmpliaciones(amps);
            }
        }
    }, [superficieEditar]);

    // Actualizar el factor de conservación cuando cambia el estado seleccionado
    useEffect(() => {
        if (conservacion !== 'Personalizado') {
            const factor = obtenerFactorConservacion(conservacion);
            setFactorConservacionValor(factor);
        }
    }, [conservacion]);

    // Calcular el promedio de edad y el factor de edad cuando cambian los años
    useEffect(() => {
        if (anioOriginal && calculoAutomatico) {
            // Usar las funciones centralizadas para los cálculos
            const promEdad = calcularPromedioEdad(anioOriginal, ampliaciones);
            setPromedioEdad(promEdad);

            const factorEdadCalculado = calcularFactorEdad(promEdad);
            setFactorEdad(factorEdadCalculado);
        }
    }, [anioOriginal, ampliaciones, calculoAutomatico]);

    // Calcular el precio por metro corregido cuando cambian los factores
    useEffect(() => {
        if (precioMetro && factorEdad) {
            const valorCorregido = calcularPrecioMetroCorregido(precioMetro, factorEdad, factorConservacionValor);
            setPrecioMetroCorregido(valorCorregido);
        }
    }, [factorConservacionValor, factorEdad, precioMetro]);

    if (!isOpen) return null;

    // Agregar una nueva ampliación
    const agregarAmpliacion = () => {
        setAmpliaciones([...ampliaciones, { id: Date.now(), anio: '' }]);
    };

    // Actualizar el año de una ampliación
    const actualizarAmpliacion = (id, anio) => {
        setAmpliaciones(ampliaciones.map(amp =>
            amp.id === id ? { ...amp, anio } : amp
        ));
    };

    // Eliminar una ampliación
    const eliminarAmpliacion = (id) => {
        setAmpliaciones(ampliaciones.filter(amp => amp.id !== id));
    };

    // Manejador cuando cambia el estado de conservación
    const handleConservacionChange = (e) => {
        const nuevoEstado = e.target.value;
        setConservacion(nuevoEstado);

        if (nuevoEstado !== 'Personalizado') {
            const factor = obtenerFactorConservacion(nuevoEstado);
            setFactorConservacionValor(factor);
        }
    };

    // Manejador cuando cambia el valor personalizado del factor de conservación
    const handleFactorConservacionChange = (valor) => {
        setFactorConservacionValor(valor);

        // Usar la función centralizada para determinar el estado basado en el valor
        setConservacion(obtenerEstadoConservacionDesdeValor(valor));
    };

    // Manejador para cuando cambia el promedio de edad manualmente
    const handlePromedioEdadChange = (valor) => {
        setCalculoAutomatico(false);
        setPromedioEdad(valor);
    };

    // Manejador para cuando cambia el factor de edad manualmente
    const handleFactorEdadChange = (valor) => {
        setCalculoAutomatico(false);
        setFactorEdad(valor);
    };

    // Manejador para cuando cambia el precio por metro
    const handlePrecioMetroChange = (valor) => {
        setPrecioMetro(valor);
    };

    // Manejador para cuando cambian los metros
    const handleMetrosChange = (valor) => {
        setMetros(valor);
    };

    // Finalizar y agregar la superficie
    const handleAdd = () => {
        if (!nombre || !metros || !precioMetro || !anioOriginal) return;

        // Usar la función centralizada para convertir ampliaciones a string
        const ampliacionesString = convertirAmpliacionesAString(anioOriginal, ampliaciones);

        // Formatear todos los valores numéricos a 2 decimales
        const metrosFormateado = formatearNumero(metros);
        const precioCorregido = formatearNumero(precioMetroCorregido);

        // Usar la función centralizada para calcular el valor total
        const valorTotal = calcularValorTotalSuperficie(metrosFormateado, precioCorregido);

        onAddSuperficie({
            nombre,
            ampliaciones: ampliacionesString,
            promedioEdad: formatearNumero(promedioEdad) || 0,
            metros: metrosFormateado,
            factorEdad: formatearNumero(factorEdad) || 0,
            conservacion,
            factorConservacion: formatearNumero(factorConservacionValor),
            precioMetro: formatearNumero(precioMetro) || 0,
            precioMetroCorregido: precioCorregido,
            valorTotal,
            // Agregar ID si estamos editando
            id: superficieEditar && superficieEditar.id
        });

        // Limpiar el formulario
        setNombre('');
        setAnioOriginal('');
        setAmpliaciones([]);
        setPromedioEdad(0);
        setFactorEdad(0);
        setMetros(0);
        setConservacion('Buen estado');
        setFactorConservacionValor(1);
        setPrecioMetro(0);
        setPrecioMetroCorregido(0);
        setCalculoAutomatico(true);
        onClose(); // Cierra el modal después de agregar
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-96 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-green-900">
                    {superficieEditar ? 'Modificar Superficie' : 'Agregar Superficie'}
                </h3>

                {/* Información básica */}
                <label className="block mt-2">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: Vivienda Cub. Losa HA"
                />

                <label className="block mt-4">Metros Cuadrados</label>
                <InputNumerico
                    value={metros}
                    onChange={handleMetrosChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: 120.50"
                />

                {/* Sección de años y ampliaciones */}
                <div className="mt-4 p-2 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-700">Años de Construcción</h4>
                        <button
                            type="button"
                            onClick={agregarAmpliacion}
                            className="bg-green-900 text-white px-2 py-1 rounded text-xs hover:bg-green-800"
                        >
                            + Ampliación
                        </button>
                    </div>

                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600">Año Original</label>
                        <input
                            type="number"
                            value={anioOriginal}
                            onChange={(e) => setAnioOriginal(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-1"
                            placeholder="Ej: 1935"
                            min="1900"
                            max={new Date().getFullYear()}
                        />
                    </div>

                    {ampliaciones.map((ampliacion, index) => (
                        <div key={ampliacion.id} className="mt-2 flex items-center space-x-2">
                            <div className="flex-grow">
                                <label className="block text-xs font-medium text-gray-600">
                                    Ampliación {index + 1}
                                </label>
                                <input
                                    type="number"
                                    value={ampliacion.anio}
                                    onChange={(e) => actualizarAmpliacion(ampliacion.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md mt-1"
                                    placeholder="Ej: 1970"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => eliminarAmpliacion(ampliacion.id)}
                                className="mt-6 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}

                    {/* Campos editables para promedio de edad y factor edad */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Promedio Edad</label>
                            <InputNumerico
                                value={promedioEdad}
                                onChange={handlePromedioEdadChange}
                                className="w-full px-3 py-2 border rounded-md mt-1"
                                placeholder="Calculado automáticamente"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Factor Edad</label>
                            <InputNumerico
                                value={factorEdad}
                                onChange={handleFactorEdadChange}
                                className="w-full px-3 py-2 border rounded-md mt-1"
                                placeholder="Calculado automáticamente"
                            />
                        </div>
                    </div>

                    {/* Botón para restaurar cálculo automático */}
                    {!calculoAutomatico && (
                        <button
                            type="button"
                            onClick={() => setCalculoAutomatico(true)}
                            className="mt-2 text-xs text-green-900 underline"
                        >
                            Restaurar cálculo automático
                        </button>
                    )}
                </div>

                {/* Estado de conservación con valor editable */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Estado de Conservación</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <select
                            value={conservacion}
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

                {/* Precio por metro cuadrado */}
                <label className="block mt-4">U$S/m²</label>
                <InputNumerico
                    value={precioMetro}
                    onChange={handlePrecioMetroChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: 1200.50"
                />

                <label className="block mt-4">U$S/m² Corregido (Calculado)</label>
                <input
                    type="text"
                    value={typeof precioMetroCorregido === 'number' ? precioMetroCorregido.toFixed(2) : '0.00'}
                    disabled
                    className="w-full px-3 py-2 border rounded-md bg-gray-200"
                />

                {/* Botones de acción */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="bg-green-900 text-white px-4 py-2 rounded"
                    >
                        {superficieEditar ? 'Guardar Cambios' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalSuperficie;