import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import BbvaLogo from "../../images/logo-bbva.png";
import InformeBbvaService from '../../api/InformeBbvaService';
import ItemObraCivilModal from '../utils/ItemObraCivilModal';
import plusIcon from '../../images/plusIcon.png';
import ItemObraCivilService from '../../api/ItemObraCivilService';
import ItemAntiguedadesModal from '../utils/ItemAntiguedadesModal';
import ItemAntiguedadesDescripcionModal from '../utils/ItemAntiguedadesDescripcionModal';
import ItemComodidadesDescripcionModal from '../utils/ItemComodidadesDescripcionModal';
import ItemPlanillaDescripcionModal from '../utils/ItemPlanillaDescripcionModal';
import CalculoInforme from '../calculo/CalculoInforme';
import RadioGroup from '../../components/RadioGroup';
import CheckboxGroup from '../../components/CheckboxGroup';


const InformeBbva = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
  const preloadInforme = useSelector(state => state.informe.informe);

  const [firmaTasadorPreview, setFirmaTasadorPreview] = useState(null);
  const [firmaRepresentantePreview, setFirmaRepresentantePreview] = useState(null);
  const [fotoAreaCroquisUbicacionPreview, setFotoAreaCroquisUbicacionPreview] = useState(null);
  const [itemsObraCivil, setItemsObraCivil] = useState([]);
  const [sumaDocumentada, setSumaDocumentada] = useState(0);
  const [sumaVerificada, setSumaVerificada] = useState(0);
  const [sumaCubierta, setSumaCubierta] = useState({ documentada: 0, verificada: 0 });
  const [sumaSemiCubierta, setSumaSemiCubierta] = useState({ documentada: 0, verificada: 0 });
  const [sumaOtros, setSumaOtros] = useState({ documentada: 0, verificada: 0 });
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesFotos, setSelectedFilesFotos] = useState([]);
  const [previewImagesFotos, setPreviewImagesFotos] = useState([]);
  const [formValoresInicializados, setFormValoresInicializados] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalAntiguedadesOpen, setIsModalAntiguedadesOpen] = useState(false);
  const [isModalAntiguedadesDescripcionOpen, setIsModalAntiguedadesDescripcionOpen] = useState(false);
  const [isModalComodidadesDescripcionOpen, setIsModalComodidadesDescripcionOpen] = useState(false);
  const [isModalPlanillaDescripcionOpen, setIsModalPlanillaDescripcionOpen] = useState(false);

  const [getCalculoData, setGetCalculoData] = useState(null);

  const [formData, setFormData] = useState({
    // Sección A - Resumen
    fechaAsignacionServicioResumen: "",
    visitaFechaResumen: "",
    visitaInspectorResumen: "",
    tipoInformeResumenDefinitivo: false,
    tipoInformeResumenCorregido: false,
    fechaInformeResumen: "",
    clienteResumen: "",
    oficialCuentaResumen: "",
    firmaTasadorResumen: "",
    representanteResumen: "",
    tasadorResumen: "",
    firmaTasadorUrlResumen: "",
    firmaRepresentanteUrlResumen: "",
    firmaTasadorAclaracionResumen: "",
    firmaRepresentanteAclaracionResumen: "",

    // Identificación y Ubicación
    ubicacionNorteResumen: false,
    ubicacionSurResumen: false,
    tipoUrbanoResumen: false,
    tipoSuburbanoResumen: false,
    ruralResumen: "",
    padronResumen: "",
    manzanaResumen: "",
    seccionJudicialCatastralResumen: "",
    localidadParajeResumen: "",
    departamentoResumen: "",
    calleModoAccesoResumen: "",
    nombreNroPuertaResumen: "",
    otrasReferenciasUbicacionResumen: "",
    regimenFuturoComunResumen: false,
    regimenFuturoPropiedadHorizontalResumen: false,
    regimenFuturoUrbanizacionPHorizontalResumen: false,

    // Terreno
    terrenoBaldioResumen: false,
    terrenoEdificadoResumen: false,

    // Destino
    destinoViviendaResumen: false,
    destinoComercioResumen: false,
    destinoOtrosResumen: false,

    // Tipología
    tipologiaCasaResumen: false,
    tipologiaApartamentoResumen: false,
    tipologiaOtraResumen: false,

    // Situación Construcciones
    situacionConstruccionesTerminadasResumen: false,
    situacionConstruccionesInconclusasResumen: false,

    // Tipo Construcción
    tipoConstruccionTradicionalResumen: false,
    tipoConstruccionMaderaResumen: false,
    tipoConstruccionSteelFramingResumen: false,
    tipoConstruccionContenedorResumen: false,
    tipoConstruccionCombinadaOtrosResumen: "",

    // Descripción
    descripcionResumen: "",

    // Tasación
    superficieTerrenoResumen: "",
    superficieConsideradaObraCivilResumen: "",
    valorTerrenoM2Resumen: "",
    valorTerrenoTotalResumen: "",
    valorObraCivilM2Resumen: "",
    valorObraCivilTotalResumen: "",
    valorMercadoM2Resumen: "",
    valorMercadoTotalResumen: "",
    valorRemateM2Resumen: "",
    valorRemateTotalResumen: "",

    // Cotización
    tipoCambioCotizacionResumen: "",
    fechaCotizacionResumen: "",
    fuenteCotizacionResumen: "",

    // Síntesis de observaciones
    sintesisObservacionesInformeResumen: "",

    // Información General
    nombresInformacionGeneral: "",
    cedulaInformacionGeneral: "",
    telefonoInformacionGeneral: "",
    celularInformacionGeneral: "",
    mailInformacionGeneral: "",

    // Información Oficial de Cuentas
    nombreInformacionOficialCuentas: "",
    sucursalInformacionOficialCuentas: "",
    telefonoInformacionOficialCuentas: "",
    mailInformacionOficialCuentas: "",

    // Información del Tasador
    nombreInformacionTasador: "",
    direccionInformacionTasador: "",
    telefonoInformacionTasador: "",
    representanteInformacionTasador: "",
    nombreTasadorInformacionTasador: "",
    profesionTasadorInformacionTasador: "",
    telefonoCelularTasadorInformacionTasador: "",
    mailTasadorInformacionTasador: "",

    // Informe Negativo
    noSeEmitioInformacionTasadorInfNegativo: [],
    emitioElInformacionTasadorInfNegativo: "",
    motivosInformacionTasadorInfNegativo: "",

    // Síntesis cambios
    noSeEmitioInformacionTasadorSintesisInfDefinitivo: [],
    emitioElInformacionTasadorSintesisInfDefinitivo: "",
    descripcionInformacionTasadorSintesisInfDefinitivo: "",

    // Sección C - Identificación y Ubicación
    norteIdentificacionUbicacion: false,
    surIdentificacionUbicacion: false,
    urbanoIdentificacionUbicacion: false,
    suburbanoIdentificacionUbicacion: false,
    ruralIdentificacionUbicacion: "",
    padronIdentificacionUbicacion: "",
    manzanaIdentificacionUbicacion: "",
    seccionJudicialCatastralIdentificacionUbicacion: "",
    localidadParajeIdentificacionUbicacion: "",
    departamentoIdentificacionUbicacion: "",
    calleModoAccesoIdentificacionUbicacion: "",
    nombreNroPuertaIdentificacionUbicacion: "",
    otrasReferenciasUbicacionIdentificacionUbicacion: "",
    regimenFuturoComunIdentificacionUbicacion: false,
    regimenFuturoPropiedadHorizontalIdentificacionUbicacion: false,
    regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion: false,

    // Sección D - Descripción del terreno - Características
    superficieTerrenoCaracteristicas: "",
    baldioCaracteristicas: false,
    edificadoCaracteristicas: false,
    formaCaracteristicas: "",
    ubicacionManzanaCaracteristicas: "",
    orientacionCaracteristicas: "",
    frente1Caracteristicas: "",
    frente2Caracteristicas: "",
    lateral1Caracteristicas: "",
    lateral2Caracteristicas: "",
    fondoCaracteristicas: "",
    otrosCaracteristicas: "",
    topografiaAltimetriaCaracteristicas: "",
    orientacionVistasCaracteristicas: "",
    adecuadaCaracteristicas: false,
    inadecuadaCaracteristicas: false,
    probableCaracteristicas: false,
    improbableCaracteristicas: false,
    descripcionCaracteristicas: "",
    fotoAreaCroquisUbicacionUrlCaracteristicas: "",

    // Vías de acceso y alumbrado
    bitumenViasAccesoCaracteristicas: false,
    otrosViasAccesoCaracteristicas: false,
    excelenteEstadoViasAccesoCaracteristicas: false,
    regularEstadoViasAccesoCaracteristicas: false,
    maloEstadoViasAccesoCaracteristicas: false,
    existenVeredasCaracteristicas: false,
    noExistenVeredasCaracteristicas: false,
    suficienteAlumbradoPublicoCaracteristicas: false,
    insuficienteAlumbradoPublicoCaracteristicas: false,
    noExisteAlumbradoPublicoCaracteristicas: false,

    // Otros servicios e infraestructura
    publicoAbastecimientoAguaServiciosInfraestructura: false,
    privadoAbastecimientoAguaServiciosInfraestructura: false,
    sinConexionAbastecimientoAguaServiciosInfraestructura: false,
    publicoDesaguesServiciosInfraestructura: false,
    privadoDesaguesServiciosInfraestructura: false,
    sinConexionDesaguesServiciosInfraestructura: false,
    publicoTelefonoServiciosInfraestructura: false,
    sinConexionTelefonoServiciosInfraestructura: false,
    publicoElectricidadServiciosInfraestructura: false,
    privadoElectricidadServiciosInfraestructura: false,
    sinConexionElectricidadServiciosInfraestructura: false,
    publicoGasServiciosInfraestructura: false,
    privadoGasServiciosInfraestructura: false,
    sinConexionGasServiciosInfraestructura: false,
    otrosServiciosInfraestructura: "",

    // Observaciones
    observacionesSeccionLegalesBbvaObservaciones: "",
    otrasObservacionesSeccionObservaciones: "",

    // Sección E - Descripción del inmueble
    viviendaDestinoDescripcionInmueble: false,
    comercioDestinoDescripcionInmueble: false,
    otrosDestinoDescripcionInmueble: false,
    casaTipologiaDescripcionInmueble: false,
    apartamentoTipologiaDescripcionInmueble: false,
    otraTipologiaDescripcionInmueble: false,
    terminadasSituacionConstruccionesDescripcionInmueble: false,
    inconclusasSituacionConstruccionesDescripcionInmueble: false,
    nivelesDescripcionInmueble: "",

    // Ubicación Construcciones
    frenteUbicacionConstrucciones: false,
    contrafrenteUbicacionConstrucciones: false,
    internoUbicacionConstrucciones: false,
    fondoUbicacionConstrucciones: false,
    otrosUbicacionConstrucciones: false,

    // Agrupamiento Construcciones
    unicasAgrupamientoConstrucciones: false,
    aisladasAgrupamientoConstrucciones: false,
    apareadasAgrupamientoConstrucciones: false,
    edificiosAgrupamientoConstrucciones: false,
    otrosAgrupamientoConstrucciones: false,

    // Descripciones
    descripcionAspectosGenerales: "",
    luminosidadVistasDescripcionInmueble: "",

    // Categoría
    muyBuena1CategoriaDescripcionInmueble: false,
    muyBuena2CategoriaDescripcionInmueble: false,
    buena1CategoriaDescripcionInmueble: false,
    buena2CategoriaDescripcionInmueble: false,
    mediana1CategoriaDescripcionInmueble: false,
    mediana2CategoriaDescripcionInmueble: false,
    economica1CategoriaDescripcionInmueble: false,
    economica2CategoriaDescripcionInmueble: false,
    muyEconomicaCategoriaDescripcionInmueble: false,
    descripcionDescripcionInmueble: "",

    // Estado conservación
    excelente1EstadoConservacionDescripcionInmueble: false,
    excelente2EstadoConservacionDescripcionInmueble: false,
    bueno1EstadoConservacionDescripcionInmueble: false,
    bueno2EstadoConservacionDescripcionInmueble: false,
    regular1EstadoConservacionDescripcionInmueble: false,
    regular2EstadoConservacionDescripcionInmueble: false,
    malo1EstadoConservacionDescripcionInmueble: false,
    malo2EstadoConservacionDescripcionInmueble: false,
    muyMaloEstadoConservacionDescripcionInmueble: false,
    descripcionEstadoConservacionDescripcionInmueble: "",

    // Mantenimiento
    frecuenteMantenimientoDescripcionInmueble: false,
    ocasionalMantenimientoDescripcionInmueble: false,
    escasoNuloMantenimientoDescripcionInmueble: false,
    descripcionMantenimientoDescripcionInmueble: "",

    // Piscina
    hArmadoPiscinaDescripcionDetallada: false,
    prefabricadaPiscinaDescripcionDetallada: false,
    terminacionPiscinaDescripcionDetallada: false,
    climatizacionPiscinaDescripcionDetallada: false,
    otrosPiscinaDescripcionDetallada: false,

    // Aberturas, protecciones, placares
    aberturasDescripcionDetallada: "",
    proteccionAberturasDescripcionDetallada: "",
    placaresDormitoriosDescripcionDetallada: "",
    placaresCocinaDescripcionDetallada: "",

    // Agua caliente
    tipoAguaCalienteDescripcion: "",
    enCocinaDescripcionDetallada: [],
    enBaniosDescripcionDetallada: [],

    // Instalación eléctrica
    embutidaDescripcionDetallada: [],
    exteriorDescripcionDetallada: [],

    // Otros
    alarmaDescripcionDetallada: [],
    gElectrogDescripcionDetallada: [],
    cctvDescripcionDetallada: [],
    portElecDescripcionDetallada: [],

    // Climatización
    estufaDescripcionDetallada: [],
    estufaUbicacionDescripcionDetallada: "",
    splitsDescripcionDetallada: [],
    splitsUbicacionDescripcionDetallada: "",
    centralDescripcionDetallada: [],
    centralUbicacionDescripcionDetallada: "",
    otrosDescripcionDetallada: [],
    otrosUbicacionDescripcionDetallada: "",
    panelesSolaresDescripcionDetallada: "",
    otrasInstalacionesDescripcionDetallada: "",

    // Otras características
    otrasCaracteristicasDescripcion: "",

    // Observaciones Sección E
    observacionesSeccionLegalesDescripcion: "",
    otrasObservacionesSeccionLegalesDescripcion: "",

    // Sección F - Planos
    documentacionClientePlanos: [],
    relevamientoTasadorPlanos: [],
    otrosPlanos: [],
    planosImagenesUrl: "",

    // Sección G - Fotos
    fotosImagenesUrl: "",

    // Sección H - Entorno y mercado
    descripcionGeneralEntorno: "",

    // Construcciones
    veinticincoContruccionesEntorno: [],
    setentacincoContruccionesEntorno: [],
    cienContruccionesEntorno: [],

    // Crecimiento
    continuoCrecimientoEntorno: [],
    estableContruccionesEntorno: [],
    nuloContruccionesEntorno: [],

    // Usos (%)
    viviendaUsosEntorno: "",
    comercioUsosEntorno: "",
    industriaUsosEntorno: "",
    otrosUsosEntorno: "",

    // Equipamiento
    centrosEnsenanzaEntorno: "",
    centrosSaludEntorno: "",
    suficienteDeportivoEntorno: [],
    escasoNuloDeportivoEntorno: [],
    suficienteEsparcimientoEntorno: [],
    escasoNuloEsparcimientoEntorno: [],
    suficienteZonasVerdesEntorno: [],
    escasoNuloZonasVerdesEntorno: [],
    suficienteEstacionamientoEntorno: [],
    insuficienteNuloEstacionamientoEntorno: [],

    // Proximidad transporte
    excelenteProximidadTransportePublicoConectividadEntorno: [],
    buenaProximidadTransportePublicoConectividadEntorno: [],
    regularProximidadTransportePublicoConectividadEntorno: [],
    malaProximidadTransportePublicoConectividadEntorno: [],

    // Seguridad
    existeSeguridadEntorno: [],
    noExisteSeguridadEntorno: [],

    // Situación general
    favorableSituacionGeneralEntorno: [],
    desfavorableSituacionGeneralEntorno: [],

    // Mercado inmobiliario
    descripcionGeneralMercadoInmobiliario: "",

    // Oferta
    altaOfertaEntorno: false,
    mediaOfertaEntorno: false,
    bajaOfertaEntorno: false,

    // Demanda
    altaDemandaEntorno: false,
    mediaDemandaEntorno: false,
    bajaDemandaEntorno: false,

    // Plazos de comercialización
    plazosComercializaciónEntorno: "",

    // Existencia
    altaExistenciaEntorno: false,
    mediaExistenciaEntorno: false,
    bajaExistenciaEntorno: false,
    noExisteExistenciaEntorno: false,

    // Valor de mercado similar
    abundantesValorMercadoSimilarEntorno: false,
    escasasValorMercadoSimilarEntorno: false,
    muyEscasasValorMercadoSimilarEntorno: false,

    // Antigüedad similar
    abundantesAntigüedadSimilarEntorno: false,
    escasasAntigüedadSimilarEntorno: false,
    muyEscasasAntigüedadSimilarEntorno: false,

    // Sección I - Normativa
    organismosCompetentesNormativa: "",

    // Para los 9 conceptos de la tabla (campos dinámicos)
    concepto1Normativa: "",
    normativa1Normativa: false,
    valoresPadron1Normativa: false,
    sinVerificarFaltanDatosNormativa1Normativa: false,
    cumple1Normativa: false,
    noCumple1Normativa: false,
    noAplica1Normativa: false,
    sinVerificarFaltanDatosNormativaExtra1Normativa: false,
    noAplicaBaldio1Normativa: false,

    // (Repetir para los conceptos 2-9)

    // Requisitos inmueble valor patrimonial
    requisitosInmuebleValorPatrimonialNormativa: "",

    // Área mínima vivienda/local comercial
    cumpleAreaMinimaViviendaLocalComercialNormativa: false,
    noCumpleAreaMinimaViviendaLocalComercialNormativa: false,
    sinVerificarAreaMinimaViviendaLocalComercialNormativa: false,

    // Otras normativas
    otrasNormativasNormativa: "",

    // Normativa Construcción no tradicional
    cumpleNormativaConstruccionNoTradicionalNormativa: false,
    noCumpleNormativaConstruccionNoTradicionalNormativa: false,
    noAplicaNormativaConstruccionNoTradicionalNormativa: false,
    sinVerificarNormativaConstruccionNoTradicionalNormativa: false,

    // Conclusiones cumplimiento normativo
    sinVerificarNormativa: false,
    cumpleNormativa: false,
    regularizableNoCumpleNormativa: false,
    noRegularizableNoCumpleNormativa: false,
    sinDatosNoCumpleNormativa: false,
    descripcionNoCumpleNormativa: "",

    // Sección I.2 - Permiso de Construcción
    sinDatosPermisoConstruccion: false,
    sinPresentarPermisoConstruccion: false,

    // Planos y superficie presentados coinciden
    siPlanoSuperficiePresentarPermisoConstruccion: false,
    noPlanoSuperficiePresentarPermisoConstruccion: false,
    sinVerificarPlanoSuperficiePresentarPermisoConstruccion: false,

    // Observado
    siObservadoSuperficiePresentarPermisoConstruccion: false,
    noObservadoSuperficiePresentarPermisoConstruccion: false,
    sinVerificarOSuperficiePresentarPermisoConstruccion: false,

    // Presentado Aprobado
    siPresentadoAprobadoPlanosSuperficiePermisoConstruccion: false,
    noPresentadoAprobadoPlanosSuperficiePermisoConstruccion: false,
    sinVerificarPAPlanosSuperficiePermisoConstruccion: false,

    // Con Habilitación Final
    siHabilitacionFinalPlanosSuperficiePermisoConstruccion: false,
    noHabilitacionFinalPlanosSuperficiePermisoConstruccion: false,
    sinVerificarHFPlanosSuperficiePermisoConstruccion: false,

    // Origen información
    siOrigenInformacionConstatadoTasadorPermisoConstruccion: false,
    noOrigenInformacionConstatadoTasadorPermisoConstruccion: false,

    // Observaciones finales
    observacionesSeccionLegalesObservaciones: "",
    otrasObservacionesObservaciones: ""
  });


  const calcularSumas = (items) => {
    let totalDoc = 0, totalVer = 0;
    let cubierta = { documentada: 0, verificada: 0 };
    let semiCubierta = { documentada: 0, verificada: 0 };
    let otros = { documentada: 0, verificada: 0 };

    items.forEach((item) => {
      const doc = Number(item.superficieDocumentadaObraCivilSeccionEDescripcionInmueble) || 0;
      const ver = Number(item.superficieVerificadaObraCivilSeccionEDescripcionInmueble) || 0;
      const tipo = item.tipoObraCivilSeccionEDescripcionInmueble;

      totalDoc += doc;
      totalVer += ver;

      if (tipo === "Superficie Cubierta") {
        cubierta.documentada += doc;
        cubierta.verificada += ver;
      } else if (tipo === "Superficie Semi Cubierta") {
        semiCubierta.documentada += doc;
        semiCubierta.verificada += ver;
      } else {
        otros.documentada += doc;
        otros.verificada += ver;
      }
    });

    setSumaDocumentada(totalDoc);
    setSumaVerificada(totalVer);
    setSumaCubierta(cubierta);
    setSumaSemiCubierta(semiCubierta);
    setSumaOtros(otros);
  };


  const handleItemUpdate = (id, updatedData) => {
    setItemsObraCivil(prevItems =>
      prevItems.map(item => item.id === id ? { ...item, ...updatedData } : item)
    );
  };

  const handleSelectChange = (id, value) => {
    const updatedItems = itemsObraCivil.map((item) =>
      item.id === id ? { ...item, tipoObraCivilSeccionEDescripcionInmueble: value } : item
    );
    setItemsObraCivil(updatedItems);
    calcularSumas(updatedItems); // Recalcular sumas cuando se cambia el tipo de obra civil
    updateBackendTipoObraCivil(id, value); // Actualizar en el backend
  };


  const handleFieldChange = (id, fieldName, value) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [fieldName]: value,
        };
      }
      return item;
    });

    setItemsObraCivil(updatedItems);
    calcularSumas(updatedItems);
  };



  const handleFieldChangeCimentacion = (id, fieldName, value = null) => {
    // Igual que antes
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        const resetFields = {
          pilotesCimentacionDescripcion: false,
          dadosCimentacionDescripcion: false,
          patinesCimentacionDescripcion: false,
          zapCorridaCimentacionDescripcion: false,
          plateaCimentacionDescripcion: false,
        };
        if (fieldName === 'otrosDescripcionCimentacionDescripcion') {
          return {
            ...item,
            [fieldName]: value,
          };
        } else {
          return {
            ...item,
            ...resetFields,
            [fieldName]: true,
          };
        }
      }
      return item;
    });
    setItemsObraCivil(updatedItems);
  };

  const handleFieldChangeTipoComposicion = (id, fieldName, value = null) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        if (fieldName === 'otrosDescripcionTipoComposicionDescripcion') {
          return {
            ...item,
            [fieldName]: value, // Actualiza solo el campo de texto
          };
        }
      }
      return item;
    });
    setItemsObraCivil(updatedItems); // Actualiza el estado global
  };

  const handleFieldChangeRestoEstructura = (id, fieldName, value = null) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        const resetFields = {
          hArmadoRestoEstructuraDescripcion: false,
          muroPortanteRestoEstructuraDescripcion: false,
          mContencionRestoEstructuraDescripcion: false,
          maderaRestoEstructuraDescripcion: false,
          metalicaRestoEstructuraDescripcion: false,
          otrosRestoEstructuraDescripcion: false,
        };
        if (fieldName === 'descripcionRestoEstructuraDescripcion') {
          return {
            ...item,
            [fieldName]: value, // Actualiza solo el campo de texto
          };
        } else {
          return {
            ...item,
            ...resetFields,
            [fieldName]: true, // Actualiza el campo booleano seleccionado
          };
        }
      }
      return item;
    });
    setItemsObraCivil(updatedItems); // Actualiza el estado global
  };


  const handleFieldChangeMurosInteriorExterior = (id, fieldName, value = null) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        const resetFields = {
          ladrilloMurosInteriorExteriorDescripcion: false,
          ticholoMurosInteriorExteriorDescripcion: false,
          maderaMurosInteriorExteriorDescripcion: false,
          steelFramingMurosInteriorExteriorDescripcion: false,
          otrosMurosInteriorExteriorDescripcion: false,
        };
        if (fieldName === 'descripcionMurosInteriorExteriorDescripcion') {
          return {
            ...item,
            [fieldName]: value, // Actualiza solo el campo de texto
          };
        } else {
          return {
            ...item,
            ...resetFields,
            [fieldName]: true, // Actualiza el campo booleano seleccionado
          };
        }
      }
      return item;
    });
    setItemsObraCivil(updatedItems); // Actualiza el estado global
  };

  const handleUploadImages = async (id) => {
    if (!selectedFiles.length) return;

    const formData = new FormData();
    selectedFiles.forEach(image => formData.append("files", image.file));

    try {
      await InformeBbvaService.uploadPlanos(id, formData);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }
  };

  const configuracionBbva = {
    nombreBanco: 'BBVA',
  };

  const handleUploadFotos = async (id) => {
    if (!selectedFilesFotos.length) {
      return;
    }

    const formData = new FormData();
    selectedFilesFotos.forEach(file => formData.append("files", file));

    try {
      await InformeBbvaService.uploadFotos(id, formData);
      toast.success("Fotos subidas correctamente");
      setSelectedFilesFotos([]);
      setPreviewImagesFotos([]);
    } catch (error) {
      console.error("Error al subir fotos:", error);
      toast.error("Error al subir fotos");
    }
  };


  // Mantén tu función handleInputChange original
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        // Asegurarnos de que prevData[name] es un array
        const currentValues = Array.isArray(prevData[name]) ? prevData[name] : [];

        return {
          ...prevData,
          [name]: checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value),
        };
      });
    } else if (type === "file") {
      setFormData((prevData) => {
        // Asegurarnos de que prevData[name] es un array
        const currentFiles = Array.isArray(prevData[name]) ? prevData[name] : [];

        return {
          ...prevData,
          [name]: [...currentFiles, ...files],
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRadioWithRelatedFields = (e, relatedFields) => {
    // Primero ejecuta el handleInputChange normal para actualizar el valor principal
    handleInputChange(e);

    // Luego actualiza los campos relacionados
    setFormData(prevData => ({
      ...prevData,
      ...relatedFields
    }));
  };


  const handleFieldChangeMurosInteriorInterior = (id, fieldName, value = null) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        const resetFields = {
          ladrilloMurosInteriorInteriorDescripcion: false,
          ticholoMurosInteriorInteriorDescripcion: false,
          maderaMurosInteriorInteriorDescripcion: false,
          steelFramingMurosInteriorInteriorDescripcion: false,
          otrosMurosInteriorInteriorDescripcion: false,
        };
        if (fieldName === 'descripcionMurosInteriorInteriorDescripcion') {
          return {
            ...item,
            [fieldName]: value, // Actualiza solo el campo de texto
          };
        } else {
          return {
            ...item,
            ...resetFields,
            [fieldName]: true, // Actualiza el campo booleano seleccionado
          };
        }
      }
      return item;
    });
    setItemsObraCivil(updatedItems); // Actualiza el estado global
  };


  const updateBackend = async (id) => {
    const itemToUpdate = itemsObraCivil.find((item) => item.id === id);
    try {
      await ItemObraCivilService.updateItemObraCivil(id, itemToUpdate);
    } catch (error) {
      console.error('Error al actualizar en el backend:', error);
    }
  };

  const updateBackendTipoObraCivil = async (id, tipoObraCivil) => {
    try {
      await ItemObraCivilService.updateItemObraCivil(id, { tipoObraCivilSeccionEDescripcionInmueble: tipoObraCivil });
    } catch (error) {
      console.error(`Error al actualizar el tipo de obra civil para el item ${id}:`, error);
    }
  };

  // Versión actualizada de handleFileUpload
  const handleFileUpload = async (file) => {
    // Crea un objeto FormData para la subida
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Realiza la petición para subir el archivo
      const response = await fetch('URL_DE_TU_API_PARA_SUBIR_IMAGENES', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }

      const result = await response.json();
      // Retorna la URL del archivo subido
      return result.url || result.fileUrl || result.path;
    } catch (error) {
      console.error('Error uploadando archivo:', error);
      return null;
    }
  };



  const fetchItemsObraCivilByInformeId = async (provisionalInformeId) => {
    try {
      const response = await ItemObraCivilService.getItemsObraCivilByIdInforme(provisionalInformeId);
      setItemsObraCivil(response);
      calcularSumas(response);
    } catch (error) {
      console.error('Error al obtener los items obra civil:', error);
    }
  };

  const handleUploadPlanos = async (id) => {
    if (!selectedFiles.length) {
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      await InformeBbvaService.uploadPlanos(id, formData);
      toast.success("Imágenes subidas correctamente");
      setSelectedFiles([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      toast.error("Error al subir imágenes");
    }
  };


  // Función para manejar cambios en los campos de cubierta
  const handleFieldChangeCubierta = (id, fieldName, value) => {
    // Actualiza el estado de los items de obra civil
    setFormData(prev => {
      // Crea una copia del array de items de obra civil
      const updatedItems = (prev.itemsObraCivil || []).map(item => {
        // Si este es el item que queremos actualizar
        if (item.id === id) {
          // Para campos de radio button, necesitamos resetear todos los campos relacionados
          if (fieldName === 'hArmadoCubiertaDescripcion' ||
            fieldName === 'maderaCubiertaDescripcion' ||
            fieldName === 'metalicaCubiertaDescripcion' ||
            fieldName === 'bovedillaCubiertaDescripcion' ||
            fieldName === 'otrosCubiertaDescripcion') {

            // Resetea todos los campos de cubierta
            return {
              ...item,
              hArmadoCubiertaDescripcion: false,
              maderaCubiertaDescripcion: false,
              metalicaCubiertaDescripcion: false,
              bovedillaCubiertaDescripcion: false,
              otrosCubiertaDescripcion: false,
              [fieldName]: true // Establece el seleccionado a true
            };
          }
          // Para campos de texto normal, simplemente actualizamos el valor
          else {
            return {
              ...item,
              [fieldName]: value
            };
          }
        }
        return item;
      });

      // Retorna el estado actualizado
      return {
        ...prev,
        itemsObraCivil: updatedItems
      };
    });
  };

  const handleRemovePreviewImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemovePreviewFotos = (index) => {
    setPreviewImagesFotos(prev => prev.filter((_, i) => i !== index));
    setSelectedFilesFotos(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!getCalculoData) return;
    try {
      const calculoData = getCalculoData();
      // Establece los valores solo la primera vez, sin sobrescribir cambios manuales
      if (!formValoresInicializados) {
        setFormData(prevData => ({
          ...prevData,
          valorMercadoTotalResumen: calculoData.valorMercado || 0,
          valorMercadoM2Resumen: calculoData.valorMercadoMetroCuadrado || 0,
          valorRemateTotalResumen: calculoData.valorRemate || 0,
          valorRemateM2Resumen: calculoData.valorRemateMetroCuadrado || 0,
          valorTerrenoTotalResumen: calculoData.valorTerreno || 0,
          valorTerrenoM2Resumen: calculoData.valorMetroTerreno || 0,
          superficieTerrenoResumen: calculoData.superficieTerreno || 0,
          valorObraCivilTotalResumen: calculoData.valorObraCivil || 0,
          valorObraCivilM2Resumen: calculoData.costoReposicionMetroCuadrado || 0,
          superficieTerrenoCaracteristicas: calculoData.superficieTerreno || 0
        }));
        // Marca como inicializado
        setFormValoresInicializados(true);
      }
    } catch (error) {
      console.error("Error al actualizar valores desde cálculo:", error);
    }
  }, [getCalculoData, formValoresInicializados]);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (getCalculoData) {
        try {
          const calculoData = getCalculoData();

          // Si hay un ID de informe, guardar el cálculo
          if (provisionalInformeId) {
            await InformeBbvaService.saveCalculo(provisionalInformeId, calculoData);
          }
        } catch (error) {
          console.error("Error al obtener o guardar datos del cálculo:", error);
          const confirmar = window.confirm("Hubo un error al procesar los datos del cálculo. ¿Deseas continuar sin guardarlos?");
          if (!confirmar) {
            return;
          }
        }
      }

      // Continuar con la lógica original de actualización de items
      const updatePromises = itemsObraCivil.map(async (item) => {
        const updatedFields = {
          pilotesCimentacionDescripcion: item.pilotesCimentacionDescripcion,
          dadosCimentacionDescripcion: item.dadosCimentacionDescripcion,
          patinesCimentacionDescripcion: item.patinesCimentacionDescripcion,
          zapCorridaCimentacionDescripcion: item.zapCorridaCimentacionDescripcion,
          plateaCimentacionDescripcion: item.plateaCimentacionDescripcion,
          otrosDescripcionCimentacionDescripcion: item.otrosDescripcionCimentacionDescripcion,
          otrosDescripcionCubiertaDescripcion: item.otrosDescripcionCubiertaDescripcion,
          otrosDescripcionTipoComposicionDescripcion: item.otrosDescripcionTipoComposicionDescripcion,
          descripcionRestoEstructuraDescripcion: item.descripcionRestoEstructuraDescripcion,
          descripcionMurosInteriorExteriorDescripcion: item.descripcionMurosInteriorExteriorDescripcion,
          descripcionMurosInteriorInteriorDescripcion: item.descripcionMurosInteriorInteriorDescripcion,
          hArmadoCubiertaDescripcion: item.hArmadoCubiertaDescripcion,
          maderaCubiertaDescripcion: item.maderaCubiertaDescripcion,
          metalicaCubiertaDescripcion: item.metalicaCubiertaDescripcion,
          bovedillaCubiertaDescripcion: item.bovedillaCubiertaDescripcion,
          otrosCubiertaDescripcion: item.otrosCubiertaDescripcion,
          hArmadoRestoEstructuraDescripcion: item.hArmadoRestoEstructuraDescripcion,
          muroPortanteRestoEstructuraDescripcion: item.muroPortanteRestoEstructuraDescripcion,
          mContencionRestoEstructuraDescripcion: item.mContencionRestoEstructuraDescripcion,
          maderaRestoEstructuraDescripcion: item.maderaRestoEstructuraDescripcion,
          metalicaRestoEstructuraDescripcion: item.metalicaRestoEstructuraDescripcion,
          otrosRestoEstructuraDescripcion: item.otrosRestoEstructuraDescripcion,
          ladrilloMurosInteriorExteriorDescripcion: item.ladrilloMurosInteriorExteriorDescripcion,
          ticholoMurosInteriorExteriorDescripcion: item.ticholoMurosInteriorExteriorDescripcion,
          maderaMurosInteriorExteriorDescripcion: item.maderaMurosInteriorExteriorDescripcion,
          steelFramingMurosInteriorExteriorDescripcion: item.steelFramingMurosInteriorExteriorDescripcion,
          otrosMurosInteriorExteriorDescripcion: item.otrosMurosInteriorExteriorDescripcion,
          ladrilloMurosInteriorInteriorDescripcion: item.ladrilloMurosInteriorInteriorDescripcion,
          ticholoMurosInteriorInteriorDescripcion: item.ticholoMurosInteriorInteriorDescripcion,
          maderaMurosInteriorInteriorDescripcion: item.maderaMurosInteriorInteriorDescripcion,
          steelFramingMurosInteriorInteriorDescripcion: item.steelFramingMurosInteriorInteriorDescripcion,
          otrosMurosInteriorInteriorDescripcion: item.otrosMurosInteriorInteriorDescripcion,
          hallDeAccesoComodidadesDescripcion: item.hallDeAccesoComodidadesDescripcion,
          porcheComodidadesDescripcion: item.porcheComodidadesDescripcion,
          estarComedorComodidadesDescripcion: item.estarComedorComodidadesDescripcion,
          estarDiarioComodidadesDescripcion: item.estarDiarioComodidadesDescripcion,
          cocinaComodidadesDescripcion: item.cocinaComodidadesDescripcion,
          bañoComodidadesDescripcion: item.bañoComodidadesDescripcion,
          toiletteComodidadesDescripcion: item.toiletteComodidadesDescripcion,
          dormitorioComodidadesDescripcion: item.dormitorioComodidadesDescripcion,
          suiteComodidadesDescripcion: item.suiteComodidadesDescripcion,
          vestidorComodidadesDescripcion: item.vestidorComodidadesDescripcion,
          escritorioComodidadesDescripcion: item.escritorioComodidadesDescripcion,
          depositoComodidadesDescripcion: item.depositoComodidadesDescripcion,
          dormitorioServicioComodidadesDescripcion: item.dormitorioServicioComodidadesDescripcion,
          bañoServicioComodidadesDescripcion: item.bañoServicioComodidadesDescripcion,
          balcónComodidadesDescripcion: item.balcónComodidadesDescripcion,
          lavaderoComodidadesDescripcion: item.lavaderoComodidadesDescripcion,
          jardínComodidadesDescripcion: item.jardínComodidadesDescripcion,
          patioTechadoComodidadesDescripcion: item.patioTechadoComodidadesDescripcion,
          patioPérgolaComodidadesDescripcion: item.patioPérgolaComodidadesDescripcion,
          patioAbiertoComodidadesDescripcion: item.patioAbiertoComodidadesDescripcion,
          garageCerradoComodidadesDescripcion: item.garageCerradoComodidadesDescripcion,
          cocheraTechadaComodidadesDescripcion: item.cocheraTechadaComodidadesDescripcion,
          cocheraPérgolaComodidadesDescripcion: item.cocheraPérgolaComodidadesDescripcion,
          estacionamientoAbiertoComodidadesDescripcion: item.estacionamientoAbiertoComodidadesDescripcion,
          parrilleroCerradoComodidadesDescripcion: item.parrilleroCerradoComodidadesDescripcion,
          parrilleroTechadoComodidadesDescripcion: item.parrilleroTechadoComodidadesDescripcion,
          parrilleroPérgolaComodidadesDescripcion: item.parrilleroPérgolaComodidadesDescripcion,
          parrilleroAbiertoComodidadesDescripcion: item.parrilleroAbiertoComodidadesDescripcion,
          otrosComodidadesDescripcion: item.otrosComodidadesDescripcion,
          destinoPlanillaDescripcion: item.destinoPlanillaDescripcion,
          superficiePlanillaDescripcion: item.superficiePlanillaDescripcion,
          pavimentoPlanillaDescripcion: item.pavimentoPlanillaDescripcion,
          cielorrasoPlanillaDescripcion: item.cielorrasoPlanillaDescripcion,
          murosPlanillaDescripcion: item.murosPlanillaDescripcion,
          tipoDeCubiertaPlanillaDescripcion: item.tipoDeCubiertaPlanillaDescripcion,
          ventilacionNaturalPlanillaDescripcion: item.ventilacionNaturalPlanillaDescripcion,
          totalPlanillaDescripcion: item.totalPlanillaDescripcion,
        };

        return await ItemObraCivilService.updateItemObraCivil(item.id, updatedFields);
      });

      await Promise.all(updatePromises);

      // Actualizar el informe BBVA con todos los valores del formulario
      const response = await InformeBbvaService.updateInformeBbva(provisionalInformeId, formData);

      if (selectedFiles.length > 0) {
        await handleUploadPlanos(response.id);
      }

      if (selectedFilesFotos.length > 0) {
        await handleUploadFotos(response.id);
      }

      toast.success("Informe guardado correctamente");
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      toast.error("Error al guardar el informe");
      console.error(error);
    }
  };

  const handleFieldChangeComodidades = (id, field, value) => {
    setItemsObraCivil(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFieldChangePlanilla = (itemId, fieldName, index, newValue) => {
    setItemsObraCivil(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
            ...item,
            [fieldName]: fieldName === "totalPlanillaDescripcion"
              ? newValue // No usar split en totalPlanillaDescripcion
              : item[fieldName]
                .split(";")
                .map((val, idx) => (idx === index ? newValue : val))
                .join(";")
          }
          : item
      )
    );
  };


  const handleOpenModal = (e, local = null) => {
    e.stopPropagation();
    setCurrentItem();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchItemsObraCivilByInformeId(provisionalInformeId);
    calcularSumas(itemsObraCivil);
  };

  const handleOpenModalAntiguedades = (e, local = null) => {
    e.stopPropagation();
    setCurrentItem();
    setIsModalAntiguedadesOpen(true);
  };

  const handleCloseModalAntiguedades = () => {
    setIsModalAntiguedadesOpen(false);
    fetchItemsObraCivilByInformeId(provisionalInformeId);
  };


  const handleOpenModalAntiguedadesDescripcion = (e, local = null) => {
    e.stopPropagation();
    setCurrentItem();
    setIsModalAntiguedadesDescripcionOpen(true);
  };

  const handleCloseModalAntiguedadesDescripcion = () => {
    setIsModalAntiguedadesDescripcionOpen(false);
    fetchItemsObraCivilByInformeId(provisionalInformeId);
  };


  const handleOpenModalComodidadesDescripcion = (e, local = null) => {
    e.stopPropagation();
    setCurrentItem();
    setIsModalComodidadesDescripcionOpen(true);
  };

  const handleCloseModalComodidadesDescripcion = () => {
    setIsModalComodidadesDescripcionOpen(false);
    fetchItemsObraCivilByInformeId(provisionalInformeId);
  };

  const handleOpenModalPlanillaDescripcion = (e, local = null) => {
    e.stopPropagation();
    setCurrentItem();
    setIsModalPlanillaDescripcionOpen(true);
  };

  const handleCloseModalPlanillaDescripcion = () => {
    setIsModalPlanillaDescripcionOpen(false);
    fetchItemsObraCivilByInformeId(provisionalInformeId);
  };

  const handleSaveItem = async (local) => {
    handleCloseModal();
  };

  const handleSaveItemActualizacion = async (local) => {
    handleCloseModalAntiguedades();
  };

  const handleSaveItemActualizacionDescripcion = async (local) => {
    handleCloseModalAntiguedadesDescripcion();
  };

  // Función para manejar la selección de archivos (planos)
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...filePreviews]);

    // Si necesitas mantener las URL en el estado del formulario (para reemplazar setFieldValue)
    // puedes actualizar formData aquí:
    if (files.length > 0) {
      // Si quieres almacenar los archivos completos en formData
      setFormData(prev => ({
        ...prev,
        selectedFiles: [...(prev.selectedFiles || []), ...files]
      }));
    }
  };

  // Función para manejar la selección de fotos
  const handleFileSelectFotos = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    setSelectedFilesFotos(prev => [...prev, ...files]);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImagesFotos(prev => [...prev, ...filePreviews]);

    // Actualizar el estado formData (reemplaza setFieldValue)
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        selectedFilesFotos: [...(prev.selectedFilesFotos || []), ...files]
      }));
    }
  };

  // Función para eliminar imágenes de planos
  const handleRemoveImage = (index) => {
    // Eliminar del estado de archivos seleccionados
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));

    // Eliminar la vista previa
    setPreviewImages(prev => {
      // Liberar URL de objeto
      URL.revokeObjectURL(prev[index]);
      // Filtrar el array
      return prev.filter((_, i) => i !== index);
    });

    // Actualizar el estado formData (reemplaza setFieldValue)
    setFormData(prev => ({
      ...prev,
      selectedFiles: (prev.selectedFiles || []).filter((_, i) => i !== index)
    }));
  };

  // Función para eliminar fotos
  const handleRemoveFotos = (index) => {
    // Eliminar del estado de archivos seleccionados
    setSelectedFilesFotos(prev => prev.filter((_, i) => i !== index));

    // Eliminar la vista previa
    setPreviewImagesFotos(prev => {
      // Liberar URL de objeto
      URL.revokeObjectURL(prev[index]);
      // Filtrar el array
      return prev.filter((_, i) => i !== index);
    });

    // Actualizar el estado formData (reemplaza setFieldValue)
    setFormData(prev => ({
      ...prev,
      selectedFilesFotos: (prev.selectedFilesFotos || []).filter((_, i) => i !== index)
    }));
  };

  // Para manejar las imágenes ya guardadas en la BD
  const handleRemoveStoredImage = (fieldName, index) => {
    // Obtener las URLs separadas por punto y coma
    const urls = (formData[fieldName] || "").split(";").filter(url => url && url.trim() !== "");

    // Remover la URL en el índice especificado
    urls.splice(index, 1);

    // Actualizar el estado con las URLs restantes
    setFormData(prev => ({
      ...prev,
      [fieldName]: urls.join(";")
    }));
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
      <h2 className="text-center text-2xl font-medium text-green-900 mx-auto my-10">
        INFORME DE TASACIÓN <br />
        INMUEBLE URBANO/RURAL PROPIEDAD COMÚN
        <span>
          <img
            src={BbvaLogo}
            alt=""
            className="h-8 inline-block ml-4"
          />
        </span>
      </h2>

      <div ref={formRef}>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
            <div className="grid grid-cols-12 gap-2">
              {/* Información General */}
              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN A- Resumen</h4>

                {/* Primera fila */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="fechaAsignacionServicioResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Fecha asignación:
                  </label>
                  <input
                    type="date"
                    id="fechaAsignacionServicioResumen"
                    name="fechaAsignacionServicioResumen"
                    value={formData.fechaAsignacionServicioResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="visitaFechaResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Fecha visita:
                  </label>
                  <input
                    type="date"
                    id="visitaFechaResumen"
                    name="visitaFechaResumen"
                    value={formData.visitaFechaResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="visitaInspectorResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Inspector:
                  </label>
                  <input
                    type="text"
                    id="visitaInspectorResumen"
                    name="visitaInspectorResumen"
                    value={formData.visitaInspectorResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                {/* Segunda fila con RadioGroup */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="tipoInformeResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Tipo de Informe:
                  </label>

                  <div className="col-span-4">
                    <RadioGroup
                      options={[
                        {
                          id: "definitivo",
                          value: "definitivo",
                          label: "Definitivo",
                          relatedFields: {
                            tipoInformeResumenDefinitivo: true,
                            tipoInformeResumenCorregido: false
                          }
                        },
                        {
                          id: "corregido",
                          value: "corregido",
                          label: "Corregido",
                          relatedFields: {
                            tipoInformeResumenDefinitivo: false,
                            tipoInformeResumenCorregido: true
                          }
                        }
                      ]}
                      name="tipoInformeResumen"
                      selectedValue={formData.tipoInformeResumen}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="tipoInformeResumen"
                      labelClassName="text-gray-700 text-sm p-1"
                      radioClassName="form-radio h-4 w-4"
                      horizontal={true}
                    />
                  </div>

                  <label
                    htmlFor="fechaInformeResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Fecha Informe:
                  </label>
                  <input
                    type="date"
                    id="fechaInformeResumen"
                    name="fechaInformeResumen"
                    value={formData.fechaInformeResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                {/* Tercera fila */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="clienteResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Cliente/s:
                  </label>
                  <input
                    type="text"
                    id="clienteResumen"
                    name="clienteResumen"
                    value={formData.clienteResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="oficialCuentaResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Oficial Cuentas:
                  </label>
                  <input
                    type="text"
                    id="oficialCuentaResumen"
                    name="oficialCuentaResumen"
                    value={formData.oficialCuentaResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                {/* Cuarta fila */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="firmaTasadorResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Firma Tasadora:
                  </label>
                  <input
                    type="text"
                    id="firmaTasadorResumen"
                    name="firmaTasadorResumen"
                    value={formData.firmaTasadorResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="representanteResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Representante:
                  </label>
                  <input
                    type="text"
                    id="representanteResumen"
                    name="representanteResumen"
                    value={formData.representanteResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                {/* Quinta fila */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="tasadorResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Tasador:
                  </label>
                  <input
                    type="text"
                    id="tasadorResumen"
                    name="tasadorResumen"
                    value={formData.tasadorResumen || ""}
                    onChange={handleInputChange}
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
              </div>


              <div className="col-span-12 space-y-4 p-3 rounded border ">

                <h4 className="text-xl text-green-900 text-center">Identificación y Ubicación</h4>

                <div className="grid grid-cols-12 gap-4">

                  <div className="col-span-2">
                    <RadioGroup
                      options={[
                        {
                          id: "Norte",
                          value: "norte",
                          label: "Norte",
                          relatedFields: {
                            ubicacionNorteResumen: true,
                            ubicacionSurResumen: false
                          }
                        },
                        {
                          id: "Sur",
                          value: "sur",
                          label: "Sur",
                          relatedFields: {
                            ubicacionNorteResumen: false,
                            ubicacionSurResumen: true
                          }
                        }
                      ]}
                      name="ubicacionResumen"
                      selectedValue={formData.ubicacionResumen}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="ubicacion"
                      labelClassName="text-gray-700 text-sm"
                      radioClassName="form-radio h-4 w-4"
                      horizontal={true}
                    />
                  </div>

                  <div className="col-span-2">
                    <RadioGroup
                      options={[
                        {
                          id: "Urbano",
                          value: "urbano",
                          label: "Urbano",
                          relatedFields: {
                            tipoUrbanoResumen: true,
                            tipoSuburbanoResumen: false
                          }
                        },
                        {
                          id: "Suburbano",
                          value: "suburbano",
                          label: "Suburbano",
                          relatedFields: {
                            tipoUrbanoResumen: false,
                            tipoSuburbanoResumen: true
                          }
                        }
                      ]}
                      name="tipoResumen"
                      selectedValue={formData.tipoResumen}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="tipoResumen"
                      labelClassName="text-gray-700 text-sm"
                      radioClassName="form-radio h-4 w-4"
                      horizontal={true}
                    />
                  </div>

                  <div className="col-span-5">
                    <label
                      htmlFor="ruralResumen"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Rural:
                    </label>
                    <input
                      type="number"
                      id="ruralResumen"
                      name="ruralResumen"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="padronResumen"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Padrón:
                    </label>
                    <input
                      type="number"
                      id="padronResumen"
                      name="padronResumen"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="manzanaResumen"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Manzana:
                    </label>
                    <input
                      type="number"
                      id="manzanaResumen"
                      name="manzanaResumen"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="seccionJudicialCatastralResumen"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Sec. Jud./Catast.:
                    </label>
                    <input
                      type="text"
                      id="seccionJudicialCatastralResumen"
                      name="seccionJudicialCatastralResumen"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="localidadParajeResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Localidad/Paraje:
                  </label>
                  <input
                    type="text"
                    id="localidadParajeResumen"
                    name="localidadParajeResumen"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="departamentoResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Departamento:
                  </label>
                  <input
                    type="text"
                    id="departamentoResumen"
                    name="departamentoResumen"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">

                  <label
                    htmlFor="calleModoAccesoResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Calle/Modo acceso:
                  </label>
                  <input
                    type="text"
                    id="calleModoAccesoResumen"
                    name="calleModoAccesoResumen"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="nombreNroPuertaResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Nombre/Nro Puerta:
                  </label>
                  <input
                    type="text"
                    id="nombreNroPuertaResumen"
                    name="nombreNroPuertaResumen"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                </div>

                <div className="grid grid-cols-12 gap-4 items-center">


                  <label
                    htmlFor="otrasReferenciasUbicacionResumen"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Otras referencias de ubicación:
                  </label>
                  <input
                    type="text"
                    id="otrasReferenciasUbicacionResumen"
                    name="otrasReferenciasUbicacionResumen"
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                </div>


                <div className="grid grid-cols-12 gap-4 ">

                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Régimen futuro:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "Comun",
                          value: "comun",
                          label: "Común",
                          relatedFields: {
                            regimenFuturoComunResumen: true,
                            regimenFuturoPropiedadHorizontalResumen: false,
                            regimenFuturoUrbanizacionPHorizontalResumen: false
                          }
                        },
                        {
                          id: "PropiedadHorizontal",
                          value: "propiedadHorizontal",
                          label: "P. Hor.",
                          relatedFields: {
                            regimenFuturoComunResumen: false,
                            regimenFuturoPropiedadHorizontalResumen: true,
                            regimenFuturoUrbanizacionPHorizontalResumen: false
                          }
                        },
                        {
                          id: "UrbanizacionPHorizontal",
                          value: "UrbanizacionPHorizontal",
                          label: "Urb. P.Hor.",
                          relatedFields: {
                            regimenFuturoComunResumen: false,
                            regimenFuturoPropiedadHorizontalResumen: false,
                            regimenFuturoUrbanizacionPHorizontalResumen: true
                          }
                        }
                      ]}
                      name="regimen"
                      selectedValue={formData.regimen}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="regimen"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                  <div className="col-span-4 space-y-4">

                    <label className="block text-sm text-gray-700 font-bold mb-2">Terreno</label>
                    <RadioGroup
                      options={[
                        {
                          id: "Baldio",
                          value: "baldio",
                          label: "Terreno Baldio",
                          relatedFields: {
                            terrenoBaldioResumen: true,
                            terrenoEdificadoResumen: false
                          }
                        },
                        {
                          id: "Edificado",
                          value: "edificado",
                          label: "Terreno Baldio",
                          relatedFields: {
                            terrenoBaldioResumen: false,
                            terrenoEdificadoResumen: true
                          }
                        }
                      ]}
                      name="terreno"
                      selectedValue={formData.terreno}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="terreno"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>


                  <div className="col-span-4 space-y-4">

                    <label className="block text-sm text-gray-700 font-bold mb-2">Destino</label>

                    <RadioGroup
                      options={[
                        {
                          id: "vivienda",
                          value: "vivienda",
                          label: "Destino Vivienda",
                          relatedFields: {
                            destinoViviendaResumen: true,
                            destinoComercioResumen: false,
                            destinoOtrosResumen: false
                          }
                        },
                        {
                          id: "Baldio",
                          value: "Baldio",
                          label: "Destino Baldio",
                          relatedFields: {
                            destinoViviendaResumen: false,
                            destinoComercioResumen: true,
                            destinoOtrosResumen: false
                          }
                        },
                        {
                          id: "Otros",
                          value: "Otros",
                          label: "Destino Otros",
                          relatedFields: {
                            destinoViviendaResumen: false,
                            destinoComercioResumen: false,
                            destinoOtrosResumen: true
                          }
                        }
                      ]}
                      name="destino"
                      selectedValue={formData.destino}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="destino"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>



                </div>

                <div className="grid grid-cols-12 gap-4">

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Tipología</label>

                    <RadioGroup
                      options={[
                        {
                          id: "casa",
                          value: "casa",
                          label: "Casa",
                          relatedFields: {
                            tipologiaCasaResumen: true,
                            tipologiaApartamentoResumen: false,
                            tipologiaOtraResumen: false
                          }
                        },
                        {
                          id: "apartamento",
                          value: "Apartamento",
                          label: "Apartamento",
                          relatedFields: {
                            tipologiaCasaResumen: false,
                            tipologiaApartamentoResumen: true,
                            tipologiaOtraResumen: false
                          }
                        },
                        {
                          id: "Otra",
                          value: "Otra",
                          label: "Otra",
                          relatedFields: {
                            tipologiaCasaResumen: false,
                            tipologiaApartamentoResumen: false,
                            tipologiaOtraResumen: true
                          }
                        }
                      ]}
                      name="tipologia"
                      selectedValue={formData.tipologia}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="tipologia"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Situación construcciones</label>


                    <RadioGroup
                      options={[
                        {
                          id: "terminadas",
                          value: "terminadas",
                          label: "Terminadas",
                          relatedFields: {
                            situacionConstruccionesTerminadasResumen: true,
                            situacionConstruccionesInconclusasResumen: false
                          }
                        },
                        {
                          id: "inconclusas",
                          value: "inconclusas",
                          label: "Inconclusas",
                          relatedFields: {
                            situacionConstruccionesTerminadasResumen: false,
                            situacionConstruccionesInconclusasResumen: true
                          }
                        },
                      ]}
                      name="construcciones"
                      selectedValue={formData.construcciones}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="construcciones"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                </div>


                <div className="col-span-12 space-y-4">
                  <h4 className="text-xl text-green-900 text-center mb-3">Tipo de construcción</h4>
                  <div className="p-3 rounded">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Grupo de radio buttons */}
                      <div className="flex-grow">
                        <RadioGroup
                          options={[
                            {
                              id: "tradicional",
                              value: "tradicional",
                              label: "Tradicional",
                              relatedFields: {
                                tipoConstruccionTradicionalResumen: true,
                                tipoConstruccionMaderaResumen: false,
                                tipoConstruccionSteelFramingResumen: false,
                                tipoConstruccionContenedorResumen: false
                              }
                            },
                            {
                              id: "madera",
                              value: "madera",
                              label: "Madera",
                              relatedFields: {
                                tipoConstruccionTradicionalResumen: false,
                                tipoConstruccionMaderaResumen: true,
                                tipoConstruccionSteelFramingResumen: false,
                                tipoConstruccionContenedorResumen: false
                              }
                            },
                            {
                              id: "steelFraming",
                              value: "steelFraming",
                              label: "Steel Framing",
                              relatedFields: {
                                tipoConstruccionTradicionalResumen: false,
                                tipoConstruccionMaderaResumen: false,
                                tipoConstruccionSteelFramingResumen: true,
                                tipoConstruccionContenedorResumen: false
                              }
                            },
                            {
                              id: "contenedor",
                              value: "contenedor",
                              label: "Contenedor",
                              relatedFields: {
                                tipoConstruccionTradicionalResumen: false,
                                tipoConstruccionMaderaResumen: false,
                                tipoConstruccionSteelFramingResumen: false,
                                tipoConstruccionContenedorResumen: true
                              }
                            }
                          ]}
                          name="tipoConstruccion"
                          selectedValue={formData.tipoConstruccion}
                          onChange={handleInputChange}
                          onOptionChange={(relatedFields) => {
                            setFormData(prev => ({
                              ...prev,
                              ...relatedFields
                            }));
                          }}
                          idPrefix="tipoConstruccion"
                          labelClassName="ml-2 text-sm text-gray-700"
                          radioClassName="form-radio h-4 w-4"
                          horizontal={true}
                        />
                      </div>

                      {/* Campo de texto */}
                      <div className="flex items-center">
                        <label
                          htmlFor="tipoConstruccionCombinadaOtrosResumen"
                          className="text-sm text-gray-700 font-bold mr-3 whitespace-nowrap"
                        >
                          Combinada/Otros:
                        </label>
                        <input
                          type="text"
                          id="tipoConstruccionCombinadaOtrosResumen"
                          name="tipoConstruccionCombinadaOtrosResumen"
                          value={formData.tipoConstruccionCombinadaOtrosResumen}
                          onChange={handleInputChange}
                          className="px-2 py-1 w-60 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col items-center">
                  <label
                    htmlFor="descripcionResumen"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >
                    Descripción:
                  </label>
                  <input
                    component="textarea"
                    id="descripcionResumen"
                    name="descripcionResumen"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>
              </div>


              <div className="col-span-12 flex flex-col  space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900 text-center">Tasación</h4>

                <div className="grid grid-cols-12 gap-4 ">
                  <label
                    htmlFor="superficieTerrenoResumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Superficie Terreno (m²):
                  </label>
                  <div className="col-span-3 ">
                    <input
                      type="number"
                      id="superficieTerrenoResumen"
                      name="superficieTerrenoResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">
                  <label
                    htmlFor="superficieConsideradaObraCivilResumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Superficie Considerada Obra Civil (m²):
                  </label>
                  <div className="col-span-3 ">
                    <input
                      type="number"
                      id="superficieConsideradaObraCivilResumen"
                      name="superficieConsideradaObraCivilResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">

                  <label
                    htmlFor=""
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                  </label>
                  <label
                    htmlFor=""
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-center"
                  >
                    U$S/m²
                  </label>
                  <label
                    htmlFor=""
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-center"
                  >
                    U$S Total
                  </label>
                </div>

                <div className="grid grid-cols-12 gap-4 ">

                  <label
                    htmlFor="valorTerrenoM2Resumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Valor de Terreno:
                  </label>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorTerrenoM2Resumen"
                      name="valorTerrenoM2Resumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorTerrenoTotalResumen"
                      name="valorTerrenoTotalResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">

                  <label
                    htmlFor="valorObraCivilM2Resumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Valor de  Obra Civil:
                  </label>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorObraCivilM2Resumen"
                      name="valorObraCivilM2Resumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorObraCivilTotalResumen"
                      name="valorObraCivilTotalResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">

                  <label
                    htmlFor="valorMercadoM2Resumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Valor de Mercado:
                  </label>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorMercadoM2Resumen"
                      name="valorMercadoM2Resumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorMercadoTotalResumen"
                      name="valorMercadoTotalResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">

                  <label
                    htmlFor="valorRemateM2Resumen"
                    className="col-span-3 text-sm text-gray-700 font-bold pr-2 text-left"
                  >
                    Valor de Remate:
                  </label>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorRemateM2Resumen"
                      name="valorRemateM2Resumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      id="valorRemateTotalResumen"
                      name="valorRemateTotalResumen"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

              </div>

              <div className="col-span-12 flex flex-col  space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900 text-center">Síntesis de Observaciones del Informe</h4>
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="col-span-12 ">
                    <input
                      component="textarea"
                      id="sintesisObservacionesInformeResumen"
                      name="sintesisObservacionesInformeResumen"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-4">
                  <div className="col-span-12">
                    <h6 className="text-lg text-green-900 text-center">Cotización</h6>
                  </div>
                  <div className="col-span-12 flex justify-center gap-8">
                    {/* Columna 1 */}
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor="tipoCambioCotizacionResumen"
                        className="text-sm text-gray-700 font-bold mb-2">
                        Tipo de cambio
                      </label>
                      <input
                        type="number"
                        id="tipoCambioCotizacionResumen"
                        name="tipoCambioCotizacionResumen"
                        className="w-32 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor="fechaCotizacionResumen"
                        className="text-sm text-gray-700 font-bold mb-2">
                        Fecha
                      </label>
                      <input
                        type="date"
                        id="fechaCotizacionResumen"
                        name="fechaCotizacionResumen"
                        className="w-32 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor="fuenteCotizacionResumen"
                        className="text-sm text-gray-700 font-bold mb-2">
                        Fuente
                      </label>
                      <input
                        type="text"
                        id="fuenteCotizacionResumen"
                        name="fuenteCotizacionResumen"
                        className="w-32 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 ">
                  <div className="col-span-12 flex justify-center gap-8">

                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 p-4 rounded-md mb-2">
                        <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                          Firma Tasador
                        </label>
                        <input
                          type="hidden"
                          id="firmaTasadorUrlResumen"
                          name="firmaTasadorUrlResumen"
                        />
                        <input
                          type="file"
                          id="firmaTasadorFile"
                          name="firmaTasadorFile"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                          onChange={async (event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                              // Nueva función para manejar la carga de archivos sin setFieldValue
                              const fileUrl = await handleFileUpload(file);
                              if (fileUrl) {
                                // Actualizar el estado directamente sin usar setFieldValue
                                setFormData(prev => ({
                                  ...prev,
                                  firmaTasadorUrlResumen: fileUrl
                                }));
                                // Si aún necesitas establecer una vista previa
                                setFirmaTasadorPreview(fileUrl);
                              }
                            }
                          }}
                        />
                        {firmaTasadorPreview && (
                          <div className="flex justify-center mt-2">
                            <img src={firmaTasadorPreview} alt="Firma Tasador" className="h-32" />
                          </div>
                        )}
                        <input
                          type="text"
                          id="firmaTasadorAclaracionResumen"
                          name="firmaTasadorAclaracionResumen"
                          placeholder="Aclaración Firma"
                          className="w-full mt-2 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 p-4 rounded-md mb-2">
                        <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                          Firma Representante
                        </label>
                        <input
                          type="hidden"
                          id="firmaRepresentanteUrlResumen"
                          name="firmaRepresentanteUrlResumen"
                        />


                        <input
                          type="file"
                          id="firmaRepresentanteFile"
                          name="firmaRepresentanteFile"
                          accept="image/*"
                          className=" block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                          onChange={async (event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                              // Nueva función para manejar la carga de archivos sin setFieldValue
                              const fileUrl = await handleFileUpload(file);
                              if (fileUrl) {
                                // Actualizar el estado directamente sin usar setFieldValue
                                setFormData(prev => ({
                                  ...prev,
                                  firmaRepresentanteUrlResumen: fileUrl
                                }));
                                // Si aún necesitas establecer una vista previa
                                setFirmaRepresentantePreview(fileUrl);
                              }
                            }
                          }}
                        />
                        {firmaRepresentantePreview && (
                          <div className="flex justify-center mt-2">
                            <img src={firmaRepresentantePreview} alt="Firma Representante" className="h-32" />
                          </div>
                        )}
                        <input
                          type="text"
                          id="firmaRepresentanteAclaracionResumen"
                          name="firmaRepresentanteAclaracionResumen"
                          placeholder="Aclaración Firma"
                          className="w-full mt-2 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              <div className="col-span-12 space-y-4 border p-3 rounded">
                <div className="col-span-12 space-y-4 ">
                  <h4 className="text-xl text-green-900">SECCIÓN B- Información general</h4>

                  {/* Título de subsección */}
                  <h6 className="text-xl p-2 text-green-900 text-center">Información del Cliente</h6>

                  {/* Primera fila */}
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label
                      htmlFor="nombresInformacionGeneral"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Nombre/s:
                    </label>
                    <input
                      type="text"
                      id="nombresInformacionGeneral"
                      name="nombresInformacionGeneral"
                      value={formData.nombresInformacionGeneral || ""}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="cedulaInformacionGeneral"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Cédula/s de Identidad:
                    </label>
                    <input
                      type="text"
                      id="cedulaInformacionGeneral"
                      name="cedulaInformacionGeneral"
                      value={formData.cedulaInformacionGeneral || ""}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  {/* Segunda fila - teléfono, celular y email */}
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label
                      htmlFor="telefonoInformacionGeneral"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Teléfono:
                    </label>
                    <input
                      type="tel"
                      id="telefonoInformacionGeneral"
                      name="telefonoInformacionGeneral"
                      value={formData.telefonoInformacionGeneral || ""}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="celularInformacionGeneral"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Celular:
                    </label>
                    <input
                      type="tel"
                      id="celularInformacionGeneral"
                      name="celularInformacionGeneral"
                      value={formData.celularInformacionGeneral || ""}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center">
                    <label
                      htmlFor="mailInformacionGeneral"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Mail/s:
                    </label>
                    <input
                      type="email"
                      id="mailInformacionGeneral"
                      name="mailInformacionGeneral"
                      value={formData.mailInformacionGeneral || ""}
                      onChange={handleInputChange}
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                </div>

                <h6 className="text-xl p-2 text-green-900 text-center">Información Oficial de Cuentas</h6>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="nombreInformacionOficialCuentas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombreInformacionOficialCuentas"
                    name="nombreInformacionOficialCuentas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="sucursalInformacionOficialCuentas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Sucursal:
                  </label>
                  <input
                    type="text"
                    id="sucursalInformacionOficialCuentas"
                    name="sucursalInformacionOficialCuentas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="telefonoInformacionOficialCuentas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    id="telefonoInformacionOficialCuentas"
                    name="telefonoInformacionOficialCuentas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="mailInformacionOficialCuentas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Mail:
                  </label>
                  <input
                    type="text"
                    id="mailInformacionOficialCuentas"
                    name="mailInformacionOficialCuentas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <h6 className="text-xl p-2 text-green-900 text-center">Información del Tasador</h6>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="nombreInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Nom. Firma:
                  </label>
                  <input
                    type="text"
                    id="nombreInformacionTasador"
                    name="nombreInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="direccionInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Dirección:
                  </label>
                  <input
                    type="text"
                    id="direccionInformacionTasador"
                    name="direccionInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">

                  <label
                    htmlFor="telefonoInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Teléfono:
                  </label>
                  <input
                    type="number"
                    id="telefonoInformacionTasador"
                    name="telefonoInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="representanteInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Representante:
                  </label>
                  <input
                    type="text"
                    id="representanteInformacionTasador"
                    name="representanteInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="nombreTasadorInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Nombre Tasador:
                  </label>
                  <input
                    type="text"
                    id="nombreTasadorInformacionTasador"
                    name="nombreTasadorInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="profesionTasadorInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Profesión:
                  </label>
                  <input
                    type="text"
                    id="profesionTasadorInformacionTasador"
                    name="profesionTasadorInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">

                  <label
                    htmlFor="telefonoCelularTasadorInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Teléfono y Celular:
                  </label>
                  <input
                    type="text"
                    id="telefonoCelularTasadorInformacionTasador"
                    name="telefonoCelularTasadorInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="mailTasadorInformacionTasador"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Mail:
                  </label>
                  <input
                    type="text"
                    id="mailTasadorInformacionTasador"
                    name="mailTasadorInformacionTasador"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <h6 className="text-lg p-2 text-green-900 text-center">Informe Negativo precedente</h6>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "noSeEmitio", // ID simple
                          desc: "No se emitió" // Texto a mostrar
                        }
                      ]}
                      name="noSeEmitioInformacionTasadorInfNegativo"
                      selectedValues={formData.noSeEmitioInformacionTasadorInfNegativo}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 font-bold"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>

                  <label
                    htmlFor="emitioElInformacionTasadorInfNegativo"
                    className="col-span-1 text-sm text-gray-700 font-bold text-right"
                  >
                    Emitido el:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="date"
                      id="emitioElInformacionTasadorInfNegativo"
                      name="emitioElInformacionTasadorInfNegativo"
                      value={formData.emitioElInformacionTasadorInfNegativo || ""}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <label
                    htmlFor="motivosInformacionTasadorInfNegativo"
                    className="col-span-1 text-sm text-gray-700 font-bold text-right"
                  >
                    Motivos:
                  </label>
                  <div className="col-span-6">
                    <textarea
                      id="motivosInformacionTasadorInfNegativo"
                      name="motivosInformacionTasadorInfNegativo"
                      value={formData.motivosInformacionTasadorInfNegativo || ""}
                      onChange={handleInputChange}
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>


                <h6 className="text-lg p-2 text-green-900 text-center">Síntesis de cambios respecto a Informe Definitivo precedente</h6>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "No se emitió",
                          desc: ""
                        }
                      ]}
                      name="noSeEmitioInformacionTasadorSintesisInfDefinitivo"
                      selectedValues={formData.noSeEmitioInformacionTasadorSintesisInfDefinitivo}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 font-bold"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>


                  <label
                    htmlFor="emitioElInformacionTasadorSintesisInfDefinitivo"
                    className="col-span-1 text-sm text-gray-700 font-bold text-right"
                  >
                    Emitido el:
                  </label>
                  <div className="col-span-2">

                    <input
                      type="date"
                      id="emitioElInformacionTasadorSintesisInfDefinitivo"
                      name="emitioElInformacionTasadorSintesisInfDefinitivo"
                      className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <label
                    htmlFor="descripcionInformacionTasadorSintesisInfDefinitivo"
                    className="col-span-1 text-sm text-gray-700 font-bold text-right"
                  >
                    Descripción
                  </label>
                  <div className="col-span-6">

                    <textarea
                      id="descripcionInformacionTasadorSintesisInfDefinitivo"
                      name="descripcionInformacionTasadorSintesisInfDefinitivo"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

              </div>

              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN C-  Identificación y Ubicación</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 space-y-4">
                    <RadioGroup
                      options={[
                        {
                          id: "norte",
                          value: "norte",
                          label: "Norte",
                          relatedFields: {
                            norteIdentificacionUbicacion: true,
                            surIdentificacionUbicacion: false
                          }
                        },
                        {
                          id: "sur",
                          value: "sur",
                          label: "Sur",
                          relatedFields: {
                            norteIdentificacionUbicacion: false,
                            surIdentificacionUbicacion: true
                          }
                        }
                      ]}
                      name="ubicacionIdentificacion"
                      selectedValue={formData.ubicacionIdentificacion}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="ubicacionIdentificacion"
                      labelClassName="text-gray-700 text-sm"
                      radioClassName="form-radio h-4 w-4"
                      horizontal={true}
                    />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <RadioGroup
                      options={[
                        {
                          id: "urbano",
                          value: "urbano",
                          label: "Urbano",
                          relatedFields: {
                            urbanoIdentificacionUbicacion: true,
                            suburbanoIdentificacionUbicacion: false
                          }
                        },
                        {
                          id: "suburbano",
                          value: "suburbano",
                          label: "Suburbano",
                          relatedFields: {
                            urbanoIdentificacionUbicacion: false,
                            suburbanoIdentificacionUbicacion: true
                          }
                        }
                      ]}
                      name="tipoIdentificacionUbicacion"
                      selectedValue={formData.tipoIdentificacionUbicacion}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="tipoIdentificacionUbicacion"
                      labelClassName="text-gray-700 text-sm"
                      radioClassName="form-radio h-4 w-4"
                      horizontal={true}
                    />
                  </div>


                  <div className="col-span-5">
                    <label
                      htmlFor="ruralIdentificacionUbicacion"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Rural:
                    </label>
                    <input
                      type="number"
                      id="ruralIdentificacionUbicacion"
                      name="ruralIdentificacionUbicacion"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="padronIdentificacionUbicacion"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Padrón:
                    </label>
                    <input
                      type="number"
                      id="padronIdentificacionUbicacion"
                      name="padronIdentificacionUbicacion"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="manzanaIdentificacionUbicacion"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Manzana:
                    </label>
                    <input
                      type="number"
                      id="manzanaIdentificacionUbicacion"
                      name="manzanaIdentificacionUbicacion"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="seccionJudicialCatastralIdentificacionUbicacion"
                      className=" text-sm text-gray-700 font-bold"
                    >
                      Sec. Jud./Catast.:
                    </label>
                    <input
                      type="text"
                      id="seccionJudicialCatastralIdentificacionUbicacion"
                      name="seccionJudicialCatastralIdentificacionUbicacion"
                      className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                </div>

                <div className="col-span-12 space-y-4 p-3">
                  <div className="grid grid-cols-12 gap-4 items-center">


                    <label
                      htmlFor="localidadParajeIdentificacionUbicacion"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Localidad/Paraje:
                    </label>
                    <input
                      type="text"
                      id="localidadParajeIdentificacionUbicacion"
                      name="localidadParajeIdentificacionUbicacion"
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="departamentoIdentificacionUbicacion"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Departamento:
                    </label>
                    <input
                      type="text"
                      id="departamentoIdentificacionUbicacion"
                      name="departamentoIdentificacionUbicacion"
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="calleModoAccesoIdentificacionUbicacion"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Calle/Modo acceso:
                    </label>
                    <input
                      type="text"
                      id="calleModoAccesoIdentificacionUbicacion"
                      name="calleModoAccesoIdentificacionUbicacion"
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="nombreNroPuertaIdentificacionUbicacion"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Nombre/Nro Puerta:
                    </label>
                    <input
                      type="text"
                      id="nombreNroPuertaIdentificacionUbicacion"
                      name="nombreNroPuertaIdentificacionUbicacion"
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="otrasReferenciasUbicacionIdentificacionUbicacion"
                      className="col-span-2 text-sm text-gray-700 font-bold"
                    >
                      Otras referencias de ubicación:
                    </label>
                    <input
                      type="text"
                      id="otrasReferenciasUbicacionIdentificacionUbicacion"
                      name="otrasReferenciasUbicacionIdentificacionUbicacion"
                      className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 space-y-4">

                      <label className="block text-sm text-gray-700 font-bold mb-2">Régimen futuro:</label>
                      <RadioGroup
                        options={[
                          {
                            id: "Comun",
                            value: "comun",
                            label: "Común",
                            relatedFields: {
                              regimenFuturoComunIdentificacionUbicacion: true,
                              regimenFuturoPropiedadHorizontalIdentificacionUbicacion: false,
                              regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion: false
                            }
                          },
                          {
                            id: "PropiedadHorizontal",
                            value: "propiedadHorizontal",
                            label: "P. Hor.",
                            relatedFields: {
                              regimenFuturoComunIdentificacionUbicacion: false,
                              regimenFuturoPropiedadHorizontalIdentificacionUbicacion: true,
                              regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion: false
                            }
                          },
                          {
                            id: "UrbanizacionPHorizontal",
                            value: "UrbanizacionPHorizontal",
                            label: "Urb. P.Hor.",
                            relatedFields: {
                              regimenFuturoComunIdentificacionUbicacion: false,
                              regimenFuturoPropiedadHorizontalIdentificacionUbicacion: false,
                              regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion: true
                            }
                          }
                        ]}
                        name="regimenFuturo"
                        selectedValue={formData.regimenFuturo}
                        onChange={handleInputChange}
                        onOptionChange={(relatedFields) => {
                          setFormData(prev => ({
                            ...prev,
                            ...relatedFields
                          }));
                        }}
                        idPrefix="regimenFuturo"
                        labelClassName="p-2 text-gray-700  text-sm"
                        radioClassName="form-radio h-4 w-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN D-Descripción del terreno</h4>
                <h6 className="text-lg text-green-900 text-center mb-4">D.1-Características</h6>

                <div className="grid grid-cols-12 gap-4 items-center">

                  <label
                    htmlFor="superficieTerrenoCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Superficie terreno (m²):
                  </label>

                  <input
                    type="number"
                    id="superficieTerrenoCaracteristicas"
                    name="superficieTerrenoCaracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="formaCaracteristicas"
                    className="col-span-1 text-sm text-gray-700 font-bold"
                  >
                    Forma
                  </label>
                  <input
                    type="text"
                    id="formaCaracteristicas"
                    name="formaCaracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="ubicacionManzanaCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Ubicación en la manzana
                  </label>
                  <input
                    type="text"
                    id="ubicacionManzanaCaracteristicas"
                    name="ubicacionManzanaCaracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="orientacionCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Orientación
                  </label>
                  <input
                    type="text"
                    id="orientacionCaracteristicas"
                    name="orientacionCaracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                </div>
                <div className="grid grid-cols-12 gap-4 items-center">

                  <div className="col-span-2 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Estado:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "baldioCaracteristicas",
                          value: "baldioCaracteristicas",
                          label: "Baldio",
                          relatedFields: {
                            baldioCaracteristicas: true,
                            edificadoCaracteristicas: false
                          }
                        },
                        {
                          id: "edificadoCaracteristicas",
                          value: "edificadoCaracteristicas",
                          label: "Edificado",
                          relatedFields: {
                            baldioCaracteristicas: false,
                            edificadoCaracteristicas: true
                          }
                        }
                      ]}
                      name="estado"
                      selectedValue={formData.estado || ""}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="estado"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>

                <p className="text-lg p-2 text-green-900 text-center">Deslindes según plano de Mensura inscripto en DNC</p>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="frente1Caracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Frente 1 (m)
                  </label>
                  <input
                    type="number"
                    id="frente1Caracteristicas"
                    name="frente1Caracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="frente2Caracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Frente 2 (m)
                  </label>
                  <input
                    type="number"
                    id="frente2Caracteristicas"
                    name="frente2Caracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                  <label
                    htmlFor="lateral1Caracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Lateral 1 (m)
                  </label>
                  <input
                    type="number"
                    id="lateral1Caracteristicas"
                    name="lateral1Caracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="lateral2Caracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Lateral 2 (m)
                  </label>
                  <input
                    type="number"
                    id="lateral2Caracteristicas"
                    name="lateral2Caracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="fondoCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >                      Fondo (m)
                  </label>
                  <input
                    type="number"
                    id="fondoCaracteristicas"
                    name="fondoCaracteristicas"
                    className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />

                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="otrosCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  > Otros</label>
                  <input
                    type="text"
                    id="otrosCaracteristicas"
                    name="otrosCaracteristicas"
                    className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="topografiaAltimetriaCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Topografía y altimetría
                  </label>
                  <input
                    type="text"
                    id="topografiaAltimetriaCaracteristicas"
                    name="topografiaAltimetriaCaracteristicas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="orientacionVistasCaracteristicas"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Orientación y vistas
                  </label>
                  <input
                    type="text"
                    id="orientacionVistasCaracteristicas"
                    name="orientacionVistasCaracteristicas"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Evacuación pluviales:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "adecuadaCaracteristicas",
                          value: "adecuadaCaracteristicas",
                          label: "Adecuada Caracteristicas",
                          relatedFields: {
                            adecuadaCaracteristicas: true,
                            inadecuadaCaracteristicas: false
                          }
                        },
                        {
                          id: "inadecuadaCaracteristicas",
                          value: "inadecuadaCaracteristicas",
                          label: "Inadecuada Caracteristicas",
                          relatedFields: {
                            adecuadaCaracteristicas: false,
                            inadecuadaCaracteristicas: true
                          }
                        }
                      ]}
                      name="evaluacionPlusvalia"
                      selectedValue={formData.terreno}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="evaluacionPlusvalia"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Probabilidad inundación:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "probableCaracteristicas",
                          value: "probableCaracteristicas",
                          label: "Probable",
                          relatedFields: {
                            probableCaracteristicas: true,
                            improbableCaracteristicas: false
                          }
                        },
                        {
                          id: "improbableCaracteristicas",
                          value: "improbableCaracteristicas",
                          label: "Improbable",
                          relatedFields: {
                            probableCaracteristicas: false,
                            improbableCaracteristicas: true
                          }
                        }
                      ]}
                      name="probabilidadInundacion"
                      selectedValue={formData.terreno}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="probabilidadInundacion"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                </div>



                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="descripcionCaracteristicas"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción:
                    </label>
                    <input
                      component="textarea"
                      id="descripcionCaracteristicas"
                      name="descripcionCaracteristicas"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>



                <div className="grid grid-cols-12 gap-2 ">
                  <div className="col-span-12 justify-center gap-8">

                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 p-4 rounded-md mb-2">
                        <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                          Foto aérea/Croquis de ubicación
                        </label>
                        <input
                          type="hidden"
                          id="fotoAreaCroquisUbicacionUrlCaracteristicas"
                          name="fotoAreaCroquisUbicacionUrlCaracteristicas"
                        />
                        <input
                          type="file"
                          id="fotoAreaCroquisUbicacionCaracteristicasFile"
                          name="fotoAreaCroquisUbicacionCaracteristicasFile"
                          accept="image/*"
                          className=" block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                          onChange={async (event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                              // Nueva función para manejar la carga de archivos sin setFieldValue
                              const fileUrl = await handleFileUpload(file);
                              if (fileUrl) {
                                // Actualizar el estado directamente sin usar setFieldValue
                                setFormData(prev => ({
                                  ...prev,
                                  fotoAreaCroquisUbicacionUrlCaracteristicas: fileUrl
                                }));
                                // Si aún necesitas establecer una vista previa
                                setFotoAreaCroquisUbicacionPreview(fileUrl);
                              }
                            }
                          }}
                        />
                        {fotoAreaCroquisUbicacionPreview && (
                          <div className="flex justify-center mt-2">
                            <img src={fotoAreaCroquisUbicacionPreview} alt="Foto Area Croquis Ubicacion" className="h-80" />
                          </div>
                        )}
                      </div>
                    </div>


                  </div>
                </div>

                <h6 className="text-lg p-2 text-green-900 text-center">D.2- Servicios e infraestructura</h6>

                <h6 className="text-base p-2 text-green-900 text-center">Vías de acceso y alumbrado</h6>



                <div className="grid grid-cols-12 gap-4">

                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Vías de acceso:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "bitumenViasAccesoCaracteristicas",
                          value: "bitumenViasAccesoCaracteristicas",
                          label: "Bitumen",
                          relatedFields: {
                            bitumenViasAccesoCaracteristicas: true,
                            otrosViasAccesoCaracteristicas: false
                          }
                        },
                        {
                          id: "otrosViasAccesoCaracteristicas",
                          value: "otrosViasAccesoCaracteristicas",
                          label: "Otros",
                          relatedFields: {
                            bitumenViasAccesoCaracteristicas: false,
                            otrosViasAccesoCaracteristicas: true
                          }
                        }
                      ]}
                      name="viasAcceso"
                      selectedValue={formData.viasAcceso}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="viasAcceso"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Estado vías de acceso:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "excelenteEstadoViasAccesoCaracteristicas",
                          value: "excelenteEstadoViasAccesoCaracteristicas",
                          label: "Excelente",
                          relatedFields: {
                            excelenteEstadoViasAccesoCaracteristicas: true,
                            regularEstadoViasAccesoCaracteristicas: false,
                            maloEstadoViasAccesoCaracteristicas: false
                          }
                        },
                        {
                          id: "regularEstadoViasAccesoCaracteristicas",
                          value: "regularEstadoViasAccesoCaracteristicas",
                          label: "Regular",
                          relatedFields: {
                            excelenteEstadoViasAccesoCaracteristicas: false,
                            regularEstadoViasAccesoCaracteristicas: true,
                            maloEstadoViasAccesoCaracteristicas: false
                          }
                        },
                        {
                          id: "maloEstadoViasAccesoCaracteristicas",
                          value: "maloEstadoViasAccesoCaracteristicas",
                          label: "Malo",
                          relatedFields: {
                            excelenteEstadoViasAccesoCaracteristicas: false,
                            regularEstadoViasAccesoCaracteristicas: false,
                            maloEstadoViasAccesoCaracteristicas: true
                          }
                        }
                      ]}
                      name="estadoViasAcceso"
                      selectedValue={formData.estadoViasAcceso}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="estadoViasAcceso"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Veredas:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "existenVeredasCaracteristicas",
                          value: "existenVeredasCaracteristicas",
                          label: "Existen",
                          relatedFields: {
                            existenVeredasCaracteristicas: true,
                            noExistenVeredasCaracteristicas: false
                          }
                        },
                        {
                          id: "noExistenVeredasCaracteristicas",
                          value: "noExistenVeredasCaracteristicas",
                          label: "No Existen",
                          relatedFields: {
                            existenVeredasCaracteristicas: false,
                            noExistenVeredasCaracteristicas: true
                          }
                        }
                      ]}
                      name="veredas"
                      selectedValue={formData.veredas}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="veredas"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>


                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Alumbrado público:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "suficienteAlumbradoPublicoCaracteristicas",
                          value: "suficienteAlumbradoPublicoCaracteristicas",
                          label: "Suficiente",
                          relatedFields: {
                            suficienteAlumbradoPublicoCaracteristicas: true,
                            insuficienteAlumbradoPublicoCaracteristicas: false,
                            noExisteAlumbradoPublicoCaracteristicas: false
                          }
                        },
                        {
                          id: "insuficienteAlumbradoPublicoCaracteristicas",
                          value: "insuficienteAlumbradoPublicoCaracteristicas",
                          label: "Insuficiente",
                          relatedFields: {
                            suficienteAlumbradoPublicoCaracteristicas: false,
                            insuficienteAlumbradoPublicoCaracteristicas: true,
                            noExisteAlumbradoPublicoCaracteristicas: false
                          }
                        },
                        {
                          id: "noExisteAlumbradoPublicoCaracteristicas",
                          value: "noExisteAlumbradoPublicoCaracteristicas",
                          label: "No existe",
                          relatedFields: {
                            suficienteAlumbradoPublicoCaracteristicas: false,
                            insuficienteAlumbradoPublicoCaracteristicas: false,
                            noExisteAlumbradoPublicoCaracteristicas: true
                          }
                        }
                      ]}
                      name="alumbradoPublico"
                      selectedValue={formData.alumbradoPublico}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="alumbradoPublico"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                </div>


                <h6 className="text-base p-2 text-green-900 text-center">Otros servicios e infraestructura</h6>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Abastecimiento de agua:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "publicoAbastecimientoAguaServiciosInfraestructura",
                          value: "publicoAbastecimientoAguaServiciosInfraestructura",
                          label: "Público",
                          relatedFields: {
                            publicoAbastecimientoAguaServiciosInfraestructura: true,
                            privadoAbastecimientoAguaServiciosInfraestructura: false,
                            sinConexionAbastecimientoAguaServiciosInfraestructura: false
                          }
                        },
                        {
                          id: "privadoAbastecimientoAguaServiciosInfraestructura",
                          value: "privadoAbastecimientoAguaServiciosInfraestructura",
                          label: "Privado",
                          relatedFields: {
                            publicoAbastecimientoAguaServiciosInfraestructura: true,
                            privadoAbastecimientoAguaServiciosInfraestructura: false,
                            sinConexionAbastecimientoAguaServiciosInfraestructura: false
                          }
                        },
                        {
                          id: "sinConexionAbastecimientoAguaServiciosInfraestructura",
                          value: "sinConexionAbastecimientoAguaServiciosInfraestructura",
                          label: "Sin conexión",
                          relatedFields: {
                            publicoAbastecimientoAguaServiciosInfraestructura: true,
                            privadoAbastecimientoAguaServiciosInfraestructura: false,
                            sinConexionAbastecimientoAguaServiciosInfraestructura: false
                          }
                        }
                      ]}
                      name="abastecimientoAgua"
                      selectedValue={formData.abastecimientoAgua}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="abastecimientoAgua"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Desagües:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "publicoDesaguesServiciosInfraestructura",
                          value: "publicoDesaguesServiciosInfraestructura",
                          label: "Público",
                          relatedFields: {
                            publicoDesaguesServiciosInfraestructura: true,
                            privadoDesaguesServiciosInfraestructura: false,
                            sinConexionDesaguesServiciosInfraestructura: false
                          }
                        },
                        {
                          id: "privadoDesaguesServiciosInfraestructura",
                          value: "privadoDesaguesServiciosInfraestructura",
                          label: "Privado",
                          relatedFields: {
                            publicoDesaguesServiciosInfraestructura: false,
                            privadoDesaguesServiciosInfraestructura: true,
                            sinConexionDesaguesServiciosInfraestructura: false
                          }
                        },
                        {
                          id: "sinConexionDesaguesServiciosInfraestructura",
                          value: "sinConexionDesaguesServiciosInfraestructura",
                          label: "Sin conexión",
                          relatedFields: {
                            publicoDesaguesServiciosInfraestructura: false,
                            privadoDesaguesServiciosInfraestructura: false,
                            sinConexionDesaguesServiciosInfraestructura: true
                          }
                        }
                      ]}
                      name="desagues"
                      selectedValue={formData.desagues}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="desagues"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Teléfono:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "publicoTelefonoServiciosInfraestructura",
                          value: "publicoTelefonoServiciosInfraestructura",
                          label: "Público",
                          relatedFields: {
                            publicoTelefonoServiciosInfraestructura: true,
                            sinConexionTelefonoServiciosInfraestructura: false,
                          }
                        },
                        {
                          id: "sinConexionTelefonoServiciosInfraestructura",
                          value: "sinConexionTelefonoServiciosInfraestructura",
                          label: "Sin conexión",
                          relatedFields: {
                            publicoTelefonoServiciosInfraestructura: false,
                            sinConexionTelefonoServiciosInfraestructura: true,
                          }
                        }
                      ]}
                      name="telefono"
                      selectedValue={formData.telefono}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="telefono"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Electricidad:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "publicoElectricidadServiciosInfraestructura",
                          value: "publicoElectricidadServiciosInfraestructura",
                          label: "Público",
                          relatedFields: {
                            publicoElectricidadServiciosInfraestructura: true,
                            privadoElectricidadServiciosInfraestructura: false,
                            sinConexionElectricidadServiciosInfraestructura: false,
                          }
                        },
                        {
                          id: "privadoElectricidadServiciosInfraestructura",
                          value: "privadoElectricidadServiciosInfraestructura",
                          label: "Privado",
                          relatedFields: {
                            publicoElectricidadServiciosInfraestructura: false,
                            privadoElectricidadServiciosInfraestructura: true,
                            sinConexionElectricidadServiciosInfraestructura: false,
                          }
                        },
                        {
                          id: "sinConexionElectricidadServiciosInfraestructura",
                          value: "sinConexionElectricidadServiciosInfraestructura",
                          label: "Sin conexión",
                          relatedFields: {
                            publicoElectricidadServiciosInfraestructura: false,
                            privadoElectricidadServiciosInfraestructura: false,
                            sinConexionElectricidadServiciosInfraestructura: true,
                          }
                        }
                      ]}
                      name="electricidad"
                      selectedValue={formData.electricidad}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="electricidad"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Gas:</label>
                    <RadioGroup
                      options={[
                        {
                          id: "publicoGasServiciosInfraestructura",
                          value: "publicoGasServiciosInfraestructura",
                          label: "Público",
                          relatedFields: {
                            publicoGasServiciosInfraestructura: true,
                            privadoGasServiciosInfraestructura: false,
                            sinConexionGasServiciosInfraestructura: false,
                          }
                        },
                        {
                          id: "privadoGasServiciosInfraestructura",
                          value: "privadoGasServiciosInfraestructura",
                          label: "Privado",
                          relatedFields: {
                            publicoGasServiciosInfraestructura: false,
                            privadoGasServiciosInfraestructura: true,
                            sinConexionGasServiciosInfraestructura: false,
                          }
                        },
                        {
                          id: "sinConexionGasServiciosInfraestructura",
                          value: "sinConexionGasServiciosInfraestructura",
                          label: "Sin conexión",
                          relatedFields: {
                            publicoGasServiciosInfraestructura: false,
                            privadoGasServiciosInfraestructura: false,
                            sinConexionGasServiciosInfraestructura: true,
                          }
                        }
                      ]}
                      name="gas"
                      selectedValue={formData.gas}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="gas"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="otrosServiciosInfraestructura"
                    className="col-span-1 text-sm text-gray-700 font-bold "
                  >
                    Otros:
                  </label>
                  <div className="col-span-11">
                    <textarea
                      id="otrosServiciosInfraestructura"
                      name="otrosServiciosInfraestructura"
                      value={formData.otrosServiciosInfraestructura || ""}
                      onChange={handleInputChange}
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <h6 className="text-base p-2 text-green-900 text-center">D.3- Observaciones</h6>

                <div className="p-4 flex flex-col items-center">
                  <label
                    htmlFor="observacionesSeccionLegalesBbvaObservaciones"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >
                    Observaciones de la SECCIÓN  para Legales BBVA
                  </label>
                  <input
                    component="textarea"
                    id="observacionesSeccionLegalesBbvaObservaciones"
                    name="observacionesSeccionLegalesBbvaObservaciones"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>
                <div className="p-4 flex flex-col items-center">
                  <label
                    htmlFor="otrasObservacionesSeccionObservaciones"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >Otras observaciones de la SECCIÓN
                  </label>
                  <input
                    component="textarea"
                    id="otrasObservacionesSeccionObservaciones"
                    name="otrasObservacionesSeccionObservaciones"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>
              </div>

              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN E- Descripción del inmueble</h4>
                <h6 className="text-lg text-green-900 text-center mb-4">E.1 Aspectos generales</h6>
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Destino</label>
                    <RadioGroup
                      options={[
                        {
                          id: "viviendaDestinoDescripcionInmueble",
                          value: "viviendaDestinoDescripcionInmueble",
                          label: "Vivienda",
                          relatedFields: {
                            viviendaDestinoDescripcionInmueble: true,
                            comercioDestinoDescripcionInmueble: false,
                            otrosDestinoDescripcionInmueble: false,
                          }
                        },
                        {
                          id: "comercioDestinoDescripcionInmueble",
                          value: "comercioDestinoDescripcionInmueble",
                          label: "Comercio",
                          relatedFields: {
                            viviendaDestinoDescripcionInmueble: false,
                            comercioDestinoDescripcionInmueble: true,
                            otrosDestinoDescripcionInmueble: false,
                          }
                        },
                        {
                          id: "otrosDestinoDescripcionInmueble",
                          value: "otrosDestinoDescripcionInmueble",
                          label: "Otros",
                          relatedFields: {
                            viviendaDestinoDescripcionInmueble: false,
                            comercioDestinoDescripcionInmueble: false,
                            otrosDestinoDescripcionInmueble: true,
                          }
                        }
                      ]}
                      name="destinoDescripcionInmueble"
                      selectedValue={formData.destinoDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="destinoDescripcionInmueble"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Tipología</label>
                    <RadioGroup
                      options={[
                        {
                          id: "casaTipologiaDescripcionInmueble",
                          value: "casaTipologiaDescripcionInmueble",
                          label: "Casa",
                          relatedFields: {
                            casaTipologiaDescripcionInmueble: true,
                            apartamentoTipologiaDescripcionInmueble: false,
                            otraTipologiaDescripcionInmueble: false,
                          }
                        },
                        {
                          id: "apartamentoTipologiaDescripcionInmueble",
                          value: "apartamentoTipologiaDescripcionInmueble",
                          label: "Apartamento",
                          relatedFields: {
                            casaTipologiaDescripcionInmueble: false,
                            apartamentoTipologiaDescripcionInmueble: true,
                            otraTipologiaDescripcionInmueble: false,
                          }
                        },
                        {
                          id: "otraTipologiaDescripcionInmueble",
                          value: "otraTipologiaDescripcionInmueble",
                          label: "Otra",
                          relatedFields: {
                            casaTipologiaDescripcionInmueble: false,
                            apartamentoTipologiaDescripcionInmueble: false,
                            otraTipologiaDescripcionInmueble: true,
                          }
                        }
                      ]}
                      name="tipologiaDescripcionInmueble"
                      selectedValue={formData.tipologiaDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="tipologiaDescripcionInmueble"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Situación construcciones</label>
                    <RadioGroup
                      options={[
                        {
                          id: "terminadasSituacionConstruccionesDescripcionInmueble",
                          value: "terminadasSituacionConstruccionesDescripcionInmueble",
                          label: "Terminadas",
                          relatedFields: {
                            terminadasSituacionConstruccionesDescripcionInmueble: true,
                            inconclusasSituacionConstruccionesDescripcionInmueble: false,
                          }
                        },
                        {
                          id: "inconclusasSituacionConstruccionesDescripcionInmueble",
                          value: "inconclusasSituacionConstruccionesDescripcionInmueble",
                          label: "Inconclusas",
                          relatedFields: {
                            terminadasSituacionConstruccionesDescripcionInmueble: false,
                            inconclusasSituacionConstruccionesDescripcionInmueble: true,
                          }
                        }
                      ]}
                      name="situacionConstruccionesDescripcionInmueble"
                      selectedValue={formData.situacionConstruccionesDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="situacionConstruccionesDescripcionInmueble"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="nivelesDescripcionInmueble"
                    className="col-span-1 text-sm text-gray-700 font-bold "
                  >
                    Niveles
                  </label>
                  <div className="col-span-11">
                    <textarea
                      id="nivelesDescripcionInmueble"
                      name="nivelesDescripcionInmueble"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Ubicación construcciones</label>
                    <RadioGroup
                      options={[
                        {
                          id: "Frente",
                          value: "frenteUbicacionConstrucciones",
                          label: "Frente",
                          relatedFields: {
                            frenteUbicacionConstrucciones: true,
                            contrafrenteUbicacionConstrucciones: false,
                            internoUbicacionConstrucciones: false,
                            fondoUbicacionConstrucciones: false,
                            otrosUbicacionConstrucciones: false
                          }
                        },
                        {
                          id: "Contrafrente",
                          value: "contrafrenteUbicacionConstrucciones",
                          label: "Contrafrente",
                          relatedFields: {
                            frenteUbicacionConstrucciones: false,
                            contrafrenteUbicacionConstrucciones: true,
                            internoUbicacionConstrucciones: false,
                            fondoUbicacionConstrucciones: false,
                            otrosUbicacionConstrucciones: false
                          }
                        },
                        {
                          id: "Interno",
                          value: "internoUbicacionConstrucciones",
                          label: "Interno",
                          relatedFields: {
                            frenteUbicacionConstrucciones: false,
                            contrafrenteUbicacionConstrucciones: false,
                            internoUbicacionConstrucciones: true,
                            fondoUbicacionConstrucciones: false,
                            otrosUbicacionConstrucciones: false
                          }
                        },
                        {
                          id: "Fondo",
                          value: "fondoUbicacionConstrucciones",
                          label: "Fondo",
                          relatedFields: {
                            frenteUbicacionConstrucciones: false,
                            contrafrenteUbicacionConstrucciones: false,
                            internoUbicacionConstrucciones: false,
                            fondoUbicacionConstrucciones: true,
                            otrosUbicacionConstrucciones: false
                          }
                        },
                        {
                          id: "Otros",
                          value: "otrosUbicacionConstrucciones",
                          label: "Otros",
                          relatedFields: {
                            frenteUbicacionConstrucciones: false,
                            contrafrenteUbicacionConstrucciones: false,
                            internoUbicacionConstrucciones: false,
                            fondoUbicacionConstrucciones: false,
                            otrosUbicacionConstrucciones: true
                          }
                        }
                      ]}
                      name="ubicacionConstrucciones"
                      selectedValue={formData.ubicacionConstrucciones}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="ubicacion"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>

                  <div className="col-span-6 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Agrupamiento de las construcciones</label>
                    <RadioGroup
                      options={[
                        {
                          id: "Unicas",
                          value: "unicasAgrupamientoConstrucciones",
                          label: "Únicas",
                          relatedFields: {
                            unicasAgrupamientoConstrucciones: true,
                            aisladasAgrupamientoConstrucciones: false,
                            apareadasAgrupamientoConstrucciones: false,
                            edificiosAgrupamientoConstrucciones: false,
                            otrosAgrupamientoConstrucciones: false
                          }
                        },
                        {
                          id: "Aisladas",
                          value: "aisladasAgrupamientoConstrucciones",
                          label: "Aisladas",
                          relatedFields: {
                            unicasAgrupamientoConstrucciones: false,
                            aisladasAgrupamientoConstrucciones: true,
                            apareadasAgrupamientoConstrucciones: false,
                            edificiosAgrupamientoConstrucciones: false,
                            otrosAgrupamientoConstrucciones: false
                          }
                        },
                        {
                          id: "Apareadas",
                          value: "apareadasAgrupamientoConstrucciones",
                          label: "Apareadas",
                          relatedFields: {
                            unicasAgrupamientoConstrucciones: false,
                            aisladasAgrupamientoConstrucciones: false,
                            apareadasAgrupamientoConstrucciones: true,
                            edificiosAgrupamientoConstrucciones: false,
                            otrosAgrupamientoConstrucciones: false
                          }
                        },
                        {
                          id: "Edificios",
                          value: "edificiosAgrupamientoConstrucciones",
                          label: "Edificio/s",
                          relatedFields: {
                            unicasAgrupamientoConstrucciones: false,
                            aisladasAgrupamientoConstrucciones: false,
                            apareadasAgrupamientoConstrucciones: false,
                            edificiosAgrupamientoConstrucciones: true,
                            otrosAgrupamientoConstrucciones: false
                          }
                        },
                        {
                          id: "Otros",
                          value: "otrosAgrupamientoConstrucciones",
                          label: "Otros",
                          relatedFields: {
                            unicasAgrupamientoConstrucciones: false,
                            aisladasAgrupamientoConstrucciones: false,
                            apareadasAgrupamientoConstrucciones: false,
                            edificiosAgrupamientoConstrucciones: false,
                            otrosAgrupamientoConstrucciones: true
                          }
                        }
                      ]}
                      name="agrupamientoConstrucciones"
                      selectedValue={formData.agrupamientoConstrucciones}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="agrupamiento"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>



                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="descripcionAspectosGenerales"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción
                    </label>
                    <input
                      id="descripcionAspectosGenerales"
                      name="descripcionAspectosGenerales"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="luminosidadVistasDescripcionInmueble"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Luminosidad/Vistas
                    </label>
                    <input
                      id="luminosidadVistasDescripcionInmueble"
                      name="luminosidadVistasDescripcionInmueble"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 ">
                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Planilla de Superficies  y Tipo de Construcción</p>

                    <div className="grid grid-template-rows: auto 1fr">
                      <h4 className="text-sm text-center text-gray-700 font-bold">Agregar Items Obra Civil</h4>
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
                    <h4 className="text-xl text-green-900">Items Obra Civil</h4>

                    <div className="grid grid-cols-12 items-center gap-4 bg-gray-100 p-2 rounded-t-md">
                      <div className="col-span-2 text-center text-green-900 font-bold">Tipo Obra Civil</div>
                      <div className="col-span-2 text-center text-green-900 font-bold">Obra Civil</div>
                      <div className="col-span-2 text-center text-green-900 font-bold">Tipo Construcción</div>
                      <div className="col-span-3 text-center text-green-900 font-bold">Superficie Documentada (m²)</div>
                      <div className="col-span-3 text-center text-green-900 font-bold">Superficie Verificada (m²)</div>
                    </div>

                    {itemsObraCivil && itemsObraCivil.map((itemObraCivil) => (
                      <div key={itemObraCivil.id} className="grid grid-cols-12 items-center gap-4 mb-1 p-2 bg-white rounded-md">
                        <select
                          as="select"
                          name={`tipoObraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                          className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          defaultValue={itemObraCivil.tipoObraCivilSeccionEDescripcionInmueble}
                          onChange={(e) => handleSelectChange(itemObraCivil.id, e.target.value)}
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="Superficie Cubierta">Superficie Cubierta</option>
                          <option value="Superficie Semi Cubierta">Superficie Semi Cubierta</option>
                          <option value="Otros">Otros</option>
                        </select>
                        <input
                          type="text"
                          name={`obraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                          className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          defaultValue={itemObraCivil.obraCivilSeccionEDescripcionInmueble}
                        />
                        <select
                          name={`tipoConstruccionSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                          className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          defaultValue={itemObraCivil.tipoConstruccionSeccionEDescripcionInmueble}
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="Tradicional">Tradicional</option>
                          <option value="Steel Framing">Steel Framing</option>
                          <option value="Contenedor">Contenedor</option>
                        </select>
                        <input
                          type="number"
                          name={`superficieDocumentadaObraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                          className="col-span-3 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          defaultValue={itemObraCivil.superficieDocumentadaObraCivilSeccionEDescripcionInmueble}
                          onChange={(e) => handleFieldChange(itemObraCivil.id, 'superficieDocumentadaObraCivilSeccionEDescripcionInmueble', e.target.value)}
                          onBlur={() => updateBackend(itemObraCivil.id)} // Actualiza el backend cuando el usuario sale del campo                          
                        />
                        <input
                          type="number"
                          name={`superficieVerificadaObraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                          className="col-span-3 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                          defaultValue={itemObraCivil.superficieVerificadaObraCivilSeccionEDescripcionInmueble}
                          onChange={(e) => handleFieldChange(itemObraCivil.id, 'superficieVerificadaObraCivilSeccionEDescripcionInmueble', e.target.value)}
                          onBlur={() => updateBackend(itemObraCivil.id)} // Actualiza el backend cuando el usuario sale del campo   
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-12 items-center gap-4 p-2 rounded-md font-bold text-gray-800 mt-2">
                      <div className="col-span-6 text-right">Superficie Cubierta:</div>
                      <div className="col-span-3 text-center">{sumaCubierta.documentada}</div>
                      <div className="col-span-3 text-center">{sumaCubierta.verificada}</div>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 p-2 rounded-md font-bold text-gray-800 mt-2">
                      <div className="col-span-6 text-right">Superficie Semi Cubierta:</div>
                      <div className="col-span-3 text-center">{sumaSemiCubierta.documentada}</div>
                      <div className="col-span-3 text-center">{sumaSemiCubierta.verificada}</div>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 p-2 rounded-md font-bold text-gray-800 mt-2">
                      <div className="col-span-6 text-right">Otros:</div>
                      <div className="col-span-3 text-center">{sumaOtros.documentada}</div>
                      <div className="col-span-3 text-center">{sumaOtros.verificada}</div>
                    </div>

                    {/* Totales Generales */}
                    <div className="grid grid-cols-12 items-center gap-4 mt-2  p-2 rounded-md font-bold text-gray-800">
                      <div className="col-span-6 text-right">Totales:</div>
                      <div className="col-span-3 text-center">{sumaDocumentada}</div>
                      <div className="col-span-3 text-center">{sumaVerificada}</div>
                    </div>

                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">
                      Categoría
                    </label>
                    <RadioGroup
                      options={[
                        {
                          id: "MuyBuena1",
                          value: "muyBuena1CategoriaDescripcionInmueble",
                          label: "1 Muy Buena",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: true,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "MuyBuena2",
                          value: "muyBuena2CategoriaDescripcionInmueble",
                          label: "1.5 Muy Buena",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: true,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Buena1",
                          value: "buena1CategoriaDescripcionInmueble",
                          label: "2 Buena",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: true,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Buena2",
                          value: "buena2CategoriaDescripcionInmueble",
                          label: "2.5 Buena",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: true,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Mediana1",
                          value: "mediana1CategoriaDescripcionInmueble",
                          label: "3 Mediana",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: true,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Mediana2",
                          value: "mediana2CategoriaDescripcionInmueble",
                          label: "3.5 Mediana",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: true,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Economica1",
                          value: "economica1CategoriaDescripcionInmueble",
                          label: "4 Económica",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: true,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Economica2",
                          value: "economica2CategoriaDescripcionInmueble",
                          label: "4.5 Económica",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: true,
                            muyEconomicaCategoriaDescripcionInmueble: false
                          }
                        },
                        {
                          id: "MuyEconomica",
                          value: "muyEconomicaCategoriaDescripcionInmueble",
                          label: "5 Muy Económica",
                          relatedFields: {
                            muyBuena1CategoriaDescripcionInmueble: false,
                            muyBuena2CategoriaDescripcionInmueble: false,
                            buena1CategoriaDescripcionInmueble: false,
                            buena2CategoriaDescripcionInmueble: false,
                            mediana1CategoriaDescripcionInmueble: false,
                            mediana2CategoriaDescripcionInmueble: false,
                            economica1CategoriaDescripcionInmueble: false,
                            economica2CategoriaDescripcionInmueble: false,
                            muyEconomicaCategoriaDescripcionInmueble: true
                          }
                        }
                      ]}
                      name="categoriaDescripcionInmueble"
                      selectedValue={formData.categoriaDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="categoria"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="descripcionDescripcionInmueble"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >Descripción
                    </label>
                    <input
                      id="descripcionDescripcionInmueble"
                      name="descripcionDescripcionInmueble"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">
                      Estado conservación
                    </label>
                    <RadioGroup
                      options={[
                        {
                          id: "Excelente1",
                          value: "excelente1EstadoConservacionDescripcionInmueble",
                          label: "1 Excelente",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: true,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Excelente2",
                          value: "excelente2EstadoConservacionDescripcionInmueble",
                          label: "1.5 Excelente",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: true,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Bueno1",
                          value: "bueno1EstadoConservacionDescripcionInmueble",
                          label: "2 Bueno",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: true,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Bueno2",
                          value: "bueno2EstadoConservacionDescripcionInmueble",
                          label: "2.5 Bueno",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: true,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Regular1",
                          value: "regular1EstadoConservacionDescripcionInmueble",
                          label: "3 Regular",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: true,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Regular2",
                          value: "regular2EstadoConservacionDescripcionInmueble",
                          label: "3.5 Regular",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: true,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Malo1",
                          value: "malo1EstadoConservacionDescripcionInmueble",
                          label: "4 Malo",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: true,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Malo2",
                          value: "malo2EstadoConservacionDescripcionInmueble",
                          label: "4.5 Malo",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: true,
                            muyMaloEstadoConservacionDescripcionInmueble: false
                          }
                        },
                        {
                          id: "MuyMalo",
                          value: "muyMaloEstadoConservacionDescripcionInmueble",
                          label: "4.5 Muy Malo",
                          relatedFields: {
                            excelente1EstadoConservacionDescripcionInmueble: false,
                            excelente2EstadoConservacionDescripcionInmueble: false,
                            bueno1EstadoConservacionDescripcionInmueble: false,
                            bueno2EstadoConservacionDescripcionInmueble: false,
                            regular1EstadoConservacionDescripcionInmueble: false,
                            regular2EstadoConservacionDescripcionInmueble: false,
                            malo1EstadoConservacionDescripcionInmueble: false,
                            malo2EstadoConservacionDescripcionInmueble: false,
                            muyMaloEstadoConservacionDescripcionInmueble: true
                          }
                        }
                      ]}
                      name="estadoConservacionDescripcionInmueble"
                      selectedValue={formData.estadoConservacionDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="estadoConservacion"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="descripcionEstadoConservacionDescripcionInmueble"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción</label>
                    <input
                      id="descripcionEstadoConservacionDescripcionInmueble"
                      name="descripcionEstadoConservacionDescripcionInmueble"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Mantenimiento</label>
                    <RadioGroup
                      options={[
                        {
                          id: "Frecuente",
                          value: "frecuenteMantenimientoDescripcionInmueble",
                          label: "Frecuente",
                          relatedFields: {
                            frecuenteMantenimientoDescripcionInmueble: true,
                            ocasionalMantenimientoDescripcionInmueble: false,
                            escasoNuloMantenimientoDescripcionInmueble: false
                          }
                        },
                        {
                          id: "Ocasional",
                          value: "ocasionalMantenimientoDescripcionInmueble",
                          label: "Ocasional",
                          relatedFields: {
                            frecuenteMantenimientoDescripcionInmueble: false,
                            ocasionalMantenimientoDescripcionInmueble: true,
                            escasoNuloMantenimientoDescripcionInmueble: false
                          }
                        },
                        {
                          id: "EscasoNulo",
                          value: "escasoNuloMantenimientoDescripcionInmueble",
                          label: "Escaso/nulo",
                          relatedFields: {
                            frecuenteMantenimientoDescripcionInmueble: false,
                            ocasionalMantenimientoDescripcionInmueble: false,
                            escasoNuloMantenimientoDescripcionInmueble: true
                          }
                        }
                      ]}
                      name="MantenimientoDescripcionInmueble"
                      selectedValue={formData.MantenimientoDescripcionInmueble}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="mantenimiento"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 text-center">
                    <label
                      htmlFor="descripcionMantenimientoDescripcionInmueble"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción</label>
                    <input
                      id="descripcionMantenimientoDescripcionInmueble"
                      name="descripcionMantenimientoDescripcionInmueble"
                      value={formData.descripcionMantenimientoDescripcionInmueble || ""}
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 pt-10">
                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Planilla de antigüedad de las construcciones</p>

                    <div className="grid grid-template-rows: auto 1fr">
                      <h4 className="text-sm text-center text-gray-700 font-bold">Asignar antiguedad a Items</h4>
                      <button
                        onClick={handleOpenModalAntiguedades}
                        className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                        type="button"
                      >
                        <img src={plusIcon} alt="Plus icon" className="w-6 h-6 fill-current text-white filter invert" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-12 border p-3 rounded space-y-4">
                    <h4 className="text-xl text-green-900">Items</h4>

                    <div className="grid grid-cols-12 items-center gap-4 bg-gray-100 p-2 rounded-t-md">
                      <div className="col-span-3 text-center text-green-900 font-bold"> Obra Civil</div>
                      <div className="col-span-3 text-center text-green-900 font-bold">Descripción de la  intervención</div>
                      <div className="col-span-3 text-center text-green-900 font-bold">Superficie (m²)</div>
                      <div className="col-span-3 text-center text-green-900 font-bold">Año</div>
                    </div>

                    {itemsObraCivil
                      .filter(itemObraCivil => itemObraCivil.descripcionIntervencionAntiguedad)
                      .map((itemObraCivil) => (
                        <div key={itemObraCivil.id} className="grid grid-cols-12 items-center gap-4 mb-1 p-2 bg-white rounded-md">
                          <select
                            as="select"
                            name={`obraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.obraCivilSeccionEDescripcionInmueble}
                            onChange={(e) => handleFieldChange(itemObraCivil.id, 'obraCivilSeccionEDescripcionInmueble', e.target.value)}
                          >
                            <option value="">Seleccionar opción</option>
                            {itemsObraCivil.map((optionItem) => (
                              <option key={optionItem.id} value={optionItem.obraCivilSeccionEDescripcionInmueble}>
                                {optionItem.obraCivilSeccionEDescripcionInmueble}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name={`descripcionIntervencionAntiguedad_${itemObraCivil.id}`}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.descripcionIntervencionAntiguedad}
                            onChange={(e) => handleFieldChange(itemObraCivil.id, 'descripcionIntervencionAntiguedad', e.target.value)}
                          />
                          <input
                            type="number"
                            name={`superficieAntiguedad_${itemObraCivil.id}`}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.superficieAntiguedad}
                            onChange={(e) => handleFieldChange(itemObraCivil.id, 'superficieAntiguedad', parseFloat(e.target.value))}
                          />
                          <input
                            type="number"
                            name={`anoAntiguedad_${itemObraCivil.id}`}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.anoAntiguedad}
                            onChange={(e) => handleFieldChange(itemObraCivil.id, 'anoAntiguedad', parseInt(e.target.value, 10))}
                          />
                        </div>
                      ))}

                  </div>
                </div>


                <h6 className="text-lg p-2 text-green-900 text-center">E.2 Descripción detallada</h6>

                <div className="grid grid-cols-12 gap-2 pt-10">
                  <div className="col-span-12 text-center">
                    <div className="grid grid-template-rows: auto 1fr">
                      <h4 className="text-sm text-center text-gray-700 font-bold">Asignar descripción a Items</h4>
                      <button
                        onClick={handleOpenModalAntiguedadesDescripcion}
                        className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                        type="button"
                      >
                        <img src={plusIcon} alt="Plus icon" className="w-6 h-6 fill-current text-white filter invert" />
                      </button>
                    </div>
                  </div>


                  <div className="col-span-12 border p-3 rounded space-y-4">
                    <h4 className="text-xl text-green-900">Items</h4>
                    {itemsObraCivil
                      .filter(itemObraCivil =>
                        itemObraCivil.obraCivilSeccionEDescripcionInmueble &&
                        (
                          itemObraCivil.pilotesCimentacionDescripcion ||
                          itemObraCivil.dadosCimentacionDescripcion ||
                          itemObraCivil.patinesCimentacionDescripcion ||
                          itemObraCivil.zapCorridaCimentacionDescripcion ||
                          itemObraCivil.plateaCimentacionDescripcion
                        )
                      ).map((itemObraCivil) => (
                        <div key={itemObraCivil.id} className="grid grid-cols-12  p-2 items-center">

                          <div className="col-span-12 mb-3 mt-5">
                            <span
                              className="col-span-3 px-2 py-1 border rounded-md text-green-900 "
                            >
                              {itemObraCivil.obraCivilSeccionEDescripcionInmueble || ""}
                            </span>
                          </div>

                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4  text-green-900 ">Cimentación supuesta</h6>
                          </div>

                          <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">
                            <input
                              type="radio"
                              name={`cimentacionDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.pilotesCimentacionDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'pilotesCimentacionDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Pilotes</label>

                            <input
                              type="radio"
                              name={`cimentacionDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.dadosCimentacionDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'dadosCimentacionDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Dados</label>

                            <input
                              type="radio"
                              name={`cimentacionDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.patinesCimentacionDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'patinesCimentacionDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Patines</label>

                            <input
                              type="radio"
                              name={`cimentacionDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.zapCorridaCimentacionDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'zapCorridaCimentacionDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Zap. corrida</label>

                            <input
                              type="radio"
                              name={`cimentacionDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.plateaCimentacionDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'plateaCimentacionDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Platea</label>
                          </div>



                          <label
                            htmlFor="otrosDescripcionCimentacionDescripcion"
                            className="col-span-2 pl-3 text-sm text-gray-700 font-bold">
                            Otros/Descripción
                          </label>
                          <input
                            type="text"
                            name={`otrosDescripcionCimentacionDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.otrosDescripcionCimentacionDescripcion || ""}
                            className="col-span-4 mb-1 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeCimentacion(itemObraCivil.id, 'otrosDescripcionCimentacionDescripcion', e.target.value)}
                          />

                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4  text-green-900 ">Cubierta</h6>
                          </div>

                          <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">

                            <input
                              type="radio"
                              name={`cubiertaDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.hArmadoCubiertaDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'hArmadoCubiertaDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">H.Armado</label>

                            <input
                              type="radio"
                              name={`cubiertaDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.maderaCubiertaDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'maderaCubiertaDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Madera</label>

                            <input
                              type="radio"
                              name={`cubiertaDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.metalicaCubiertaDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'metalicaCubiertaDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Metálica</label>


                            <input
                              type="radio"
                              name={`cubiertaDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.bovedillaCubiertaDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'bovedillaCubiertaDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Bovedilla</label>

                            <input
                              type="radio"
                              name={`cubiertaDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.otrosCubiertaDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'otrosCubiertaDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Otros</label>

                          </div>


                          <label
                            htmlFor="otrosDescripcionCubiertaDescripcion"
                            className="col-span-2 pl-3 text-sm text-gray-700 font-bold">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name={`otrosDescripcionCubiertaDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.otrosDescripcionCubiertaDescripcion || ""}
                            className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeCubierta(itemObraCivil.id, 'otrosDescripcionCubiertaDescripcion', e.target.value)}
                          />


                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4  text-green-900 ">Tipo y composición</h6>
                          </div>

                          <label
                            htmlFor="otrosDescripcionTipoComposicionDescripcion"
                            className="col-span-2 pl-3 text-sm text-gray-700 font-bold">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name={`otrosDescripcionTipoComposicionDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.otrosDescripcionTipoComposicionDescripcion || ""}
                            className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeTipoComposicion(itemObraCivil.id, 'otrosDescripcionTipoComposicionDescripcion', e.target.value)}
                          />


                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4  text-green-900 ">Resto de estructura</h6>
                          </div>

                          <div className="col-span-8 flex flex-wrap gap-x-6 gap-y-4">

                            <input
                              type="radio"
                              name={`hArmadoRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.hArmadoRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'hArmadoRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">H.Armado</label>

                            <input
                              type="radio"
                              name={`muroPortanteRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.muroPortanteRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'muroPortanteRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Muro portante</label>

                            <input
                              type="radio"
                              name={`mContencionRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.mContencionRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'mContencionRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">M. contención</label>

                            <input
                              type="radio"
                              name={`maderaRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.maderaRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'maderaRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Madera</label>

                            <input
                              type="radio"
                              name={`metalicaRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.metalicaRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'metalicaRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Metálica</label>

                            <input
                              type="radio"
                              name={`otrosRestoEstructuraDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.otrosRestoEstructuraDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'otrosRestoEstructuraDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Otros</label>

                          </div>

                          <label
                            htmlFor="descripcionRestoEstructuraDescripcion"
                            className="col-span-1 pl-3 text-sm text-gray-700 font-bold">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name={`descripcionRestoEstructuraDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.descripcionRestoEstructuraDescripcion || ""}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeRestoEstructura(itemObraCivil.id, 'descripcionRestoEstructuraDescripcion', e.target.value)}
                          />


                          <div className="col-span-12 p-4 items-center ">
                            <h6 className="text-center col-span-12  text-green-900 ">Muros interior-exterior</h6>
                            <h6 className="text-center col-span-12 text-green-900 ">Composición </h6>
                          </div>

                          <div className="col-span-8 flex flex-wrap gap-x-6 gap-y-4">

                            <input
                              type="radio"
                              name={`ladrilloMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.ladrilloMurosInteriorExteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'ladrilloMurosInteriorExteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                            <input
                              type="radio"
                              name={`ticholoMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.ticholoMurosInteriorExteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'ticholoMurosInteriorExteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                            <input
                              type="radio"
                              name={`maderaMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.maderaMurosInteriorExteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'maderaMurosInteriorExteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Madera</label>

                            <input
                              type="radio"
                              name={`steelFramingMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.steelFramingMurosInteriorExteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'steelFramingMurosInteriorExteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                            <input
                              type="radio"
                              name={`otrosMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.otrosMurosInteriorExteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'otrosMurosInteriorExteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Otros</label>

                          </div>

                          <label
                            htmlFor="descripcionMurosInteriorExteriorDescripcion"
                            className="col-span-1 pl-3 text-sm text-gray-700 font-bold">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name={`descripcionMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.descripcionMurosInteriorExteriorDescripcion || ""}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'descripcionMurosInteriorExteriorDescripcion', e.target.value)}
                          />


                          <div className="col-span-12 p-4 items-center ">
                            <h6 className="text-center col-span-12  text-green-900 ">Muros interior-interior</h6>
                            <h6 className="text-center col-span-12 text-green-900 ">Composición </h6>
                          </div>

                          <div className="col-span-8 flex flex-wrap gap-x-6 gap-y-4">

                            <input
                              type="radio"
                              name={`ladrilloMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.ladrilloMurosInteriorInteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'ladrilloMurosInteriorInteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                            <input
                              type="radio"
                              name={`ticholoMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.ticholoMurosInteriorInteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'ticholoMurosInteriorInteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                            <input
                              type="radio"
                              name={`maderaMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.maderaMurosInteriorInteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'maderaMurosInteriorInteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Madera</label>

                            <input
                              type="radio"
                              name={`steelFramingMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.steelFramingMurosInteriorInteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'steelFramingMurosInteriorInteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                            <input
                              type="radio"
                              name={`otrosMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                              checked={itemObraCivil.otrosMurosInteriorInteriorDescripcion}
                              className="form-radio h-4 w-4"
                              onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'otrosMurosInteriorInteriorDescripcion')}
                            />
                            <label className="text-gray-700 font-bold text-sm">Otros</label>

                          </div>

                          <label
                            htmlFor="descripcionMurosInteriorInteriorDescripcion"
                            className="col-span-1 pl-3 text-sm text-gray-700 font-bold">
                            Descripción
                          </label>
                          <input
                            type="text"
                            name={`descripcionMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                            value={itemObraCivil.descripcionMurosInteriorInteriorDescripcion || ""}
                            className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'descripcionMurosInteriorInteriorDescripcion', e.target.value)}
                          />

                        </div>
                      ))}

                  </div>

                </div>


                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 space-y-4">
                    <label className="block text-sm text-gray-700 font-bold mb-2">
                      Piscina
                    </label>
                    <RadioGroup
                      options={[
                        {
                          id: "HArmado",
                          value: "hArmadoPiscinaDescripcionDetallada",
                          label: "H. Armado",
                          relatedFields: {
                            hArmadoPiscinaDescripcionDetallada: true,
                            prefabricadaPiscinaDescripcionDetallada: false,
                            terminacionPiscinaDescripcionDetallada: false,
                            climatizacionPiscinaDescripcionDetallada: false,
                            otrosPiscinaDescripcionDetallada: false
                          }
                        },
                        {
                          id: "Prefabricada",
                          value: "prefabricadaPiscinaDescripcionDetallada",
                          label: "Prefabricada",
                          relatedFields: {
                            hArmadoPiscinaDescripcionDetallada: false,
                            prefabricadaPiscinaDescripcionDetallada: true,
                            terminacionPiscinaDescripcionDetallada: false,
                            climatizacionPiscinaDescripcionDetallada: false,
                            otrosPiscinaDescripcionDetallada: false
                          }
                        },
                        {
                          id: "Terminacion",
                          value: "terminacionPiscinaDescripcionDetallada",
                          label: "Terminación",
                          relatedFields: {
                            hArmadoPiscinaDescripcionDetallada: false,
                            prefabricadaPiscinaDescripcionDetallada: false,
                            terminacionPiscinaDescripcionDetallada: true,
                            climatizacionPiscinaDescripcionDetallada: false,
                            otrosPiscinaDescripcionDetallada: false
                          }
                        },
                        {
                          id: "Climatizacion",
                          value: "climatizacionPiscinaDescripcionDetallada",
                          label: "Climatización",
                          relatedFields: {
                            hArmadoPiscinaDescripcionDetallada: false,
                            prefabricadaPiscinaDescripcionDetallada: false,
                            terminacionPiscinaDescripcionDetallada: false,
                            climatizacionPiscinaDescripcionDetallada: true,
                            otrosPiscinaDescripcionDetallada: false
                          }
                        },
                        {
                          id: "Otros",
                          value: "otrosPiscinaDescripcionDetallada",
                          label: "Otros",
                          relatedFields: {
                            hArmadoPiscinaDescripcionDetallada: false,
                            prefabricadaPiscinaDescripcionDetallada: false,
                            terminacionPiscinaDescripcionDetallada: false,
                            climatizacionPiscinaDescripcionDetallada: false,
                            otrosPiscinaDescripcionDetallada: true
                          }
                        }
                      ]}
                      name="piscinaDescripcionDetallada"
                      selectedValue={formData.piscinaDescripcionDetallada}
                      onChange={handleInputChange}
                      onOptionChange={(relatedFields) => {
                        setFormData(prev => ({
                          ...prev,
                          ...relatedFields
                        }));
                      }}
                      idPrefix="piscina"
                      labelClassName="p-2 text-gray-700  text-sm"
                      radioClassName="form-radio h-4 w-4"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="aberturasDescripcionDetallada"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Aberturas:
                  </label>
                  <input
                    type="text"
                    id="aberturasDescripcionDetallada"
                    name="aberturasDescripcionDetallada"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="proteccionAberturasDescripcionDetallada"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Protección aberturas:
                  </label>
                  <input
                    type="text"
                    id="proteccionAberturasDescripcionDetallada"
                    name="proteccionAberturasDescripcionDetallada"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="placaresDormitoriosDescripcionDetallada"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Placares en dormitorios:
                  </label>
                  <input
                    type="text"
                    id="placaresDormitoriosDescripcionDetallada"
                    name="placaresDormitoriosDescripcionDetallada"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <label
                    htmlFor="placaresCocinaDescripcionDetallada"
                    className="col-span-2 text-sm text-gray-700 font-bold"
                  >
                    Placares en cocina:
                  </label>
                  <input
                    type="text"
                    id="placaresCocinaDescripcionDetallada"
                    name="placaresCocinaDescripcionDetallada"
                    className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="tipoAguaCalienteDescripcion"
                    className="col-span-2 text-base text-gray-700 font-bold "
                  >
                    Agua caliente
                  </label>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center justify-start h-full">

                    <CheckboxGroup
                      options={[
                        {
                          id: "enCocinaDescripcionDetallada", // ID simple
                          desc: "En cocina" // Texto a mostrar
                        }
                      ]}
                      name="enCocinaDescripcionDetallada"
                      selectedValues={formData.enCocinaDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "enBaniosDescripcionDetallada", // ID simple
                          desc: "En baños" // Texto a mostrar
                        }
                      ]}
                      name="enBaniosDescripcionDetallada"
                      selectedValues={formData.enBaniosDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>

                  <div className="col-span-8">
                    <input
                      id="tipoAguaCalienteDescripcion"
                      name="tipoAguaCalienteDescripcion"
                      placeholder='Tipo Agua Caliente'
                      value={formData.tipoAguaCalienteDescripcion || ""}
                      onChange={handleInputChange}
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="tipoAguaCalienteDescripcion"
                    className="col-span-2 text-base text-gray-700  font-bold"
                  >
                    Instalación eléctrica
                  </label>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center justify-start h-full">

                    <CheckboxGroup
                      options={[
                        {
                          id: "embutidaDescripcionDetallada",
                          desc: "Embutida"
                        }
                      ]}
                      name="embutidaDescripcionDetallada"
                      selectedValues={formData.embutidaDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "exteriorDescripcionDetallada", // ID simple
                          desc: "Exterior" // Texto a mostrar
                        }
                      ]}
                      name="exteriorDescripcionDetallada"
                      selectedValues={formData.exteriorDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-12 gap-4 items-center">
                  <label
                    htmlFor="otrosDescripcion"
                    className="col-span-2 text-base text-gray-700 font-bold "
                  >
                    Otros
                  </label>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center justify-start h-full">

                    <CheckboxGroup
                      options={[
                        {
                          id: "alarmaDescripcionDetallada",
                          desc: "Alarma"
                        }
                      ]}
                      name="alarmaDescripcionDetallada"
                      selectedValues={formData.alarmaDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "gElectrogDescripcionDetallada", // ID simple
                          desc: "G.electrog" // Texto a mostrar
                        }
                      ]}
                      name="gElectrogDescripcionDetallada"
                      selectedValues={formData.gElectrogDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "cctvDescripcionDetallada", // ID simple
                          desc: "CCTV" // Texto a mostrar
                        }
                      ]}
                      name="cctvDescripcionDetallada"
                      selectedValues={formData.cctvDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "portElecDescripcionDetallada",
                          desc: "Port.elec."
                        }
                      ]}
                      name="portElecDescripcionDetallada"
                      selectedValues={formData.portElecDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700 "
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                </div>

                <h2 className="mb-2 text-base  text-gray-700 font-bold">Climatización</h2>
                <div className="grid grid-cols-12 items-center mb-2">
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "estufaDescripcionDetallada",
                          desc: "Estufa"
                        }
                      ]}
                      name="estufaDescripcionDetallada"
                      selectedValues={formData.estufaDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>

                  <div className="col-span-10">
                    <input
                      type="text"
                      id="estufaUbicacionDescripcionDetallada"
                      name="estufaUbicacionDescripcionDetallada"
                      placeholder="Ubicación Estufa"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center mb-2">

                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "splitsDescripcionDetallada",
                          desc: "Splits"
                        }
                      ]}
                      name="splitsDescripcionDetallada"
                      selectedValues={formData.splitsDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-10">
                    <input
                      type="text"
                      id="splitsUbicacionDescripcionDetallada"
                      name="splitsUbicacionDescripcionDetallada"
                      placeholder="Ubicación Splits"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center mb-2">
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "centralDescripcionDetallada",
                          desc: "Central"
                        }
                      ]}
                      name="centralDescripcionDetallada"
                      selectedValues={formData.centralDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-10">
                    <input
                      type="text"
                      id="centralUbicacionDescripcionDetallada"
                      name="centralUbicacionDescripcionDetallada"
                      placeholder="Ubicación Central"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center mb-2">
                  <div className="col-span-2 flex items-center justify-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "otrosDescripcionDetallada",
                          desc: "Otros"
                        }
                      ]}
                      name="otrosDescripcionDetallada"
                      selectedValues={formData.otrosDescripcionDetallada}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-10">
                    <input
                      type="text"
                      id="otrosUbicacionDescripcionDetallada"
                      name="otrosUbicacionDescripcionDetallada"
                      placeholder="Ubicación Otros"
                      className="w-full h-8 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 pt-10">
                  <div className="col-span-12 text-center">
                    <div className="grid grid-template-rows: auto 1fr">
                      <h4 className="text-sm text-center text-gray-700 font-bold">Asignar comodidades a Items</h4>
                      <button
                        onClick={handleOpenModalComodidadesDescripcion}
                        className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                        type="button"
                      >
                        <img src={plusIcon} alt="Plus icon" className="w-6 h-6 fill-current text-white filter invert" />
                      </button>
                    </div>
                  </div>

                  {/* Contenedor de Items */}
                  <div className="col-span-12 border p-3 rounded space-y-4">
                    <h4 className="text-xl text-green-900">Items</h4>

                    {itemsObraCivil
                      .filter(item =>
                        item.obraCivilSeccionEDescripcionInmueble &&
                        Object.keys(item).some(key => key.includes("ComodidadesDescripcion") && item[key] > 0)
                      )
                      .map((item) => (
                        <div key={item.id} className="grid grid-cols-12 p-2 items-center">

                          {/* Nombre del Item */}
                          <div className="col-span-12 mb-3 mt-5">
                            <span className="col-span-3 px-2 py-1 border rounded-md text-green-900">
                              {item.obraCivilSeccionEDescripcionInmueble || ""}
                            </span>
                          </div>

                          {/* Título de Sección */}
                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4 text-green-900">Comodidades</h6>
                          </div>

                          {/* Campos de Comodidades (4 columnas) */}
                          <div className="col-span-12 grid grid-cols-4 gap-4">
                            {Object.keys(item)
                              .filter(key => key.includes("ComodidadesDescripcion") && key !== "otrosComodidadesDescripcion")
                              .map((key) => (
                                <div key={key} className="flex flex-col items-center">
                                  <label htmlFor={`${key}_${item.id}`} className="text-gray-700 font-bold text-sm text-center capitalize">
                                    {key.replace(/ComodidadesDescripcion$/, "").replace(/([A-Z])/g, " $1").trim()}
                                  </label>
                                  <input
                                    type="number"
                                    id={`${key}_${item.id}`}
                                    name={`${key}_${item.id}`}
                                    className="form-input border rounded-md p-2 w-full text-center"
                                    min="0"
                                    value={item[key] || 0}
                                    onChange={(e) => handleFieldChangeComodidades(item.id, key, e.target.value)}
                                  />
                                </div>
                              ))}
                          </div>

                          <label htmlFor={`otrosComodidadesDescripcion_${item.id}`} className="mt-4 col-span-2 pl-3 text-sm text-gray-700 font-bold">
                            Otros / Descripción
                          </label>
                          <input
                            type="text"
                            id={`otrosComodidadesDescripcion_${item.id}`}
                            name={`otrosComodidadesDescripcion_${item.id}`}
                            value={item.otrosComodidadesDescripcion || ""}
                            className="mt-4 col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            onChange={(e) => handleFieldChangeComodidades(item.id, 'otrosComodidadesDescripcion', e.target.value)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 pt-10">
                  <div className="col-span-12 text-center">
                    <div className="grid grid-template-rows: auto 1fr">
                      <h4 className="text-sm text-center text-gray-700 font-bold">Asignar Planilla a Items</h4>
                      <button
                        onClick={handleOpenModalPlanillaDescripcion}
                        className="bg-green-900 text-white hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full mx-auto"
                        type="button"
                      >
                        <img src={plusIcon} alt="Plus icon" className="w-6 h-6 fill-current text-white filter invert" />
                      </button>
                    </div>
                  </div>

                  {/* Contenedor de Items */}
                  <div className="col-span-12 border p-3 rounded space-y-4">
                    <h4 className="text-xl text-green-900">Items</h4>

                    {itemsObraCivil
                      .filter(item =>
                        item.obraCivilSeccionEDescripcionInmueble &&
                        Object.keys(item).some(key => key.includes("PlanillaDescripcion") && item[key])
                      )
                      .map((item) => (
                        <div key={item.id} className="grid grid-cols-12 p-2 items-center">

                          {/* Nombre del Item */}
                          <div className="col-span-12 mb-3 mt-5 ">
                            <span className="col-span-3 px-2 py-1 border rounded-md text-green-900">
                              {item.obraCivilSeccionEDescripcionInmueble || ""}
                            </span>
                          </div>

                          {/* Título de Sección */}
                          <div className="col-span-12 text-center">
                            <h6 className="text-center p-4 text-green-900">Planilla Descripción</h6>
                          </div>

                          {/* Campos de Planilla (8 columnas) */}
                          <div className="col-span-12 grid grid-cols-8 gap-4">
                            {Object.keys(item)
                              .filter(key => key.includes("PlanillaDescripcion") && key !== "totalPlanillaDescripcion") // 🔥 Excluir total
                              .map((key) => (
                                <div key={key} className="flex flex-col items-center">
                                  <label htmlFor={`${key}_${item.id}`} className="text-gray-700 font-bold text-sm text-center capitalize mb-3">
                                    {key.replace(/PlanillaDescripcion$/, "").replace(/([A-Z])/g, " $1").trim()}
                                  </label>
                                  {/* 🔥 Verificar que el valor sea una cadena antes de usar .split(";") */}
                                  {(typeof item[key] === "string" && item[key].includes(";") ? item[key].split(";") : [item[key]]).map((value, index) => (
                                    <input
                                      key={`${key}_${item.id}_${index}`}
                                      type="text"
                                      id={`${key}_${item.id}_${index}`}
                                      name={`${key}_${item.id}_${index}`}
                                      className="form-input border rounded-md p-2 w-full text-center mb-2 mt-2"
                                      value={value || ""}
                                      onChange={(e) => handleFieldChangePlanilla(item.id, key, index, e.target.value)}
                                    />
                                  ))}
                                </div>
                              ))}
                          </div>

                          {/* 🔥 Campo "Total" en una fila separada con un único input */}
                          <div className="col-span-12 grid grid-cols-8 gap-4 mt-4">
                            <div className="col-span-1 flex flex-col items-center">
                              <label htmlFor={`totalPlanillaDescripcion_${item.id}`} className="text-gray-700 font-bold text-sm text-center capitalize">
                                Total
                              </label>
                              <input
                                type="number"
                                id={`totalPlanillaDescripcion_${item.id}`}
                                name={`totalPlanillaDescripcion_${item.id}`}
                                className="form-input border rounded-md p-2 w-full text-center"
                                min="0"
                                value={item.totalPlanillaDescripcion || 0.0} // 🔥 Valor único, no usar .split()
                                onChange={(e) => handleFieldChangePlanilla(item.id, 'totalPlanillaDescripcion', 0, e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>


                <div className="col-span-12 text-center">
                  <label
                    htmlFor="otrasCaracteristicasDescripcion"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >
                    Otras características:
                  </label>
                  <input
                    id="otrasCaracteristicasDescripcion"
                    name="otrasCaracteristicasDescripcion"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>

                <h4 className="text-xl text-green-900 text-center">E.3 Observaciones</h4>

                <div className="col-span-12 text-center">
                  <label
                    htmlFor="observacionesSeccionLegalesDescripcion"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >
                    Observaciones de la SECCIÓN  para Legales BBVA:
                  </label>
                  <input
                    id="observacionesSeccionLegalesDescripcion"
                    name="observacionesSeccionLegalesDescripcion"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>

                <div className="col-span-12 text-center">
                  <label
                    htmlFor="otrasObservacionesSeccionLegalesDescripcion"
                    className="p-3 text-sm text-gray-700 font-bold"
                  >
                    Otras observaciones de la SECCIÓN:
                  </label>
                  <input
                    id="otrasObservacionesSeccionLegalesDescripcion"
                    name="otrasObservacionesSeccionLegalesDescripcion"
                    className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                  />
                </div>
              </div>



              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN F - Planos</h4>
                <p className="text-base text-center text-gray-700 font-bold">Fuente</p>
                <div className="grid grid-cols-3 gap-4 ">
                  <div className="col-span-1 items-end h-full ml-auto">
                    <CheckboxGroup
                      options={[
                        {
                          id: "documentacionClientePlanos",
                          desc: "Documentación Cliente"
                        }
                      ]}
                      name="documentacionClientePlanos"
                      selectedValues={formData.documentacionClientePlanos}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-1 m-auto items-center h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "relevamientoTasadorPlanos",
                          desc: "Relevamiento Tasador"
                        }
                      ]}
                      name="relevamientoTasadorPlanos"
                      selectedValues={formData.relevamientoTasadorPlanos}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                  <div className="col-span-1  items-start h-full">
                    <CheckboxGroup
                      options={[
                        {
                          id: "otrosPlanos",
                          desc: "Otros"
                        }
                      ]}
                      name="otrosPlanos"
                      selectedValues={formData.otrosPlanos}
                      onChange={handleInputChange}
                      idPrefix="inf_neg_"
                      labelClassName="ml-2 text-sm text-gray-700"
                      checkboxClassName="form-checkbox h-4 w-4"
                      itemClassName=""
                      wrapperClassName="h-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-gray-50 p-4 rounded-md mb-2">
                    <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                      Subir Imágenes de Planos
                    </label>

                    <input
                      type="hidden"
                      name="planosImagenesUrl"
                      value={formData.planosImagenesUrl || ""}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                      onChange={handleFileSelect}
                    />

                    {/* Vista previa de imágenes de planos con opción de eliminar */}
                    {(formData.planosImagenesUrl || previewImages.length > 0) && (
                      <div className="grid grid-cols-4 gap-4 mt-2">
                        {/* Imágenes ya guardadas en la BD */}
                        {formData.planosImagenesUrl &&
                          formData.planosImagenesUrl
                            .split(";")
                            .filter(url => url && url.trim() !== "")
                            .map((src, index) => (
                              <div key={`bd-${index}`} className="relative">
                                <img
                                  src={`http://localhost:8080${src.trim()}`}
                                  alt={`planos-${index}`}
                                  className="w-full h-auto rounded-md object-cover"
                                />
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                  onClick={() => handleRemoveStoredImage("planosImagenesUrl", index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))
                        }

                        {/* Imágenes recién subidas pero aún no guardadas */}
                        {previewImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`preview-${index}`} className="w-full h-auto rounded-md object-cover" />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={() => handleRemoveImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>




              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN G - Fotos</h4>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3"></div>
                  <div className="col-span-6 text-center">

                    {/* 🔥 Carga de imágenes */}
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 p-4 rounded-md mb-2">
                        <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                          Subir Imágenes
                        </label>

                        <input
                          type="hidden"
                          name="fotosImagenesUrlFotos"
                          value={formData.fotosImagenesUrlFotos || ""}
                        />

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                          onChange={handleFileSelectFotos}
                        />

                        {/* Vista previa de imágenes con opción de eliminar */}
                        {(formData.fotosImagenesUrlFotos || previewImagesFotos.length > 0) && (
                          <div className="grid grid-cols-4 gap-4 mt-2">
                            {/* Imágenes ya guardadas en la BD */}
                            {formData.fotosImagenesUrlFotos &&
                              formData.fotosImagenesUrlFotos
                                .split(";")
                                .filter(url => url && url.trim() !== "")
                                .map((src, index) => (
                                  <div key={`bd-${index}`} className="relative">
                                    <img
                                      src={`http://localhost:8080${src.trim()}`}
                                      alt={`foto-${index}`}
                                      className="w-full h-auto rounded-md object-cover"
                                    />
                                    <button
                                      type="button"
                                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                      onClick={() => handleRemoveStoredImage("fotosImagenesUrlFotos", index)}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                            }

                            {/* Imágenes recién subidas pero aún no guardadas */}
                            {previewImagesFotos.map((image, index) => (
                              <div key={index} className="relative">
                                <img src={image} alt={`preview-${index}`} className="w-full h-auto rounded-md object-cover" />
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                  onClick={() => handleRemoveFotos(index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3"></div>
                </div>
              </div>


              <div className="col-span-12 space-y-4 border p-3 rounded">
                <h4 className="text-xl text-green-900">SECCIÓN H- Entorno y mercado</h4>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">H.1 Entorno</p>


                    <label
                      htmlFor="descripcionGeneralEntorno"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción general:
                    </label>
                    <input
                      id="descripcionGeneralEntorno"
                      name="descripcionGeneralEntorno"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>

                  <div className="col-span-12 space-y-4 p-3 rounded">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Construcciones</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "veinticincoContruccionesEntorno",
                              desc: "0% - 25%"
                            }
                          ]}
                          name="veinticincoContruccionesEntorno"
                          selectedValues={formData.veinticincoContruccionesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "setentacincoContruccionesEntorno",
                              desc: "25% - 75%"
                            }
                          ]}
                          name="setentacincoContruccionesEntorno"
                          selectedValues={formData.setentacincoContruccionesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "cienContruccionesEntorno",
                              desc: "75% - 100%"
                            }
                          ]}
                          name="cienContruccionesEntorno"
                          selectedValues={formData.cienContruccionesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="col-span-12 space-y-4 p-3 rounded">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Crecimiento</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "continuoCrecimientoEntorno",
                              desc: "Continuo"
                            }
                          ]}
                          name="continuoCrecimientoEntorno"
                          selectedValues={formData.continuoCrecimientoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "estableContruccionesEntorno",
                              desc: "Estable"
                            }
                          ]}
                          name="estableContruccionesEntorno"
                          selectedValues={formData.estableContruccionesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "nuloContruccionesEntorno",
                              desc: "Nulo"
                            }
                          ]}
                          name="nuloContruccionesEntorno"
                          selectedValues={formData.nuloContruccionesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 space-y-4 p-3 rounded">
                    <label className="block text-sm text-gray-700 font-bold mb-2">Usos (%)</label>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label
                        htmlFor="viviendaUsosEntorno"
                        className=" text-sm text-gray-700 font-bold"
                      >
                        Vivienda:
                      </label>
                      <input
                        type="number"
                        id="viviendaUsosEntorno"
                        name="viviendaUsosEntorno"
                        className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="comercioUsosEntorno"
                        className=" text-sm text-gray-700 font-bold"
                      >
                        Comercio:
                      </label>
                      <input
                        type="number"
                        id="comercioUsosEntorno"
                        name="comercioUsosEntorno"
                        className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="industriaUsosEntorno"
                        className=" text-sm text-gray-700 font-bold"
                      >
                        Industria:
                      </label>
                      <input
                        type="number"
                        id="industriaUsosEntorno"
                        name="industriaUsosEntorno"
                        className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="otrosUsosEntorno"
                        className=" text-sm text-gray-700 font-bold"
                      >
                        Otros:
                      </label>
                      <input
                        type="number"
                        id="otrosUsosEntorno"
                        name="otrosUsosEntorno"
                        className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 space-y-4 p-3 rounded">
                    <p className="text-base text-center text-gray-700 font-bold">Equipamiento, conectividad  y servicios</p>
                    <div className="grid grid-cols-12 gap-4 items-center">

                      <label
                        htmlFor="centrosEnsenanzaEntorno"
                        className="col-span-2 text-sm text-gray-700 font-bold"
                      >
                        Centros enseñanza:
                      </label>
                      <input
                        type="text"
                        id="centrosEnsenanzaEntorno"
                        name="centrosEnsenanzaEntorno"
                        value={formData.centrosEnsenanzaEntorno || ""}
                        onChange={handleInputChange}
                        className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="centrosSaludEntorno"
                        className="col-span-2 text-sm text-gray-700 font-bold"
                      >
                        Centros salud:
                      </label>
                      <input
                        type="text"
                        id="centrosSaludEntorno"
                        name="centrosSaludEntorno"
                        value={formData.centrosSaludEntorno || ""}
                        onChange={handleInputChange}
                        className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Deportivo:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "suficienteDeportivoEntorno",
                              desc: "Suficiente"
                            }
                          ]}
                          name="suficienteDeportivoEntorno"
                          selectedValues={formData.suficienteDeportivoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "escasoNuloDeportivoEntorno",
                              desc: "Escaso / nulo"
                            }
                          ]}
                          name="escasoNuloDeportivoEntorno"
                          selectedValues={formData.escasoNuloDeportivoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Esparcimiento:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "suficienteEsparcimientoEntorno",
                              desc: "Suficiente"
                            }
                          ]}
                          name="suficienteEsparcimientoEntorno"
                          selectedValues={formData.suficienteEsparcimientoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "escasoNuloEsparcimientoEntorno",
                              desc: "Escaso / Nulo"
                            }
                          ]}
                          name="escasoNuloEsparcimientoEntorno"
                          selectedValues={formData.escasoNuloEsparcimientoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Zonas verdes:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "suficienteZonasVerdesEntorno",
                              desc: "Suficiente"
                            }
                          ]}
                          name="suficienteZonasVerdesEntorno"
                          selectedValues={formData.suficienteZonasVerdesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "escasoNuloZonasVerdesEntorno",
                              desc: "Escaso / Nulo"
                            }
                          ]}
                          name="escasoNuloZonasVerdesEntorno"
                          selectedValues={formData.escasoNuloZonasVerdesEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Zonas verdes:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "suficienteEstacionamientoEntorno",
                              desc: "Suficiente"
                            }
                          ]}
                          name="suficienteEstacionamientoEntorno"
                          selectedValues={formData.suficienteEstacionamientoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "insuficienteNuloEstacionamientoEntorno",
                              desc: "Escaso / Nulo"
                            }
                          ]}
                          name="insuficienteNuloEstacionamientoEntorno"
                          selectedValues={formData.insuficienteNuloEstacionamientoEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Proximidad transporte público/conectividad:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "excelenteProximidadTransportePublicoConectividadEntorno",
                              desc: "Excelente"
                            }
                          ]}
                          name="excelenteProximidadTransportePublicoConectividadEntorno"
                          selectedValues={formData.excelenteProximidadTransportePublicoConectividadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "buenaProximidadTransportePublicoConectividadEntorno",
                              desc: "Buena"
                            }
                          ]}
                          name="buenaProximidadTransportePublicoConectividadEntorno"
                          selectedValues={formData.buenaProximidadTransportePublicoConectividadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "regularProximidadTransportePublicoConectividadEntorno",
                              desc: "Regular"
                            }
                          ]}
                          name="regularProximidadTransportePublicoConectividadEntorno"
                          selectedValues={formData.regularProximidadTransportePublicoConectividadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "malaProximidadTransportePublicoConectividadEntorno",
                              desc: "Mala"
                            }
                          ]}
                          name="malaProximidadTransportePublicoConectividadEntorno"
                          selectedValues={formData.malaProximidadTransportePublicoConectividadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Seguridad:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "existeSeguridadEntorno",
                              desc: "Existe"
                            }
                          ]}
                          name="existeSeguridadEntorno"
                          selectedValues={formData.existeSeguridadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "noExisteSeguridadEntorno",
                              desc: "No Existe"
                            }
                          ]}
                          name="noExisteSeguridadEntorno"
                          selectedValues={formData.noExisteSeguridadEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 space-y-4 p-3 rounded ">
                    <label className="text-base text-gray-700 font-bold">Situación general:</label>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "favorableSituacionGeneralEntorno",
                              desc: "Favorable"
                            }
                          ]}
                          name="favorableSituacionGeneralEntorno"
                          selectedValues={formData.favorableSituacionGeneralEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-start h-full">
                        <CheckboxGroup
                          options={[
                            {
                              id: "desfavorableSituacionGeneralEntorno",
                              desc: "Desfavorable"
                            }
                          ]}
                          name="desfavorableSituacionGeneralEntorno"
                          selectedValues={formData.desfavorableSituacionGeneralEntorno}
                          onChange={handleInputChange}
                          idPrefix="inf_neg_"
                          labelClassName="ml-2 text-sm text-gray-700"
                          checkboxClassName="form-checkbox h-4 w-4"
                          itemClassName=""
                          wrapperClassName="h-full"
                        />
                      </div>
                    </div>
                  </div>



                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">H.2 Mercado inmobiliario</p>
                    <label
                      htmlFor="descripcionGeneralMercadoInmobiliario"
                      className="p-3 text-sm text-gray-700 font-bold"
                    >
                      Descripción general:
                    </label>
                    <input
                      id="descripcionGeneralMercadoInmobiliario"
                      name="descripcionGeneralMercadoInmobiliario"
                      className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Situación del Mercado</p>
                  </div>

                  <div className="p-4 rounded-lg col-span-4">

                    <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Oferta</h2>

                    <div className="flex items-center space-x-4 justify-center">

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="altaOfertaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="altaOfertaEntorno">Alta</label>
                      </div>

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="mediaOfertaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="mediaOfertaEntorno">Media</label>
                      </div>

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="bajaOfertaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="bajaOfertaEntorno">Baja</label>
                      </div>

                    </div>
                  </div>

                  <div className="p-4 rounded-lg col-span-4">
                    <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Demanda</h2>

                    <div className="flex items-center space-x-4 justify-center">

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="altaDemandaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="altaDemandaEntorno">Alta</label>
                      </div>

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="mediaDemandaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="mediaDemandaEntorno">Media</label>
                      </div>

                      <div className="flex items-center p-3">
                        <input
                          type="checkbox"
                          name="bajaDemandaEntorno"
                          className="mr-2"
                        />
                        <label htmlFor="bajaDemandaEntorno">Baja</label>
                      </div>

                    </div>
                  </div>

                  <div className="p-4 rounded-lg col-span-4">
                    <p className="text-base text-center text-gray-700 font-bold">Plazos de Comercialización</p>
                    <input
                      type="text"
                      id="plazosComercializaciónEntorno"
                      name="plazosComercializaciónEntorno"
                      className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Inmuebles comparables en la zona </p>
                  </div>


                  <div className="p-4 rounded-lg col-span-4">
                    <p className="text-base text-center text-gray-700 font-bold">Existencia</p>

                    <div className="grid grid-cols-4 gap-1">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="altaExistenciaEntorno"
                          name="altaExistenciaEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="altaExistenciaEntorno" className="text-sm font-medium text-gray-700">
                          Alta
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="mediaExistenciaEntorno"
                          name="mediaExistenciaEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="mediaExistenciaEntorno" className="text-sm font-medium text-gray-700">
                          Media
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="bajaExistenciaEntorno"
                          name="bajaExistenciaEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="bajaExistenciaEntorno" className="text-sm font-medium text-gray-700">
                          Baja
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="noExisteExistenciaEntorno"
                          name="noExisteExistenciaEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="noExisteExistenciaEntorno" className="text-sm font-medium text-gray-700">
                          No Existe
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg col-span-4">
                    <p className="text-base text-center text-gray-700 font-bold">Valor de Mercado similar</p>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="abundantesValorMercadoSimilarEntorno"
                          name="abundantesValorMercadoSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="abundantesValorMercadoSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Abundantes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="escasasValorMercadoSimilarEntorno"
                          name="escasasValorMercadoSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="escasasValorMercadoSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Escasas
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="muyEscasasValorMercadoSimilarEntorno"
                          name="muyEscasasValorMercadoSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="muyEscasasValorMercadoSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Muy escasas
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg col-span-4">
                    <p className="text-base text-center text-gray-700 font-bold">Antigüedad similar</p>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="abundantesAntigüedadSimilarEntorno"
                          name="abundantesAntigüedadSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="abundantesAntigüedadSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Abundantes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="escasasAntigüedadSimilarEntorno"
                          name="escasasAntigüedadSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="escasasAntigüedadSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Escasas
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="muyEscasasAntigüedadSimilarEntorno"
                          name="muyEscasasAntigüedadSimilarEntorno"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="muyEscasasAntigüedadSimilarEntorno" className="text-sm font-medium text-gray-700">
                          Muy escasas
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Aspectos que influyen en la comercialización</p>
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">I.1 Normativa</p>
                    <p className="text-lg text-center text-gray-700 font-bold"> Organismos competentes:</p>
                    <input
                      type="text"
                      id="organismosCompetentesNormativa"
                      name="organismosCompetentesNormativa"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>


                  {/* Tabla editable */}
                  <div className="col-span-12">
                    <h5 className="text-lg font-bold text-gray-700 mb-4">
                      Normativa Urbanística - Parámetros Edificación
                    </h5>

                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      {/* Encabezados */}
                      <thead className="bg-gray-200 text-gray-700">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">Concepto</th>
                          <th className="border border-gray-300 px-4 py-2">Normativa</th>
                          <th className="border border-gray-300 px-4 py-2">Valores del padrón</th>
                          <th className="border border-gray-300 px-4 py-2">Sin verificar. Faltan datos Normativa</th>
                          <th className="border border-gray-300 px-4 py-2">Cumple</th>
                          <th className="border border-gray-300 px-4 py-2">No cumple</th>
                          <th className="border border-gray-300 px-4 py-2">No aplica</th>
                          <th className="border border-gray-300 px-4 py-2">Sin verificar. Faltan datos Normativa</th>
                          <th className="border border-gray-300 px-4 py-2">No aplica. Baldío</th>
                        </tr>
                      </thead>

                      {/* Cuerpo editable */}
                      <tbody>
                        {[...Array(9)].map((_, rowIndex) => {
                          const row = rowIndex + 1; // Número de la fila (1-9)
                          return (
                            <tr key={row}>
                              {/* Concepto */}
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type="text"
                                  name={`concepto${row}Normativa`}
                                  placeholder={` Ingrese Concepto `}
                                  className="w-full p-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                />
                              </td>
                              {/* Checkboxes */}
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`normativa${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`valoresPadron${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`sinVerificarFaltanDatosNormativa${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`cumple${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`noCumple${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`noAplica${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`sinVerificarFaltanDatosNormativaExtra${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  name={`noAplicaBaldio${row}Normativa`}
                                  className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>


                  <div className="col-span-6 text-center p-4">
                    <p className="text-base text-center text-gray-700 font-bold">Requisitos inmueble valor patrimonial</p>
                    <input
                      type="text"
                      id="requisitosInmuebleValorPatrimonialNormativa"
                      name="requisitosInmuebleValorPatrimonialNormativa"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>


                  <div className="p-4 rounded-lg col-span-6">
                    <p className="text-base text-center text-gray-700 font-bold">Área mínima vivienda/local comercial</p>

                    <div className="grid grid-cols-3 gap-1 ">
                      <div className="flex items-center space-x-2 ml-6">
                        <input
                          type="checkbox"
                          id="cumpleAreaMinimaViviendaLocalComercialNormativa"
                          name="cumpleAreaMinimaViviendaLocalComercialNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="cumpleAreaMinimaViviendaLocalComercialNormativa" className="text-sm font-medium text-gray-700">
                          Cumple
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="noCumpleAreaMinimaViviendaLocalComercialNormativa"
                          name="noCumpleAreaMinimaViviendaLocalComercialNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="noCumpleAreaMinimaViviendaLocalComercialNormativa" className="text-sm font-medium text-gray-700">
                          No Cumple
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="sinVerificarAreaMinimaViviendaLocalComercialNormativa"
                          name="sinVerificarAreaMinimaViviendaLocalComercialNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="sinVerificarAreaMinimaViviendaLocalComercialNormativa" className="text-sm font-medium text-gray-700">
                          Sin Verificar
                        </label>
                      </div>
                    </div>
                  </div>




                  <div className="col-span-6 text-center p-4">
                    <p className="text-base text-center text-gray-700 font-bold">Otras normativas</p>
                    <input
                      type="text"
                      id="otrasNormativasNormativa"
                      name="otrasNormativasNormativa"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>


                  <div className="p-4 rounded-lg col-span-6">
                    <p className="text-base text-center text-gray-700 font-bold">Normativa Construcción no tradicional</p>

                    <div className="grid grid-cols-4 gap-1 ">
                      <div className="flex items-center space-x-2 ml-6">
                        <input
                          type="checkbox"
                          id="cumpleNormativaConstruccionNoTradicionalNormativa"
                          name="cumpleNormativaConstruccionNoTradicionalNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="cumpleNormativaConstruccionNoTradicionalNormativa" className="text-sm font-medium text-gray-700">
                          Cumple
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="noCumpleNormativaConstruccionNoTradicionalNormativa"
                          name="noCumpleNormativaConstruccionNoTradicionalNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="noCumpleNormativaConstruccionNoTradicionalNormativa" className="text-sm font-medium text-gray-700">
                          No Cumple
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="noAplicaNormativaConstruccionNoTradicionalNormativa"
                          name="noAplicaNormativaConstruccionNoTradicionalNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="noAplicaNormativaConstruccionNoTradicionalNormativa" className="text-sm font-medium text-gray-700">
                          No aplica
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="sinVerificarNormativaConstruccionNoTradicionalNormativa"
                          name="sinVerificarNormativaConstruccionNoTradicionalNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="sinVerificarNormativaConstruccionNoTradicionalNormativa" className="text-sm font-medium text-gray-700">
                          Sin verificar
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Conclusiones cumplimiento normativo </p>
                  </div>


                  <div className="p-4 rounded-lg col-span-3">
                    <p className="text-base text-center text-white font-bold p-2 mb-4"></p>

                    <div className="grid grid-cols-2 gap-1 ">
                      <div className="flex items-center space-x-2 ml-6">
                        <input
                          type="checkbox"
                          id="sinVerificarNormativa"
                          name="sinVerificarNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="sinVerificarNormativa" className="text-sm font-medium text-gray-700">
                          Sin verificar
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="cumpleNormativa"
                          name="cumpleNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="cumpleNormativa" className="text-sm font-medium text-gray-700">
                          Cumple
                        </label>
                      </div>
                    </div>
                  </div>


                  <div className="p-4 rounded-lg col-span-5">
                    <p className="text-base text-center text-gray-700 font-bold">No cumple</p>

                    <div className="grid grid-cols-3 gap-1 ">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="regularizableNoCumpleNormativa"
                          name="regularizableNoCumpleNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="regularizableNoCumpleNormativa" className="text-sm font-medium text-gray-700">
                          Regularizable
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="noRegularizableNoCumpleNormativa"
                          name="noRegularizableNoCumpleNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="noRegularizableNoCumpleNormativa" className="text-sm font-medium text-gray-700">
                          No regularizable
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          id="sinDatosNoCumpleNormativa"
                          name="sinDatosNoCumpleNormativa"
                          className="w-3 h-3 border-gray-300 focus:ring-green-900"
                        />
                        <label htmlFor="sinDatosNoCumpleNormativa" className="text-sm font-medium text-gray-700">
                          Sin datos
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4 text-center p-4">
                    <p className="text-base text-center text-gray-700 font-bold">Descripción</p>
                    <input
                      type="text"
                      id="descripcionNoCumpleNormativa"
                      name="descripcionNoCumpleNormativa"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">I.2 Permiso de Construcción </p>
                  </div>

                  {/* 2 Checkboxes sin título (3 columnas) */}
                  <div className="p-4 rounded-lg col-span-3 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sinDatosPermisoConstruccion"
                        name="sinDatosPermisoConstruccion"
                        className="w-4 h-4 border-gray-300 focus:ring-green-900"
                      />
                      <label htmlFor="sinDatosPermisoConstruccion" className="text-sm font-medium text-gray-700">
                        Sin datos
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sinPresentarPermisoConstruccion"
                        name="sinPresentarPermisoConstruccion"
                        className="w-4 h-4 border-gray-300 focus:ring-green-900"
                      />
                      <label htmlFor="sinPresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                        Sin presentar
                      </label>
                    </div>
                  </div>

                  <div className="col-span-9 p-4 rounded-lg border">
                    <p className="text-lg text-gray-700 font-bold mb-3 text-center">Presentado. Sin aprobar</p>

                    <div className="grid grid-cols-9 gap-2">
                      <div className="p-4 rounded-lg col-span-4">
                        <p className="text-base text-gray-700 font-bold mb-2 text-center">Planos y superficie presentados coinciden con  construcciones existentes</p>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="siPlanoSuperficiePresentarPermisoConstruccion"
                              name="siPlanoSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="siPlanoSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Si
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="noPlanoSuperficiePresentarPermisoConstruccion"
                              name="noPlanoSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="noPlanoSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              No
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="sinVerificarPlanoSuperficiePresentarPermisoConstruccion"
                              name="sinVerificarPlanoSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="sinVerificarPlanoSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Sin verificar
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* 3 Checkboxes con título 2 (5 columnas) */}
                      <div className="p-4 rounded-lg col-span-5">
                        <p className="text-base text-gray-700 font-bold mb-2 text-center">Observado</p>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="siObservadoSuperficiePresentarPermisoConstruccion"
                              name="siObservadoSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="siObservadoSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Si
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="noObservadoSuperficiePresentarPermisoConstruccion"
                              name="noObservadoSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="noObservadoSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              No
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="sinVerificarOSuperficiePresentarPermisoConstruccion"
                              name="sinVerificarOSuperficiePresentarPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="sinVerificarOSuperficiePresentarPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Sin verificar
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4 p-4 rounded-lg ">
                    <p className="text-lg text-gray-700 font-bold mb-3 text-center">Presentado Aprobado</p>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-4 rounded-lg col-span-4">
                        <p className="text-base text-gray-700 font-bold mb-2 text-center">Planos y superficie aprobados coinciden con  construcciones existentes</p>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="siPresentadoAprobadoPlanosSuperficiePermisoConstruccion"
                              name="siPresentadoAprobadoPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="siPresentadoAprobadoPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Si
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="noPresentadoAprobadoPlanosSuperficiePermisoConstruccion"
                              name="noPresentadoAprobadoPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="noPresentadoAprobadoPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              No
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="sinVerificarPAPlanosSuperficiePermisoConstruccion"
                              name="sinVerificarPAPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="sinVerificarPAPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Sin verificar
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4 p-4 rounded-lg ">
                    <p className="text-lg text-gray-700 font-bold mb-3 text-center">Con Habilitación Final </p>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-4 rounded-lg col-span-4">
                        <p className="text-base text-gray-700 font-bold mb-2 text-center">Planos y superficie habilitados coinciden con  construcciones existentes</p>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="siHabilitacionFinalPlanosSuperficiePermisoConstruccion"
                              name="siHabilitacionFinalPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="siHabilitacionFinalPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Si
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="noHabilitacionFinalPlanosSuperficiePermisoConstruccion"
                              name="noHabilitacionFinalPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="noHabilitacionFinalPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              No
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="sinVerificarHFPlanosSuperficiePermisoConstruccion"
                              name="sinVerificarHFPlanosSuperficiePermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="sinVerificarHFPlanosSuperficiePermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Sin verificar
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-span-4 p-4 rounded-lg ">
                    <p className="text-lg text-gray-700 font-bold mb-3 text-center">Origen información</p>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-4 rounded-lg col-span-4">
                        <p className="text-base text-gray-700 font-bold mb-2 text-center">Constatado Tasador</p>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="siOrigenInformacionConstatadoTasadorPermisoConstruccion"
                              name="siOrigenInformacionConstatadoTasadorPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="siOrigenInformacionConstatadoTasadorPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              Si
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="noOrigenInformacionConstatadoTasadorPermisoConstruccion"
                              name="noOrigenInformacionConstatadoTasadorPermisoConstruccion"
                              className="w-4 h-4 border-gray-300 focus:ring-green-900"
                            />
                            <label htmlFor="noOrigenInformacionConstatadoTasadorPermisoConstruccion" className="text-sm font-medium text-gray-700">
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">I.3 Observaciones</p>
                    <p className="text-lg text-center text-gray-700 font-bold"> Observaciones de la SECCIÓN  para Legales BBVA</p>
                    <input
                      type="text"
                      id="observacionesSeccionLegalesObservaciones"
                      name="observacionesSeccionLegalesObservaciones"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <p className="text-lg text-center text-gray-700 font-bold"> Otras observaciones de la SECCIÓN </p>
                    <input
                      type="text"
                      id="otrasObservacionesObservaciones"
                      name="otrasObservacionesObservaciones"
                      className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>


                </div>

                <CalculoInforme
                  tipoInforme="BBVA"
                  configuracion={configuracionBbva}
                  //superficieTerreno={values.superficieTerrenoCaracteristicas || 0}
                  //comparables={formData.comparables || []}  
                  onGetCalculoData={(fn) => setGetCalculoData(() => fn)}
                //estadoConservacion={formData.calidadMantenimiento}
                //anioConstruccion={formData.anioConstruccion}
                />


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
        </form >
      </div >
      <ItemObraCivilModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        idInformeBbva={provisionalInformeId}
        initialFormData={currentItem || {}}
        onSave={handleSaveItem}
      />
      <ItemAntiguedadesModal
        isOpen={isModalAntiguedadesOpen}
        onRequestClose={handleCloseModalAntiguedades}
        idInformeBbva={provisionalInformeId}
        initialFormData={currentItem || {}}
        onSave={handleSaveItemActualizacion}
        onUpdate={handleItemUpdate}
      />
      <ItemAntiguedadesDescripcionModal
        isOpen={isModalAntiguedadesDescripcionOpen}
        onRequestClose={handleCloseModalAntiguedadesDescripcion}
        idInformeBbva={provisionalInformeId}
        initialFormData={currentItem || {}}
        onSave={handleSaveItemActualizacionDescripcion}
        onUpdate={handleItemUpdate}
      />
      <ItemComodidadesDescripcionModal
        isOpen={isModalComodidadesDescripcionOpen}
        onRequestClose={handleCloseModalComodidadesDescripcion}
        idInformeBbva={provisionalInformeId}
        initialFormData={currentItem || {}}
        onSave={handleSaveItemActualizacionDescripcion}
        onUpdate={handleItemUpdate}
      />
      <ItemPlanillaDescripcionModal
        isOpen={isModalPlanillaDescripcionOpen}
        onRequestClose={handleCloseModalPlanillaDescripcion}
        idInformeBbva={provisionalInformeId}
        initialFormData={currentItem || {}}
        onSave={handleSaveItemActualizacionDescripcion}
        onUpdate={handleItemUpdate}
      />
    </div >

  );


};

export default InformeBbva;



function initialInformeState(usuario) {
  return {
    visitaInspectorResumen: "",
    fechaAsignacionServicioResumen: "",
    noSeEmitioInformacionTasadorInfNegativo: false,
    planosImagenesUrl: "",
  };
}