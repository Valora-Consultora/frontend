import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import ItemObraCivilService from "../../api/ItemObraCivilService";

Modal.setAppElement('#root');

const ItemObraCivilModal = ({ isOpen, onRequestClose, idInforme, initialFormData }) => {

    const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);

    // Inicializar los valores del formulario
    const itemObraCivil = {
        tipoObraCivilSeccionEDescripcionInmueble: "",
        obraCivilSeccionEDescripcionInmueble: "",
        tipoConstruccionSeccionEDescripcionInmueble: "",
        superficieDocumentadaObraCivilSeccionEDescripcionInmueble: "",
        superficieVerificadaObraCivilSeccionEDescripcionInmueble: ""
    };

    // Submit handler
    const submitHandler = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            // Muestra el toast de carga y resultado
            await toast.promise(
                ItemObraCivilService.createItemObraCivil(values, provisionalInformeId),
                {
                    pending: 'Creando Item de Obra Civil...',
                    success: {
                        render: () => {
                            // Cierra el modal y muestra el toast
                            onRequestClose();
                            return 'Item de Obra Civil creado correctamente';
                        },
                        icon: '🟢', // Icono de éxito
                    },
                    error: 'Error al crear el Item de Obra Civil',
                }
            );
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Agregar Items Obra Civil"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-gray-100 w-11/12 rounded-lg">
                <Formik
                    initialValues={itemObraCivil}
                    onSubmit={submitHandler}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="bg-white shadow-lg rounded-xl p-6">
                                <div className="grid grid-cols-12 gap-4">
                                    {/* Información General */}
                                    <div className="col-span-12 space-y-4 border p-3 rounded">
                                        <div className="grid grid-cols-12 items-center">
                                            <label
                                                htmlFor="tipoObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 text-sm text-gray-700 font-bold"
                                            >
                                                Tipo Obra Civil
                                            </label>
                                            <Field
                                                as="select"
                                                id="tipoObraCivilSeccionEDescripcionInmueble"
                                                name="tipoObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            >
                                                <option value="">Seleccionar opción</option>
                                                <option value="Superficie Cubierta">Superficie Cubierta</option>
                                                <option value="Superficie Semi Cubierta">Superficie Semi Cubierta</option>
                                                <option value="Otros">Otros</option>
                                            </Field>
                                            <label
                                                htmlFor="obraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Obra Civil
                                            </label>
                                            <Field
                                                type="text"
                                                id="obraCivilSeccionEDescripcionInmueble"
                                                name="obraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                                placeholder="Ejemplo: Depósito"
                                            />
                                            <label
                                                htmlFor="tipoConstruccionSeccionEDescripcionInmueble"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Tipo Construcción
                                            </label>
                                            <Field
                                                as="select"
                                                id="tipoConstruccionSeccionEDescripcionInmueble"
                                                name="tipoConstruccionSeccionEDescripcionInmueble"
                                                className="col-span-2  px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            >
                                                <option value="">Seleccionar opción</option>
                                                <option value="Tradicional">Tradicional</option>
                                                <option value="Steel Framing">Steel Framing</option>
                                                <option value="Contenedor">Contenedor</option>
                                            </Field>
                                        </div>
                                        <div className="grid grid-cols-12 items-center">
                                            <label
                                                htmlFor="superficieDocumentadaObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 text-sm text-gray-700 font-bold"
                                            >
                                                Sup.  Doc. Obra Civil (m²)
                                            </label>
                                            <Field
                                                type="number"
                                                id="superficieDocumentadaObraCivilSeccionEDescripcionInmueble"
                                                name="superficieDocumentadaObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                            <label
                                                htmlFor="superficieVerificadaObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Sup. Verificada Obra Civil  (m²)
                                            </label>
                                            <Field
                                                type="number"
                                                id="superficieVerificadaObraCivilSeccionEDescripcionInmueble"
                                                name="superficieVerificadaObraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <button
                                        type="submit"
                                        className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/12"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Creando...' : 'Agregar'}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default ItemObraCivilModal;
