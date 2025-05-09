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
import CalculoInforme from "../calculo/CalculoInforme";
import { useLocation, useNavigate } from 'react-router-dom';
import { exportScotiaToExcel } from "../utils/excelExport.ts";

import Excel from '../../images/icons/excel.svg';
import { ChevronLeft, ChevronRight, DeleteRounded } from "@mui/icons-material";



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
  const [getCalculoData, setGetCalculoData] = useState(null);
  const navigate = useNavigate();

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
    fotosColumnas: preloadInforme.fotosColumnas ?? 3,
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
      //console.log('Checkbox modificado:', name, value, checked);
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      //console.log('File modificado:', name, files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], ...files],
      }));
    } else {
      //console.log('Field modificado:', name, value);
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

  /// Dado un filtro de comparables, lo convierte a una URL scrappeable
  // Si object.pathParam === true, entonces se agrega el valor como un path param
  // Si no, se agrega como un query param
  const filterToScrappingUrl = (filter) => {
    var urlSuffixPath = "";
    var urlSuffixParams = "";
    for (const key in filter) {
      const object = filter[key];
      if (object.pathParam === true) {
        urlSuffixPath += "/" + object.value;
      } else {
        urlSuffixParams += "_" + key + "_" + (object.range ? parseRange(key, object) : object.value);
      }
    }
    return urlSuffixPath + "/" + urlSuffixParams;
  };

  /// Parsear el rango para que quede en formato [value1-value2] con sus 
  /// respectivos subtipos, ej: { value: undefined, value2: 100, subtipo: m² }
  /// devolveria (*m²-200m²]
  const parseRange = (key, object) => {
    //console.log(object);
    var value = object.value;
    var value2 = object.value2;
    var subtype = object.subtype ?? "";

    // Increible que los locos de ML hayan puesto un formato especifico solo para
    // precios, pero bueno, aca estamos
    if (key === "price" || !object.adornments) {
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
    //console.log('Modificando filtro:', id, value, opts)
    var newFilter = {};

    if (opts?.range !== undefined) {
      newFilter.range = true;
    }

    if (opts?.range === 0 || !opts?.range) {
      if (value.includes("_PATH_")) {
        const [value1] = value.split("_PATH_");
        newFilter.value = value1;
        newFilter.pathParam = true;
      }
      newFilter.value = value;
    } else if (opts?.range === 1) {
      newFilter.value2 = value;
    }

    if (opts?.subtype) {
      newFilter.subtype = opts.subtype;
    }

    if (!newFilter.pathParam) {
      newFilter.pathParam = opts?.pathParam;
    }
    newFilter.adornments = opts?.adornments;

    //console.log('Seteando filtro:', newFilter);

    setComparableFilters((prevFilters) => ({
      ...prevFilters,
      [id]: { ...prevFilters[id], ...newFilter },
    }));

    //console.log(filterToUrlParams(comparableFilters));
  };

  const handleComparableSubmit = async () => {
    try {
      const comparables = await ComparablesService.getScrappedComparables(filterToScrappingUrl(comparableFilters));
      setComparables(comparables.data);
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
    console.log('Editando comparable:', comparable);
    setComparableEdit(comparable);
    //console.log(comparableEdit);
    setIsModalEditOpen(true);
  };

  const handleEditHomologation = (comparable) => {
    setComparableEdit(comparable);
    setIsModalHomologationOpen(true);
  };

  const handleThumbnailChange = (url, id) => {
    setFormData((prevData) => ({
      ...prevData,
      comparables: prevData.comparables.map((comparable) =>
        comparable.id === id ? { ...comparable, thumbnail: url } : comparable
      ),
    }));
  };

  const submitHandler = async (e, borrador = false) => {
    e.preventDefault();
    try {
      // Guardar cálculo si no es un borrador
      if (getCalculoData && !borrador) {
        try {
          const calculoData = getCalculoData();
          //console.log("Datos del cálculo a enviar:", calculoData);
          await InformeScotiaService.saveCalculo(provisionalInformeId, calculoData);
          //console.log("Cálculo guardado correctamente");
        } catch (error) {
          console.error("Error al guardar el cálculo:", error);
          const confirmar = window.confirm("Hubo un error al guardar los datos del cálculo. ¿Deseas continuar sin guardarlos?");
          if (!confirmar) {
            return;
          }
        }
      }

      // Continuar con el envío del informe
      formData.estadoInforme = borrador ? "BORRADOR" : "PENDIENTE";
      const informe = await InformeScotiaService.createInformeScotia(provisionalInformeId, formData);
      
      toast.success("Formulario enviado exitosamente", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/home');
    }, 3000);
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

  const moveLeft = (index) => {
    const newFotos = formData.fotos;

    const foto = newFotos[index]
    newFotos[index] = newFotos[index - 1]
    newFotos[index - 1] = foto;

    setFormData((prevData) => ({
      ...prevData,
      fotos: newFotos,
    }))
  }

  const moveRight = (index) => {
    const newFotos = formData.fotos;

    const foto = newFotos[index]
    newFotos[index] = newFotos[index + 1]
    newFotos[index + 1] = foto;

    setFormData((prevData) => ({
      ...prevData,
      fotos: newFotos,
    }))
  }

  const FileUploadSection = ({ title, name, accept, files, onRemove, swappable }) => (
    <div className="col-span-12 space-y-4 rounded">
      <h4 className="text-xl text-green-900">{title}</h4>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12">
          <div className="flex flex-row items-center">
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
              className="cursor-pointer bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-4"
            >
              Subir {name === "fotos" ? "Fotos" : "Archivos"}
            </label>
            {swappable && <><label
              htmlFor="columns"
              className="col-span-2 text-sm text-gray-700 font-bold mr-2"
            >
              Columnas:
            </label>
            <input
              type="number"
              min="1"
              max="6"
              id="fotosColumnas"
              name="fotosColumnas"
              value={formData.fotosColumnas}
              onChange={handleInputChange}
              className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
            /></>}
          </div>
          <div className={`mt-4 grid grid-cols-${formData.fotosColumnas} gap-4`}>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-h-48 justify-center bg-gray-100 rounded overflow-clip group"
              >
                <div className="relative">
                  <img src={URL.createObjectURL(file)} alt="Thumbnail" className={`object-fit ${swappable ? 'group-hover:blur-sm' : ''}`} />
                  {swappable && <><button 
                    onClick={() => moveLeft(index)}
                    className={`text-5xl absolute ${index !== 0 ? 'group-hover:block' : ''} hidden top-1/2 -translate-y-1/2`}
                  >
                    <ChevronLeft sx={{ stroke: "#000000" }} fontSize="inherit" className="text-white" />
                  </button>
                  <button
                    onClick={() => onRemove(name, index)}
                    className="text-red-400 text-4xl hover:text-red-800 font-bold absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <DeleteRounded sx={{ stroke: "#000000", strokeWidth: 0.8 }} fontSize="inherit" />
                  </button>
                  <button 
                    onClick={() => moveRight(index)}
                    className={`text-5xl absolute hidden ${index !== files.length - 1 ? 'group-hover:block' : ''} top-1/2 right-0 -translate-y-1/2`}
                  >
                    <ChevronRight sx={{ stroke: "#000000" }} fontSize="inherit" className="text-white" />
                  </button></>}
                  {/* <button  */}
                </div>
                {/* <span className="truncate">{file.name}</span> */}
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const handleSaveComparable = (comparable) => {
    if (comparableEdit) {
      setFormData((prevData) => ({
        ...prevData,
        comparables: prevData.comparables.map((comp) =>
          comp.id === comparableEdit.id ? { ...comp, ...comparable } : comp
        ),
      }));
    } else {
      comparable.id = crypto.randomUUID();
      setFormData((prevData) => ({
        ...prevData,
        comparables: [...prevData.comparables, comparable],
      }));
    }
    setComparableEdit(null);
    setIsModalEditOpen(false);
  }


  /****************CALCULO************************/

  const configuracionScotia = {
    nombreBanco: 'Scotia',
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
              <img
                src={Excel}
                onClick={async () => await exportScotiaToExcel(formData)}
                className="cursor-pointer"
              />
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
                      swappable={true}
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
                        handleThumbnailChange={handleThumbnailChange}
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
            <CalculoInforme
              configuracion={configuracionScotia}
              superficieTerreno={formData.supPredio}
              onGetCalculoData={(fn) => setGetCalculoData(() => fn)}
              comparables=""
              bienesPropios=""
              bienesComunes=""
              estadoConservacion=""
              categoria=""
              anioConstruccion=""
              deslindeFrente=""  // ✅ Agregar frente
              deslindeFondo=""    // ✅ Agregar fondo
            />
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
    </div>
  );
};

const ModalComparable = ({ isModalEditOpen, setIsModalEditOpen, comparableEdit, handleSaveComparable }) => {
  const [comparable, setComparable] = useState(comparableEdit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'direccion') {
      setComparable({ ...comparable, location: { ...(comparable?.location ?? {}), address_line: value } })
    }
    else if (name === 'titulo') {
      setComparable({ ...comparable, title: value })
    }
    else if (name === 'precio') {
      setComparable({ ...comparable, price: value })
    } else {
      setComparable({...comparable, [name]: value })
    }
    
  }

  //console.log('Viendo comp', comparable)

  return <Modal
    isOpen={isModalEditOpen}
    onRequestClose={() => setIsModalEditOpen(false)}
    contentLabel="Editar comparable"
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-gray-100 w-2/5 rounded-lg">
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
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="proximo"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Proximo:
              </label>
              <input
                type="text"
                id="proximo"
                name="proximo"
                value={comparable?.proximo}
                defaultValue={comparable?.proximo}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="casi"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Casi:
              </label>
              <input
                type="text"
                id="casi"
                name="casi"
                value={comparable?.casi}
                defaultValue={comparable?.casi}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
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
                value={comparable?.localidad}
                defaultValue={comparable?.localidad}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
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
                value={comparable?.departamento}
                defaultValue={comparable?.departamento}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="dato"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Dato:
              </label>
              <input
                type="text"
                id="dato"
                name="dato"
                value={comparable?.dato}
                defaultValue={comparable?.dato}
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
                value={comparable?.ubicacion}
                defaultValue={comparable?.ubicacion}
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
              <input
                type="text"
                id="comodidades"
                name="comodidades"
                value={comparable?.comodidades}
                defaultValue={comparable?.comodidades}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="estado"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Estado:
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={comparable?.estado}
                defaultValue={comparable?.estado}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="fecha"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Fecha:
              </label>
              <input
                type="text"
                id="fecha"
                name="fecha"
                value={comparable?.fecha}
                defaultValue={comparable?.fecha}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="dolarPorMetrosCuadrados"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Dólar por m²:
              </label>
              <input
                type="text"
                id="dolarPorMetrosCuadrados"
                name="dolarPorMetrosCuadrados"
                value={comparable?.dolarPorMetrosCuadrados}
                defaultValue={comparable?.dolarPorMetrosCuadrados}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="superficieTerreno"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Superficie Terreno:
              </label>
              <input
                type="text"
                id="superficieTerreno"
                name="superficieTerreno"
                value={comparable?.superficieTerreno}
                defaultValue={comparable?.superficieTerreno}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="superficieEdificada"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Superficie Edificada:
              </label>
              <input
                type="text"
                id="superficieEdificada"
                name="superficieEdificada"
                value={comparable?.superficieEdificada}
                defaultValue={comparable?.superficieEdificada}
                onChange={handleInputChange}
                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="observaciones"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Observaciones:
              </label>
              <input
                type="text"
                id="observaciones"
                name="observaciones"
                value={comparable?.observaciones}
                defaultValue={comparable?.observaciones}
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

const ModalHomologacion = ({isModalHomologationOpen, setIsModalHomologationOpen, handleInputChange}) => {
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

export default InformeScotia;
