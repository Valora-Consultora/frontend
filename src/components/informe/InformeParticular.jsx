import React, { useState, useRef } from "react";
import ParticularLogo from "../../images/logo-particular.png";
import CheckboxGroup from '../../components/CheckboxGroup';
import ComparableSection from "../comparables/ComparableSection";
import ComparableList from "../comparables/ComparableList";
import InformeHsbcService from "../../api/InformeHsbcService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComparablesService from "../../api/ComparablesService";

const FormularioParticular = () => {
  const formRef = useRef();

  const [comparableFilters, setComparableFilters] = useState({});
  const [comparablePage, setComparablePage] = useState(1);

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
    setFormData((prevData) => ({
      ...prevData,
      comparables: prevData.comparables.map((comparable) =>
        comparable.id === id ? { ...comparable, selected: !comparable.selected } : comparable
      ),
    }));
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
    //console.log(object);
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
    //console.log('Modificando filtro:', id, value, opts)
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

    //console.log('Seteando filtro:', newFilter);

    setComparableFilters((prevFilters) => ({
      ...prevFilters,
      [id]: { ...prevFilters[id], ...newFilter },
    }));

    //console.log(filterToUrlParams(comparableFilters));
  };

  const handleComparableSubmit = async () => {
    try {
      const comparables = await ComparablesService.getComparables(filterToUrlParams(comparableFilters));
      setFormData((prevData) => ({
        ...prevData,
        comparables: comparables.results,
      }));
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Simulando una llamada a API
      const informe = await InformeHsbcService.createInformeHsbc(formData);
      // Aquí iría la lógica real para enviar los datos a una API
      //console.log("Form Data:", formData);

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

  return (
    <div className="bg-gray-100">
      <h2 className="text-center text-2xl font-medium text-green-900 mx-auto my-10">
        VALUACIÓN ACTIVO INMOBILIARIO
        <span>
          <img
            src={ParticularLogo}
            alt="Scotiabank"
            className="h-20 inline-block ml-4"
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
                  </div>
                </div>
              </div>

              {/* Comparable */}
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
              <div className="col-span-12 text-center">
                <button
                  type="submit"
                  className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
                >
                  Crear Informe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
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

export default FormularioParticular;
