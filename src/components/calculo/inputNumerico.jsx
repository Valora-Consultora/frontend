import React, { useState, useEffect } from 'react';

/**
 * Componente de input numérico que funciona como Excel
 * - Permite ingreso fácil de números
 * - Formatea con 2 decimales al perder el foco
 * - Quita el formato al recibir el foco para facilitar edición
 */
const InputNumerico = ({ 
    value, 
    onChange, 
    className = '', 
    readOnly = false,
    placeholder = '',
    ...props 
}) => {
    // Estado interno para el manejo del input
    const [inputValue, setInputValue] = useState('');
    
    // Actualizar el estado interno cuando cambia el valor externo
    useEffect(() => {
        if (value !== undefined && value !== null) {
            setInputValue(value.toString());
        } else {
            setInputValue('');
        }
    }, [value]);
    
    // Función para formatear con 2 decimales
    const formatearNumero = (valor) => {
        if (valor === '' || valor === null || valor === undefined) return '';
        const numero = parseFloat(valor);
        if (isNaN(numero)) return '';
        return numero.toFixed(2);
    };
    
    // Manejar cambios en el input
    const handleChange = (e) => {
        const val = e.target.value;
        
        // Permitir solo dígitos y un punto decimal
        if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
            setInputValue(val);
            
            if (onChange) {
                const numValue = val === '' ? 0 : parseFloat(val);
                onChange(numValue);
            }
        }
    };
    
    // Formatear cuando pierde el foco
    const handleBlur = () => {
        if (inputValue) {
            const numValue = parseFloat(inputValue);
            if (!isNaN(numValue)) {
                setInputValue(formatearNumero(numValue));
            }
        }
    };
    
    // Preparar para edición cuando recibe el foco
    const handleFocus = (e) => {
        // Si termina en .00, quitar para facilitar edición
        if (inputValue && inputValue.endsWith('.00')) {
            setInputValue(inputValue.replace('.00', ''));
        }
        // Seleccionar todo el texto
        e.target.select();
    };
    
    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={className}
            readOnly={readOnly}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default InputNumerico;