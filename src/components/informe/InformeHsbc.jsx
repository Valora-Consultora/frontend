import React, { useState, useRef } from "react";
import Modal from "react-modal";

import HsbcLogo from "../../images/logo-hsbc.png";
import CheckboxGroup from '../../components/CheckboxGroup';
import ComparableSection from "../comparables/ComparableSection";
import ComparableList from "../comparables/ComparableList";
import SelectedComparableList from "../comparables/SelectedComparableList";
import InformeHsbcService from "../../api/InformeHsbcService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComparablesService from "../../api/ComparablesService";
import CalculoInforme from "../calculo/CalculoInforme";
import { exportToExactExcelTemplateExcelJS } from "../utils/excelExport.ts";

import Excel from '../../images/icons/excel.svg';

const FormularioHsbc = () => {
  const formRef = useRef();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalHomologationOpen, setIsModalHomologationOpen] = useState(false);

  const [comparableFilters, setComparableFilters] = useState({});
  const [comparables, setComparables] = useState([]);
  const [comparablePage, setComparablePage] = useState(1);
  const [getCalculoData, setGetCalculoData] = useState(null);
  const [comparableEdit, setComparableEdit] = useState(null);

  const [shownComparablesML, setShownComparablesML] = useState(true);

  const [formData, setFormData] = useState({
    /// Información General
    solicitante: "",
    banco: "", // Es necesario? Siempre sera HSBC?
    contactoSolicitante: "",
    contactoBanco: "",
    telefonos: "", // Puede haber mas de uno?
    sucursal: "",
    calle: "",
    esquina: "",
    localidad: "",
    numero: "",
    seccionJudicial: "",
    departamento: "",
    unidad: "",
    padron: "",

    /// Aspectos urbanos
    identificacionCatastral: [], // Unico?
    caracteristicas: [],
    densidad: [], // Unico?
    servicios: [],
    indiceCrecimiento: [], // Unico?
    oferta: [], // Unico?
    descripcionZona: "",
    /// Descripcion del predio
    topografia: "",
    forma: "",
    retiros: [], // Unico?
    // Deslinde
    deslindeFrente: "",
    deslindeFondo: "",
    descripcionPredio: "",
    entornoUrbano: "", // TODO: FOTO

    /// Descripcion del bien
    // Comodidades - ambiente
    livingComedor: 0,
    cocina: 0,
    dormitorio: 0,
    banio: 0, // ñ?
    escritorio: 0,
    toilette: 0,
    terraza: 0,
    garajeBox: 0,
    // Consideraciones
    categorizacion: "",
    conservacion: "",
    // Caracteristicas constructivas
    estructura: [],
    cubierta: [],
    carpinteria: [],
    muros: [],
    terminaciones: [],
    revestimientos: [],
    pisos: [],
    // Servicios - instalaciones
    instalacionAgua: [],
    instalacionSanitaria: [],
    instalacionElectrica: [],
    instalacionTermica: [],
    // Relevamiento fotografico
    superficieTerreno: "",
    //   Ver como colocar estos, tenemos que obtenerlos de la lista de cosas que coloco
    bienesPropios: [],
    bienesComunes: [],
    superficieEdificada: "",
    anio: "",
    vistaExterior: "", // FOTO
    vistasInteriores: [], // FOTOS
    // TODO: COMPARABLES
    comparables: [],

    /// Calculo de avaluo
    // ...
    descripcion: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectedComparable = (id) => {
    const comparable = comparables.find((comparable) => comparable.id === id);
    if (comparable.selected) {
      setComparables((prevComparables) =>
        prevComparables.map((comparable) =>
          comparable.id === id ? { ...comparable, selected: false } : comparable
        )
      );
      setFormData((prevData) => ({
        ...prevData,
        comparables: prevData.comparables.filter((comparable) => comparable.id !== id),
      }));
    } else {
      setComparables((prevComparables) =>
        prevComparables.map((comparable) =>
          comparable.id === id ? { ...comparable, selected: true } : comparable
        )
      );
      setFormData((prevData) => ({
        ...prevData,
        comparables: [...prevData.comparables, comparable],
      }));
    }
  }

  const handleLoadMoreComparables = () => {
    setComparablePage((prevPage) => prevPage + 1);
  }

  /// Dado un filtro de comparables, lo convierte a una URL query string
  const filterToUrlParams = (filter) => {
    var urlParams = new URLSearchParams();
    for (const key in filter) {
      const object = filter[key];
      if (object.range) {
        urlParams.append(key, parseRange(key, object));
      } else {
        urlParams.append(key, object.value);
      }
    }
    return urlParams.toString();
  };

  /// Parsear el rango para que quede en formato [value1-value2] con sus 
  /// respectivos subtipos, ej: { value: undefined, value2: 100, subtipo: m² }
  /// devolveria (*m²-200m²]
  const parseRange = (key, object) => {
    console.log(object);
    var value = object.value;
    var value2 = object.value2;
    var subtype = object.subtype ?? "";

    // Increible que los locos de ML hayan puesto un formato especifico solo para
    // precios, pero bueno, aca estamos
    if (key === "price") {
      var rangeString = "";
      rangeString += value ? + value : "*";
      rangeString += subtype + "-";
      rangeString += value2 ? value2 + subtype : "*" + subtype;
    } else {
      var rangeString = "";
      rangeString += value ? "[" + value : "(*";
      rangeString += subtype + "-";
      rangeString += value2 ? value2 + subtype + "]" : "*" + subtype + ")";
    }
    return rangeString;
  };

  /// Funcion que handlea el cambio de un filtro comparable, lo lleva a un
  /// formato que pueda ser utilizado en la URL y lo setea en el estado
  const modifyFilter = (id, value, opts) => {
    console.log('Modificando filtro:', id, value, opts)
    var newFilter = {};

    if (opts?.range !== undefined) {
      newFilter.range = true;
    }

    if (opts?.range === 0 || !opts?.range) {
      newFilter.value = value;
    } else if (opts?.range === 1) {
      newFilter.value2 = value;
    }

    if (opts?.subtype) {
      newFilter.subtype = opts.subtype;
    }

    console.log('Seteando filtro:', newFilter);

    setComparableFilters((prevFilters) => ({
      ...prevFilters,
      [id]: { ...prevFilters[id], ...newFilter },
    }));

    console.log(filterToUrlParams(comparableFilters));
  };

  const handleComparableSubmit = async () => {
    try {
      const comparables = await ComparablesService.getComparables(filterToUrlParams(comparableFilters));
      comparables.results.map((result) => {
        result.selected = formData.comparables.some((comparable) => comparable.id === result.id);
        return result;
      });
      setComparables(comparables.results);
      setComparablePage(1);
    } catch (error) {
      toast.error("Error al obtener comparables.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSelectMainComparable = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      comparables: prevData.comparables.map((comparable) =>
        comparable.id === id ? { ...comparable, main: !comparable.main } : comparable
      ),
    }));
  };

  const configuracionHsbc = {
    nombreBanco: 'HSBC',
    factoresConservacion: [
      { label: 'Nuevo', factor: 1.00 },
      { label: 'Buen Estado', factor: 0.95 },
      { label: 'Necesita Mantenimiento', factor: 0.90 },
      { label: 'Necesita Reparaciones', factor: 0.90 },
    ],
    formulaFactorEdad: (anio) => {
      const anioActual = new Date().getFullYear();
      const edad = anioActual - anio;
      return Math.max(0.5, 1 - edad * 0.01);
    },
  };

  const handleEditComparable = (comparable) => {
    // const comparable = comparables.find((comparable) => comparable.id === id);
    setComparableEdit(comparable);
    console.log(comparableEdit);
    setIsModalEditOpen(true);
  };

  const handleEditHomologation = (comparable) => {
    setComparableEdit(comparable);
    setIsModalHomologationOpen(true);
  };


  // Modificación en submitHandler en InformeHsbc.jsx
  const submitHandler = async (e, borrador = false) => {
    e.preventDefault();
    try {
      // Guardar cálculo si existe la función getCalculoData y no es un borrador
      if (getCalculoData && !borrador) {
        try {
          const calculoData = getCalculoData();
          console.log("Datos del cálculo a enviar:", calculoData);

          // Verificar si hay un ID de informe válido antes de guardar el cálculo
          if (formData.id) {
            // Guardar los cálculos usando el servicio
            await InformeHsbcService.saveCalculo(formData.id, calculoData);

            // Actualizar valores en formData basados en cálculos
            setFormData(prevData => ({
              ...prevData,
              valorMercado: calculoData.valorMercado,
              valorVentaRapida: calculoData.valorVentaRapida,
              valorRemate: calculoData.valorRemate,
              costoReposicion: calculoData.costoReposicion
            }));
          } else {
            console.log("No hay ID de informe para guardar el cálculo. Se guardará después de crear el informe.");
          }
        } catch (error) {
          console.error("Error al obtener datos del cálculo:", error);
          const confirmar = window.confirm("Hubo un error al procesar los datos del cálculo. ¿Deseas continuar sin guardarlos?");
          if (!confirmar) {
            return;
          }
        }
      }

      // Establecer estado del formulario según si es borrador o no
      const dataToSend = {
        ...formData,
        estado: borrador ? "borrador" : "enviado"
      };

      // Enviar el formulario
      const informe = await InformeHsbcService.createInformeHsbc(dataToSend);

      // Si tenemos datos de cálculo y no se guardaron antes, guardarlos ahora con el ID del informe creado
      if (getCalculoData && !borrador && !formData.id && informe.id) {
        try {
          const calculoData = getCalculoData();
          await InformeHsbcService.saveCalculo(informe.id, calculoData);
        } catch (error) {
          console.error("Error al guardar cálculo después de crear informe:", error);
        }
      }

      toast.success("Formulario enviado exitosamente", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error al enviar el formulario.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSaveComparable = (comparable) => {
    console.log('Attempting to save', comparable)
    setFormData((prevData) => ({
      ...prevData,
      comparables: [...prevData.comparables, comparable],
    }));
    console.log(formData);
    setIsModalEditOpen(false);
  }

  return (
    <div className="bg-gray-100">
      <h2 className="text-center text-2xl font-medium text-green-900 mx-auto my-10">
        VALUACIÓN ACTIVO INMOBILIARIO
        <span>
          <img
            src={HsbcLogo}
            alt="Scotiabank"
            className="h-10 inline-block ml-4"
          />
        </span>
      </h2>
      <div ref={formRef}>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <img
              src={Excel}
              onClick={() => exportToExactExcelTemplateExcelJS(formData, 'hsbc')}
              className="cursor-pointer"
            />
            <div className="grid grid-cols-12 gap-4">
              {/* Información General */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Información General</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="solicitante" className="col-span-2 text-sm text-gray-700 font-bold">
                    Solicitante:
                  </label>
                  <input
                    type="text"
                    id="solicitante"
                    name="solicitante"
                    value={formData.solicitante}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="banco" className="col-span-2 text-sm text-gray-700 font-bold">
                    Banco:
                  </label>
                  <input
                    type="text"
                    id="banco"
                    name="banco"
                    value={formData.banco}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="sucursal" className="col-span-2 text-sm text-gray-700 font-bold">
                    Sucursal:
                  </label>
                  <input
                    type="text"
                    id="sucursal"
                    name="sucursal"
                    value={formData.sucursal}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="contactoSolicitante" className="col-span-2 text-sm text-gray-700 font-bold">
                    Contacto Solicitante:
                  </label>
                  <input
                    type="text"
                    id="contactoSolicitante"
                    name="contactoSolicitante"
                    value={formData.contactoSolicitante}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="contactoBanco" className="col-span-2 text-sm text-gray-700 font-bold">
                    Contacto Banco:
                  </label>
                  <input
                    type="text"
                    id="contactoBanco"
                    name="contactoBanco"
                    value={formData.contactoBanco}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="telefonos" className="col-span-2 text-sm text-gray-700 font-bold">
                    Teléfonos:
                  </label>
                  <input
                    type="text"
                    id="telefonos"
                    name="telefonos"
                    value={formData.telefonos}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="calle" className="col-span-2 text-sm text-gray-700 font-bold">
                    Calle:
                  </label>
                  <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="numero" className="col-span-2 text-sm text-gray-700 font-bold">
                    Número:
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="esquina" className="col-span-2 text-sm text-gray-700 font-bold">
                    Esquina:
                  </label>
                  <input
                    type="text"
                    id="esquina"
                    name="esquina"
                    value={formData.esquina}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="localidad" className="col-span-2 text-sm text-gray-700 font-bold">
                    Localidad:
                  </label>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="seccionJudicial" className="col-span-2 text-sm text-gray-700 font-bold">
                    Sección Judicial:
                  </label>
                  <input
                    type="text"
                    id="seccionJudicial"
                    name="seccionJudicial"
                    value={formData.seccionJudicial}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="departamento" className="col-span-2 text-sm text-gray-700 font-bold">
                    Departamento:
                  </label>
                  <input
                    type="text"
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="unidad" className="col-span-2 text-sm text-gray-700 font-bold">
                    Unidad:
                  </label>
                  <input
                    type="text"
                    id="unidad"
                    name="unidad"
                    value={formData.unidad}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="padron" className="col-span-2 text-sm text-gray-700 font-bold">
                    Padrón:
                  </label>
                  <input
                    type="text"
                    id="padron"
                    name="padron"
                    value={formData.padron}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>

              {/* Aspectos urbanos */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Aspectos urbanos</h4>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Identificación Catastral
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Urbana" },
                        { id: "Suburbana" },
                        { id: "Rural" },
                        { id: "Balneario" }
                      ]}
                      name="identificacionCatastral"
                      selectedValues={formData.identificacionCatastral}
                      onChange={handleInputChange}
                      idPrefix="catastral"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Características
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Residencial" },
                        { id: "Comercial" },
                        { id: "Industrial" },
                        { id: "Rural" }
                      ]}
                      name="caracteristicas"
                      selectedValues={formData.caracteristicas}
                      onChange={handleInputChange}
                      idPrefix="caracteristica"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Densidad
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Compacta" },
                        { id: "Media" },
                        { id: "Poco densa" },
                        { id: "Rala" },
                      ]}
                      name="densidad"
                      selectedValues={formData.densidad}
                      onChange={handleInputChange}
                      idPrefix="densidad"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Servicios
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Agua - OSE" },
                        { id: "Agua-otros" },
                        { id: "Alumbrado Público" },
                        { id: "Red eléctrica" },
                        { id: "Instalación de Gas" },
                        { id: "Saneamiento" },
                        { id: "Seguridad" },
                        { id: "Otros" },
                      ]}
                      name="servicios"
                      selectedValues={formData.servicios}
                      onChange={handleInputChange}
                      idPrefix="servicio"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Índice de Crecimiento
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Creciente" },
                        { id: "Estable" },
                        { id: "Decreciente" },
                        { id: "Variable" },
                      ]}
                      name="indiceCrecimiento"
                      selectedValues={formData.indiceCrecimiento}
                      onChange={handleInputChange}
                      idPrefix="indice"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="text-green-900 font-bold mb-3">
                      Oferta
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Escasa" },
                        { id: "Equilibrada" },
                        { id: "Exceso de Oferta" },
                        { id: "Exceso de Demanda" },
                      ]}
                      name="oferta"
                      selectedValues={formData.oferta}
                      onChange={handleInputChange}
                      idPrefix="oferta"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="descripcionZona" className="col-span-2 text-sm text-gray-700 font-bold">
                    Descripción de la Zona:
                  </label>
                  <input
                    type="text"
                    id="descripcionZona"
                    name="descripcionZona"
                    value={formData.descripcionZona}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>
              {/* Descripcion del predio */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción del predio</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-2 text-sm text-gray-700 font-bold">
                    Topografía:
                  </label>
                  <div className="col-span-10">
                    <div className="grid grid-cols-12">
                      {["Alto", "Bajo", "A nivel", "Inundable"].map((tipo, index) => (
                        <React.Fragment key={tipo}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900 col-span-1 mt-1"
                              id={`topografia${index + 1}`}
                              name="topografia"
                              value={tipo}
                              checked={formData.topografia === tipo}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-3">
                            <label
                              htmlFor={`topografia${index + 1}`}
                              className="text-gray-700 mr-2"
                            >
                              {tipo}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-2 text-sm text-gray-700 font-bold">
                    Forma:
                  </label>
                  <div className="col-span-10">
                    <div className="grid grid-cols-12">
                      {["Regular", "Irregular"].map((tipo, index) => (
                        <React.Fragment key={tipo}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900 col-span-1 mt-1"
                              id={`forma${index + 1}`}
                              name="forma"
                              value={tipo}
                              checked={formData.forma === tipo}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-3">
                            <label
                              htmlFor={`forma${index + 1}`}
                              className="text-gray-700 mr-2"
                            >
                              {tipo}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <label className="text-green-900 font-bold mb-3">
                      Retiros
                    </label>
                    <CheckboxGroup
                      options={[
                        { id: "Frontales" },
                        { id: "Laterales" },
                      ]}
                      name="retiros"
                      selectedValues={formData.retiros}
                      onChange={handleInputChange}
                      idPrefix="retiro"
                    />
                  </div>
                </div>

                <h5 className="text-lg text-green-900 mt-4">Deslinde</h5>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="deslindeFrente" className="col-span-2 text-sm text-gray-700 font-bold">
                    Frente:
                  </label>
                  <input
                    type="text"
                    id="deslindeFrente"
                    name="deslindeFrente"
                    value={formData.deslindeFrente}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="deslindeFondo" className="col-span-2 text-sm text-gray-700 font-bold">
                    Fondo:
                  </label>
                  <input
                    type="text"
                    id="deslindeFondo"
                    name="deslindeFondo"
                    value={formData.deslindeFondo}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="descripcionPredio" className="col-span-2 text-sm text-gray-700 font-bold">
                    Descripción del Predio:
                  </label>
                  <textarea
                    id="descripcionPredio"
                    name="descripcionPredio"
                    value={formData.descripcionPredio}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 min-h-32"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12">
                    {/* <FileUploadSection
                      title="Entorno Urbano"
                      name="entornoUrbano"
                      accept="image/*"
                      files={formData.entornoUrbano}
                      onRemove={handleRemoveFile}
                    /> */}
                  </div>
                </div>
              </div>

              {/* Descripcion del bien */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción del bien</h4>

                {/* Comodidades - ambiente */}
                <div className="space-y-4">
                  <h5 className="text-lg text-green-900">Comodidades - ambiente</h5>
                  <div className="grid grid-cols-12 gap-4">
                    {[
                      { id: "livingComedor", label: "Living Comedor" },
                      { id: "cocina", label: "Cocina" },
                      { id: "dormitorio", label: "Dormitorio" },
                      { id: "banio", label: "Baño" },
                      { id: "escritorio", label: "Escritorio" },
                      { id: "toilette", label: "Toilette" },
                      { id: "terraza", label: "Terraza" },
                      { id: "garajeBox", label: "Garaje/Box" }
                    ].map(item => (
                      <div key={item.id} className="col-span-3">
                        <label htmlFor={item.id} className="text-sm text-gray-700 font-bold">
                          {item.label}:
                        </label>
                        <input
                          type="number"
                          id={item.id}
                          name={item.id}
                          value={formData[item.id]}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consideraciones */}
                <div className="space-y-4">
                  <h5 className="text-lg text-green-900">Consideraciones</h5>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label className="col-span-2 text-sm text-gray-700 font-bold">
                      Categorización:
                    </label>
                    <div className="col-span-10">
                      <div className="grid grid-cols-12">
                        {["Modesta", "Económica", "Buena", "Muy buena", "Confortable", "Confortable con calefacción", "Muy confortable", "Suntuosa"].map((cat, index) => (
                          <React.Fragment key={cat}>
                            <div className="col-span-1">
                              <input
                                type="radio"
                                className="form-radio h-4 w-4 text-green-900 col-span-1 mt-1"
                                id={`categorizacion${index + 1}`}
                                name="categorizacion"
                                value={cat}
                                checked={formData.categorizacion === cat}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-3">
                              <label
                                htmlFor={`categorizacion${index + 1}`}
                                className="text-gray-700 mr-2"
                              >
                                {cat}
                              </label>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label className="col-span-2 text-sm text-gray-700 font-bold">
                      Conservación:
                    </label>
                    <div className="col-span-10">
                      <div className="grid grid-cols-12">
                        {["Demoler", "Malo", "Regular", "Bueno", "Muy bueno", "Excelente", "Ampliación", "En obra"].map((estado, index) => (
                          <React.Fragment key={estado}>
                            <div className="col-span-1">
                              <input
                                type="radio"
                                className="form-radio h-4 w-4 text-green-900 col-span-1 mt-1"
                                id={`conservacion${index + 1}`}
                                name="conservacion"
                                value={estado}
                                checked={formData.conservacion === estado}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor={`conservacion${index + 1}`}
                                className="text-gray-700 mr-2"
                              >
                                {estado}
                              </label>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caracteristicas constructivas */}
                <div className="space-y-4">
                  <h5 className="text-lg text-green-900">Características constructivas</h5>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Estructura
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Hormigón Armado" },
                          { id: "Muro portante" },
                          { id: "Mixta" },
                          { id: "Steel Framing" },
                        ]}
                        name="estructura"
                        selectedValues={formData.estructura}
                        onChange={handleInputChange}
                        idPrefix="estructura"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Cubierta
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Hormigón Armado" },
                          { id: "Liviana" },
                          { id: "Con cielorraso" },
                          { id: "Sin cielorraso" },
                        ]}
                        name="cubierta"
                        selectedValues={formData.cubierta}
                        onChange={handleInputChange}
                        idPrefix="cubierta"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Carpintería
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Madera" },
                          { id: "Hierro" },
                          { id: "Aluminio" },
                          { id: "Blindex" },
                        ]}
                        name="carpinteria"
                        selectedValues={formData.carpinteria}
                        onChange={handleInputChange}
                        idPrefix="carpinteria"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Muros
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Cerámicos" },
                          { id: "Bloques" },
                          { id: "Yeso" },
                          { id: "Steel Framing" },
                        ]}
                        name="muros"
                        selectedValues={formData.muros}
                        onChange={handleInputChange}
                        idPrefix="muros"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Terminaciones
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Revoque" },
                          { id: "Pintura al agua" },
                          { id: "Enduido" },
                          { id: "Ladrillo visto" },
                        ]}
                        name="terminaciones"
                        selectedValues={formData.terminaciones}
                        onChange={handleInputChange}
                        idPrefix="terminaciones"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Revestimientos
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Cerámicos" },
                          { id: "Azulejos" },
                          { id: "Estuco" },
                          { id: "Porcelanato" },
                        ]}
                        name="revestimientos"
                        selectedValues={formData.revestimientos}
                        onChange={handleInputChange}
                        idPrefix="revestimientos"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Pisos
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Flotantes" },
                          { id: "Cerámico" },
                          { id: "Porcelanato" },
                          { id: "Parquet" },
                          { id: "Moquette" },
                          { id: "Lajota" },
                          { id: "Vinílico" },
                          { id: "Piedra laja" },
                        ]}
                        name="pisos"
                        selectedValues={formData.pisos}
                        onChange={handleInputChange}
                        idPrefix="pisos"
                      />
                    </div>
                  </div>
                </div>

                {/* Servicios - instalaciones */}
                <div className="space-y-4">
                  <h5 className="text-lg text-green-900">Servicios - instalaciones</h5>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Instalación de Agua
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Baño" },
                          { id: "Cocina" },
                          { id: "Fria" },
                          { id: "Caliente" },
                        ]}
                        name="instalacionAgua"
                        selectedValues={formData.instalacionAgua}
                        onChange={handleInputChange}
                        idPrefix="instalacionAgua"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Instalación Sanitaria
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Colector" },
                          { id: "Cámara séptica" },
                          { id: "Pozo negro" },
                          { id: "Otros" },
                        ]}
                        name="instalacionSanitaria"
                        selectedValues={formData.instalacionSanitaria}
                        onChange={handleInputChange}
                        idPrefix="instalacionSanitaria"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Instalación Eléctrica
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Embutida" },
                          { id: "Exterior" },
                          { id: "Mixta" },
                          { id: "Otros" },
                        ]}
                        name="instalacionElectrica"
                        selectedValues={formData.instalacionElectrica}
                        onChange={handleInputChange}
                        idPrefix="instalacionElectrica"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="text-green-900 font-bold mb-3">
                        Instalación Térmica
                      </label>
                      <CheckboxGroup
                        options={[
                          { id: "Losa radiante" },
                          { id: "Aire acondicionado" },
                          { id: "Calefactores eléctricos" },
                          { id: "Estufa a leña" },
                        ]}
                        name="instalacionTermica"
                        selectedValues={formData.instalacionTermica}
                        onChange={handleInputChange}
                        idPrefix="instalacionTermica"
                      />
                    </div>
                  </div>
                </div>

                {/* Superficies y Año */}
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label htmlFor="superficieTerreno" className="col-span-2 text-sm text-gray-700 font-bold">
                      Superficie Terreno:
                    </label>
                    <input
                      type="text"
                      id="superficieTerreno"
                      name="superficieTerreno"
                      value={formData.superficieTerreno}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label htmlFor="superficieEdificada" className="col-span-2 text-sm text-gray-700 font-bold">
                      Superficie Edificada:
                    </label>
                    <input
                      type="text"
                      id="superficieEdificada"
                      name="superficieEdificada"
                      value={formData.superficieEdificada}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>{/* Comparable */}
                  <div className="col-span-12 space-y-4 border p-3 rounded">
                    <h4 className="text-xl text-green-900">Comparables</h4>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-12">
                        <p className="text-sm text-gray-700">
                          <ComparableSection
                            filters={comparableFilters}
                            modifyFilter={modifyFilter}
                            handleSubmit={handleComparableSubmit}
                          />
                          <ComparableList
                            handleSelectedComparable={handleSelectedComparable}
                            handleLoadMoreComparables={handleLoadMoreComparables}
                            handleSelectMainComparable={handleSelectMainComparable}
                            comparables={formData.comparables}
                            page={comparablePage}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <CalculoInforme
                  configuracion={configuracionHsbc}
                  superficieTerreno={formData.superficieTerreno}
                  onGetCalculoData={(fn) => setGetCalculoData(() => fn)}
                  comparables={formData.comparables}
                  bienesPropios={formData.bienesPropios}
                  bienesComunes={formData.bienesComunes}
                  estadoConservacion={formData.conservacion}
                  categoria={formData.categorizacion}
                  anioConstruccion={formData.anio}
                  deslindeFrente={formData.deslindeFrente}
                  deslindeFondo={formData.deslindeFondo}
                />
              </div>

              {/* Comparable */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <div className="flex flex-row justify-between items-center">
                  <h4 className="text-xl text-green-900">Comparables MercadoLibre</h4>
                  <button
                    type="button"
                    onClick={() => setShownComparablesML(!shownComparablesML)}
                    className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {shownComparablesML ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div
                  className="grid grid-cols-12 gap-4 items-center transition-all duration-500 overflow-hidden"
                  style={{
                    maxHeight: shownComparablesML ? `9000px` : "0px",
                  }}
                >
                  <div className="col-span-12">
                    <p className="text-sm text-gray-700">
                      <ComparableSection
                        filters={comparableFilters}
                        modifyFilter={modifyFilter}
                        handleSubmit={handleComparableSubmit}
                      />
                      <ComparableList
                        handleSelectedComparable={handleSelectedComparable}
                        handleLoadMoreComparables={handleLoadMoreComparables}
                        handleSelectMainComparable={handleSelectMainComparable}
                        comparables={comparables}
                        page={comparablePage}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Comparables Seleccionados</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12">
                    <p className="text-sm text-gray-700">
                      <SelectedComparableList
                        handleEditComparable={handleEditComparable}
                        handleEditHomologation={handleEditHomologation}
                        handleSelectMainComparable={handleSelectMainComparable}
                        comparables={formData.comparables}
                      />
                      <button
                        type="button"
                        className="bg-green-900 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-700"
                        onClick={() => {
                          setIsModalEditOpen(true);
                          setComparableEdit(null);
                        }}
                      >
                        Agregar Comparable
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center space-x-2">
                <button
                  type="submit"
                  className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6"
                >
                  Enviar Informe
                </button>
                <button
                  type="button"
                  className="bg-yellow-900 text-white px-4 py-2 rounded-md hover:bg-yellow-700 w-1/6"
                  onClick={(e) => submitHandler(e, true)}
                >
                  Guardar Borrador
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ModalComparable isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen} comparableEdit={comparableEdit} handleSaveComparable={handleSaveComparable} />
      <ModalHomologacion isModalHomologationOpen={isModalHomologationOpen} setIsModalHomologationOpen={setIsModalHomologationOpen} handleInputChange={handleInputChange} />
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
    </div >
  );
};

const ModalComparable = ({ isModalEditOpen, setIsModalEditOpen, comparableEdit, handleSaveComparable }) => {
  const [comparable, setComparable] = useState(comparableEdit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'direccion') {
      setComparable({ ...comparable, location: { ...(comparable?.location ?? {}), address_line: value } })
    }
    if (name === 'titulo') {
      setComparable({ ...comparable, title: value })
    }
    if (name === 'precio') {
      setComparable({ ...comparable, price: value })
    }
  }

  console.log('Viendo comp', comparable)

  return <Modal
    isOpen={isModalEditOpen}
    onRequestClose={() => setIsModalEditOpen(false)}
    contentLabel="Editar comparable"
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-gray-100 w-2/5 rounded-lg">
      {/* Editar comparable, campos: direccion, titulo, precio */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-4 border p-3 rounded">
            <h4 className="text-xl text-green-900">Modificar Datos de Comparable</h4>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="direccion"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Dirección:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={comparable?.location?.address_line}
                defaultValue={comparable?.location?.address_line}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="titulo"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Título:
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={comparable?.title}
                defaultValue={comparable?.title}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="precio"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Precio:
              </label>
              <input
                type="text"
                id="precio"
                name="precio"
                value={comparable?.price}
                defaultValue={comparable?.price}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-4 justify-center space-x-2">
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                handleSaveComparable(comparable)
              }}
              className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsModalEditOpen(false)}
              className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
}

const ModalHomologacion = ({ isModalHomologationOpen, setIsModalHomologationOpen, handleInputChange }) => {
  return <Modal
    isOpen={isModalHomologationOpen}
    onRequestClose={() => setIsModalHomologationOpen(false)}
    contentLabel="Editar homologación"
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-gray-100 w-2/5 rounded-lg">
      {/* Editar homologacion, campos: piso, ubicacion */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-4 border p-3 rounded">
            <h4 className="text-xl text-green-900">Homologación</h4>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="piso"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Piso:
              </label>
              <input
                type="text"
                id="piso"
                name="piso"
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="ubicacion"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Ubicación:
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center mt-4">
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsModalHomologationOpen(false)}
              className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsModalHomologationOpen(false)}
              className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

    </div>
  </Modal>;
}

export default FormularioHsbc;
