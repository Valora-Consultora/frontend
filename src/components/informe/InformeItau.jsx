import React, { useState } from 'react';
import ItauLogo from "../../images/logo-itau.png";
import ComparableSection from "../comparables/ComparableSection";
import ComparableList from "../comparables/ComparableList";

import { ToastContainer, toast } from "react-toastify";
import ComparablesService from "../../api/ComparablesService";
import InformeItauService from '../../api/InformeItauService';

const FormularioItau = () => {
  const [comparableFilters, setComparableFilters] = useState({});
  const [comparables, setComparables] = useState([]);
  const [comparablePage, setComparablePage] = useState(1);

  const [formData, setFormData] = useState({
    /// INFORMACION SOBRE LA TASACION
    cliente: "",
    contacto: "",
    telefonoCliente: "",

    titular: "",
    ocupante: "",
    condicion: "",

    empresaTasadora: "",
    tasador: "",
    telefonoTasador: "",

    banco: "",
    sucursal: "",
    contactoBanco: "",
    telefonoContacto: "",

    direccion: "",

    calle: "",
    numero: "",
    piso: "",
    apartamento: "",

    padron: "",
    localidad: "",
    departamento: "",

    nomenclaturaCatastral: "",
    tipoPropiedad: "",
    fechaInspeccion: "",

    /// DESCRIPCION DE LA PROPIEDAD
    tipoConstruccion: "",
    anioConstruccion: "",

    superficieCubierta: 0,
    superficieSemicubierta: 0,
    superficieTerreno: 0,
    superficieEdificada: 0,

    calidadUbicacion: "", // Mala, Regular, Media, Buena, Excelente

    valorComercial: "", // Escaso, Regular, Normal, Bueno, Excelente

    tipoTecho: "",

    orientacion: "",
    luminosidad: "",

    detallesConstruccion: "", // Mala, Regular, Económico, Buena, Excelente

    calidadMantenimiento: "", // Malo, Regular, Medio, Bueno, Excelente

    detallesTerminacion: "", // Malo, Regular, Económico, Bueno, Excelente

    estacionamiento: "", // Garaje, Garaje semi-cubierto, Descubierto, No Posee, Otros

    caracteristicasActuales: "", // Residencial, Comercial, Industrial, Terreno, Otros

    destinoActual: "", // Específico, Múltiple
    aclaracionDestinoActual: "",

    destinoFuturo: "", // Específico, Múltiple
    aclaracionDestinoFuturo: "",

    // Cantidad de Ambientes de la Residencia
    cocheras: 0,
    cocinasComedores: 0,
    patiosInternos: 0,
    lavaderos: 0,

    porches: 0,
    dormitorios: 0,
    baniosServicios: 0,
    barbacoas: 0,

    estares: 0,
    banios: 0,
    depositos: 0,
    fondos: 0,

    // Comodidades de la Residencia
    doblesCirculaciones: 0,
    saunas: 0,
    gruposElectrogenos: 0,
    otrasComodidades: 0,

    // Cantidad de Ambientes de la Oficina Comercial / Local Comercial
    recepciones: 0,
    entrepisos: 0,
    baniosOficina: 0,
    otrosAmbientes: 0,

    salonesVentas: 0,
    salasReuniones: 0,
    depositosOficina: 0,
    totalAmbientes: 0,

    // Comodidades de planta industrial
    oficinas: 0,
    galponesElaboracion: 0,
    depositosIndustriales: 0,
    galerias: 0,

    serviciosHigienicos: 0,
    laboratorios: 0,
    camarasFrio: 0,
    accesos: 0,

    // Caracteristicas
    comentarios: "",

    // Servicios especiales de la propiedad
    calefaccion: "", // Central, Individual, Inexistente
    aireAcondicionado: "", // Central, Individual, Inexistente

    aguaCaliente: "", // Central, Individual, Inexistente
    otrosServicios: "",

    caracteristicasAdicionales: "",

    caracteristicasAdversas: "",

    observacionesConservacion: "",

    descripcionMejoras: "",

    /// DESCRIPCION DEL EDIFICIO DE DEPARTAMENTOS
    cantidadUnidades: 0,
    cantidadPisos: 0,
    mantenimientoAreaComun: "",

    estadoAreasComunes: "", // Mala, Regular, Promedio, Buena, Excelente

    ascensores: "", // Si, No
    servicioVigilancia: "", // Si, No

    descripcionComodidadesComunes: "",

    /// DESCRIPCION DEL TERRENO
    zonificacionJudicial: "",

    topografia: "",
    forma: "",
    vista: "",

    desague: "", // Adecuado, Inadecuado
    riesgoInundacion: "", // Significativo, Mínimo, No existe información

    estadoCallesAcceso: "", // Malo, Regular, Promedio, Bueno, Excelente

    // Servicios
    electricidad: "", // Pública, Privada, Sin Conexión
    gas: "", // Pública, Privada, Sin Conexión

    agua: "", // Pública, Privada, Sin Conexión
    telefono: "", // Pública, Privada, Sin Conexión
    cloaca: "", // Pública, Privada, Sin Conexión
    desaguePluvial: "", // Pública, Privada, Sin Conexión

    observacionesTerreno: "",

    /// DESCRIPCION DEL ENTORNO
    tipoEntorno: "", // Urbano, Suburbano, Rural
    construido: "", // Más del 75%, Entre 25-75%, Menos del 25%

    indiceCrecimiento: "", // Creciente, Estable, Decreciente
    servicioVigilancia: "", // Si, No

    valoresPropiedades: "", // Creciente, Estable, Decreciente
    ofertaDemanda: "", // Escasa, Equilibrada, Exceso de Oferta

    // Uso de los Terrenos (en %)
    usoResidencial: 0,
    usoComercial: 0,
    usoIndustrial: 0,
    sinUso: 0,
    otrosUsos: 0,

    cambiosPrincipalesUsoTerrenos: "", // Improbables, Probables, En Proceso

    valoresPropiedadesVecinasDesde: 0,
    valoresPropiedadesVecinasHasta: 0,

    antiguedadPropiedadesVecinasDesde: 0,
    antiguedadPropiedadesVecinasHasta: 0,

    caracteristicasZona: "",

    factoresComercializacion: "",

    obeservacionesCondicionesMercado: "",

    comparables: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission
      console.log(formData);
      const response = await InformeItauService.createInformeItau(formData);
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

  const handleSelectedComparable = (id) => {
    setComparables((prevComparables) =>
      prevComparables.map((comparable) => {
        if (comparable.id === id) {
          if (comparable.main) {
            return comparable;
          }
          return { ...comparable, selected: !comparable.selected };
        }
        return comparable;
      })
    );
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
    setComparables((prevComparables) =>
      prevComparables.map((comparable) =>
        comparable.id === id ? { ...comparable, main: !comparable.main } : comparable
      )
    );
  };

  // Options for radio inputs (same as before)
  const options = {
    calidadUbicacion: ['Mala', 'Regular', 'Media', 'Buena', 'Excelente'],
    valorComercial: ['Escaso', 'Regular', 'Normal', 'Bueno', 'Excelente'],
    // ... (rest of the options)
    detallesConstruccion: ['Mala', 'Regular', 'Económico', 'Buena', 'Excelente'],
    calidadMantenimiento: ['Malo', 'Regular', 'Medio', 'Bueno', 'Excelente'],
    detallesTerminacion: ['Malo', 'Regular', 'Económico', 'Bueno', 'Excelente'],
    estacionamiento: ['Garaje', 'Garaje semi-cubierto', 'Descubierto', 'No Posee', 'Otros'],
    caracteristicasActuales: ['Residencial', 'Comercial', 'Industrial', 'Terreno', 'Otros'],
    destinoActual: ['Específico', 'Múltiple'],
    destinoFuturo: ['Específico', 'Múltiple'],
    calefaccion: ['Central', 'Individual', 'Inexistente'],
    aireAcondicionado: ['Central', 'Individual', 'Inexistente'],
    aguaCaliente: ['Central', 'Individual', 'Inexistente'],
    estadoAreasComunes: ['Mala', 'Regular', 'Promedio', 'Buena', 'Excelente'],
    ascensores: ['Si', 'No'],
    servicioVigilancia: ['Si', 'No'],
    desague: ['Adecuado', 'Inadecuado'],
    riesgoInundacion: ['Significativo', 'Mínimo', 'No existe información'],
    estadoCallesAcceso: ['Malo', 'Regular', 'Promedio', 'Bueno', 'Excelente'],
    electricidad: ['Pública', 'Privada', 'Sin Conexión'],
    gas: ['Pública', 'Privada', 'Sin Conexión'],
    agua: ['Pública', 'Privada', 'Sin Conexión'],
    telefono: ['Pública', 'Privada', 'Sin Conexión'],
    cloaca: ['Pública', 'Privada', 'Sin Conexión'],
    desaguePluvial: ['Pública', 'Privada', 'Sin Conexión'],
    tipoEntorno: ['Urbano', 'Suburbano', 'Rural'],
    construido: ['Más del 75%', 'Entre 25-75%', 'Menos del 25%'],
    indiceCrecimiento: ['Creciente', 'Estable', 'Decreciente'],
    servicio: ['Si', 'No'],
    valoresPropiedades: ['Creciente', 'Estable', 'Decreciente'],
    ofertaDemanda: ['Escasa', 'Equilibrada', 'Exceso de Oferta'],
    cambiosPrincipalesUsoTerrenos: ['Improbables', 'Probables', 'En Proceso'],
    serviciosConexion: ['Pública', 'Privada', 'Sin Conexión'],
  };

  return (
    <div className="bg-gray-100">
      <h2 className="text-center text-2xl font-medium text-green-900 mx-auto my-10">
        VALUACIÓN INMUEBLE URBANO
        <span>
          <img
            src={ItauLogo}
            alt="ITAU"
            className="h-20 inline-block ml-4"
          />
        </span>
      </h2>
      <div>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <div className="grid grid-cols-12 gap-4">
              {/* Información sobre la tasación */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Información sobre la tasación</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="cliente" className="col-span-2 text-sm text-gray-700 font-bold">
                    Cliente:
                  </label>
                  <input
                    type="text"
                    id="cliente"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="contacto" className="col-span-2 text-sm text-gray-700 font-bold">
                    Contacto:
                  </label>
                  <input
                    type="text"
                    id="contacto"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="telefonoCliente" className="col-span-2 text-sm text-gray-700 font-bold">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    id="telefonoCliente"
                    name="telefonoCliente"
                    value={formData.telefonoCliente}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="empresaTasadora" className="col-span-2 text-sm text-gray-700 font-bold">
                    Empresa Tasadora:
                  </label>
                  <input
                    type="text"
                    id="empresaTasadora"
                    name="empresaTasadora"
                    value={formData.empresaTasadora}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="tasador" className="col-span-2 text-sm text-gray-700 font-bold">
                    Tasador:
                  </label>
                  <input
                    type="text"
                    id="tasador"
                    name="tasador"
                    value={formData.tasador}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="direccion" className="col-span-2 text-sm text-gray-700 font-bold">
                    Dirección:
                  </label>
                  <div className="col-span-10 grid grid-cols-12 gap-4">
                    <input
                      type="text"
                      id="calle"
                      name="calle"
                      placeholder="Calle"
                      value={formData.calle}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      placeholder="Número"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <input
                      type="text"
                      id="piso"
                      name="piso"
                      placeholder="Piso"
                      value={formData.piso}
                      onChange={handleInputChange}
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <input
                      type="text"
                      id="apartamento"
                      name="apartamento"
                      placeholder="Apto"
                      value={formData.apartamento}
                      onChange={handleInputChange}
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción de la propiedad */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción de la propiedad</h4>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="superficieCubierta" className="col-span-2 text-sm text-gray-700 font-bold">
                    Sup. Cubierta (m²):
                  </label>
                  <input
                    type="number"
                    id="superficieCubierta"
                    name="superficieCubierta"
                    value={formData.superficieCubierta}
                    onChange={handleInputChange}
                    min="0"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label htmlFor="superficieSemicubierta" className="col-span-2 text-sm text-gray-700 font-bold">
                    Sup. Semicubierta (m²):
                  </label>
                  <input
                    type="number"
                    id="superficieSemicubierta"
                    name="superficieSemicubierta"
                    value={formData.superficieSemicubierta}
                    onChange={handleInputChange}
                    min="0"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="calidadUbicacion" className="col-span-2 text-sm text-gray-700 font-bold">
                    Calidad Ubicación:
                  </label>
                  <div className="col-span-10">
                    <div className="grid grid-cols-12">
                      {options.calidadUbicacion.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`calidadUbicacion-${option}`}
                              name="calidadUbicacion"
                              value={option}
                              checked={formData.calidadUbicacion === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor={`calidadUbicacion-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label htmlFor="estacionamiento" className="col-span-2 text-sm text-gray-700 font-bold">
                    Estacionamiento:
                  </label>
                  <div className="col-span-10">
                    <div className="grid grid-cols-12">
                      {options.estacionamiento.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`estacionamiento-${option}`}
                              name="estacionamiento"
                              value={option}
                              checked={formData.estacionamiento === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor={`estacionamiento-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cantidad de Ambientes de la Residencia */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Cantidad de Ambientes de la Residencia</h4>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="cocheras" className="block text-sm text-gray-700 font-bold">
                        Cocheras:
                      </label>
                      <input
                        type="number"
                        id="cocheras"
                        name="cocheras"
                        value={formData.cocheras}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cocinasComedores" className="block text-sm text-gray-700 font-bold">
                        Cocinas/Comedores:
                      </label>
                      <input
                        type="number"
                        id="cocinasComedores"
                        name="cocinasComedores"
                        value={formData.cocinasComedores}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="patiosInternos" className="block text-sm text-gray-700 font-bold">
                        Patios Internos:
                      </label>
                      <input
                        type="number"
                        id="patiosInternos"
                        name="patiosInternos"
                        value={formData.patiosInternos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="porches" className="block text-sm text-gray-700 font-bold">
                        Porches:
                      </label>
                      <input
                        type="number"
                        id="porches"
                        name="porches"
                        value={formData.porches}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="dormitorios" className="block text-sm text-gray-700 font-bold">
                        Dormitorios:
                      </label>
                      <input
                        type="number"
                        id="dormitorios"
                        name="dormitorios"
                        value={formData.dormitorios}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="baniosServicios" className="block text-sm text-gray-700 font-bold">
                        Baños Servicio:
                      </label>
                      <input
                        type="number"
                        id="baniosServicios"
                        name="baniosServicios"
                        value={formData.baniosServicios}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="estares" className="block text-sm text-gray-700 font-bold">
                        Estares:
                      </label>
                      <input
                        type="number"
                        id="estares"
                        name="estares"
                        value={formData.estares}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="banios" className="block text-sm text-gray-700 font-bold">
                        Baños:
                      </label>
                      <input
                        type="number"
                        id="banios"
                        name="banios"
                        value={formData.banios}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="depositos" className="block text-sm text-gray-700 font-bold">
                        Depósitos:
                      </label>
                      <input
                        type="number"
                        id="depositos"
                        name="depositos"
                        value={formData.depositos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="lavaderos" className="block text-sm text-gray-700 font-bold">
                        Lavaderos:
                      </label>
                      <input
                        type="number"
                        id="lavaderos"
                        name="lavaderos"
                        value={formData.lavaderos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="barbacoas" className="block text-sm text-gray-700 font-bold">
                        Barbacoas:
                      </label>
                      <input
                        type="number"
                        id="barbacoas"
                        name="barbacoas"
                        value={formData.barbacoas}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="fondos" className="block text-sm text-gray-700 font-bold">
                        Fondos:
                      </label>
                      <input
                        type="number"
                        id="fondos"
                        name="fondos"
                        value={formData.fondos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comodidades de la Residencia */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Comodidades de la Residencia</h4>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="doblesCirculaciones" className="block text-sm text-gray-700 font-bold">
                        Dobles Circulaciones:
                      </label>
                      <input
                        type="number"
                        id="doblesCirculaciones"
                        name="doblesCirculaciones"
                        value={formData.doblesCirculaciones}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="saunas" className="block text-sm text-gray-700 font-bold">
                        Saunas:
                      </label>
                      <input
                        type="number"
                        id="saunas"
                        name="saunas"
                        value={formData.saunas}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="gruposElectrogenos" className="block text-sm text-gray-700 font-bold">
                        Grupos Electrógenos:
                      </label>
                      <input
                        type="number"
                        id="gruposElectrogenos"
                        name="gruposElectrogenos"
                        value={formData.gruposElectrogenos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="otrasComodidades" className="block text-sm text-gray-700 font-bold">
                        Otras Comodidades:
                      </label>
                      <input
                        type="number"
                        id="otrasComodidades"
                        name="otrasComodidades"
                        value={formData.otrasComodidades}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Oficina Comercial */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Cantidad de Ambientes de la Oficina Comercial</h4>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="recepciones" className="block text-sm text-gray-700 font-bold">
                        Recepciones:
                      </label>
                      <input
                        type="number"
                        id="recepciones"
                        name="recepciones"
                        value={formData.recepciones}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="entrepisos" className="block text-sm text-gray-700 font-bold">
                        Entrepisos:
                      </label>
                      <input
                        type="number"
                        id="entrepisos"
                        name="entrepisos"
                        value={formData.entrepisos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="baniosOficina" className="block text-sm text-gray-700 font-bold">
                        Baños:
                      </label>
                      <input
                        type="number"
                        id="baniosOficina"
                        name="baniosOficina"
                        value={formData.baniosOficina}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="otrosAmbientes" className="block text-sm text-gray-700 font-bold">
                        Otros Ambientes:
                      </label>
                      <input
                        type="number"
                        id="otrosAmbientes"
                        name="otrosAmbientes"
                        value={formData.otrosAmbientes}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="salonesVentas" className="block text-sm text-gray-700 font-bold">
                        Salones de Ventas:
                      </label>
                      <input
                        type="number"
                        id="salonesVentas"
                        name="salonesVentas"
                        value={formData.salonesVentas}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="salasReuniones" className="block text-sm text-gray-700 font-bold">
                        Salas de Reuniones:
                      </label>
                      <input
                        type="number"
                        id="salasReuniones"
                        name="salasReuniones"
                        value={formData.salasReuniones}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="depositosOficina" className="block text-sm text-gray-700 font-bold">
                        Depósitos:
                      </label>
                      <input
                        type="number"
                        id="depositosOficina"
                        name="depositosOficina"
                        value={formData.depositosOficina}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="totalAmbientes" className="block text-sm text-gray-700 font-bold">
                        Total Ambientes:
                      </label>
                      <input
                        type="number"
                        id="totalAmbientes"
                        name="totalAmbientes"
                        value={formData.totalAmbientes}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comodidades de planta industrial */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Comodidades de planta industrial</h4>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="oficinas" className="block text-sm text-gray-700 font-bold">
                        Oficinas:
                      </label>
                      <input
                        type="number"
                        id="oficinas"
                        name="oficinas"
                        value={formData.oficinas}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="serviciosHigienicos" className="block text-sm text-gray-700 font-bold">
                        Servicios Higiénicos:
                      </label>
                      <input
                        type="number"
                        id="serviciosHigienicos"
                        name="serviciosHigienicos"
                        value={formData.serviciosHigienicos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="galponesElaboracion" className="block text-sm text-gray-700 font-bold">
                        Galpones Elaboración:
                      </label>
                      <input
                        type="number"
                        id="galponesElaboracion"
                        name="galponesElaboracion"
                        value={formData.galponesElaboracion}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="laboratorios" className="block text-sm text-gray-700 font-bold">
                        Laboratorios:
                      </label>
                      <input
                        type="number"
                        id="laboratorios"
                        name="laboratorios"
                        value={formData.laboratorios}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="depositosIndustriales" className="block text-sm text-gray-700 font-bold">
                        Depósitos:
                      </label>
                      <input
                        type="number"
                        id="depositosIndustriales"
                        name="depositosIndustriales"
                        value={formData.depositosIndustriales}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="camarasFrio" className="block text-sm text-gray-700 font-bold">
                        Cámaras de Frío:
                      </label>
                      <input
                        type="number"
                        id="camarasFrio"
                        name="camarasFrio"
                        value={formData.camarasFrio}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="galerias" className="block text-sm text-gray-700 font-bold">
                        Galerías:
                      </label>
                      <input
                        type="number"
                        id="galerias"
                        name="galerias"
                        value={formData.galerias}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="accesos" className="block text-sm text-gray-700 font-bold">
                        Accesos:
                      </label>
                      <input
                        type="number"
                        id="accesos"
                        name="accesos"
                        value={formData.accesos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Servicios especiales */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Servicios especiales de la propiedad</h4>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Calefacción:</label>
                    <div className="space-y-2">
                      {options.calefaccion.map((option) => (
                        <div key={`calefaccion-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`calefaccion-${option}`}
                            name="calefaccion"
                            value={option}
                            checked={formData.calefaccion === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`calefaccion-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Aire Acondicionado:</label>
                    <div className="space-y-2">
                      {options.aireAcondicionado.map((option) => (
                        <div key={`aireAcondicionado-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`aireAcondicionado-${option}`}
                            name="aireAcondicionado"
                            value={option}
                            checked={formData.aireAcondicionado === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`aireAcondicionado-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Agua Caliente:</label>
                    <div className="space-y-2">
                      {options.aguaCaliente.map((option) => (
                        <div key={`aguaCaliente-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`aguaCaliente-${option}`}
                            name="aguaCaliente"
                            value={option}
                            checked={formData.aguaCaliente === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`aguaCaliente-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 mt-4">
                    <label htmlFor="otrosServicios" className="block text-sm text-gray-700 font-bold mb-2">
                      Otros Servicios:
                    </label>
                    <textarea
                      id="otrosServicios"
                      name="otrosServicios"
                      value={formData.otrosServicios}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción del Edificio */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción del Edificio de Departamentos</h4>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="cantidadUnidades" className="block text-sm text-gray-700 font-bold">
                        Cantidad de Unidades:
                      </label>
                      <input
                        type="number"
                        id="cantidadUnidades"
                        name="cantidadUnidades"
                        value={formData.cantidadUnidades}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cantidadPisos" className="block text-sm text-gray-700 font-bold">
                        Cantidad de Pisos:
                      </label>
                      <input
                        type="number"
                        id="cantidadPisos"
                        name="cantidadPisos"
                        value={formData.cantidadPisos}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Estado de Áreas Comunes:</label>
                    <div className="grid grid-cols-12">
                      {options.estadoAreasComunes.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`estadoAreasComunes-${option}`}
                              name="estadoAreasComunes"
                              value={option}
                              checked={formData.estadoAreasComunes === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-3">
                            <label
                              htmlFor={`estadoAreasComunes-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Ascensores:</label>
                    <div className="grid grid-cols-12">
                      {options.ascensores.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`ascensores-${option}`}
                              name="ascensores"
                              value={option}
                              checked={formData.ascensores === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-5">
                            <label
                              htmlFor={`ascensores-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Servicio de Vigilancia:</label>
                    <div className="grid grid-cols-12">
                      {options.servicioVigilancia.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`servicioVigilancia-${option}`}
                              name="servicioVigilancia"
                              value={option}
                              checked={formData.servicioVigilancia === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-5">
                            <label
                              htmlFor={`servicioVigilancia-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="descripcionComodidadesComunes" className="block text-sm text-gray-700 font-bold mb-2">
                      Descripción de Comodidades Comunes:
                    </label>
                    <textarea
                      id="descripcionComodidadesComunes"
                      name="descripcionComodidadesComunes"
                      value={formData.descripcionComodidadesComunes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción del Terreno */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción del Terreno</h4>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="zonificacionJudicial" className="block text-sm text-gray-700 font-bold">
                        Zonificación Judicial:
                      </label>
                      <input
                        type="text"
                        id="zonificacionJudicial"
                        name="zonificacionJudicial"
                        value={formData.zonificacionJudicial}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="topografia" className="block text-sm text-gray-700 font-bold">
                        Topografía:
                      </label>
                      <input
                        type="text"
                        id="topografia"
                        name="topografia"
                        value={formData.topografia}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Desagüe:</label>
                    <div className="grid grid-cols-12">
                      {['Adecuado', 'Inadecuado'].map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`desague-${option}`}
                              name="desague"
                              value={option}
                              checked={formData.desague === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-5">
                            <label
                              htmlFor={`desague-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Riesgo de Inundación:</label>
                    <div className="grid grid-cols-12">
                      {options.riesgoInundacion.map((option) => (
                        <React.Fragment key={option}>
                          <div className="col-span-1">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-green-900"
                              id={`riesgoInundacion-${option}`}
                              name="riesgoInundacion"
                              value={option}
                              checked={formData.riesgoInundacion === option}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-3">
                            <label
                              htmlFor={`riesgoInundacion-${option}`}
                              className="text-gray-700 mr-2"
                            >
                              {option}
                            </label>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12">
                    <h5 className="text-lg text-green-900 mb-4">Servicios</h5>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { name: 'electricidad', label: 'Electricidad' },
                        { name: 'gas', label: 'Gas' },
                        { name: 'agua', label: 'Agua' },
                        { name: 'telefono', label: 'Teléfono' },
                        { name: 'cloaca', label: 'Cloaca' },
                        { name: 'desaguePluvial', label: 'Desagüe Pluvial' },
                      ].map((service) => (
                        <div key={service.name} className="space-y-2">
                          <label className="block text-sm text-gray-700 font-bold">{service.label}:</label>
                          <div className="grid grid-cols-12">
                            {options.serviciosConexion.map((option) => (
                              <React.Fragment key={`${service.name}-${option}`}>
                                <div className="col-span-1">
                                  <input
                                    type="radio"
                                    className="form-radio h-4 w-4 text-green-900"
                                    id={`${service.name}-${option}`}
                                    name={service.name}
                                    value={option}
                                    checked={formData[service.name] === option}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <label
                                    htmlFor={`${service.name}-${option}`}
                                    className="text-gray-700 mr-2"
                                  >
                                    {option}
                                  </label>
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 mt-4">
                    <label htmlFor="observacionesTerreno" className="block text-sm text-gray-700 font-bold mb-2">
                      Observaciones del Terreno:
                    </label>
                    <textarea
                      id="observacionesTerreno"
                      name="observacionesTerreno"
                      value={formData.observacionesTerreno}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción del Entorno */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">Descripción del Entorno</h4>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Tipo de Entorno:</label>
                    <div className="space-y-2">
                      {options.tipoEntorno.map((option) => (
                        <div key={`tipoEntorno-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`tipoEntorno-${option}`}
                            name="tipoEntorno"
                            value={option}
                            checked={formData.tipoEntorno === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`tipoEntorno-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Construido:</label>
                    <div className="space-y-2">
                      {options.construido.map((option) => (
                        <div key={`construido-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`construido-${option}`}
                            name="construido"
                            value={option}
                            checked={formData.construido === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`construido-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Índice de Crecimiento:</label>
                    <div className="space-y-2">
                      {options.indiceCrecimiento.map((option) => (
                        <div key={`indiceCrecimiento-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`indiceCrecimiento-${option}`}
                            name="indiceCrecimiento"
                            value={option}
                            checked={formData.indiceCrecimiento === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`indiceCrecimiento-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Valores de Propiedades:</label>
                    <div className="space-y-2">
                      {options.valoresPropiedades.map((option) => (
                        <div key={`valoresPropiedades-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`valoresPropiedades-${option}`}
                            name="valoresPropiedades"
                            value={option}
                            checked={formData.valoresPropiedades === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`valoresPropiedades-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Oferta/Demanda:</label>
                    <div className="space-y-2">
                      {options.ofertaDemanda.map((option) => (
                        <div key={`ofertaDemanda-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`ofertaDemanda-${option}`}
                            name="ofertaDemanda"
                            value={option}
                            checked={formData.ofertaDemanda === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`ofertaDemanda-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Cambios en Uso de Terrenos:</label>
                    <div className="space-y-2">
                      {options.cambiosPrincipalesUsoTerrenos.map((option) => (
                        <div key={`cambiosPrincipalesUsoTerrenos-${option}`} className="flex items-center">
                          <input
                            type="radio"
                            id={`cambiosPrincipalesUsoTerrenos-${option}`}
                            name="cambiosPrincipalesUsoTerrenos"
                            value={option}
                            checked={formData.cambiosPrincipalesUsoTerrenos === option}
                            onChange={handleInputChange}
                            className="form-radio h-4 w-4 text-green-900"
                          />
                          <label htmlFor={`cambiosPrincipalesUsoTerrenos-${option}`} className="ml-2 text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12">
                    <h5 className="text-lg text-green-900 mb-4">Uso de los Terrenos (%)</h5>
                    <div className="grid grid-cols-5 gap-4">
                      {[
                        { name: 'usoResidencial', label: 'Residencial' },
                        { name: 'usoComercial', label: 'Comercial' },
                        { name: 'usoIndustrial', label: 'Industrial' },
                        { name: 'sinUso', label: 'Sin Uso' },
                        { name: 'otrosUsos', label: 'Otros' },
                      ].map((uso) => (
                        <div key={uso.name} className="space-y-2">
                          <label htmlFor={uso.name} className="block text-sm text-gray-700 font-bold">
                            {uso.label}:
                          </label>
                          <input
                            type="number"
                            id={uso.name}
                            name={uso.name}
                            value={formData[uso.name]}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                            className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Valores de Propiedades Vecinas:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="valoresPropiedadesVecinasDesde" className="block text-sm text-gray-700">
                          Desde:
                        </label>
                        <input
                          type="number"
                          id="valoresPropiedadesVecinasDesde"
                          name="valoresPropiedadesVecinasDesde"
                          value={formData.valoresPropiedadesVecinasDesde}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="valoresPropiedadesVecinasHasta" className="block text-sm text-gray-700">
                          Hasta:
                        </label>
                        <input
                          type="number"
                          id="valoresPropiedadesVecinasHasta"
                          name="valoresPropiedadesVecinasHasta"
                          value={formData.valoresPropiedadesVecinasHasta}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold">Antigüedad Propiedades Vecinas (años):</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="antiguedadPropiedadesVecinasDesde" className="block text-sm text-gray-700">
                          Desde:
                        </label>
                        <input
                          type="number"
                          id="antiguedadPropiedadesVecinasDesde"
                          name="antiguedadPropiedadesVecinasDesde"
                          value={formData.antiguedadPropiedadesVecinasDesde}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="antiguedadPropiedadesVecinasHasta" className="block text-sm text-gray-700">
                          Hasta:
                        </label>
                        <input
                          type="number"
                          id="antiguedadPropiedadesVecinasHasta"
                          name="antiguedadPropiedadesVecinasHasta"
                          value={formData.antiguedadPropiedadesVecinasHasta}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="caracteristicasZona" className="block text-sm text-gray-700 font-bold mb-2">
                      Características de la Zona:
                    </label>
                    <textarea
                      id="caracteristicasZona"
                      name="caracteristicasZona"
                      value={formData.caracteristicasZona}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="factoresComercializacion" className="block text-sm text-gray-700 font-bold mb-2">
                      Factores de Comercialización:
                    </label>
                    <textarea
                      id="factoresComercializacion"
                      name="factoresComercializacion"
                      value={formData.factoresComercializacion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="obeservacionesCondicionesMercado" className="block text-sm text-gray-700 font-bold mb-2">
                      Observaciones sobre Condiciones de Mercado:
                    </label>
                    <textarea
                      id="obeservacionesCondicionesMercado"
                      name="obeservacionesCondicionesMercado"
                      value={formData.obeservacionesCondicionesMercado}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
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
                        comparables={comparables}
                        page={comparablePage}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6 "
              >
                Crear Informe
              </button>
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
}

export default FormularioItau;