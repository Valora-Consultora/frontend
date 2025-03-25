import React from 'react';

/**
 * Modal de confirmación para acciones que requieren confirmación del usuario
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onConfirm - Función a ejecutar cuando se confirma la acción
 * @param {string} props.mensaje - Mensaje a mostrar en el modal
 * @param {string} [props.textoConfirmar="Confirmar"] - Texto del botón de confirmación
 * @param {string} [props.textoCancelar="Cancelar"] - Texto del botón de cancelación
 */
const ModalConfirmacion = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    mensaje, 
    textoConfirmar = "Confirmar", 
    textoCancelar = "Cancelar" 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h3 className="text-lg font-semibold text-red-600">Confirmar acción</h3>
                <p className="my-4">{mensaje || '¿Estás seguro de que deseas realizar esta acción?'}</p>
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    >
                        {textoCancelar}
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }} 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;