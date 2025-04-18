import React from 'react';
import InputNumerico from './inputNumerico';
import { formatearNumero } from '../calculo/CalculoUtils';
import { useState, useEffect, useRef } from 'react';

const TotalesBbva = ({
    // Valores principales
    valorMercado,
    valorVentaRapida,
    valorRemate,
    valorTerreno,
    valorObraCivil,
    valorIntrinseco,

    // Superficies
    superficieTerreno,
    superficieObraCivil,

    // Valores por m²
    valorMetroTerreno,
    valorObraCivilM2,
    valorMercadoM2,

    // Otras propiedades
    superficies = [],

    // Funciones de actualización existentes
    onValorMercadoChange,
    onValorVentaRapidaChange,
    onValorRemateChange,
    onValorTerrenoChange,
    onValorMetroTerrenoChange,
    onSuperficieTerrenoChange,
    onUpdateSuperficie,

    // Nuevas funciones de actualización (opcionales)
    onSuperficieObraCivilChange = () => { },
    onValorObraCivilChange = () => { }, // Inicializar con función vacía
    onValorObraCivilM2Change = () => { }, // Inicializar con función vacía
    onValorIntrinsecoChange = () => { }, // Inicializar con función vacía
}) => {

    // Al inicio del componente, añade estos estados
    const [totalCubierta, setTotalCubierta] = useState({ documentada: '0', verificada: '0', valorTotal: '0' });
    const [totalSemiCubierta, setTotalSemiCubierta] = useState({ documentada: '0', verificada: '0', valorTotal: '0' });
    const [totalOtros, setTotalOtros] = useState({ documentada: '0', verificada: '0', valorTotal: '0' });
    const [totalGeneral, setTotalGeneral] = useState({ documentada: '0', verificada: '0', valorTotal: '0' });

    const handleSuperficieFieldChange = (tipoObraCivil, index, campo, valor) => {
        if (!onUpdateSuperficie) return;

        // Obtener las superficies filtradas por tipo
        const superficiesFiltradas = superficies.filter(s =>
            (s.tipoObraCivilBbva || "Superficie Cubierta") === tipoObraCivil);

        // Verificar que el índice es válido
        if (index >= 0 && index < superficiesFiltradas.length) {
            // Obtener la superficie específica
            const superficie = superficiesFiltradas[index];

            // Encontrar su índice en el array original de superficies
            const indiceGlobal = superficies.findIndex(s => s === superficie);

            if (indiceGlobal >= 0) {
                // Guardar una copia del valor anterior para comparación
                const valorAnterior = superficies[indiceGlobal][campo];

                // Actualizar el campo específico en la superficie
                onUpdateSuperficie(indiceGlobal, campo, valor);

                // Si el valor ha cambiado, forzar un recálculo inmediato
                if (valorAnterior !== valor) {
                    // Usar setTimeout para asegurar que se procese después de que React actualice el estado
                    setTimeout(() => {
                        console.log(`Campo ${campo} cambió de ${valorAnterior} a ${valor}, recalculando totales...`);
                        recalcularTotales();
                    }, 0);
                }
            }
        }
    };

    // Forzar recálculo de totales cada vez que se renderiza
    React.useEffect(() => {
        console.log("Forzando recálculo en renderizado");
        recalcularTotales();
    });

    const getTotalesSuperficiePorTipo = (tipo) => {
        // Filtramos asumiendo que superficies sin tipoObraCivilBbva son "Superficie Cubierta"
        const superficiesFiltradas = superficies.filter(s => {
            // Comprobación más estricta
            const tipoSuperficie = s.tipoObraCivilBbva === undefined ? "Superficie Cubierta" : s.tipoObraCivilBbva;
            return tipoSuperficie === tipo;
        });

        // Cálculo para valor documentada
        const documentada = formatearNumero(superficiesFiltradas.reduce((total, s) => {
            // Usar m2 como fallback si no existe superficieDocumentadaObraCivilSeccionEDescripcionInmueble
            const valor = s.superficieDocumentadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0) || 0;
            return total + parseFloat(valor);
        }, 0));

        // Cálculo para valor verificada
        const verificada = formatearNumero(superficiesFiltradas.reduce((total, s) => {
            // Usar m2 como fallback si no existe superficieVerificadaObraCivilSeccionEDescripcionInmueble
            const valor = s.superficieVerificadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0) || 0;
            return total + parseFloat(valor);
        }, 0));

        // Cálculo para valor total
        const valorTotal = formatearNumero(superficiesFiltradas.reduce((total, s) =>
            total + parseFloat(s.valorTotal || 0), 0));

        return { documentada, verificada, valorTotal };
    };

    const recalcularTotales = () => {
        console.log("Ejecutando recalcularTotales");

        // Calcular totales para cada tipo
        const nuevoTotalCubierta = calcularTotalesPorTipo("Superficie Cubierta");
        const nuevoTotalSemiCubierta = calcularTotalesPorTipo("Superficie Semi Cubierta");
        const nuevoTotalOtros = calcularTotalesPorTipo("Otros");

        // Actualizar los estados con los valores sin formatear
        setTotalCubierta(nuevoTotalCubierta);
        setTotalSemiCubierta(nuevoTotalSemiCubierta);
        setTotalOtros(nuevoTotalOtros);

        // Calcular el total general como suma de los valores numéricos
        const nuevoTotalGeneral = {
            documentada: (parseFloat(nuevoTotalCubierta.documentada) +
                parseFloat(nuevoTotalSemiCubierta.documentada) +
                parseFloat(nuevoTotalOtros.documentada)).toString(),

            verificada: (parseFloat(nuevoTotalCubierta.verificada) +
                parseFloat(nuevoTotalSemiCubierta.verificada) +
                parseFloat(nuevoTotalOtros.verificada)).toString(),

            valorTotal: (parseFloat(nuevoTotalCubierta.valorTotal) +
                parseFloat(nuevoTotalSemiCubierta.valorTotal) +
                parseFloat(nuevoTotalOtros.valorTotal)).toString()
        };

        setTotalGeneral(nuevoTotalGeneral);
        console.log("Nuevos totales generales:", nuevoTotalGeneral);
    };

    // Función auxiliar para calcular totales por tipo
    const calcularTotalesPorTipo = (tipo) => {
        console.log(`Calculando totales para tipo: ${tipo}`);

        // Filtrar superficies por tipo
        const superficiesFiltradas = superficies.filter(s => {
            const tipoSuperficie = s.tipoObraCivilBbva === undefined ?
                "Superficie Cubierta" : s.tipoObraCivilBbva;
            return tipoSuperficie === tipo;
        });

        console.log(`Encontradas ${superficiesFiltradas.length} superficies del tipo ${tipo}`);

        // Inicializar totales
        let sumDocumentada = 0;
        let sumVerificada = 0;
        let sumValorTotal = 0;

        // Sumar los valores manualmente para cada superficie
        superficiesFiltradas.forEach((s, idx) => {
            // Documentada
            const valorDocumentada = s.superficieDocumentadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0);
            const numDocumentada = parseFloat(valorDocumentada) || 0;
            sumDocumentada += numDocumentada;

            // Verificada
            const valorVerificada = s.superficieVerificadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0);
            const numVerificada = parseFloat(valorVerificada) || 0;
            sumVerificada += numVerificada;

            // Valor Total
            const valorTotal = s.valorTotal || 0;
            const numValorTotal = parseFloat(valorTotal) || 0;
            sumValorTotal += numValorTotal;

            console.log(`Superficie ${idx} (${s.descripcion}): Doc=${numDocumentada}, Ver=${numVerificada}, Total=${numValorTotal}`);
        });

        console.log(`Totales calculados para ${tipo}: Doc=${sumDocumentada}, Ver=${sumVerificada}, Total=${sumValorTotal}`);

        return {
            documentada: sumDocumentada.toString(),
            verificada: sumVerificada.toString(),
            valorTotal: sumValorTotal.toString()
        };
    };


    return (
        <div className="mt-4 p-3 border rounded bg-white">
            <h4 className="text-md font-medium text-center text-green-900">Planilla de Tasación</h4>

            <div className="mt-2 border">
                <div className="bg-gray-200 p-2 font-bold">Terreno</div>
                <div className="grid grid-cols-12 border-t">
                    <div className="col-span-4"></div>
                    <div className="col-span-4 text-center border-l border-r p-1 bg-gray-100">
                        Superficie Total (m²)
                    </div>
                    <div className="col-span-2 text-center border-r p-1 bg-gray-100">
                        U$S/m²
                    </div>
                    <div className="col-span-2 text-center p-1 bg-gray-100">
                        Total U$S
                    </div>
                </div>
                <div className="grid grid-cols-12 border-t">
                    <div className="col-span-4"></div>
                    <div className="col-span-4 text-center border-l border-r p-1">
                        <InputNumerico
                            value={superficieTerreno}
                            onChange={onSuperficieTerrenoChange}
                            className="w-full text-center"
                        />
                    </div>
                    <div className="col-span-2 text-center border-r p-1">
                        <InputNumerico
                            value={valorMetroTerreno}
                            onChange={onValorMetroTerrenoChange}
                            className="w-full text-center"
                        />
                    </div>
                    <div className="col-span-2 text-center p-1">
                        <InputNumerico
                            value={valorTerreno}
                            onChange={onValorTerrenoChange}
                            className="w-full text-center"
                        />
                    </div>
                </div>
            </div>

            {/* Sección Obra Civil */}
            <div className="mt-2 border">
                <div className="bg-gray-200 p-2 font-bold">Obra Civil</div>
                <div className="grid grid-cols-12">
                    <div className="col-span-2 p-1 font-bold"></div>
                    <div className="col-span-1 text-center border-l p-1 bg-gray-100">
                        Documentada (m²)
                    </div>
                    <div className="col-span-2 text-center border-l p-1 bg-gray-100">
                        Verificada (m²)
                    </div>
                    <div className="col-span-1 text-center border-l p-1 bg-gray-100">
                        Ponderación %
                    </div>
                    <div className="col-span-2 text-center border-l p-1 bg-gray-100">
                        Considerada (m²)
                    </div>
                    <div className="col-span-2 text-center border-l p-1 bg-gray-100">
                        U$S/m²
                    </div>
                    <div className="col-span-2 text-center border-l p-1 bg-gray-100">
                        Total U$S
                    </div>
                </div>



                {/* Superficie Cubierta - Filas dinámicas */}
                <div className="grid grid-cols-12 border-t">
                    <div className="col-span-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 p-1 font-bold">Sup. cubierta</div>

                        </div>

                        {/* Aquí van las filas de superficies cubiertas */}
                        {superficies
                            .filter(s => (s.tipoObraCivilBbva || "Superficie Cubierta") === "Superficie Cubierta")
                            .map((item, index) => (
                                <div key={index} className="grid grid-cols-12 border-t">
                                    <div className="col-span-2 p-1">
                                        <input
                                            type="text"
                                            value={item.descripcion || `Viv. ${index + 1}`}
                                            onChange={(e) => handleSuperficieFieldChange("Superficie Cubierta", index, 'descripcion', e.target.value)}
                                            className="w-full px-1 py-1 text-start rounded-sm"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || (item.m2 !== 'G' ? item.m2 : 0) || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Cubierta", index, 'superficieDocumentadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || (item.m2 !== 'G' ? item.m2 : 0) || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Cubierta", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        100%
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Cubierta", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.precioMetroCorregido || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Cubierta", index, 'precioMetroCorregido', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.valorTotal || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Cubierta", index, 'valorTotal', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                </div>
                            ))}

                        {/* Subtotal Sup. Cubierta */}
                        <div className="grid grid-cols-12 bg-gray-100 border-t">
                            <div className="col-span-2 p-1 text-start font-bold">
                                Subtotal
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalCubierta.documentada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalCubierta.verificada))}
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                100
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalCubierta.verificada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l">
                                {/* Vacío */}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalCubierta.valorTotal))}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Superficie Semi Cubierta */}
                <div className="grid grid-cols-12 border-t">
                    <div className="col-span-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 p-1 font-bold">Sup. semicubierta</div>
                        </div>

                        {/* Aquí van las filas de superficies semicubiertas */}
                        {superficies
                            .filter(s => s.tipoObraCivilBbva === "Superficie Semi Cubierta")
                            .map((item, index) => (
                                <div key={index} className="grid grid-cols-12 border-t">
                                    <div className="col-span-2 p-1">
                                        <input
                                            type="text"
                                            value={item.descripcion || `Alero ${index + 1}`}
                                            onChange={(e) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'descripcion', e.target.value)}
                                            className="w-full px-1 py-1 text-start rounded-sm"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || (item.m2 !== 'G' ? item.m2 : 0) || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'superficieDocumentadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || (item.m2 !== 'G' ? item.m2 : 0) || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        100%
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || (item.m2 !== 'G' ? item.m2 : 0) || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.precioMetroCorregido || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'precioMetroCorregido', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.valorTotal || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Superficie Semi Cubierta", index, 'valorTotal', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                </div>
                            ))}

                        {/* Subtotal ya está bien estructurado */}
                        <div className="grid grid-cols-12 bg-gray-100 border-t">
                            <div className="col-span-2 p-1 text-start font-bold">
                                Subtotal
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalSemiCubierta.documentada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalSemiCubierta.verificada))}
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                100
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalSemiCubierta.verificada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l">
                                {/* Vacío */}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalSemiCubierta.valorTotal))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Otros */}
                {/*  <div className="grid grid-cols-12 border-t">
                    <div className="col-span-2 p-1 font-bold">Otros</div>
                    <div className="col-span-10">
                        {superficies
                            .filter(s => s.tipoObraCivilBbva === "Otros")
                            .map((item, index) => ( */}


                <div className="grid grid-cols-12 border-t">
                    <div className="col-span-12">
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 p-1 font-bold">Otros</div>
                        </div>

                        {/* Aquí van las filas de superficies Otros */}
                        {superficies
                            .filter(s => s.tipoObraCivilBbva === "Otros")
                            .map((item, index) => (
                                <div key={index} className="grid grid-cols-12 border-t">
                                    <div className="col-span-2 p-1">
                                        <input
                                            type="text"
                                            value={item.descripcion || `Otro ${index + 1}`}
                                            onChange={(e) => handleSuperficieFieldChange("Otros", index, 'descripcion', e.target.value)}
                                            className="w-full px-1 py-1 text-start rounded-sm"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Otros", index, 'superficieDocumentadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Otros", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-1 p-1 text-center border-l">
                                        100%
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Otros", index, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.precioMetroCorregido || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Otros", index, 'precioMetroCorregido', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                    <div className="col-span-2 p-1 text-center border-l">
                                        <InputNumerico
                                            value={item.valorTotal || 0}
                                            onChange={(valor) => handleSuperficieFieldChange("Otros", index, 'valorTotal', valor)}
                                            className="w-full text-center"
                                        />
                                    </div>
                                </div>
                            ))}

                        {/* Subtotal ya está bien estructurado */}
                        <div className="grid grid-cols-12 bg-gray-100 border-t">
                            <div className="col-span-2 p-1 text-start font-bold">
                                Subtotal
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalOtros.documentada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalOtros.verificada))}
                            </div>
                            <div className="col-span-1 p-1 text-center border-l font-bold">
                                100
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalOtros.verificada))}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l">
                                {/* Vacío */}
                            </div>
                            <div className="col-span-2 p-1 text-center border-l font-bold">
                                {formatearNumero(parseFloat(totalOtros.valorTotal))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total General */}
                {/* Total General */}
                <div className="grid grid-cols-12 border-t bg-gray-200">
                    <div className="col-span-2 p-1 font-bold">Total</div>
                    <div className="col-span-1 p-1 text-center border-l font-bold">
                        <InputNumerico
                            value={totalGeneral.documentada}
                            onChange={(valor) => {
                                setTotalGeneral({ ...totalGeneral, documentada: valor });
                            }}
                            className="w-full text-center bg-gray-200 font-bold"
                        />
                    </div>
                    <div className="col-span-2 p-1 text-center border-l font-bold">
                        <InputNumerico
                            value={totalGeneral.verificada}
                            onChange={(valor) => {
                                setTotalGeneral({ ...totalGeneral, verificada: valor });
                            }}
                            className="w-full text-center bg-gray-200 font-bold"
                        />
                    </div>
                    <div className="col-span-1 p-1 text-center border-l font-bold">
                        100
                    </div>
                    <div className="col-span-2 p-1 text-center border-l font-bold">
                        <InputNumerico
                            value={totalGeneral.verificada}
                            onChange={(valor) => {
                                setTotalGeneral({ ...totalGeneral, verificada: valor });
                            }}
                            className="w-full text-center bg-gray-200 font-bold"
                        />
                    </div>
                    <div className="col-span-2 p-1 text-center border-l font-bold">
                        <InputNumerico
                            value={superficieObraCivil && valorObraCivil ? formatearNumero(valorObraCivil / superficieObraCivil) : 0}
                            onChange={(valor) => {
                                if (superficieObraCivil > 0) {
                                    onValorObraCivilChange(valor * superficieObraCivil);
                                }
                            }}
                            className="w-full text-center bg-gray-200 font-bold"
                        />
                    </div>
                    <div className="col-span-2 p-1 text-center border-l font-bold">
                        <InputNumerico
                            value={totalGeneral.valorTotal}
                            onChange={(valor) => {
                                setTotalGeneral({ ...totalGeneral, valorTotal: valor });
                                // También podríamos actualizar el valor de obra civil directamente
                                if (typeof onValorObraCivilChange === 'function') {
                                    onValorObraCivilChange(valor);
                                }
                            }}
                            className="w-full text-center bg-gray-200 font-bold"
                        />
                    </div>
                </div>
            </div>

            {/* Resultados Tasación */}
            <div className="mt-4 border bg-gray-200 p-2 text-center font-bold">
                Resultados Tasación
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Superficie Terreno (m²)
                </div>
                <div className="col-span-8 p-2 border-l">
                    <InputNumerico
                        value={superficieTerreno}
                        onChange={onSuperficieTerrenoChange}
                        className="w-full text-start"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Superficie Considerada Obra Civil (m²)
                </div>
                <div className="col-span-8 p-2 border-l">
                    <InputNumerico
                        value={superficieObraCivil}
                        onChange={(valor) => {
                            // Necesitarás añadir una función para manejar este cambio
                            if (typeof onSuperficieObraCivilChange === 'function') {
                                onSuperficieObraCivilChange(valor);
                            }
                        }}
                        className="w-full text-start"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor de Terreno
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorMetroTerreno}
                        onChange={(valor) => {
                            onValorMetroTerrenoChange(valor);
                            // Para que se actualice el total, multiplicamos por la superficie
                            onValorTerrenoChange(valor * superficieTerreno);
                        }}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S Total</div>
                    <InputNumerico
                        value={valorTerreno}
                        onChange={(valor) => {
                            onValorTerrenoChange(valor);
                            // Para que se actualice el valor por m², dividimos por la superficie
                            if (superficieTerreno > 0) {
                                onValorMetroTerrenoChange(valor / superficieTerreno);
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor de Obra Civil
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorObraCivilM2}
                        onChange={(valor) => {
                            // Suponemos que necesitas una función para manejar este cambio
                            // Si no existe, puedes implementarla
                            if (superficieObraCivil > 0) {
                                const nuevoValorTotal = valor * superficieObraCivil;
                                // Actualizar el valor total de obra civil
                                // Esta función tendría que implementarse en el componente padre
                                if (typeof onValorObraCivilChange === 'function') {
                                    onValorObraCivilChange(nuevoValorTotal);
                                }
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">Total U$S</div>
                    <InputNumerico
                        value={valorObraCivil}
                        onChange={(valor) => {
                            // Actualizar el valor de obra civil
                            if (typeof onValorObraCivilChange === 'function') {
                                onValorObraCivilChange(valor);

                                // Actualizar el valor por m²
                                if (superficieObraCivil > 0) {
                                    // Esto supondría una función para actualizar el valor por m²
                                    // Si no existe, deberías implementarla
                                    if (typeof onValorObraCivilM2Change === 'function') {
                                        onValorObraCivilM2Change(valor / superficieObraCivil);
                                    }
                                }
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor Intrínseco
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorIntrinseco && superficieObraCivil ? formatearNumero(valorIntrinseco / superficieObraCivil) : 0}
                        onChange={(valor) => {
                            if (superficieObraCivil > 0) {
                                // Actualizar el valor intrínseco total
                                if (typeof onValorIntrinsecoChange === 'function') {
                                    onValorIntrinsecoChange(valor * superficieObraCivil);
                                }
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">Total U$S</div>
                    <InputNumerico
                        value={valorIntrinseco}
                        onChange={(valor) => {
                            // Actualizar el valor intrínseco
                            if (typeof onValorIntrinsecoChange === 'function') {
                                onValorIntrinsecoChange(valor);
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor de Mercado
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorMercadoM2}
                        onChange={(valor) => onValorMercadoChange(valor * superficieObraCivil)}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">Total U$S</div>
                    <InputNumerico
                        value={valorMercado}
                        onChange={onValorMercadoChange}
                        className="w-full text-center"
                    />
                </div>
            </div>

            {/* Valor de Realización Inmediata - CONVERTIDO A EDITABLE */}
            {/* <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor de Realización Inmediata
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorVentaRapida && superficieObraCivil ? formatearNumero(valorVentaRapida / superficieObraCivil) : 0}
                        onChange={(valor) => {
                            if (superficieObraCivil > 0) {
                                // Actualizar el valor total multiplicando por la superficie
                                onValorVentaRapidaChange(valor * superficieObraCivil);
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">Total U$S</div>
                    <InputNumerico
                        value={valorVentaRapida}
                        onChange={(valor) => {
                            onValorVentaRapidaChange(valor);
                        }}
                        className="w-full text-center"
                    />
                </div>
            </div> */}

            {/* Valor de Remate - CONVERTIDO A EDITABLE */}
            <div className="grid grid-cols-12 border border-t-0">
                <div className="col-span-4 p-2 text-right">
                    Valor de Remate
                </div>
                <div className="col-span-3 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">U$S/m²</div>
                    <InputNumerico
                        value={valorRemate && superficieObraCivil ? formatearNumero(valorRemate / superficieObraCivil) : 0}
                        onChange={(valor) => {
                            if (superficieObraCivil > 0) {
                                // Actualizar el valor total multiplicando por la superficie
                                onValorRemateChange(valor * superficieObraCivil);
                            }
                        }}
                        className="w-full text-center"
                    />
                </div>
                <div className="col-span-5 p-2 border-l text-center">
                    <div className="mb-1 text-sm font-bold bg-gray-100 py-1">Total U$S</div>
                    <InputNumerico
                        value={valorRemate}
                        onChange={(valor) => {
                            onValorRemateChange(valor);
                        }}
                        className="w-full text-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default TotalesBbva;