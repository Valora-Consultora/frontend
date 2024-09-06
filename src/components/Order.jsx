import React, { useState, useEffect, useRef } from "react";
import OrderService from "../api/OrderService";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Order() {
  //#region Variables de estado
  const defaulttasadorInspeccion = "default value";

  const [tasadorInspecciones, settasadorInspecciones] = useState([]);
  const [tasadorAntecedentes, setTasadorAntecedentes] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localidades, setlocalidades] = useState([]);
  const usuario = useSelector(state => state.user);
  const navigate = useNavigate();

  //const [tasadorInspeccion, settasadorInspeccion] = useState();

  //#region Información de la orden
  const [info, setInfo] = useState({
    // Datos generales de la orden
    nombreContacto: "", // Nombre de la orden de tasación
    fechaInspeccion: "", // Fecha de inspección
    horaInspeccion: "", // Hora de inspección
    //secretaria: null,
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
    console.log('usuario orden ', usuario);
    if (usuario && usuario.nombre) {
      console.log('ingresa en useEffect de usuario ')
      setInfo((prevInfo) => ({
        ...prevInfo,
        secretaria: usuario,
      }));
    }
  }, [usuario]);


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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
      //setLoading(true);
      
      console.log('info de la orden ', info);
      
      const response = await OrderService.createOrden(info);

      toast.success('Orden creada correctamente');
      
      setTimeout(() => {
        navigate('/home');
    }, 3000);
      // Aquí podrías agregar lógica adicional, como redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (error) {
      toast.error('Error al crear la orden');
      console.error("Error al crear orden:", error);
      // Aquí podrías manejar los errores y mostrar un mensaje al usuario
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
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
        CREAR ORDEN
      </h2>
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
          <div className="grid grid-cols-12 gap-4">
            {/* Orden de Tasación - 7 columns */}
            <div className="col-span-8 space-y-4 border p-3 rounded">
              <h4 className="text-xl text-green-900">Orden de Tasación</h4>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="fechaCreacion"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fechaCreacion"
                  name="fechaCreacion"
                  onChange={handleInputChange}
                  className="col-span-4 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-center"
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
                  className="col-span-5 rounded py-2 px-3 leading-tight border text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                >
                  <option value="">Seleccione un banco</option>
                  {bancos.map((banco) => (
                    <option key={banco.id} value={banco.id}>
                      {banco.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="titular"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Titular:
                </label>
                <input
                  type="text"
                  id="titular"
                  name="titular"
                  onChange={handleInputChange}
                  className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="nombreContacto"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombreContacto"
                  name="nombreContacto"
                  onChange={handleInputChange}
                  className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
                <label
                  htmlFor="telefonoContacto"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Teléfono:
                </label>
                <input
                  type="number"
                  id="telefonoContacto"
                  name="telefonoContacto"
                  onChange={handleInputChange}
                  className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="nombreSolicitante"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Contacto:
                </label>
                <input
                  type="text"
                  id="nombreSolicitante"
                  name="nombreSolicitante"
                  onChange={handleInputChange}
                  className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
                <label
                  htmlFor="telefonoSolicitante"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Teléfono:
                </label>
                <input
                  type="number"
                  id="telefonoSolicitante"
                  name="telefonoSolicitante"
                  onChange={handleInputChange}
                  className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>
            </div>
            {/* Inspección - 5 columns */}
            <div className="col-span-4 border p-3 rounded">
              <h4 className="mb-3 text-xl text-green-900">Inspección</h4>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="tasadorInspeccion"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Tasador:
                </label>
                <select
                  className="col-span-9 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
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
              <div className="grid grid-cols-1 gap-4 items-center mt-4">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <label
                    htmlFor="fechaInspeccion"
                    className="col-span-1 text-sm text-gray-700 font-bold"
                  >
                    Fecha:
                  </label>
                  <input
                    type="date"
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-center"
                    id="fechaInspeccion"
                    name="fechaInspeccion"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-6 gap-4 items-center">
                  <label
                    htmlFor="horaInspeccion"
                    className="col-span-1 text-sm text-gray-700 font-bold"
                  >
                    Hora:
                  </label>
                  <input
                    type="time"
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 text-center"
                    id="horaInspeccion"
                    name="horaInspeccion"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación del Inmueble */}
          <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-8 border p-3 rounded">
              <h4 className="text-xl text-green-900 mb-4">
                Ubicación del Inmueble
              </h4>
              <div className="grid grid-cols-12 gap-4 items-center">
                <label
                  htmlFor="calle"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Calle:
                </label>
                <input
                  type="text"
                  className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="calle"
                  name="calle"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="esquina"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Esquina:
                </label>
                <input
                  type="text"
                  className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="esquina"
                  name="esquina"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="nroPuerta"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Nro:
                </label>
                <input
                  type="number"
                  className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="nroPuerta"
                  name="nroPuerta"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-12 gap-4 items-center mt-4">
                <label
                  htmlFor="unidad"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Unidad:
                </label>
                <input
                  type="number"
                  className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="unidad"
                  name="unidad"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="padron"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Padrón:
                </label>
                <input
                  type="text"
                  className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="padron"
                  name="padron"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="block"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Block:
                </label>
                <input
                  type="text"
                  className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="block"
                  name="block"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="solar"
                  className="col-span-1 text-sm text-gray-700 font-bold"
                >
                  Solar:
                </label>
                <input
                  type="text"
                  className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="solar"
                  name="solar"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-12 gap-4 items-center mt-4">
                <label
                  htmlFor="departamento"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Departamento:
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  onChange={handleInputChange}
                  className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                >
                  <option value="">Seleccione un departamento</option>
                  {departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.id}>
                      {departamento.nombre}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="localidad"
                  className="col-span-2 text-sm text-gray-700 font-bold"
                >
                  Localidad:
                </label>
                <input
                  type="text"
                  className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  id="localidad"
                  name="localidad"
                  onChange={handleInputChange}
                />
{/*                 <select
                  id="localidad"
                  name="localidad"
                  onChange={handleInputChange}
                  className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                >
                  <option value="">Seleccione una localidad</option>
                  {localidades.map((localidad) => (
                    <option key={localidad.id} value={localidad.id}>
                      {localidad.nombre}
                    </option>
                  ))}
                </select> */}
              </div>
              <div className="">
                <div className="flex flex-col space-y-4">
                  <h4 className="text-xl text-green-900 mt-5">Observaciones</h4>
                  <textarea
                    className="w-full h-40 p-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    placeholder="Escriba sus observaciones aquí..."
                    id="observacion"
                    name="observacion"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Tipo de Trabajo, Recaudos, Antecedentes, Sucursal - Oficial */}
            <div className="col-span-4 border p-3 rounded">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <h4 className="text-xl text-green-900">Tipo de Trabajo</h4>
                  <div className="grid grid-cols-12 gap-4 mr-3">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-900 col-span-1 mt-1"
                        id="tasacion"
                        name="tasacion"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-5">
                      <label htmlFor="tasacion" className="text-gray-700 mr-2">
                        Tasación
                      </label>
                    </div>
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-900 col-span-1 mt-1"
                        id="retasacion"
                        name="retasacion"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-5">
                      <label
                        htmlFor="retasacion"
                        className="text-gray-700 ml-4 mr-2"
                      >
                        Retasación
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-span-12">
                  <h4 className="text-xl text-green-900 mt-2">Recaudos</h4>
                  <div className="grid grid-cols-12 gap-4 mr-3">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 mt-1"
                        id="enInspeccion"
                        name="enInspeccion"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-5">
                      <label
                        htmlFor="enInspeccion"
                        className="text-gray-700 mr-2"
                      >
                        En Inspección
                      </label>
                    </div>
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 mt-1"
                        id="enEstudio"
                        name="enEstudio"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-5">
                      <label
                        htmlFor="enEstudio"
                        className="text-gray-700 ml-4 mr-2"
                      >
                        En Estudio
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-span-12">
                  <h4 className="text-xl text-green-900 mt-2">Antecedentes</h4>
                  <div className="grid grid-cols-12 gap-4 items-center mt-2">
                    <label
                      htmlFor="fechaAntecedente"
                      className="col-span-4 text-sm text-gray-700 font-bold"
                    >
                      Fecha:
                    </label>
                    <input
                      type="date"
                      id="fechaAntecedente"
                      name="fechaAntecedente"
                      onChange={handleInputChange}
                      className="col-span-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900  text-center"
                    />
                    <label
                      htmlFor="tasadorAntecedenteId"
                      className="col-span-4 text-sm text-gray-700 font-bold"
                    >
                      Tasador:
                    </label>
                    <select
                      className="col-span-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
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

                <div className="col-span-12">
                  <h4 className="text-xl text-green-900">Sucursal - Oficial</h4>
                  <div className="grid grid-cols-12 gap-4 items-center mt-2">
                    <label
                      htmlFor="oficialBanco"
                      className="col-span-4 text-sm text-gray-700 font-bold"
                    >
                      Oficial del Banco:
                    </label>
                    <input
                      type="text"
                      className="col-span-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      id="oficialBanco"
                      name="oficialBanco"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center mt-3">
                    <label
                      htmlFor="sucursal"
                      className="col-span-4 text-sm text-gray-700 font-bold"
                    >
                      Sucursal:
                    </label>
                    <input
                      type="text"
                      id="sucursal"
                      name="sucursal"
                      onChange={handleInputChange}
                      className="col-span-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
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
              Crear Orden
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Order;
