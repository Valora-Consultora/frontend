import React from 'react';
import InputNumerico from './inputNumerico';
import { calcularValorUI } from '../calculo/CalculoUtils';

const TotalesItau = ({
    valorMercado,
    valorVentaRapida,
    valorRemate,
    valorMercadoMetroCuadrado,
    valorVentaRapidaMetroCuadrado,
    valorRemateMetroCuadrado,
    dolarCotizacion,
    valorUI,
    onDolarCotizacionChange,
    onValorUIChange,
    onValorMercadoChange,
    onValorVentaRapidaChange,
    onValorRemateChange,
    onValorMercadoMetroCuadradoChange,
    onValorVentaRapidaMetroCuadradoChange,
    onValorRemateMetroCuadradoChange,
    formatearNumero
}) => {
    // Calcular valores en UI por defecto si no son proporcionados
    const calcularValorMercadoUI = () => valorMercado && valorUI ? formatearNumero(valorMercado / valorUI) : 0;
    const calcularValorRemateUI = () => valorRemate && valorUI ? formatearNumero(valorRemate / valorUI) : 0;

    // Calcular valores en UI
    const valorMercadoUICalculado = calcularValorUI(valorMercado, dolarCotizacion, valorUI);
    const valorRemateUICalculado = calcularValorUI(valorRemate, dolarCotizacion, valorUI);


    // Estados para valores UI editables
    const [valorMercadoUIEditable, setValorMercadoUIEditable] = React.useState(valorMercadoUICalculado);
    const [valorRemateUIEditable, setValorRemateUIEditable] = React.useState(valorRemateUICalculado);

    // Actualizar valores UI cuando cambian valores base o cotización
    React.useEffect(() => {
        setValorMercadoUIEditable(valorMercadoUICalculado);
        setValorRemateUIEditable(valorRemateUICalculado);
    }, [valorMercado, valorRemate, dolarCotizacion, valorUI]);


    return (
        <div className="mt-4 p-3 border rounded bg-white">
            <h4 className="text-md font-medium text-green-900">Conclusiones:</h4>

            {/* Tabla de valores al estilo Itaú */}
            <table className="w-full border-collapse mt-2">
                <tbody>
                    {/* Valor de Mercado */}
                    <tr className="">
                        <td className="border px-4 py-2 " width="35%">Valor de Mercado:</td>
                        <td className="border px-4 py-2" width="25%">
                            <div className="flex items-center">
                                <span className="mr-2">U$S por m²</span>
                                <InputNumerico
                                    value={valorMercadoMetroCuadrado}
                                    onChange={onValorMercadoMetroCuadradoChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                        <td className="border px-4 py-2" width="40%">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">Valor Total en U$S</span>
                                <InputNumerico
                                    value={valorMercado}
                                    onChange={onValorMercadoChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                    </tr>

                    {/* Valor de Realización Inmediata (QSV) */}
                    <tr>
                        <td className="border px-4 py-2 ">QSV:</td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center">
                                <span className="mr-2">U$S por m²</span>
                                <InputNumerico
                                    value={valorVentaRapidaMetroCuadrado}
                                    onChange={onValorVentaRapidaMetroCuadradoChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">Valor Total en U$S</span>
                                <InputNumerico
                                    value={valorVentaRapida}
                                    onChange={onValorVentaRapidaChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                    </tr>

                    {/* Valor de Remate */}
                    <tr className="">
                        <td className="border px-4 py-2 ">Valor de Remate:</td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center">
                                <span className="mr-2">U$S por m²</span>
                                <InputNumerico
                                    value={valorRemateMetroCuadrado}
                                    onChange={onValorRemateMetroCuadradoChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">Valor Total en U$S</span>
                                <InputNumerico
                                    value={valorRemate}
                                    onChange={onValorRemateChange}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Cotización para conversión a UI */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <span className="mr-2 ">Dólar al día anterior fecha</span>
                    <InputNumerico
                        value={dolarCotizacion}
                        onChange={onDolarCotizacionChange}
                        className="px-2 py-1 border rounded-md w-28"
                    />
                </div>
                <div className="flex items-center">
                    <span className="mr-2 ">Valor de la ui a la fecha</span>
                    <InputNumerico
                        value={valorUI}
                        onChange={onValorUIChange}
                        className="px-2 py-1 border rounded-md w-28"
                    />
                </div>
            </div>

            {/* Valores en UI */}
            <table className="w-full border-collapse mt-4">
                <tbody>
                    {/* Valor de Mercado en UI */}
                    <tr className="">
                        <td className="border px-4 py-2 " width="65%">Valor de Mercado:</td>
                        <td className="border px-4 py-2" width="35%">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">Valor Total en UI</span>
                                <InputNumerico
                                    value={valorMercadoUIEditable}
                                    onChange={setValorMercadoUIEditable}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                    </tr>

                    {/* Valor de Remate en UI */}
                    <tr>
                        <td className="border px-4 py-2 ">Valor de Remate:</td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">Valor Total en UI</span>
                                <InputNumerico
                                    value={valorRemateUIEditable}
                                    onChange={setValorRemateUIEditable}
                                    className="w-28 text-center px-2 py-1 border rounded-md"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TotalesItau;