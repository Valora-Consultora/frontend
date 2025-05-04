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

        // Primero encontrar todas las superficies del tipo indicado
        const superficiesFiltradas = superficies.filter(s =>
            (s.tipoObraCivilBbva || "Superficie Cubierta") === tipoObraCivil);

        // Validar índice
        if (index >= 0 && index < superficiesFiltradas.length) {
            const superficie = superficiesFiltradas[index];
            const indiceGlobal = superficies.findIndex(s => s === superficie);

            if (indiceGlobal >= 0) {
                // Actualizar directamente sin setTimeout
                onUpdateSuperficie(indiceGlobal, campo, valor);
                // El recálculo de totales se manejará en el efecto que depende de superficies
            }
        }
    };

    React.useEffect(() => {
        recalcularTotales();
    }, [superficies, onUpdateSuperficie]);

    const calcularTotalesPorTipo = (tipo) => {
        const superficiesFiltradas = superficies.filter(s => {
            const tipoSuperficie = s.tipoObraCivilBbva === undefined ?
                "Superficie Cubierta" : s.tipoObraCivilBbva;
            return tipoSuperficie === tipo;
        });

        // Calcular las sumas con un solo reduce para mayor claridad
        const totales = superficiesFiltradas.reduce((acum, s) => {
            const docValue = parseFloat(s.superficieDocumentadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0) || 0);
            const verValue = parseFloat(s.superficieVerificadaObraCivilSeccionEDescripcionInmueble ||
                (s.m2 !== 'G' ? s.m2 : 0) || 0);
            const totalValue = parseFloat(s.valorTotal || 0);

            return {
                documentada: acum.documentada + docValue,
                verificada: acum.verificada + verValue,
                valorTotal: acum.valorTotal + totalValue
            };
        }, { documentada: 0, verificada: 0, valorTotal: 0 });

        // Convertir números a strings formateados
        return {
            documentada: totales.documentada.toString(),
            verificada: totales.verificada.toString(),
            valorTotal: totales.valorTotal.toString()
        };
    };

    const recalcularTotales = () => {
        // Hacer un solo recorrido de las superficies para calcular todos los totales
        const totales = {
            cubierta: { documentada: 0, verificada: 0, valorTotal: 0 },
            semiCubierta: { documentada: 0, verificada: 0, valorTotal: 0 },
            otros: { documentada: 0, verificada: 0, valorTotal: 0 },
        };
        
        // Acumular totales en una sola pasada
        superficies.forEach(s => {
            const tipo = s.tipoObraCivilBbva || "Superficie Cubierta";
            const categoria = tipo === "Superficie Cubierta" ? "cubierta" : 
                              tipo === "Superficie Semi Cubierta" ? "semiCubierta" : "otros";
            
            const docValue = parseFloat(s.superficieDocumentadaObraCivilSeccionEDescripcionInmueble || 
                                 (s.m2 !== 'G' ? s.m2 : 0) || 0);
            const verValue = parseFloat(s.superficieVerificadaObraCivilSeccionEDescripcionInmueble || 
                                 (s.m2 !== 'G' ? s.m2 : 0) || 0);
            const totalValue = parseFloat(s.valorTotal || 0);
            
            totales[categoria].documentada += docValue;
            totales[categoria].verificada += verValue;
            totales[categoria].valorTotal += totalValue;
        });
        
        // Actualizar estados con formato adecuado
        setTotalCubierta({
            documentada: totales.cubierta.documentada.toString(),
            verificada: totales.cubierta.verificada.toString(),
            valorTotal: totales.cubierta.valorTotal.toString()
        });
        
        setTotalSemiCubierta({
            documentada: totales.semiCubierta.documentada.toString(),
            verificada: totales.semiCubierta.verificada.toString(),
            valorTotal: totales.semiCubierta.valorTotal.toString()
        });
        
        setTotalOtros({
            documentada: totales.otros.documentada.toString(),
            verificada: totales.otros.verificada.toString(),
            valorTotal: totales.otros.valorTotal.toString()
        });
        
        // Calcular el total general
        const totalGeneral = {
            documentada: (totales.cubierta.documentada + 
                          totales.semiCubierta.documentada + 
                          totales.otros.documentada).toString(),
            verificada: (totales.cubierta.verificada + 
                         totales.semiCubierta.verificada + 
                         totales.otros.verificada).toString(),
            valorTotal: (totales.cubierta.valorTotal + 
                         totales.semiCubierta.valorTotal + 
                         totales.otros.valorTotal).toString()
        };
        
        setTotalGeneral(totalGeneral);
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