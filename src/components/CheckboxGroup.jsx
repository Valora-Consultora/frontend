import React from 'react';

const CheckboxGroup = ({ 
  options = [],
  name = '',
  selectedValues = [],
  onChange = () => {},
  idPrefix = '',
  labelClassName = "text-green-900 font-bold",
  descriptionClassName = "text-sm text-gray-700",
  checkboxClassName = "mr-2 h-4 w-4",
  itemClassName = "mb-2",
  wrapperClassName = "",
  horizontal = false
}) => {
  if (!Array.isArray(options)) {
    console.warn('CheckboxGroup: options prop must be an array');
    return null;
  }

  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      {options.map((item) => {
        // Este ID es lo que usamos para comprobar si está seleccionado
        const itemId = item?.id || '';
        const isChecked = selectedValues.includes(itemId);
        
        return (
          <div 
            key={itemId || 'default-key'} 
            className={`${itemClassName} flex items-center`}
          >
            <input
              type="checkbox"
              id={`${idPrefix}${itemId}`}
              name={name}
              value={itemId}
              checked={isChecked}
              onChange={onChange}
              className={checkboxClassName}
            />
            <span className="flex items-center">
              <label
                htmlFor={`${idPrefix}${itemId}`}
                className={labelClassName}
              >
                {item?.desc || item?.id} {/* Usar desc si existe, id como respaldo */}
              </label>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;