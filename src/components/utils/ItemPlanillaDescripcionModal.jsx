import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Formik, Form, Field, FieldArray } from "formik";
import ItemObraCivilService from "../../api/ItemObraCivilService";
import { toast } from 'react-toastify';

Modal.setAppElement("#root");

const ItemPlanillaDescripcionModal = ({ isOpen, onRequestClose, idInforme }) => {
    const provisionalInformeId = useSelector(state => state.informe.provisionalInformeId);
    const [itemsObraCivil, setItemsObraCivil] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // 📌 Estado inicial
    const defaultRow = {
        destinoPlanillaDescripcion: "",
        superficiePlanillaDescripcion: "",  // 🔥 Cambiado a string para soportar valores separados por ";"
        pavimentoPlanillaDescripcion: "",
        cielorrasoPlanillaDescripcion: "",
        murosPlanillaDescripcion: "",
        tipoDeCubiertaPlanillaDescripcion: "",
        ventilacionNaturalPlanillaDescripcion: "",
    };

    const defaultValues = {
        rows: [defaultRow],
        totalPlanillaDescripcion: 0.0
    };

    // 📌 Obtener los items de obra civil por ID del informe
    useEffect(() => {
        if (provisionalInformeId) {
            ItemObraCivilService.getItemsObraCivilByIdInforme(provisionalInformeId)
                .then(setItemsObraCivil)
                .catch(error => console.error("Error al obtener los items obra civil:", error));
        }
    }, [provisionalInformeId, isOpen]);

    // 📌 Submit
    const submitHandler = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            if (!selectedItemId) {
                toast.error("Selecciona un item antes de guardar.");
                setSubmitting(false);
                return;
            }

            if (!values.rows || values.rows.length === 0) {
                toast.error("Debes agregar al menos una fila antes de guardar.");
                setSubmitting(false);
                return;
            }

            // 🔥 Formatear valores antes de enviar
            const formattedValues = {};
            Object.keys(defaultRow).forEach((key) => {
                formattedValues[key] = values.rows.map(row => row[key].trim()).join(";");  // 🔥 No convertir superficie a número
            });

            formattedValues.totalPlanillaDescripcion = parseFloat(values.totalPlanillaDescripcion || 0.0);

            //console.log("Valores formateados para enviar al backend:", formattedValues);
            await ItemObraCivilService.updateItemObraCivil(selectedItemId, formattedValues);

            toast.success("Datos guardados correctamente.");
            onRequestClose();
        } catch (error) {
            toast.error("Error al actualizar la planilla.");
            console.error("Error en submitHandler:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Agregar Items Planilla"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-gray-100 w-10/12 max-h-[90vh] overflow-y-auto rounded-lg">
                <Formik
                    enableReinitialize
                    initialValues={defaultValues}
                    onSubmit={submitHandler}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="bg-white shadow-lg rounded-xl p-6">
                                {/* Select para elegir el Item de obra civil */}
                                <div className="col-span-12 space-y-4 border p-3 rounded">
                                    <div className="grid grid-cols-12 pl-4 pt-4">
                                        <div className="col-span-12">
                                            <label className="text-sm pr-5 text-gray-700 font-bold">
                                                Item
                                            </label>
                                            <Field
                                                as="select"
                                                name="obraCivilSeccionEDescripcionInmueble"
                                                className="px-4 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                                value={values.obraCivilSeccionEDescripcionInmueble}
                                                onChange={(e) => {
                                                    const selectedItem = itemsObraCivil.find(item => item.obraCivilSeccionEDescripcionInmueble === e.target.value);
                                                    setSelectedItemId(selectedItem ? selectedItem.id : null);
                                                    setFieldValue("obraCivilSeccionEDescripcionInmueble", e.target.value);
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
                                </div>

                                <div className="col-span-12 text-center">
                                    <h6 className="text-center p-4 text-green-900">Planilla Descripción</h6>
                                </div>

                                {/* 🔥 FieldArray para agregar filas dinámicas */}
                                <FieldArray name="rows">
                                    {({ push }) => (
                                        <>
                                            <div className="col-span-12 flex justify-start mb-2">
                                                <button
                                                    type="button"
                                                    onClick={() => push(defaultRow)}
                                                    className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-700"
                                                >
                                                    + Nueva fila
                                                </button>
                                            </div>

                                            <div className="col-span-12 grid grid-cols-8 gap-4">
                                                {Object.keys(defaultRow).map((key) => (
                                                    <div key={key} className="flex flex-col items-center">
                                                        <label className="text-gray-700 font-bold text-sm text-center capitalize">
                                                            {key.replace(/PlanillaDescripcion$/, "").replace(/([A-Z])/g, " $1").trim()}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            {values.rows.map((row, rowIndex) => (
                                                <div key={rowIndex} className="col-span-12 grid grid-cols-8 gap-4 items-center mb-2">
                                                    {Object.keys(defaultRow).map((key) => (
                                                        <div key={key} className="flex flex-col items-center">
                                                            <Field
                                                                type="text"  // 🔥 Ahora es "text" en lugar de "number"
                                                                id={`${key}_${rowIndex}`}
                                                                name={`rows[${rowIndex}].${key}`}
                                                                className="form-input border rounded-md p-2 w-full text-center"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </FieldArray>

                                <div className="col-span-12 grid grid-cols-8 gap-4 mt-4">
                                    <div className="col-span-1 flex flex-col items-center">
                                        <label className="text-gray-700 font-bold text-sm text-center capitalize">
                                            Total
                                        </label>
                                        <Field
                                            type="number"
                                            name="totalPlanillaDescripcion"
                                            className="form-input border rounded-md p-2 w-full text-center"
                                            min="0"
                                            value={values.totalPlanillaDescripcion ?? 0.0}
                                            onChange={(e) => setFieldValue("totalPlanillaDescripcion", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button type="button" onClick={onRequestClose} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="bg-green-900 text-white px-2 py-2 rounded-md hover:bg-green-700 w-1/12" disabled={isSubmitting}>
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

export default ItemPlanillaDescripcionModal;
