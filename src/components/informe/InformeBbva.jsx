import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import BbvaLogo from "../../images/logo-bbva.png";
import { Formik, Form, Field, FieldArray } from 'formik';
import InformeBbvaService from '../../api/InformeBbvaService';
import ItemObraCivilModal from '../utils/ItemObraCivilModal';
import plusIcon from '../../images/plusIcon.png';
import ItemObraCivilService from '../../api/ItemObraCivilService';
import ItemAntiguedadesModal from '../utils/ItemAntiguedadesModal';
import ItemAntiguedadesDescripcionModal from '../utils/ItemAntiguedadesDescripcionModal';
import ItemComodidadesDescripcionModal from '../utils/ItemComodidadesDescripcionModal'
import ItemPlanillaDescripcionModal from '../utils/ItemPlanillaDescripcionModal'
import CalculoInforme from '../calculo/CalculoInforme';

const InformeBbva = () => {
  const navigate = useNavigate();
  const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
  const [informe, setinforme] = useState(() => initialInformeState({}));
  const [firmaTasadorPreview, setFirmaTasadorPreview] = useState(null);
  const [firmaRepresentantePreview, setFirmaRepresentantePreview] = useState(null);
  const [fotoAreaCroquisUbicacionPreview, setFotoAreaCroquisUbicacionPreview] = useState(null);
/*   const [bothChecked, setBothChecked] = useState(false);
 */  const [itemsObraCivil, setItemsObraCivil] = useState([]);
/*   const [isVisible, setIsVisible] = useState(true);
 */  const [sumaDocumentada, setSumaDocumentada] = useState(0);
  const [sumaVerificada, setSumaVerificada] = useState(0);
  const [sumaCubierta, setSumaCubierta] = useState({ documentada: 0, verificada: 0 });
  const [sumaSemiCubierta, setSumaSemiCubierta] = useState({ documentada: 0, verificada: 0 });
  const [sumaOtros, setSumaOtros] = useState({ documentada: 0, verificada: 0 });
  const [previewImages, setPreviewImages] = useState([]); // 🔥 Estado para vistas previas
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesFotos, setSelectedFilesFotos] = useState([]);
  const [previewImagesFotos, setPreviewImagesFotos] = useState([]);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isModalAntiguedadesOpen, setIsModalAntiguedadesOpen] = useState(false);
  const [isModalAntiguedadesDescripcionOpen, setIsModalAntiguedadesDescripcionOpen] = useState(false);
  const [isModalComodidadesDescripcionOpen, setIsModalComodidadesDescripcionOpen] = useState(false);
  const [isModalPlanillaDescripcionOpen, setIsModalPlanillaDescripcionOpen] = useState(false);

  const [getCalculoData, setGetCalculoData] = useState(null);


  /*   const [isModalAntiguedadesCubiertaOpen, setIsModalAntiguedadesCubiertaOpen] = useState(false);
   */
  /*   const [isAntiguedadesCimentacionDescripcion, setAntiguedadesCimentacionDescripcion] = useState(false);
   */

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
    calcularSumas(updatedItems); // Si es necesario recalcular sumas
  };



  const handleFieldChangeCimentacion = (id, fieldName, value = null) => {
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

  const handleFieldChangeCubierta = (id, fieldName, value = null) => {
    const updatedItems = itemsObraCivil.map((item) => {
      if (item.id === id) {
        const resetFields = {
          hArmadoCubiertaDescripcion: false,
          maderaCubiertaDescripcion: false,
          metalicaCubiertaDescripcion: false,
          bovedillaCubiertaDescripcion: false,
          otrosCubiertaDescripcion: false,
        };
        if (fieldName === 'otrosDescripcionCubiertaDescripcion') {
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

  const handleUploadFotos = async (id) => {
    if (!selectedFilesFotos.length) {
      console.log("⚠️ No hay fotos para subir.");
      return;
    }

    const formData = new FormData();
    selectedFilesFotos.forEach(file => formData.append("files", file));

    try {
      console.log("📤 Enviando fotos a:", `http://localhost:8080/api/informeBbva/${id}/uploadFotos`);
      await InformeBbvaService.uploadFotos(id, formData);

      toast.success("Fotos subidas correctamente");
      setSelectedFilesFotos([]);
      setPreviewImagesFotos([]);
    } catch (error) {
      console.error("❌ Error al subir fotos:", error);
      toast.error("Error al subir fotos");
    }
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

  const handleFileUpload = async (file, setFieldValue, fieldName, setPreview) => {
    try {
      const fileUrl = await InformeBbvaService.uploadFirma(file);
      setFieldValue(fieldName, fileUrl); // Guarda la URL en Formik
      setPreview(URL.createObjectURL(file)); // Muestra la vista previa
    } catch (error) {
      toast.error("Error al subir el archivo");
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
      console.log("⚠️ No hay archivos para subir.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      console.log("📂 Agregando archivo:", file.name);
      formData.append("files", file);
    });

    try {
      console.log("📤 Enviando imágenes a:", `http://localhost:8080/api/informeBbva/${id}/uploadPlanos`);
      const response = await InformeBbvaService.uploadPlanos(id, formData);

      toast.success("Imágenes subidas correctamente");
      setSelectedFiles([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("❌ Error al subir imágenes:", error);
      toast.error("Error al subir imágenes");
    }
  };




  const handleRemovePreviewImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemovePreviewFotos = (index) => {
    setPreviewImagesFotos(prev => prev.filter((_, i) => i !== index));
    setSelectedFilesFotos(prev => prev.filter((_, i) => i !== index));
  };

  // Componente para conectar los cálculos con Formik
  const CalculoFormikConnector = ({ getCalculoData, setFieldValue }) => {
    useEffect(() => {
      const actualizarValoresFormik = () => {
        if (!getCalculoData) return;

        try {
          const calculoData = getCalculoData();

          // Actualizamos los valores relevantes en el formulario Formik
          setFieldValue('valorMercadoTotalResumen', calculoData.valorMercado || 0);
          setFieldValue('valorMercadoM2Resumen', calculoData.valorMercadoMetroCuadrado || 0);
          setFieldValue('valorRemateTotalResumen', calculoData.valorRemate || 0);
          setFieldValue('valorRemateM2Resumen', calculoData.valorRemateMetroCuadrado || 0);
          setFieldValue('valorTerrenoTotalResumen', calculoData.valorTerreno || 0);
          setFieldValue('valorTerrenoM2Resumen', calculoData.valorMetroTerreno || 0);
          setFieldValue('superficieTerrenoResumen', calculoData.superficieTerreno || 0);
          setFieldValue('valorObraCivilTotalResumen', calculoData.valorObraCivil || 0);
          setFieldValue('valorObraCivilM2Resumen', calculoData.costoReposicionMetroCuadrado || 0);

          // También podemos actualizar el valor en superficieTerreno para que se refleje en el componente CalculoInforme
          setFieldValue('superficieTerrenoCaracteristicas', calculoData.superficieTerreno || 0);
        } catch (error) {
          console.error("Error al actualizar valores desde cálculo:", error);
        }
      };

      // Ejecutar una vez inmediatamente
      actualizarValoresFormik();

      // Configuramos un intervalo para actualizar periódicamente
      const intervalId = setInterval(actualizarValoresFormik, 2000);

      // Limpiamos el intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }, [getCalculoData, setFieldValue]);

    // Este componente no renderiza nada visible
    return null;
  };


  const submitHandler = async (values, { setSubmitting }) => {
    try {

      if (getCalculoData) {
        try {
          const calculoData = getCalculoData();
          console.log("Datos del cálculo a enviar:", calculoData);

          // Si hay un ID de informe, guardar el cálculo
          if (provisionalInformeId) {
            await InformeBbvaService.saveCalculo(provisionalInformeId, calculoData);
          } else {
            console.log("No hay ID de informe disponible para guardar el cálculo");
          }
        } catch (error) {
          console.error("Error al obtener o guardar datos del cálculo:", error);
          const confirmar = window.confirm("Hubo un error al procesar los datos del cálculo. ¿Deseas continuar sin guardarlos?");
          if (!confirmar) {
            setSubmitting(false);
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
      const response = await InformeBbvaService.updateInformeBbva(provisionalInformeId, values);

      if (selectedFiles.length > 0) {
        console.log("📤 Subiendo imágenes de planos...");
        await handleUploadPlanos(response.id);
      }

      if (selectedFilesFotos.length > 0) {
        console.log("📤 Subiendo imágenes de fotos...");
        await handleUploadFotos(response.id);
      }

      toast.success("Informe guardado correctamente");
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      toast.error("Error al guardar el informe");
      console.error(error);
    } finally {
      setSubmitting(false);
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



  /* 
  
  SUBMITHANDLER que funciona bien 

  const submitHandler = async (values) => {
    try {

      console.log("Valores enviados al backend: ", values); // 👈 Verifica qué se está enviando

      const updatePromises = itemsObraCivil.map(async (item) => {

        console.log("item tipoAguaCalienteDescripcion ", item.tipoAguaCalienteDescripcion);

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
          otrosMurosInteriorInteriorDescripcion: item.otrosMurosInteriorInteriorDescripcion
        };

        console.log("item tipoAguaCalienteDescripcion ", item.tipoAguaCalienteDescripcion);

        return await ItemObraCivilService.updateItemObraCivil(item.id, updatedFields);
      });

      await Promise.all(updatePromises);
      toast.success("Informe actualizado correctamente");
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      toast.error("Error al actualizar el informe");
      console.error(error);
    }
  };*/


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

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      console.log("⚠️ No se seleccionaron archivos.");
      return;
    }

    console.log("📂 Archivos seleccionados:", files.map(f => f.name));

    setSelectedFiles(prev => [...prev, ...files]);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...filePreviews]);
  };


  const handleFileSelectFotos = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      console.log("⚠️ No se seleccionaron fotos.");
      return;
    }

    console.log("📂 Fotos seleccionadas:", files.map(f => f.name));

    setSelectedFilesFotos(prev => [...prev, ...files]);
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImagesFotos(prev => [...prev, ...filePreviews]);
  };


  const handleRemoveImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFotos = (index) => {
    setSelectedFilesFotos(prev => prev.filter((_, i) => i !== index));
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

      <Formik
        initialValues={informe}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <CalculoFormikConnector getCalculoData={getCalculoData} setFieldValue={setFieldValue} />

            <div className="bg-white shadow-lg w-11/12 mx-auto rounded-xl p-6 mb-16">
              <div className="grid grid-cols-12 gap-2">
                {/* Información General */}
                <div className="col-span-12 space-y-4 border p-3 rounded">
                  <h4 className="text-xl text-green-900">SECCIÓN A- Resumen</h4>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-12 rounded-md">
                      <label
                        htmlFor="fechaAsignacionServicioResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Fecha asignación:
                      </label>
                      <Field
                        type="date"
                        id="fechaAsignacionServicioResumen"
                        name="fechaAsignacionServicioResumen"
                        className="p-1 w-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="visitaFechaResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Fecha visita:
                      </label>
                      <Field
                        type="date"
                        id="visitaFechaResumen"
                        name="visitaFechaResumen"
                        className="p-1 w-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="visitaInspectorResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Inspector:
                      </label>
                      <Field
                        type="text"
                        id="visitaInspectorResumen"
                        name="visitaInspectorResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                      <label
                        htmlFor="tipoInformeResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Tipo de Informe:
                      </label>
                      <Field
                        type="radio"
                        name="tipoInformeResumen"
                        value="Definitivo"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('tipoInformeResumenDefinitivo', true);
                          setFieldValue('tipoInformeResumenCorregido', false);
                        }}
                      />
                      <label className="p-2 text-gray-700">Definitivo</label>
                      <Field
                        type="radio"
                        name="tipoInformeResumen"
                        value="Corregido"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('tipoInformeResumenDefinitivo', false);
                          setFieldValue('tipoInformeResumenCorregido', true);
                        }}
                      />
                      <label className="p-2 text-gray-700">Corregido</label>

                      <label
                        htmlFor="fechaInformeResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Fecha Informe:
                      </label>
                      <Field
                        type="date"
                        id="fechaInformeResumen"
                        name="fechaInformeResumen"
                        className="p-1 w-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                    </div>
                  </div>


                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 rounded-md">
                      <label
                        htmlFor="clienteResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Cliente/s:
                      </label>
                      <Field
                        type="text"
                        id="clienteResumen"
                        name="clienteResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="oficialCuentaResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Oficial Cuentas:
                      </label>
                      <Field
                        type="text"
                        id="oficialCuentaResumen"
                        name="oficialCuentaResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                      <label
                        htmlFor="firmaTasadorResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Firma Tasadora:
                      </label>
                      <Field
                        type="text"
                        id="firmaTasadorResumen"
                        name="firmaTasadorResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                      <label
                        htmlFor="representanteResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Representante:
                      </label>
                      <Field
                        type="text"
                        id="representanteResumen"
                        name="representanteResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                      <label
                        htmlFor="tasadorResumen"
                        className="p-2 text-sm text-gray-700 font-bold"
                      >
                        Tasador:
                      </label>
                      <Field
                        type="text"
                        id="tasadorResumen"
                        name="tasadorResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />

                    </div>
                  </div>
                </div>
                <div className="col-span-12 space-y-4 p-3 rounded border ">
                  <h4 className="text-xl text-green-900 text-center">Identificación y Ubicación</h4>
                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-2">
                      <div className='border rounded-md text-center'>
                        <Field
                          type="radio"
                          name="ubicacionResumen"
                          value="norte"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('ubicacionNorteResumen', true);
                            setFieldValue('ubicacionSurResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Norte</label>

                        <Field
                          type="radio"
                          name="ubicacionResumen"
                          value="sur"
                          className="form-radio h-4 w-4"
                          onClick={() => {
                            setFieldValue('ubicacionNorteResumen', false);
                            setFieldValue('ubicacionSurResumen', true);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Sur</label>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className='border rounded-md text-center'>
                        <Field
                          type="radio"
                          name="tipo"
                          value="urbano"
                          className="form-radio h-4 w-4 "
                          onClick={() => {
                            setFieldValue('tipoUrbanoResumen', true);
                            setFieldValue('tipoSuburbanoResumen', false);
                          }}
                        />
                        <label className="p-2 text-gray-700 font-bold text-sm">Urbano</label>
                        <Field
                          type="radio"
                          name="tipo"
                          value="suburbano"
                          className="form-radio h-4 w-4"
                          onClick={() => {
                            setFieldValue('tipoUrbanoResumen', false);
                            setFieldValue('tipoSuburbanoResumen', true);
                          }}
                        />
                        <label className="p-2 text-gray-700 font-bold text-sm">Suburbano</label>
                      </div>
                    </div>

                    <div className="col-span-5">
                      <div className='border rounded-md text-center'>
                        <label
                          htmlFor="ruralResumen"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Rural:
                        </label>
                        <Field
                          type="number"
                          id="ruralResumen"
                          name="ruralResumen"
                          className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />

                        <label
                          htmlFor="padronResumen"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Padrón:
                        </label>
                        <Field
                          type="number"
                          id="padronResumen"
                          name="padronResumen"
                          className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />

                        <label
                          htmlFor="manzanaResumen"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Manzana:
                        </label>
                        <Field
                          type="number"
                          id="manzanaResumen"
                          name="manzanaResumen"
                          className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />

                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className='border rounded-md text-center'>
                        <label
                          htmlFor="seccionJudicialCatastralResumen"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Sección Judicial/Catastral:
                        </label>
                        <Field
                          type="text"
                          id="seccionJudicialCatastralResumen"
                          name="seccionJudicialCatastralResumen"
                          className="ml-2 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 ">
                    <div className="col-span-3">
                      <label
                        htmlFor="localidadParajeResumen"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Localidad/Paraje:
                      </label>
                      <Field
                        type="text"
                        id="localidadParajeResumen"
                        name="localidadParajeResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="departamentoResumen"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Departamento:
                      </label>
                      <Field
                        type="text"
                        id="departamentoResumen"
                        name="departamentoResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="calleModoAccesoResumen"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Calle/Modo acceso:
                      </label>
                      <Field
                        type="text"
                        id="calleModoAccesoResumen"
                        name="calleModoAccesoResumen"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="nombreNroPuertaResumen"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Nombre/Nro Puerta:
                      </label>
                      <Field
                        type="text"
                        id="nombreNroPuertaResumen"
                        name="nombreNroPuertaResumen"
                        className="p-1 w-14 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="otrasReferenciasUbicacionResumen"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Otras referencias de ubicación:
                      </label>
                      <Field
                        type="text"
                        id="otrasReferenciasUbicacionResumen"
                        name="otrasReferenciasUbicacionResumen"
                        className="p-1 w-96 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center border rounded-md">
                      <p className="text-base text-center font-bold text-green-900">Régimen futuro</p>
                      <Field
                        type="radio"
                        name="regimen"
                        value="comun"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunResumen', true);
                          setFieldValue('regimenFuturoPropiedadHorizontalResumen', false);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalResumen', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Común</label>
                      <Field
                        type="radio"
                        name="regimen"
                        value="propiedadHorizontal"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunResumen', false);
                          setFieldValue('regimenFuturoPropiedadHorizontalResumen', true);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalResumen', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">P. Hor.</label>
                      <Field
                        type="radio"
                        name="regimen"
                        value="UrbanizacionPHorizontal"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunResumen', false);
                          setFieldValue('regimenFuturoPropiedadHorizontalResumen', false);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalResumen', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Urb. P.Hor.</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <div className='border rounded-md text-center'>
                        <p className="text-base text-center font-bold text-green-900">Terreno</p>
                        <Field
                          type="radio"
                          name="terreno"
                          value="baldio"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('terrenoBaldioResumen', true);
                            setFieldValue('terrenoEdificadoResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Baldío</label>

                        <Field
                          type="radio"
                          name="terreno"
                          value="edificado"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('terrenoBaldioResumen', false);
                            setFieldValue('terrenoEdificadoResumen', true);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Edificado</label>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className='border rounded-md text-center'>
                        <p className="text-base text-center font-bold text-green-900">Destino</p>
                        <Field
                          type="radio"
                          name="destino"
                          value="vivienda"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('destinoViviendaResumen', true);
                            setFieldValue('destinoComercioResumen', false);
                            setFieldValue('destinoOtrosResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Vivienda</label>

                        <Field
                          type="radio"
                          name="destino"
                          value="comercio"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('destinoViviendaResumen', false);
                            setFieldValue('destinoComercioResumen', true);
                            setFieldValue('destinoOtrosResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Comercio</label>

                        <Field
                          type="radio"
                          name="destino"
                          value="otros"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('destinoViviendaResumen', false);
                            setFieldValue('destinoComercioResumen', false);
                            setFieldValue('destinoOtrosResumen', true);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Otros</label>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className='border rounded-md text-center'>
                        <p className="text-base text-center font-bold text-green-900">Tipología</p>
                        <Field
                          type="radio"
                          name="tipologia"
                          value="casa"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('tipologiaCasaResumen', true);
                            setFieldValue('tipologiaApartamentoResumen', false);
                            setFieldValue('tipologiaOtraResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Casa</label>
                        <Field
                          type="radio"
                          name="tipologia"
                          value="apartamento"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('tipologiaCasaResumen', false);
                            setFieldValue('tipologiaApartamentoResumen', true);
                            setFieldValue('tipologiaOtraResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Apartamento</label>
                        <Field
                          type="radio"
                          name="tipologia"
                          value="otra"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('tipologiaCasaResumen', false);
                            setFieldValue('tipologiaApartamentoResumen', false);
                            setFieldValue('tipologiaOtraResumen', true);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Otra</label>
                      </div>
                    </div>



                    <div className="col-span-3">
                      <div className='border rounded-md text-center'>
                        <p className="text-base text-center font-bold text-green-900">Situación construcciones</p>
                        <Field
                          type="radio"
                          name="construcciones"
                          value="terminadas"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('situacionConstruccionesTerminadasResumen', true);
                            setFieldValue('situacionConstruccionesInconclusasResumen', false);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Terminadas</label>
                        <Field
                          type="radio"
                          name="construcciones"
                          value="inconclusas"
                          className="form-radio ml-2 h-4 w-4 "
                          onClick={() => {
                            setFieldValue('situacionConstruccionesTerminadasResumen', false);
                            setFieldValue('situacionConstruccionesInconclusasResumen', true);
                          }}
                        />
                        <label className=" p-2 text-gray-700 font-bold text-sm">Inconclusas</label>
                      </div>
                    </div>

                  </div>

                  <div className="border p-4">
                    <h4 className="text-xl text-green-900 text-center">Tipo de construcción</h4>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-2 flex items-center">
                        <Field
                          type="radio"
                          name="tipoConstruccion"
                          value="tradicional"
                          className="form-radio ml-2 h-4 w-4"
                          onClick={() => {
                            setFieldValue('tipoConstruccionTradicionalResumen', true);
                            setFieldValue('tipoConstruccionMaderaResumen', false);
                            setFieldValue('tipoConstruccionSteelFramingResumen', false);
                            setFieldValue('tipoConstruccionContenedorResumen', false);
                          }}
                        />
                        <label className="ml-2 text-gray-700 font-bold text-sm">Tradicional</label>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Field
                          type="radio"
                          name="tipoConstruccion"
                          value="madera"
                          className="form-radio ml-2 h-4 w-4"
                          onClick={() => {
                            setFieldValue('tipoConstruccionTradicionalResumen', false);
                            setFieldValue('tipoConstruccionMaderaResumen', true);
                            setFieldValue('tipoConstruccionSteelFramingResumen', false);
                            setFieldValue('tipoConstruccionContenedorResumen', false);
                          }}
                        />
                        <label className="ml-2 text-gray-700 font-bold text-sm">Madera</label>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Field
                          type="radio"
                          name="tipoConstruccion"
                          value="steelFraming"
                          className="form-radio ml-2 h-4 w-4"
                          onClick={() => {
                            setFieldValue('tipoConstruccionTradicionalResumen', false);
                            setFieldValue('tipoConstruccionMaderaResumen', false);
                            setFieldValue('tipoConstruccionSteelFramingResumen', true);
                            setFieldValue('tipoConstruccionContenedorResumen', false);
                          }}
                        />
                        <label className="ml-2 text-gray-700 font-bold text-sm">Steel Framing</label>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Field
                          type="radio"
                          name="tipoConstruccion"
                          value="contenedor"
                          className="form-radio ml-2 h-4 w-4"
                          onClick={() => {
                            setFieldValue('tipoConstruccionTradicionalResumen', false);
                            setFieldValue('tipoConstruccionMaderaResumen', false);
                            setFieldValue('tipoConstruccionSteelFramingResumen', false);
                            setFieldValue('tipoConstruccionContenedorResumen', true);
                          }}
                        />
                        <label className="ml-2 text-gray-700 font-bold text-sm">Contenedor</label>
                      </div>
                      <div className="col-span-4 flex text-left items-center">
                        <label
                          htmlFor="tipoConstruccionCombinadaOtrosResumen"
                          className="p-3 text-sm text-gray-700 font-bold"
                        >
                          Combinada/Otros:
                        </label>
                        <Field
                          type="text"
                          id="tipoConstruccionCombinadaOtrosResumen"
                          name="tipoConstruccionCombinadaOtrosResumen"
                          className="p-1 w-60 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
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
                    <Field
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
                      <Field
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
                      <Field
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
                      <Field
                        type="number"
                        id="valorTerrenoM2Resumen"
                        name="valorTerrenoM2Resumen"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-3">
                      <Field
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
                      <Field
                        type="number"
                        id="valorObraCivilM2Resumen"
                        name="valorObraCivilM2Resumen"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-3">
                      <Field
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
                      <Field
                        type="number"
                        id="valorMercadoM2Resumen"
                        name="valorMercadoM2Resumen"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-3">
                      <Field
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
                      <Field
                        type="number"
                        id="valorRemateM2Resumen"
                        name="valorRemateM2Resumen"
                        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-3">
                      <Field
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
                      <Field
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
                        <Field
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
                        <Field
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
                        <Field
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
                          <Field
                            type="hidden"
                            id="firmaTasadorUrlResumen"
                            name="firmaTasadorUrlResumen"
                          />
                          <input
                            type="file"
                            id="firmaTasadorFile"
                            name="firmaTasadorFile"
                            accept="image/*"
                            className=" block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                            onChange={async (event) => {
                              const file = event.currentTarget.files[0];
                              if (file) {
                                await handleFileUpload(file, setFieldValue, "firmaTasadorUrlResumen", setFirmaTasadorPreview);
                              }
                            }}
                          />
                          {firmaTasadorPreview && (
                            <div className="flex justify-center mt-2">
                              <img src={firmaTasadorPreview} alt="Firma Tasador" className="h-32" />
                            </div>
                          )}
                          <Field
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
                          <Field
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
                                await handleFileUpload(file, setFieldValue, "firmaRepresentanteUrlResumen", setFirmaRepresentantePreview);
                              }
                            }}
                          />
                          {firmaRepresentantePreview && (
                            <div className="flex justify-center mt-2">
                              <img src={firmaRepresentantePreview} alt="Firma Representante" className="h-32" />
                            </div>
                          )}
                          <Field
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
                  <h4 className="text-xl text-green-900">SECCIÓN B- Información general</h4>
                  <h6 className="text-xl p-2 text-green-900 text-center">Información del Cliente</h6>
                  <div className="grid grid-cols-12 items-center">
                    <label
                      htmlFor="nombresInformacionGeneral"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Nombre/s:
                    </label>
                    <Field
                      type="text"
                      id="nombresInformacionGeneral"
                      name="nombresInformacionGeneral"
                      className="col-span-6 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="cedulaInformacionGeneral"
                      className="col-span-2 p-2 text-sm text-gray-700 font-bold"
                    >
                      Cédula/s de Identidad:
                    </label>
                    <Field
                      type="text"
                      id="cedulaInformacionGeneral"
                      name="cedulaInformacionGeneral"
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="grid grid-cols-12 items-center">
                    <label
                      htmlFor="telefonoInformacionGeneral"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Teléfono:
                    </label>
                    <Field
                      type="number"
                      id="telefonoInformacionGeneral"
                      name="telefonoInformacionGeneral"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="celularInformacionGeneral"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Celular:
                    </label>
                    <Field
                      type="number"
                      id="celularInformacionGeneral"
                      name="celularInformacionGeneral"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <label
                      htmlFor="mailInformacionGeneral"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Mail/s:
                    </label>
                    <Field
                      type="email"
                      id="mailInformacionGeneral"
                      name="mailInformacionGeneral"
                      className="col-span-5 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                  </div>

                  <h6 className="text-xl p-2 text-green-900 text-center">Información Oficial de Cuentas</h6>

                  <div className="grid grid-cols-12 items-center">
                    <label
                      htmlFor="nombreInformacionOficialCuentas"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Nombre:
                    </label>
                    <Field
                      type="text"
                      id="nombreInformacionOficialCuentas"
                      name="nombreInformacionOficialCuentas"
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="sucursalInformacionOficialCuentas"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Sucursal:
                    </label>
                    <Field
                      type="text"
                      id="sucursalInformacionOficialCuentas"
                      name="sucursalInformacionOficialCuentas"
                      className="col-span-1 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="telefonoInformacionOficialCuentas"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Teléfono:
                    </label>
                    <Field
                      type="text"
                      id="telefonoInformacionOficialCuentas"
                      name="telefonoInformacionOficialCuentas"
                      className="col-span-1 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="mailInformacionOficialCuentas"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Mail:
                    </label>
                    <Field
                      type="text"
                      id="mailInformacionOficialCuentas"
                      name="mailInformacionOficialCuentas"
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <h6 className="text-xl p-2 text-green-900 text-center">Información del Tasador</h6>

                  <div className="grid grid-cols-12 items-center">
                    <label
                      htmlFor="nombreInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Nom. Firma:
                    </label>
                    <Field
                      type="text"
                      id="nombreInformacionTasador"
                      name="nombreInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="direccionInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Dirección:
                    </label>
                    <Field
                      type="text"
                      id="direccionInformacionTasador"
                      name="direccionInformacionTasador"
                      className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="telefonoInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Teléfono:
                    </label>
                    <Field
                      type="number"
                      id="telefonoInformacionTasador"
                      name="telefonoInformacionTasador"
                      className="col-span-1 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="representanteInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Representante:
                    </label>
                    <Field
                      type="text"
                      id="representanteInformacionTasador"
                      name="representanteInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <div className="grid grid-cols-12 items-center">
                    <label
                      htmlFor="nombreTasadorInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Nom. Tasa.:
                    </label>
                    <Field
                      type="text"
                      id="nombreTasadorInformacionTasador"
                      name="nombreTasadorInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="profesionTasadorInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Profesión:
                    </label>
                    <Field
                      type="text"
                      id="profesionTasadorInformacionTasador"
                      name="profesionTasadorInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="telefonoCelularTasadorInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Tel. y Cel.:
                    </label>
                    <Field
                      type="text"
                      id="telefonoCelularTasadorInformacionTasador"
                      name="telefonoCelularTasadorInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                    <label
                      htmlFor="mailTasadorInformacionTasador"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Mail:
                    </label>
                    <Field
                      type="text"
                      id="mailTasadorInformacionTasador"
                      name="mailTasadorInformacionTasador"
                      className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
                  </div>

                  <h6 className="text-lg p-2 text-green-900 text-center">Informe Negativo precedente</h6>

                  <div className="grid grid-cols-12 items-center ">

                    <div className="col-span-2 flex items-center ">
                      <Field
                        type="checkbox"
                        name="noSeEmitioInformacionTasadorInfNegativo"
                        className="appearance-none rounded-full border-2 border-gray-500 checked:bg-blue-500 ml-2 h-4 w-4"
                        //className="appearance-none rounded-full border-2 border-gray-300 checked:bg-green-900 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-green-900 h-4 w-4"
                        onChange={(e) => {
                          setFieldValue('noSeEmitioInformacionTasadorInfNegativo', e.target.checked);
                        }}
                      />
                      <label className="ml-2 text-gray-700 font-bold text-sm">No se emitió</label>
                    </div>


                    <label
                      htmlFor="emitioElInformacionTasadorInfNegativo"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold "
                    >
                      Emitido el:
                    </label>
                    <Field
                      type="date"
                      id="emitioElInformacionTasadorInfNegativo"
                      name="emitioElInformacionTasadorInfNegativo"
                      className="col-span-2 mr-2  px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <div className="col-span-7  ">
                      <label
                        htmlFor="descripcionInformacionTasadorSintesisInfDefinitivo"
                        className="text-center w-full text-sm text-gray-700 font-bold "
                      >
                        Motivos
                      </label>
                      <Field
                        component="textarea"
                        id="motivosInformacionTasadorInfNegativo"
                        name="motivosInformacionTasadorInfNegativo"
                        className=" w-full h-12 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                  </div>


                  <h6 className="text-lg p-2 text-green-900 text-center">Síntesis de cambios respecto a Informe Definitivo precedente</h6>

                  <div className="grid grid-cols-12 items-center ">

                    <div className="col-span-2 flex items-center ">
                      <Field
                        type="checkbox"
                        name="noSeEmitioInformacionTasadorSintesisInfDefinitivo"
                        className="appearance-none rounded-full border-2 border-gray-500 checked:bg-blue-500 ml-2 h-4 w-4"
                        onClick={() => {
                          setFieldValue('noSeEmitioInformacionTasadorSintesisInfDefinitivo', true);
                        }}
                      />
                      <label className="ml-2 text-gray-700 font-bold text-sm">No se emitió</label>
                    </div>


                    <label
                      htmlFor="emitioElInformacionTasadorSintesisInfDefinitivo"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold "
                    >
                      Emitido el:
                    </label>
                    <Field
                      type="date"
                      id="emitioElInformacionTasadorSintesisInfDefinitivo"
                      name="emitioElInformacionTasadorSintesisInfDefinitivo"
                      className="col-span-2 mr-2  px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />

                    <div className="col-span-7  ">
                      <label
                        htmlFor="descripcionInformacionTasadorSintesisInfDefinitivo"
                        className="text-center w-full text-sm text-gray-700 font-bold "
                      >
                        Descripción
                      </label>
                      <Field
                        component="textarea"
                        id="descripcionInformacionTasadorSintesisInfDefinitivo"
                        name="descripcionInformacionTasadorSintesisInfDefinitivo"
                        className=" w-full h-12 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                  </div>

                </div>

                <div className="col-span-12 space-y-4 border p-3 rounded">
                  <h4 className="text-xl text-green-900">SECCIÓN C-  Identificación y Ubicación </h4>
                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-2 border text-center">
                      <Field
                        type="radio"
                        name="ubicacionIdentificacion"
                        value="norte"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('norteIdentificacionUbicacion', true);
                          setFieldValue('surIdentificacionUbicacion', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Norte</label>
                      <Field
                        type="radio"
                        name="ubicacionIdentificacion"
                        value="sur"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('norteIdentificacionUbicacion', false);
                          setFieldValue('surIdentificacionUbicacion', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sur</label>
                    </div>
                    <div className="col-span-2 border text-center">
                      <Field
                        type="radio"
                        name="tipo"
                        value="urbano"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('urbanoIdentificacionUbicacion', true);
                          setFieldValue('suburbanoIdentificacionUbicacion', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Urbano</label>
                      <Field
                        type="radio"
                        name="tipo"
                        value="suburbano"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('urbanoIdentificacionUbicacion', false);
                          setFieldValue('suburbanoIdentificacionUbicacion', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Suburbano</label>
                    </div>
                    <div className="col-span-5">
                      <div className='text-center'>
                        <label
                          htmlFor="ruralIdentificacionUbicacion"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Rural:
                        </label>
                        <Field
                          type="number"
                          id="ruralIdentificacionUbicacion"
                          name="ruralIdentificacionUbicacion"
                          className="p-1 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                        <label
                          htmlFor="padronIdentificacionUbicacion"
                          className="text-sm p-2 text-gray-700 font-bold"
                        >
                          Padrón:
                        </label>
                        <Field
                          type="number"
                          id="padronIdentificacionUbicacion"
                          name="padronIdentificacionUbicacion"
                          className="p-1 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                        <label
                          htmlFor="manzanaIdentificacionUbicacion"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Manzana:
                        </label>
                        <Field
                          type="number"
                          id="manzanaIdentificacionUbicacion"
                          name="manzanaIdentificacionUbicacion"
                          className="p-1 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className=' text-center'>
                        <label
                          htmlFor="seccionJudicialCatastralIdentificacionUbicacion"
                          className=" text-sm p-2 text-gray-700 font-bold"
                        >
                          Sección Judicial/Catastral:
                        </label>
                        <Field
                          type="text"
                          id="seccionJudicialCatastralIdentificacionUbicacion"
                          name="seccionJudicialCatastralIdentificacionUbicacion"
                          className="p-1 w-20 text-center border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 ">
                    <div className="col-span-3">
                      <label
                        htmlFor="localidadParajeIdentificacionUbicacion"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Localidad/Paraje:
                      </label>
                      <Field
                        type="text"
                        id="localidadParajeIdentificacionUbicacion"
                        name="localidadParajeIdentificacionUbicacion"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="departamentoIdentificacionUbicacion"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Departamento:
                      </label>
                      <Field
                        type="text"
                        id="departamentoIdentificacionUbicacion"
                        name="departamentoIdentificacionUbicacion"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="calleModoAccesoIdentificacionUbicacion"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Calle/Modo acceso:
                      </label>
                      <Field
                        type="text"
                        id="calleModoAccesoIdentificacionUbicacion"
                        name="calleModoAccesoIdentificacionUbicacion"
                        className="p-1 w-40 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="nombreNroPuertaIdentificacionUbicacion"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Nombre/Nro Puerta:
                      </label>
                      <Field
                        type="text"
                        id="nombreNroPuertaIdentificacionUbicacion"
                        name="nombreNroPuertaIdentificacionUbicacion"
                        className="p-1 w-14 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <label
                        htmlFor="otrasReferenciasUbicacionIdentificacionUbicacion"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Otras referencias de ubicación:
                      </label>
                      <Field
                        type="text"
                        id="otrasReferenciasUbicacionIdentificacionUbicacion"
                        name="otrasReferenciasUbicacionIdentificacionUbicacion"
                        className="p-1 w-96 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center border rounded-md">
                      <p className="text-base text-center font-bold text-green-900">Régimen futuro</p>
                      <Field
                        type="radio"
                        name="regimen"
                        value="comun"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunIdentificacionUbicacion', true);
                          setFieldValue('regimenFuturoPropiedadHorizontalIdentificacionUbicacion', false);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Común</label>
                      <Field
                        type="radio"
                        name="regimen"
                        value="propiedadHorizontal"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunIdentificacionUbicacion', false);
                          setFieldValue('regimenFuturoPropiedadHorizontalIdentificacionUbicacion', true);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">P. Hor.</label>
                      <Field
                        type="radio"
                        name="regimen"
                        value="UrbanizacionPHorizontal"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('regimenFuturoComunIdentificacionUbicacion', false);
                          setFieldValue('regimenFuturoPropiedadHorizontalIdentificacionUbicacion', false);
                          setFieldValue('regimenFuturoUrbanizacionPHorizontalIdentificacionUbicacion', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Urb. P.Hor.</label>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 space-y-4 border p-3 rounded">
                  <h4 className="text-xl text-green-900">SECCIÓN D-Descripción del terreno</h4>
                  <h6 className="text-lg p-2 text-green-900 text-center">D.1-Características</h6>
                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-2 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Superficie terreno (m²)</p>
                      <Field
                        type="number"
                        id="superficieTerrenoCaracteristicas"
                        name="superficieTerrenoCaracteristicas"
                        className="p-1 w-1/2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Estado</p>
                      <Field
                        type="radio"
                        name="estado"
                        value="baldioCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('baldioCaracteristicas', true);
                          setFieldValue('edificadoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Baldío</label>
                      <Field
                        type="radio"
                        name="estado"
                        value="edificadoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('baldioCaracteristicas', false);
                          setFieldValue('edificadoCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Edificado</label>
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Forma</p>
                      <Field
                        type="text"
                        id="formaCaracteristicas"
                        name="formaCaracteristicas"
                        className="p-1 w-1/2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Ubicación en la manzana</p>
                      <Field
                        type="text"
                        id="ubicacionManzanaCaracteristicas"
                        name="ubicacionManzanaCaracteristicas"
                        className="p-1 w-1/2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Orientación</p>
                      <Field
                        type="text"
                        id="orientacionCaracteristicas"
                        name="orientacionCaracteristicas"
                        className="p-1 w-1/2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <p className="text-lg p-2 text-green-900 text-center">Deslindes según plano de Mensura inscripto en DNC</p>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-1 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Frente 1 (m)</p>
                      <Field
                        type="number"
                        id="frente1Caracteristicas"
                        name="frente1Caracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Frente 2 (m)</p>
                      <Field
                        type="number"
                        id="frente2Caracteristicas"
                        name="frente2Caracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Lateral 1 (m)</p>
                      <Field
                        type="number"
                        id="lateral1Caracteristicas"
                        name="lateral1Caracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Lateral 2 (m)</p>
                      <Field
                        type="number"
                        id="lateral2Caracteristicas"
                        name="lateral2Caracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Fondo (m)</p>
                      <Field
                        type="number"
                        id="fondoCaracteristicas"
                        name="fondoCaracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-7 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Otros</p>
                      <Field
                        type="text"
                        id="otrosCaracteristicas"
                        name="otrosCaracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Topografía y altimetría</p>
                      <Field
                        type="text"
                        id="topografiaAltimetriaCaracteristicas"
                        name="topografiaAltimetriaCaracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Orientación y vistas</p>
                      <Field
                        type="text"
                        id="orientacionVistasCaracteristicas"
                        name="orientacionVistasCaracteristicas"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>

                    <div className="col-span-2 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Evacuación pluviales</p>
                      <Field
                        type="radio"
                        name="evaluacionPlusvalia"
                        value="adecuadaCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('adecuadaCaracteristicas', true);
                          setFieldValue('inadecuadaCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Adecuada</label>
                      <Field
                        type="radio"
                        name="evaluacionPlusvalia"
                        value="inadecuadaCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('adecuadaCaracteristicas', false);
                          setFieldValue('inadecuadaCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Inadecuada</label>
                    </div>

                    <div className="col-span-2 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Probabilidad inundación</p>
                      <Field
                        type="radio"
                        name="probabilidadInundacion"
                        value="probableCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('probableCaracteristicas', true);
                          setFieldValue('improbableCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Probable</label>
                      <Field
                        type="radio"
                        name="probabilidadInundacion"
                        value="probableCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('probableCaracteristicas', false);
                          setFieldValue('improbableCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Improbable</label>
                    </div>

                  </div>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-12 text-center">
                      <label
                        htmlFor="descripcionCaracteristicas"
                        className="p-3 text-sm text-gray-700 font-bold"
                      >
                        Descripción:
                      </label>
                      <Field
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
                          <Field
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
                                await handleFileUpload(file, setFieldValue, "fotoAreaCroquisUbicacionUrlCaracteristicas", setFotoAreaCroquisUbicacionPreview);
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


                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Vías de acceso</p>
                      <Field
                        type="radio"
                        name="viasAcceso"
                        value="bitumenViasAccesoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('bitumenViasAccesoCaracteristicas', true);
                          setFieldValue('otrosViasAccesoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Bitumen</label>
                      <Field
                        type="radio"
                        name="viasAcceso"
                        value="otrosViasAccesoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('bitumenViasAccesoCaracteristicas', false);
                          setFieldValue('otrosViasAccesoCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otros</label>
                    </div>

                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Estado vías de acceso</p>
                      <Field
                        type="radio"
                        name="estadoViasAcceso"
                        value="excelenteEstadoViasAccesoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelenteEstadoViasAccesoCaracteristicas', true);
                          setFieldValue('regularEstadoViasAccesoCaracteristicas', false);
                          setFieldValue('maloEstadoViasAccesoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Excelente</label>
                      <Field
                        type="radio"
                        name="estadoViasAcceso"
                        value="regularEstadoViasAccesoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelenteEstadoViasAccesoCaracteristicas', false);
                          setFieldValue('regularEstadoViasAccesoCaracteristicas', true);
                          setFieldValue('maloEstadoViasAccesoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Regular</label>
                      <Field
                        type="radio"
                        name="estadoViasAcceso"
                        value="maloEstadoViasAccesoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelenteEstadoViasAccesoCaracteristicas', false);
                          setFieldValue('regularEstadoViasAccesoCaracteristicas', false);
                          setFieldValue('maloEstadoViasAccesoCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Malo</label>
                    </div>

                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Veredas</p>
                      <Field
                        type="radio"
                        name="veredas"
                        value="existenVeredasCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('existenVeredasCaracteristicas', true);
                          setFieldValue('noExistenVeredasCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Existen</label>
                      <Field
                        type="radio"
                        name="veredas"
                        value="noExistenVeredasCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('existenVeredasCaracteristicas', false);
                          setFieldValue('noExistenVeredasCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">No Existen</label>
                    </div>

                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Alumbrado público</p>
                      <Field
                        type="radio"
                        name="alumbradoPublico"
                        value="suficienteAlumbradoPublicoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('suficienteAlumbradoPublicoCaracteristicas', true);
                          setFieldValue('insuficienteAlumbradoPublicoCaracteristicas', false);
                          setFieldValue('noExisteAlumbradoPublicoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Suficiente</label>
                      <Field
                        type="radio"
                        name="alumbradoPublico"
                        value="insuficienteAlumbradoPublicoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('suficienteAlumbradoPublicoCaracteristicas', false);
                          setFieldValue('insuficienteAlumbradoPublicoCaracteristicas', true);
                          setFieldValue('noExisteAlumbradoPublicoCaracteristicas', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Insuficiente</label>
                      <Field
                        type="radio"
                        name="alumbradoPublico"
                        value="noExisteAlumbradoPublicoCaracteristicas"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('suficienteAlumbradoPublicoCaracteristicas', false);
                          setFieldValue('insuficienteAlumbradoPublicoCaracteristicas', false);
                          setFieldValue('noExisteAlumbradoPublicoCaracteristicas', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">No existe</label>
                    </div>
                  </div>

                  <h6 className="text-base p-2 text-green-900 text-center">Otros servicios e infraestructura</h6>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Abastecimiento de agua</p>
                      <Field
                        type="radio"
                        name="abastecimientoAgua"
                        value="publicoAbastecimientoAguaServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoAbastecimientoAguaServiciosInfraestructura', true);
                          setFieldValue('privadoAbastecimientoAguaServiciosInfraestructura', false);
                          setFieldValue('sinConexionAbastecimientoAguaServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Público</label>
                      <Field
                        type="radio"
                        name="abastecimientoAgua"
                        value="privadoAbastecimientoAguaServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoAbastecimientoAguaServiciosInfraestructura', false);
                          setFieldValue('privadoAbastecimientoAguaServiciosInfraestructura', true);
                          setFieldValue('sinConexionAbastecimientoAguaServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Privado</label>
                      <Field
                        type="radio"
                        name="abastecimientoAgua"
                        value="sinConexionAbastecimientoAguaServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoAbastecimientoAguaServiciosInfraestructura', false);
                          setFieldValue('privadoAbastecimientoAguaServiciosInfraestructura', false);
                          setFieldValue('sinConexionAbastecimientoAguaServiciosInfraestructura', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sin conexión</label>
                    </div>
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Desagües</p>
                      <Field
                        type="radio"
                        name="desagues"
                        value="publicoDesaguesServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoDesaguesServiciosInfraestructura', true);
                          setFieldValue('privadoDesaguesServiciosInfraestructura', false);
                          setFieldValue('sinConexionDesaguesServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Público</label>
                      <Field
                        type="radio"
                        name="desagues"
                        value="privadoDesaguesServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoDesaguesServiciosInfraestructura', false);
                          setFieldValue('privadoDesaguesServiciosInfraestructura', true);
                          setFieldValue('sinConexionDesaguesServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Privado</label>
                      <Field
                        type="radio"
                        name="desagues"
                        value="sinConexionDesaguesServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoDesaguesServiciosInfraestructura', false);
                          setFieldValue('privadoDesaguesServiciosInfraestructura', false);
                          setFieldValue('sinConexionDesaguesServiciosInfraestructura', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sin conexión</label>
                    </div>
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Teléfono</p>
                      <Field
                        type="radio"
                        name="telefono"
                        value="publicoTelefonoServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoTelefonoServiciosInfraestructura', true);
                          setFieldValue('sinConexionTelefonoServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Público</label>
                      <Field
                        type="radio"
                        name="telefono"
                        value="sinConexionTelefonoServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoTelefonoServiciosInfraestructura', false);
                          setFieldValue('sinConexionTelefonoServiciosInfraestructura', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sin conexión</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Electricidad</p>
                      <Field
                        type="radio"
                        name="electricidad"
                        value="publicoElectricidadServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoElectricidadServiciosInfraestructura', true);
                          setFieldValue('privadoElectricidadServiciosInfraestructura', false);
                          setFieldValue('sinConexionElectricidadServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Público</label>
                      <Field
                        type="radio"
                        name="electricidad"
                        value="privadoElectricidadServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoElectricidadServiciosInfraestructura', false);
                          setFieldValue('privadoElectricidadServiciosInfraestructura', true);
                          setFieldValue('sinConexionElectricidadServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Privado</label>
                      <Field
                        type="radio"
                        name="electricidad"
                        value="sinConexionElectricidadServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoElectricidadServiciosInfraestructura', false);
                          setFieldValue('privadoElectricidadServiciosInfraestructura', true);
                          setFieldValue('sinConexionElectricidadServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sin conexión</label>
                    </div>

                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Gas</p>
                      <Field
                        type="radio"
                        name="gas"
                        value="publicoGasServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoGasServiciosInfraestructura', true);
                          setFieldValue('privadoGasServiciosInfraestructura', false);
                          setFieldValue('sinConexionGasServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Público</label>
                      <Field
                        type="radio"
                        name="gas"
                        value="privadoGasServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoGasServiciosInfraestructura', false);
                          setFieldValue('privadoGasServiciosInfraestructura', true);
                          setFieldValue('sinConexionGasServiciosInfraestructura', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Privado</label>
                      <Field
                        type="radio"
                        name="gas"
                        value="sinConexionGasServiciosInfraestructura"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('publicoGasServiciosInfraestructura', false);
                          setFieldValue('privadoGasServiciosInfraestructura', false);
                          setFieldValue('sinConexionGasServiciosInfraestructura', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Sin conexión</label>
                    </div>

                    <div className="col-span-4 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Otros</p>
                      <Field
                        component="textarea"
                        id="otrosServiciosInfraestructura"
                        name="otrosServiciosInfraestructura"
                        className="p-2 w-full h-10 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                  </div>

                  <h6 className="text-base p-2 text-green-900 text-center">D.3- Observaciones</h6>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Observaciones de la SECCIÓN  para Legales BBVA</p>
                      <Field
                        component="textarea"
                        id="observacionesSeccionLegalesBbvaObservaciones"
                        name="observacionesSeccionLegalesBbvaObservaciones"
                        className="p-2 w-full h-20 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Otras observaciones de la SECCIÓN</p>
                      <Field
                        component="textarea"
                        id="otrasObservacionesSeccionObservaciones"
                        name="otrasObservacionesSeccionObservaciones"
                        className="p-2 w-full h-20 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 space-y-4 border p-3 rounded">
                  <h4 className="text-xl text-green-900">SECCIÓN E- Descripción del inmueble</h4>
                  <h6 className="text-lg p-2 text-green-900 text-center">E.1 Aspectos generales</h6>
                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Destino</p>
                      <Field
                        type="radio"
                        name="destinoDescripcionInmueble"
                        value="viviendaDestinoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('viviendaDestinoDescripcionInmueble', true);
                          setFieldValue('comercioDestinoDescripcionInmueble', false);
                          setFieldValue('otrosDestinoDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Vivienda</label>
                      <Field
                        type="radio"
                        name="destinoDescripcionInmueble"
                        value="comercioDestinoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('viviendaDestinoDescripcionInmueble', false);
                          setFieldValue('comercioDestinoDescripcionInmueble', true);
                          setFieldValue('otrosDestinoDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Comercio</label>
                      <Field
                        type="radio"
                        name="destinoDescripcionInmueble"
                        value="otrosDestinoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('viviendaDestinoDescripcionInmueble', false);
                          setFieldValue('comercioDestinoDescripcionInmueble', false);
                          setFieldValue('otrosDestinoDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otros</label>
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Tipología</p>
                      <Field
                        type="radio"
                        name="tipologiaDescripcionInmueble"
                        value="casaTipologiaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('casaTipologiaDescripcionInmueble', true);
                          setFieldValue('apartamentoTipologiaDescripcionInmueble', false);
                          setFieldValue('otraTipologiaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Casa</label>
                      <Field
                        type="radio"
                        name="tipologiaDescripcionInmueble"
                        value="apartamentoTipologiaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('casaTipologiaDescripcionInmueble', false);
                          setFieldValue('apartamentoTipologiaDescripcionInmueble', true);
                          setFieldValue('otraTipologiaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Apartamento</label>
                      <Field
                        type="radio"
                        name="tipologiaDescripcionInmueble"
                        value="otraTipologiaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('casaTipologiaDescripcionInmueble', false);
                          setFieldValue('apartamentoTipologiaDescripcionInmueble', false);
                          setFieldValue('otraTipologiaDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otra</label>
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Situación construcciones</p>
                      <Field
                        type="radio"
                        name="situacionConstruccionesDescripcionInmueble"
                        value="terminadasSituacionConstruccionesDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('terminadasSituacionConstruccionesDescripcionInmueble', true);
                          setFieldValue('inconclusasSituacionConstruccionesDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Terminadas</label>
                      <Field
                        type="radio"
                        name="situacionConstruccionesDescripcionInmueble"
                        value="inconclusasSituacionConstruccionesDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('terminadasSituacionConstruccionesDescripcionInmueble', false);
                          setFieldValue('inconclusasSituacionConstruccionesDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Inconclusas</label>
                    </div>
                    <div className="col-span-3 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Niveles</p>
                      <Field
                        component="textarea"
                        id="nivelesDescripcionInmueble"
                        name="nivelesDescripcionInmueble"
                        className="p-2 w-full h-10 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-6 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Ubicación construcciones</p>
                      <Field
                        type="radio"
                        name="ubicacionConstrucciones"
                        value="frenteUbicacionConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frenteUbicacionConstrucciones', true);
                          setFieldValue('contrafrenteUbicacionConstrucciones', false);
                          setFieldValue('internoUbicacionConstrucciones', false);
                          setFieldValue('fondoUbicacionConstrucciones', false);
                          setFieldValue('otrosUbicacionConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Frente</label>
                      <Field
                        type="radio"
                        name="ubicacionConstrucciones"
                        value="contrafrenteUbicacionConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frenteUbicacionConstrucciones', false);
                          setFieldValue('contrafrenteUbicacionConstrucciones', true);
                          setFieldValue('internoUbicacionConstrucciones', false);
                          setFieldValue('fondoUbicacionConstrucciones', false);
                          setFieldValue('otrosUbicacionConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Contrafrente</label>
                      <Field
                        type="radio"
                        name="ubicacionConstrucciones"
                        value="internoUbicacionConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frenteUbicacionConstrucciones', false);
                          setFieldValue('contrafrenteUbicacionConstrucciones', false);
                          setFieldValue('internoUbicacionConstrucciones', true);
                          setFieldValue('fondoUbicacionConstrucciones', false);
                          setFieldValue('otrosUbicacionConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Interno</label>
                      <Field
                        type="radio"
                        name="ubicacionConstrucciones"
                        value="fondoUbicacionConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frenteUbicacionConstrucciones', false);
                          setFieldValue('contrafrenteUbicacionConstrucciones', false);
                          setFieldValue('internoUbicacionConstrucciones', false);
                          setFieldValue('fondoUbicacionConstrucciones', true);
                          setFieldValue('otrosUbicacionConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Fondo</label>
                      <Field
                        type="radio"
                        name="ubicacionConstrucciones"
                        value="otrosUbicacionConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frenteUbicacionConstrucciones', false);
                          setFieldValue('contrafrenteUbicacionConstrucciones', false);
                          setFieldValue('internoUbicacionConstrucciones', false);
                          setFieldValue('fondoUbicacionConstrucciones', false);
                          setFieldValue('otrosUbicacionConstrucciones', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otros</label>
                    </div>
                    <div className="col-span-6 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Agrupamiento de las construcciones</p>
                      <Field
                        type="radio"
                        name="agrupamientoConstrucciones"
                        value="unicasAgrupamientoConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('unicasAgrupamientoConstrucciones', true);
                          setFieldValue('aisladasAgrupamientoConstrucciones', false);
                          setFieldValue('apareadasAgrupamientoConstrucciones', false);
                          setFieldValue('edificiosAgrupamientoConstrucciones', false);
                          setFieldValue('otrosAgrupamientoConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Únicas</label>
                      <Field
                        type="radio"
                        name="agrupamientoConstrucciones"
                        value="aisladasAgrupamientoConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('unicasAgrupamientoConstrucciones', false);
                          setFieldValue('aisladasAgrupamientoConstrucciones', true);
                          setFieldValue('apareadasAgrupamientoConstrucciones', false);
                          setFieldValue('edificiosAgrupamientoConstrucciones', false);
                          setFieldValue('otrosAgrupamientoConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Aisladas</label>
                      <Field
                        type="radio"
                        name="agrupamientoConstrucciones"
                        value="apareadasAgrupamientoConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('unicasAgrupamientoConstrucciones', false);
                          setFieldValue('aisladasAgrupamientoConstrucciones', false);
                          setFieldValue('apareadasAgrupamientoConstrucciones', true);
                          setFieldValue('edificiosAgrupamientoConstrucciones', false);
                          setFieldValue('otrosAgrupamientoConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Apareadas</label>
                      <Field
                        type="radio"
                        name="agrupamientoConstrucciones"
                        value="edificiosAgrupamientoConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('unicasAgrupamientoConstrucciones', false);
                          setFieldValue('aisladasAgrupamientoConstrucciones', false);
                          setFieldValue('apareadasAgrupamientoConstrucciones', false);
                          setFieldValue('edificiosAgrupamientoConstrucciones', true);
                          setFieldValue('otrosAgrupamientoConstrucciones', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Edificio/s</label>
                      <Field
                        type="radio"
                        name="agrupamientoConstrucciones"
                        value="otrosAgrupamientoConstrucciones"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('unicasAgrupamientoConstrucciones', false);
                          setFieldValue('aisladasAgrupamientoConstrucciones', false);
                          setFieldValue('apareadasAgrupamientoConstrucciones', false);
                          setFieldValue('edificiosAgrupamientoConstrucciones', false);
                          setFieldValue('otrosAgrupamientoConstrucciones', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otros</label>
                    </div>
                  </div>
                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Descripción</p>
                    <Field
                      component="textarea"
                      id="descripcionAspectosGenerales"
                      name="descripcionAspectosGenerales"
                      className="p-2 w-full h-20 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Luminosidad/Vistas</p>
                    <Field
                      component="textarea"
                      id="luminosidadVistasDescripcionInmueble"
                      name="luminosidadVistasDescripcionInmueble"
                      className="p-2 w-full h-14 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
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
                          <Field
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
                          </Field>
                          <Field
                            type="text"
                            name={`obraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                            className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.obraCivilSeccionEDescripcionInmueble}
                          />
                          <Field
                            as="select"
                            name={`tipoConstruccionSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                            className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.tipoConstruccionSeccionEDescripcionInmueble}
                          >
                            <option value="">Seleccionar opción</option>
                            <option value="Tradicional">Tradicional</option>
                            <option value="Steel Framing">Steel Framing</option>
                            <option value="Contenedor">Contenedor</option>
                          </Field>
                          <Field
                            type="number"
                            name={`superficieDocumentadaObraCivilSeccionEDescripcionInmueble_${itemObraCivil.id}`}
                            className="col-span-3 text-center px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                            defaultValue={itemObraCivil.superficieDocumentadaObraCivilSeccionEDescripcionInmueble}
                            onChange={(e) => handleFieldChange(itemObraCivil.id, 'superficieDocumentadaObraCivilSeccionEDescripcionInmueble', e.target.value)}
                            onBlur={() => updateBackend(itemObraCivil.id)} // Actualiza el backend cuando el usuario sale del campo                          
                          />
                          <Field
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

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Categoría</p>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="muyBuena1CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', true);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">1 Muy Buena</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="muyBuena2CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', true);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">1.5 Muy Buena</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="buena1CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', true);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">2 Buena</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="buena2CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', true);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">2.5 Buena</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="mediana1CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', true);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">3 Mediana</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="mediana2CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', true);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">3.5 Mediana</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="economica1CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', true);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">4 Económica</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="economica2CategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', true);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">4.5 Económica</label>
                      <Field
                        type="radio"
                        name="categoriaDescripcionInmueble"
                        value="muyEconomicaCategoriaDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('muyBuena1CategoriaDescripcionInmueble', false);
                          setFieldValue('muyBuena2CategoriaDescripcionInmueble', false);
                          setFieldValue('buena1CategoriaDescripcionInmueble', false);
                          setFieldValue('buena2CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana1CategoriaDescripcionInmueble', false);
                          setFieldValue('mediana2CategoriaDescripcionInmueble', false);
                          setFieldValue('economica1CategoriaDescripcionInmueble', false);
                          setFieldValue('economica2CategoriaDescripcionInmueble', false);
                          setFieldValue('muyEconomicaCategoriaDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">5 Muy Económica</label>
                    </div>
                  </div>

                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Descripción</p>
                    <Field
                      component="textarea"
                      id="descripcionDescripcionInmueble"
                      name="descripcionDescripcionInmueble"
                      className="p-2 w-full h-14 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-2 ">
                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Estado conservación</p>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="excelente1EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">1 Excelente</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="excelente2EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">1.5 Excelente</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="bueno1EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">2 Bueno</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="bueno2EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">2.5 Bueno</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="regular1EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">3 Regular</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="regular2EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">3.5 Regular</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="malo1EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">4 Malo</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="malo2EstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', true);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">4.5 Malo</label>
                      <Field
                        type="radio"
                        name="estadoConservacionDescripcionInmueble"
                        value="muyMaloEstadoConservacionDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('excelente1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('excelente2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('bueno2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('regular2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo1EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('malo2EstadoConservacionDescripcionInmueble', false);
                          setFieldValue('muyMaloEstadoConservacionDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">4.5 Muy Malo</label>
                    </div>
                  </div>
                  <div className="col-span-12 text-center">
                    <p className="text-base text-center text-gray-700 font-bold">Descripción</p>
                    <Field
                      component="textarea"
                      id="descripcionEstadoConservacionDescripcionInmueble"
                      name="descripcionEstadoConservacionDescripcionInmueble"
                      className="p-2 w-full h-14 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Mantenimiento</p>
                    </div>
                    <div className="col-span-4 text-center">
                      <Field
                        type="radio"
                        name="MantenimientoDescripcionInmueble"
                        value="frecuenteMantenimientoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frecuenteMantenimientoDescripcionInmueble', true);
                          setFieldValue('ocasionalMantenimientoDescripcionInmueble', false);
                          setFieldValue('escasoNuloMantenimientoDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Frecuente</label>
                      <Field
                        type="radio"
                        name="MantenimientoDescripcionInmueble"
                        value="ocasionalMantenimientoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frecuenteMantenimientoDescripcionInmueble', false);
                          setFieldValue('ocasionalMantenimientoDescripcionInmueble', true);
                          setFieldValue('escasoNuloMantenimientoDescripcionInmueble', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Ocasional</label>
                      <Field
                        type="radio"
                        name="MantenimientoDescripcionInmueble"
                        value="escasoNuloMantenimientoDescripcionInmueble"
                        className="form-radio h-4 w-4 "
                        onClick={() => {
                          setFieldValue('frecuenteMantenimientoDescripcionInmueble', false);
                          setFieldValue('ocasionalMantenimientoDescripcionInmueble', false);
                          setFieldValue('escasoNuloMantenimientoDescripcionInmueble', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Escaso/nulo</label>
                    </div>
                    <label
                      htmlFor="descripcionMantenimientoDescripcionInmueble"
                      className="col-span-1 p-2 text-sm text-gray-700 font-bold"
                    >
                      Descripción
                    </label>
                    <Field
                      type="text"
                      id="descripcionMantenimientoDescripcionInmueble"
                      name="descripcionMantenimientoDescripcionInmueble"
                      className="col-span-7 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                    />
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
                            <Field
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
                            </Field>
                            <Field
                              type="text"
                              name={`descripcionIntervencionAntiguedad_${itemObraCivil.id}`}
                              className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                              defaultValue={itemObraCivil.descripcionIntervencionAntiguedad}
                              onChange={(e) => handleFieldChange(itemObraCivil.id, 'descripcionIntervencionAntiguedad', e.target.value)}
                            />
                            <Field
                              type="number"
                              name={`superficieAntiguedad_${itemObraCivil.id}`}
                              className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                              defaultValue={itemObraCivil.superficieAntiguedad}
                              onChange={(e) => handleFieldChange(itemObraCivil.id, 'superficieAntiguedad', parseFloat(e.target.value))}
                            />
                            <Field
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
                              <Field
                                type="radio"
                                name={`cimentacionDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.pilotesCimentacionDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'pilotesCimentacionDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Pilotes</label>

                              <Field
                                type="radio"
                                name={`cimentacionDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.dadosCimentacionDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'dadosCimentacionDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Dados</label>

                              <Field
                                type="radio"
                                name={`cimentacionDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.patinesCimentacionDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'patinesCimentacionDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Patines</label>

                              <Field
                                type="radio"
                                name={`cimentacionDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.zapCorridaCimentacionDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCimentacion(itemObraCivil.id, 'zapCorridaCimentacionDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Zap. corrida</label>

                              <Field
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
                            <Field
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

                              <Field
                                type="radio"
                                name={`cubiertaDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.hArmadoCubiertaDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'hArmadoCubiertaDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">H.Armado</label>

                              <Field
                                type="radio"
                                name={`cubiertaDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.maderaCubiertaDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'maderaCubiertaDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Madera</label>

                              <Field
                                type="radio"
                                name={`cubiertaDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.metalicaCubiertaDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'metalicaCubiertaDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Metálica</label>


                              <Field
                                type="radio"
                                name={`cubiertaDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.bovedillaCubiertaDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeCubierta(itemObraCivil.id, 'bovedillaCubiertaDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Bovedilla</label>

                              <Field
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
                            <Field
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
                            <Field
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

                              <Field
                                type="radio"
                                name={`hArmadoRestoEstructuraDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.hArmadoRestoEstructuraDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'hArmadoRestoEstructuraDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">H.Armado</label>

                              <Field
                                type="radio"
                                name={`muroPortanteRestoEstructuraDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.muroPortanteRestoEstructuraDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'muroPortanteRestoEstructuraDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Muro portante</label>

                              <Field
                                type="radio"
                                name={`mContencionRestoEstructuraDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.mContencionRestoEstructuraDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'mContencionRestoEstructuraDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">M. contención</label>

                              <Field
                                type="radio"
                                name={`maderaRestoEstructuraDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.maderaRestoEstructuraDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'maderaRestoEstructuraDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Madera</label>

                              <Field
                                type="radio"
                                name={`metalicaRestoEstructuraDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.metalicaRestoEstructuraDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeRestoEstructura(itemObraCivil.id, 'metalicaRestoEstructuraDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Metálica</label>

                              <Field
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
                            <Field
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

                              <Field
                                type="radio"
                                name={`ladrilloMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.ladrilloMurosInteriorExteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'ladrilloMurosInteriorExteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                              <Field
                                type="radio"
                                name={`ticholoMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.ticholoMurosInteriorExteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'ticholoMurosInteriorExteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                              <Field
                                type="radio"
                                name={`maderaMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.maderaMurosInteriorExteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'maderaMurosInteriorExteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Madera</label>

                              <Field
                                type="radio"
                                name={`steelFramingMurosInteriorExteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.steelFramingMurosInteriorExteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorExterior(itemObraCivil.id, 'steelFramingMurosInteriorExteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                              <Field
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
                            <Field
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

                              <Field
                                type="radio"
                                name={`ladrilloMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.ladrilloMurosInteriorInteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'ladrilloMurosInteriorInteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                              <Field
                                type="radio"
                                name={`ticholoMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.ticholoMurosInteriorInteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'ticholoMurosInteriorInteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                              <Field
                                type="radio"
                                name={`maderaMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.maderaMurosInteriorInteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'maderaMurosInteriorInteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Madera</label>

                              <Field
                                type="radio"
                                name={`steelFramingMurosInteriorInteriorDescripcion_${itemObraCivil.id}`}
                                checked={itemObraCivil.steelFramingMurosInteriorInteriorDescripcion}
                                className="form-radio h-4 w-4"
                                onChange={() => handleFieldChangeMurosInteriorInterior(itemObraCivil.id, 'steelFramingMurosInteriorInteriorDescripcion')}
                              />
                              <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                              <Field
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
                            <Field
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


                  <div className="grid grid-cols-5 gap-4 w-full">
                    <div className="col-span-5 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Piscina</p>
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <Field
                        type="radio"
                        name="piscinaDescripcionDetallada"
                        value="hArmadoPiscinaDescripcionDetallada"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('hArmadoPiscinaDescripcionDetallada', true);
                          setFieldValue('prefabricadaPiscinaDescripcionDetallada', false);
                          setFieldValue('terminacionPiscinaDescripcionDetallada', false);
                          setFieldValue('climatizacionPiscinaDescripcionDetallada', false);
                          setFieldValue('otrosPiscinaDescripcionDetallada', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">H. Armado</label>
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <Field
                        type="radio"
                        name="piscinaDescripcionDetallada"
                        value="prefabricadaPiscinaDescripcionDetallada"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('hArmadoPiscinaDescripcionDetallada', false);
                          setFieldValue('prefabricadaPiscinaDescripcionDetallada', true);
                          setFieldValue('terminacionPiscinaDescripcionDetallada', false);
                          setFieldValue('climatizacionPiscinaDescripcionDetallada', false);
                          setFieldValue('otrosPiscinaDescripcionDetallada', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Prefabricada</label>
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <Field
                        type="radio"
                        name="piscinaDescripcionDetallada"
                        value="terminacionPiscinaDescripcionDetallada"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('hArmadoPiscinaDescripcionDetallada', false);
                          setFieldValue('prefabricadaPiscinaDescripcionDetallada', false);
                          setFieldValue('terminacionPiscinaDescripcionDetallada', true);
                          setFieldValue('climatizacionPiscinaDescripcionDetallada', false);
                          setFieldValue('otrosPiscinaDescripcionDetallada', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Terminación</label>
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <Field
                        type="radio"
                        name="piscinaDescripcionDetallada"
                        value="climatizacionPiscinaDescripcionDetallada"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('hArmadoPiscinaDescripcionDetallada', false);
                          setFieldValue('prefabricadaPiscinaDescripcionDetallada', false);
                          setFieldValue('terminacionPiscinaDescripcionDetallada', false);
                          setFieldValue('climatizacionPiscinaDescripcionDetallada', true);
                          setFieldValue('otrosPiscinaDescripcionDetallada', false);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Climatización</label>
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <Field
                        type="radio"
                        name="piscinaDescripcionDetallada"
                        value="otrosPiscinaDescripcionDetallada"
                        className="form-radio h-4 w-4"
                        onClick={() => {
                          setFieldValue('hArmadoPiscinaDescripcionDetallada', false);
                          setFieldValue('prefabricadaPiscinaDescripcionDetallada', false);
                          setFieldValue('terminacionPiscinaDescripcionDetallada', false);
                          setFieldValue('climatizacionPiscinaDescripcionDetallada', false);
                          setFieldValue('otrosPiscinaDescripcionDetallada', true);
                        }}
                      />
                      <label className="p-2 text-gray-700 font-bold text-sm">Otros</label>
                    </div>
                  </div>
                  <CalculoInforme
                    configuracion={{
                      nombreBanco: 'BBVA',
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
                    }}
                    /*superficieTerreno={values.superficieTerrenoCaracteristicas || 0} */
                    onGetCalculoData={(fn) => setGetCalculoData(() => fn)}
                  /* estadoConservacion={values.estadoConservacionDescripcionInmueble || "Buen estado"}
                  categoria={values.categoriaDescripcionInmueble || ""}
                  deslindeFrente={values.frente1Caracteristicas || 0}
                  deslindeFondo={values.fondoCaracteristicas || 0} */
                  />

                  <div className="grid grid-cols-4 gap-4 w-full pt-5">
                    <div className="flex flex-col items-center col-span-1">
                      <p className="text-base text-center text-gray-700 font-bold">Aberturas</p>
                      <Field
                        type="text"
                        id="aberturasDescripcionDetallada"
                        name="aberturasDescripcionDetallada"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <p className="text-base text-center text-gray-700 font-bold">Protección aberturas</p>
                      <Field
                        type="text"
                        id="proteccionAberturasDescripcionDetallada"
                        name="proteccionAberturasDescripcionDetallada"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <p className="text-base text-center text-gray-700 font-bold">Placares en dormitorios</p>
                      <Field
                        type="text"
                        id="placaresDormitoriosDescripcionDetallada"
                        name="placaresDormitoriosDescripcionDetallada"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                    <div className="flex flex-col items-center col-span-1">
                      <p className="text-base text-center text-gray-700 font-bold">Placares en cocina</p>
                      <Field
                        type="text"
                        id="placaresCocinaDescripcionDetallada"
                        name="placaresCocinaDescripcionDetallada"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-3 gap-6 col-span-12">

                    <div className="border p-4 rounded-lg">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Agua caliente</h2>

                      <Field
                        type="text"
                        id="tipoAguaCalienteDescripcion"
                        name="tipoAguaCalienteDescripcion"
                        placeholder="Tipo"
                        className="w-full p-2 border rounded-lg mb-2"
                      />


                      <div className="flex items-center space-x-4 justify-center">

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="enCocinaDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="enCocinaDescripcionDetallada">En cocina</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="enBaniosDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="enBaniosDescripcionDetallada">En baños</label>
                        </div>

                      </div>
                    </div>

                    <div className="border p-4 rounded-lg">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Instalación eléctrica</h2>
                      <div className="flex items-center space-x-4 justify-center">

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="embutidaDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="embutidaDescripcionDetallada">Embutida</label>
                        </div>

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="exteriorDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="exteriorDescripcionDetallada">Exterior</label>
                        </div>

                      </div>

                    </div>


                    <div className="border p-4 rounded-lg">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Otros</h2>
                      <div className="flex items-center justify-center">

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="alarmaDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="alarmaDescripcionDetallada">Alarma</label>
                        </div>

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="gElectrogDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="gElectrogDescripcionDetallada">G.electrog</label>
                        </div>

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="cctvDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="cctvDescripcionDetallada">CCTV</label>
                        </div>

                        <div className="flex items-center p-2">
                          <Field
                            type="checkbox"
                            name="portElecDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="portElecDescripcionDetallada">Port.elec.</label>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="grid gap-6 col-span-12">
                    <div className="border p-4 rounded-lg">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Climatización</h2>
                      <div className="grid grid-cols-5 items-center mb-2">
                        <div className="col-span-1 flex">
                          <Field
                            type="checkbox"
                            id="estufaDescripcionDetallada"
                            name="estufaDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="estufaDescripcionDetallada" >Estufa</label>
                        </div>
                        <div className="col-span-4">
                          <Field
                            type="text"
                            id="estufaUbicacionDescripcionDetallada"
                            name="estufaUbicacionDescripcionDetallada"
                            placeholder="Ubicación Estufa"
                            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center mb-2">
                        <div className="col-span-1 flex">
                          <Field
                            type="checkbox"
                            id="splitsDescripcionDetallada"
                            name="splitsDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="splitsDescripcionDetallada" >Splits</label>
                        </div>
                        <div className="col-span-4">
                          <Field
                            type="text"
                            id="splitsUbicacionDescripcionDetallada"
                            name="splitsUbicacionDescripcionDetallada"
                            placeholder="Ubicación Splits"
                            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center mb-2">
                        <div className="col-span-1 flex">
                          <Field
                            type="checkbox"
                            id="centralDescripcionDetallada"
                            name="centralDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="centralDescripcionDetallada" >Central</label>
                        </div>
                        <div className="col-span-4">
                          <Field
                            type="text"
                            id="centralUbicacionDescripcionDetallada"
                            name="centralUbicacionDescripcionDetallada"
                            placeholder="Ubicación Central"
                            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center mb-2">
                        <div className="col-span-1 flex">
                          <Field
                            type="checkbox"
                            id="otrosDescripcionDetallada"
                            name="otrosDescripcionDetallada"
                            className="mr-2"
                          />
                          <label htmlFor="otrosDescripcionDetallada" >Otros</label>
                        </div>
                        <div className="col-span-4">
                          <Field
                            type="text"
                            id="otrosUbicacionDescripcionDetallada"
                            name="otrosUbicacionDescripcionDetallada"
                            placeholder="Ubicación Otros"
                            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center mb-2">
                        <div className="col-span-1 mr-1">
                          <Field
                            type="text"
                            id="panelesSolaresDescripcionDetallada"
                            name="panelesSolaresDescripcionDetallada"
                            placeholder="Alimentación Paneles Solares "
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                        <div className="col-span-4">
                          <Field
                            type="text"
                            id="otrasInstalacionesDescripcionDetallada"
                            name="otrasInstalacionesDescripcionDetallada"
                            placeholder="Otras instalaciones"
                            className="w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                          />
                        </div>
                      </div>
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
                                    <Field
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
                            <Field
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
                                      <Field
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
                                <Field
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


                  <div className="col-span-12 flex flex-col  space-y-4 p-3 ">
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-12 text-center">
                        <label
                          htmlFor="otrasCaracteristicasDescripcion"
                          className="p-3 text-sm text-gray-700 font-bold "
                        >
                          Otras características:
                        </label>
                        <Field
                          component="textarea"
                          id="otrasCaracteristicasDescripcion"
                          name="otrasCaracteristicasDescripcion"
                          className="p-6 w-full h-16 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-span-12 flex flex-col  space-y-4 p-3 rounded">
                    <h4 className="text-xl text-green-900 text-center">E.3 Observaciones</h4>
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="col-span-12 text-center">

                        <label
                          htmlFor="observacionesSeccionLegalesDescripcion"
                          className="p-3 text-sm text-gray-700 font-bold "
                        >
                          Observaciones de la SECCIÓN  para Legales BBVA
                        </label>
                        <Field
                          component="textarea"
                          id="observacionesSeccionLegalesDescripcion"
                          name="observacionesSeccionLegalesDescripcion"
                          className="p-6 w-full h-32 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                        />

                        <label
                          htmlFor="otrasObservacionesSeccionLegalesDescripcion"
                          className="p-3 text-sm text-gray-700 font-bold "
                        >
                          Otras observaciones de la SECCIÓN
                        </label>
                        <Field
                          component="textarea"
                          id="otrasObservacionesSeccionLegalesDescripcion"
                          name="otrasObservacionesSeccionLegalesDescripcion"
                          className="p-6 w-full h-16 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                        />

                      </div>
                    </div>
                  </div>
                </div>



                <div className="col-span-12 space-y-4 border p-3 rounded">
                  <h4 className="text-xl text-green-900">SECCIÓN F - Planos</h4>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3"></div>
                    <div className="col-span-6 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Fuente</p>
                      <div className="flex items-center space-x-4 justify-center">
                        <div className="flex items-center p-2">
                          <Field type="checkbox" name="documentacionClientePlanos" className="mr-2" />
                          <label htmlFor="documentacionClientePlanos">Documentación Cliente</label>
                        </div>
                        <div className="flex items-center p-2">
                          <Field type="checkbox" name="relevamientoTasadorPlanos" className="mr-2" />
                          <label htmlFor="relevamientoTasadorPlanos">Relevamiento Tasador</label>
                        </div>
                        <div className="flex items-center p-2">
                          <Field type="checkbox" name="otrosPlanos" className="mr-2" />
                          <label htmlFor="otrosPlanos">Otros</label>
                        </div>
                      </div>

                      {/* 🔥 Carga de imágenes */}
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-md mb-2">
                          <label className="block p-2 text-center text-base text-gray-700 font-bold mb-2">
                            Subir Imágenes de Planos
                          </label>

                          <Field type="hidden" name="planosImagenesUrl" />

                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                            onChange={handleFileSelect} // 🔥 Aquí vinculamos la función correctamente

                          />

                          {/* 🔥 Vista previa de imágenes de planos con opción de eliminar */}
                          {(values.planosImagenesUrl || previewImages.length > 0) && (
                            <div className="grid grid-cols-4 gap-4 mt-2">
                              {/* 🔹 Imágenes ya guardadas en la BD */}
                              {values.planosImagenesUrl &&
                                values.planosImagenesUrl
                                  .split(";")
                                  .filter(url => url && url.trim() !== "") // 🔥 Filtrar URLs vacías
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
                                        onClick={() => handleRemoveImage(index, setFieldValue, values)}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))
                              }

                              {/* 🔹 Imágenes recién subidas pero aún no guardadas */}
                              {previewImages.map((image, index) => (
                                <div key={index} className="relative">
                                  <img src={image} alt={`preview-${index}`} className="w-full h-auto rounded-md object-cover" />
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => handleRemovePreviewImage(index)}
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

                          <Field type="hidden" name="fotosImagenesUrlFotos" />

                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
                            onChange={handleFileSelectFotos}
                          />

                          {/* 🔥 Vista previa de imágenes con opción de eliminar */}
                          {(values.fotosImagenesUrlFotos || previewImagesFotos.length > 0) && (
                            <div className="grid grid-cols-4 gap-4 mt-2">
                              {values.fotosImagenesUrlFotos &&
                                values.fotosImagenesUrlFotos
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
                                        onClick={() => handleRemovePreviewFotos(index, setFieldValue, values)}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))
                              }

                              {previewImagesFotos.map((image, index) => (
                                <div key={index} className="relative">
                                  <img src={image} alt={`preview-${index}`} className="w-full h-auto rounded-md object-cover" />
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => handleRemovePreviewFotos(index)}
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

                      <p className="text-base text-center text-gray-700 font-bold">Descripción general </p>
                      <Field
                        component="textarea"
                        id="descripcionGeneralEntorno"
                        name="descripcionGeneralEntorno"
                        className="p-2 w-full h-20 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />

                    </div>

                    <div className="border p-4 rounded-lg col-span-4">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Construcciones</h2>

                      <div className="flex items-center space-x-4 justify-center">

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="veinticincoContruccionesEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="veinticincoContruccionesEntorno">0-25%</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="setentacincoContruccionesEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="setentacincoContruccionesEntorno">25-75%</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="cienContruccionesEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="cienContruccionesEntorno">75-100%</label>
                        </div>

                      </div>
                    </div>

                    <div className="border p-4 rounded-lg col-span-4">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Crecimiento</h2>

                      <div className="flex items-center space-x-4 justify-center">

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="continuoCrecimientoEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="continuoCrecimientoEntorno">Continuo</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="estableContruccionesEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="estableContruccionesEntorno">Estable</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="nuloContruccionesEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="nuloContruccionesEntorno">Nulo</label>
                        </div>

                      </div>
                    </div>
                    <div className="border p-4 rounded-lg col-span-4">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Usos (%)</h2>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label htmlFor="viviendaUsosEntorno" className="block text-sm font-medium text-gray-700 text-center">Vivienda</label>
                          <Field type="number" name="viviendaUsosEntorno" className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
                        </div>
                        <div>
                          <label htmlFor="comercioUsosEntorno" className="block text-sm font-medium text-gray-700 text-center">Comercio</label>
                          <Field type="number" name="comercioUsosEntorno" className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
                        </div>
                        <div>
                          <label htmlFor="industriaUsosEntorno" className="block text-sm font-medium text-gray-700 text-center">Industria</label>
                          <Field type="number" name="industriaUsosEntorno" className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
                        </div>
                        <div>
                          <label htmlFor="otrosUsosEntorno" className="block text-sm font-medium text-gray-700 text-center">Otros</label>
                          <Field type="number" name="otrosUsosEntorno" className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900" />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">Equipamiento, conectividad  y servicios</p>
                    </div>

                    <div className="p-4 rounded-lg col-span-3">
                      <p className="text-base text-center text-gray-700 font-bold">Centros enseñanza</p>
                      <Field
                        type="text"
                        id="centrosEnsenanzaEntorno"
                        name="centrosEnsenanzaEntorno"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>

                    <div className="p-4 rounded-lg col-span-3">
                      <p className="text-base text-center text-gray-700 font-bold">Centros salud</p>
                      <Field
                        type="text"
                        id="centrosSaludEntorno"
                        name="centrosSaludEntorno"
                        className="p-1 w-full border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Deportivo</p>

                      <div className="grid grid-cols-2 gap-1">
                        <div className="flex items-center space-x-2 mr-2">
                          <Field
                            type="checkbox"
                            id="suficienteDeportivoEntorno"
                            name="suficienteDeportivoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="suficienteDeportivoEntorno" className="text-sm font-medium text-gray-700">
                            Suficiente
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ml-2">
                          <Field
                            type="checkbox"
                            id="escasoNuloDeportivoEntorno"
                            name="escasoNuloDeportivoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="escasoNuloDeportivoEntorno" className="text-sm font-medium text-gray-700">
                            Escaso/Nulo
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Esparcimiento</p>

                      <div className="grid grid-cols-2 ">
                        <div className="flex items-center space-x-2 mr-2">
                          <Field
                            type="checkbox"
                            id="suficienteEsparcimientoEntorno"
                            name="suficienteEsparcimientoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="suficienteEsparcimientoEntorno" className="text-sm font-medium text-gray-700">
                            Suficiente
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ml-2">
                          <Field
                            type="checkbox"
                            id="escasoNuloEsparcimientoEntorno"
                            name="escasoNuloEsparcimientoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="escasoNuloEsparcimientoEntorno" className="text-sm font-medium text-gray-700">
                            Escaso/Nulo
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Zonas verdes</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 mr-2">
                          <Field
                            type="checkbox"
                            id="suficienteZonasVerdesEntorno"
                            name="suficienteZonasVerdesEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="suficienteZonasVerdesEntorno" className="text-sm font-medium text-gray-700">
                            Suficiente
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ml-2">
                          <Field
                            type="checkbox"
                            id="escasoNuloZonasVerdesEntorno"
                            name="escasoNuloZonasVerdesEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="escasoNuloZonasVerdesEntorno" className="text-sm font-medium text-gray-700">
                            Escaso/Nulo
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Estacionamiento</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 mr-2">
                          <Field
                            type="checkbox"
                            id="suficienteEstacionamientoEntorno"
                            name="suficienteEstacionamientoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="suficienteEstacionamientoEntorno" className="text-sm font-medium text-gray-700">
                            Suficiente
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ml-2">
                          <Field
                            type="checkbox"
                            id="insuficienteNuloEstacionamientoEntorno"
                            name="insuficienteNuloEstacionamientoEntorno"
                            className="w-4 h-4 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="insuficienteNuloEstacionamientoEntorno" className="text-sm font-medium text-gray-700">
                            Insuficiente
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-6">
                      <p className="text-base text-center text-gray-700 font-bold">
                        Proximidad transporte público/conectividad
                      </p>

                      <div className="grid grid-cols-4 ">
                        <div className="ml-6 w-full flex items-center justify-center space-x-2">
                          <Field
                            type="checkbox"
                            id="excelenteProximidadTransportePublicoConectividadEntorno"
                            name="excelenteProximidadTransportePublicoConectividadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="excelenteProximidadTransportePublicoConectividadEntorno"
                            className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Excelente
                          </label>
                        </div>

                        <div className="ml-6 w-full flex items-center justify-center space-x-2">
                          <Field
                            type="checkbox"
                            id="buenaProximidadTransportePublicoConectividadEntorno"
                            name="buenaProximidadTransportePublicoConectividadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="buenaProximidadTransportePublicoConectividadEntorno"
                            className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Buena
                          </label>
                        </div>

                        <div className="ml-6 w-full flex items-center justify-center space-x-2">
                          <Field
                            type="checkbox"
                            id="regularProximidadTransportePublicoConectividadEntorno"
                            name="regularProximidadTransportePublicoConectividadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="regularProximidadTransportePublicoConectividadEntorno"
                            className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Regular
                          </label>
                        </div>

                        <div className="w-full flex items-center justify-center space-x-2">
                          <Field
                            type="checkbox"
                            id="malaProximidadTransportePublicoConectividadEntorno"
                            name="malaProximidadTransportePublicoConectividadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="malaProximidadTransportePublicoConectividadEntorno"
                            className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Mala
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Seguridad</p>

                      <div className="grid grid-cols-2 gap-1">
                        <div className="flex items-center space-x-2 ">
                          <Field
                            type="checkbox"
                            id="existeSeguridadEntorno"
                            name="existeSeguridadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="existeSeguridadEntorno" className="text-sm font-medium text-gray-700">
                            Existe
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ">
                          <Field
                            type="checkbox"
                            id="noExisteSeguridadEntorno"
                            name="noExisteSeguridadEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="noExisteSeguridadEntorno" className="text-sm font-medium text-gray-700">
                            No Existe
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-lg col-span-2">
                      <p className="text-base text-center text-gray-700 font-bold">Situación general</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 ">
                          <Field
                            type="checkbox"
                            id="favorableSituacionGeneralEntorno"
                            name="favorableSituacionGeneralEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="favorableSituacionGeneralEntorno" className="text-sm font-medium text-gray-700">
                            Favorable
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 ">
                          <Field
                            type="checkbox"
                            id="desfavorableSituacionGeneralEntorno"
                            name="desfavorableSituacionGeneralEntorno"
                            className="w-3 h-3 border-gray-300 focus:ring-green-900"
                          />
                          <label htmlFor="desfavorableSituacionGeneralEntorno" className="text-sm font-medium text-gray-700">
                            Desfavorable
                          </label>
                        </div>

                      </div>
                    </div>

                    <div className="col-span-12 text-center">
                      <p className="text-base text-center text-gray-700 font-bold">H.2 Mercado inmobiliario</p>
                      <p className="text-base text-center text-gray-700 font-bold">Descripción general </p>
                      <Field
                        component="textarea"
                        id="descripcionGeneralMercadoInmobiliario"
                        name="descripcionGeneralMercadoInmobiliario"
                        className="p-2 w-full h-16 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900 resize-none"
                      />
                      <p className="text-base text-center text-gray-700 font-bold">Situación del Mercado</p>
                    </div>


                    <div className="p-4 rounded-lg col-span-4">
                      <h2 className="mb-2 text-base text-center text-gray-700 font-bold">Oferta</h2>

                      <div className="flex items-center space-x-4 justify-center">

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="altaOfertaEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="altaOfertaEntorno">Alta</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="mediaOfertaEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="mediaOfertaEntorno">Media</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
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
                          <Field
                            type="checkbox"
                            name="altaDemandaEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="altaDemandaEntorno">Alta</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
                            type="checkbox"
                            name="mediaDemandaEntorno"
                            className="mr-2"
                          />
                          <label htmlFor="mediaDemandaEntorno">Media</label>
                        </div>

                        <div className="flex items-center p-3">
                          <Field
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
                      <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                      <Field
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
                                  <Field
                                    type="text"
                                    name={`concepto${row}Normativa`}
                                    placeholder={` Ingrese Concepto `}
                                    className="w-full p-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                  />
                                </td>
                                {/* Checkboxes */}
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`normativa${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`valoresPadron${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`sinVerificarFaltanDatosNormativa${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`cumple${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`noCumple${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`noAplica${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
                                    type="checkbox"
                                    name={`sinVerificarFaltanDatosNormativaExtra${row}Normativa`}
                                    className="w-5 h-5 border-gray-300 focus:ring-green-900"
                                  />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Field
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
                      <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                      <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                          <Field
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
                      <Field
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
                        <Field
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
                        <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                              <Field
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
                      <Field
                        type="text"
                        id="observacionesSeccionLegalesObservaciones"
                        name="observacionesSeccionLegalesObservaciones"
                        className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                      <p className="text-lg text-center text-gray-700 font-bold"> Otras observaciones de la SECCIÓN </p>
                      <Field
                        type="text"
                        id="otrasObservacionesObservaciones"
                        name="otrasObservacionesObservaciones"
                        className="p-1 w-full mb-5 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                      />
                    </div>


                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creando...' : 'Crear Informe'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
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