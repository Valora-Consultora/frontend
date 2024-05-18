import React, { useState, useEffect, useRef } from "react";
import OrderService from "../api/OrderService";

function Order() {
    const defaulttasadorInspeccion = "default value";

    const [tasadorInspecciones, settasadorInspecciones] = useState([]);
    const [tasadorAntecedentes, setTasadorAntecedentes] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(false);

    //const [tasadorInspeccion, settasadorInspeccion] = useState();

    const [info, setInfo] = useState({
        // Datos generales de la orden
        nombreContacto: "", // Nombre de la orden de tasación
        fechaInspeccion: "", // Fecha de inspección
        horaInspeccion: "", // Hora de inspección

        // Sección de orden de tasación
        fechaCreacion: "", // Fecha de la orden
        titular: "", // Titular de la orden
        telefonoSolicitante: "", // Teléfono
        nombreSolicitante: "",
        telefonoContacto: "", // Teléfono de contacto
        calle: "", // Calle
        nroPuerta: "", // Número de puerta
        unidad: "", // Unidad
        esquina: "", // Esquina
        localidad: "", // Localidad
        tasadorAntecedenteId: "", // Asegúrate de definir tasadorAntecedenteId
        padron: "", // Padrón

        // Campos adicionales y checkboxes
        tasacion: false, // Checkbox para tasación
        retasacion: false, // Checkbox para retasación
        enInspeccion: false, // Checkbox para estado de inspección
        enEstudio: false, // Checkbox para estado de estudio
        fechaAntecedente: "", // Fecha de antecedentes
        oficialBanco: "", // Oficial de banco
        sucursal: "", // Sucursal
        observacion: "", // Observaciones
    });

    const selectedTasadorId = info.tasadorInspeccion
        ? info.tasadorInspeccion.id
        : "";
    const selectedTasadorAntecedenteId = info.tasadorAntecedenteId
        ? info.tasadorAntecedenteId
        : "";
    const selectedBancoId = info.banco ? info.banco.id : "";
    const selectedDepartamentoId = info.departamento ? info.departamento.id : "";

    useEffect(() => {
        const fetchtasadorInspecciones = async () => {
            try {
                const data = await OrderService.getTasadores();
                settasadorInspecciones(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchtasadorInspecciones();
    }, [tasadorInspecciones]);

    useEffect(() => {
        const fetchTasadorAntecedentes = async () => {
            try {
                const data = await OrderService.getTasadores();
                setTasadorAntecedentes(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchTasadorAntecedentes();
    }, [tasadorAntecedentes]);

    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const data = await OrderService.getBancos();
                setBancos(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchBancos();
    }, [bancos]);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const data = await OrderService.getDepartamentos();
                setDepartamentos(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchDepartamentos();
    }, [departamentos]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "tasadorInspeccion") {
            // Definir una función asincrónica dentro de handleInputChange
            const fetchTasador = async () => {
                try {
                    // Obtener el objeto tasador completo por su ID
                    const selectedTasador = await OrderService.getTasadorById(value);
                    // Asignar el objeto tasador completo al estado
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        tasadorInspeccion: selectedTasador,
                    }));
                } catch (error) {
                    // Manejar errores
                }
            };

            // Llamar a la función fetchTasador
            fetchTasador();
        } else if (name === "tasadorAntecedenteId") {
            // Asignar directamente el ID al estado

            setInfo((prevInfo) => ({
                ...prevInfo,
                tasadorAntecedenteId: value,
            }));
        } else if (name === "banco") {
            // Definir una función asincrónica dentro de handleInputChange
            const fetchBanco = async () => {
                try {
                    // Obtener el objeto tasador completo por su ID
                    const selectedBanco = await OrderService.getBancoById(value);
                    console.log("selectedBancoId", selectedBanco.id);
                    // Asignar el objeto tasador completo al estado
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        banco: selectedBanco,
                    }));
                } catch (error) {
                    // Manejar errores
                }
            };

            // Llamar a la función fetchTasador
            fetchBanco();
        }

        // Si el cambio proviene del select de banco, asignar directamente el valor (id) seleccionado
        else if (name === "departamento") {
            // Definir una función asincrónica dentro de handleInputChange
            const fetchDepartamento = async () => {
                try {
                    const selectDepartamento = await OrderService.getDepartamentoById(
                        value
                    );
                    // Asignar el objeto tasador completo al estado
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        departamento: selectDepartamento,
                    }));
                } catch (error) {
                    // Manejar errores
                }
            };

            // Llamar a la función fetchTasador
            fetchDepartamento();
        } else if (name === "fechaAntecedente") {
            // Formatear la fecha para incluir la hora (00:00:00)
            const fechaFormateada = new Date(value + "T00:00:00");
            setInfo((prevInfo) => ({
                ...prevInfo,
                [name]: fechaFormateada.toISOString(), // Enviar la fecha formateada al backend
            }));
        } else {
            // Para otros campos, seguir el enfoque actual
            setInfo((prevInfo) => ({
                ...prevInfo,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("info", info);
            // Logs para cada campo de info
            console.log("nombreContacto:", info.nombreContacto);
            console.log("tasadorInspeccion:", info.tasadorInspeccion);
            console.log("fechaInspeccion:", info.fechaInspeccion);
            console.log("horaInspeccion:", info.horaInspeccion);
            console.log("fechaCreacion:", info.fechaCreacion);
            console.log("banco:", info.banco);
            console.log("titular:", info.titular);
            console.log("telefonoSolicitante:", info.telefonoSolicitante);
            console.log("nombreSolicitante:", info.nombreSolicitante);
            console.log("telefonoContacto:", info.telefonoContacto);
            console.log("calle:", info.calle);
            console.log("nroPuerta:", info.nroPuerta);
            console.log("unidad:", info.unidad);
            console.log("esquina:", info.esquina);
            console.log("localidad:", info.localidad);
            console.log("departamento:", info.departamento);
            console.log("padron:", info.padron);
            console.log("tasacion:", info.tasacion);
            console.log("retasacion:", info.retasacion);
            console.log("enInspeccion:", info.enInspeccion);
            console.log("enEstudio:", info.enEstudio);
            console.log("fechaAntecedente:", info.fechaAntecedente);
            console.log("tasadorAntecedenteId:", info.tasadorAntecedenteId);
            console.log("oficialBanco:", info.oficialBanco);
            console.log("sucursal:", info.sucursal);
            console.log("observacion:", info.observacion);

            const response = await OrderService.createOrden(info);
            console.log("Orden creada:", response);
            // Aquí podrías agregar lógica adicional, como redirigir al usuario a otra página o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al crear orden:", error);
            // Aquí podrías manejar los errores y mostrar un mensaje al usuario
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 h-full w-full flex flex-col items-center justify-start">
            <h2 className="text-center text-3xl font-bold border-b-4 border-black w-1/4 mx-auto mb-8 mt-4">
                Crear Orden
            </h2>
            <form
                onSubmit={submitHandler}
                className="flex flex-col items-center justify-center w-full space-y-4"
            >
                <div className="flex space-x-4 w-full justify-center ">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   p-4  w-full max-w-3xl">
                        <h4 className="text-center text-2xl font-bold mb-6 text-black">
                            Orden de Tasación
                        </h4>
                        <div className="">
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="fechaCreacion"
                                    className="text-sm mb-2   block text-gray-700 w-2/12 font-bold"
                                >
                                    Fecha :
                                </label>
                                <input
                                    type="date"
                                    id="fechaCreacion"
                                    name="fechaCreacion"
                                    onChange={handleInputChange}
                                    className=" shadow appearance-none rounded  py-2 px-3  leading-tight focus:shadow-outline
                                    w-4/12  mr-1 border  text-gray-700 focus:outline-none focus:shadow-outline"
                                />
                                <label
                                    htmlFor="banco"
                                    className="ml-4 text-sm mb-2   block text-gray-700 w-2/12 font-bold"
                                >
                                    Banco :
                                </label>
                                <select
                                    id="banco"
                                    name="banco"
                                    value={selectedBancoId}
                                    onChange={handleInputChange}
                                    className="
                                    shadow appearance-none rounded  py-2 px-3  focus:shadow-outline
                                    mr-1   focus:shadow-outline
                                    
                                    w-6/12 border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Seleccione un banco</option>
                                    {bancos.map((banco) => (
                                        <option key={banco.id} value={banco.id}>
                                            {banco.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <div className="mb-2 flex items-center">
                                    <label
                                        htmlFor="titular"
                                        className="block text-gray-700 w-1/6 font-bold"
                                    >
                                        Titular :
                                    </label>
                                    <input
                                        type="text"
                                        id="titular"
                                        name="titular"
                                        onChange={handleInputChange}
                                        className="w-5/6 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    />
                                    <label
                                        htmlFor="titular"
                                        className="block text-gray-700 w-1/6 font-bold"
                                    ></label>
                                </div>
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="nombreContacto"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Nombre :
                                </label>
                                <input
                                    type="text"
                                    id="nombreContacto"
                                    name="nombreContacto"
                                    onChange={handleInputChange}
                                    className="w-6/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                />
                                <label
                                    htmlFor="telefonoContacto"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Teléfono :
                                </label>
                                <input
                                    type="number"
                                    id="telefonoContacto"
                                    name="telefonoContacto"
                                    onChange={handleInputChange}
                                    className="w-4/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="contacto"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Contacto :
                                </label>
                                <input
                                    type="text"
                                    id="nombreSolicitante"
                                    name="nombreSolicitante"
                                    onChange={handleInputChange}
                                    className="w-6/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                />
                                <label
                                    htmlFor="telefonoSolicitante"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Teléfono :
                                </label>
                                <input
                                    type="number"
                                    id="telefonoSolicitante"
                                    name="telefonoSolicitante"
                                    onChange={handleInputChange}
                                    className="w-4/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-white shadow-md rounded-md w-full max-w-96 max-h-52">
                        <div className="bg-white p-2 mb-0 ">
                            <h4 className="text-center text-black text-xl mb-4">
                                Inspección
                            </h4>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="tasadorInspeccion"
                                    className="block text-gray-700 w-2/6 font-bold"
                                >
                                    Tasador :
                                </label>
                                <select
                                    className="w-4/6 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="tasadorInspeccion"
                                    name="tasadorInspeccion"
                                    value={selectedTasadorId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione un tasador</option>
                                    {tasadorInspecciones.map((tasador) => (
                                        <option key={tasador.id} value={tasador.id}>
                                            {tasador.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="fechaInspeccion"
                                    className="block text-gray-700 w-2/6 font-bold"
                                >
                                    Fecha :
                                </label>
                                <input
                                    type="date"
                                    className="w-3/6 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="fechaInspeccion"
                                    name="fechaInspeccion"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="horaInspeccion"
                                    className="block text-gray-700 w-2/6 font-bold"
                                >
                                    Hora :
                                </label>
                                <input
                                    type="time"
                                    className="w-2/6 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="horaInspeccion"
                                    name="horaInspeccion"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-md w-full max-w-4xl">
                    <div className="flex flex-col items-center ">
                        <h4 className="text-black text-2xl font-bold mb-3 w-1/2 text-center">
                            Ubicación del Inmueble
                        </h4>
                        <div className="flex flex-col w-full max-w-3xl">
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="calle"
                                    className="block text-gray-700 w-1/12 font-bold"
                                >
                                    Calle :
                                </label>
                                <input
                                    type="text"
                                    className="w-5/12 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="calle"
                                    name="calle"
                                    onChange={handleInputChange}
                                />

                                <label
                                    htmlFor="nroPuerta"
                                    className="block text-gray-700 w-2/12 ml-4 font-bold"
                                >
                                    N<span className="text-sm align-top">ro</span> Puerta :
                                </label>
                                <input
                                    type="number"
                                    className="w-1/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="nroPuerta"
                                    name="nroPuerta"
                                    onChange={handleInputChange}
                                />

                                <label
                                    htmlFor="unidad"
                                    className="block text-gray-700 w-1/12 mr-1 font-bold"
                                >
                                    Unidad :
                                </label>
                                <input
                                    type="number"
                                    className="w-1/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="unidad"
                                    name="unidad"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="esquina"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Esquina :
                                </label>
                                <input
                                    type="text"
                                    className="w-10/12 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="esquina"
                                    name="esquina"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="localidad"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Localidad :
                                </label>
                                <input
                                    type="text"
                                    className="w-10/12 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="localidad"
                                    name="localidad"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="departamento"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Departamento :
                                </label>
                                <select
                                    className="w-10/12 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="departamento"
                                    name="departamento"
                                    value={selectedDepartamentoId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione un departamento</option>
                                    {departamentos.map((departamento) => (
                                        <option key={departamento.id} value={departamento.id}>
                                            {departamento.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2 flex items-center">
                                <label
                                    htmlFor="padron"
                                    className="block text-gray-700 w-2/12 font-bold"
                                >
                                    Padrón :
                                </label>
                                <input
                                    type="number"
                                    className="w-2/12 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    id="padron"
                                    name="padron"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-md w-full max-w-screen-xl">
                    <div className="flex space-x-28">
                        <div className="flex flex-col items-start">
                            <h4 className="text-center text-black text-2xl mb-7 font-medium">
                                Tipo de Trabajo
                            </h4>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="tasacion"
                                        className="block text-gray-700 font-bold"
                                    >
                                        Tasación
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-3 w-5 text-indigo-600"
                                        id="tasacion"
                                        name="tasacion"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="retasacion"
                                        className="block text-gray-700 font-bold"
                                    >
                                        Retasación
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-3 w-5 text-indigo-600"
                                        id="retasacion"
                                        name="retasacion"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start">
                            <h4 className="text-center text-black text-2xl mb-7 font-medium">
                                Recaudos
                            </h4>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="enInspeccion"
                                        className="block text-gray-700 font-bold"
                                    >
                                        En Inspección
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-3 w-5 text-indigo-600"
                                        id="enInspeccion"
                                        name="enInspeccion"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="enEstudio"
                                        className="block text-gray-700 font-bold"
                                    >
                                        En Estudio
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-3 w-5 text-indigo-600"
                                        id="enEstudio"
                                        name="enEstudio"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start">
                            <h4 className="text-center text-black text-2xl mb-7 font-medium">
                                Antecedentes
                            </h4>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="fechaAntecedente"
                                        className="block text-gray-700 w-3/12 font-bold"
                                    >
                                        Fecha
                                    </label>

                                    <input
                                        type="date"
                                        id="fechaAntecedente"
                                        name="fechaAntecedente"
                                        onChange={handleInputChange}
                                        className="w-8/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    />

                                </div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="tasadorAntecedenteId"
                                        className="block text-gray-700 w-4/12 font-bold"
                                    >
                                        Tasador
                                    </label>
                                    <select
                                        className="w-8/12 px-2 py-1 mr-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                        id="tasadorAntecedenteId"
                                        name="tasadorAntecedenteId"
                                        value={selectedTasadorAntecedenteId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Tasador</option>
                                        {tasadorAntecedentes.map((tasador) => (
                                            <option key={tasador.id} value={tasador.id}>
                                                {tasador.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col items-start">
                            <h4 className="text-center text-black text-2xl mb-7 font-medium">
                                Sucursal - Oficial
                            </h4>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="oficialBanco"
                                        className="block text-gray-700 w-4/6 font-bold"
                                    >
                                        Oficial del Banco
                                    </label>
                                    <input
                                        type="text"
                                        className="w-5/6 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline" id="oficialBanco"
                                        name="oficialBanco"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="sucursal"
                                        className="block text-gray-700 w-4/6 font-bold"
                                    >
                                        Sucursal
                                    </label>
                                    <input
                                        type="text"
                                        id="sucursal"
                                        name="sucursal"
                                        onChange={handleInputChange}
                                        className="w-5/6 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="p-4 bg-white shadow-md rounded-md w-full max-w-screen-xl">
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-center text-black text-2xl mb-7 font-medium">
                            Observaciones
                        </h4>
                        <textarea
                            className="w-full h-48 p-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                            placeholder="Escriba sus observaciones aquí..."
                            id="observacion"
                            name="observacion"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className=" bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Crear Orden
                    </button>
                </div>
            </form>
        </div>

        /* <div className="order">
                                <h2>Crear Orden</h2>
                                <form onSubmit={submitHandler}>
                                    <div className="main-container">
                                        <div className="ordenUbicacion">
                                            <div className="flex-container-orden-tasacion">
                                                <h4>Orden de Tasación</h4>
                                                <div className="form-group">
                                                    <label htmlFor="fechaCreacion">Fecha :</label>
                                                    <input type="date" className="form-control" id="fechaCreacion" name="fechaCreacion" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="banco">Banco :</label>
                                                    <select
                                                        className="form-control"
                                                        id="banco"
                                                        name="banco"
                                                        value={selectedBancoId} // Configurar el valor seleccionado
                                                        onChange={handleInputChange} // Manejar cambios en la selección
                                                    >
                                                        <option value="">Seleccione un banco</option> 
                                                        {bancos.map((banco) => (
                                                            <option key={banco.id} value={banco.id}>
                                                                {banco.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="titular">Titular :</label>
                                                    <input type="text" className="form-control" id="titular" name="titular" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nombreContacto">Nombre :</label>
                                                    <input type="text" className="form-control" id="nombreContacto" name="nombreContacto" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="telefonoContacto">Teléfono :</label>
                                                    <input type="number" className="form-control" id="telefonoContacto" name="telefonoContacto" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="contacto">Contacto :</label>
                                                    <input type="text" className="form-control" id="nombreSolicitante" name="nombreSolicitante" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="telefonoSolicitante">Teléfono :</label>
                                                    <input type="number" className="form-control" id="telefonoSolicitante" name="telefonoSolicitante" onChange={handleInputChange} />
                                                </div>
                                            </div>
                    
                                            <div className="flex-container-ubicacion-inmueble">
                                                <h4>Ubicación del Inmueble</h4>
                                                <div className="form-group">
                                                    <label htmlFor="calle">Calle :</label>
                                                    <input type="text" className="form-control" id="calle" name="calle" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nroPuerta">Nro Puerta :</label>
                                                    <input type="number" className="form-control" id="nroPuerta" name="nroPuerta" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unidad">Unidad :</label>
                                                    <input type="number" className="form-control" id="unidad" name="unidad" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="esquina">Entre/Esquina :</label>
                                                    <input type="text" className="form-control" id="esquina" name="esquina" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="localidad">Localidad :</label>
                                                    <input type="text" className="form-control" id="localidad" name="localidad" onChange={handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="departamento">Departamento :</label>
                                                    <select
                                                        className="form-control"
                                                        id="departamento"
                                                        name="departamento"
                                                        value={selectedDepartamentoId} // Configurar el valor seleccionado
                                                        onChange={handleInputChange} // Manejar cambios en la selección
                                                    >
                                                        <option value="">Seleccione un departamento</option> 
                                                        {departamentos.map((departamento) => (
                                                            <option key={departamento.id} value={departamento.id}>
                                                                {departamento.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padron">Padrón :</label>
                                                    <input type="number" className="form-control" id="padron" name="padron" onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                    
                    
                                        <div className="inspeccionTipoTrabajo">
                                            <div className="flex-container-inspeccion">
                                                <div className="inspeccion">
                                                    <h4>Inspección</h4>
                                                    <div className="form-group">
                                                        <label htmlFor="tasador Inspeccion">Tasador :</label>
                                                        <select
                                                            className="form-control"
                                                            id="tasadorInspeccion"
                                                            name="tasadorInspeccion"
                                                            value={selectedTasadorId}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Seleccione un tasador</option>
                                                            {tasadorInspecciones.map((tasador) => (
                                                                <option key={tasador.id} value={tasador.id}>
                                                                    {tasador.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fechaInspeccion">Fecha :</label>
                                                        <input type="date" className="form-control" id="fechaInspeccion" name="fechaInspeccion" onChange={handleInputChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="horaInspeccion">Hora :</label>
                                                        <input type="time" className="form-control" id="horaInspeccion" name="horaInspeccion" onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                    
                                            <div className="tipoTrabajoRecaudoAntecedente">
                                                <div className="flex-container-tipo-trabajo">
                                                    <h4>Tipo de Trabajo</h4>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-tasacion">
                                                                        <label htmlFor="tasacion">Tasación</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="checkbox" className="form-check-input" id="tasacion" name="tasacion" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-tasacion">
                                                                        <label htmlFor="tasacion">Retasación</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="checkbox" className="form-check-input" id="retasacion" name="retasacion" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className="flex-container-recaudos">
                                                    <h4>Recaudos</h4>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-inspeccion">
                                                                        <label htmlFor="enInspeccion">En Inspección</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="checkbox" className="form-check-input" id="enInspeccion" name="enInspeccion" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-inspeccion">
                                                                        <label htmlFor="estudio">En Estudio</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="checkbox" className="form-check-input" id="enEstudio" name="enEstudio" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className="flex-container-antecedentes">
                                                    <h4>Antecedentes</h4>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-antecedentes">
                                                                        <label htmlFor="fechaAntecedente">Fecha :</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="date" className="form-control" id="fechaAntecedente" name="fechaAntecedente" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-antecedentes">
                                                                        <label htmlFor="tasadorAntecedenteId">Tasador Antecedente :</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <select
                                                                            className="form-control"
                                                                            id="tasadorAntecedenteId"
                                                                            name="tasadorAntecedenteId"
                                                                            value={selectedTasadorAntecedenteId}
                                                                            onChange={handleInputChange}
                                                                        >
                                                                            <option value="">Tasador</option>
                                                                            {tasadorAntecedentes.map((tasador) => (
                                                                                <option key={tasador.id} value={tasador.id}>
                                                                                    {tasador.nombre}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className="flex-container-pre-observaciones">
                                                    <h4>Oficial - Sucursal</h4>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-pre-observaciones">
                                                                        <label htmlFor="oficialBanco">Oficial del Banco :</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="text" className="form-control" id="oficialBanco" name="oficialBanco" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col label-pre-observaciones">
                                                                        <label htmlFor="sucursal">Sucursal :</label>
                                                                    </div>
                                                                    <div className="col">
                                                                        <input type="text" className="form-control" id="sucursal" name="sucursal" onChange={handleInputChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                            </div>
                                        </div>
                    
                    
                    
                                    </div>
                    
                    
                                    <div className="observacionesPre">
                                        <div className="observaciones" style={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className="form-outline-observaciones">
                                                <h4>Observaciones</h4>
                                                <textarea className="form-control" id="observacion" name="observacion" rows="2" onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <div className="botonOrden">
                                        <button type="button" class="btn btn-primary">Crear Orden</button>
                                    </div>
                                </form>
                            </div> */
    );
}

export default Order;
