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

    const itemObraCivil = {
        obraCivilSeccionEDescripcionInmueble: "",
        pilotesCimentacionDescripcion: "",
        dadosCimentacionDescripcion: "",
        patinesCimentacionDescripcion: "",
        zapCorridaCimentacionDescripcion: "",
        plateaCimentacionDescripcion: "",
        otrosDescripcionCimentacionDescripcion: "",
        hArmadoCubiertaDescripcion: "",
        maderaCubiertaDescripcion: "",
        metalicaCubiertaDescripcion: "",
        bovedillaCubiertaDescripcion: "",
        otrosCubiertaDescripcion: "",
        otrosDescripcionCubiertaDescripcion: "",
        hArmadoRestoEstructuraDescripcion: "",
        muroPortanteRestoEstructuraDescripcion: "",
        mContencionRestoEstructuraDescripcion: "",
        maderaRestoEstructuraDescripcion: "",
        metalicaRestoEstructuraDescripcion: "",
        otrosRestoEstructuraDescripcion: "",
    };

    const handleCimentacionSelection = (setFieldValue, selectedField) => {
        const resetFields = [
            'pilotesCimentacionDescripcion',
            'dadosCimentacionDescripcion',
            'patinesCimentacionDescripcion',
            'zapCorridaCimentacionDescripcion',
            'plateaCimentacionDescripcion',
        ];

        resetFields.forEach((field) => setFieldValue(field, field === selectedField));
    };

    const handleCubiertaSelection = (setFieldValue, selectedField) => {
        const resetFields = [
            'hArmadoCubiertaDescripcion',
            'maderaCubiertaDescripcion',
            'metalicaCubiertaDescripcion',
            'bovedillaCubiertaDescripcion',
            'otrosCubiertaDescripcion',
        ];

        resetFields.forEach((field) => setFieldValue(field, field === selectedField));
    };

    const handleRestoEstructura = (setFieldValue, selectedField) => {
        const resetFields = [
            'hArmadoRestoEstructuraDescripcion',
            'muroPortanteRestoEstructuraDescripcion',
            'mContencionRestoEstructuraDescripcion',
            'maderaRestoEstructuraDescripcion',
            'metalicaRestoEstructuraDescripcion',
        ];

        resetFields.forEach((field) => setFieldValue(field, field === selectedField));
    };

    const handleMurosInteriorExterior = (setFieldValue, selectedField) => {
        const resetFields = [

            'ladrilloMurosInteriorExteriorDescripcion',
            'ticholoMurosInteriorExteriorDescripcion',
            'maderaMurosInteriorExteriorDescripcion',
            'steelFramingMurosInteriorExteriorDescripcion',
            'otrosMurosInteriorExteriorDescripcion',
        ];

        resetFields.forEach((field) => setFieldValue(field, field === selectedField));
    };

    const handleMurosInteriorInterior = (setFieldValue, selectedField) => {
        const resetFields = [

            'ladrilloMurosInteriorInteriorDescripcion',
            'ticholoMurosInteriorInteriorDescripcion',
            'maderaMurosInteriorInteriorDescripcion',
            'steelFramingMurosInteriorInteriorDescripcion',
            'otrosMurosInteriorInteriorDescripcion',
        ];

        resetFields.forEach((field) => setFieldValue(field, field === selectedField));
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
            //console.log('submitHandler values ', values);
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
                                            <div className="col-span-12 ">
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

                                        <h6 className="text-center p-4  text-green-900 ">Cimentación supuesta</h6>

                                        <div className="grid grid-cols-12 items-center">

                                            <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">

                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="pilotesCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCimentacionSelection(setFieldValue, 'pilotesCimentacionDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Pilotes</label>

                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="dadosCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCimentacionSelection(setFieldValue, 'dadosCimentacionDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Dados</label>

                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="patinesCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCimentacionSelection(setFieldValue, 'patinesCimentacionDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Patines</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="zapCorridaCimentacionDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCimentacionSelection(setFieldValue, 'zapCorridaCimentacionDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Zap. corrida</label>
                                                <Field
                                                    type="radio"
                                                    name="CimentacionDescripcion"
                                                    value="plateaCimentacionDescripcion"
                                                    className="form-radio h-4 w-4"
                                                    onClick={() => handleCimentacionSelection(setFieldValue, 'plateaCimentacionDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Platea</label>

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
                                                className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />

                                        </div>

                                        <h6 className="text-center text-green-900 p-4" >Cubierta</h6>


                                        <div className="grid grid-cols-12 items-center">
                                            <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">

                                                <Field
                                                    type="radio"
                                                    name="CubiertaDescripcion"
                                                    value="hArmadoCubiertaDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCubiertaSelection(setFieldValue, 'hArmadoCubiertaDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">H.Armado</label>
                                                <Field
                                                    type="radio"
                                                    name="CubiertaDescripcion"
                                                    value="maderaCubiertaDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCubiertaSelection(setFieldValue, 'maderaCubiertaDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Madera</label>
                                                <Field
                                                    type="radio"
                                                    name="CubiertaDescripcion"
                                                    value="metalicaCubiertaDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCubiertaSelection(setFieldValue, 'metalicaCubiertaDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Metálica</label>
                                                <Field
                                                    type="radio"
                                                    name="CubiertaDescripcion"
                                                    value="bovedillaCubiertaDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCubiertaSelection(setFieldValue, 'bovedillaCubiertaDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Bovedilla</label>
                                                <Field
                                                    type="radio"
                                                    name="CubiertaDescripcion"
                                                    value="otrosCubiertaDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleCubiertaSelection(setFieldValue, 'otrosCubiertaDescripcion')}

                                                />
                                                <label className=" text-gray-700 font-bold text-sm">Otros</label>

                                            </div>

                                            <label
                                                htmlFor="otrosDescripcionCubiertaDescripcion"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="otrosDescripcionCubiertaDescripcion"
                                                name="otrosDescripcionCubiertaDescripcion"
                                                className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                        </div>

                                        <h6 className="text-center p-4  text-green-900 ">Tipo y composición</h6>

                                        <div className="grid grid-cols-12 items-center">
                                            <label
                                                htmlFor="otrosDescripcionCubiertaDescripcion"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="otrosDescripcionTipoComposicionDescripcion"
                                                name="otrosDescripcionTipoComposicionDescripcion"
                                                className="col-span-10 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                        </div>

                                        <h6 className="text-center p-4  text-green-900 ">Resto de estructura</h6>

                                        <div className="grid grid-cols-12 items-center">

                                            <div className="col-span-8 flex flex-wrap gap-x-6 gap-y-4">
                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="hArmadoRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'hArmadoRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">H.Armado</label>

                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="muroPortanteRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'muroPortanteRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Muro portante</label>

                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="mContencionRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'mContencionRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">M. contención</label>

                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="maderaRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'maderaRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Madera</label>

                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="metalicaRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'metalicaRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Metálica</label>

                                                <Field
                                                    type="radio"
                                                    name="RestoEstructuraDescripcion"
                                                    value="otrosRestoEstructuraDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleRestoEstructura(setFieldValue, 'otrosRestoEstructuraDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Otros</label>

                                            </div>

                                            <label
                                                htmlFor="descripcionRestoEstructuraDescripcion"
                                                className="col-span-1 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="descripcionRestoEstructuraDescripcion"
                                                name="descripcionRestoEstructuraDescripcion"
                                                className="col-span-3 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />
                                        </div>


                                        <div className="grid p-4 grid-cols-12 items-center">
                                            <h6 className="text-center col-span-12  text-green-900 ">Muros interior-exterior</h6>
                                            <h6 className="text-center col-span-12 text-green-900 ">Composición </h6>
                                        </div>

                                        <div className="grid grid-cols-12 items-center">

                                            <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">
                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorExterior"
                                                    value="ladrilloMurosInteriorExteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorExterior(setFieldValue, 'ladrilloMurosInteriorExteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorExterior"
                                                    value="ticholoMurosInteriorExteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorExterior(setFieldValue, 'ticholoMurosInteriorExteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorExterior"
                                                    value="maderaMurosInteriorExteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorExterior(setFieldValue, 'maderaMurosInteriorExteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Madera</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorExterior"
                                                    value="steelFramingMurosInteriorExteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorExterior(setFieldValue, 'steelFramingMurosInteriorExteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorExterior"
                                                    value="otrosMurosInteriorExteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorExterior(setFieldValue, 'otrosMurosInteriorExteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Otros</label>

                                            </div>

                                            <label
                                                htmlFor="descripcionMurosInteriorExteriorDescripcion"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="descripcionMurosInteriorExteriorDescripcion"
                                                name="descripcionMurosInteriorExteriorDescripcion"
                                                className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />

                                        </div>

                                        <div className="grid p-4 grid-cols-12 items-center">
                                            <h6 className="text-center col-span-12  text-green-900 ">Muros interior-interior</h6>
                                            <h6 className="text-center col-span-12 text-green-900 ">Composición </h6>
                                        </div>

                                        <div className="grid grid-cols-12 items-center">

                                            <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-4">
                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorInterior"
                                                    value="ladrilloMurosInteriorInteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorInterior(setFieldValue, 'ladrilloMurosInteriorInteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Ladrillo</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorInterior"
                                                    value="ticholoMurosInteriorInteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorInterior(setFieldValue, 'ticholoMurosInteriorInteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Ticholo</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorInterior"
                                                    value="maderaMurosInteriorInteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorInterior(setFieldValue, 'maderaMurosInteriorInteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Madera</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorInterior"
                                                    value="steelFramingMurosInteriorInteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorInterior(setFieldValue, 'steelFramingMurosInteriorInteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Steel Framing</label>

                                                <Field
                                                    type="radio"
                                                    name="MurosInteriorInterior"
                                                    value="otrosMurosInteriorInteriorDescripcion"
                                                    className="form-radio h-4 w-4 "
                                                    onClick={() => handleMurosInteriorInterior(setFieldValue, 'otrosMurosInteriorInteriorDescripcion')}

                                                />
                                                <label className="text-gray-700 font-bold text-sm">Otros</label>

                                            </div>

                                            <label
                                                htmlFor="descripcionMurosInteriorInteriorDescripcion"
                                                className="col-span-2 pl-3 text-sm text-gray-700 font-bold"
                                            >
                                                Descripción
                                            </label>
                                            <Field
                                                type="text"
                                                id="descripcionMurosInteriorInteriorDescripcion"
                                                name="descripcionMurosInteriorInteriorDescripcion"
                                                className="col-span-4 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-900"
                                            />

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

export default ItemAntiguedadesDescripcionModal;
