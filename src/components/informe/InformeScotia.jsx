import React, { useState, useEffect, useRef } from "react";
import ScotiaLogo from "../../images/logo-scotia.png";
import { useSelector } from 'react-redux';
import Modal from "react-modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InformeScotiaService from "../../api/InformeScotiaService";
import ComparableSection from "../comparables/ComparableSection";
import ComparableList from "../comparables/ComparableList";
import SelectedComparableList from "../comparables/SelectedComparableList";
import ComparablesService from "../../api/ComparablesService";

const InformeScotia = () => {
  const formRef = useRef();
  const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
  const preloadInforme = useSelector(state => state.informe.informe);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalHomologationOpen, setIsModalHomologationOpen] = useState(false);

  const [comparableFilters, setComparableFilters] = useState({});
  const [comparables, setComparables] = useState([]);
  const [comparablePage, setComparablePage] = useState(1);
  const [comparableEdit, setComparableEdit] = useState(null);

  const [shownComparablesML, setShownComparablesML] = useState(true);

  const [formData, setFormData] = useState({
    /// Información General
    solicitante: preloadInforme.solicitante ?? "",
    oficial: preloadInforme.oficial ?? "",
    sucursal: preloadInforme.sucursal ?? "",
    titular: preloadInforme.titular ?? "",
    cedula: preloadInforme.cedula ?? "",
    direccion: preloadInforme.direccion ?? "",
    padron: preloadInforme.padron ?? "",
    localidad: preloadInforme.localidad ?? "",
    departamento: preloadInforme.departamento ?? "",
    /// Superficies
    supPredio: preloadInforme.supPredio ?? "",
    supConstruida: preloadInforme.supConstruida ?? "",
    comodidades: preloadInforme.comodidades ?? "",
    conservacion: preloadInforme.conservacion ?? "",
    /// Avalúo
    valorMercado: preloadInforme.valorMercado ?? "",
    valorVentaRapida: preloadInforme.valorVentaRapida ?? "",
    valorRemate: preloadInforme.valorRemate ?? "",
    costoReposicion: preloadInforme.costoReposicion ?? "",
    /// Relevamiento Fotográfico
    fotos: preloadInforme.fotos ?? [],
    /// Comparable
    comparables: preloadInforme.comparables ?? [],
    /// Anexos Gráficos o Catastrales
    anexos: preloadInforme.anexos ?? [],
    /// Seguro de Incendio
    seguroIncendio: preloadInforme.seguroIncendio ?? [],
    /// Observaciones
    observaciones: preloadInforme.observaciones ?? "",
  });

  useEffect(() => {
    function beforeUnloadHandler(e) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      console.log('Checkbox modificado:', name, value, checked);
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      console.log('File modificado:', name, files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], ...files],
      }));
    } else {
      console.log('Field modificado:', name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRemoveFile = (name, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index),
    }));
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

  const submitHandler = async (e, borrador = false) => {
    e.preventDefault();
    try {
      // Simulando una llamada a API
      formData.estado = borrador ? "borrador" : "enviado";
      const informe = await InformeScotiaService.createInformeScotia(provisionalInformeId, formData);
      // Aquí iría la lógica real para enviar los datos a una API
      console.log("Form Data:", formData);
      console.log("Form Data:", JSON.stringify(formData));

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

  const FileUploadSection = ({ title, name, accept, files, onRemove }) => (
    <div className="col-span-12 space-y-4 rounded">
      <h4 className="text-xl text-green-900">{title}</h4>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12">
          <input
            type="file"
            id={name}
            name={name}
            accept={accept}
            onChange={handleInputChange}
            multiple
            className="hidden"
          />
          <label
            htmlFor={name}
            className="cursor-pointer bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Subir {name === "fotos" ? "Fotos" : "Archivos"}
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => onRemove(name, index)}
                  className="ml-2 text-red-600 hover:text-red-800 font-bold"
                  aria-label="Eliminar archivo"
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
        VALUACIÓN INMUEBLE URBANO
        <span>
          <img
            src={ScotiaLogo}
            alt="Scotiabank"
            className="h-10 inline-block ml-4"
          />
        </span>
      </h2>
      <div ref={formRef}>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <div className="grid grid-cols-12 gap-4">
              {/* Información General */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Información General</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="solicitante"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
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
                  <label
                    htmlFor="oficial"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Oficial:
                  </label>
                  <input
                    type="text"
                    id="oficial"
                    name="oficial"
                    value={formData.oficial}
                    onChange={handleInputChange}
                    className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="sucursal"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Sucursal:
                  </label>
                  <input
                    type="text"
                    id="sucursal"
                    name="sucursal"
                    value={formData.sucursal}
                    onChange={handleInputChange}
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="titular"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Titular/es:
                  </label>
                  <input
                    type="text"
                    id="titular"
                    name="titular"
                    value={formData.titular}
                    onChange={handleInputChange}
                    className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="cedula"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    CI:
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
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
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="padron"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Padrón:
                  </label>
                  <input
                    type="text"
                    id="padron"
                    name="padron"
                    value={formData.padron}
                    onChange={handleInputChange}
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="localidad"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Localidad:
                  </label>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleInputChange}
                    className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="departamento"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Departamento:
                  </label>
                  <input
                    type="text"
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>

              {/* Superficies */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Superficies</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="supPredio"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Sup. Predio:
                  </label>
                  <input
                    type="text"
                    id="supPredio"
                    name="supPredio"
                    value={formData.supPredio}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="supConstruida"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Sup. Construida:
                  </label>
                  <input
                    type="text"
                    id="supConstruida"
                    name="supConstruida"
                    value={formData.supConstruida}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="comodidades"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Comodidades:
                  </label>
                  <textarea
                    id="comodidades"
                    name="comodidades"
                    value={formData.comodidades}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border min-h-32 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="conservacion"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Estado de Conservación:
                  </label>
                  <div className="col-span-10">
                    <div className="grid grid-cols-12">
                      {["Muy Bueno", "Bueno", "Aceptable", "Regular"].map(
                        (estado, index) => (
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
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Avalúo */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Avalúo</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="valorMercado"
                    className="col-span-3 text-sm text-gray-700 font-bold"
                  >
                    Valor de Mercado:
                  </label>
                  <input
                    type="text"
                    id="valorMercado"
                    name="valorMercado"
                    value={formData.valorMercado}
                    onChange={handleInputChange}
                    className="col-span-9 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="valorVentaRapida"
                    className="col-span-3 text-sm text-gray-700 font-bold"
                  >
                    Valor de Venta Rápida:
                  </label>
                  <input
                    type="text"
                    id="valorVentaRapida"
                    name="valorVentaRapida"
                    value={formData.valorVentaRapida}
                    onChange={handleInputChange}
                    className="col-span-9 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="valorRemate"
                    className="col-span-3 text-sm text-gray-700 font-bold"
                  >
                    Valor de Remate:
                  </label>
                  <input
                    type="text"
                    id="valorRemate"
                    name="valorRemate"
                    value={formData.valorRemate}
                    onChange={handleInputChange}
                    className="col-span-9 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="costoReposicion"
                    className="col-span-3 text-sm text-gray-700 font-bold"
                  >
                    Costo de Reposición a Nuevo:
                  </label>
                  <input
                    type="text"
                    id="costoReposicion"
                    name="costoReposicion"
                    value={formData.costoReposicion}
                    onChange={handleInputChange}
                    className="col-span-9 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>

              {/* Relevamiento Fotografico */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12">
                    <FileUploadSection
                      title="Relevamiento Fotográfico"
                      name="fotos"
                      accept="image/*"
                      files={formData.fotos}
                      onRemove={handleRemoveFile}
                    />
                  </div>
                </div>
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
                  className={`grid grid-cols-12 gap-4 items-center transition-all duration-500 overflow-hidden`}
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

              {/* Anexos Graficos o Catastrales */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12">
                    <FileUploadSection
                      title="Anexos Gráficos o Catastrales"
                      name="anexos"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      files={formData.anexos}
                      onRemove={handleRemoveFile}
                    />
                  </div>
                </div>
              </div>

              {/* Seguro de Incendio */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Seguro de Incendio</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <label
                      htmlFor="seguroIncendioA"
                      className="text-green-900 font-bold mb-3"
                    >
                      Grupo A
                    </label>
                    {[
                      {
                        id: "A1",
                        desc: "Edificios construidos totalmente de material (mampostería) con techo de Hormigón Armado",
                      },
                      {
                        id: "A2",
                        desc: "Edificios levantados con sistema constructivo Steel Framing.",
                      },
                      {
                        id: "A3",
                        desc: "Edificios de material con techo de Isopanel.",
                      },
                    ].map((item) => (
                      <div key={item.id} className="mb-2">
                        <input
                          type="checkbox"
                          id={`seguroIncendio${item.id}`}
                          name="seguroIncendio"
                          value={item.id}
                          checked={formData.seguroIncendio.includes(item.id)}
                          onChange={handleInputChange}
                          className="mr-2 h-4 w-4"
                        />
                        <span>
                          <label
                            htmlFor={`seguroIncendio${item.id}`}
                            className="text-green-900 font-bold"
                          >
                            {item.id}
                          </label>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="seguroIncendioB"
                      className="text-green-900 font-bold mb-3"
                    >
                      Grupo B
                    </label>
                    {[
                      {
                        id: "B1",
                        desc: "Edificios construidos totalmente de material (mampostería) con techo de chapa.",
                      },
                      {
                        id: "B2",
                        desc: "Edificios construidos con paredes de bloques, ladrillos o similar y techos livianos.",
                      },
                      {
                        id: "B3",
                        desc: "Galpones o tinglados con estructura metálica y cerramientos de chapa.",
                      },
                    ].map((item) => (
                      <div key={item.id} className="mb-2">
                        <input
                          type="checkbox"
                          id={`seguroIncendio${item.id}`}
                          name="seguroIncendio"
                          value={item.id}
                          checked={formData.seguroIncendio.includes(item.id)}
                          onChange={handleInputChange}
                          className="mr-2 h-4 w-4"
                        />
                        <span>
                          <label
                            htmlFor={`seguroIncendio${item.id}`}
                            className="text-green-900 font-bold"
                          >
                            {item.id}
                          </label>
                          <p className="text-sm text-gray-700">{item.desc}</p>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Observaciones</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    className="col-span-12 min-h-32 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center space-x-2">
              <button
                type="submit"
                className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
              >
                Enviar Informe
              </button>
              <button
                type="button"
                className="bg-yellow-900 text-white px-4 py-2 rounded-md hover:bg-yellow-700 w-1/6 "
                onClick={(e) => submitHandler(e, true)}
              >
                Guardar Borrador
              </button>
            </div>
          </div>
        </form>
      </div>
      <ModalComparable isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen} comparableEdit={comparableEdit} handleSaveComparable={handleSaveComparable} />
      <Modal
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
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
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
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
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
      </Modal>
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
    </div>
  );
};

const ModalComparable = ({ isModalEditOpen, setIsModalEditOpen, comparableEdit, handleSaveComparable }) => {
  const [comparable, setComparable] = useState(comparableEdit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'direccion') {
      setComparable({...comparable, location: { ...(comparable?.location ?? {}), address_line: value }})
    }
    if (name === 'titulo') {
      setComparable({...comparable, title: value})
    }
    if (name === 'precio') {
      setComparable({...comparable, price: value })
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

export default InformeScotia;
