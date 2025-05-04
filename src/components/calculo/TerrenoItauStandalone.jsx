import React, { useState, useEffect, useRef } from 'react';

const TerrenoItauStandalone = ({
    initialSuperficie = 0,
    initialPrecioMetro = 0,
    initialValorTotal = 0,
    formatearNumero,
    onFinalValuesChange
}) => {

    // Estados locales simplificados 
    const [superficie, setSuperficie] = useState(initialSuperficie);
    const [precioMetro, setPrecioMetro] = useState(initialPrecioMetro);
    const [valorTotal, setValorTotal] = useState(initialValorTotal);

    // Referencias para saber si estamos en un cambio manual
    const actualizacionManual = useRef(false);

    useEffect(() => {
        setSuperficie(initialSuperficie);
        setPrecioMetro(initialPrecioMetro);
        setValorTotal(initialValorTotal);
    }, [initialSuperficie, initialPrecioMetro, initialValorTotal]);

    // Funciones de manejo simplificadas
    const calcularTotal = (sup, precio) => {
        if (sup > 0 && precio > 0) {
            return sup * precio;
        }
        return 0;
    };

    const handleSuperficieChange = (e) => {
        const nuevoValor = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
        setSuperficie(nuevoValor);
        if (nuevoValor > 0 && precioMetro > 0) {
            setValorTotal(nuevoValor * precioMetro);
        }
    };

    const handlePrecioMetroChange = (e) => {
        const nuevoValor = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
        
        // Marcar que estamos en una actualización manual
        actualizacionManual.current = true;

        // Actualizar los valores locales
        setPrecioMetro(nuevoValor);
        const nuevoTotal = calcularTotal(superficie, nuevoValor);
        setValorTotal(nuevoTotal);

    };

    const handleValorTotalChange = (e) => {
        const nuevoValor = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
        
        // Marcar que estamos en una actualización manual
        actualizacionManual.current = true;

        // Actualizar solo el valor total (no recalcular otros valores)
        setValorTotal(nuevoValor);
    };

    const handleBlur = () => {
        if (onFinalValuesChange) {
            onFinalValuesChange({
                superficie,
                precioMetro,
                valorTotal
            });
        }
    };

    return (
        <div className="mt-4 p-3 border rounded bg-white">
            <h4 className="text-md font-medium text-green-900">Componentes</h4>
            <table className="w-full border-collapse mt-2">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="border px-4 py-2 text-left">Componentes</th>
                        <th className="border px-4 py-2 text-center">Total de Metros Cuadrados</th>
                        <th className="border px-4 py-2 text-center">Precio por m²<br />(en U$S)</th>
                        <th className="border px-4 py-2 text-center">Total U$S</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Terreno</td>
                        <td className="border px-4 py-2 text-center">
                            <input
                                type="text"
                                value={superficie}
                                onChange={handleSuperficieChange}
                                onBlur={handleBlur}
                                className="w-full text-center px-2 py-1 border rounded-md"
                            />
                        </td>
                        <td className="border px-4 py-2 text-center">
                            <input
                                type="text"
                                value={precioMetro}
                                onChange={handlePrecioMetroChange}
                                onBlur={handleBlur}
                                className="w-full text-center px-2 py-1 border rounded-md"
                            />
                        </td>
                        <td className="border px-4 py-2 text-center">
                            <input
                                type="text"
                                value={valorTotal}
                                onChange={handleValorTotalChange}
                                onBlur={handleBlur}
                                className="w-full text-center px-2 py-1 border rounded-md"
                            />
                        </td>
                    </tr>
                    <tr className="bg-gray-200 font-bold">
                        <td className="border px-4 py-2">Totales</td>
                        <td className="border px-4 py-2 text-center">{formatearNumero(superficie)}</td>
                        <td className="border px-4 py-2 text-center">{formatearNumero(precioMetro)}</td>
                        <td className="border px-4 py-2 text-center">{formatearNumero(valorTotal)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TerrenoItauStandalone;