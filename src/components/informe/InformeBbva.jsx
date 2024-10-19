import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import BbvaLogo from "../../images/logo-bbva.png";
import { Formik, Form, Field } from 'formik';
import InformeBbvaService from '../../api/InformeBbvaService';

const InformeBbva = () => {
  const navigate = useNavigate();
  const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
  const [informe, setinforme] = useState(() => initialInformeState({}));
  const [firmaTasadorPreview, setFirmaTasadorPreview] = useState(null);
  const [firmaRepresentantePreview, setFirmaRepresentantePreview] = useState(null);
  const [fotoAreaCroquisUbicacionPreview, setFotoAreaCroquisUbicacionPreview] = useState(null);
  const [bothChecked, setBothChecked] = useState(false);

  const handleFileUpload = async (file, setFieldValue, fieldName, setPreview) => {
    try {
      const fileUrl = await InformeBbvaService.uploadFirma(file);
      setFieldValue(fieldName, fileUrl); // Guarda la URL en Formik
      setPreview(URL.createObjectURL(file)); // Muestra la vista previa
      //toast.success("Archivo subido correctamente");
    } catch (error) {
      toast.error("Error al subir el archivo");
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      let response;
      console.log('Enviando el formulario con valores: ', values);
      console.log('provisionalInformeId ', provisionalInformeId);

      // Enviar el informe actualizado al backend
      response = await InformeBbvaService.updateInformeBbva(provisionalInformeId, values);

      toast.success('Informe creado correctamente');
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      toast.error('Error al crear el informe');
      console.error("Error al crear el informe:", error);
    } finally {
      setSubmitting(false);
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
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
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
    </div >
  );
};

export default InformeBbva;



function initialInformeState(usuario) {

  console.log('initialInformeState usuario ', usuario);

  return {
    fechaAsignacionServicioResumen: "",
    noSeEmitioInformacionTasadorInfNegativo: false,
  };
}