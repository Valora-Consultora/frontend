import React from 'react';

const CheckboxGroup = ({ 
  options = [], // Add default empty array
  name = '',
  selectedValues = [],
  onChange = () => {}, // Add default noop function
  idPrefix = '',
  labelClassName = "text-green-900 font-bold",
  descriptionClassName = "text-sm text-gray-700",
  checkboxClassName = "mr-2 h-4 w-4",
  itemClassName = "mb-2"
}) => {
  // Guard against undefined options
  if (!Array.isArray(options)) {
    console.warn('CheckboxGroup: options prop must be an array');
    return null;
  }

  return (
    <div>
      {options.map((item) => (
        <div key={item?.id ?? 'default-key'} className={itemClassName}>
          <input
            type="checkbox"
            id={`${idPrefix}${item?.id}`}
            name={name}
            value={item?.id}
            checked={selectedValues.includes(item?.id)}
            onChange={onChange}
            className={checkboxClassName}
          />
          <span>
            <label
              htmlFor={`${idPrefix}${item?.id}`}
              className={labelClassName}
            >
              {item?.id}
            </label>
            <p className={descriptionClassName}>{item?.desc}</p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;