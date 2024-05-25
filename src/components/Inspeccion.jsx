import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from "@material-tailwind/react";



function Inspeccion() {


    const myInputRef = useRef(null);

    useEffect(() => {
        if (myInputRef.current) {
            myInputRef.current.focus();
        }
    }, []);

    const [inspeccion, setInspeccion] = useState({
        fechaCreacion: '',
        tasadorId: '',
        solicitante: '',
        ordenId: '',
        bancoId: '',
        departamentoId: '',
        calle: '',
        entreCalles: '',
        localidad: '',
        nroPuerta: '',
        unidad: '',
        seccionalJudicial: '',
        piso: '',
        esquina: '',
        padron: '',
        garage: false,
        clasificacion: '',
        caractResidencial: false,
        caractComercial: false,
        caractIndustrial: false,
        caractOtros: false,
        edificacion: '',
        densidad: '',
        pavimento: '',
        ose: false,
        pozo: false,
        colector: false,
        ute: false,
        antel: false,
        carpinteriaComun: false,
        carpinteriaAluminio: false,
        carpinteriapvc: false,
        carpinteriaMadera: false,
        carpinteriaOtros: false,
        cerramientosCortinas: false,
        cerramientosPostigos: false,
        cerramientosCelosias: false,
        cerramientosRejas: false,
        cerramientosOtros: false,
        instalacionesAguaBanoCaliente: false,
        instalacionesAguaBanoFria: false,
        instalacionesAguaCocinaFria: false,
        instalacionesAguaCocinaCaliente: false,
        instalacionesElectricidadEmbutida: false,
        instalacionesElectricidadExterior: false,
        instalacionesElectricidadMixta: false,
        instalacionesElectricidadInstGas: false,
        instalacionesSanitariaColector: false,
        instalacionesSanitariaCamSeptica: false,
        instalacionesSanitariaPozoNegro: false,
        instalacionesTermicasLosaRad: false,
        instalacionesTermicasRadiadores: false,
        instalacionesTermicasPanelElect: false,
        instalacionesTermicasAireAcond: false,
        instalacionesTermicasOtros: false,
        categoriaModesta: false,
        categoriaEconomica: false,
        categoriaBuena: false,
        categoriaConfortable: false,
        categoriaMuyConfortable: false,
        conservacionMalo: false,
        conservacionRegular: false,
        conservacionBueno: false,
        conservacionMuyBueno: false,
        conservacionNuevo: false,
        ocupacionActual: '',
        ocupacionEdad: '',
        tipo: '',
        edificioCantidadPisos: '',
        edificioAptoPisos: '',
        edificioAscensores: false,
        edificioPorteroElectrico: false,
        propiedadComunM2: '',
        superficieCubierta: '',
        superficieSemiCubierta: '',
        propiedadHorizontalM2: '',
        bienesPropios: '',
        bienesComunes: '',
        observaciones: '',
    });


    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setInspeccion({ ...inspeccion, [name]: inputValue });
    };

    // Manejador para enviar el formulario
    const submitHandler = async (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario al backend para guardar la inspección
        console.log('Formulario enviado:', inspeccion);
    };



    return (

        <>


            <div className="bg-gray-100">
                <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
                    CREAR INSPECCIÓN
                </h2>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 space-y-4 border p-3 rounded">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <label
                                        htmlFor="avalador"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Avaluador:
                                    </label>
                                    <input
                                        type="text"
                                        id="avaluador"
                                        name="avaluador"
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />
                                    <label
                                        htmlFor="fechaAvalador"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Fecha:
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaAvalador"
                                        name="fechaAvalador"
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-center"
                                    />
                                    <label
                                        htmlFor="banco"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Banco:
                                    </label>
                                    <select
                                        id="banco"
                                        name="banco"
                                        //value={selectedBancoId}
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                    >
                                        <option value="">Banco</option>
                                    </select>

                                    <label
                                        htmlFor="solicitante"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Solicitante:
                                    </label>
                                    <input
                                        type="text"
                                        id="solicitante"
                                        name="solicitante"
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                </div>

                            </div>
                            <div className="col-span-12 space-y-4 border p-3 rounded">
                                <h4 className="text-xl text-green-900">Ubicación</h4>
                                <div className="grid grid-cols-12 gap-4 items-center">

                                    <label
                                        htmlFor="departamento"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Depto:
                                    </label>
                                    <select
                                        id="departamento"
                                        name="departamento"
                                        //value={selectedBancoId}
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                    >
                                        <option value="">Departamento</option>
                                    </select>

                                    <label
                                        htmlFor="localidad"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Localidad:
                                    </label>
                                    <input
                                        type="text"
                                        id="localidad"
                                        name="localidad"
                                        onChange={handleInputChange}
                                        className="col-span-3 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="secJudicial"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Sec. Jud.:
                                    </label>
                                    <input
                                        type="text"
                                        id="secJudicial"
                                        name="secJudicial"
                                        onChange={handleInputChange}
                                        className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="padron"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Padron:
                                    </label>
                                    <input
                                        type="number"
                                        id="padron"
                                        name="padron"
                                        onChange={handleInputChange}
                                        className="col-span-1 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />
                                    <label
                                        htmlFor="calle"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Calle:
                                    </label>
                                    <input
                                        type="text"
                                        id="calle"
                                        name="calle"
                                        onChange={handleInputChange}
                                        className="col-span-3 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />
                                    <label
                                        htmlFor="nro"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Nro:
                                    </label>
                                    <input
                                        type="number"
                                        id="nro"
                                        name="nro"
                                        onChange={handleInputChange}
                                        className="col-span-1 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="unidad"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Unidad:
                                    </label>
                                    <input
                                        type="number"
                                        id="unidad"
                                        name="unidad"
                                        onChange={handleInputChange}
                                        className="col-span-1 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="piso"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Piso:
                                    </label>
                                    <input
                                        type="number"
                                        id="piso"
                                        name="piso"
                                        onChange={handleInputChange}
                                        className="col-span-1 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="piso"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Piso:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="piso"
                                        name="piso"
                                        onChange={handleInputChange}
                                        className="form-checkbox h-4 w-4 text-green-900 col-span-1 mt-1"
                                    />

                                    <label
                                        htmlFor="entreCalles"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Entre calles:
                                    </label>
                                    <input
                                        type="text"
                                        id="entreCalles"
                                        name="entreCalles"
                                        onChange={handleInputChange}
                                        className="col-span-4 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                    <label
                                        htmlFor="esquina"
                                        className="col-span-1 text-sm text-gray-700 font-bold"
                                    >
                                        Esquina:
                                    </label>
                                    <input
                                        type="text"
                                        id="esquina"
                                        name="esquina"
                                        onChange={handleInputChange}
                                        className="col-span-4 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-start"
                                    />

                                </div>
                            </div>

                            <div className="col-span-12 border p-3 rounded space-y-4">
                                <h4 className="text-xl text-green-900">Zona</h4>
                                <div className="columns-6 gap-4">
                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Clasificación</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="urbanoZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Urbano:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="urbanoZona"
                                                name="urbanoZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="suburbanoZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Suburbano:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="suburbanoZona"
                                                name="suburbanoZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="ruralZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Rural:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="ruralZona"
                                                name="ruralZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="balnearioZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Balneario:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="balnearioZona"
                                                name="balnearioZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Caracteristicas</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="residencialZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Residencial:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="residencialZona"
                                                name="residencialZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="comercialZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Comercial:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="comercialZona"
                                                name="comercialZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="industrialZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Industrial:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="industrialZona"
                                                name="industrialZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="otrosZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Otros:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="otrosZona"
                                                name="otrosZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Edificación</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="suntuosaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Suntuosa:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="suntuosaZona"
                                                name="suntuosaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="muyBuenaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Muy Buena:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="muyBuenaZona"
                                                name="muyBuenaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="buenaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Buena:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="buenaZona"
                                                name="buenaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="economicaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Económica:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="economicaZona"
                                                name="economicaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="modestaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Modesta:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="modestaZona"
                                                name="modestaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Densidad</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="compactaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Compacta:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="compactaZona"
                                                name="compactaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="mediaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Media:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="mediaZona"
                                                name="mediaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="pocoDensaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Poco Densa:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="pocoDensaZona"
                                                name="pocoDensaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="ralaZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Rala:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="ralaZona"
                                                name="ralaZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>



                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Pavimento</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="hormBituZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Horm./Bitu.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="hormBituZona"
                                                name="hormBituZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="balastroZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Balastro:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="balastroZona"
                                                name="balastroZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>


                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Servicios</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="oseZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                OSE:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="oseZona"
                                                name="oseZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="pozoZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Pozo:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="pozoZona"
                                                name="pozoZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="colectorZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Colector:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="colectorZona"
                                                name="colectorZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="uteZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                UTE:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="uteZona"
                                                name="uteZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="antelZona"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Antel:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="antelZona"
                                                name="antelZona"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 border p-3 rounded space-y-4">
                                <h4 className="text-xl text-green-900">Predio</h4>
                                <div className="columns-6 gap-4">
                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Topografia</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="altoPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Alto:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="altoPredio"
                                                name="altoPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="aNivelPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                A Nivel:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="aNivelPredio"
                                                name="aNivelPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="bajoPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Bajo:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="bajoPredio"
                                                name="bajoPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Forma</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="irregularPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Irregular:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="irregularPredio"
                                                name="irregularPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="regularPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Regular:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="regularPredio"
                                                name="regularPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Ensanche</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="siPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Si:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="siPredio"
                                                name="siPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="noPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                No:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="noPredio"
                                                name="noPredio"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Retiro</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="siPredioRetiro"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Si:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="siPredioRetiro"
                                                name="siPredioRetiro"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="noPredioRetiro"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                No:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="noPredioRetiro"
                                                name="noPredioRetiro"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/8"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Orientación</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <input
                                                type="text"
                                                id="orientacionPredio"
                                                name="orientacionPredio"
                                                onChange={handleInputChange}
                                                className="text-center rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-24"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Desline</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="frentePredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Frente:
                                            </label>
                                            <input
                                                type="number"
                                                id="frentePredio"
                                                name="frentePredio"
                                                onChange={handleInputChange}
                                                className="text-center text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="fondoPredio"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Fondo:
                                            </label>
                                            <input
                                                type="number"
                                                id="fondoPredio"
                                                name="fondoPredio"
                                                onChange={handleInputChange}
                                                className="text-center text-sm mt-2 rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="supTotalPredio"
                                                className="text-sm text-gray-700 font-bold mr-3 md:w-20"
                                            >
                                                S.Total:
                                            </label>
                                            <input
                                                type="number"
                                                id="supTotalPredio"
                                                name="supTotalPredio"
                                                onChange={handleInputChange}
                                                className="text-center text-sm mt-2 rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m<sup>2</sup></span>
                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div className="col-span-12 border p-3 rounded space-y-4">
                                <h4 className="text-xl text-green-900">Cerramientos Instalaciones</h4>
                                <div className="columns-6 gap-4">
                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Carpinteria</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="comunCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Común:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="comunCerramientos"
                                                name="comunCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="aluminioCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Aluminio :
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="aluminioCerramientos"
                                                name="aluminioCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="pvcCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                P.V.C.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="pvcCerramientos"
                                                name="pvcCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="maderaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Madera:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="maderaCerramientos"
                                                name="maderaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="otrosCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Otros:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="otrosCerramientos"
                                                name="otrosCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Cerramientos</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="cortinasCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Cortinas:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="cortinasCerramientos"
                                                name="cortinasCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="postigosCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Postigos:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="postigosCerramientos"
                                                name="postigosCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="celosíasCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Celosías:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="celosíasCerramientos"
                                                name="celosíasCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="rejasCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Rejas:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="rejasCerramientos"
                                                name="rejasCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="otrosCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Otros:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="otrosCerramientos"
                                                name="otrosCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Inst. Agua</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="banoCalienteCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Baño Caliente:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="banoCalienteCerramientos"
                                                name="banoCalienteCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="banoFriaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Baño Fria:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="banoFriaCerramientos"
                                                name="banoFriaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="cocinaCalienteCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Cocina Caliente:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="cocinaCalienteCerramientos"
                                                name="cocinaCalienteCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="cocinaFriaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Cocina Fría:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="cocinaFriaCerramientos"
                                                name="cocinaFriaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900 ">Inst. Electricas</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="embutidaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Embutida:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="embutidaCerramientos"
                                                name="embutidaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="exteriorCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Exterior:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="exteriorCerramientos"
                                                name="exteriorCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="mixtaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Mixta:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="mixtaCerramientos"
                                                name="mixtaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="instGasCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Inst. Gas.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="instGasCerramientos"
                                                name="instGasCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900 ">Inst. Sanit.</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="colectorCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                            >
                                                Colector:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="colectorCerramientos"
                                                name="colectorCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="camSepticaCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                            >
                                                Cám.Séptica:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="camSepticaCerramientos"
                                                name="camSepticaCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="pozoNegroCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                            >
                                                Pozo Negro:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="pozoNegroCerramientos"
                                                name="pozoNegroCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900 ">Inst. Term.</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="losaRadianteCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Losa Rad.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="losaRadianteCerramientos"
                                                name="losaRadianteCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="radiadoresCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Radiadores:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="radiadoresCerramientos"
                                                name="radiadoresCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="panelElectCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Panel Eléct.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="panelElectCerramientos"
                                                name="panelElectCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="aireAcondCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Aire acond.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="aireAcondCerramientos"
                                                name="aireAcondCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="otrosCerramientos"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Otros:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="otrosCerramientos"
                                                name="otrosCerramientos"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-span-12 border p-3 rounded space-y-4">
                                <h4 className="text-xl text-green-900">Consideraciones Generales</h4>
                                <div className="columns-5 gap-4">
                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Categoria</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="modestaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Modesta:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="modestaConsideraciones"
                                                name="modestaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="economicaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Económica:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="economicaConsideraciones"
                                                name="economicaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="buenaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Buena:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="buenaConsideraciones"
                                                name="buenaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="confortableConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Confortable:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="confortableConsideraciones"
                                                name="confortableConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="muyConfortableConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-32"
                                            >
                                                Muy Confortable:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="muyConfortableConsideraciones"
                                                name="muyConfortableConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Conservacion</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="maloConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Malo:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="maloConsideraciones"
                                                name="maloConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="regularConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Regular:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="regularConsideraciones"
                                                name="regularConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="buenoConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Bueno:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="buenoConsideraciones"
                                                name="buenoConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="muybuenoConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Muy Bueno:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="muybuenoConsideraciones"
                                                name="muybuenoConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="nuevoConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Nuevo:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="nuevoConsideraciones"
                                                name="nuevoConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Ocupación Actual</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="propietarioConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Propietario:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="propietarioConsideraciones"
                                                name="propietarioConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="alquiladaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Alquilada:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="alquiladaConsideraciones"
                                                name="alquiladaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="desocupadaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                            >
                                                Desocupada:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="desocupadaConsideraciones"
                                                name="desocupadaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="edadConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-12"
                                            >
                                                Edad:
                                            </label>
                                            <input
                                                type="number"
                                                id="edadConsideraciones"
                                                name="edadConsideraciones"
                                                onChange={handleInputChange}
                                                className="text-center text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-12"
                                            />
                                        </div>


                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Tipo</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="casaConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Casa:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="casaConsideraciones"
                                                name="casaConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="casaPhConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Casa  PH:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="casaPhConsideraciones"
                                                name="casaPhConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="apartamentoConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Apartamento:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="apartamentoConsideraciones"
                                                name="apartamentoConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="localComercialConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Local Comercial:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="localComercialConsideraciones"
                                                name="localComercialConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="otrosConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Otros:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="otrosConsideraciones"
                                                name="otrosConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>

                                    </div>

                                    <div className="break-inside-avoid bg-white p-1 rounded-md">
                                        <h6 className="text-lg text-green-900">Edificio</h6>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="cantIdadPisosConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                CantIdad Pisos:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="cantIdadPisosConsideraciones"
                                                name="cantIdadPisosConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="aptosPisoConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Aptos/Piso:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="aptosPisoConsideraciones"
                                                name="aptosPisoConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="ascensoresConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Ascensores:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="ascensoresConsideraciones"
                                                name="ascensoresConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="portElectConsideraciones"
                                                className="text-sm text-gray-700 font-bold mr-2 md:w-28"
                                            >
                                                Port. Eléct.:
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="portElectConsideraciones"
                                                name="portElectConsideraciones"
                                                onChange={handleInputChange}
                                                className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>



            ,{/* 

                                    
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="rural" className="form-check-label" style={{ width: '110px' }}>Rural :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Características</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="residencial" className="form-check-label" style={{ width: '110px' }}>Residencial :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="comercial" className="form-check-label" style={{ width: '110px' }}>Comercial :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="industrial" className="form-check-label" style={{ width: '110px' }}>Industrial :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="otros" className="form-check-label" style={{ width: '110px' }}>Otros :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Edificación</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="suntuosa" className="form-check-label" style={{ width: '110px' }}>Suntuosa :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="muyBbuena" className="form-check-label" style={{ width: '110px' }}>Muy buena :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="buena" className="form-check-label" style={{ width: '110px' }}>Buena :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="económica" className="form-check-label" style={{ width: '110px' }}>Económica :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="modesta" className="form-check-label" style={{ width: '110px' }}>Modesta :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Densidad</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="compacta" className="form-check-label" style={{ width: '110px' }}>Compacta :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="media" className="form-check-label" style={{ width: '110px' }}>Media :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="pocoDensa" className="form-check-label" style={{ width: '110px' }}>Poco Densa :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="rala" className="form-check-label" style={{ width: '110px' }}>Rala :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Pavimento</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="hormBitu" className="form-check-label" style={{ width: '110px' }}>Horm./Bitu. :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="balastro" className="form-check-label" style={{ width: '110px' }}>Balastro :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Servicios</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="ose" className="form-check-label" style={{ width: '110px' }}>OSE :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="pozo" className="form-check-label" style={{ width: '110px' }}>Pozo :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="colector" className="form-check-label" style={{ width: '110px' }}>Colector :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="ute" className="form-check-label" style={{ width: '110px' }}>UTE :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="antel" className="form-check-label" style={{ width: '110px' }}>ANTEL :</label>
                                                <input type="checkbox" className="form-check-input" id="garage" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-end mt-3">
                <div className="col" >
                    <h4 className="text-center mb-2">Predio</h4>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-md-11">
                    <div className="card fondoIntroInspeccion">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Topografia</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="alto" className="form-check-label" style={{ width: '90px' }}>Alto :</label>
                                                <input type="checkbox" className="form-check-input" id="alto" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="aNivel" className="form-check-label" style={{ width: '90px' }}>A Nivel :</label>
                                                <input type="checkbox" className="form-check-input" id="aNivel" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="bajo" className="form-check-label" style={{ width: '90px' }}>Bajo :</label>
                                                <input type="checkbox" className="form-check-input" id="bajo" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Forma</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="irregular" className="form-check-label" style={{ width: '100px' }}>Irregular :</label>
                                                <input type="checkbox" className="form-check-input" id="irregular" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="regular" className="form-check-label" style={{ width: '100px' }}>Regular :</label>
                                                <input type="checkbox" className="form-check-input" id="regular" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Ensanche</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="siEnsanche" className="form-check-label" style={{ width: '60px' }}>Si :</label>
                                                <input type="checkbox" className="form-check-input" id="siEnsanche" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="noEnsanche" className="form-check-label" style={{ width: '60px' }}>No :</label>
                                                <input type="checkbox" className="form-check-input" id="noEnsanche" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Retiro</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="siRetiro" className="form-check-label" style={{ width: '60px' }}>Si :</label>
                                                <input type="checkbox" className="form-check-input" id="siRetiro" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="noRetiro" className="form-check-label" style={{ width: '60px' }}>No :</label>
                                                <input type="checkbox" className="form-check-input" id="noRetiro" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Orientación</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <input type="text" className="form-control" id="orientacion" style={{ width: '80px' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Deslinde</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="frente" className="form-check-label" style={{ width: '60px' }}>Frente :</label>
                                                <input type="number" className="form-control" id="frente" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m</span>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="fondo" className="form-check-label" style={{ width: '60px' }}>Fondo :</label>
                                                <input type="number" className="form-control" id="fondo" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m</span>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="supTotal" className="form-check-label" style={{ width: '60px' }}>S.Total :</label>
                                                <input type="number" className="form-control" id="supTotal" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m²</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row justify-content-center m-5 ">
                <div className="col-3 locales">
                    <div className="mb-2">
                        <h4 className="text-center">Locales</h4>
                    </div>
                    <div className="mb-5">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                            Abrir modal
                        </button>
                    </div>
                </div>
            </div>


            <div className="modal" tabIndex="-1" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here. </p> 
                            <input ref={myInputRef} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row mt-3">
                <div className="col-12" >
                    <h4 className="text-center mb-2">Cerramientos Instalaciones</h4>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-md-11">
                    <div className="card fondoIntroInspeccion">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Carpinteria</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="comun" className="form-check-label" style={{ width: '90px' }}>Común :</label>
                                                <input type="checkbox" className="form-check-input" id="comun" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="aluminio" className="form-check-label" style={{ width: '90px' }}>Aluminio :</label>
                                                <input type="checkbox" className="form-check-input" id="aluminio" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="pvc" className="form-check-label" style={{ width: '90px' }}>P.V.C. :</label>
                                                <input type="checkbox" className="form-check-input" id="pvc" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="madera" className="form-check-label" style={{ width: '90px' }}>Madera :</label>
                                                <input type="checkbox" className="form-check-input" id="madera" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="otrosCarpinteria" className="form-check-label" style={{ width: '90px' }}>Otros :</label>
                                                <input type="checkbox" className="form-check-input" id="otrosCarpinteria" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Cerramientos</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="cortinas" className="form-check-label" style={{ width: '100px' }}>Cortinas :</label>
                                                <input type="checkbox" className="form-check-input" id="cortinas" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="postigos" className="form-check-label" style={{ width: '100px' }}>Postigos :</label>
                                                <input type="checkbox" className="form-check-input" id="postigos" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="celosias" className="form-check-label" style={{ width: '100px' }}>Celosías :</label>
                                                <input type="checkbox" className="form-check-input" id="celosias" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="rejas" className="form-check-label" style={{ width: '100px' }}>Rejas :</label>
                                                <input type="checkbox" className="form-check-input" id="rejas" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="otrosCerramientos" className="form-check-label" style={{ width: '100px' }}>Otros :</label>
                                                <input type="checkbox" className="form-check-input" id="otrosCerramientos" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Inst. Agua</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="banoCal" className="form-check-label" style={{ width: '110px' }}>Baño Cal. :</label>
                                                <input type="checkbox" className="form-check-input" id="banoCal" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="banoFria" className="form-check-label" style={{ width: '110px' }}>Baño Fría. :</label>
                                                <input type="checkbox" className="form-check-input" id="banoFria" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="cocinaCal" className="form-check-label" style={{ width: '110px' }}>Cocina Cal. :</label>
                                                <input type="checkbox" className="form-check-input" id="cocinaCal" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="cocinaFria" className="form-check-label" style={{ width: '110px' }}>Cocina Fría. :</label>
                                                <input type="checkbox" className="form-check-input" id="cocinaFria" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Inst. Elect.</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="embutida" className="form-check-label" style={{ width: '110px' }}>Embutida :</label>
                                                <input type="checkbox" className="form-check-input" id="embutida" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="exterior" className="form-check-label" style={{ width: '110px' }}>Exterior :</label>
                                                <input type="checkbox" className="form-check-input" id="exterior" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="mixta" className="form-check-label" style={{ width: '110px' }}>Mixta :</label>
                                                <input type="checkbox" className="form-check-input" id="mixta" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="instGas" className="form-check-label" style={{ width: '110px' }}>Inst. Gas :</label>
                                                <input type="checkbox" className="form-check-input" id="instGas" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Inst. Sanit</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="colector" className="form-check-label" style={{ width: '110px' }}>Colector :</label>
                                                <input type="checkbox" className="form-check-input" id="colector" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="camSeptica" className="form-check-label" style={{ width: '110px' }}>Cám.Séptica :</label>
                                                <input type="checkbox" className="form-check-input" id="camSeptica" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="pozoNegro" className="form-check-label" style={{ width: '110px' }}>Pozo Negro :</label>
                                                <input type="checkbox" className="form-check-input" id="pozoNegro" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Inst. Term</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="losaRad" className="form-check-label" style={{ width: '110px' }}>Losa Rad. :</label>
                                                <input type="checkbox" className="form-check-input" id="losaRad" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="radiadores" className="form-check-label" style={{ width: '110px' }}>Radiadores :</label>
                                                <input type="checkbox" className="form-check-input" id="radiadores" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="panelElect" className="form-check-label" style={{ width: '110px' }}>Panel Eléct. :</label>
                                                <input type="checkbox" className="form-check-input" id="panelElect" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="aireAcond" className="form-check-label" style={{ width: '110px' }}>Aire Acond. :</label>
                                                <input type="checkbox" className="form-check-input" id="aireAcond" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="otrosIntTerm" className="form-check-label" style={{ width: '110px' }}>Otros :</label>
                                                <input type="checkbox" className="form-check-input" id="otrosIntTerm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col-12" >
                    <h4 className="text-center mb-2">Consideraciones Generales</h4>
                </div>
            </div>


            <div className="row justify-content-center mt-3">
                <div className="col-md-11">
                    <div className="card fondoIntroInspeccion">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Categoria</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="modesta" className="form-check-label" style={{ width: '125px' }}>modesta :</label>
                                                <input type="checkbox" className="form-check-input" id="modesta" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="economica" className="form-check-label" style={{ width: '125px' }}>Económica :</label>
                                                <input type="checkbox" className="form-check-input" id="economica" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="buena" className="form-check-label" style={{ width: '125px' }}>Buena :</label>
                                                <input type="checkbox" className="form-check-input" id="buena" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="confortable" className="form-check-label" style={{ width: '125px' }}>Confortable :</label>
                                                <input type="checkbox" className="form-check-input" id="confortable" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="muyConfort" className="form-check-label" style={{ width: '125px' }}>Muy Confort. :</label>
                                                <input type="checkbox" className="form-check-input" id="muyConfort" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Conservacion</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="malo" className="form-check-label" style={{ width: '110px' }}>Malo :</label>
                                                <input type="checkbox" className="form-check-input" id="malo" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="regular" className="form-check-label" style={{ width: '110px' }}>Regular :</label>
                                                <input type="checkbox" className="form-check-input" id="regular" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="conservacionBueno" className="form-check-label" style={{ width: '110px' }}>Bueno :</label>
                                                <input type="checkbox" className="form-check-input" id="conservacionBueno" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="conservacionMuyBueno" className="form-check-label" style={{ width: '110px' }}>Muy bueno :</label>
                                                <input type="checkbox" className="form-check-input" id="conservacionMuyBueno" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="conservacionNuevo" className="form-check-label" style={{ width: '110px' }}>Nuevo :</label>
                                                <input type="checkbox" className="form-check-input" id="conservacionNuevo" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Ocup. Actual</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="propietario" className="form-check-label" style={{ width: '120px' }}>Propietario :</label>
                                                <input type="checkbox" className="form-check-input" id="propietario" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="alquilada" className="form-check-label" style={{ width: '120px' }}>Alquilada :</label>
                                                <input type="checkbox" className="form-check-input" id="alquilada" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="desocupada" className="form-check-label" style={{ width: '120px' }}>Desocupada :</label>
                                                <input type="checkbox" className="form-check-input" id="desocupada" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check d-flex ">
                                                <label htmlFor="edad" className="form-label" style={{ width: '65px' }}>Edad :</label>
                                                <input type="number" className="form-control" id="edad" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Tipo</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="casa" className="form-check-label" style={{ width: '140px' }}>Casa </label>
                                                <input type="checkbox" className="form-check-input" id="casa" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="casaPH" className="form-check-label" style={{ width: '140px' }}>Casa PH </label>
                                                <input type="checkbox" className="form-check-input" id="casaPH" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="apartamento" className="form-check-label" style={{ width: '140px' }}>Apartamento </label>
                                                <input type="checkbox" className="form-check-input" id="apartamento" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="localComercial" className="form-check-label" style={{ width: '140px' }}>Local Comercial </label>
                                                <input type="checkbox" className="form-check-input" id="localComercial" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="otros" className="form-check-label" style={{ width: '140px' }}>Otros </label>
                                                <input type="checkbox" className="form-check-input" id="otros" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4">Edificio</h6>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="cantIdadPisos" className="form-check-label" style={{ width: '140px' }}>CantIdad Pisos </label>
                                                <input type="checkbox" className="form-check-input" id="cantIdadPisos" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="aptosPiso" className="form-check-label" style={{ width: '140px' }}>Aptos/Piso </label>
                                                <input type="checkbox" className="form-check-input" id="aptosPiso" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="ascensores" className="form-check-label" style={{ width: '140px' }}>Ascensores </label>
                                                <input type="checkbox" className="form-check-input" id="ascensores" />
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="portElect" className="form-check-label" style={{ width: '140px' }}>Port. Eléct. </label>
                                                <input type="checkbox" className="form-check-input" id="portElect" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h4 className="text-center  mb-2">Metraje Obra Civil</h4>
                    <div className="card fondoIntroInspeccion">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="text-center mb-4">Propiedad Comun</h6>

                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="SuperficieCubierta" className="form-check-label" style={{ width: '170px' }}>Superficie Cubierta</label>
                                                <input type="number" className="form-control" id="SuperficieCubierta" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m²</span>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="SuperficieSemiCubierta" className="form-check-label" style={{ width: '170px' }}>Superficie Semicubierta</label>
                                                <input type="number" className="form-control" id="SuperficieSemiCubierta" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m²</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h6 className="text-center mb-4">Propiedad Horizontal</h6>

                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="bienesPropios" className="form-check-label" style={{ width: '130px' }}>Bienes Propios</label>
                                                <input type="number" className="form-control" id="bienesPropios" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m²</span>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center">
                                            <div className="form-check p-1 d-flex align-items-center">
                                                <label htmlFor="bienesComunes" className="form-check-label" style={{ width: '130px' }}>Bienes Comunes</label>
                                                <input type="number" className="form-control" id="bienesComunes" style={{ width: '70px', height: '30px', fontSize: '12px' }} />
                                                <span style={{ marginLeft: '5px', width: '30px' }}>m²</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center mb-2">Observaciones</h4>
                    <div className="card fondoIntroInspeccion">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col">
                                        <div>
                                            <textarea className="form-control" style={{ height: '120px' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="botonInspeccion">
                <div className="m-5">
                    <button type="submit" className="btn btn-primary">Crear Inspección</button>
                </div>
            </div>



        </div> */}


        </>
    );
}


export default Inspeccion;