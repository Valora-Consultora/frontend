import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import ItemObraCivilService from "../../api/ItemObraCivilService";

Modal.setAppElement('#root');

const ItemAntiguedadesDescripcionModal = ({ isOpen, onRequestClose, idInforme, initialFormData }) => {

    const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
    const [itemsObraCivil, setItemsObraCivil] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // Inicializar los valores del formulario
    const itemObraCivil = {
        obraCivilSeccionEDescripcionInmueble: "",
        pilotesCimentacionDescripcion: "",
        dadosCimentacionDescripcion: "",
        patinesCimentacionDescripcion: "",
        zapCorridaCimentacionDescripcion: "",
        plateaCimentacionDescripcion: "",
        otrosDescripcionCimentacionDescripcion: "",
    };

    const fetchItemsObraCivilByInformeId = async (provisionalInformeId) => {
        try {
            const response = await ItemObraCivilService.getItemsObraCivilByIdInforme(provisionalInformeId);
            setItemsObraCivil(response);
        } catch (error) {
            console.error('Error al obtener los items obra civil:', error);
        }
    };

    useEffect(() => {
        if (provisionalInformeId) {
            fetchItemsObraCivilByInformeId(provisionalInformeId);
        }
    }, [provisionalInformeId, isOpen]);

    const submitHandler = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await toast.promise(
                ItemObraCivilService.updateItemObraCivil(selectedItemId, values),
                {
                    pending: 'Actualizando Item de Obra Civil...',
                    success: {
                        render: () => {
                            onRequestClose();
                            return 'Item de Obra Civil actualizado correctamente';
                        },
                        icon: '🟢',
                    },
                    error: 'Error al crear el Item de Obra Civil',
                }
            );
        } catch (error) {
            toast.error('Error al actualizar el Item de Obra Civil');
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
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="bg-white shadow-lg rounded-xl p-6">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 space-y-4 border p-3 rounded">
                                        <div className="grid grid-cols-12 items-center">
                                            <label
                                                htmlFor="obraCivilSeccionEDescripcionInmueble"
                                                className="col-span-1 text-sm text-gray-700 font-bold"
                                            >
                                                Item
                                            </label>
                                            <Field
                                                as="select"
                                                id="obraCivilSeccionEDescripcionInmueble"
                                                name="obraCivilSeccionEDescripcionInmueble"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                                value={selectedItemId ? itemsObraCivil.find(item => item.id === selectedItemId)?.obraCivilSeccionEDescripcionInmueble : ''}
                                                onChange={(e) => {
                                                    setSelectedItemId(itemsObraCivil.find(item => item.obraCivilSeccionEDescripcionInmueble === e.target.value)?.id || null);
                                                }}
                                            >
                                                <option value="">Seleccionar opción</option>
                                                {itemsObraCivil.map((item) => (
                                                    <option key={item.id} value={item.obraCivilSeccionEDescripcionInmueble}>
                                                        {item.obraCivilSeccionEDescripcionInmueble}
                                                    </option>
                                                ))}
                                            </Field>

                                            <div className="col-span-5 text-center">
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="pilotesCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => {
                                                        setFieldValue('pilotesCimentacionDescripcion', true);
                                                        setFieldValue('dadosCimentacionDescripcion', false);
                                                        setFieldValue('patinesCimentacionDescripcion', false);
                                                        setFieldValue('zapCorridaCimentacionDescripcion', false);
                                                        setFieldValue('plateaCimentacionDescripcion', false);
                                                    }}
                                                />
                                                <label className="p-2 text-gray-700 font-bold text-sm">Pilotes</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="dadosCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => {
                                                        setFieldValue('pilotesCimentacionDescripcion', false);
                                                        setFieldValue('dadosCimentacionDescripcion', true);
                                                        setFieldValue('patinesCimentacionDescripcion', false);
                                                        setFieldValue('zapCorridaCimentacionDescripcion', false);
                                                        setFieldValue('plateaCimentacionDescripcion', false);
                                                    }}
                                                />
                                                <label className="p-2 text-gray-700 font-bold text-sm">Dados</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="patinesCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => {
                                                        setFieldValue('pilotesCimentacionDescripcion', false);
                                                        setFieldValue('dadosCimentacionDescripcion', false);
                                                        setFieldValue('patinesCimentacionDescripcion', true);
                                                        setFieldValue('zapCorridaCimentacionDescripcion', false);
                                                        setFieldValue('plateaCimentacionDescripcion', false);
                                                    }}
                                                />
                                                <label className="p-2 text-gray-700 font-bold text-sm">Patines</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="zapCorridaCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => {
                                                        setFieldValue('pilotesCimentacionDescripcion', false);
                                                        setFieldValue('dadosCimentacionDescripcion', false);
                                                        setFieldValue('patinesCimentacionDescripcion', false);
                                                        setFieldValue('zapCorridaCimentacionDescripcion', true);
                                                        setFieldValue('plateaCimentacionDescripcion', false);
                                                    }}
                                                />
                                                <label className="p-2 text-gray-700 font-bold text-sm">Zap. corrida</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="plateaCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => {
                                                        setFieldValue('pilotesCimentacionDescripcion', false);
                                                        setFieldValue('dadosCimentacionDescripcion', false);
                                                        setFieldValue('patinesCimentacionDescripcion', false);
                                                        setFieldValue('zapCorridaCimentacionDescripcion', false);
                                                        setFieldValue('plateaCimentacionDescripcion', true);
                                                    }}
                                                />
                                                <label className="p-2 text-gray-700 font-bold text-sm">Platea</label>

                                            </div>

                                            <label
                                                htmlFor="otrosDescripcionCimentacionDescripcion"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Otros/Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="otrosDescripcionCimentacionDescripcion"
                                                name="otrosDescripcionCimentacionDescripcion"
                                                className="col-span-2 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                        </div>
                                        <div className="grid grid-cols-12 items-center">

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <button
                                        type="submit"
                                        className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/12"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Actualizando...' : 'Actualizar'}
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

export default ItemAntiguedadesDescripcionModal;
