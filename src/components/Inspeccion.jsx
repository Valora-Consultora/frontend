import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomModalAdd from './utils/CustomModalAdd';
import plusIcon from '../images/plusIcon.png';
import minusIcon from '../images/minusIcon.png';
import LocalService from "../api/LocalService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InspeccionService from "../api/InspeccionService";
import { useLocation, useNavigate } from 'react-router-dom';
import { setProvisionalInspectionId } from '../app/slices/inspectionSlice';
import OrderService from '../api/OrderService';
import { setUser } from '../app/slices/userSlice';

function Inspeccion() {


    const [inspeccion, setInspeccion] = useState(() => initialInspeccionState({}));
    const [locales, setLocales] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLocal, setCurrentLocal] = useState(null);
    const [localesLoaded, setLocalesLoaded] = useState(false);
    const fetchCalled = useRef(false);
    const [bancos, setBancos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);


    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const state = useState();
    const navigate = useNavigate();
    const provisionalInspectionId = useSelector(state => state.inspection.provisionalInspectionId);
    const { provisionalId } = location.state || {};
    const selectedBancoId = inspeccion.banco ? inspeccion.banco.id : "";
    const selectedDepartamentoId = inspeccion.departamento ? inspeccion.departamento.id : "";
    const usuario = useSelector(state => state.user);


    useEffect(() => {
        console.log('llega al nuevo useEffect');

        // Detectar si el usuario intenta abandonar la página
        const handleBeforeUnload = (event) => {
            console.log('llega al nuevo useEffect handleBeforeUnload');

            if (provisionalId) {
                console.log('llega al nuevo useEffect if (provisionalId)');
                // Eliminar la inspección si no se ha completado
                InspeccionService.deleteInspeccion(provisionalId);
                console.log("Inspección eliminada:", provisionalId);
            }
            // No es necesario llamar a preventDefault o returnValue en algunos casos, solo para mostrar una advertencia de salida
        };

        // Manejar "atras" del navegador o cambios de URL
        const handlePopstate = () => {
            console.log('llega al nuevo useEffect handlePopstate');

            if (provisionalId) {
                console.log('llega al nuevo useEffect if (provisionalId)');
                InspeccionService.deleteInspeccion(provisionalId);
                console.log("Inspección eliminada (navegación atrás):", provisionalId);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopstate);

        // Cleanup cuando el componente se desmonta
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopstate);
        };
    }, [provisionalId]);

    useEffect(() => {
        if (usuario && usuario.nombre) {
            setInspeccion(prevState => ({
                ...prevState,
                tasador: usuario,
            }));
        }
    }, [usuario]);


    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const data = await OrderService.getBancos();
                setBancos(data);
            } catch (error) {
            }
        };

        fetchBancos();

        const fetchDepartamentos = async () => {
            try {
                const data = await OrderService.getDepartamentos();
                setDepartamentos(data);
            } catch (error) {
                // Manejar errores
            }
        };

        fetchDepartamentos();
    }, []);

    const handleOpenModal = (e, local = null) => {
        e.stopPropagation();
        setCurrentLocal(local);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchLocalesByInspeccionId(provisionalInspectionId);
    };


    const handleDeleteClick = (idLote) => {
        LocalService.deleteLocalById(idLote)
            .then(() => {
                setLocales(prevLocales => prevLocales.filter(local => local.id !== idLote));
            })
            .catch(error => {
                console.error('Error al eliminar el local:', error);
            });
    };

    useEffect(() => {
        if (!provisionalInspectionId && provisionalId) {
            dispatch(setProvisionalInspectionId(provisionalId));
        }
    }, [dispatch, provisionalId, provisionalInspectionId]);



    useEffect(() => {
        if (!provisionalInspectionId) {
            createInspeccion();
        }
    }, [provisionalInspectionId]);


    const createInspeccion = async () => {
        try {
            const response = await InspeccionService.createInspeccion(inspeccion);
            if (response && response.id) {
                dispatch(setProvisionalInspectionId(response.id));
                navigate('/Inspeccion', { state: { provisionalId: response.id } });
            } else {
                throw new Error('Respuesta de creación de inspección inválida');
            }
        } catch (error) {
            console.error('Error al crear la inspección:', error);
        }
    };

    const handleInputChange = (e, id) => {
        const { name, value, type, checked } = e.target;

        if (id) {
            setLocales((prevLocales) =>
                prevLocales.map((local) =>
                    local.id === id
                        ? { ...local, [name]: type === 'checkbox' ? checked : value }
                        : local
                )
            );
        } else {
            setInspeccion(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));

            if (name === "fechaAvalador") {
                const fechaFormateada = new Date(value + "T00:00:00");
                setInspeccion((prevState) => ({
                    ...prevState,
                    fechaAvalador: fechaFormateada.toISOString(),
                }));
            }

            if (name === "banco") {
                const fetchBanco = async () => {
                    try {
                        const selectedBanco = await OrderService.getBancoById(value);
                        setInspeccion(prevState => ({
                            ...prevState,
                            banco: selectedBanco,
                        }));
                    } catch (error) {
                        console.error('Error al obtener el banco:', error);
                    }
                };
                fetchBanco();
            }

            if (name === "departamento") {
                const fetchDepartamento = async () => {
                    try {
                        const selectedDepartamento = await OrderService.getDepartamentoById(value);
                        setInspeccion(prevState => ({
                            ...prevState,
                            departamento: selectedDepartamento,
                        }));
                    } catch (error) {
                        console.error('Error al obtener el banco:', error);
                    }
                };
                fetchDepartamento();
            }
        }
    };

    const fetchLocalesByInspeccionId = async (provisionalInspectionId) => {
        try {
            const response = await LocalService.getLocalByIdInspeccion(provisionalInspectionId);
            setLocales(response);
            setLocalesLoaded(true);
        } catch (error) {
            console.error('Error al obtener los locales:', error);
            alert('Error al obtener los locales');
        }
    };

    useEffect(() => {
        if (provisionalInspectionId && !localesLoaded && !fetchCalled.current) {
            fetchCalled.current = true;
            fetchLocalesByInspeccionId(provisionalInspectionId);
        }
    }, [provisionalInspectionId, localesLoaded]);


    const handleSaveLocal = async (local) => {
        if (local.id) {
            const updatedLocales = locales.map(l => (l.id === local.id ? local : l));
            setLocales(updatedLocales);
            await LocalService.updateLocal(local.id, local);
        } else {
            // Crear nuevo local
            local.inspeccion = { id: provisionalInspectionId };
            const response = await LocalService.createLocal(local);
            setLocales([...locales, response]);
        }
        handleCloseModal();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            for (const local of locales) {
                await handleSaveLocal(local);
            }

            let response;

            if (provisionalInspectionId) {
                response = await InspeccionService.updateInspeccion(provisionalInspectionId, inspeccion);
                toast.success('Inspección creada correctamente');
            } else {
                response = await InspeccionService.createInspeccion(inspeccion);
                toast.success('Inspección creada correctamente');
            }
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        } catch (error) {
            console.error('Error al crear/actualizar la inspección:', error);
            toast.error('Error al crear/actualizar la inspección');
        }
    };


    return (


        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
                CREAR INSPECCIÓN
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 space-y-4 border p-3 rounded">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <label
                                    htmlFor="avaluador"
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
                                    value={selectedBancoId}
                                    onChange={handleInputChange}
                                    className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                >
                                    <option value="">Banco</option>
                                    {bancos.map((banco) => (
                                        <option key={banco.id} value={banco.id}>
                                            {banco.nombre}
                                        </option>
                                    ))}
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
                                    value={selectedDepartamentoId}
                                    onChange={handleInputChange}
                                    className="col-span-2 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                >
                                    <option value="">Departamento</option>
                                    {departamentos.map((departamento) => (
                                        <option key={departamento.id} value={departamento.id}>
                                            {departamento.nombre}
                                        </option>
                                    ))}
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
                                    htmlFor="garage"
                                    className="col-span-1 text-sm text-gray-700 font-bold"
                                >
                                    Garage:
                                </label>
                                <input
                                    type="checkbox"
                                    id="garage"
                                    name="garage"
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


                        <div className="col-span-12 border p-3 rounded space-y-4 flex items-center justify-center">
                            <div className="grid grid-template-rows: auto 1fr">
                                <h4 className="text-xl text-green-900 text-center">Agregar Lotes</h4>
                                <button
                                    onClick={handleOpenModal}
                                    className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                                    type="button"
                                >
                                    <img src={plusIcon} alt="Plus icon" className="w-6 h-6 fill-current text-white filter invert" />
                                </button>
                            </div>

                        </div>


                        <div className="col-span-12 border p-3 rounded space-y-4">
                            <h4 className="text-xl text-green-900">Lotes</h4>
                            {locales.map((local) => (
                                isVisible && (
                                    <div key={local.id} className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr] gap-4">
                                        <div className="pt-14 rounded-md">
                                            <button
                                                onClick={() => handleDeleteClick(local.id)}
                                                className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                                                type="button"
                                            >
                                                <img src={minusIcon} alt="Minus icon" className="w-6 h-6 fill-current text-white filter invert" />
                                            </button>
                                        </div>
                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Estructura</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraHarmado_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    H. Armado:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`estructuraHarmado_${local.id}`}
                                                    name={`estructuraHarmado`}
                                                    checked={local.estructuraHarmado}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraMuroPort_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Muro.Port:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`estructuraMuroPort_${local.id}`}
                                                    name={`estructuraMuroPort`}
                                                    checked={local.estructuraMuroPort}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraMixta_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Mixta:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`estructuraMixta_${local.id}`}
                                                    name={`estructuraMixta`}
                                                    checked={local.estructuraMixta}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraMetalicos_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Metálica:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`estructuraMetalicos_${local.id}`}
                                                    name={`estructuraMetalicos`}
                                                    checked={local.estructuraMetalicos}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraOtros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Otros:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`estructuraOtros_${local.id}`}
                                                    name={`estructuraOtros`}
                                                    checked={local.estructuraOtros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`estructuraAno_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-7"
                                                >
                                                    Año:
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`estructuraAno_${local.id}`}
                                                    name={`estructuraAno`}
                                                    value={local.estructuraAno}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="col-span-2 rounded text-sm h-5 text-start py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-16"
                                                />
                                            </div>
                                        </div>

                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Cubierta</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaHarmado_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    H.Armado:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaHarmado_${local.id}`}
                                                    name={`cubiertaHarmado`}
                                                    checked={local.cubiertaHarmado}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaLiviana_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Liviana:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaLiviana_${local.id}`}
                                                    name={`cubiertaLiviana`}
                                                    checked={local.cubiertaLiviana}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaCcielorraso_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    C/cielorraso:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaCcielorraso_${local.id}`}
                                                    name={`cubiertaCcielorraso`}
                                                    checked={local.cubiertaCcielorraso}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaBovedilla_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Bovedilla:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaBovedilla_${local.id}`}
                                                    name={`cubiertaBovedilla`}
                                                    checked={local.cubiertaBovedilla}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaTejas_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Tejas:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaTejas_${local.id}`}
                                                    name={`cubiertaTejas`}
                                                    checked={local.cubiertaTejas}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaPorteria_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Porteña:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaPorteria_${local.id}`}
                                                    name={`cubiertaPorteria`}
                                                    checked={local.cubiertaPorteria}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`cubiertaIsopanel_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Isopanel:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`cubiertaIsopanel_${local.id}`}
                                                    name={`cubiertaIsopanel`}
                                                    checked={local.cubiertaIsopanel}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                        </div>


                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Muros</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`ceramicosMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Cerámicos:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`ceramicosMuros_${local.id}`}
                                                    name={`ceramicosMuros`}
                                                    checked={local.ceramicosMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`bloquesMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Bloques:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`bloquesMuros_${local.id}`}
                                                    name={`bloquesMuros`}
                                                    checked={local.bloquesMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`maderaMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Madera:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`maderaMuros_${local.id}`}
                                                    name={`maderaMuros`}
                                                    checked={local.maderaMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`piedraMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Piedra:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`piedraMuros_${local.id}`}
                                                    name={`piedraMuros`}
                                                    checked={local.piedraMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`chapaMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Chapa:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`chapaMuros_${local.id}`}
                                                    name={`chapaMuros`}
                                                    checked={local.chapaMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`yesoMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Yeso:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`yesoMuros_${local.id}`}
                                                    name={`yesoMuros`}
                                                    checked={local.yesoMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`isopanelMuros_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Isopanel:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`isopanelMuros_${local.id}`}
                                                    name={`isopanelMuros`}
                                                    checked={local.isopanelMuros}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                        </div>



                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Pisos</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosParquet_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Parquet:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosParquet_${local.id}`}
                                                    name={`pisosParquet`}
                                                    checked={local.pisosParquet}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosTabla_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Tabla:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosTabla_${local.id}`}
                                                    name={`pisosTabla`}
                                                    checked={local.pisosTabla}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosMonolitico_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Monolítico:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosMonolitico_${local.id}`}
                                                    name={`pisosMonolitico`}
                                                    checked={local.pisosMonolitico}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosCalcareas_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Calcáreas:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosCalcareas_${local.id}`}
                                                    name={`pisosCalcareas`}
                                                    checked={local.pisosCalcareas}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosCeramico_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Cerámico:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosCeramico_${local.id}`}
                                                    name={`pisosCeramico`}
                                                    checked={local.pisosCeramico}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosPortland_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Portland:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosPortland_${local.id}`}
                                                    name={`pisosPortland`}
                                                    checked={local.pisosPortland}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pisosMoquette_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Moquette:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pisosMoquette_${local.id}`}
                                                    name={`pisosMoquette`}
                                                    checked={local.pisosMoquette}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                        </div>



                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Revestimientos</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosAzulBcoB_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Azul. Bco:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosAzulBcoB_${local.id}`}
                                                    name={`revestimientosAzulBcoB`}
                                                    checked={local.revestimientosAzulBcoB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosAzulBcoC_${local.id}`}
                                                    name={`revestimientosAzulBcoC`}
                                                    checked={local.revestimientosAzulBcoC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosAzulColorB_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Azul. Color:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosAzulColorB_${local.id}`}
                                                    name={`revestimientosAzulColorB`}
                                                    checked={local.revestimientosAzulColorB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosAzulColorC_${local.id}`}
                                                    name={`revestimientosAzulColorC`}
                                                    checked={local.revestimientosAzulColorC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosCeramicaB_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Cerámica:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosCeramicaB_${local.id}`}
                                                    name={`revestimientosCeramicaB`}
                                                    checked={local.revestimientosCeramicaB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosCeramicaC_${local.id}`}
                                                    name={`revestimientosCeramicaC`}
                                                    checked={local.revestimientosCeramicaC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosPorcelanatoB_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Porcelanato:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosPorcelanatoB_${local.id}`}
                                                    name={`revestimientosPorcelanatoB`}
                                                    checked={local.revestimientosPorcelanatoB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosPorcelanatoC_${local.id}`}
                                                    name={`revestimientosPorcelanatoC`}
                                                    checked={local.revestimientosPorcelanatoC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosEstucoB_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Estuco:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosEstucoB_${local.id}`}
                                                    name={`revestimientosEstucoB`}
                                                    checked={local.revestimientosEstucoB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosEstucoC_${local.id}`}
                                                    name={`revestimientosEstucoC`}
                                                    checked={local.revestimientosEstucoC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revestimientosOtrosBs_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-24"
                                                >
                                                    Otros:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosOtrosB_${local.id}`}
                                                    name={`revestimientosOtrosB`}
                                                    checked={local.revestimientosOtrosB}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                                <input
                                                    type="checkbox"
                                                    id={`revestimientosOtrosC_${local.id}`}
                                                    name={`revestimientosOtrosC`}
                                                    checked={local.revestimientosOtrosC}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                        </div>



                                        <div className="break-inside-avoid bg-white p-1 rounded-md">
                                            <h6 className="text-lg text-green-900">Terminación</h6>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`revoqueTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Revoque:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`revoqueTerminacion_${local.id}`}
                                                    name={`revoqueTerminacion`}
                                                    checked={local.revoqueTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`enduidoTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Enduido:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`enduidoTerminacion_${local.id}`}
                                                    name={`enduidoTerminacion`}
                                                    checked={local.enduidoTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`calTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Cal:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`calTerminacion_${local.id}`}
                                                    name={`calTerminacion`}
                                                    checked={local.calTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pintAguaTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Pint. Agua:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pintAguaTerminacion_${local.id}`}
                                                    name={`pintAguaTerminacion`}
                                                    checked={local.pintAguaTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`pintAceiteTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Pint. Aceite:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`pintAceiteTerminacion_${local.id}`}
                                                    name={`pintAceiteTerminacion`}
                                                    checked={local.pintAceiteTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`empapeladoTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Empapelado:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`empapeladoTerminacion_${local.id}`}
                                                    name={`empapeladoTerminacion`}
                                                    checked={local.empapeladoTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <label
                                                    htmlFor={`lambrizTerminacion_${local.id}`}
                                                    className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                                >
                                                    Lambriz:
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`lambrizTerminacion_${local.id}`}
                                                    name={`lambrizTerminacion`}
                                                    checked={local.lambrizTerminacion}
                                                    onChange={(e) => handleInputChange(e, local.id)}
                                                    className="form-checkbox h-4 w-4 text-green-900 md:w-1/7"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                )
                            ))}
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
                                            htmlFor="celosiasCerramientos"
                                            className="text-sm text-gray-700 font-bold mr-2 md:w-20"
                                        >
                                            Celosías:
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="celosiasCerramientos"
                                            name="celosiasCerramientos"
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

                        <div className="col-span-7 border p-2 rounded space-y-2 max-h-40 overflow-y-auto">
                            <h4 className="text-xl text-green-900">Metraje Obra Civil</h4>
                            <div className="grid grid-cols-2 gap-4 ">
                                <div className="break-inside-avoid bg-white p-1 rounded-md">
                                    <h6 className="text-lg text-green-900">Propiedad Comun</h6>
                                    <div className="flex flex-col space-y-2 ">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="superficieCubierta"
                                                className="text-sm text-gray-700 font-bold mr-2 w-44"
                                            >
                                                Superficie Cubierta:
                                            </label>
                                            <input
                                                type="number"
                                                id="superficieCubierta"
                                                name="superficieCubierta"
                                                onChange={handleInputChange}
                                                className="text-start text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m<sup>2</sup></span>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center">

                                            <label
                                                htmlFor="superficieSemiCubierta"
                                                className="text-sm text-gray-700 font-bold mr-2 w-44"
                                            >
                                                Superficie Semi Cubierta:
                                            </label>
                                            <input
                                                type="number"
                                                id="superficieSemiCubierta"
                                                name="superficieSemiCubierta"
                                                onChange={handleInputChange}
                                                className="text-start text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m<sup>2</sup></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="break-inside-avoid  p-1 rounded-md">
                                    <h6 className="text-lg text-green-900">Propiedad Horizontal</h6>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <label
                                                htmlFor="bienesPropios"
                                                className="text-sm text-gray-700 font-bold mr-2 w-44"
                                            >
                                                Bienes Propios:
                                            </label>
                                            <input
                                                type="number"
                                                id="bienesPropios"
                                                name="bienesPropios"
                                                onChange={handleInputChange}
                                                className="text-start text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m<sup>2</sup></span>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center">

                                            <label
                                                htmlFor="bienesComunes"
                                                className="text-sm text-gray-700 font-bold mr-2 w-44"
                                            >
                                                Bienes Comunes:
                                            </label>
                                            <input
                                                type="number"
                                                id="bienesComunes"
                                                name="bienesComunes"
                                                onChange={handleInputChange}
                                                className="text-start text-sm rounded py-1 px-2 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 w-20"
                                            />
                                            <span className="ml-2 text-gray-700">m<sup>2</sup></span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 border p-2 rounded space-y-2 max-h-40 overflow-y-auto">
                            <h4 className="text-xl text-green-900">Observaciones</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="break-inside-avoid bg-white p-1 rounded-md">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <textarea
                                                className="w-full h-24 p-1 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                                placeholder="Escriba sus observaciones aquí..."
                                                id="observaciones"
                                                name="observaciones"
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
                        >
                            Crear Inspección
                        </button>
                    </div>
                </div>
            </form>
            <CustomModalAdd
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                idInspeccion={provisionalInspectionId}
                initialFormData={currentLocal || {}}
                onSave={handleSaveLocal}

            />

        </div>


    );
}


export default Inspeccion;


function initialInspeccionState(usuario) {

    console.log('initialInspeccionState usuario ', usuario);

    return {
        avaluador: '',
        fechaAvalador: '',
        tasador: usuario || null,
        banco: '',
        solicitante: '',
        departamento: '',
        localidad: '',
        secJudicial: '',
        padron: '',
        calle: '',
        nro: '',
        unidad: '',
        piso: '',
        entreCalles: '',
        esquina: '',
        urbanoZona: false,
        suburbanoZona: false,
        ruralZona: false,
        balnearioZona: false,
        residencialZona: false,
        comercialZona: false,
        industrialZona: false,
        otrosZona: false,
        suntuosaZona: false,
        muyBuenaZona: false,
        buenaZona: false,
        economicaZona: false,
        modestaZona: false,
        compactaZona: false,
        mediaZona: false,
        pocoDensaZona: false,
        ralaZona: false,
        hormBituZona: false,
        balastroZona: false,
        oseZona: false,
        pozoZona: false,
        colectorZona: false,
        uteZona: false,
        antelZona: false,
        altoPredio: false,
        aNivelPredio: false,
        bajoPredio: false,
        irregularPredio: false,
        regularPredio: false,
        siPredio: false,
        noPredio: false,
        siPredioRetiro: false,
        noPredioRetiro: false,
        orientacionPredio: '',
        frentePredio: '',
        fondoPredio: '',
        supTotalPredio: '',
        estructuraHarmado: false,
        estructuraMuroPort: false,
        estructuraMixta: false,
        estructuraMetalicos: false,
        estructuraOtros: false,
        estructuraAno: '',
        cubiertaHarmado: false,
        cubiertaLiviana: false,
        cubiertaCcielorraso: false,
        cubiertaBovedilla: false,
        cubiertaTejas: false,
        cubiertaPorteria: false,
        cubiertaIsopanel: false,
        ceramicosMuros: false,
        bloquesMuros: false,
        maderaMuros: false,
        piedraMuros: false,
        chapaMuros: false,
        yesoMuros: false,
        isopanelMuros: false,
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
        comunCerramientos: false,
        aluminioCerramientos: false,
        pvcCerramientos: false,
        maderaCerramientos: false,
        otrosCerramientos: false,
        cortinasCerramientos: false,
        postigosCerramientos: false,
        celosiasCerramientos: false,
        rejasCerramientos: false,
        aguaBanoCaliente: false,
        aguaBanoFria: false,
        aguaCocinaFria: false,
        aguaCocinaCaliente: false,
        electricidadEmbutida: false,
        electricidadExterior: false,
        electricidadMixta: false,
        electricidadInstGas: false,
        sanitariaColector: false,
        sanitariaCamSeptica: false,
        sanitariaPozoNegro: false,
        termicasLosaRad: false,
        termicasRadiadores: false,
        termicasPanelElect: false,
        termicasAireAcond: false,
        termicasOtros: false,
        superficieCubierta: '',
        superficieSemiCubierta: '',
        bienesPropios: '',
        bienesComunes: '',
        observaciones: '',
        casaConsideraciones: false,
        casaPhConsideraciones: false,
        apartamentoConsideraciones: false,
        localComercialConsideraciones: false,
        otrosConsideraciones: false,
        cantIdadPisosConsideraciones: false,
        aptosPisoConsideraciones: false,
        ascensoresConsideraciones: false,
        portElectConsideraciones: false,
    };
}