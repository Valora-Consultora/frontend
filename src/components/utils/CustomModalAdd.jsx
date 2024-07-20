import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import LocalService from "../../api/LocalService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, idInspeccion, initialFormData }) => {

    const [formData, setFormData] = useState({
        estructuraHarmado: false,
        estructuraMuroPort: false,
        estructuraMixta: false,
        estructuraMetalicos: false,
        estructuraOtros: false,
        estructuraAno: 0,
        cubiertaHarmado: false,
        cubiertaLiviana: false,
        cubiertaCcielorraso: false,
        cubiertaBovedilla: false,
        cubiertaTejas: false,
        cubiertaPorteria: false,
        cubiertaIsopanel: false,
        pisosParquet: false,
        pisosTabla: false,
        pisosMonolitico: false,
        pisosCalcareas: false,
        pisosCeramico: false,
        pisosPortland: false,
        pisosMoquette: false,
        revestimientosAzulBcoB: false,
        revestimientosAzulBcoC: false,
        revestimientosAzulColorB: false,
        revestimientosAzulColorC: false,
        revestimientosCeramicaB: false,
        revestimientosCeramicaC: false,
        revestimientosPorcelanatoB: false,
        revestimientosPorcelanatoC: false,
        revestimientosEstucoB: false,
        revestimientosEstucoC: false,
        revestimientosOtrosB: false,
        revestimientosOtrosC: false,
        revoqueTerminacion: false,
        enduidoTerminacion: false,
        calTerminacion: false,
        pintAguaTerminacion: false,
        pintAceiteTerminacion: false,
        empapeladoTerminacion: false,
        lambrizTerminacion: false,
        ...initialFormData // Inicializa con initialFormData si está disponible
    });


    useEffect(() => {
        if (isOpen) {
            setFormData({
                estructuraHarmado: false,
                estructuraMuroPort: false,
                estructuraMixta: false,
                estructuraMetalicos: false,
                estructuraOtros: false,
                estructuraAno: 0,
                cubiertaHarmado: false,
                cubiertaLiviana: false,
                cubiertaCcielorraso: false,
                cubiertaBovedilla: false,
                cubiertaTejas: false,
                cubiertaPorteria: false,
                cubiertaIsopanel: false,
                pisosParquet: false,
                pisosTabla: false,
                pisosMonolitico: false,
                pisosCalcareas: false,
                pisosCeramico: false,
                pisosPortland: false,
                pisosMoquette: false,
                revestimientosAzulBcoB: false,
                revestimientosAzulBcoC: false,
                revestimientosAzulColorB: false,
                revestimientosAzulColorC: false,
                revestimientosCeramicaB: false,
                revestimientosCeramicaC: false,
                revestimientosPorcelanatoB: false,
                revestimientosPorcelanatoC: false,
                revestimientosEstucoB: false,
                revestimientosEstucoC: false,
                revestimientosOtrosB: false,
                revestimientosOtrosC: false,
                revoqueTerminacion: false,
                enduidoTerminacion: false,
                calTerminacion: false,
                pintAguaTerminacion: false,
                pintAceiteTerminacion: false,
                empapeladoTerminacion: false,
                lambrizTerminacion: false,
                ...initialFormData // Reinicia el formulario con initialFormData si está disponible
            });
        }
    }, [isOpen, initialFormData]);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

/*     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const localData = {
                ...formData,
                inspeccion: { id: idInspeccion }
            };
            let response;
            if (formData.id) {
                response = await LocalService.updateLocal(formData.id, localData);
            } else {
                response = await LocalService.createLocal(localData);
            }
            onRequestClose(); // Cierra el modal y actualiza los locales
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    }; */

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const localData = {
                ...formData,
                inspeccion: { id: idInspeccion }
            };
            const response = await LocalService.createLocal(localData);
            onRequestClose(); // Cierra el modal y actualiza los locales
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Agregar Local"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-full mx-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="col-span-12 border p-3 rounded space-y-4">
                        <h4 className="text-xl text-green-900">Local</h4>
                        <div className="columns-6 gap-4">
                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Estructura</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraHarmado"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        H. Armado:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="estructuraHarmado"
                                        name="estructuraHarmado"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraMuroPort"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Muro.Port:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="estructuraMuroPort"
                                        name="estructuraMuroPort"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraMixta"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Mixta:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="estructuraMixta"
                                        name="estructuraMixta"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraMetalicos"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Metálica:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="estructuraMetalicos"
                                        name="estructuraMetalicos"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraOtros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Otros:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="estructuraOtros"
                                        name="estructuraOtros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="estructuraAno"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-7"
                                    >
                                        Año:
                                    </label>
                                    <input
                                        type="number"
                                        id="estructuraAno"
                                        name="estructuraAno"
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded text-sm h-5 text-start py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-16"
                                    />
                                </div>
                            </div>



                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Cubierta</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaHarmado"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        H.Armado:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaHarmado"
                                        name="cubiertaHarmado"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaLiviana"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Liviana:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaLiviana"
                                        name="cubiertaLiviana"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaCcielorraso"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        C/cielorraso:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaCcielorraso"
                                        name="cubiertaCcielorraso"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaBovedilla"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Bovedilla:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaBovedilla"
                                        name="cubiertaBovedilla"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaTejas"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Tejas:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaTejas"
                                        name="cubiertaTejas"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaPorteria"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Porteña:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaPorteria"
                                        name="cubiertaPorteria"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="cubiertaIsopanel"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Isopanel:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="cubiertaIsopanel"
                                        name="cubiertaIsopanel"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                            </div>


                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Muros</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="ceramicosMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Cerámicos:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="ceramicosMuros"
                                        name="ceramicosMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="bloquesMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Bloques:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="bloquesMuros"
                                        name="bloquesMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="maderaMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Madera:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="maderaMuros"
                                        name="maderaMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="piedraMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Piedra:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="piedraMuros"
                                        name="piedraMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="chapaMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Chapa:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="chapaMuros"
                                        name="chapaMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="yesoMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Yeso:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="yesoMuros"
                                        name="yesoMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="isopanelMuros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Isopanel:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="isopanelMuros"
                                        name="isopanelMuros"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                            </div>



                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Pisos</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosParquet"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Parquet:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosParquet"
                                        name="pisosParquet"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosTabla"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Tabla:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosTabla"
                                        name="pisosTabla"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosMonolitico"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Monolítico:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosMonolitico"
                                        name="pisosMonolitico"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosCalcareas"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Calcáreas:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosCalcareas"
                                        name="pisosCalcareas"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosCeramico"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Cerámico:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosCeramico"
                                        name="pisosCeramico"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosPortland"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Portland:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosPortland"
                                        name="pisosPortland"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pisosMoquette"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Moquette:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pisosMoquette"
                                        name="pisosMoquette"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                            </div>







                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Revestimientos</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="B"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        B
                                    </label>
                                    <label
                                        htmlFor="C"
                                        className="text-sm text-gray-700 font-bold pl-2"
                                    >
                                        C
                                    </label>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosAzulBco"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Azul. Bco:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosAzulBcoB"
                                        name="revestimientosAzulBcoB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosAzulBcoC"
                                        name="revestimientosAzulBcoC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosAzulColor"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Azul.Color:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosAzulColorB"
                                        name="revestimientosAzulColorB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosAzulColorC"
                                        name="revestimientosAzulColorC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosCeramica"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Cerámica:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosCeramicaB"
                                        name="revestimientosCeramicaB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosCeramicaC"
                                        name="revestimientosCeramicaC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosPorcelanato"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Porcelanato:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosPorcelanatoB"
                                        name="revestimientosPorcelanatoB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosPorcelanatoC"
                                        name="revestimientosPorcelanatoC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosEstuco"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Estuco:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosEstucoB"
                                        name="revestimientosEstucoB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosEstucoC"
                                        name="revestimientosEstucoC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revestimientosOtros"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                    >
                                        Otros:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revestimientosOtrosB"
                                        name="revestimientosOtrosB"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                    <input
                                        type="checkbox"
                                        id="revestimientosOtrosC"
                                        name="revestimientosOtrosC"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                            </div>



                            <div className="break-inside-avoid bg-white p-1 rounded-md">
                                <h6 className="text-lg text-green-900">Terminación</h6>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="revoqueTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Revoque:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="revoqueTerminacion"
                                        name="revoqueTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="enduidoTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Enduido:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="enduidoTerminacion"
                                        name="enduidoTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="calTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Cal:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="calTerminacion"
                                        name="calTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pintAguaTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Pint. Agua:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pintAguaTerminacion"
                                        name="pintAguaTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="pintAceiteTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Pint. Aceite:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="pintAceiteTerminacion"
                                        name="pintAceiteTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="empapeladoTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Empapelado:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="empapeladoTerminacion"
                                        name="empapeladoTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <label
                                        htmlFor="lambrizTerminacion"
                                        className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                    >
                                        Lambriz:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="lambrizTerminacion"
                                        name="lambrizTerminacion"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-900 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Agregar
                        </button>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default CustomModal;
