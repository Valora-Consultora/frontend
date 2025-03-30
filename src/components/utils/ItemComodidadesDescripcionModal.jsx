import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import ItemObraCivilService from "../../api/ItemObraCivilService";

Modal.setAppElement('#root');

const ItemComodidadesDescripcionModal = ({ isOpen, onRequestClose, idInforme, initialFormData }) => {

    const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
    const [itemsObraCivil, setItemsObraCivil] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const itemObraCivil = {
        hallDeAccesoComodidadesDescripcion: 0,
        porcheComodidadesDescripcion: 0,
        estarComedorComodidadesDescripcion: 0,
        estarDiarioComodidadesDescripcion: 0,
        cocinaComodidadesDescripcion: 0,
        bañoComodidadesDescripcion: 0,
        toiletteComodidadesDescripcion: 0,
        dormitorioComodidadesDescripcion: 0,
        suiteComodidadesDescripcion: 0,
        vestidorComodidadesDescripcion: 0,
        escritorioComodidadesDescripcion: 0,
        depositoComodidadesDescripcion: 0,
        dormitorioServicioComodidadesDescripcion: 0,
        bañoServicioComodidadesDescripcion: 0,
        balcónComodidadesDescripcion: 0,
        lavaderoComodidadesDescripcion: 0,
        jardínComodidadesDescripcion: 0,
        patioTechadoComodidadesDescripcion: 0,
        patioPérgolaComodidadesDescripcion: 0,
        patioAbiertoComodidadesDescripcion: 0,
        garageCerradoComodidadesDescripcion: 0,
        cocheraTechadaComodidadesDescripcion: 0,
        cocheraPérgolaComodidadesDescripcion: 0,
        estacionamientoAbiertoComodidadesDescripcion: 0,
        parrilleroCerradoComodidadesDescripcion: 0,
        parrilleroTechadoComodidadesDescripcion: 0,
        parrilleroPérgolaComodidadesDescripcion: 0,
        parrilleroAbiertoComodidadesDescripcion: 0,
        otrosComodidadesDescripcion: ""
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
            console.log('submitHandler values ', values);
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
            <div className="bg-gray-100 w-10/12 max-h-[90vh] overflow-y-auto rounded-lg">
                <Formik
                    initialValues={itemObraCivil}
                    onSubmit={submitHandler}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="bg-white shadow-lg rounded-xl p-6">
                                <div className="grid grid-cols-12 items-center gap-4">
                                    <div className="col-span-12 space-y-4 border p-3 rounded">
                                        <div className="grid grid-cols-12 pl-4 pt-4">
                                            <div className="col-span-12">
                                                <label
                                                    htmlFor="obraCivilSeccionEDescripcionInmueble"
                                                    className="text-sm pr-5 text-gray-700 font-bold"
                                                >
                                                    Item
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="obraCivilSeccionEDescripcionInmueble"
                                                    name="obraCivilSeccionEDescripcionInmueble"
                                                    className="px-4 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
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
                                            </div>
                                        </div>

                                        {/* Nuevo grid con 4 columnas y Fields de tipo number */}
                                        <div className="grid grid-cols-4 gap-4">
                                            {Object.keys(itemObraCivil).map((key) => (
                                                <div key={key} className="flex flex-col items-center justify-center">
                                                    <label
                                                        htmlFor={key}
                                                        className="text-gray-700 font-bold text-sm mb-1 text-center capitalize"
                                                    >
                                                        {key
                                                            .replace(/ComodidadesDescripcion$/, "")
                                                            .replace(/([A-Z])/g, " $1")
                                                            .trim()
                                                        }
                                                    </label>

                                                    <Field
                                                        type={key === "otrosComodidadesDescripcion" ? "text" : "number"}
                                                        id={key}
                                                        name={key}
                                                        className="form-input border rounded-md p-2 w-full text-center"
                                                        min={key === "otrosComodidadesDescripcion" ? undefined : "0"}
                                                    />
                                                </div>
                                            ))}
                                        </div>




                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <button
                                        type="submit"
                                        className="bg-green-900 text-white px-2 py-2 rounded-md hover:bg-green-700 w-1/12"
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

export default ItemComodidadesDescripcionModal;
