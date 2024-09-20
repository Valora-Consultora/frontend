import React, { useState, useRef } from "react";
import ScotiaLogo from "../../images/logo-scotia.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InformeScotia = () => {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    /// Información General
    solicitante: "",
    oficial: "",
    sucursal: "",
    titular: "",
    cedula: "",
    direccion: "",
    padron: "",
    localidad: "",
    departamento: "",
    /// Superficies
    supPredio: "",
    supConstruida: "",
    comodidades: "",
    conservacion: "",
    /// Avalúo
    valorMercado: "",
    valorVentaRapida: "",
    valorRemate: "",
    costoReposicion: "",
    /// Relevamiento Fotográfico
    fotos: [],
    /// Comparable
    comparables: [],
    /// Anexos Gráficos o Catastrales
    anexos: [],
    /// Seguro de Incendio
    seguroIncendio: [],
    /// Observaciones
    observaciones: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], ...files],
      }));
    } else {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Simulando una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Aquí iría la lógica real para enviar los datos a una API
      console.log("Form Data:", formData);

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
                <h4 className="text-xl text-green-900">Comparable</h4>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12">
                    <p className="text-sm text-gray-700">
                      Aquí se podría agregar una tabla o lista de propiedades
                      comparables. Por ahora, este espacio queda reservado para
                      futuras implementaciones.
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
};

export default InformeScotia;
